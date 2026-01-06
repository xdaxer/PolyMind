import MusicModel from "../../Models/schemas/music.schema.js";

const musicCallbackController = async (req, res) => {
  try {
    const { task_id, status, output } = req.body;

    if (!task_id) {
      return res.status(400).json({ error: "Lütfen bir görev ID'si giriniz." });
    }

    const music = await MusicModel.findOneAndUpdate(
      { task_id: task_id },
      {
        status: status,
        url: output,
      },
      { new: true }
    );

    if (!music) {
      // We can't find the music, but we should still acknowledge the callback
      return res.status(200).json({ message: "Music not found, but callback acknowledged." });
    }

    console.log(`Music task ${task_id} updated via callback. Status: ${status}`);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Müzik geri araması işlenirken hata:", error);
    // Even if there's an error, we should tell Poyo that we received the callback
    res.status(200).json({
      error: "Müzik geri araması işlenirken bir sunucu hatası oluştu.",
    });
  }
};

export default musicCallbackController;
