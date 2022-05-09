import { gql } from "apollo-server-core";
import Debug from "debug";
import ArtCollectionModel from "../database/models/ArtCollections";

const debug = Debug("artGallery-app:ArtCollection");
const artCollectionDef = gql`
  type ArtCollection {
    title: String!
    author: String!
    smallDescription: String
    description: String
    bannerImage: String
    paintings: String
    _id: String
  }
  input ArtCollectionInput {
    _id: String
    author: String
  }
`;

const artCollectionResolvers = {
  Query: {
    getArtCollection: async (_: string, { input }) =>
      ArtCollectionModel.findById({ _id: input._id }),
    getArtCollections: async () => ArtCollectionModel.find(),
  },
};

export { artCollectionResolvers, artCollectionDef };
