import { PersonaHeader } from "@/components/studio/persona-header";
import { mockCanon, mockPersonas } from "@/lib/mock-data";

export default function PersonaCanonPage({ params }: { params: { personaId: string } }) {
  const persona = mockPersonas.find((p) => p.id === params.personaId) ?? mockPersonas[0];
  const items = mockCanon.filter((item) => item.personaId === persona.id);
  return (
    <main className="container grid" style={{ gap: 16 }}>
      <PersonaHeader persona={persona} />
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Canon</h2>
        <p>High-priority continuity rules and truths that should stay stable.</p>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <strong>{item.title || "Untitled canon"}</strong> (priority {item.priority ?? 1})
              <div>{item.content}</div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
