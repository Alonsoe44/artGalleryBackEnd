/* eslint-disable import/first */
import dotenv from "dotenv";

dotenv.config();
import Debug from "debug";
import startServer from "./server/startServer";
import server from "./apolloServer";
import connectDataBase from "./database";

const debug = Debug("artGallery-app:root");
const serverPort = process.env.PORT as unknown as number;
const connectionString = process.env.LOGIN_CREDENTIALS as unknown as string;

(async () => {
  try {
    await startServer(serverPort);
    const { url } = await server.listen();
    debug(`This server it's up and running ${url}`);
    await connectDataBase(connectionString);
  } catch {
    debug("The server explodded lol");
  }
})();
