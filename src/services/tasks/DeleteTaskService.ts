import { Task } from "@prisma/client";
import { deleteTask, buscarTask } from "../../DAOs/tasks";

class DeleteTaskService {
  async execute(idUser: number, idTask: number) {
    const task = await buscarTask(idTask);
    if (task) {
      if (task.authorId === idUser) {
        const deletedTask = await deleteTask(idTask);
        return deletedTask;
      }
      throw new Error("Essa Task não lhe pertence!");
    }
    throw new Error("Essa Task não foi encontrada!");
  }
}
export { DeleteTaskService };
