import ChatModel from "../../Models/schemas/chat.schema.js";
const createChatController = async (req, res) => {
  const user = req.user;

  const newChat = new ChatModel({
    userID: user.userID,
    title: "Başlık",
    createAt: new Date(),
  });

  await newChat.save();

  return res.status(201).json({
    message: "Sohbet Başlatıldı",
    chat: {
      chatID: newChat._id,
      userID: newChat.userID,
      title: newChat.title,
      createdAt: newChat.createdAt,
      updatedAt: newChat.updatedAt,
    },
  });
};

export default createChatController;
