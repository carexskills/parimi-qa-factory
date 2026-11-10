const fs = require('node:fs');
const path = require('node:path');

const roots = ['logs', 'reports', 'test-results'];
const skipped = new Set(['reports/index.html']);
const ssnPattern = /\b\d{3}-\d{2}-\d{4}\b/g;
const emailPattern = /\b[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
const allowedDomain = '@parimipractice.test';
let findings = 0;

function scanFile(file) {
  const relative = path.relative(process.cwd(), file).split(path.sep).join('/');
  if (skipped.has(relative)) return;

  const content = fs.readFileSync(file);
  if (content.includes(0)) return;
  const lines = content.toString('utf8').split(/\r?\n/);

  lines.forEach((line, index) => {
    for (const match of line.matchAll(ssnPattern)) {
      report(relative, index + 1, 'SSN', match.index);
    }
    for (const match of line.matchAll(emailPattern)) {
      if (!match[0].toLowerCase().endsWith(allowedDomain)) {
        report(relative, index + 1, 'email', match.index);
      }
    }
  });
}

function report(file, line, kind) {
  findings += 1;
  console.log(`${file}:${line} ${kind} [REDACTED]`);
}

function walk(directory) {
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath);
    else if (entry.isFile()) scanFile(fullPath);
  }
}

for (const root of roots) walk(root);
console.log(`PHI scan: ${findings} findings`);
if (findings !== 0) process.exitCode = 1;
