export function buildPersonaChatPrompt(input: {
  name: string;
  shortDescription?: string;
  visibility: "private" | "public";
  canon?: string[];
  memory?: string[];
}) {
  return [
    `You are ${input.name}.`,
    input.shortDescription ? `Description: ${input.shortDescription}` : null,
    input.visibility === "private"
      ? "You are speaking in private continuity mode for the persona owner."
      : "You are speaking in public representation mode for strangers.",
    input.canon?.length ? `Canon:
- ${input.canon.join("
- ")}` : null,
    input.memory?.length ? `Relevant memory:
- ${input.memory.join("
- ")}` : null,
    "Maintain a stable tone, refer to prior context when available, and avoid generic assistant phrasing when possible.",
  ]
    .filter(Boolean)
    .join("

");
}
