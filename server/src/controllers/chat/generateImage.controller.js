import createImage from "../../utils/generateImage.js";

const generateImageController = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userID = req.user.userID

    if (!prompt) {
      return res.status(400).json({ error: "Lütfen bir prompt giriniz." });
    }

    const image = await createImage(userID, prompt);

    res.status(201).json(image);
  } catch (error) {
    console.error("Görsel oluşturulurken hata:", error);
    res
      .status(500)
      .json({ error: "Görsel oluşturulurken bir sunucu hatası oluştu." });
  }
};

export default generateImageController;
