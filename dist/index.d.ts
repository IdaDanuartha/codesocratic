import { TSESTree } from '@typescript-eslint/typescript-estree';

type Severity = 'info' | 'warning' | 'danger';
type Tone = 'formal' | 'friendly' | 'roasting';
interface CodeLocation {
    line: number;
    column: number;
}
interface Question {
    id: string;
    severity: Severity;
    rule: string;
    message: string;
    location?: CodeLocation;
}
interface AnalysisResult {
    summary: string;
    questions: Question[];
}
interface AnalysisOptions {
    tone?: Tone;
}

declare function analyze(code: string, options?: AnalysisOptions): AnalysisResult;

declare function getAST(code: string): TSESTree.Program;
declare function traverseAST(node: TSESTree.Node, visitor: (node: TSESTree.Node) => void): void;

declare function formatOutput(questions: Question[], tone: Tone): AnalysisResult;

export { type AnalysisOptions, type AnalysisResult, analyze as analyzeCode, formatOutput, getAST, traverseAST };
