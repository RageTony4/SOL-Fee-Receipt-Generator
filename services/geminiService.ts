import { GoogleGenAI, Type } from "@google/genai";
import type { VerificationResult } from "../types";

const verificationSchema = {
    type: Type.OBJECT,
    properties: {
        studentNameCheck: {
            type: Type.OBJECT,
            properties: {
                verified: { type: Type.BOOLEAN },
                feedback: { type: Type.STRING },
            },
            required: ['verified', 'feedback'],
            propertyOrdering: ['verified', 'feedback'],
        },
        universityInfoCheck: {
            type: Type.OBJECT,
            properties: {
                verified: { type: Type.BOOLEAN },
                feedback: { type: Type.STRING },
            },
            required: ['verified', 'feedback'],
            propertyOrdering: ['verified', 'feedback'],
        },
        dateCheck: {
            type: Type.OBJECT,
            properties: {
                verified: { type: Type.BOOLEAN },
                feedback: { type: Type.STRING },
            },
            required: ['verified', 'feedback'],
            propertyOrdering: ['verified', 'feedback'],
        },
    },
    required: ['studentNameCheck', 'universityInfoCheck', 'dateCheck'],
    propertyOrdering: ['studentNameCheck', 'universityInfoCheck', 'dateCheck'],
};


export const verifyReceipt = async (imageBase64: string): Promise<VerificationResult> => {
    // Correct initialization per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
    const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD format

    const prompt = `Analyze this university tuition fee receipt. Verify these conditions and respond in JSON format according to the provided schema.
1.  **Student Name**: Is a plausible full name for a student present?
2.  **University Info**: Is a university/college name or logo clearly visible?
3.  **Valid Date**: Is there a date on the receipt (e.g., receipt date, due date) that is within the current academic year or no more than 90 days from today's date (${today})?

For each condition, provide a 'verified' boolean and brief 'feedback' text explaining your reasoning.`;
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: {
                parts: [
                    {
                        inlineData: {
                            mimeType: "image/jpeg",
                            data: imageBase64,
                        },
                    },
                    { text: prompt },
                ],
            },
            config: {
                responseMimeType: "application/json",
                responseSchema: verificationSchema,
            },
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as VerificationResult;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get verification from AI service.");
    }
};