/* eslint-disable no-underscore-dangle */
import fs from "fs";
import { GraphQLUpload } from "graphql-upload";
import { finished } from "stream/promises";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import path from "path";
import Debug from "debug";
import gql from "graphql-tag";
import PaintingModel from "../database/models/Paintings";
import InputInterface from "../interfaces/InputInterface";
import storage from "./firebase";

const debug = Debug("artGallery-app:resolvers");

const singlePaintingDef = gql`
  scalar Upload

  type Painting {
    imageUrl: Upload
    title: String!
    author: String
    description: String
    _id: String
  }

  input PaintingInput {
    author: String
    _id: String
  }

  input NewPaintingInput {
    imageFile: Upload
    title: String!
    author: String
    description: String
    _id: String
  }
`;

const singlePaintingResolvers = {
  Query: {
    getPaintings: async () => PaintingModel.find(),
    getPainting: async (_: string, { input }: InputInterface) =>
      PaintingModel.findById(input._id),
  },

  Upload: GraphQLUpload,

  Mutation: {
    newPainting: async (_: string, { input }: InputInterface) => {
      (input.imageFile as any).then(async (data) => {
        const stream = data.createReadStream(
          path.join("uploads", data.filename)
        );

        const out = fs.createWriteStream(path.join("uploads", data.filename));
        stream.pipe(out);
        await finished(out);

        fs.readFile(
          path.join("uploads", data.filename),
          async (error, folderData) => {
            const refStorage = ref(
              storage,
              path.join("paintings", data.filename)
            );
            await uploadBytes(refStorage, folderData);

            fs.unlink(path.join("uploads", data.filename), () =>
              debug("Uploaded and deleted")
            );
            const imageUrl = await getDownloadURL(refStorage);
            PaintingModel.create({
              title: input.title,
              imageUrl,
              description: input.description,
              author: input.author,
            });
          }
        );
      });
      return { status: "Painting created" };
    },
  },
};

export { singlePaintingDef, singlePaintingResolvers };
