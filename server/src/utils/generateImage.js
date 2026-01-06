import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import ImageModel from "../Models/schemas/image.schema.js";

import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not set!");
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const GenerateImage = async (userID, prompt) => {
  try {
    const image = new ImageModel({
      prompt,
      userID: userID,
    });

    await image.save();

    const response = await ai.models.generateImages({
      model: "imagen-4.0-generate-001",
      prompt: prompt,
      config: {
        numberOfImages: 1,
      },
    });

    const generatedImage = response.generatedImages[0];
    const imgBytes = generatedImage.image.imageBytes;
    const buffer = Buffer.from(imgBytes, "base64");

    const imageName = `${image._id}.png`;
    const imagePath = path.join(__dirname, "..", "public", "images", imageName);

    fs.writeFileSync(imagePath, buffer);

    const imageUrl = `/images/${imageName}`;
    image.url = imageUrl;
    await image.save();

    return {
      success: true,
      message: "Image generated and saved successfully.",
      data: {
        url: imageUrl,
      },
    };
  } catch (error) {
    console.error("Error in image generation:", error);
    return {
      success: false,
      message: "Failed to generate image.",
      error: error.message,
    };
  }
};

export default GenerateImage;
