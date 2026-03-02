import { GoogleGenAI } from "@google/genai";

// @ts-ignore
const API_KEY = process.env.GEMINI_API_KEY;

export const generateVeoVideo = async (imageBase64: string, prompt: string, aspectRatio: "16:9" | "9:16" = "16:9") => {
  if (!API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined");
  }
  
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt || 'A cinematic video of a marathon runner crossing the finish line with high energy',
      image: {
        imageBytes: imageBase64.split(',')[1], // Remove data:image/png;base64,
        mimeType: 'image/png',
      },
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: aspectRatio
      }
    });

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) throw new Error("Video generation failed - no URI returned");

    const response = await fetch(downloadLink, {
      method: 'GET',
      headers: {
        'x-goog-api-key': API_KEY,
      },
    });

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Error generating video:", error);
    throw error;
  }
};
