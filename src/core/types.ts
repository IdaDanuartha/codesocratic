export type Severity = 'info' | 'warning' | 'danger';

export type Tone = 'formal' | 'friendly' | 'roasting';

export interface CodeLocation {
  line: number;
  column: number;
}

export interface Question {
  id: string;
  severity: Severity;
  rule: string;
  message: string;
  location?: CodeLocation;
}

export interface AnalysisResult {
  summary: string;
  questions: Question[];
}

export interface AnalysisOptions {
  tone?: Tone;
}