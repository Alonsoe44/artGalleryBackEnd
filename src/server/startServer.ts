import Debug from "debug";
import cors from "cors";
import express from "express";
import {
  graphqlUploadExpress, // A Koa implementation is also exported.
} from "graphql-upload";
import apolloServer from "../apolloServer";

const debug = Debug("artGallery-app:startServer");

const startServer = async () => {
  await apolloServer.start();
  const app = express();
  app.use(cors());
  app.use(graphqlUploadExpress());

  apolloServer.applyMiddleware({ app });

  await new Promise<void>((r) => app.listen({ port: 4000 }, r));

  debug(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`);
};

export default startServer;
