import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_MODEL = process.env.DEEPSEEK_MODEL;

if (!DEEPSEEK_MODEL) {
  throw new Error("DEEPSEEK_MODEL environment variable is not set!");
}

if (!DEEPSEEK_API_KEY) {
  throw new Error("DEEPSEEK_API_KEY environment variable is not set!");
}

const Deepseek = async (prompt, history = []) => {
  const client = new OpenAI({
    baseURL: "https://api.deepseek.com",
    apiKey: DEEPSEEK_API_KEY,
  });

  const messages = history.flatMap((msg) => [
    { role: "user", content: msg.prompt },
    { role: "assistant", content: msg.response },
  ]);

  messages.push({ role: "user", content: prompt });

  const response = await client.chat.completions.create({
    model: DEEPSEEK_MODEL,
    messages: messages,
  });

  const messageContent = response.choices[0].message.content;

  return messageContent;
};

export default Deepseek;
