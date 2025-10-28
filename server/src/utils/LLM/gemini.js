import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not set!");
}
if (!GEMINI_MODEL) {
  throw new Error("GEMINI_MODEL environment variable is not set!");
}

// Fonksiyon artık 'history' adında ikinci bir parametre alıyor.
const Gemini = async (prompt, history = []) => {
  const genAI = new GoogleGenAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

  // Geçmişi, Google AI'ın beklediği 'user' ve 'model' rolleri formatına dönüştür.
  const chatHistory = history.flatMap(msg => [
    { role: "user", parts: [{ text: msg.prompt }] },
    { role: "model", parts: [{ text: msg.response }] }
  ]);

  // Sohbeti geçmişle birlikte başlat.
  const chat = model.startChat({
    history: chatHistory,
  });

  // Yeni prompt'u gönder ve sonucu al.
  const result = await chat.sendMessage(prompt);
  const response = result.response;
  const text = response.text();

  // Sadece modelin metin yanıtını geri dönelim.
  return text;
};

export default Gemini;
