export default function NewPersonaPage() {
  return (
    <main className="container">
      <div className="card" style={{ maxWidth: 760 }}>
        <h1>Create persona</h1>
        <form style={{ display: "grid", gap: 12 }}>
          <input className="input" placeholder="Persona name" />
          <textarea className="textarea" placeholder="Short description" />
          <textarea className="textarea" placeholder="Style notes" />
          <button className="button primary" type="submit">Create persona</button>
        </form>
      </div>
    </main>
  );
}
