import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/users/CreateUserController";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  return res.json({ hello: "Bem Vindo ao Ao TaskManeger" });
});
router.post("/users", new CreateUserController().handle);

export { router };
