import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { MethodNotAllowedException } from "../exceptions/method-not-allowed.exception";
import { connectToDb } from "./connect-to-db";

const onPostHandler =
  (handler: NextApiHandler) => (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
      return res.status(405).json(new MethodNotAllowedException().toJSON());
    }

    return handler(req, res);
  };

export const onPost = (handler: NextApiHandler) => connectToDb(onPostHandler(handler));
