
import Link from "next/link";
import { notFound } from "next/navigation";
import { mockForumCategories, mockThreads } from "@/lib/mock-data";

export default function ForumCategoryPage({ params }: { params: { categorySlug: string } }) {
  const category = mockForumCategories.find((item) => item.slug === params.categorySlug);
  if (!category) return notFound();
  const threads = mockThreads.filter((item) => item.categoryId === category.id);

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 30 }}>{category.title}</h1>
      <p style={{ color: '#555', marginBottom: 24 }}>{category.description}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ color: '#666' }}>{threads.length} thread(s)</div>
        <Link href={`/forums/${category.slug}/new`}>New thread</Link>
      </div>
      <div style={{ display: 'grid', gap: 12 }}>
        {threads.map((thread) => (
          <Link key={thread.id} href={`/forums/${category.slug}/${thread.id}`} style={{ border: '1px solid #ddd', borderRadius: 12, padding: 16, textDecoration: 'none', color: 'inherit' }}>
            <div style={{ fontSize: 18, fontWeight: 600 }}>{thread.title}</div>
            <div style={{ color: '#555' }}>{thread.body}</div>
            <div style={{ color: '#666', fontSize: 12, marginTop: 8 }}>Score {thread.score} · {thread.commentCount} comments</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
