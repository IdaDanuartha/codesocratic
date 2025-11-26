import type { TSESTree } from '@typescript-eslint/typescript-estree';
import type { Question } from '../core/types.js';
import { traverseAST } from '../utils/ast.js';

export function checkErrorSwallowing(ast: TSESTree.Program, code: string): Question[] {
  const questions: Question[] = [];

  traverseAST(ast, (node) => {
    if (node.type === 'CatchClause') {
      const hasEmptyBlock = 
        node.body.type === 'BlockStatement' && 
        node.body.body.length === 0;

      if (hasEmptyBlock) {
        questions.push({
          id: `error-swallow-${node.loc?.start.line}`,
          severity: 'warning',
          rule: 'no-error-swallowing',
          message: 'Catch block kosong. Apa yang harus dilakukan kalau error terjadi?',
          location: {
            line: node.loc?.start.line || 0,
            column: node.loc?.start.column || 0
          }
        });
      }
    }
  });

  return questions;
}