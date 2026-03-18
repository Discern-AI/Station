export interface DocumentRecord {
  id: string;
  authorUserId: string;
  spaceId: string;
  personaId?: string | null;
  title: string;
  slug: string;
  body: string;
  documentType: 'post' | 'constitution' | 'canon_note' | 'essay' | 'note' | 'manifesto';
  status: 'draft' | 'published' | 'archived';
  visibility: 'private' | 'public';
  commentsEnabled: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}
