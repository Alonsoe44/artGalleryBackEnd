import mongoose from "mongoose";
import Debug from "debug";

const debug = Debug("artGallery-app:database");

const connectDataBase = (connectionString: string) =>
  new Promise<void>((resolve, reject) => {
    mongoose.set("debug", false);
    mongoose.connect(connectionString, (error) => {
      if (error) {
        reject(error);
        return;
      }
      debug("Database connected");
      resolve();
    });
  });

export default connectDataBase;
