import { GoogleGenAI, Type } from "@google/genai";

export const generateImage = async (prompt: string): Promise<string | null> => {
  try {
    const apiKey = process.env.API_KEY || '';
    if (!apiKey) console.warn("Gemini API Key missing. Image generation will fail.");
    
    const ai = new GoogleGenAI({ apiKey });
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
    console.error("AI Image generation failed:", error);
    return null;
  }
};

export const generateBlogContent = async (topic: string): Promise<{ title: string; content: string }> => {
  try {
    const apiKey = process.env.API_KEY || '';
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a high-level productivity blog post about ${topic}. Focus on deep learning and neural efficiency.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "Catchy title for the blog post.",
            },
            content: {
              type: Type.STRING,
              description: "The core article text.",
            }
          },
          required: ["title", "content"]
        }
      }
    });
    
    const text = response.text || '{}';
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Blog generation failed:", error);
    return { 
      title: "The Neural Productivity Shift", 
      content: "Exploring how Large Language Models are redefining the boundaries of human cognitive output through automated reasoning." 
    };
  }
};