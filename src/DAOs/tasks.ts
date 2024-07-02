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

export async function buscarTask(term: number, select?: TaskSelect) {
  const task = await db.task.findFirst({
    omit: select || { deletedAt: true },
    where: {
      id: term,
      deletedAt: null,
    },
  });
  return task;
}

export async function buscarTasks(term: number, select?: TaskSelect) {
  const task = await db.task.findMany({
    omit: select || { deletedAt: true },
    where: {
      authorId: term,
      deletedAt: null,
    },
  });
  return task;
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

export async function deleteTask(idTask: number) {
  const task = await db.task.update({
    where: { id: idTask },
    data: { deletedAt: new Date() },
  });
  return task;
}

export async function updateTask(
  idTask: number,
  data: { title?: string; content?: string; status?: boolean }
) {
  const task = await db.task.update({
    omit: { authorId: true, deletedAt: true },
    where: { id: idTask },
    data: data,
  });
  return task;
}
