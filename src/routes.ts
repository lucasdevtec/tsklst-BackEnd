import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  return res.json({ hello: "Bem Vindo ao Ao TaskManeger" });
});

export { router };
