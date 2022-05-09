import { Schema, model } from "mongoose";

const ArtCollection = new Schema({
  title: {
    type: String,
    required: true,
  },

  author: {
    type: String,
    required: true,
  },

  smallDescription: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  bannerImage: {
    type: String,
  },

  paintings: [
    {
      type: Schema.Types.ObjectId,
      default: [],
      ref: "PaintingModel",
    },
  ],
});

const ArtCollectionModel = model(
  "ArtCollectionModel",
  ArtCollection,
  "ArtCollections"
);

export default ArtCollectionModel;
