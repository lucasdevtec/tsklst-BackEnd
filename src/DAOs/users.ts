import { db } from "../prisma";

export async function verificarUserPorEmail(emailP: string) {
  if (emailP) {
    const user = await db.user.findUnique({
      omit: {
        password: true,
      },
      where: {
        email: emailP,
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
