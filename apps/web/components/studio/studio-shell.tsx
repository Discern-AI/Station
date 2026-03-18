export function StudioShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="container">
      <h1>{title}</h1>
      {children}
    </div>
  );
}
