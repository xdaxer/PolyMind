import ChatModel from "../../Models/schemas/chat.schema.js";
import MessageModel from "../../Models/schemas/message.schema.js";

const deleteChatController = async (req, res) => {
  try {
    const { chatID } = req.params;  
    const userID = req.user.userID;

    if (!chatID) {
      return res.status(400).json({ error: "Sohbet ID'si zorunludur." });
    }

     const chat = await ChatModel.findOne({ _id: chatID, userID: userID });

    if (!chat) {
      return res.status(404).json({ error: "Sohbet bulunamadı veya bu işlem için yetkiniz yok." });
    }

     await Promise.all([
      MessageModel.updateMany({ chatID: chatID }, { $set: { isDeleted: true } }),
      ChatModel.updateOne({ _id: chatID }, { $set: { isDeleted: true } })
    ]);

    return res.status(200).json({ message: "Sohbet başarıyla silindi." });

  } catch (error) {
    console.error("Sohbet silinirken hata:", error);
    return res.status(500).json({ error: "Sohbet silinirken bir sunucu hatası oluştu." });
  }
};

export default deleteChatController;
