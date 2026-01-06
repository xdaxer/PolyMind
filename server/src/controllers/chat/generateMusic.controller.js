import generateMusic from "../../utils/generateMusic.js";
import MusicModel from "../../Models/schemas/music.schema.js";

const generateMusicController = async (req, res) => {
  try {
    const { prompt, style, title, custom_mode, instrumental, mv } = req.body;
    const userID = req.user.userID;

    if (!prompt) {
      return res.status(400).json({ error: "Lütfen bir prompt giriniz." });
    }

    const input = {
      prompt,
      style,
      title,
      custom_mode,
      instrumental,
      mv,
    };

    const response = await generateMusic(input);

    const music = new MusicModel({
      userID,
      task_id: response.data.task_id,
      status: response.data.status,
      prompt,
      style,
      title,
      custom_mode,
    });

    await music.save();

    res.status(201).json({
      success: true,
      message: "Music generation task submitted successfully.",
      data: {
        task_id: response.data.task_id,
      },
    });
  } catch (error) {
    console.error("Müzik oluşturulurken hata:", error);
    if (error.status) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Poyo API Error Response:", error.data);
      res.status(error.status).json({
        error: "Müzik oluşturma servisinden hatalı yanıt alındı.",
        details: error.data,
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      res.status(500).json({
        error: "Müzik oluşturulurken bir sunucu hatası oluştu.",
      });
    }
  }
};

export default generateMusicController;
