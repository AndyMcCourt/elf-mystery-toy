import { GoogleGenAI } from "@google/genai";
import { GEMINI_SYSTEM_PROMPT } from '../constants';

// Initialize the Gemini client
// Note: In a production app, be careful exposing API keys on the client.
// However, for this specified execution context using process.env.API_KEY is required.
let ai: GoogleGenAI | null = null;

try {
    if (process.env.API_KEY) {
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    } else {
        console.warn("API_KEY is missing. Elf hints will use fallback messages.");
    }
} catch (error) {
    console.error("Error initializing GoogleGenAI", error);
}

export const getElfHint = async (currentGuess: string): Promise<string> => {
  if (!ai) {
    return "Oh dear! My magical connection to the North Pole is snowy today. Try guessing 'Someone Special'!";
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = currentGuess 
      ? `The user guessed "${currentGuess}", which is wrong. Give them a hint about who the present really belongs to (the mystery person).`
      : "Give the user a hint about who the present belongs to.";

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: GEMINI_SYSTEM_PROMPT,
        temperature: 0.8,
        maxOutputTokens: 100,
      }
    });

    return response.text || "Ho ho ho! Think of someone full of holiday cheer!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "My elf radio is staticy! Just think: Who is on the nice list?";
  }
};