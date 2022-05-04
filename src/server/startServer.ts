import Debug from "debug";
import cors from "cors";
import express from "express";
import {
  graphqlUploadExpress, // A Koa implementation is also exported.
} from "graphql-upload";
import apolloServer from "../apolloServer";

const debug = Debug("artGallery-app:startServer");

/* const startServer = (port: number) =>
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

export default startServer; */

const startServerAsync = async () => {
  await apolloServer.start();
  const app = express();
  app.use(cors());
  app.use(graphqlUploadExpress());

  apolloServer.applyMiddleware({ app });

  await new Promise<void>((r) => app.listen({ port: 4000 }, r));

  debug(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`);
};

export default startServerAsync;
