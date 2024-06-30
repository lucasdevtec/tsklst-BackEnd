import { hash } from "bcryptjs";
import { cadastrarUsuario, verificarUserPorEmail } from "../../DAOs/users";

class CreateUserService {
  async execute(name: string, email: string, password: string) {
    const userExistente = await verificarUserPorEmail(email);
    if (userExistente) {
      throw new Error("Já existe usuário com esse Email.");
    }
    const cryptPassword = await hash(password, 8);
    const user = await cadastrarUsuario(name, email, cryptPassword);
    return user;
  }
}
export { CreateUserService };
