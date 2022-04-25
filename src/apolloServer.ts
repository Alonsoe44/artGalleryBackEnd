import { ApolloServer } from "apollo-server";
import typeDefs from "./server/schemas";
import resolvers from "./server/resolvers";

const server = new ApolloServer({ typeDefs, resolvers });

export default server;
