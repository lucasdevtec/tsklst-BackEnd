import { cadastrarTask } from "../../DAOs/tasks";

class CreateTaskService {
  async execute(idUser: number, title: string, content?: string) {
    const user = await cadastrarTask(title, idUser, content);
    return user;
  }
}
export { CreateTaskService };
