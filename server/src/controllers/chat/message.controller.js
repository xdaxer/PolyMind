import Gemini from "../../utils/LLM/gemini.js";
import Gpt from "../../utils/LLM/gpt.js";
import Deepseek from "../../utils/LLM/deepseek.js";
import Perplexity from "../../utils/LLM/perplexity.js";
import MessageModel from "../../Models/schemas/message.schema.js";
import ChatModel from "../../Models/schemas/chat.schema.js";
import generateTitle from "../../utils/generateTitle.js";

const messageController = async (req, res) => {
  try {
    const { prompt, chatID, llm } = req.body;
    const userID = req.user.userID;

    if (!prompt) {
      return res.status(400).json({ error: "prompt zorunludur." });
    }

    let currentChatID = chatID;
    let isNewChat = false;

     if (!currentChatID) {
      isNewChat = true;
      const newChat = new ChatModel({
        userID: userID,
        title: (await generateTitle(prompt)) || prompt.substring(0, 40) + "...",
      });
      const savedChat = await newChat.save();
      currentChatID = savedChat._id;

      const models = {
        gpt: Gpt,
        gemini: Gemini,
        deepseek: Deepseek,
        perplexity: Perplexity,
      };

      const responses = await Promise.all(
        Object.entries(models).map(async ([modelName, modelFn]) => {
          try {
            const response = await modelFn(prompt, []);
            const message = new MessageModel({
              userID: userID,
              chatID: currentChatID,
              prompt: prompt,
              response: response,
              llm: modelName,
              isSelected: false,  
            });
            await message.save();
            return { llm: modelName, response, messageID: message._id };
          } catch (error) {
            console.error(`Error from ${modelName}:`, error);
            return { llm: modelName, response: null, error: `Failed to get response from ${modelName}.` };
          }
        })
      );

      return res.status(200).json({
        chatID: currentChatID,
        responses: responses,
      });

    } else { // Existing Chat
      const chat = await ChatModel.findOne({
        _id: currentChatID,
        userID: userID,
      });
      if (!chat) {
        return res
          .status(404)
          .json({ error: "Sohbet bulunamadı veya yetkiniz yok." });
      }

      const history = await MessageModel.find({
        chatID: currentChatID,
        isSelected: true,
      }).sort({ createdAt: 1 });

      const models = {
        gpt: Gpt,
        gemini: Gemini,
        deepseek: Deepseek,
        perplexity: Perplexity,
      };

      const responses = await Promise.all(
        Object.entries(models).map(async ([modelName, modelFn]) => {
          try {
            const response = await modelFn(prompt, history);
            const message = new MessageModel({
              userID: userID,
              chatID: currentChatID,
              prompt: prompt,
              response: response,
              llm: modelName,
              isSelected: false,
            });
            await message.save();
            return { llm: modelName, response, messageID: message._id };
          } catch (error) {
            console.error(`Error from ${modelName}:`, error);
            return { llm: modelName, response: null, error: `Failed to get response from ${modelName}.` };
          }
        })
      );

      return res.status(200).json({
        chatID: currentChatID,
        responses: responses,
      });
    }
  } catch (error) {
    console.error("Mesaj gönderme sırasında hata:", error);
    return res
      .status(500)
      .json({ error: "Mesaj gönderilirken bir sunucu hatası oluştu." });
  }
};

export default messageController;
