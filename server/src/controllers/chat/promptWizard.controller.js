import Gemini from "../../utils/LLM/gemini.js";
const promptWizardController = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  const generatedPrompt = await Gemini(
    `Bu istemi geliştir: ${prompt} Sadece geliştirilmiş istemi döndür, başka hiçbir şey döndürme.`
  );

  res.status(200).json(generatedPrompt);
};

export default promptWizardController;
