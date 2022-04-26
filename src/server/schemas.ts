import gql from "graphql-tag";

const typeDefs = gql`
  type Painting {
    name: String!
    imageName: String!
    author: String!
    text: String
  }

  type Query {
    getPaintings: [Painting]
  }
`;

export default typeDefs;
