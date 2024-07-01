import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/users/CreateUserController";
import { AuthUserController } from "./controllers/users/AuthUserController";
import { DetailUserController } from "./controllers/users/DetailUserController";
import { isAuth } from "./middlewares/isAuth";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  return res.json({ hello: "Bem Vindo ao Ao TaskManeger" });
});

router.post("/users", new CreateUserController().handle);
router.post("/users/session", new AuthUserController().handle);
router.get("/me", isAuth, new DetailUserController().handle);

export { router };
