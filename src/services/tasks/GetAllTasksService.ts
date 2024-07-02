import { buscarTasks } from "../../DAOs/tasks";

class GetAllTasksService {
  async execute(userID: number) {
    const tasks = await buscarTasks(userID);
    return tasks;
  }
}
export { GetAllTasksService };
