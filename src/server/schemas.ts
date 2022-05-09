import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { gql } from "apollo-server-express";
import { artCollectionDef, artCollectionResolvers } from "./artCollection";
import { singlePaintingDef, singlePaintingResolvers } from "./singlePainting";

const querysMutations = gql`
  scalar Upload

  type Query {
    getPaintings: [Painting]
    getPainting(input: PaintingInput): Painting
    getArtCollections: [ArtCollection]
    getArtCollection(input: ArtCollectionInput): ArtCollection
  }

  type Mutation {
    # Multiple uploads are supported. See graphql-upload docs for details.
    newPainting(input: NewPaintingInput): Message!
    deletePainting(input: NewPaintingInput): Message!
    updatePainting(input: NewPaintingInput): Message!
  }
`;

const rootSchema = {
  typeDefs: mergeTypeDefs([
    querysMutations,
    singlePaintingDef,
    artCollectionDef,
  ]),
  resolvers: mergeResolvers([singlePaintingResolvers, artCollectionResolvers]),
};
export default rootSchema;
