import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";
import { InternalException } from "../exceptions/internal.exception";
import { ensureNonNullable } from "../../../utils/ensure-non-nullable";
import { UnauthorizedException } from "../exceptions/unauthorized.exception";
import { ForbiddenException } from "../exceptions/forbidden.exception";

export const jwtValidator =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const key = ensureNonNullable(process.env.PRIVATE_KEY);
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json(new UnauthorizedException().toJSON());
    }

    const [bearer, token] = authorization.split(" ");

    if (!bearer || bearer.toLowerCase() !== "bearer" || !token) {
      return res
        .status(401)
        .json(new UnauthorizedException("JWT mal formatado!").toJSON());
    }

    if (req.method !== "OPTIONS") {
      try {
        const decode = jwt.verify(token, key) as JwtPayload;

        if (!decode) {
          return res.status(401).json(new ForbiddenException().toJSON());
        }

        if (req.body) {
          req.body.userId = decode._id;
        } else if (req.query) {
          req.query.userId = decode._id;
        }
      } catch (err) {
        console.error(err);

        return res.status(500).json(new InternalException().toJSON);
      }
    }

    return handler(req, res);
  };
