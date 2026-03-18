import { Router } from 'express';
import { z } from 'zod';
import { buildCalibrationSummary, CALIBRATION_PROMPTS } from '@station/ai/prompts/calibration';
import { calibrationSessions, personas } from '../lib/mock-db';
import { requireAuth } from '../middleware/require-auth';

const startSchema = z.object({
  personaId: z.string().optional(),
  sessionTitle: z.string().optional(),
});

const messageSchema = z.object({
  content: z.string().min(1),
});

const saveSchema = z.object({
  saveTarget: z.enum(['persona', 'global', 'public_mode', 'other']).default('persona'),
});

export const calibrationRouter = Router();
calibrationRouter.use(requireAuth);

calibrationRouter.get('/persona/:personaId', (req, res) => {
  const sessions = calibrationSessions.filter((item) => item.personaId === req.params.personaId);
  res.json({ sessions, prompts: CALIBRATION_PROMPTS });
});

calibrationRouter.get('/:id', (req, res) => {
  const session = calibrationSessions.find((item) => item.id === req.params.id);
  if (!session) return res.status(404).json({ error: 'Calibration session not found' });
  return res.json({ session, prompts: CALIBRATION_PROMPTS });
});

calibrationRouter.post('/start', (req, res) => {
  const parsed = startSchema.parse(req.body || {});
  const persona = parsed.personaId ? personas.find((item) => item.id === parsed.personaId) : null;
  if (parsed.personaId && !persona) return res.status(404).json({ error: 'Persona not found' });

  const session = {
    id: `cal-${calibrationSessions.length + 1}`,
    ownerUserId: 'demo-user',
    personaId: parsed.personaId || null,
    sessionTitle: parsed.sessionTitle || `${persona?.name || 'General'} calibration`,
    transcript: '',
    extractedStyleNotes: '',
    extractedPublicRules: '',
    extractedPrivateRules: '',
    extractedUncertaintyRules: '',
    saveTarget: 'persona' as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  calibrationSessions.unshift(session);
  res.status(201).json({ session, prompts: CALIBRATION_PROMPTS });
});

calibrationRouter.post('/:id/message', (req, res) => {
  const parsed = messageSchema.parse(req.body);
  const session = calibrationSessions.find((item) => item.id === req.params.id);
  if (!session) return res.status(404).json({ error: 'Calibration session not found' });

  const currentPrompt = CALIBRATION_PROMPTS[(session.transcript.match(/Q:/g) || []).length % CALIBRATION_PROMPTS.length];
  const addition = `Q: ${currentPrompt.prompt}\nA: ${parsed.content}`;
  session.transcript = session.transcript ? `${session.transcript}\n\n${addition}` : addition;
  const summary = buildCalibrationSummary(session.transcript);
  session.extractedStyleNotes = summary.styleNotes;
  session.extractedPublicRules = summary.publicRules;
  session.extractedPrivateRules = summary.privateRules;
  session.extractedUncertaintyRules = summary.uncertaintyRules;
  session.updatedAt = new Date().toISOString();

  const nextPrompt = CALIBRATION_PROMPTS[(session.transcript.match(/Q:/g) || []).length % CALIBRATION_PROMPTS.length];
  res.json({ session, nextPrompt });
});

calibrationRouter.post('/:id/save', (req, res) => {
  const parsed = saveSchema.parse(req.body || {});
  const session = calibrationSessions.find((item) => item.id === req.params.id);
  if (!session) return res.status(404).json({ error: 'Calibration session not found' });
  session.saveTarget = parsed.saveTarget;
  session.updatedAt = new Date().toISOString();

  if (session.personaId) {
    const persona = personas.find((item) => item.id === session.personaId);
    if (persona) {
      const merged = [persona.shortDescription, session.extractedStyleNotes].filter(Boolean).join(' | ');
      persona.shortDescription = merged.slice(0, 280);
    }
  }

  res.json({ session, saved: true });
});
