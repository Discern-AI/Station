import type { NextFunction, Request, Response } from "express";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const userId = req.header("x-station-user-id") || "dev-user";
  (req as Request & { user: { id: string; tier: string; isAdmin?: boolean } }).user = {
    id: userId,
    tier: req.header("x-station-tier") || "creator",
    isAdmin: req.header("x-station-admin") === "true",
  };
  next();
}
