
import { Router } from "express";
import { discoverFeedItems, documents, personas, spaces, threads } from "../lib/mock-db";

export const discoverRouter = Router();

discoverRouter.get('/feed', (_req, res) => {
  res.json({ items: discoverFeedItems });
});

discoverRouter.get('/new', (_req, res) => {
  res.json({ items: [...discoverFeedItems].sort((a, b) => b.createdAt.localeCompare(a.createdAt)) });
});

discoverRouter.get('/trending', (_req, res) => {
  const items = [...discoverFeedItems].sort((a, b) => a.title.localeCompare(b.title));
  res.json({ items });
});

discoverRouter.get('/search', (req, res) => {
  const q = String(req.query.q || '').trim().toLowerCase();
  if (!q) return res.json({ personas: [], spaces: [], documents: [], threads: [] });

  const match = (value?: string) => (value || '').toLowerCase().includes(q);

  res.json({
    personas: personas.filter((item) => match(item.name) || match(item.shortDescription)),
    spaces: spaces.filter((item) => match(item.title) || match(item.shortDescription) || match(item.longDescription)),
    documents: documents.filter((item) => match(item.title) || match(item.body)),
    threads: threads.filter((item) => match(item.title) || match(item.body)),
  });
});
