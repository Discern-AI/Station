
import { Router } from "express";
import { threads, comments } from "../lib/mock-db";

export const threadsRouter = Router();

threadsRouter.get('/:id', (req, res) => {
  const thread = threads.find((item) => item.id === req.params.id);
  if (!thread) return res.status(404).json({ error: 'Thread not found' });
  const threadComments = comments.filter((item) => item.parentType === 'thread' && item.parentId === thread.id);
  res.json({ thread, comments: threadComments });
});
