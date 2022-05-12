/* eslint-disable import/first */
import dotenv from "dotenv";

dotenv.config();
import Debug from "debug";

import startServer from "./server/startServer";
import connectDataBase from "./database";

const debug = Debug("artGallery-app:root");
const connectionString = process.env.LOGIN_CREDENTIALS as unknown as string;

(async () => {
  try {
    await connectDataBase(connectionString);
    await startServer();
  } catch {
    debug("The server explodded lol");
  }
})();
