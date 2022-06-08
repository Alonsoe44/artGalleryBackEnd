import { Schema, model } from "mongoose";

const AuthorSchema = new Schema({
  name: String,
  textDescription: String,
  paintings: [
    {
      type: Schema.Types.ObjectId,
      default: [],
      ref: "PaintingModel",
    },
  ],
});

const AuthorModel = model("AuthorModel", AuthorSchema, "Authors");

export default AuthorModel;
