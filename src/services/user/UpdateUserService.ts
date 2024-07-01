import { compare, hash } from "bcryptjs";
import { atualizarUser, verificarUserPorEmail } from "../../DAOs/users";

type UserType = {
  email?: string;
  name?: string;
  password?: string;
};

class UpdateUserService {
  async execute(email: string, data: UserType, oldPassword?: string) {
    let updateUser;
    if (oldPassword && data.password) {
      const user = await verificarUserPorEmail(email);
      if (!user) {
        throw new Error("Usuário não Existe");
      }
      const passwordDcrypt = await compare(oldPassword, user.password);
      if (!passwordDcrypt) {
        throw new Error("Senha Incorreta");
      }
      const passwordEqual = await compare(data.password, user.password);
      if (passwordEqual) {
        throw new Error("Senha é a mesma!");
      }
      const cryptPassword = await hash(data.password, 8);
      if (!passwordDcrypt) {
        throw new Error("Senha Incorreta");
      }
      updateUser = await atualizarUser(email, {
        name: data.name,
        email: data.email,
        password: cryptPassword,
      });
      return {
        ...updateUser,
        password: "Alterado com Sucesso",
      };
    }
    updateUser = await atualizarUser(email, {
      name: data.name,
      email: data.email,
    });
    return updateUser;
  }
}
export { UpdateUserService };
