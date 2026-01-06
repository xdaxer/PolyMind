import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not set!");
}
if (!GEMINI_MODEL) {
  throw new Error("GEMINI_MODEL environment variable is not set!");
}

const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const Gemini = async (prompt, history = []) => {
  const chatHistory = history.flatMap((msg) => [
    { role: "user", parts: [{ text: msg.prompt }] },
    { role: "model", parts: [{ text: msg.response }] },
  ]);

  const chat = genAI.chats.create({
    model: GEMINI_MODEL,
    history: chatHistory,
  });

  const response = await chat.sendMessage({ message: prompt });

  return response.text;
};

export default Gemini;
