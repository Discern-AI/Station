import type { SpacePageRecord } from '@station/types';

export function SpacePageList({ pages, spaceSlug }: { pages: SpacePageRecord[]; spaceSlug: string }) {
  return (
    <div className="sidebar-list">
      {pages.map((page) => (
        <a key={page.id} className="card" href={`/space/${spaceSlug}/pages/${page.slug}`}>
          <strong>{page.title}</strong>
          <small style={{ opacity: 0.7 }}>{page.pageType}</small>
        </a>
      ))}
    </div>
  );
}
