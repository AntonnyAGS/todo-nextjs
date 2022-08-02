import { NextApiRequest, NextApiResponse } from "next";
import md5 from "md5";
import jwt from "jsonwebtoken";
import { UserModel } from "../../models/user.schema";
import { ensureNonNullable } from "../../utils/ensure-non-nullable";
import { BadRequestException } from "./exceptions/bad-request.exception";
import { onPost } from "./middlewares/on-post.handler";

interface LoginRequest {
  email?: string;
  password?: string;
}

const handler = onPost(async (req: NextApiRequest, res: NextApiResponse) => {
  const key = ensureNonNullable(process.env.PRIVATE_KEY);

  const { email, password } = req.body as LoginRequest;

  if (!email || !password) {
    return res
      .status(400)
      .json(new BadRequestException("Informar usuário e senha!").toJSON());
  }

  const usersFound = await UserModel.find({
    email,
    password: md5(password),
  });

  if (!usersFound || usersFound.length < 1) {
    return res
      .status(400)
      .json(new BadRequestException("Usuário e/ou senha inválido!").toJSON());
  }

  const [user] = usersFound;
  const token = jwt.sign({ _id: user._id }, key);

  const result = {
    name: user.name,
    email: user.email,
    token,
  };

  return res.status(200).json(result);
});

export default handler;
