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
        },
        universityInfoCheck: {
            type: Type.OBJECT,
            properties: {
                verified: { type: Type.BOOLEAN },
                feedback: { type: Type.STRING },
            },
            required: ['verified', 'feedback'],
        },
        dateCheck: {
            type: Type.OBJECT,
            properties: {
                verified: { type: Type.BOOLEAN },
                feedback: { type: Type.STRING },
            },
            required: ['verified', 'feedback'],
        },
    },
};


export const verifyReceipt = async (imageBase64: string): Promise<VerificationResult> => {
    // Initialize inside the function to prevent top-level access errors in browser environments
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
    const today = new Date().toLocaleDateString('en-CA');

    const prompt = `Analyze this university tuition fee receipt. Verify these conditions:
1. Student Name: Is a plausible full name for a student present?
2. University Info: Is a university/college name or logo clearly visible?
3. Valid Date: Is there a date on the receipt that is within the current academic year or no more than 90 days from today (${today})?

Respond in JSON format.`;
    
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
        
        return JSON.parse(response.text.trim()) as VerificationResult;
    } catch (error) {
        console.error("AI Service Error:", error);
        throw new Error("AI Verification failed.");
    }
};