
import Link from "next/link";
import { mockForumCategories } from "@/lib/mock-data";

export default function ForumsPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>Forums</h1>
      <p style={{ color: '#555', marginBottom: 24 }}>Community Beta adds Reddit-style forum categories, threads, comments, and reporting scaffolding.</p>
      <div style={{ display: 'grid', gap: 12 }}>
        {mockForumCategories.map((category) => (
          <Link key={category.id} href={`/forums/${category.slug}`} style={{ border: '1px solid #ddd', borderRadius: 12, padding: 16, textDecoration: 'none', color: 'inherit' }}>
            <div style={{ fontSize: 20, fontWeight: 600 }}>{category.title}</div>
            {category.description ? <div style={{ color: '#555' }}>{category.description}</div> : null}
          </Link>
        ))}
      </div>
    </main>
  );
}
