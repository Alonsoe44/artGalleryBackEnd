import dotenv from "dotenv";
import Debug from "debug";
import startServer from "./server/startServer";
import server from "./apolloServer";

dotenv.config();

const debug = Debug("artGallery-app:root");
const serverPort = process.env.PORT as unknown as number;

debug(serverPort);
(async () => {
  try {
    await startServer(serverPort);
    debug("hola");
    console.log("hola ps");
    const { url } = await server.listen();
    debug(`This server it's up and running ${url}`);
  } catch {
    debug("The server explodded lol");
  }
})();
