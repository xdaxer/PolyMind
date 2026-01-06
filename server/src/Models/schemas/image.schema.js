import mongoose, { Schema } from "mongoose";

const ImageSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageFilePath: {
      type: String,
    },
    prompt: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ImageModel =
  mongoose.models.Image || mongoose.model("Image", ImageSchema);

export default ImageModel;
