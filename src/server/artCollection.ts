import { gql } from "apollo-server-core";
import ArtCollectionModel from "../database/models/ArtCollectionModel";

const artCollectionDef = gql`
  type PaintingId {
    value: String
  }
  union PaintingModes = PaintingId | Painting

  type ArtCollection {
    title: String!
    author: String!
    smallDescription: String
    description: String!
    bannerImage: String
    paintings: [PaintingModes]
    _id: String
  }
  input ArtCollectionInput {
    title: String
    author: String
    smallDescription: String
    description: String
    bannerImage: String
    paintings: [String]
    _id: String
  }
`;

const artCollectionResolvers = {
  PaintingModes: {
    __resolveType(obj) {
      if (obj.value) {
        return "CustomString";
      }
      if (obj.title) return "Painting";
      return "error";
    },
  },

  Query: {
    getArtCollection: async (_: string, { input }) =>
      (await ArtCollectionModel.findById({ _id: input._id })).populate(
        "paintings"
      ),
    getArtCollections: async () => (await ArtCollectionModel.find()).reverse,
    getLatestArtCollection: async () =>
      (await ArtCollectionModel.find().populate("paintings")).reverse()[0],
  },

  Mutation: {
    createArtCollection: async (_: string, { input }) => {
      await ArtCollectionModel.create(input);
      return { message: "Object created" };
    },
    deleteArtCollection: async (_: string, { input }) => {
      await ArtCollectionModel.findByIdAndDelete(input._id);
      return { message: "The art collection was deleted" };
    },
    updateArtCollection: async (_: string, { input }: any) => {
      await ArtCollectionModel.findByIdAndUpdate(input._id, { ...input });
      return { message: "The art collection was updated" };
    },
  },
};

export { artCollectionResolvers, artCollectionDef };
