const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const environments = ['uat', 'prod-sim'];
const ports = { uat: 8790, 'prod-sim': 8791 };
const rows = [];
const fail = (message) => { throw new Error(message); };

async function json(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) fail(`Request failed (${response.status}): ${new URL(url).pathname}`);
  return response.json();
}

async function getRuntime(environment) {
  const base = `http://127.0.0.1:${ports[environment]}/api`;
  const health = await json(`${base}/health`);
  return { base, version: health.version };
}

async function readFlags(environment, base) {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) fail('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env.');

  const mailboxUrl = new URL(`${base}/dev/mailbox`);
  mailboxUrl.searchParams.set('email', email);
  const previousMailbox = await json(mailboxUrl);
  const previousIds = new Set((previousMailbox.messages || []).map((item) => item.id));
  const login = await json(`${base}/auth/login`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!login.challengeId) fail(`Admin sign-in did not return a challenge for ${environment}.`);

  // Wait for the new challenge email, without exposing the mailbox contents.
  let message;
  for (let attempt = 0; attempt < 40 && !message; attempt++) {
    const mailbox = await json(mailboxUrl);
    const messages = Array.isArray(mailbox.messages) ? mailbox.messages : [];
    message = messages.filter((item) => item.code && !previousIds.has(item.id))
      .sort((a, b) => Date.parse(b.receivedAt) - Date.parse(a.receivedAt))[0];
    if (!message) await new Promise((resolve) => setTimeout(resolve, 250));
  }
  if (!message) fail(`No fresh admin sign-in code was found in the ${environment} mailbox.`);

  const session = await json(`${base}/auth/verify`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ challengeId: login.challengeId, code: message.code }),
  });
  if (!session.token) fail(`Admin sign-in verification failed for ${environment}.`);

  const flags = await json(`${base}/flags`, { headers: { authorization: `Bearer ${session.token}` } });
  const list = Array.isArray(flags) ? flags : (flags.flags || flags.items || []);
  if (!Array.isArray(list)) fail(`Unexpected flags response from ${environment}.`);
  return new Map(list.map((flag) => [flag.name || flag.key || flag.id, {
    enabled: flag.enabled,
    variant: flag.variant ?? null,
    rollout: flag.rollout ?? null,
  }]).filter(([name]) => name));
}

function settingNames(file) {
  return fs.readFileSync(file, 'utf8').split(/\r?\n/)
    .map((line) => line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=/)?.[1])
    .filter(Boolean).sort();
}

function add(check, uat, prod, equal) {
  rows.push({ check, uat: String(uat), prod: String(prod), result: equal ? 'match' : 'drift' });
}

function mdCell(value) { return value.replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim(); }

async function main() {
  const runtimes = Object.fromEntries(await Promise.all(environments.map(async (env) => [env, await getRuntime(env)])));
  const images = {};
  for (const env of environments) {
    const container = `parimi-${env}-app-1`;
    images[env] = execFileSync('docker', ['inspect', '--format', '{{.Image}}', container], { encoding: 'utf8' }).trim();
    if (!images[env]) fail(`Could not read running image digest for ${env}.`);
  }
  const digest = (value) => value.replace(/^sha256:/, '').slice(0, 12);
  add('Container image', digest(images.uat), digest(images['prod-sim']), images.uat === images['prod-sim']);
  add('App version', runtimes.uat.version, runtimes['prod-sim'].version, runtimes.uat.version === runtimes['prod-sim'].version);

  const flags = Object.fromEntries(await Promise.all(environments.map(async (env) => [env, await readFlags(env, runtimes[env].base)])));
  for (const name of [...new Set([...flags.uat.keys(), ...flags['prod-sim'].keys()])].sort()) {
    const left = flags.uat.get(name);
    const right = flags['prod-sim'].get(name);
    const show = (flag) => flag ? `enabled=${flag.enabled}; variant=${flag.variant ?? '—'}; rollout=${flag.rollout ?? '—'}` : 'missing';
    add(`Flag ${name}`, show(left), show(right), JSON.stringify(left ?? null) === JSON.stringify(right ?? null));
  }

  const files = fs.readdirSync(path.join(root, 'environments'))
    .filter((name) => name.endsWith('.env')).sort();
  const byFile = files.map((name) => [name, settingNames(path.join(root, 'environments', name))]);
  const baseline = JSON.stringify(byFile[0]?.[1] || []);
  const sameNames = byFile.every(([, names]) => JSON.stringify(names) === baseline);
  const conciseKeys = (name) => (byFile.find(([file]) => file === name)?.[1] || []).join(', ');
  add('Environment setting names', `${conciseKeys('uat.env')} (all ${files.length} files ${sameNames ? 'match' : 'differ'})`, `${conciseKeys('prod-sim.env')} (all ${files.length} files ${sameNames ? 'match' : 'differ'})`, sameNames);

  const report = [
    '# Drift report',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    '| check | uat | prod-sim | result |',
    '| --- | --- | --- | --- |',
    ...rows.map((row) => `| ${mdCell(row.check)} | ${mdCell(row.uat)} | ${mdCell(row.prod)} | ${row.result} |`),
    '',
  ].join('\n');
  fs.writeFileSync(path.join(root, 'docs', 'drift-report.md'), report);
  if (rows.some((row) => row.result !== 'match')) process.exitCode = 1;
}

main().catch((error) => {
  // Do not include request bodies, credentials, or tokens in diagnostics.
  console.error(`Drift check failed: ${error.message}`);
  process.exitCode = 1;
});
