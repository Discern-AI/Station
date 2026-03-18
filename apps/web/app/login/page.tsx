export default function LoginPage() {
  return (
    <main className="container">
      <div className="card" style={{ maxWidth: 520 }}>
        <h1>Login</h1>
        <form style={{ display: "grid", gap: 12 }}>
          <input className="input" type="email" placeholder="Email" />
          <input className="input" type="password" placeholder="Password" />
          <button className="button primary" type="submit">Login</button>
        </form>
      </div>
    </main>
  );
}
