export type Tier = "visitor" | "private" | "creator" | "canon";

export interface AuthUser {
  id: string;
  tier: Tier;
  isAdmin?: boolean;
}
