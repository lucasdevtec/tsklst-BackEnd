import { updateTask, buscarTask } from "../../DAOs/tasks";

class UpdateTaskService {
  async execute(
    idUser: number,
    idTask: number,
    title?: string,
    content?: string,
    status?: boolean
  ) {
    const task = await buscarTask(idTask);
    if (task) {
      if (task.authorId === idUser) {
        const updatedTask = await updateTask(idTask, {
          title,
          content,
          status,
        });
        return updatedTask;
      }
      throw new Error("Essa Task não lhe pertence!");
    }
    throw new Error("Essa Task não foi encontrada!");
  }
}
export { UpdateTaskService };
