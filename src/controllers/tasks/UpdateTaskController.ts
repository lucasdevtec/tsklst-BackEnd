import { Request, Response } from "express";
import { UpdateTaskService } from "../../services/tasks/UpdateTaskService";
import { error } from "console";

class UpdateTaskController {
  async handle(req: Request, res: Response) {
    const { idTask, content, status, title } = req.body;
    if (
      status &&
      (Number.isNaN(parseInt(status)) ||
        parseInt(status) < 0 ||
        parseInt(status) > 1)
    ) {
      throw new Error("typo error - status need to be 0 or 1!");
    }
    if (idTask) {
      const updateTask = new UpdateTaskService();
      if (status) {
        const updatedTask = await updateTask.execute(
          req.userID,
          parseInt(idTask),
          title,
          content,
          parseInt(status) === 1 ? true : false
        );
        return res.json(updatedTask);
      }
      const updatedTask = await updateTask.execute(
        req.userID,
        parseInt(idTask),
        title,
        content
      );
      return res.json(updatedTask);
    }
    throw new Error("Missing Data: idTask!");
  }
}
export { UpdateTaskController };
