
import { GoogleGenAI, Type } from "@google/genai";

// Always create a new GoogleGenAI instance right before making an API call to ensure it always uses the most up-to-date configuration.
export const generateImage = async (prompt: string): Promise<string | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image generation failed:", error);
    return null;
  }
};

export const generateBlogContent = async (topic: string): Promise<{ title: string; content: string }> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a high-level productivity blog post about ${topic}. Use deep learning concepts.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "A compelling title for the productivity blog post.",
            },
            content: {
              type: Type.STRING,
              description: "The body content of the blog post, focusing on deep learning and productivity.",
            }
          },
          required: ["title", "content"]
        }
      }
    });
    
    const text = response.text;
    return text ? JSON.parse(text) : { title: "AI Innovation", content: "The future is here." };
  } catch (error) {
    console.error("Blog content generation failed:", error);
    return { title: "The Deep Learning Shift", content: "Artificial General Intelligence is revolutionizing how we approach productivity through Chain of Thought algorithms." };
  }
};
