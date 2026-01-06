import mongoose, { Schema } from "mongoose";

const VideoSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    VideoFilePath: {
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

const VideoModel =
  mongoose.models.Video || mongoose.model("Video", VideoSchema);

export default VideoModel;
