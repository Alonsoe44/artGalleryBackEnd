/* eslint-disable no-underscore-dangle */
import fs from "fs";
import { GraphQLUpload } from "graphql-upload";
import { finished } from "stream/promises";
import PaintingModel from "../database/models/Paintings";
import InputInterface from "../interfaces/InputInterface";

interface imageData {
  createReadStream: () => any;
  filename: String;
  mimetype: String;
  encoding: String;
}

interface sillyInterface {
  file: imageData;
}

const resolvers = {
  Query: {
    getPaintings: async () => PaintingModel.find(),
    getPainting: async (_: string, { input }: InputInterface) =>
      PaintingModel.findById(input._id),
  },
  Upload: GraphQLUpload,
  Mutation: {
    newPainting: async (_: string, { input }: InputInterface) =>
      PaintingModel.create(input),
    singleUpload: async (_: string, { file }: sillyInterface) => {
      const { createReadStream, filename, mimetype, encoding } = await file;

      // Invoking the `createReadStream` will return a Readable Stream.
      // See https://nodejs.org/api/stream.html#stream_readable_streams
      const stream = createReadStream();

      // This is purely for demonstration purposes and will overwrite the
      // local-file-output.txt in the current working directory on EACH upload.
      const out = fs.createWriteStream("local-file-output.txt");
      stream.pipe(out);
      await finished(out);

      return { filename, mimetype, encoding };
    },
  },
};

export default resolvers;
