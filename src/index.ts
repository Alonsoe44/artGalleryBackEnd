require("dotenv").config();
import Debug from "debug";
import startServer from "./server/startServer";

const serverPort = process.env.PORT as unknown as number;

const debug = Debug("artGallery-app:root");
debug(serverPort);
(async () => {
  try {
    await startServer(serverPort);
  } catch {
    debug("The server explodded lol");
  }
})();
