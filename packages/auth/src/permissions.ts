import { TIER_LIMITS, type Tier } from "@station/config/tiers";
import type { AuthUser } from "@station/types";

export interface SpaceRecord { id: string; ownerUserId: string; isPublic: boolean; }
export interface PersonaRecord { id: string; ownerUserId: string; visibility: "private" | "public"; isPublicEnabled?: boolean; }

export function isAdmin(user?: AuthUser | null): boolean {
  return !!user?.isAdmin;
}

export function hasTier(user: AuthUser | null | undefined, minimum: Tier): boolean {
  if (!user) return minimum === "visitor";
  const order: Tier[] = ["visitor", "private", "creator", "canon"];
  return order.indexOf(user.tier) >= order.indexOf(minimum);
}

export function tierLimits(user: AuthUser | null | undefined) {
  return TIER_LIMITS[user?.tier ?? "visitor"];
}

export function canCreatePersona(user: AuthUser | null, existingPersonaCount: number): boolean {
  if (!user) return false;
  if (isAdmin(user)) return true;
  return existingPersonaCount < tierLimits(user).personas;
}

export function canCreateSpace(user: AuthUser | null, existingSpaceCount: number): boolean {
  if (!user || !hasTier(user, "creator")) return false;
  if (isAdmin(user)) return true;
  return existingSpaceCount < tierLimits(user).spaces;
}

export function canCreateThread(user: AuthUser | null): boolean {
  if (!user) return false;
  if (isAdmin(user)) return true;
  return tierLimits(user).canCreateThreads;
}
