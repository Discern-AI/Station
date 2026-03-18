import type { PersonaSummary } from "@station/types/persona";

export function PersonaHeader({ persona }: { persona: PersonaSummary }) {
  return (
    <div className="card">
      <h1 style={{ marginTop: 0 }}>{persona.name}</h1>
      <p>{persona.shortDescription || "No description yet."}</p>
      <div style={{ opacity: 0.7 }}>Visibility: {persona.visibility}</div>
    </div>
  );
}
