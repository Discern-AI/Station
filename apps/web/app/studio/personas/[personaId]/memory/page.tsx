import { PersonaHeader } from "@/components/studio/persona-header";
import { mockMemory, mockPersonas } from "@/lib/mock-data";

export default function PersonaMemoryPage({ params }: { params: { personaId: string } }) {
  const persona = mockPersonas.find((p) => p.id === params.personaId) ?? mockPersonas[0];
  const items = mockMemory.filter((item) => item.personaId === persona.id);
  return (
    <main className="container grid" style={{ gap: 16 }}>
      <PersonaHeader persona={persona} />
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Memory</h2>
        <p>Short- and medium-term continuity items saved for this persona.</p>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <strong>{item.title || "Untitled memory"}</strong>
              <div>{item.summary || item.content}</div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
