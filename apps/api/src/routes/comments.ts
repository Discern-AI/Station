
import { Router } from "express";
import { z } from "zod";
import { comments, documents, spacePages, threads } from "../lib/mock-db";
import { requireAuth } from "../middleware/require-auth";

const createCommentSchema = z.object({
  parentType: z.enum(['thread', 'document', 'page']),
  parentId: z.string().min(1),
  body: z.string().min(1),
});

export const commentsRouter = Router();

commentsRouter.get('/', (req, res) => {
  const parentType = String(req.query.parentType || '');
  const parentId = String(req.query.parentId || '');
  const filtered = comments.filter((item) => (!parentType || item.parentType === parentType) && (!parentId || item.parentId === parentId));
  res.json({ comments: filtered });
});

commentsRouter.use(requireAuth);

commentsRouter.post('/', (req, res) => {
  const parsed = createCommentSchema.parse(req.body);
  if (parsed.parentType === 'document') {
    const document = documents.find((item) => item.id === parsed.parentId);
    if (!document) return res.status(404).json({ error: 'Document not found' });
    if (!document.commentsEnabled) return res.status(400).json({ error: 'Comments are disabled for this document' });
  }
  if (parsed.parentType === 'page') {
    const page = spacePages.find((item) => item.id === parsed.parentId);
    if (!page) return res.status(404).json({ error: 'Page not found' });
    if (!page.commentsEnabled) return res.status(400).json({ error: 'Comments are disabled for this page' });
  }
  if (parsed.parentType === 'thread') {
    const thread = threads.find((item) => item.id === parsed.parentId);
    if (!thread) return res.status(404).json({ error: 'Thread not found' });
  }

  const comment = {
    id: `comment-${comments.length + 1}`,
    authorUserId: 'demo-user',
    status: 'active' as const,
    score: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...parsed,
  };
  comments.push(comment);
  res.status(201).json({ comment });
});
