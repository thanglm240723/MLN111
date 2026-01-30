import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MessageSquare, Send } from 'lucide-react';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export function AIChatbot() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<{ role: string, text: string }[]>([]);

    async function handleChat() {
        if (!input) return;

        // Thêm tin nhắn của người dùng vào màn hình
        const newMessages = [...messages, { role: "user", text: input }];
        setMessages(newMessages);
        setInput("");

        try {
            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash-latest",
                // Ép AI chỉ trả lời về Triết học
                systemInstruction: "Bạn là chuyên gia Triết học Mác-Lênin. Hãy trả lời ngắn gọn, dễ hiểu cho sinh viên."
            });

            const result = await model.generateContent(input);
            const response = await result.response;

            setMessages([...newMessages, { role: "ai", text: response.text() }]);
        } catch (error) {
            console.error("Lỗi gọi AI:", error);
        }
    }

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* Giao diện khung chat có thể dùng Dialog hoặc Popover của shadcn/ui bạn đã có */}
            <div className="parchment-card p-4 w-80 rounded-xl shadow-2xl">
                <h3 className="font-heading font-bold text-gold flex items-center gap-2 mb-3">
                    <MessageSquare size={18} /> Trợ lý Triết học
                </h3>
                <div className="h-64 overflow-y-auto mb-4 space-y-2 text-sm">
                    {messages.map((m, i) => (
                        <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                            <span className={`inline-block p-2 rounded-lg ${m.role === 'user' ? 'bg-gold/20' : 'bg-muted'}`}>
                                {m.text}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="flex gap-2">
                    <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Hỏi về vật chất, ý thức..." />
                    <Button onClick={handleChat} size="icon" variant="gold"><Send size={16} /></Button>
                </div>
            </div>
        </div>
    );
}