import { ApolloServer } from "apollo-server-express";

import resolvers from "./server/resolvers";
import typeDefs from "./server/schemas";

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export default apolloServer;
