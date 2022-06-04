import { Schema, model } from "mongoose";

const AuthorSchema = new Schema({
  name: String,
  textDescription: String,
  image: String,
});

const AuthorModel = model("AuthorModel", AuthorSchema, "Authors");

export default AuthorModel;
