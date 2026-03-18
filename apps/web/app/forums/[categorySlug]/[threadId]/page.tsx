
import { notFound } from "next/navigation";
import { mockComments, mockForumCategories, mockThreads } from "@/lib/mock-data";

export default function ThreadPage({ params }: { params: { categorySlug: string; threadId: string } }) {
  const category = mockForumCategories.find((item) => item.slug === params.categorySlug);
  const thread = mockThreads.find((item) => item.id === params.threadId);
  if (!category || !thread) return notFound();
  const comments = mockComments.filter((item) => item.parentType === 'thread' && item.parentId === thread.id);

  return (
    <main style={{ padding: 24, display: 'grid', gap: 16 }}>
      <div>
        <div style={{ color: '#666', fontSize: 14 }}>{category.title}</div>
        <h1 style={{ fontSize: 30 }}>{thread.title}</h1>
        <p style={{ color: '#555' }}>{thread.body}</p>
      </div>
      <section>
        <h2 style={{ fontSize: 22 }}>Comments</h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {comments.map((comment) => (
            <div key={comment.id} style={{ border: '1px solid #ddd', borderRadius: 12, padding: 16 }}>
              <div>{comment.body}</div>
              <div style={{ color: '#666', fontSize: 12, marginTop: 8 }}>Score {comment.score}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
