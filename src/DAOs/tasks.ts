import { db } from "../prisma";

type TaskSelect = {
  id?: boolean;
  idCriador?: boolean;
  title?: boolean;
  content?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
  deletedAt?: boolean;
};

type TaskType = {
  idCriador: number;
  title: string;
  content?: string;
};

export async function verificarTask(
  param: "id" | "idCriador",
  term: number | string,
  select?: TaskSelect
) {
  let task;
  if (param === "id" && typeof term === "number") {
    task = await db.task.findFirst({
      omit: select || { deletedAt: true },
      where: {
        id: term,
        deletedAt: null,
      },
    });
    return task;
  }
  if (param === "idCriador" && typeof term === "number") {
    task = await db.task.findMany({
      omit: select || { deletedAt: true },
      where: {
        authorId: term,
        deletedAt: null,
      },
    });
    return task;
  }
  throw new Error("Internal error on find task");
}

export async function cadastrarTask(
  title: string,
  idUser: number,
  content?: string
) {
  const task = await db.task.create({
    omit: { deletedAt: true },
    data: { title: title, content: content, authorId: idUser },
  });
  return task;
}
