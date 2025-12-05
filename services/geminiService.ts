import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { PRODUCTS, FAQS } from '../constants';

const SYSTEM_INSTRUCTION = `
You are "Bot Support", an AI customer service agent for "KACE STORE". 
We sell premium digital accounts (Netflix, YouTube, Canva, Spotify, etc.).
Your goal is to help customers find products, explain warranties, and troubleshoot basic issues.

Key Information about the store:
1.  **Products**: We have Entertainment (Netflix, YouTube), Design (Canva, CapCut), Learning (Office 365, Grammarly), and Combos.
2.  **Product Data**: Here is a summary of our current popular products: ${PRODUCTS.map(p => `${p.name} (${p.price} VND)`).join(', ')}.
3.  **Warranty**: 1-to-1 exchange warranty for the full duration.
4.  **Delivery**: 5-15 minutes via Email/Zalo.
5.  **Usage**: We have both Private (Own account) and Shared (Cheaper) options.

Rules:
- Be polite, helpful, and concise.
- If a user asks for a price, quote the price from the data provided.
- If a user asks a technical question you don't know, suggest they contact the hotline/Zalo support.
- Reply in Vietnamese (since the store targets Vietnamese users) unless the user speaks English.
- Use emojis occasionally to be friendly.
`;

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = initializeChat();
    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text || "Xin lỗi, tôi đang gặp chút sự cố. Bạn vui lòng thử lại sau nhé.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Hệ thống đang bận, vui lòng liên hệ admin qua Zalo.";
  }
};