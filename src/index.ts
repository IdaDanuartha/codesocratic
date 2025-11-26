import { analyze } from './core/analyzer.js';
import type { AnalysisOptions, AnalysisResult } from './core/types.js';

export { analyze as analyzeCode };
export type { AnalysisOptions, AnalysisResult };

export { getAST, traverseAST } from './utils/ast.js';
export { formatOutput } from './utils/formatter.js';