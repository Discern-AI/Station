import { PersonaChat } from "@/components/studio/persona-chat";
import { PersonaHeader } from "@/components/studio/persona-header";
import { mockMessages, mockPersonas } from "@/lib/mock-data";

export default function PersonaPage({ params }: { params: { personaId: string } }) {
  const persona = mockPersonas.find((p) => p.id === params.personaId) ?? mockPersonas[0];
  return (
    <main className="container grid" style={{ gap: 16 }}>
      <PersonaHeader persona={persona} />
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <a className="button" href={`/studio/personas/${persona.id}`}>Chat</a>
        <a className="button" href={`/studio/personas/${persona.id}/memory`}>Memory</a>
        <a className="button" href={`/studio/personas/${persona.id}/canon`}>Canon</a>
        <a className="button" href={`/studio/personas/${persona.id}/files`}>Files</a>
        <a className="button" href={`/studio/personas/${persona.id}/calibration`}>Calibration</a>
      </div>
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Continuity actions</h2>
        <ul>
          <li>Save key replies to Memory</li>
          <li>Promote stable truths to Canon</li>
          <li>Import chat exports and continuity notes</li>
        </ul>
      </div>
      <PersonaChat messages={mockMessages} />
    </main>
  );
}
