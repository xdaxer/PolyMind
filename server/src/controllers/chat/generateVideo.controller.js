import GenerateVideo from "../../utils/generateVideo.js";

const generateVideoController = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userID = req.user.userID;

    if (!prompt) {
      return res.status(400).json({ error: "Lütfen bir prompt giriniz." });
    }

    const video = await GenerateVideo(userID, prompt);

    res.status(201).json(video);
  } catch (error) {
    console.error("Video oluşturulurken hata:", error);
    res
      .status(500)
      .json({ error: "Video oluşturulurken bir sunucu hatası oluştu." });
  }
};

export default generateVideoController;
