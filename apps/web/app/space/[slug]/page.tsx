import { notFound } from 'next/navigation';
import { SpacePageList } from '@/components/space/space-page-list';
import { DocumentCard } from '@/components/documents/document-card';
import { mockSpaces, mockSpacePages, mockPersonas, mockDocuments } from '@/lib/mock-data';

export default function PublicSpacePage({ params }: { params: { slug: string } }) {
  const space = mockSpaces.find((item) => item.slug === params.slug);
  if (!space) return notFound();
  const pages = mockSpacePages.filter((item) => item.spaceId === space.id).sort((a, b) => a.sortOrder - b.sortOrder);
  const publicPersonas = mockPersonas.filter((item) => item.visibility === 'public');
  const documents = mockDocuments.filter((item) => item.spaceId === space.id);

  return (
    <main className="container grid grid-2">
      <div>
        <SpacePageList pages={pages} spaceSlug={space.slug} />
      </div>
      <div className="grid" style={{ gap: 16 }}>
        <div className="card">
          <h1 style={{ marginTop: 0 }}>{space.title}</h1>
          <p>{space.longDescription || space.shortDescription}</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <a className="button" href={`/space/${space.slug}/documents/new`}>New document</a>
            <a className="button" href={`/space/${space.slug}/pages/home`}>Open Home tab</a>
          </div>
        </div>

        <div className="card">
          <h2 style={{ marginTop: 0 }}>Linked personas</h2>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {publicPersonas.map((persona) => (
              <div key={persona.id} className="card">
                <h3 style={{ marginTop: 0 }}>{persona.name}</h3>
                <p>{persona.shortDescription}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 style={{ marginTop: 0 }}>Documents</h2>
          <div className="grid" style={{ gap: 12 }}>
            {documents.map((document) => (
              <DocumentCard key={document.id} document={document} spaceSlug={space.slug} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
