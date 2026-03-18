import { Router } from "express";

export const authRouter = Router();

authRouter.get("/me", (_req, res) => {
  res.json({
    user: {
      id: "dev-user",
      email: "dev@example.com",
      tier: "creator",
    },
  });
});
