import { gql } from "apollo-server-core";
import AuthorModel from "../database/models/AuthorModel";

const authorDef = gql`
  type Author {
    name: String
    textDescription: String
    image: String
    _id: String
  }
  input AuthorInput {
    name: String
    textDescription: String
    image: String
    _id: String
  }
`;

const authorResolvers = {
  Query: {
    getAuthor: async (_: string, { input }) =>
      AuthorModel.findById({ _id: input._id }),
    getAuthors: async () => (await AuthorModel.find()).reverse(),
  },

  Mutation: {
    createAuthor: async (_: string, { input }) => {
      await AuthorModel.create(input);
      return { message: "Object created" };
    },
    deleteAuthor: async (_: string, { input }) => {
      await AuthorModel.findByIdAndDelete(input._id);
      return { message: "The author was deleted" };
    },
    updateAuthor: async (_: string, { input }: any) => {
      await AuthorModel.findByIdAndUpdate(input._id, input);
      return { message: "The author was updated" };
    },
  },
};

export { authorDef, authorResolvers };
