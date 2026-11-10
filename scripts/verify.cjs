const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const failures = [];
const testRoot = path.join(root, 'tests');

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : (/\.spec\.ts$/.test(entry.name) ? [target] : []);
  });
}

function report(file, line, rule) {
  failures.push(`${path.relative(root, file)}:${line}: ${rule}`);
}

for (const file of walk(testRoot)) {
  const source = fs.readFileSync(file, 'utf8');
  const lines = source.split(/\r?\n/);
  const headerIndex = lines.findIndex((line) => line.trim() !== '');
  const header = headerIndex >= 0 ? lines[headerIndex] : '';
  if (!/^\s*\/\/\s*Spec:\s*.+;\s*BR-IDs:\s*.+\.$/.test(header)) {
    report(file, Math.max(1, headerIndex + 1), 'header must name the spec and BR-IDs');
  }

  lines.forEach((line, index) => {
    if (/waitForTimeout\s*\(|\bsleep\s*\(/.test(line)) {
      report(file, index + 1, 'fixed waits are forbidden (waitForTimeout/sleep)');
    }
    if (/\.(?:locator|\$|\$\$)\s*\(\s*(['"`])/.test(line)) {
      const selector = line.match(/\.(?:locator|\$|\$\$)\s*\(\s*(['"`])([^'"`]*)\1/);
      if (selector && (/^(?:xpath=|css=|\/\/|\.\/|\.\.\/|[#.\[])/.test(selector[2]) || /^[\w-]+(?:[.#\[][\w#.[\]=:'" -]*)?$/.test(selector[2]))) {
        report(file, index + 1, 'CSS and XPath locators are forbidden');
      }
    }
  });
}

try {
  execFileSync(process.execPath, ['node_modules/typescript/bin/tsc', '--noEmit', '-p', 'tsconfig.json'], { cwd: root, stdio: 'pipe' });
} catch (error) {
  const output = `${error.stdout ?? ''}${error.stderr ?? ''}`.toString();
  for (const line of output.split(/\r?\n/).filter(Boolean)) {
    const match = /^(.+?)\((\d+),(\d+)\):/.exec(line);
    report(match ? path.resolve(root, match[1]) : path.join(testRoot, 'seed.spec.ts'), match ? Number(match[2]) : 1, `type check failed: ${line}`);
  }
}

try {
  execFileSync(process.execPath, ['scripts/verify-agents.cjs'], { cwd: root, stdio: 'pipe' });
} catch (error) {
  const output = `${error.stdout ?? ''}${error.stderr ?? ''}`.toString();
  for (const line of output.split(/\r?\n/).filter(Boolean)) {
    const match = /^(.+?):(\d+):\s*(.+)$/.exec(line);
    if (match) report(path.resolve(root, match[1]), Number(match[2]), `verify:agents: ${match[3]}`);
    else report(path.join(root, 'AGENTS.md'), 1, `verify:agents: ${line}`);
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Verification passed: type check, test gates, and agent rules.');
}
