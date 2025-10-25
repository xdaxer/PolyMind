const sendMessageController = async (req, res) => {
  const { prompt } = req.body;
  const user = req.user;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt cannot be empty." });
  }

  res.status(200).json({ message: "Message received.", prompt });
  
  
};

export default sendMessageController