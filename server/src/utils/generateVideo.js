import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { GoogleGenAI } from "@google/genai";
import VideoModel from "../Models/schemas/video.schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not set!");
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const GenerateVideo = async (userID, prompt) => {
  const newVideo = new VideoModel({
    userID,
    prompt,
  });
  await newVideo.save();

  let operation = await ai.models.generateVideos({
    model: "veo-3.0-generate-001",
    prompt,
    width: 1280,
    height: 720,
  });

  while (!operation.done) {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({
      operation: operation,
    });
  }

  const video = operation.response.generatedVideos[0].video;
  const videoFileName = `${newVideo._id}.mp4`;
  const videosDir = path.join(__dirname, "..", "public", "videos");

  if (!fs.existsSync(videosDir)) {
    fs.mkdirSync(videosDir, { recursive: true });
  }

  const downloadPath = path.join(videosDir, videoFileName);

  ai.files.download({
    file: video,
    downloadPath: downloadPath,
  });

  const videoUrl = `/videos/${videoFileName}`;
  newVideo.VideoFilePath = videoUrl;
  await newVideo.save();

  return {
    success: true,
    data: {
      url: videoUrl,
    },
  };
};

export default GenerateVideo;
