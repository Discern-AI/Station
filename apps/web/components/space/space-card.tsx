import type { SpaceRecord } from '@station/types';

export function SpaceCard({ space }: { space: SpaceRecord }) {
  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>{space.title}</h3>
      <p>{space.shortDescription}</p>
      <a className="button" href={`/space/${space.slug}`}>Open Space</a>
    </div>
  );
}
