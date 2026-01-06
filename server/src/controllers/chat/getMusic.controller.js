import { queryMusic } from "../../utils/generateMusic.js";
import MusicModel from "../../Models/schemas/music.schema.js";

const getMusicController = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!taskId) {
      return res.status(400).json({ error: "Lütfen bir görev ID'si giriniz." });
    }

    const response = await queryMusic(taskId);

    let musicUrl;
    if (response.data && response.data.files && response.data.files.length > 0) {
      musicUrl = response.data.files[0].audio_url;
    }

    const music = await MusicModel.findOneAndUpdate(
      { task_id: taskId },
      {
        status: response.data.status,
        url: musicUrl,
      },
      { new: true }
    );

    if (!music) {
      return res.status(404).json({ error: "Müzik bulunamadı." });
    }

    res.status(200).json({
      success: true,
      data: {
        status: music.status,
        url: music.url,
      },
    });
  } catch (error) {
    console.error("Müzik durumu sorgulanırken hata:", error);
    res.status(500).json({
      error: "Müzik durumu sorgulanırken bir sunucu hatası oluştu.",
    });
  }
};

export default getMusicController;
