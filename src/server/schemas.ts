import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { gql } from "apollo-server-express";
import { artCollectionDef, artCollectionResolvers } from "./artCollection";
import { authorDef, authorResolvers } from "./author";
import { singlePaintingDef, singlePaintingResolvers } from "./singlePainting";

const querysMutations = gql`
  scalar Upload

  type Query {
    getPaintings: [Painting]
    getPainting(input: PaintingInput): Painting
    getArtCollections: [ArtCollection]
    getArtCollection(input: ArtCollectionInput): ArtCollection
    getLatestArtCollection: ArtCollection
    getAuthor: Author
    getAuthors: [Author]
  }

  type Mutation {
    newPainting(input: PaintingInput): Message!
    deletePainting(input: PaintingInput): Message!
    updatePainting(input: PaintingInput): Message!
    createArtCollection(input: ArtCollectionInput): Message!
    deleteArtCollection(input: ArtCollectionInput): Message!
    updateArtCollection(input: ArtCollectionInput): Message!
    createAuthor(input: AuthorInput): Message!
    deleteAuthor(input: AuthorInput): Message!
    updateAuthor(input: AuthorInput): Message!
  }
`;

const rootSchema = {
  typeDefs: mergeTypeDefs([
    querysMutations,
    singlePaintingDef,
    artCollectionDef,
    authorDef,
  ]),
  resolvers: mergeResolvers([
    singlePaintingResolvers,
    artCollectionResolvers,
    authorResolvers,
  ]),
};
export default rootSchema;
