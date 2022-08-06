import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Exception } from "../exceptions/default.exception";
import { MethodNotAllowedException } from "../exceptions/method-not-allowed.exception";
import { connectToDb } from "./connect-to-db";

interface OnReqOptions {
  postHandler?: NextApiHandler;
  getHandler?: NextApiHandler;
  putHandler?: NextApiHandler;
  deleteHandler?: NextApiHandler;
}

// const responseStatusMapper: Record<string, number> = {
//   'POST': 201,
//   'GET': 200,
//   'DELETE': 204,

// }

const onReqHandler =
  ({ postHandler, getHandler, putHandler, deleteHandler }: OnReqOptions) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    if (method === "OPTIONS") {
      return;
    }

    let handler: NextApiHandler | undefined;

    switch (method) {
      case "POST":
        handler = postHandler;
        break;
      case "GET":
        handler = getHandler;
        break;
      case "PUT":
        handler = putHandler;
        break;
      case "DELETE":
        handler = deleteHandler;
        break;
    }

    if (!handler) {
      const error = new MethodNotAllowedException();

      return res.status(error.status).json(error.toJSON());
    }

    try {
      const result = await handler(req, res);

      return result;
    } catch (err) {
      if (err instanceof Exception) {
        return res.status(err.status).json(err.toJSON());
      }

      return res.status(500).json({ message: "Erro desconhecido!" });
    }
  };

export const onReq = (opts: OnReqOptions) => connectToDb(onReqHandler(opts));
