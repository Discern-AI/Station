import { Router } from "express";
import { z } from "zod";
import { memoryItems, personas } from "../lib/mock-db";
import { requireAuth } from "../middleware/require-auth";

const createSchema = z.object({
  title: z.string().optional(),
  content: z.string().min(1),
  summary: z.string().optional(),
  sourceType: z.enum(["chat", "import", "document", "calibration", "manual"]).default("manual"),
  relevanceWeight: z.number().optional(),
});

export const memoryRouter = Router();
memoryRouter.use(requireAuth);

memoryRouter.get("/persona/:personaId", (req, res) => {
  const persona = personas.find((item) => item.id === req.params.personaId);
  if (!persona) return res.status(404).json({ error: "Persona not found" });
  return res.json({ memory: memoryItems.filter((item) => item.personaId === persona.id) });
});

memoryRouter.post("/persona/:personaId", (req, res) => {
  const persona = personas.find((item) => item.id === req.params.personaId);
  if (!persona) return res.status(404).json({ error: "Persona not found" });
  const parsed = createSchema.parse(req.body);
  const item = {
    id: `mem-${memoryItems.length + 1}`,
    personaId: persona.id,
    title: parsed.title,
    content: parsed.content,
    summary: parsed.summary,
    sourceType: parsed.sourceType,
    relevanceWeight: parsed.relevanceWeight ?? 1,
    createdAt: new Date().toISOString(),
  };
  memoryItems.unshift(item);
  return res.status(201).json({ memoryItem: item });
});

memoryRouter.patch("/:id", (req, res) => {
  const item = memoryItems.find((entry) => entry.id === req.params.id);
  if (!item) return res.status(404).json({ error: "Memory item not found" });
  const parsed = createSchema.partial().parse(req.body);
  Object.assign(item, parsed);
  return res.json({ memoryItem: item });
});

memoryRouter.delete("/:id", (req, res) => {
  const index = memoryItems.findIndex((entry) => entry.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Memory item not found" });
  const [removed] = memoryItems.splice(index, 1);
  return res.json({ removed });
});
