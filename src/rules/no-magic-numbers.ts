import type { TSESTree } from '@typescript-eslint/typescript-estree';
import type { Question } from '../core/types.js';
import { traverseAST } from '../utils/ast.js';

export function checkMagicNumbers(ast: TSESTree.Program, code: string): Question[] {
  const questions: Question[] = [];
  const allowedNumbers = [0, 1, -1, 2];

  traverseAST(ast, (node) => {
    if (
      node.type === 'Literal' &&
      typeof node.value === 'number' &&
      !allowedNumbers.includes(node.value)
    ) {
      questions.push({
        id: `magic-number-${node.loc?.start.line}`,
        severity: 'info',
        rule: 'no-magic-numbers',
        message: `Angka ${node.value} muncul begitu saja. Apa artinya angka ini?`,
        location: {
          line: node.loc?.start.line || 0,
          column: node.loc?.start.column || 0
        }
      });
    }
  });

  return questions;
}