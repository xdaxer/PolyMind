import mongoose, { Schema } from "mongoose";

const MusicSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    task_id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "not_started",
    },
    prompt: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    style: {
      type: String,
    },
    custom_mode: {
      type: Boolean,
    },
    url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const MusicModel =
  mongoose.models.Music || mongoose.model("Music", MusicSchema);

export default MusicModel;
