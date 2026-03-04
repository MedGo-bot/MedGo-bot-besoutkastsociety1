import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateSocietyImage(prompt: string) {
  try {
    const isDetailed = prompt.length > 100;
    const finalPrompt = isDetailed 
      ? prompt 
      : `High-end editorial photography for Bes Outkast Society News magazine. Aesthetic: Luxury, gritty, minimalist, high-contrast, cinematic. Subject: ${prompt}. Style: Grayscale with deep blacks and sharp details, or muted cinematic colors. Professional lighting, 8k resolution.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: finalPrompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
}
