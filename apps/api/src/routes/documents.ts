import { Router } from 'express';
import { z } from 'zod';
import { documents } from '../lib/mock-db';
import { requireAuth } from '../middleware/require-auth';

const createDocumentSchema = z.object({
  spaceId: z.string().min(1),
  personaId: z.string().optional().nullable(),
  title: z.string().min(1),
  slug: z.string().min(1),
  body: z.string().min(1),
  documentType: z.enum(['post', 'constitution', 'canon_note', 'essay', 'note', 'manifesto']).default('post'),
  visibility: z.enum(['private', 'public']).default('public'),
  commentsEnabled: z.boolean().default(true),
});

export const documentsRouter = Router();

documentsRouter.get('/', (_req, res) => {
  res.json({ documents });
});

documentsRouter.get('/:id', (req, res) => {
  const document = documents.find((item) => item.id === req.params.id || item.slug === req.params.id);
  if (!document) return res.status(404).json({ error: 'Document not found' });
  return res.json({ document });
});

documentsRouter.use(requireAuth);

documentsRouter.post('/', (req, res) => {
  const parsed = createDocumentSchema.parse(req.body);
  const now = new Date().toISOString();
  const document = {
    id: `doc-${documents.length + 1}`,
    authorUserId: 'demo-user',
    status: 'draft' as const,
    createdAt: now,
    updatedAt: now,
    ...parsed,
  };
  documents.unshift(document);
  res.status(201).json({ document });
});

documentsRouter.post('/:id/publish', (req, res) => {
  const document = documents.find((item) => item.id === req.params.id);
  if (!document) return res.status(404).json({ error: 'Document not found' });
  document.status = 'published';
  document.visibility = 'public';
  document.publishedAt = new Date().toISOString();
  document.updatedAt = new Date().toISOString();
  res.json({ document });
});
