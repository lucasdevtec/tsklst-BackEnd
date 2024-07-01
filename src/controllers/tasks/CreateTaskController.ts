import { Request, Response } from "express";
import { CreateTaskService } from "../../services/tasks/CreateTaskService";

class CreateTaskController {
  async handle(req: Request, res: Response) {
    const { title, content } = req.body;
    if (title) {
      const createTask = new CreateTaskService();
      const newTask = await createTask.execute(req.userID, title, content);
      return res.json(newTask);
    }
    throw new Error("Missing Data: title!");
  }
}
export { CreateTaskController };
