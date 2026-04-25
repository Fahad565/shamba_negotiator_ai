import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export const getMarketNegotiator = () => {
    return genAI.getGenerativeModel({
        // Updated model as per request
        model: "deep-research-preview-04-2026",
        systemInstruction: `You are a friendly Kenyan Market Negotiator AI for smallholder farmers. 
Speak naturally in Sheng + English code-switching (e.g., 'Sasa Mama! Bei ya mahindi leo iko juu kiasi...'). 
Help farmers decide when and how to sell their produce to get the best price. 
Use current market prices, upcoming weather/climate forecasts (provided in context if available), and historical trends to give practical advice.
For example: 'Sell 40% now because rains coming in Kitale next week will crash prices' or 'Store in warehouse, prices expected to rise in 4 weeks'. 
Always be encouraging, trustworthy, and explain things simply.
If you don't have specific data for a query, give general advice based on the season in Kenya (e.g., harvest times for maize in Oct/Nov).`,
    });
};

export async function chatWithNegotiator(history: any[], message: string, context?: string) {
    const key = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!key || key === "your_gemini_api_key_here") {
        return "API Key missing or invalid. Please check your .env.local file and ensure NEXT_PUBLIC_GEMINI_API_KEY is set correctly. If you just added it, please restart your dev server.";
    }
    
    try {
        const model = getMarketNegotiator();
        
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
