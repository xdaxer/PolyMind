import Gemini from "../../utils/LLM/gemini.js";
import Gpt from "../../utils/LLM/gpt.js";
import MessageModel from "../../Models/schemas/message.schema.js";
import ChatModel from "../../Models/schemas/chat.schema.js";

const sendMessageController = async (req, res) => {
  try {
     const { prompt, chatID } = req.body;
    const userID = req.user.userID;

    if (!prompt) {
      return res.status(400).json({ error: "Eksik alan: 'prompt' zorunludur." });
    }

    let currentChatID = chatID;

     if (!currentChatID) {
      const newChat = new ChatModel({
        userID: userID,
        title: prompt.substring(0, 40) + "..."
      });
      const savedChat = await newChat.save();
      currentChatID = savedChat._id;
    } else {
       const chat = await ChatModel.findOne({ _id: currentChatID, userID: userID });
      if (!chat) {
        return res.status(404).json({ error: "Sohbet bulunamadı veya yetkiniz yok." });
      }

       const pendingChoice = await MessageModel.findOne({ chatID: currentChatID, isSelected: false });
      if (pendingChoice) {
        return res.status(409).json({ 
          error: "Lütfen devam etmeden önce bir önceki yanıtlardan birini seçin."
        });
      }
    }

     const history = await MessageModel.find({ chatID: currentChatID, isSelected: true }).sort({ createdAt: 1 });

     const [gptResponse, geminiResponse] = await Promise.all([
        Gpt(prompt, history),
        Gemini(prompt, history)
    ]);

     const gptMessage = new MessageModel({
      userID: userID,
      chatID: currentChatID,
      prompt: prompt,
      response: gptResponse,
      llm: 'gpt',
      isSelected: false
    });

    const geminiMessage = new MessageModel({
      userID: userID,
      chatID: currentChatID,
      prompt: prompt,
      response: geminiResponse,
      llm: 'gemini',
      isSelected: false
    });

    await Promise.all([
        gptMessage.save(),
        geminiMessage.save()
    ]);

     const responsePayload = {
        gpt: { response: gptResponse, messageId: gptMessage._id },
        gemini: { response: geminiResponse, messageId: geminiMessage._id }
    };

    // Eğer yeni bir sohbet ise, chatID'yi de yanıta ekle
    if (!chatID) {
        responsePayload.chatID = currentChatID;
    }

    return res.status(200).json(responsePayload);

  } catch (error) {
    console.error("Mesaj gönderme sırasında hata:", error);
    return res.status(500).json({ error: "Mesaj gönderilirken bir sunucu hatası oluştu." });
  }
};

export default sendMessageController;
