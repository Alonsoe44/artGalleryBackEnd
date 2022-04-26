/* eslint-disable import/first */
import dotenv from "dotenv";

dotenv.config();
import Debug from "debug";
import startServer from "./server/startServer";
import server from "./apolloServer";

const debug = Debug("artGallery-app:root");
const serverPort = process.env.PORT as unknown as number;

(async () => {
  try {
    await startServer(serverPort);
    const { url } = await server.listen();
    debug(`This server it's up and running ${url}`);
  } catch {
    debug("The server explodded lol");
  }
})();
