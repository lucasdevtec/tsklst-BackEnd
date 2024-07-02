import { Request, Response } from "express";
import { DeleteTaskService } from "../../services/tasks/DeleteTaskService";

class deleteTaskController {
  async handle(req: Request, res: Response) {
    const { idTask } = req.body;
    if (idTask) {
      const deleteTask = new DeleteTaskService();
      const deletedTask = await deleteTask.execute(
        req.userID,
        parseInt(idTask)
      );
      return res.json(deletedTask);
    }
    throw new Error("Missing Data: idTask!");
  }
}
export { deleteTaskController };
