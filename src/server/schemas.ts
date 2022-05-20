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
    getLatestArtCollection: ArtCollection
  }

  type Mutation {
    newPainting(input: PaintingInput): Message!
    deletePainting(input: PaintingInput): Message!
    updatePainting(input: PaintingInput): Message!
    createArtCollection(input: ArtCollectionInput): Message!
    deleteArtCollection(input: ArtCollectionInput): Message!
    updateArtCollection(input: ArtCollectionInput): Message!
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
