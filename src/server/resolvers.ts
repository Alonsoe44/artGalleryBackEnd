/* eslint-disable no-underscore-dangle */
import { debug } from "console";
import fs from "fs";
import { GraphQLUpload } from "graphql-upload";
import { finished } from "stream/promises";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import path from "path";
import PaintingModel from "../database/models/Paintings";
import InputInterface from "../interfaces/InputInterface";
import fireApp from "./firebase";

const storage = getStorage(fireApp);
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
    newPainting: async (_: string, { input }: InputInterface) => {
      (input.imageFile as any).then(async (data) => {
        console.log(data.filename);
        const stream = data.createReadStream(
          path.join("uploads", data.filename)
        );
        const refStorage = ref(storage, path.join("paintings", data.filename));
        const out = fs.createWriteStream(path.join("uploads", data.filename));
        stream.pipe(out);
        await finished(out);
        debug(data);
        debug(stream);
        fs.readFile(
          path.join("uploads", data.filename),
          (error, folderData) => {
            if (error) {
              return { error };
            }
            console.log(folderData);
            console.log("abouve you");
            uploadBytes(refStorage, folderData).then(() =>
              console.log("Todo perfect")
            );
            return " hola";
          }
        );
      });
      return { title: "lol i am fake" };
    },
  },
};

export default resolvers;
