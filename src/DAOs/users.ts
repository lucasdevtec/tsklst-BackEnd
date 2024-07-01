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

type UserType = {
  email?: string;
  name?: string;
  password?: string;
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

export async function deletarUsuario(emailP: string) {
  if (emailP) {
    await db.user.update({
      where: { email: emailP },
      data: {
        deletedAt: new Date(),
      },
    });
    const user = await db.user.findUnique({
      omit: { password: true },
      where: {
        email: emailP,
      },
    });
    return user;
  }
}

export async function atualizarUser(emailP: string, data: UserType) {
  if (emailP && data) {
    const user = await db.user.update({
      omit: {
        createdAt: true,
        id: true,
        password: true,
        deletedAt: true,
      },
      where: { email: emailP },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
    return user;
  }
}
