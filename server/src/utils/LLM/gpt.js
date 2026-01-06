import OpenAI from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL;

if (!OPENAI_MODEL) {
  throw new Error("OPENAI_MODEL environment variable is not set!");
}

if (!OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY environment variable is not set!");
}

const Gpt = async (prompt, history = [], isStream = false) => {
  const client = new OpenAI({ apiKey: OPENAI_API_KEY });

  const messages = history.flatMap((msg) => [
    { role: "user", content: msg.prompt },
    { role: "assistant", content: msg.response },
  ]);

  messages.push({ role: "user", content: prompt });

  if (isStream) {
    const stream = await client.chat.completions.create({
      model: OPENAI_MODEL,
      messages: messages,
      stream: true,
    });
    return stream;
  } else {
    const response = await client.chat.completions.create({
      model: OPENAI_MODEL,
      messages: messages,
    });

    const messageContent = response.choices[0].message.content;

    return messageContent;
  }
};

export default Gpt;
