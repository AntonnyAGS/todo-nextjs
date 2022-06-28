import { NextApiRequest, NextApiResponse } from "next";
import { onPost } from "./middlewares/on-post.handler";

const handler = onPost((req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json("Oi zé");
});

export default handler;
