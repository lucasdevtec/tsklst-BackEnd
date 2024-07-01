import { deletarUsuario, verificarUserPorEmail } from "../../DAOs/users";

class DeleteUserService {
  async execute(email: string) {
    const usuarioExiste = await verificarUserPorEmail(email);
    if (usuarioExiste) {
      const deletedUser = await deletarUsuario(email);
      return { deletedUser: deletedUser };
    }
    throw new Error("Usuário não existe ou já deletado!");
  }
}
export { DeleteUserService };
