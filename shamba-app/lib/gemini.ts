"use server"

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function chatWithNegotiator(history: any[], message: string, context?: string) {
    const key = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    
    if (!key || key === "your_gemini_api_key_here") {
        return "API Key missing or invalid. Please ensure GEMINI_API_KEY is set in your Cloud Run environment variables.";
    }

    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash", // Using a stable model for the demo
        systemInstruction: `You are a friendly Kenyan Market Negotiator AI for smallholder farmers. 
Speak naturally in Sheng + English code-switching (e.g., 'Sasa Mama! Bei ya mahindi leo iko juu kiasi...'). 
Help farmers decide when and how to sell their produce to get the best price. 
Use current market prices, upcoming weather/climate forecasts (provided in context if available), and historical trends to give practical advice.
Always be encouraging, trustworthy, and explain things simply.`,
    });
    try {
        
        // Add weather/location context to the message if available
        const augmentedMessage = context 
            ? `Context: ${context}\n\nUser Message: ${message}`
            : message;

        const chat = model.startChat({
            history: history.map(h => ({
                role: h.role === 'user' ? 'user' : 'model',
                parts: [{ text: h.content }],
            })),
        });

        const result = await chat.sendMessage(augmentedMessage);
        const response = await result.response;
        return response.text();
    } catch (error: any) {
        console.error("Gemini Error:", error);
        return `Noma! Some error occurred while talking to the AI: ${error.message}`;
    }
}
