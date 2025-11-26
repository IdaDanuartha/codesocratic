import type { TSESTree } from '@typescript-eslint/typescript-estree';
import type { Question } from '../core/types.js';
import { checkUnhandledAsync } from './no-unhandled-async.js';
import { checkErrorSwallowing } from './no-error-swallowing.js';
import { checkSideEffects } from './no-side-effects.js';
import { checkMagicNumbers } from './no-magic-numbers.js';

export function applyRules(ast: TSESTree.Program, code: string): Question[] {
  const questions: Question[] = [];

  questions.push(...checkUnhandledAsync(ast, code));
  questions.push(...checkErrorSwallowing(ast, code));
  questions.push(...checkSideEffects(ast, code));
  questions.push(...checkMagicNumbers(ast, code));

  return questions;
}