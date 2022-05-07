import { ApolloServer } from "apollo-server-express";
import rootSchema from "./server/schemas";

const apolloServer = new ApolloServer(rootSchema as any);

export default apolloServer;
