import { verificarUserPorEmail } from "../../DAOs/users";

class DetailUserService {
  async execute(email: string) {
    const detailUser = await verificarUserPorEmail(email, {
      name: true,
      email: true,
      createdAt: true,
    });
    return detailUser;
  }
}
export { DetailUserService };
