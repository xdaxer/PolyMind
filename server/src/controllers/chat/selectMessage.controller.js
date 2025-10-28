import ChatModel from "../../Models/schemas/chat.schema.js";
import MessageModel from "../../Models/schemas/message.schema.js";

const selectMessageController = async (req, res) => {
  try {
    const { chatID, messageID } = req.body;
    const userID = req.user.userID;

    if (!chatID || !messageID) {
        return res.status(400).json({ error: "chatID ve messageID zorunludur." });
    }

     const chat = await ChatModel.findOne({ _id: chatID, userID: userID });
    if (!chat) {
      return res.status(404).json({ error: "Sohbet bulunamadı veya yetkiniz yok." });
    }

     const selectedMessage = await MessageModel.findOne({ _id: messageID, chatID: chatID });
    if (!selectedMessage) {
      return res.status(404).json({ error: "Mesaj bulunamadı." });
    }

     if (selectedMessage.isSelected) {
        return res.status(200).json({ message: "Bu mesaj zaten seçilmiş.", selectedMessage });
    }

     selectedMessage.isSelected = true;
    await selectedMessage.save(); 

    
    await MessageModel.deleteOne({
      chatID: chatID,
      prompt: selectedMessage.prompt,
      _id: { $ne: messageID },
      isSelected: false
    });

    return res.status(200).json({ message: "Mesaj seçimi başarılı.", selectedMessage });

  } catch (error) {
    console.error("Mesaj seçme hatası:", error);
    return res.status(500).json({ error: "Mesaj seçilirken bir sunucu hatası oluştu." });
  }
};

export default selectMessageController;
