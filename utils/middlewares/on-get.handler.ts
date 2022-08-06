import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { MethodNotAllowedException } from "../exceptions/method-not-allowed.exception";
import { connectToDb } from "./connect-to-db";

export const onGet =
  (handler: NextApiHandler) => (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
      return res.status(405).json(new MethodNotAllowedException().toJSON());
    }

    return connectToDb(handler);
  };
