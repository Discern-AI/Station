import type { PersonaSummary } from "@station/types/persona";

export function PersonaList({ personas }: { personas: PersonaSummary[] }) {
  return (
    <div className="card sidebar-list">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong>Personas</strong>
        <a className="button" href="/studio/new">New</a>
      </div>
      {personas.map((persona) => (
        <a key={persona.id} className="card" href={`/studio/personas/${persona.id}`}>
          <strong>{persona.name}</strong>
          <div style={{ opacity: 0.75, marginTop: 6 }}>{persona.shortDescription || "No description yet."}</div>
        </a>
      ))}
    </div>
  );
}
