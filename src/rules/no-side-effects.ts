import type { TSESTree } from '@typescript-eslint/typescript-estree';
import type { Question } from '../core/types.js';
import { traverseAST } from '../utils/ast.js';

export function checkSideEffects(ast: TSESTree.Program, code: string): Question[] {
  const questions: Question[] = [];

  traverseAST(ast, (node) => {
    if (
      node.type === 'FunctionDeclaration' &&
      node.id?.name.startsWith('get')
    ) {
      // Check if function has side effects (mutations, API calls, etc.)
      let hasSideEffect = false;
      
      traverseAST(node.body, (child) => {
        if (
          child.type === 'CallExpression' ||
          child.type === 'AssignmentExpression'
        ) {
          hasSideEffect = true;
        }
      });

      if (hasSideEffect) {
        questions.push({
          id: `side-effect-${node.loc?.start.line}`,
          severity: 'info',
          rule: 'no-side-effects',
          message: `Fungsi '${node.id?.name}' namanya 'get' tapi kayaknya ada side effect. Apakah ini disengaja?`,
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