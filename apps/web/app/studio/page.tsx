import { PersonaList } from "@/components/studio/persona-list";
import { StudioShell } from "@/components/studio/studio-shell";
import { mockPersonas } from "@/lib/mock-data";

export default function StudioPage() {
  return (
    <StudioShell title="Studio">
      <div className="grid grid-2">
        <PersonaList personas={mockPersonas} />
        <div className="card">
          <h2 style={{ marginTop: 0 }}>Studio dashboard</h2>
          <p>Create personas, import files, and calibrate them here.</p>
          <ul>
            <li>Private personas</li>
            <li>Imports and continuity</li>
            <li>Memory and canon</li>
            <li>Calibration chat</li>
          </ul>
        </div>
      </div>
    </StudioShell>
  );
}
