import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/users/CreateUserController";
import { AuthUserController } from "./controllers/users/AuthUserController";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  return res.json({ hello: "Bem Vindo ao Ao TaskManeger" });
});

router.post("/users", new CreateUserController().handle);
router.post("/users/session", new AuthUserController().handle);

export { router };
