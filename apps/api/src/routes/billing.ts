import { Router } from "express";

export const billingRouter = Router();

billingRouter.get("/me", (_req, res) => {
  res.json({ tier: "creator", interval: "monthly", status: "active" });
});
