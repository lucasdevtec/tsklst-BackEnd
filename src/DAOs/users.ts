import { db } from "../prisma";

type UserSelectType = {
  id?: boolean;
  email?: boolean;
  name?: boolean;
  password?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
  deletedAt?: boolean;
};

export async function verificarUserPorEmail(
  emailP: string,
  select?: UserSelectType
) {
  if (emailP) {
    const user = await db.user.findUnique({
      select: select,
      where: {
        email: emailP,
        deletedAt: null,
      },
    });
    return user;
  }
}

export async function cadastrarUsuario(
  nome: string,
  email: string,
  senha: string
) {
  const user = await db.user.create({
    data: { name: nome, email: email, password: senha },
    select: { id: true, name: true, email: true },
  });
  return user;
}
