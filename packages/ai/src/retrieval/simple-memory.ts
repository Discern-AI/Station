import type { CanonItem, MemoryItem } from "@station/types/persona";

function scoreByQuery(text: string, query: string): number {
  const q = query.toLowerCase().trim();
  if (!q) return 0;
  const t = text.toLowerCase();
  let score = 0;
  for (const token of q.split(/\s+/).filter(Boolean)) {
    if (t.includes(token)) score += 1;
  }
  return score;
}

export function selectContinuityContext(input: {
  canon: CanonItem[];
  memory: MemoryItem[];
  query: string;
  maxCanon?: number;
  maxMemory?: number;
}) {
  const maxCanon = input.maxCanon ?? 3;
  const maxMemory = input.maxMemory ?? 4;

  const canon = [...input.canon]
    .sort((a, b) => (b.priority ?? 1) - (a.priority ?? 1))
    .slice(0, maxCanon);

  const memory = [...input.memory]
    .map((item) => ({ item, score: scoreByQuery(`${item.title ?? ""} ${item.content} ${item.summary ?? ""}`, input.query) + (item.relevanceWeight ?? 1) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, maxMemory)
    .map((entry) => entry.item);

  return { canon, memory };
}
