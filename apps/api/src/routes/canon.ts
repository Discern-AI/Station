import { Router } from "express";
import { z } from "zod";
import { canonItems, personas } from "../lib/mock-db";
import { requireAuth } from "../middleware/require-auth";

const createSchema = z.object({
  title: z.string().optional(),
  content: z.string().min(1),
  sourceType: z.enum(["chat", "import", "document", "calibration", "manual"]).default("manual"),
  priority: z.number().int().min(1).max(10).optional(),
});

export const canonRouter = Router();
canonRouter.use(requireAuth);

canonRouter.get("/persona/:personaId", (req, res) => {
  const persona = personas.find((item) => item.id === req.params.personaId);
  if (!persona) return res.status(404).json({ error: "Persona not found" });
  return res.json({ canon: canonItems.filter((item) => item.personaId === persona.id) });
});

canonRouter.post("/persona/:personaId", (req, res) => {
  const persona = personas.find((item) => item.id === req.params.personaId);
  if (!persona) return res.status(404).json({ error: "Persona not found" });
  const parsed = createSchema.parse(req.body);
  const item = {
    id: `can-${canonItems.length + 1}`,
    personaId: persona.id,
    title: parsed.title,
    content: parsed.content,
    sourceType: parsed.sourceType,
    priority: parsed.priority ?? 1,
    createdAt: new Date().toISOString(),
  };
  canonItems.unshift(item);
  return res.status(201).json({ canonItem: item });
});

canonRouter.patch("/:id", (req, res) => {
  const item = canonItems.find((entry) => entry.id === req.params.id);
  if (!item) return res.status(404).json({ error: "Canon item not found" });
  const parsed = createSchema.partial().parse(req.body);
  Object.assign(item, parsed);
  return res.json({ canonItem: item });
});

canonRouter.delete("/:id", (req, res) => {
  const index = canonItems.findIndex((entry) => entry.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Canon item not found" });
  const [removed] = canonItems.splice(index, 1);
  return res.json({ removed });
});
