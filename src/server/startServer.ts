import Debug from "debug";
import express from "express";

const debug = Debug("artGallery-app:startServer");
const app = express();
const startServer = (port: number) =>
  new Promise<void>((resolve, reject): void => {
    const server = app.listen(port, () => {
      debug(`The server it's up in http://localhost:${port}`);
      resolve();
    });
    server.on("error", (error: Error) => {
      debug(`Oh no the server couldn't start ${error.message}`);
      reject();
    });
  });

export default startServer;
