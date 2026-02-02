import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MessageCircle, Send, X, Loader2, AlertCircle } from 'lucide-react';

// Sử dụng biến môi trường (khuyến nghị) thay vì hard-code API key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    async function handleChat() {
        if (!input.trim()) return;

        const userMessage = { role: "user", text: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput("");
        setIsLoading(true);

        try {
            // Danh sách model thử theo thứ tự ưu tiên (có thể thêm gemini-1.5-pro, gemini-1.5-flash sau khi test ổn định)
            const modelNames = ["gemini-1.5-flash", "gemini-2.5-flash"];

            let result = null;
            let lastError = null;

            for (const modelName of modelNames) {
                try {
                    console.log(`Đang thử model: ${modelName}`);

                    const model = genAI.getGenerativeModel({ model: modelName });

                    const promptWithContext = `Bạn là chuyên gia Triết học Mác-Lênin. Hãy trả lời ngắn gọn, dễ hiểu cho sinh viên.

Câu hỏi: ${input}`;

                    result = await model.generateContent(promptWithContext);
                    console.log(`✅ Model ${modelName} hoạt động!`);
                    break;
                } catch (error) {
                    console.log(`❌ Model ${modelName} thất bại:`, error);
                    lastError = error;
                    continue;
                }
            }

            if (!result) {
                throw lastError || new Error("Không thể kết nối với bất kỳ model nào");
            }

            const response = await result.response;
            const text = response.text();

            setMessages([...newMessages, { role: "ai", text }]);
        } catch (error: any) {
            console.error("Lỗi chi tiết:", error);

            let errorMessage = "Xin lỗi, đã có lỗi xảy ra. ";

            if (error?.message?.includes("API_KEY_INVALID") || error?.message?.includes("invalid")) {
                errorMessage += "API Key không hợp lệ. Vui lòng kiểm tra file .env và biến VITE_GEMINI_API_KEY.";
            } else if (error?.message?.includes("PERMISSION_DENIED")) {
                errorMessage += "Không có quyền truy cập. Vui lòng bật Generative Language API trong Google Cloud Console.";
            } else if (error?.message?.includes("RESOURCE_EXHAUSTED") || error?.message?.includes("quota")) {
                errorMessage += "Đã vượt quá giới hạn quota. Vui lòng thử lại sau hoặc nâng cấp plan.";
            } else if (error?.message?.includes("not found") || error?.message?.includes("does not exist")) {
                errorMessage += "Model không tồn tại hoặc chưa hỗ trợ ở khu vực của bạn.";
            } else {
                errorMessage += error.message || "Vui lòng thử lại sau.";
            }

            setMessages([
                ...newMessages,
                {
                    role: "error",
                    text: errorMessage,
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleChat();
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Nút toggle */}
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-full w-14 h-14 shadow-lg bg-gold hover:bg-gold/90 transition-all duration-300"
                size="icon"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </Button>

            {/* Cửa sổ chat */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-96 h-[500px] parchment-card shadow-2xl rounded-xl overflow-hidden border border-gold/20 animate-in slide-in-from-bottom-5 duration-300">
                    {/* Header */}
                    <div className="p-4 bg-gold text-white font-heading flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <MessageCircle size={20} />
                            <span className="font-bold">Trợ lý Triết học</span>
                        </div>
                    </div>

                    {/* Khu vực tin nhắn */}
                    <div className="h-[calc(100%-140px)] overflow-y-auto p-4 bg-background/50 space-y-3">
                        {messages.length === 0 && (
                            <div className="text-center text-muted-foreground mt-8">
                                <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">Xin chào! Tôi là trợ lý Triết học.</p>
                                <p className="text-xs mt-1">Hãy hỏi tôi bất cứ điều gì về Triết học Mác-Lênin!</p>
                            </div>
                        )}

                        {messages.map((m, i) => (
                            <div
                                key={i}
                                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-lg text-sm ${m.role === "user"
                                            ? "bg-gold text-white rounded-br-none"
                                            : m.role === "error"
                                                ? "bg-red-100 text-red-800 border border-red-300 rounded-bl-none"
                                                : "bg-muted text-foreground rounded-bl-none"
                                        }`}
                                >
                                    {m.role === "error" && (
                                        <AlertCircle className="w-4 h-4 inline mr-2" />
                                    )}
                                    <p className="whitespace-pre-wrap">{m.text}</p>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-muted p-3 rounded-lg rounded-bl-none">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Khu vực nhập */}
                    <div className="p-4 bg-background border-t border-gold/10">
                        <div className="flex gap-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Hỏi về triết học..."
                                disabled={isLoading}
                                className="flex-1"
                            />
                            <Button
                                onClick={handleChat}
                                size="icon"
                                className="bg-gold hover:bg-gold/90"
                                disabled={isLoading || !input.trim()}
                            >
                                <Send size={16} />
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}