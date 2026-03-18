import { notFound } from 'next/navigation';
import { mockSpaces, mockPersonas } from '@/lib/mock-data';

export default function NewDocumentPage({ params }: { params: { slug: string } }) {
  const space = mockSpaces.find((item) => item.slug === params.slug);
  if (!space) return notFound();

  return (
    <main className="container">
      <div className="card">
        <h1 style={{ marginTop: 0 }}>New document in {space.title}</h1>
        <div className="grid" style={{ gap: 12 }}>
          <input className="input" placeholder="Title" />
          <input className="input" placeholder="Slug" />
          <select className="select" defaultValue="post">
            <option value="post">Post</option>
            <option value="constitution">Constitution</option>
            <option value="manifesto">Manifesto</option>
            <option value="essay">Essay</option>
            <option value="note">Note</option>
          </select>
          <select className="select" defaultValue="">
            <option value="">No linked persona</option>
            {mockPersonas.map((persona) => <option key={persona.id} value={persona.id}>{persona.name}</option>)}
          </select>
          <textarea className="textarea" placeholder="Document body" />
          <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input type="checkbox" defaultChecked /> Enable comments
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="button">Save draft (mock)</button>
            <button className="button primary">Publish (mock)</button>
          </div>
        </div>
      </div>
    </main>
  );
}
