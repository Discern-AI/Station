
import Link from "next/link";
import { mockDiscoverFeed, mockDocuments, mockForumCategories, mockPersonas, mockSpaces, mockThreads } from "@/lib/mock-data";

export default function DiscoverPage() {
  return (
    <main style={{ padding: 24, display: 'grid', gap: 24 }}>
      <section>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>Discover</h1>
        <p style={{ color: '#555', maxWidth: 900 }}>
          Community Beta combines the public feed, search surfaces, featured personas, public Spaces, documents, and forum discussion.
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: 22 }}>Feed</h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {mockDiscoverFeed.map((item) => (
            <Link key={item.id} href={item.href} style={{ border: '1px solid #ddd', borderRadius: 12, padding: 16, textDecoration: 'none', color: 'inherit' }}>
              <div style={{ fontSize: 12, color: '#666', textTransform: 'uppercase' }}>{item.itemType} · {item.eventType}</div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>{item.title}</div>
              {item.description ? <div style={{ color: '#555' }}>{item.description}</div> : null}
            </Link>
          ))}
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 24 }}>
        <div>
          <h2 style={{ fontSize: 22 }}>Personas</h2>
          <ul>
            {mockPersonas.map((persona) => <li key={persona.id}>{persona.name} — {persona.shortDescription}</li>)}
          </ul>
        </div>
        <div>
          <h2 style={{ fontSize: 22 }}>Spaces</h2>
          <ul>
            {mockSpaces.map((space) => <li key={space.id}><Link href={`/space/${space.slug}`}>{space.title}</Link></li>)}
          </ul>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 24 }}>
        <div>
          <h2 style={{ fontSize: 22 }}>Documents</h2>
          <ul>
            {mockDocuments.map((document) => <li key={document.id}><Link href={`/space/station-house/documents/${document.id}`}>{document.title}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 style={{ fontSize: 22 }}>Forum activity</h2>
          <ul>
            {mockThreads.map((thread) => {
              const category = mockForumCategories.find((item) => item.id === thread.categoryId);
              return <li key={thread.id}><Link href={`/forums/${category?.slug}/${thread.id}`}>{thread.title}</Link></li>;
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}
