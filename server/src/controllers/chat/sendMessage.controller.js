import Gemini from "../../utils/LLM/gemini.js";
import Gpt from "../../utils/LLM/gpt.js";
import Deepseek from "../../utils/LLM/deepseek.js";
import Perplexity from "../../utils/LLM/perplexity.js";
import MessageModel from "../../Models/schemas/message.schema.js";
import ChatModel from "../../Models/schemas/chat.schema.js";
import generateTitle from "../../utils/generateTitle.js";

const sendMessageController = async (req, res) => {
  try {
    const { prompt, chatID } = req.body;
    const { llm } = req.params;
    const userID = req.user.userID;

    const models = {
      gpt: Gpt,
      gemini: Gemini,
      deepseek: Deepseek,
      perplexity: Perplexity,
    };

    if (!models[llm]) {
      return res.status(400).json({ error: "Geçersiz Model adı." });
    }

    if (!prompt) {
      return res.status(400).json({ error: "prompt zorunludur." });
    }

    let currentChatID = chatID;
    let isNewChat = false;

    if (!currentChatID) {
      const newChat = new ChatModel({
        userID: userID,
        title: (await generateTitle(prompt)) || prompt.substring(0, 40) + "...",
      });
      const savedChat = await newChat.save();
      currentChatID = savedChat._id;
      isNewChat = true;
    } else {
      const chat = await ChatModel.findOne({
        _id: currentChatID,
        userID: userID,
      });
      if (!chat) {
        return res
          .status(404)
          .json({ error: "Sohbet bulunamadı veya yetkiniz yok." });
      }
    }

    const history = await MessageModel.find({
      chatID: currentChatID,
      isSelected: true,
    }).sort({ createdAt: 1 });

    const modelFn = models[llm];

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    try {
      const stream = await modelFn(prompt, history, true);
      let fullResponse = "";

      for await (const chunk of stream) {
        const text = llm === 'gemini' ? chunk.text() : chunk.choices[0]?.delta?.content || "";
        fullResponse += text;
        res.write(`data: ${JSON.stringify({ response: text })}\n\n`);
      }

      const message = new MessageModel({
        userID: userID,
        chatID: currentChatID,
        prompt: prompt,
        response: fullResponse,
        llm: llm,
        isSelected: false,
      });
      await message.save();

      const payload = {
        messageID: message._id,
        chatID: currentChatID,
      };

      res.write(`data: ${JSON.stringify(payload)}\n\n`);
      res.end();
    } catch (error) {
      console.error(`Error from ${llm}:`, error);
      res.write(
        `data: ${JSON.stringify({
          error: `Failed to get response from ${llm}.`,
        })}\n\n`
      );
      res.end();
    }
  } catch (error) {
    console.error("Mesaj gönderme sırasında hata:", error);
     if (!res.headersSent) {
      return res
        .status(500)
        .json({ error: "Mesaj gönderilirken bir sunucu hatası oluştu." });
    }
  }
};

export default sendMessageController;
