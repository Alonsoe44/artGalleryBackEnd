import { Schema, model } from "mongoose";

const PaintingSchema = new Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: String,
  description: String,
});

const PaintingModel = model("PaintingModel", PaintingSchema, "Paintings");

export default PaintingModel;
