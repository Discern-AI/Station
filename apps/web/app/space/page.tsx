import { SpaceCard } from '@/components/space/space-card';
import { mockSpaces } from '@/lib/mock-data';

export default function SpaceIndexPage() {
  return (
    <main className="container grid" style={{ gap: 16 }}>
      <div className="card">
        <h1 style={{ marginTop: 0 }}>My Space</h1>
        <p>Public Space Beta introduces public mini-sites with pages, linked personas, and documents.</p>
        <a className="button primary" href="/space/new">Create Space</a>
      </div>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        {mockSpaces.map((space) => <SpaceCard key={space.id} space={space} />)}
      </div>
    </main>
  );
}
