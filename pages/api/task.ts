import { NextApiHandler } from "next";
import { BadRequestException } from "../../utils/exceptions/bad-request.exception";
import { Exception } from "../../utils/exceptions/default.exception";
import { jwtValidator } from "../../utils/middlewares/jwt-validator";
import { onReq } from "../../utils/middlewares/on-req.handler";

export type TaskInput = {
  name: string;
  previsionDate: string;
  finishDate?: string;
};

const onPostHandler: NextApiHandler = (req, res) => {
  const validation = ({ name, previsionDate, finishDate }: TaskInput) => {
    if (!name || name.length < 2) {
      throw new BadRequestException("Nome inválido");
    }

    if (!previsionDate) {
      throw new BadRequestException("Data de previsão inválida");
    }
  };

  const { name, previsionDate, finishDate, userId } = req.body as TaskInput & {
    userId: string;
  };

  validation({ name, previsionDate, finishDate });

  return res.status(201).json({ userId });
};

const onGetHandler: NextApiHandler = (req, res) => {};

const onPutHandler: NextApiHandler = (req, res) => {};

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
