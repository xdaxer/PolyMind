import ChatModel from "../../Models/schemas/chat.schema.js";

const listChatsController = async (req, res) => {
  try {
    const userID = req.user.userID;

    const chats = await ChatModel.find({ userID: userID, isDeleted: { $ne: true } }).sort({ updatedAt: -1 });

    if (!chats || chats.length === 0) {
      return res.status(200).json([]);  
    }

    const chatList = chats.map(chat => ({
      chatID: chat._id,
      title: chat.title,
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt
    }));

    return res.status(200).json(chatList);

  } catch (error) {
    console.error("Sohbetler listelenirken hata:", error);
    return res.status(500).json({ error: "Sohbetler listelenirken bir sunucu hatası oluştu." });
  }
};

export default listChatsController;
