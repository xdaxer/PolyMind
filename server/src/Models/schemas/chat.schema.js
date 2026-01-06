import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

chatSchema.index({ userID: 1 });

const ChatModel = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default ChatModel;
