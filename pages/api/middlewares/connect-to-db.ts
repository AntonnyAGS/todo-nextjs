import { connect, connection, connections } from "mongoose";
import type { NextApiHandler, NextApiResponse, NextApiRequest } from "next";

export const connectToDb =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const [defaultConnection] = connections;
    const isConnected = Boolean(defaultConnection.readyState);
    console.info("MongoDB readyState => ", isConnected);

    if (!isConnected) {
      /** Should put it on env */
      const DB_CONN = process.env.MONGO_URI!;

      console.log(DB_CONN);

      connection.on("connected", () => console.info("Connected on DB!"));
      connection.on("error", (err) =>
        console.error("Should not connect to DB! ==>", JSON.stringify(err))
      );

      await connect(DB_CONN);
    }

    return handler(req, res);
  };
