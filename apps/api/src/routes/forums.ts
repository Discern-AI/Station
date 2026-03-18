import { Router } from "express";
import { z } from "zod";
import { forumCategories, threads } from "../lib/mock-db";
import { requireAuth } from "../middleware/require-auth";

const createThreadSchema = z.object({
  categoryId: z.string().min(1),
  title: z.string().min(1),
  body: z.string().min(1),
  linkedSpaceId: z.string().optional().nullable(),
  linkedPersonaId: z.string().optional().nullable(),
});

export const forumsRouter = Router();

forumsRouter.get('/categories', (_req, res) => {
  res.json({ categories: forumCategories.sort((a, b) => a.sortOrder - b.sortOrder) });
});

forumsRouter.get('/categories/:slug', (req, res) => {
  const category = forumCategories.find((item) => item.slug === req.params.slug || item.id === req.params.slug);
  if (!category) return res.status(404).json({ error: 'Category not found' });
  const categoryThreads = threads.filter((item) => item.categoryId === category.id);
  res.json({ category, threads: categoryThreads });
});

forumsRouter.use(requireAuth);

forumsRouter.post('/threads', (req, res) => {
  const parsed = createThreadSchema.parse(req.body);
  const thread = {
    id: `thread-${threads.length + 1}`,
    authorUserId: 'demo-user',
    status: 'active' as const,
    score: 0,
    commentCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...parsed,
  };
  threads.push(thread);
  res.status(201).json({ thread });
});
