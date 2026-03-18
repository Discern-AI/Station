import { notFound } from 'next/navigation';
import { mockSpaces, mockSpacePages } from '@/lib/mock-data';

export default function SpaceTabPage({ params }: { params: { slug: string; pageSlug: string } }) {
  const space = mockSpaces.find((item) => item.slug === params.slug);
  if (!space) return notFound();
  const page = mockSpacePages.find((item) => item.spaceId === space.id && item.slug === params.pageSlug);
  if (!page) return notFound();

  return (
    <main className="container">
      <div className="card">
        <h1 style={{ marginTop: 0 }}>{page.title}</h1>
        <p><strong>Page type:</strong> {page.pageType}</p>
        <p>{page.body}</p>
        <p style={{ opacity: 0.8 }}>Comments: {page.commentsEnabled ? 'enabled' : 'disabled'}</p>
      </div>
    </main>
  );
}
