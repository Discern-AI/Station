const links = [
  ["/discover", "Discover"],
  ["/studio", "Studio"],
  ["/forums", "Forums"],
  ["/space", "My Space"],
  ["/billing", "Billing"],
];

export function TopNav() {
  return (
    <nav className="nav">
      <strong>Station</strong>
      {links.map(([href, label]) => (
        <a key={href} href={href}>{label}</a>
      ))}
      <div style={{ marginLeft: "auto" }}>
        <a href="/login">Login</a>
      </div>
    </nav>
  );
}
