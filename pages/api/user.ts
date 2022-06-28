import { UserModel } from "../../models/user.schema";
import { BadRequestException } from "./exceptions/bad-request.exception";
import { InternalException } from "./exceptions/internal.exception";
import { onPost } from "./middlewares/on-post.handler";

interface UserInput {
  name?: string;
  email?: string;
  password?: string;
}

const handler = onPost(async (req, res) => {
  const validate = ({ name, email, password }: UserInput) => {
    if (!name || name.trim().length < 2)
      return res
        .status(400)
        .json(new BadRequestException("Nome inválido!").toJSON());

    if (
      !email ||
      email.trim().length < 5 ||
      !email.includes("@") ||
      !email.includes(".")
    )
      return res
        .status(400)
        .json(new BadRequestException("Email inválido").toJSON());

    if (!password || password.length < 4)
      return res
        .status(400)
        .json(new BadRequestException("Senha inválido").toJSON());
  };

  try {
    const { name, email, password } = req.body;

    validate({ name, email, password });

    await UserModel.create({ email, name, password });

    return res.status(201).end();
  } catch (err) {
    console.error("Error on create user => ", err);
    return res.status(500).json(new InternalException(err).toJSON());
  }
});

export default handler;
