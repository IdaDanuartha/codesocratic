#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help')) {
    console.log(`
🦆 CodeSocratic - Socratic Code Analyzer

Usage:
  codesocratic <file> [--tone=formal|friendly|roasting]
  codesocratic --help
  codesocratic --version

Examples:
  codesocratic src/app.ts
  codesocratic index.js --tone=roasting
  codesocratic main.ts --tone=formal

Options:
  --tone       Set analysis tone (formal, friendly, roasting)
  --help       Show this help message
  --version    Show version number
    `);
    process.exit(0);
  }

  if (args.includes('--version')) {
    const pkgPath = join(__dirname, '..', 'package.json');
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    console.log(`codesocratic v${pkg.version}`);
    process.exit(0);
  }

  const filePath = args[0];
  const toneArg = args.find(arg => arg.startsWith('--tone='));
  const tone = toneArg ? toneArg.split('=')[1] : 'friendly';

  try {
    // Dynamic import untuk ESM
    const { analyzeCode } = await import('../dist/index.js');
    const code = readFileSync(filePath, 'utf-8');
    const result = analyzeCode(code, { tone });
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});