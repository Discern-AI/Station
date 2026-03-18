import { Router } from "express";
import { z } from "zod";
import { personas } from "../lib/mock-db";
import { requireAuth } from "../middleware/require-auth";

const createSchema = z.object({
  name: z.string().min(1),
  shortDescription: z.string().optional(),
  visibility: z.enum(["private", "public"]).default("private"),
});

export const personasRouter = Router();

personasRouter.use(requireAuth);

personasRouter.get("/", (_req, res) => {
  res.json({ personas });
});

personasRouter.get("/:id", (req, res) => {
  const persona = personas.find((item) => item.id === req.params.id);
  if (!persona) return res.status(404).json({ error: "Persona not found" });
  return res.json({ persona });
});

personasRouter.post("/", (req, res) => {
  const parsed = createSchema.parse(req.body);
  const persona = {
    id: `persona-${personas.length + 1}`,
    name: parsed.name,
    shortDescription: parsed.shortDescription || "",
    visibility: parsed.visibility,
  };
  personas.push(persona);
  res.status(201).json({ persona });
});
