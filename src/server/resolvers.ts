const resolvers = {
  Query: {
    getPaintings() {
      return [
        {
          name: "Monoliso",
          author: "elpepe",
        },
      ];
    },
  },
};

export default resolvers;
