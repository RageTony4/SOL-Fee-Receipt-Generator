import type { VerificationResult } from "../types";

// Service has been disabled to remove API key dependency.
export const verifyReceipt = async (imageBase64: string): Promise<VerificationResult | null> => {
    console.warn("AI Verification service is disabled.");
    return null;
};
