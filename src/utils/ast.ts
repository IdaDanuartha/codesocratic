import { parse } from '@typescript-eslint/typescript-estree';
import type { TSESTree } from '@typescript-eslint/typescript-estree';

export function getAST(code: string): TSESTree.Program {
  return parse(code, {
    jsx: true,
    loc: true,
    range: true,
    comment: false,
  });
}

export function traverseAST(
  node: TSESTree.Node,
  visitor: (node: TSESTree.Node) => void
): void {
  visitor(node);
  
  for (const key of Object.keys(node)) {
    const child = (node as any)[key];
    
    if (child && typeof child === 'object') {
      if (Array.isArray(child)) {
        child.forEach(item => {
          if (item && typeof item.type === 'string') {
            traverseAST(item, visitor);
          }
        });
      } else if (typeof child.type === 'string') {
        traverseAST(child, visitor);
      }
    }
  }
}