export default function NewSpacePage() {
  return (
    <main className="container">
      <div className="card">
        <h1 style={{ marginTop: 0 }}>Create a Space</h1>
        <p>This scaffolded screen is where Creator users will create a public Space.</p>
        <div className="grid" style={{ gap: 12 }}>
          <input className="input" placeholder="Space title" />
          <input className="input" placeholder="Slug" />
          <textarea className="textarea" placeholder="Short description" />
          <button className="button primary">Create Space (mock)</button>
        </div>
      </div>
    </main>
  );
}
