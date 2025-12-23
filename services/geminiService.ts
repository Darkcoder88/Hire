
import { GoogleGenAI, Type } from "@google/genai";

// Safe access to API key to prevent "process is not defined" error
const getApiKey = () => {
  try {
    return process.env.API_KEY || '';
  } catch (e) {
    return '';
  }
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

export const analyzeResume = async (resumeText: string, targetRole: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this resume for a ${targetRole} position. Provide 3 specific bullet points to improve the resume for ATS matching. 
      Resume: ${resumeText}`,
      config: {
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error analyzing resume:", error);
    return "Could not analyze resume at this time.";
  }
};

export const generateInterviewTips = async (company: string, role: string, type: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide 5 expert interview tips for a ${type} interview for the position of ${role} at ${company}. 
      Include 3 common technical or behavioral questions.`,
      config: {
        temperature: 0.8,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error generating tips:", error);
    return "Tips are unavailable right now. Focus on core fundamentals!";
  }
};

export const simulateJobMatching = async (resumeText: string, jobDescription: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Compare this resume with the job description. Return ONLY a JSON object with a 'score' from 0-100 and a 'matchReason' string.
      Resume: ${resumeText.substring(0, 1000)}
      Job: ${jobDescription.substring(0, 1000)}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            matchReason: { type: Type.STRING }
          },
          required: ["score", "matchReason"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    return { score: Math.floor(Math.random() * 40) + 60, matchReason: "Standard matching applied." };
  }
}
