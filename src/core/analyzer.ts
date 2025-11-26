import { getAST } from '../utils/ast.js';
import { applyRules } from '../rules/index.js';
import { formatOutput } from '../utils/formatter.js';
import type { AnalysisOptions, AnalysisResult } from './types.js';

export function analyze(code: string, options: AnalysisOptions = {}): AnalysisResult {
  const tone = options.tone || 'friendly';
  
  try {
    const ast = getAST(code);
    const questions = applyRules(ast, code);
    
    return formatOutput(questions, tone);
  } catch (error) {
    return {
      summary: `Gagal menganalisis kode: ${error instanceof Error ? error.message : 'Unknown error'}`,
      questions: []
    };
  }
}