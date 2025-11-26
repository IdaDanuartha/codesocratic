import type { TSESTree } from '@typescript-eslint/typescript-estree';
import type { Question } from '../core/types.js';
import { traverseAST } from '../utils/ast.js';

export function checkUnhandledAsync(ast: TSESTree.Program, code: string): Question[] {
  const questions: Question[] = [];

  traverseAST(ast, (node) => {
    if (
      node.type === 'CallExpression' &&
      node.callee.type === 'Identifier' &&
      node.callee.name === 'fetch'
    ) {
      // Check if fetch is awaited or has .catch()
      const parent = findParent(ast, node);
      
      if (!isHandledAsync(parent)) {
        questions.push({
          id: `unhandled-async-${node.loc?.start.line}`,
          severity: 'danger',
          rule: 'no-unhandled-async',
          message: 'Kalau fetch gagal atau response bukan JSON, apa yang terjadi?',
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

function findParent(ast: TSESTree.Node, target: TSESTree.Node): TSESTree.Node | null {
  // Simplified parent finder - in production use proper AST parent tracking
  return null;
}

function isHandledAsync(node: TSESTree.Node | null): boolean {
  // Check if wrapped in try-catch or has .catch()
  return false; // Simplified for demo
}