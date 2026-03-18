export interface CalibrationPrompt {
  key: string;
  prompt: string;
  hint?: string;
}

export const CALIBRATION_PROMPTS: CalibrationPrompt[] = [
  {
    key: 'tone',
    prompt: 'How should this persona sound when it is speaking at its best?',
    hint: 'Describe warmth, formality, rhythm, humour, and anything it should avoid.',
  },
  {
    key: 'beliefs',
    prompt: 'What worldview or beliefs define this persona?',
    hint: 'Include values, recurring ideas, and how it interprets the world.',
  },
  {
    key: 'public_mode',
    prompt: 'How should this persona present itself in public compared with private chat?',
    hint: 'Explain the difference between intimate continuity mode and public representation mode.',
  },
  {
    key: 'uncertainty',
    prompt: 'How should the persona behave when it is uncertain or does not know something?',
    hint: 'Should it hedge, ask questions, reflect, refuse, or redirect?',
  },
  {
    key: 'difficult_questions',
    prompt: 'How should it respond to difficult, hostile, or emotionally charged questions?',
    hint: 'Focus on tone and stance rather than changing core safety boundaries.',
  },
];

export function buildCalibrationSummary(transcript: string) {
  const cleaned = transcript.trim();
  if (!cleaned) {
    return {
      styleNotes: '',
      publicRules: '',
      privateRules: '',
      uncertaintyRules: '',
    };
  }

  const chunks = cleaned.split(/\n+/).filter(Boolean);

  return {
    styleNotes: chunks.slice(0, 3).join('\n'),
    publicRules: chunks.filter((line) => /public|stranger|outside/i.test(line)).slice(0, 3).join('\n'),
    privateRules: chunks.filter((line) => /private|owner|intimate|continuity/i.test(line)).slice(0, 3).join('\n'),
    uncertaintyRules: chunks.filter((line) => /uncertain|unknown|refuse|redirect|difficult/i.test(line)).slice(0, 3).join('\n'),
  };
}
