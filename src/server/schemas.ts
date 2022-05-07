import { mergeTypeDefs } from "@graphql-tools/merge";
import { gql } from "apollo-server-express";
import { singlePaintingDef, singlePaintingResolvers } from "./singlePainting";

const querysMutations = gql`
  scalar Upload

  type Query {
    getPaintings: [Painting]
    getPainting(input: PaintingInput): Painting
  }

  type Mutation {
    # Multiple uploads are supported. See graphql-upload docs for details.
    newPainting(input: NewPaintingInput): Painting!
  }
`;

const rootSchema = {
  typeDefs: mergeTypeDefs([querysMutations, singlePaintingDef]),
  resolvers: singlePaintingResolvers,
};
export default rootSchema;
