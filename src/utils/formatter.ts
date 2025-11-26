import type { Question, Tone, AnalysisResult } from '../core/types.js';

export function formatOutput(questions: Question[], tone: Tone): AnalysisResult {
  const summaries: Record<Tone, string> = {
    formal: `Ditemukan ${questions.length} area yang memerlukan klarifikasi dalam implementasi kode Anda.`,
    friendly: `Hei! Ada ${questions.length} hal yang bisa kita diskusikan tentang kode ini 🤔`,
    roasting: `Wah, sepertinya ada ${questions.length} hal yang... menarik di sini 🔥`
  };

  return {
    summary: summaries[tone] || summaries.friendly,
    questions
  };
}