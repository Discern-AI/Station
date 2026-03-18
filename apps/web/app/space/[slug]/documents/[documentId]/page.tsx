
import { notFound } from "next/navigation";
import { mockComments, mockDocuments, mockPersonas, mockSpaces } from "@/lib/mock-data";

export default function DocumentDetailPage({ params }: { params: { slug: string; documentId: string } }) {
  const space = mockSpaces.find((item) => item.slug === params.slug);
  const document = mockDocuments.find((item) => item.id === params.documentId && item.spaceId === space?.id);
  if (!space || !document) return notFound();
  const persona = document.personaId ? mockPersonas.find((item) => item.id === document.personaId) : null;
  const comments = mockComments.filter((item) => item.parentType === 'document' && item.parentId === document.id);

  return (
    <main style={{ padding: 24, display: 'grid', gap: 20, maxWidth: 900 }}>
      <div>
        <div style={{ color: '#666', fontSize: 14 }}>{space.title}</div>
        <h1 style={{ fontSize: 32 }}>{document.title}</h1>
        <div style={{ color: '#666' }}>{document.documentType} · {document.status} · {document.visibility}</div>
        {persona ? <div style={{ marginTop: 8 }}>Linked persona: {persona.name}</div> : null}
      </div>
      <article style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{document.body}</article>
      <section>
        <h2 style={{ fontSize: 22 }}>Comments</h2>
        {document.commentsEnabled ? (
          <div style={{ display: 'grid', gap: 12 }}>
            {comments.map((comment) => (
              <div key={comment.id} style={{ border: '1px solid #ddd', borderRadius: 12, padding: 16 }}>
                <div>{comment.body}</div>
                <div style={{ color: '#666', fontSize: 12, marginTop: 8 }}>Score {comment.score}</div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#666' }}>Comments are disabled for this document.</p>
        )}
      </section>
    </main>
  );
}
