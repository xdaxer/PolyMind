import OpenAI from "openai";

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const PERPLEXITY_MODEL = process.env.PERPLEXITY_MODEL;

if (!PERPLEXITY_MODEL) {
  throw new Error("PERPLEXITY_MODEL environment variable is not set!");
}

if (!PERPLEXITY_API_KEY) {
  throw new Error("PERPLEXITY_API_KEY environment variable is not set!");
}

const Perplexity = async (prompt, history = []) => {
  const client = new OpenAI({
    apiKey: PERPLEXITY_API_KEY,
    baseURL: "https://api.perplexity.ai",
  });

  const messages = history.flatMap((msg) => [
    { role: "user", content: msg.prompt },
    { role: "assistant", content: msg.response },
  ]);

  messages.push({ role: "user", content: prompt });

  const response = await client.chat.completions.create({
    model: PERPLEXITY_MODEL,
    messages: messages,
  });

  const messageContent = response.choices[0].message.content;

  return messageContent;
};

export default Perplexity;
