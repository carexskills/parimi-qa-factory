const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const ts = require('typescript');

const root = execFileSync('git', ['rev-parse', '--show-toplevel'], { encoding: 'utf8' }).trim();
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' });
const errors = [];
const sections = ['roles', 'who edits what', 'protected assertions', 'the healer', 'gate rules', 'secrets'];
const agentsPath = path.join(root, 'AGENTS.md');
const headings = fs.existsSync(agentsPath)
  ? [...fs.readFileSync(agentsPath, 'utf8').matchAll(/^##\s+(.+?)\s*#*\s*$/gm)].map(match => match[1].toLowerCase())
  : [];
for (const section of sections) {
  if (!headings.includes(section)) errors.push(`AGENTS.md is missing section: ${section}`);
}

// Parse whole expression statements so multiline expect/assert calls are protected too.
function protectedLines(file, source) {
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
  const lines = new Set();
  function isAssertion(node) {
    if (ts.isCallExpression(node)) {
      const callee = node.expression;
      if ((ts.isIdentifier(callee) && /^(expect|assert)$/.test(callee.text)) ||
          (ts.isPropertyAccessExpression(callee) && ts.isIdentifier(callee.expression) &&
           /^(expect|assert)$/.test(callee.expression.text))) return true;
    }
    return ts.forEachChild(node, isAssertion) || false;
  }
  function visit(node) {
    if (ts.isExpressionStatement(node) && isAssertion(node) && /\bBR-[A-Za-z0-9][A-Za-z0-9_-]*\b/.test(node.getText(ast))) {
      const start = ast.getLineAndCharacterOfPosition(node.getStart(ast)).line + 1;
      const end = ast.getLineAndCharacterOfPosition(node.getEnd()).line + 1;
      for (let line = start; line <= end; line++) lines.add(line);
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
  return lines;
}

// HEAD includes both staged and unstaged changes; disable renames to inspect both paths.
const files = git('diff', 'HEAD', '--no-renames', '--name-only', '-z', '--', 'tests/').split('\0').filter(Boolean);
for (const file of files) {
  let before = '';
  try { before = git('show', `HEAD:${file}`); } catch { /* Newly added file. */ }
  const absolute = path.join(root, file);
  const after = fs.existsSync(absolute) ? fs.readFileSync(absolute, 'utf8') : '';
  const oldProtected = protectedLines(file, before);
  const newProtected = protectedLines(file, after);
  const diff = git('diff', 'HEAD', '--no-ext-diff', '--no-textconv', '--no-renames', '--unified=0', '--', file);
  let oldLine = 0;
  let newLine = 0;
  let inHunk = false;
  for (const line of diff.split('\n')) {
    const hunk = /^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/.exec(line);
    if (hunk) {
      oldLine = Number(hunk[1]);
      newLine = Number(hunk[2]);
      inHunk = true;
    } else if (inHunk && line.startsWith('-')) {
      if (oldProtected.has(oldLine)) errors.push(`${file}:${oldLine}: removed or changed a protected BR-ID assertion line`);
      oldLine++;
    } else if (inHunk && line.startsWith('+')) {
      if (newProtected.has(newLine)) errors.push(`${file}:${newLine}: added or changed a protected BR-ID assertion line`);
      newLine++;
    } else if (inHunk && line.startsWith(' ')) {
      oldLine++;
      newLine++;
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Agent rules verified. No BR-ID assertion lines changed in tests/.');
}
