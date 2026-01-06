import MessageModel from "../../Models/schemas/message.schema.js";
import ChatModel from "../../Models/schemas/chat.schema.js";

const getChatHistoryController = async (req, res) => {
  try {
    const { chatID } = req.params;
    const { userID } = req.user;

    const chat = await ChatModel.findOne({ _id: chatID, userID: userID });
    if (!chat) {
      return res.status(404).json({ error: "Sohbet bulunamadı veya yetkiniz yok." });
    }

    const messages = await MessageModel.find({ chatID: chatID }).sort({ createdAt: "asc" });

    const messageGroups = {};

    for (const message of messages) {
      if (!messageGroups[message.prompt]) {
        messageGroups[message.prompt] = {
          user: message.prompt,
          responses: [],
        };
      }
      messageGroups[message.prompt].responses.push({
        _id: message._id,
        llm: message.llm,
        response: message.response,
        isSelected: message.isSelected,
      });
    }

    const formattedMessages = Object.values(messageGroups);

    res.status(200).json(formattedMessages);
  } catch (error) {
    console.error("Sohbet geçmişi alınırken hata:", error);
    res.status(500).json({ error: "Sunucu hatası." });
  }
};

export default getChatHistoryController;
