import { PersonaHeader } from "@/components/studio/persona-header";
import { CalibrationPanel } from "@/components/studio/calibration-panel";
import { mockPersonas } from "@/lib/mock-data";

export default function PersonaCalibrationPage({ params }: { params: { personaId: string } }) {
  const persona = mockPersonas.find((p) => p.id === params.personaId) ?? mockPersonas[0];
  return (
    <main className="container grid" style={{ gap: 16 }}>
      <PersonaHeader persona={persona} />
      <CalibrationPanel personaId={persona.id} />
    </main>
  );
}
