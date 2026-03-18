export interface SpaceRecord {
  id: string;
  ownerUserId: string;
  slug: string;
  title: string;
  shortDescription?: string;
  longDescription?: string;
  isPublic: boolean;
  commentsDefaultEnabled: boolean;
  avatarUrl?: string;
  bannerUrl?: string;
}

export interface SpacePageRecord {
  id: string;
  spaceId: string;
  slug: string;
  title: string;
  pageType: 'home' | 'about' | 'personas' | 'documents' | 'custom';
  body?: string;
  sortOrder: number;
  isPublished: boolean;
  commentsEnabled: boolean;
}
