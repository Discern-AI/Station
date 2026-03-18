import { Router } from "express";
import { z } from "zod";
import { importJobs, memoryItems, personaFiles, personas } from "../lib/mock-db";
import { requireAuth } from "../middleware/require-auth";

const fileSchema = z.object({
  personaId: z.string().min(1),
  fileName: z.string().min(1),
  fileType: z.string().optional(),
});

const chatSchema = z.object({
  personaId: z.string().min(1),
  content: z.string().min(1),
  sourceName: z.string().default("pasted-chat"),
});

export const importsRouter = Router();
importsRouter.use(requireAuth);

importsRouter.post("/file", (req, res) => {
  const parsed = fileSchema.parse(req.body);
  const persona = personas.find((item) => item.id === parsed.personaId);
  if (!persona) return res.status(404).json({ error: "Persona not found" });

  const file = {
    id: `file-${personaFiles.length + 1}`,
    personaId: persona.id,
    fileName: parsed.fileName,
    fileType: parsed.fileType,
    storagePath: `mock/${persona.id}/${parsed.fileName}`,
    sourceType: "import" as const,
    createdAt: new Date().toISOString(),
  };
  personaFiles.unshift(file);

  const job = {
    id: `import-${importJobs.length + 1}`,
    personaId: persona.id,
    kind: "file" as const,
    status: "completed" as const,
    sourceName: parsed.fileName,
    createdAt: new Date().toISOString(),
  };
  importJobs.unshift(job);

  res.status(201).json({ job, file });
});

importsRouter.post("/chat", (req, res) => {
  const parsed = chatSchema.parse(req.body);
  const persona = personas.find((item) => item.id === parsed.personaId);
  if (!persona) return res.status(404).json({ error: "Persona not found" });

  const job = {
    id: `import-${importJobs.length + 1}`,
    personaId: persona.id,
    kind: "chat" as const,
    status: "completed" as const,
    sourceName: parsed.sourceName,
    createdAt: new Date().toISOString(),
  };
  importJobs.unshift(job);

  memoryItems.unshift({
    id: `mem-${memoryItems.length + 1}`,
    personaId: persona.id,
    title: `Imported chat: ${parsed.sourceName}`,
    content: parsed.content.slice(0, 4000),
    summary: "Imported chat fragment saved for continuity.",
    sourceType: "import",
    relevanceWeight: 1.5,
    createdAt: new Date().toISOString(),
  });

  res.status(201).json({ job, imported: true });
});

importsRouter.get("/:id/status", (req, res) => {
  const job = importJobs.find((item) => item.id === req.params.id);
  if (!job) return res.status(404).json({ error: "Import job not found" });
  return res.json({ job });
});
