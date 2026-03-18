
export default function NewThreadPage({ params }: { params: { categorySlug: string } }) {
  return (
    <main style={{ padding: 24, display: 'grid', gap: 16, maxWidth: 760 }}>
      <h1 style={{ fontSize: 30 }}>New thread in {params.categorySlug}</h1>
      <p style={{ color: '#555' }}>Community Beta includes the page scaffold for creating new threads. The final version should POST to the /forums/threads API route with permission checks for Creator and above.</p>
      <label style={{ display: 'grid', gap: 8 }}>
        <span>Title</span>
        <input placeholder="Thread title" style={{ padding: 12, borderRadius: 8, border: '1px solid #ccc' }} />
      </label>
      <label style={{ display: 'grid', gap: 8 }}>
        <span>Body</span>
        <textarea placeholder="Write your thread" rows={10} style={{ padding: 12, borderRadius: 8, border: '1px solid #ccc' }} />
      </label>
      <button style={{ width: 160, padding: 12, borderRadius: 8, border: '1px solid #111', background: '#111', color: '#fff' }}>Create thread</button>
    </main>
  );
}
