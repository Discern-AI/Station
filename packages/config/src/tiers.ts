export type Tier = "visitor" | "private" | "creator" | "canon";

export const TIER_LIMITS = {
  visitor: { personas: 0, spaces: 0, publicPersonas: 0, pagesPerSpace: 0, storageGb: 0, canComment: false, canCreateThreads: false, canPublishDocuments: false },
  private: { personas: 3, spaces: 0, publicPersonas: 0, pagesPerSpace: 0, storageGb: 2, canComment: true, canCreateThreads: false, canPublishDocuments: false },
  creator: { personas: 10, spaces: 1, publicPersonas: 5, pagesPerSpace: 10, storageGb: 10, canComment: true, canCreateThreads: true, canPublishDocuments: true },
  canon: { personas: 30, spaces: 3, publicPersonas: 15, pagesPerSpace: 10, storageGb: 50, canComment: true, canCreateThreads: true, canPublishDocuments: true },
} as const;
