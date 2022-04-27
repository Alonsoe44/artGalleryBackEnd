import gql from "graphql-tag";

const typeDefs = gql`
  type Painting {
    image: String!
    title: String!
    author: String
    description: String
    paintingId: String
  }
  input PaintingInput {
    author: String
    paintingId: String
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
    paintingId: String
  }
  type Mutation {
    newPainting(input: NewPaintingInput): Painting!
  }
`;

export default typeDefs;
