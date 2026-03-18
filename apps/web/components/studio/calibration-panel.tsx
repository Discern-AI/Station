"use client";

import { useMemo, useState } from "react";
import { mockCalibrationSessions } from "@/lib/mock-data";
import { CALIBRATION_PROMPTS } from "@station/ai/prompts/calibration";

export function CalibrationPanel({ personaId }: { personaId: string }) {
  const existing = useMemo(() => mockCalibrationSessions.filter((item) => item.personaId === personaId), [personaId]);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [saveTarget, setSaveTarget] = useState<"persona" | "global" | "public_mode" | "other">("persona");

  const prompt = CALIBRATION_PROMPTS[step];
  const transcriptPreview = CALIBRATION_PROMPTS
    .filter((p) => answers[p.key])
    .map((p) => `Q: ${p.prompt}\nA: ${answers[p.key]}`)
    .join("\n\n");

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Calibration Beta</h2>
        <p>
          This guided tuning space helps the owner describe how the persona should sound, think, and present itself.
          In the full build, this will save transcripts and extracted rules back into the persona configuration.
        </p>
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Guided prompt {step + 1} of {CALIBRATION_PROMPTS.length}</h3>
        <p><strong>{prompt.prompt}</strong></p>
        {prompt.hint ? <p style={{ opacity: 0.8 }}>{prompt.hint}</p> : null}
        <textarea
          value={answers[prompt.key] || ""}
          onChange={(e) => setAnswers((prev) => ({ ...prev, [prompt.key]: e.target.value }))}
          placeholder="Use text or voice-to-text to describe the persona as clearly as you can."
          style={{ width: "100%", minHeight: 160, padding: 12, borderRadius: 12, border: "1px solid #333", background: "#111", color: "#fff" }}
        />
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button className="button" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>Back</button>
          <button className="button" onClick={() => setStep((s) => Math.min(CALIBRATION_PROMPTS.length - 1, s + 1))}>
            {step === CALIBRATION_PROMPTS.length - 1 ? "Review" : "Next"}
          </button>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Save target</h3>
        <select
          value={saveTarget}
          onChange={(e) => setSaveTarget(e.target.value as typeof saveTarget)}
          style={{ width: "100%", padding: 12, borderRadius: 12, background: "#111", color: "#fff", border: "1px solid #333" }}
        >
          <option value="persona">Save to this persona</option>
          <option value="global">Save to global style library</option>
          <option value="public_mode">Save to public mode rules</option>
          <option value="other">Save elsewhere later</option>
        </select>
        <p style={{ opacity: 0.8, marginBottom: 0 }}>
          In the full version, the system will ask exactly where this calibration should be applied before saving extracted rules.
        </p>
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Transcript preview</h3>
        <pre style={{ whiteSpace: "pre-wrap", margin: 0, fontFamily: "inherit" }}>{transcriptPreview || "Answer the prompts above to build a calibration transcript."}</pre>
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Previous calibration sessions</h3>
        {existing.length ? (
          <div className="grid" style={{ gap: 12 }}>
            {existing.map((session) => (
              <div key={session.id} style={{ border: "1px solid #333", borderRadius: 12, padding: 12 }}>
                <strong>{session.sessionTitle || "Untitled session"}</strong>
                <p style={{ opacity: 0.8 }}>Save target: {session.saveTarget}</p>
                <p style={{ marginBottom: 0 }}>{session.extractedStyleNotes || session.transcript.slice(0, 160)}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No calibration sessions yet.</p>
        )}
      </div>
    </div>
  );
}
