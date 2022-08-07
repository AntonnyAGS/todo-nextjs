import { NextApiHandler } from "next";
import { TaskModel } from "../../models/task.schema";
import { BadRequestException } from "../../utils/exceptions/bad-request.exception";
import { jwtValidator } from "../../utils/middlewares/jwt-validator";
import { onReq } from "../../utils/middlewares/on-req.handler";

export type TaskInput = {
  name: string;
  previsionDate: Date;
  finishDate?: Date;
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
  const resources = await TaskModel.find();

  return res.status(200).json(resources);
};

const onPutHandler: NextApiHandler = async (req, res) => {
  const { name, previsionDate, finishDate, userId, id } =
    req.body as TaskInput & {
      userId: string;
      id: string;
    };

  if (!id) {
    throw new BadRequestException("Id não encontrada");
  }

  validation({ name, previsionDate, finishDate });

  const result = await TaskModel.updateOne(
    { _id: id },
    { name, previsionDate, finishDate, userId }
  );

  return res.status(201).json(result);
};

const onDeleteHandler: NextApiHandler = (req, res) => {};

const handler = jwtValidator(
  onReq({
    postHandler: onPostHandler,
    getHandler: onGetHandler,
    deleteHandler: onDeleteHandler,
    putHandler: onPutHandler,
  })
);

export default handler;
