import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    chatID: {     
      type: Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },

    prompt: {
      type: String,
      required: true,
    },
    response: {
      type: String,
      required: true,
    },
    llm: {
      type: String,
      enum: ["gpt", "gemini", "deepseek", "perplexity", "llama"],
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const MessageModel =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

export default MessageModel;
