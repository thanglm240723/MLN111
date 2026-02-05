import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MessageCircle, Send, X, Loader2, Quote, Zap } from 'lucide-react';
import AIChallenge from './AIChallenge'; // Đảm bảo bạn đã tạo file này

// Khởi tạo Gemini với API Key từ môi trường
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

type Personality = 'marx' | 'lenin' | 'default';

export function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [showChallenge, setShowChallenge] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<{ role: string; text: string; personality?: Personality }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [personality, setPersonality] = useState<Personality>('marx');
    const scrollRef = useRef<HTMLDivElement>(null);

    // Tự động cuộn xuống khi có tin nhắn mới
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const personalityConfig = {
        marx: {
            name: "Karl Marx",
            prompt: "Bạn là Karl Marx. Hãy trả lời bằng phong cách của một nhà triết học, tập trung vào phân tích giá trị thặng dư, đấu tranh giai cấp, duy vật biện chứng. Ngôn ngữ mang tính học thuật nhưng đầy nhiệt huyết cách mạng. Luôn xưng là 'Tôi'.",
            color: "bg-red-700",
            greeting: "Vô sản tất cả các nước, đoàn kết lại! Đồng chí muốn phân tích gì về quy luật vận động của xã hội hôm nay?"
        },
        lenin: {
            name: "V.I. Lenin",
            prompt: "Bạn là V.I. Lenin. Hãy trả lời bằng phong cách của một nhà lãnh đạo thực tiễn, tập trung vào lý luận về Đảng kiểu mới, chuyên chính vô sản và thực tiễn cách mạng. Ngôn ngữ mạnh mẽ, quyết đoán. Luôn xưng là 'Tôi'.",
            color: "bg-orange-600",
            greeting: "Học, học nữa, học mãi! Tôi có thể giúp gì cho đồng chí về lý luận và thực tiễn cách mạng?"
        },
        default: {
            name: "Trợ lý",
            prompt: "Bạn là chuyên gia Triết học Mác-Lênin. Hãy trả lời ngắn gọn, dễ hiểu cho sinh viên.",
            color: "bg-gold",
            greeting: "Xin chào! Tôi là trợ lý Triết học. Bạn cần tìm hiểu thông tin gì về môn học này?"
        }
    };

    async function handleChat() {
        if (!input.trim()) return;

        const userMessage = { role: "user", text: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        const currentInput = input;
        setInput("");
        setIsLoading(true);

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
            const systemInstruction = personalityConfig[personality].prompt;
            const promptWithContext = `${systemInstruction}\n\nCâu hỏi của sinh viên: ${currentInput}`;

            const result = await model.generateContent(promptWithContext);
            const response = await result.response;
            const text = response.text();

            setMessages([...newMessages, { role: "ai", text, personality }]);
        } catch (error: any) {
            console.error("Lỗi Chatbot:", error);
            setMessages([
                ...newMessages,
                { role: "error", text: "Lỗi kết nối API. Vui lòng kiểm tra lại cấu hình." },
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
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            {/* Nút Thách đấu AI (Nằm trên nút chat chính) */}
            {!isOpen && (
                <div className="flex flex-col items-center gap-1 group animate-in fade-in slide-in-from-bottom-2">
                    <Button
                        onClick={() => setShowChallenge(true)}
                        className="rounded-full w-12 h-12 bg-emerald-600 hover:bg-emerald-700 shadow-lg transition-transform hover:scale-110"
                        size="icon"
                    >
                        <Zap className="w-6 h-6 text-white fill-white" />
                    </Button>
                    <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        Thách đấu
                    </span>
                </div>
            )}

            {/* Cửa sổ chat chính */}
            {isOpen && (
                <div className="mb-2 w-96 h-[550px] parchment-card shadow-2xl rounded-xl overflow-hidden border border-gold/20 flex flex-col animate-in slide-in-from-bottom-5 duration-300">
                    {/* Header */}
                    <div className={`p-4 ${personalityConfig[personality].color} text-white font-heading flex items-center justify-between shadow-md`}>
                        <div className="flex items-center gap-2">
                            <Quote size={18} />
                            <span className="font-bold tracking-tight">Đàm đạo cùng {personalityConfig[personality].name}</span>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 rounded-full h-8 w-8">
                            <X size={20} />
                        </Button>
                    </div>

                    {/* Tabs chọn nhân vật */}
                    <div className="flex border-b bg-muted/30">
                        {(['marx', 'lenin', 'default'] as Personality[]).map((p) => (
                            <button
                                key={p}
                                onClick={() => setPersonality(p)}
                                className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${personality === p
                                    ? `bg-white text-gold border-b-2 border-gold`
                                    : `text-muted-foreground hover:bg-white/50`
                                    }`}
                            >
                                {personalityConfig[p].name.split(' ').pop()}
                            </button>
                        ))}
                    </div>

                    {/* Nội dung chat */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 bg-background/50 space-y-4">
                        {messages.length === 0 && (
                            <div className="text-center mt-10 space-y-2 opacity-60">
                                <MessageCircle className="w-10 h-10 mx-auto text-gold/40" />
                                <p className="text-sm italic text-slate-700 px-6 font-medium">
                                    "{personalityConfig[personality].greeting}"
                                </p>
                            </div>
                        )}

                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${m.role === "user"
                                    ? "bg-gold text-white rounded-tr-none border border-gold"
                                    : "bg-white border border-gold/10 rounded-tl-none text-slate-900 font-medium"
                                    }`}>
                                    {m.role === "ai" && (
                                        <div className="text-[10px] uppercase tracking-widest font-black mb-1 text-gold">
                                            {personalityConfig[m.personality || 'default'].name}
                                        </div>
                                    )}
                                    <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gold/10 p-3 rounded-2xl rounded-tl-none shadow-sm">
                                    <Loader2 className="w-4 h-4 animate-spin text-gold" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Ô nhập liệu: NỀN VÀNG - CHỮ TRẮNG */}
                    <div className="p-4 bg-white border-t border-gold/10">
                        <div className="flex gap-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder={`Hỏi ${personalityConfig[personality].name}...`}
                                disabled={isLoading}
                                className="flex-1 rounded-full border-gold bg-gold text-white placeholder:text-white/70 focus-visible:ring-gold/50 font-medium"
                            />
                            <Button
                                onClick={handleChat}
                                size="icon"
                                className="bg-gold hover:bg-gold/90 text-white border border-white/20 rounded-full shadow-md shrink-0 transition-transform active:scale-90"
                                disabled={isLoading || !input.trim()}
                            >
                                <Send size={16} />
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Nút Chat chính */}
            <div className="flex flex-col items-center gap-1 group">
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`rounded-full w-14 h-14 shadow-2xl transition-all duration-300 hover:scale-110 ${isOpen ? 'bg-destructive shadow-red-200' : 'bg-gold shadow-gold/40'
                        }`}
                    size="icon"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6 animate-pulse" />}
                </Button>
                <span className="text-[10px] font-black text-gold uppercase tracking-[0.2em] opacity-90 drop-shadow-sm">
                    AI Assistant
                </span>
            </div>

            {/* Màn hình thách đấu (Overlay) */}
            {showChallenge && <AIChallenge onBack={() => setShowChallenge(false)} />}
        </div>
    );
}