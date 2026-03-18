import { Router } from "express";
import { z } from "zod";
import { DeepseekProvider } from "@station/ai/providers/deepseek";
import { buildPersonaChatPrompt } from "@station/ai/prompts/persona-chat";
import { selectContinuityContext } from "@station/ai";
import { canonItems, conversationMessages, conversations, memoryItems, personas } from "../lib/mock-db";
import { env } from "../lib/env";
import { requireAuth } from "../middleware/require-auth";

const chatSchema = z.object({
  content: z.string().min(1),
});

const provider = new DeepseekProvider({
  apiKey: env.DEEPSEEK_API_KEY,
  baseUrl: env.DEEPSEEK_BASE_URL,
  model: env.DEEPSEEK_MODEL,
});

export const conversationsRouter = Router();
conversationsRouter.use(requireAuth);

conversationsRouter.get("/persona/:personaId", (req, res) => {
  const results = conversations.filter((item) => item.personaId === req.params.personaId);
  res.json({ conversations: results });
});

conversationsRouter.get("/:conversationId", (req, res) => {
  const conversation = conversations.find((item) => item.id === req.params.conversationId);
  if (!conversation) return res.status(404).json({ error: "Conversation not found" });
  return res.json({ conversation, messages: conversationMessages[conversation.id] || [] });
});

conversationsRouter.post("/persona/:personaId", async (req, res) => {
  const parsed = chatSchema.parse(req.body);
  const persona = personas.find((item) => item.id === req.params.personaId);
  if (!persona) return res.status(404).json({ error: "Persona not found" });

  let conversation = conversations.find((item) => item.personaId === persona.id);
  if (!conversation) {
    conversation = {
      id: `conv-${conversations.length + 1}`,
      personaId: persona.id,
      title: `${persona.name} chat`,
      mode: "private",
      createdAt: new Date().toISOString(),
    };
    conversations.push(conversation);
    conversationMessages[conversation.id] = [];
  }

  const existing = conversationMessages[conversation.id] || [];
  existing.push({ id: `msg-${existing.length + 1}`, role: "user", content: parsed.content, createdAt: new Date().toISOString() });

  const continuity = selectContinuityContext({
    canon: canonItems.filter((item) => item.personaId === persona.id),
    memory: memoryItems.filter((item) => item.personaId === persona.id),
    query: parsed.content,
  });

  const system = buildPersonaChatPrompt({
    name: persona.name,
    shortDescription: persona.shortDescription || "",
    visibility: persona.visibility,
    canon: continuity.canon.map((item) => item.content),
    memory: continuity.memory.map((item) => item.summary || item.content),
  });

  const response = await provider.sendMessage({
    system,
    messages: existing.map((message) => ({ role: message.role, content: message.content })),
  });

  const assistantMessage = {
    id: `msg-${existing.length + 1}`,
    role: "assistant" as const,
    content: response.content,
    createdAt: new Date().toISOString(),
  };

  existing.push(assistantMessage);
  conversationMessages[conversation.id] = existing;

  res.json({ conversation, reply: assistantMessage, messages: existing });
});


conversationsRouter.post("/:conversationId/save-memory", (req, res) => {
  const conversation = conversations.find((item) => item.id === req.params.conversationId);
  if (!conversation) return res.status(404).json({ error: "Conversation not found" });
  const messages = conversationMessages[conversation.id] || [];
  const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
  if (!lastAssistant) return res.status(400).json({ error: "No assistant message available to save." });
  const item = {
    id: `mem-${memoryItems.length + 1}`,
    personaId: conversation.personaId,
    title: "Saved from chat",
    content: lastAssistant.content,
    summary: lastAssistant.content.slice(0, 200),
    sourceType: "chat" as const,
    relevanceWeight: 1.25,
    createdAt: new Date().toISOString(),
  };
  memoryItems.unshift(item);
  return res.status(201).json({ memoryItem: item });
});

conversationsRouter.post("/:conversationId/save-canon", (req, res) => {
  const conversation = conversations.find((item) => item.id === req.params.conversationId);
  if (!conversation) return res.status(404).json({ error: "Conversation not found" });
  const messages = conversationMessages[conversation.id] || [];
  const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
  if (!lastAssistant) return res.status(400).json({ error: "No assistant message available to save." });
  const item = {
    id: `can-${canonItems.length + 1}`,
    personaId: conversation.personaId,
    title: "Saved from chat",
    content: lastAssistant.content,
    sourceType: "chat" as const,
    priority: 2,
    createdAt: new Date().toISOString(),
  };
  canonItems.unshift(item);
  return res.status(201).json({ canonItem: item });
});
