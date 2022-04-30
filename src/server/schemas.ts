import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar Upload
  type Painting {
    image: String!
    title: String!
    author: String
    description: String
    _id: String
  }
  input PaintingInput {
    author: String
    _id: String
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Query {
    getPaintings: [Painting]
    getPainting(input: PaintingInput): Painting
  }

  input NewPaintingInput {
    image: String!
    title: String!
    author: String
    description: String
    _id: String
  }
  type Mutation {
    # Multiple uploads are supported. See graphql-upload docs for details.
    newPainting(input: NewPaintingInput): Painting!
    singleUpload(file: Upload!): File!
  }
`;

export default typeDefs;
