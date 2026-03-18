import { Router } from 'express';
import { z } from 'zod';
import { spaces, spacePages, personas, documents } from '../lib/mock-db';
import { requireAuth } from '../middleware/require-auth';

const createSpaceSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  shortDescription: z.string().optional(),
  longDescription: z.string().optional(),
  isPublic: z.boolean().default(true),
});

const createPageSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  pageType: z.enum(['home', 'about', 'personas', 'documents', 'custom']).default('custom'),
  body: z.string().optional(),
  commentsEnabled: z.boolean().default(false),
  isPublished: z.boolean().default(true),
});

export const spacesRouter = Router();

spacesRouter.get('/', (_req, res) => {
  res.json({ spaces });
});

spacesRouter.get('/:slug', (req, res) => {
  const space = spaces.find((item) => item.slug === req.params.slug || item.id === req.params.slug);
  if (!space) return res.status(404).json({ error: 'Space not found' });
  const pages = spacePages.filter((p) => p.spaceId === space.id).sort((a, b) => a.sortOrder - b.sortOrder);
  const linkedPersonas = personas.filter((p) => p.visibility === 'public');
  const linkedDocuments = documents.filter((d) => d.spaceId === space.id);
  return res.json({ space, pages, personas: linkedPersonas, documents: linkedDocuments });
});

spacesRouter.use(requireAuth);

spacesRouter.post('/', (req, res) => {
  const parsed = createSpaceSchema.parse(req.body);
  const space = {
    id: `space-${spaces.length + 1}`,
    ownerUserId: 'demo-user',
    commentsDefaultEnabled: true,
    ...parsed,
  };
  spaces.push(space);
  res.status(201).json({ space });
});

spacesRouter.post('/:id/pages', (req, res) => {
  const parsed = createPageSchema.parse(req.body);
  const space = spaces.find((item) => item.id === req.params.id);
  if (!space) return res.status(404).json({ error: 'Space not found' });
  const page = {
    id: `page-${spacePages.length + 1}`,
    spaceId: space.id,
    sortOrder: spacePages.filter((p) => p.spaceId === space.id).length + 1,
    ...parsed,
  };
  spacePages.push(page);
  res.status(201).json({ page });
});
