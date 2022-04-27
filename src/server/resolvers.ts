import PaintingModel from "../database/models/Paintings";
import InputInterface from "../interfaces/InputInterface";
import PaintingInputInterface from "../interfaces/PaintingInputInterface";

const resolvers = {
  Query: {
    getPaintings: async () => PaintingModel.find(),
    getPainting: async (_: string, { input }: InputInterface) =>
      PaintingModel.findById(input.paintingId),
  },
  Mutation: {
    newPainting: async (_: string, { input }: InputInterface) =>
      PaintingModel.create(input),
  },
};

export default resolvers;
