export default function SignupPage() {
  return (
    <main className="container">
      <div className="card" style={{ maxWidth: 520 }}>
        <h1>Sign up</h1>
        <form style={{ display: "grid", gap: 12 }}>
          <input className="input" type="text" placeholder="Display name" />
          <input className="input" type="email" placeholder="Email" />
          <input className="input" type="password" placeholder="Password" />
          <button className="button primary" type="submit">Create account</button>
        </form>
      </div>
    </main>
  );
}
