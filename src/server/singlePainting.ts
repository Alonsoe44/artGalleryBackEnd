/* eslint-disable no-underscore-dangle */
import sharp from "sharp";
import fs from "fs";
import { GraphQLUpload } from "graphql-upload";
import { finished } from "stream/promises";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import path from "path";
import Debug from "debug";
import gql from "graphql-tag";
import PaintingModel from "../database/models/Paintings";
import InputInterface from "../interfaces/InputInterface";
import storage from "./firebase";

const debug = Debug("artGallery-app:Painting");

const singlePaintingDef = gql`
  scalar Upload

  type Painting {
    imageUrl: String!
    title: String!
    author: String
    description: String
    _id: String
  }
  type Message {
    message: String!
  }
  input PaintingInput {
    author: String
    _id: String
  }

  input NewPaintingInput {
    imageFile: Upload
    title: String
    author: String
    description: String
    _id: String
    imageUrl: String
  }

  input PaintingIdInput {
    _id: String!
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
    newPainting: async (_: string, { input }: InputInterface) =>
      new Promise((resolve) => {
        (input.imageFile as any).then(async (data) => {
          const stream = data.createReadStream(
            path.join("uploads", data.filename)
          );

          const out = fs.createWriteStream(path.join("uploads", data.filename));
          stream.pipe(out);
          await finished(out);

          await fs.readFile(
            path.join("uploads", data.filename),
            async (error, folderData) => {
              const refStorage = ref(
                storage,
                path.join("paintings", data.filename)
              );

              const formatedData = await sharp(folderData).webp().toBuffer();
              await uploadBytes(refStorage, formatedData);

              fs.unlink(path.join("uploads", data.filename), () =>
                debug("Uploaded image")
              );
              resolve({ message: "Painting created" });
              const imageUrl = await getDownloadURL(refStorage);
              await PaintingModel.create({
                title: input.title,
                imageUrl,
                description: input.description,
                author: input.author,
              });
            }
          );
        });
      }),
    deletePainting: async (_: string, { input }: any) => {
      const imageRef = ref(storage, input.imageUrl);
      deleteObject(imageRef).then(() => debug("deleted"));
      await PaintingModel.findByIdAndDelete(input._id);
      return { message: "The painting was deleted" };
    },
    updatePainting: async (_: string, { input }: any) => {
      await PaintingModel.findByIdAndUpdate(input._id, { ...input });
      return { message: "The painting was updated" };
    },
  },
};

export { singlePaintingDef, singlePaintingResolvers };
