import { Router } from "express";
import { z } from "zod";
import { personaFiles, personas } from "../lib/mock-db";
import { requireAuth } from "../middleware/require-auth";

const createSchema = z.object({
  fileName: z.string().min(1),
  fileType: z.string().optional(),
  storagePath: z.string().optional(),
  sourceType: z.enum(["upload", "import", "calibration", "generated"]).default("upload"),
});

export const personaFilesRouter = Router();
personaFilesRouter.use(requireAuth);

personaFilesRouter.get("/persona/:personaId", (req, res) => {
  const persona = personas.find((item) => item.id === req.params.personaId);
  if (!persona) return res.status(404).json({ error: "Persona not found" });
  return res.json({ files: personaFiles.filter((item) => item.personaId === persona.id) });
});

personaFilesRouter.post("/persona/:personaId", (req, res) => {
  const persona = personas.find((item) => item.id === req.params.personaId);
  if (!persona) return res.status(404).json({ error: "Persona not found" });
  const parsed = createSchema.parse(req.body);
  const file = {
    id: `file-${personaFiles.length + 1}`,
    personaId: persona.id,
    fileName: parsed.fileName,
    fileType: parsed.fileType,
    storagePath: parsed.storagePath ?? `mock/${persona.id}/${parsed.fileName}`,
    sourceType: parsed.sourceType,
    createdAt: new Date().toISOString(),
  };
  personaFiles.unshift(file);
  return res.status(201).json({ file });
});

personaFilesRouter.delete("/:id", (req, res) => {
  const index = personaFiles.findIndex((entry) => entry.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "File not found" });
  const [removed] = personaFiles.splice(index, 1);
  return res.json({ removed });
});
