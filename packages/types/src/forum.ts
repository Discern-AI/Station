
export interface ForumCategory {
  id: string;
  slug: string;
  title: string;
  description?: string;
  sortOrder: number;
}

export interface ThreadRecord {
  id: string;
  categoryId: string;
  authorUserId: string;
  linkedSpaceId?: string | null;
  linkedPersonaId?: string | null;
  title: string;
  body: string;
  status: 'active' | 'locked' | 'removed';
  score: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CommentRecord {
  id: string;
  authorUserId: string;
  parentType: 'thread' | 'document' | 'page';
  parentId: string;
  body: string;
  status: 'active' | 'hidden' | 'removed';
  score: number;
  createdAt: string;
  updatedAt: string;
}

export interface ModerationReportRecord {
  id: string;
  reporterUserId: string;
  targetType: 'user' | 'space' | 'document' | 'thread' | 'comment';
  targetId: string;
  reason: string;
  notes?: string;
  status: 'open' | 'reviewing' | 'resolved' | 'dismissed';
  createdAt: string;
  updatedAt: string;
}

export interface DiscoverFeedItem {
  id: string;
  itemType: 'space' | 'persona' | 'document' | 'thread';
  eventType: 'created' | 'published' | 'updated' | 'featured';
  itemId: string;
  title: string;
  description?: string;
  href: string;
  createdAt: string;
}
