import { FilterQuery } from "mongoose";
import { NextApiHandler } from "next";
import { Task, TaskModel } from "../../models/task.schema";
import { BadRequestException } from "../../utils/exceptions/bad-request.exception";
import { jwtValidator } from "../../utils/middlewares/jwt-validator";
import { onReq } from "../../utils/middlewares/on-req.handler";

export type TaskInput = {
  name: string;
  previsionDate: Date;
  finishDate?: Date;
};

export type UpdateTaskInput = TaskInput & {
  id: string;
};

const validation = ({ name, previsionDate, finishDate }: TaskInput) => {
  if (!name || name.length < 2) {
    throw new BadRequestException("Nome inválido");
  }

  if (!previsionDate) {
    throw new BadRequestException("Data de previsão inválida");
  }
};

const onPostHandler: NextApiHandler = async (req, res) => {
  const { name, previsionDate, finishDate, userId } = req.body as TaskInput & {
    userId: string;
  };

  validation({ name, previsionDate, finishDate });

  const result = await TaskModel.create({
    name,
    previsionDate,
    finishDate,
    userId,
  });

  return res.status(201).json(result);
};

const onGetHandler: NextApiHandler = async (req, res) => {
  const { userId, startDate, endDate, status } = req.query;

  let query: FilterQuery<Task> = { userId };

  if (startDate) {
    query = {
      ...query,
      previsionDate: {
        $gte: new Date(startDate as string),
      },
    };
  }

  if (endDate) {
    query = {
      ...query,
      previsionDate: {
        $lte: new Date(endDate as string),
      },
    };
  }

  if (startDate && endDate) {
    query = {
      ...query,
      previsionDate: {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string),
      },
    };
  }

  if (status) {
    if (status === "done") {
      query = { ...query, finishDate: { $exists: true } };
    }

    if (status === "active") {
      query = { ...query, finishDate: { $exists: false } };
    }
  }

  const resources = await TaskModel.find(query);

  return res.status(200).json(resources);
};

const onPutHandler: NextApiHandler = async (req, res) => {
  const { name, previsionDate, finishDate, id } =
    req.body as UpdateTaskInput & {
      userId: string;
    };

  if (!id) {
    throw new BadRequestException("Id não encontrada");
  }

  validation({ name, previsionDate, finishDate });

  const result = await TaskModel.findOne({ id });

  if (!result) {
    throw new BadRequestException();
  }

  result.name = name;
  result.previsionDate = previsionDate;
  result.finishDate = finishDate;

  await result.save();

  return res.status(200).json(result);
};

const onDeleteHandler: NextApiHandler = async (req, res) => {
  const { userId, id } = req.query;

  const result = await TaskModel.findOne({ id });

  if (!result || result.userId !== userId) {
    throw new BadRequestException();
  }

  await result.delete();

  return res.status(200).end();
};

const handler = jwtValidator(
  onReq({
    postHandler: onPostHandler,
    getHandler: onGetHandler,
    deleteHandler: onDeleteHandler,
    putHandler: onPutHandler,
  })
);

export default handler;
