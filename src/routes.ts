import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/users/CreateUserController";
import { AuthUserController } from "./controllers/users/AuthUserController";
import { DetailUserController } from "./controllers/users/DetailUserController";
import { isAuth } from "./middlewares/isAuth";
import { DeleteUserController } from "./controllers/users/DeleteUserController";
import { UpdateUserController } from "./controllers/users/UpdateUserController";
import { CreateTaskController } from "./controllers/tasks/CreateTaskController";
import { DeleteTaskController } from "./controllers/tasks/DeleteTaskController";
import { UpdateTaskController } from "./controllers/tasks/UpdateTaskController";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  return res.json({ hello: "Bem Vindo ao Ao TaskManeger" });
});

router.post("/users", new CreateUserController().handle);
router.post("/users/session", new AuthUserController().handle);
router.get("/me", isAuth, new DetailUserController().handle);
router.delete("/me", isAuth, new DeleteUserController().handle);
router.put("/me", isAuth, new UpdateUserController().handle);

router.post("/tasks", isAuth, new CreateTaskController().handle);
router.delete("/tasks", isAuth, new DeleteTaskController().handle);
router.put("/tasks", isAuth, new UpdateTaskController().handle);
// router.get("/tasks", isAuth, new GetAllTasksController().handle);

export { router };
