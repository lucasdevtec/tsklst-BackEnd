import { Request, Response } from "express";
import { GetAllTasksService } from "../../services/tasks/GetAllTasksService";

class GetAllTasksController {
  async handle(req: Request, res: Response) {
    const getTasks = new GetAllTasksService();
    const tasks = await getTasks.execute(req.userID);
    return res.json(tasks);
  }
}
export { GetAllTasksController };
