import Gemini from "./LLM/gemini.js";

const generateTitle = async (prompt) => {
  try {
    const titlePrompt = `Aşağıdaki istemle başlayan bir konuşma için en fazla 15 karakter içeren öz bir başlık oluştur: "${prompt}" istenilen dışına hiç bir şey yazma doğrudan mesajı ver`;
    const title = await Gemini(titlePrompt);
    return title.replace(/["*]/g, "").trim();
  } catch (error) {
    console.error("Error generating title:", error);
    return "Yeni Sohbet";
  }
};

export default generateTitle;
