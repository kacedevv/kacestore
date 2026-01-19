import { GoogleGenAI } from "@google/genai";

export const getGeminiResponse = async (userMessage: string) => {
  if (!process.env.API_KEY) return "Xin lỗi, tôi chưa sẵn sàng. Hãy liên hệ Zalo 0916.88.22.78.";

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: `
          Bạn là trợ lý ảo siêu tốc của Kace Premium Store. 
          QUY TẮC PHẢN HỒI:
          - Trả lời CỰC KỲ NGẮN GỌN (tối đa 2 câu), đi thẳng vào trọng tâm.
          - LIÊN HỆ/HỖ TRỢ: Gửi link Zalo: https://zalo.me/0916882278.
          - NHÓM/COMMUNITY/GR/BOX/CỘNG ĐỒNG: Gửi link Zalo Group: https://zalo.me/g/ywfbuq251 kèm lời mời thân mật.
          - Sản phẩm: ChatGPT (~150k), Netflix (~75k), Spotify (~35k). 
          - Bảo hành: 1 đổi 1 suốt thời gian sử dụng (TUYỆT ĐỐI KHÔNG DÙNG TỪ "TRỌN ĐỜI").
          - Ngôn ngữ: Tiếng Việt, chuyên nghiệp, lịch sự.
        `,
        temperature: 0.2, // Lower temperature for more focused, concise answers
      },
    });

    return response.text || "Tôi có thể giúp gì cho bạn về tài khoản Premium không?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Đã có lỗi. Hãy liên hệ Zalo 0916.88.22.78 để được hỗ trợ tức thì!";
  }
};