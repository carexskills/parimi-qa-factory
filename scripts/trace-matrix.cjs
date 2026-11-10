const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const dirs = ['tickets', 'requirements', 'business-rules', 'specs', 'tests'];
const files = dirs.flatMap((dir) => walk(path.join(root, dir)));
const read = (file) => fs.readFileSync(file, 'utf8');
const rel = (file) => path.relative(root, file).split(path.sep).join('/');
const esc = (value) => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const brPattern = /BR-[A-Z]+-\d{2}/g;
const rows = new Map();

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}
function add(map, id, name, file) {
  if (!map.has(id)) map.set(id, []);
  map.get(id).push({ id, name, file });
}
function short(text, max = 90) {
  const value = text.replace(/\s+/g, ' ').trim();
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}
function cell(items) {
  if (!items.length) return '<td class="missing">missing</td>';
  return `<td>${items.map((item) => `<span title="${esc(item.file)}">${esc(item.id)}${item.name ? ` — ${esc(short(item.name))}` : ''}</span>`).join('<br>')}</td>`;
}
function collectPattern(map, text, file, regex, getName) {
  for (const match of text.matchAll(regex)) add(map, match[0], getName(match), file);
}

const ruleFiles = files.filter((f) => f.startsWith(path.join(root, 'business-rules')) && /\.md$/i.test(f));
for (const file of ruleFiles) {
  const text = read(file);
  const source = text.match(/^Source:\s*(PP-\d+)\s*(?:\(([^)]+)\))?/m);
  for (const match of text.matchAll(/^##\s+(BR-[A-Z]+-\d{2})\s+[—-]\s+(.+)$/gm)) {
    rows.set(match[1], { id: match[1], name: match[2].trim(), file, source: source ? { id: source[1], file: source[2] || '' } : null });
  }
}

const specs = new Map(), plans = new Map(), cases = new Map(), tests = new Map(), defects = new Map(), releases = new Map(), runs = new Map();
for (const file of files) {
  const text = read(file), fileRel = rel(file);
  if (file.startsWith(path.join(root, 'specs')) && /\.feature$/i.test(file)) {
    const lines = text.split(/\r?\n/); let tag = null;
    for (const line of lines) {
      const tagMatch = line.match(/@(BR-[A-Z]+-\d{2})/); if (tagMatch) tag = tagMatch[1];
      const scenario = line.match(/^\s*Scenario(?: Outline)?:\s*(.+)/i);
      if (scenario && tag) { add(specs, tag, scenario[1], fileRel); tag = null; }
    }
  }
  if (file.startsWith(path.join(root, 'specs', 'plans')) && /\.md$/i.test(file)) {
    for (const line of text.split(/\r?\n/)) {
      if (!line.startsWith('|')) continue;
      const br = line.match(/BR-[A-Z]+-\d{2}/), title = line.split('|')[1];
      if (br && title && !/^\s*Scenario\s*$/i.test(title)) add(plans, br[0], title.trim(), fileRel);
    }
  }
  if (/CASE-[A-Z]+-\d{2}-\d{2}/.test(text)) collectPattern(cases, text, fileRel, /CASE-[A-Z]+-\d{2}-\d{2}/g, (m) => m[0]);
  if (file.startsWith(path.join(root, 'tests')) && /\.(?:spec|test)\.[cm]?[jt]sx?$/i.test(file)) {
    const titleRe = /(?:test|it)\s*\(\s*['"`]([^'"`]+)['"`][\s\S]*?(?=@(BR-[A-Z]+-\d{2})|$)/g;
    for (const m of text.matchAll(titleRe)) {
      const brs = m[0].match(brPattern) || [];
      for (const br of brs) add(tests, br, m[1], fileRel);
    }
  }
  const brs = [...new Set(text.match(brPattern) || [])];
  const bugIds = [...new Set(text.match(/BUG-[A-Z]+/g) || [])];
  for (const br of brs) {
    for (const bug of bugIds) add(defects, br, bug, fileRel);
    const releaseIds = [...new Set(text.match(/\bR\d+\b/g) || [])];
    for (const release of releaseIds) add(releases, br, release, fileRel);
  }
  const runMatch = text.match(/\b(RUN-[A-Z0-9-]+)\b[\s\S]{0,120}?(\d{4}-\d{2}-\d{2})/i) || text.match(/\b(RUN-[A-Z0-9-]+)\b/);
  if (runMatch) for (const br of brs) add(runs, br, runMatch[1] + (runMatch[2] ? ` ${runMatch[2]}` : ''), fileRel);
}

for (const row of rows.values()) {
  const ticket = row.source ? [{ id: row.source.id, name: '', file: row.source.file ? `${path.relative(root, path.resolve(path.dirname(row.file), row.source.file)).split(path.sep).join('/')} · source in ${rel(row.file)}` : rel(row.file) }] : [];
  const links = [ticket, [{ id: row.id, name: row.name, file: rel(row.file) }], specs.get(row.id) || [], plans.get(row.id) || [], cases.get(row.id) || [], tests.get(row.id) || [], runs.get(row.id) || [], defects.get(row.id) || [], releases.get(row.id) || []];
  console.log(`${row.id}: ticket ${ticket.length ? ticket[0].id : 'missing'} | spec ${(specs.get(row.id) || []).length} | plan ${(plans.get(row.id) || []).length} | cases ${(cases.get(row.id) || []).length} | tests ${(tests.get(row.id) || []).length} | last run ${(runs.get(row.id) || []).length ? (runs.get(row.id) || []).map((x) => x.name).join(', ') : 'missing'} | defects ${(defects.get(row.id) || []).length} | release ${(releases.get(row.id) || []).length}`);
  row.cells = links;
}

const headers = ['ticket', 'rule', 'spec scenario', 'plan scenarios', 'cases', 'tests', 'last run', 'defects', 'release'];
const body = [...rows.values()].map((row) => `<tr><th>${esc(row.id)}</th>${row.cells.map(cell).join('')}</tr>`).join('\n');
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Trace matrix</title><style>body{font:15px system-ui,sans-serif;margin:2rem;color:#18212b}table{border-collapse:collapse;width:100%}th,td{border:1px solid #bbc5cf;padding:.65rem;text-align:left;vertical-align:top}thead{background:#edf2f6}th[scope=row]{white-space:nowrap}.missing{color:#b42318;background:#fff0ef;font-weight:700}td span{display:inline-block;margin:.1rem 0}</style></head><body><h1>Trace matrix</h1><table><thead><tr><th>BR-ID</th>${headers.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${body}</tbody></table></body></html>\n`;
const output = path.join(root, 'reports', 'trace-matrix.html');
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, html);
