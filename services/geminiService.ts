
import { GoogleGenAI, Type } from "@google/genai";
import { PainPoint } from "../types";

export const generatePainPoints = async (industry?: string): Promise<PainPoint[]> => {
  // Always initialize with named parameter and direct process.env.API_KEY reference
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const industryContext = industry 
    ? `specifically for the ${industry} industry` 
    : "across various high-value industries like Finance, HR, Logistics, Education, or Manufacturing";

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate 5 high-value, niche professional pain points ${industryContext} suitable for Micro-SaaS development. Use the Greg Isenberg 'Unbundling' methodology.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            industry: { type: Type.STRING },
            title: { type: Type.STRING },
            intensity: { 
              type: Type.STRING,
              description: "One of: 'Critical', 'Systemic', 'High Margin', 'Low Efficiency', 'Regulatory'"
            },
            // Property names aligned with PainPoint interface in types.ts
            description: { type: Type.STRING },
            reasoning: { type: Type.STRING },
            statistic: { type: Type.STRING },
            solution_idea: { type: Type.STRING },
            swot: {
              type: Type.OBJECT,
              properties: {
                strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
                opportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
                threats: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ["strengths", "weaknesses", "opportunities", "threats"],
            }
          },
          required: ["id", "industry", "title", "intensity", "description", "reasoning", "statistic", "solution_idea", "swot"],
        }
      },
    }
  });

  // Access text directly as a property from the response
  const text = response.text;
  if (!text) throw new Error("Failed to generate content");
  
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse Gemini response:", text);
    throw new Error("Invalid response format");
  }
};
