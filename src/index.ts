/* eslint-disable import/first */
import dotenv from "dotenv";

dotenv.config();
import Debug from "debug";

import startServerAsync from "./server/startServer";
import connectDataBase from "./database";

const debug = Debug("artGallery-app:root");
const connectionString = process.env.LOGIN_CREDENTIALS as unknown as string;

(async () => {
  try {
    await connectDataBase(connectionString);
    await startServerAsync();
  } catch {
    debug("The server explodded lol");
  }
})();
