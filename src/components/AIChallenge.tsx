import { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button } from './ui/button';
import { Loader2, Zap, Heart, Award, RefreshCcw, XCircle, ChevronLeft, AlertCircle } from 'lucide-react';

// Khởi tạo Gemini
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

interface Question {
    question: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
}

type AICharacter = 'marx' | 'lenin';

const AIChallenge: React.FC<{ onBack: () => void; }> = ({ onBack }) => {
    const [character, setCharacter] = useState<AICharacter | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [userScore, setUserScore] = useState(0);
    const [aiHP, setAiHP] = useState(100);
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
    const [isGameOver, setIsGameOver] = useState(false);
    const [challengeStatus, setChallengeStatus] = useState<'selecting' | 'playing' | 'ended'>('selecting');
    const [error, setError] = useState<string | null>(null);

    const CHARACTER_PROMPTS = {
        marx: "Bạn là Karl Marx trong một cuộc thách đấu tri thức về Triết học Mác-Lênin. Hãy đặt câu hỏi trắc nghiệm khách quan, ngắn gọn, chỉ có 4 lựa chọn (A, B, C, D) và kèm theo giải thích khi trả lời. Mỗi lần chỉ đặt một câu hỏi. Câu hỏi phải chuyên sâu về duy vật biện chứng, duy vật lịch sử, giá trị thặng dư.",
        lenin: "Bạn là V.I. Lenin trong một cuộc thách đấu tri thức về Triết học Mác-Lênin. Hãy đặt câu hỏi trắc nghiệm khách quan, ngắn gọn, chỉ có 4 lựa chọn (A, B, C, D) và kèm theo giải thích khi trả lời. Mỗi lần chỉ đặt một câu hỏi. Câu hỏi phải chuyên sâu về lý luận về Đảng kiểu mới, chuyên chính vô sản, cách mạng vô sản.",
    };

    const parseAIResponse = (text: string): Question | null => {
        try {
            console.log("AI Response:", text); // Debug log

            // Tìm câu hỏi - linh hoạt hơn
            const questionMatch = text.match(/(?:Câu hỏi|Question)[:\s]*(.+?)(?=\n[A-D]\.|\nA\))/is);

            // Tìm các options - hỗ trợ cả dấu . và )
            const optionMatches = [
                text.match(/A[.)\s]+(.+?)(?=\n[B-D]|Đáp án|$)/is),
                text.match(/B[.)\s]+(.+?)(?=\n[C-D]|Đáp án|$)/is),
                text.match(/C[.)\s]+(.+?)(?=\nD|Đáp án|$)/is),
                text.match(/D[.)\s]+(.+?)(?=\nĐáp án|Giải thích|$)/is),
            ];

            // Tìm đáp án đúng - linh hoạt hơn
            const correctAnswerMatch = text.match(/(?:Đáp án đúng|Correct Answer)[:\s]*([A-D])/i);

            // Tìm giải thích
            const explanationMatch = text.match(/(?:Giải thích|Explanation)[:\s]*(.+?)$/is);

            // Validate
            if (!questionMatch || !optionMatches.every(m => m) || !correctAnswerMatch) {
                console.error("Parsing failed:", {
                    hasQuestion: !!questionMatch,
                    optionsFound: optionMatches.filter(m => m).length,
                    hasCorrectAnswer: !!correctAnswerMatch
                });
                return null;
            }

            const options = optionMatches.map(m => m![1].trim());
            const correctIndex = correctAnswerMatch[1].toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);

            return {
                question: questionMatch[1].trim(),
                options: options,
                correctAnswerIndex: correctIndex,
                explanation: explanationMatch ? explanationMatch[1].trim() : "Không có giải thích.",
            };
        } catch (err) {
            console.error("Parse error:", err);
            return null;
        }
    };

    const getNewQuestion = async (selectedCharacter: AICharacter) => {
        setIsLoading(true);
        setFeedback(null);
        setSelectedOptionIndex(null);
        setError(null);

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
            const systemInstruction = CHARACTER_PROMPTS[selectedCharacter];

            const prompt = `${systemInstruction}

BẮT BUỘC phải tuân thủ định dạng sau CHÍNH XÁC:

Câu hỏi: [Nội dung câu hỏi ở đây]
A. [Lựa chọn thứ nhất]
B. [Lựa chọn thứ hai]
C. [Lựa chọn thứ ba]
D. [Lựa chọn thứ tư]
Đáp án đúng: [A hoặc B hoặc C hoặc D]
Giải thích: [Giải thích ngắn gọn]

Ví dụ cụ thể:
Câu hỏi: Phạm trù nào là cơ sở của quy luật phủ định của phủ định?
A. Khẳng định
B. Phủ định biện chứng
C. Phủ định siêu hình
D. Khẳng định tuyệt đối
Đáp án đúng: B
Giải thích: Phủ định biện chứng là sự phủ định có kế thừa, tạo cơ sở cho sự phát triển theo hình xoắn ốc.`;

            const result = await model.generateContent(prompt);
            const text = result.response.text();

            const parsedQuestion = parseAIResponse(text);

            if (parsedQuestion) {
                setCurrentQuestion(parsedQuestion);
                setError(null);
            } else {
                setError("AI không thể tạo câu hỏi đúng định dạng. Đang thử lại...");
                // Tự động thử lại sau 2 giây
                setTimeout(() => getNewQuestion(selectedCharacter), 2000);
            }

        } catch (error) {
            console.error("Lỗi khi tạo câu hỏi từ AI:", error);
            setError("Lỗi kết nối API. Vui lòng kiểm tra API key và thử lại.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectCharacter = (char: AICharacter) => {
        setCharacter(char);
        setChallengeStatus('playing');
        getNewQuestion(char);
    };

    const handleSubmitAnswer = (selectedIndex: number) => {
        if (!currentQuestion || selectedOptionIndex !== null) return;

        setSelectedOptionIndex(selectedIndex);

        const isCorrect = selectedIndex === currentQuestion.correctAnswerIndex;

        if (isCorrect) {
            setUserScore(prev => prev + 10);
            setAiHP(prev => Math.max(0, prev - 15));
            setFeedback("✅ Chính xác! " + currentQuestion.explanation);
        } else {
            setFeedback(`❌ Sai rồi. Đáp án đúng là ${String.fromCharCode(65 + currentQuestion.correctAnswerIndex)}: ${currentQuestion.options[currentQuestion.correctAnswerIndex]}. ${currentQuestion.explanation}`);
        }

        if (aiHP <= 15) {
            setTimeout(() => {
                setChallengeStatus('ended');
                setIsGameOver(true);
            }, 2000);
        } else {
            setTimeout(() => {
                getNewQuestion(character!);
            }, 3000);
        }
    };

    const resetChallenge = () => {
        setCharacter(null);
        setCurrentQuestion(null);
        setUserScore(0);
        setAiHP(100);
        setIsLoading(false);
        setFeedback(null);
        setSelectedOptionIndex(null);
        setIsGameOver(false);
        setChallengeStatus('selecting');
        setError(null);
    };

    useEffect(() => {
        if (aiHP <= 0 && challengeStatus === 'playing') {
            setChallengeStatus('ended');
            setIsGameOver(true);
        }
    }, [aiHP, challengeStatus]);

    const renderChallengeScreen = () => {
        if (challengeStatus === 'selecting') {
            return (
                <div className="flex flex-col items-center justify-center h-full space-y-6 p-6">
                    <h2 className="text-2xl font-bold text-slate-800">Chọn đối thủ của bạn:</h2>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            onClick={() => handleSelectCharacter('marx')}
                            className="bg-red-700 hover:bg-red-800 text-white font-bold py-6 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-red-900 flex items-center justify-center text-2xl">
                                    👨‍🦳
                                </div>
                                <span>Đấu với Karl Marx</span>
                            </div>
                        </Button>
                        <Button
                            onClick={() => handleSelectCharacter('lenin')}
                            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-6 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-orange-800 flex items-center justify-center text-2xl">
                                    👨‍💼
                                </div>
                                <span>Đấu với V.I. Lenin</span>
                            </div>
                        </Button>
                    </div>
                    <p className="text-sm text-gray-600 mt-4 italic">Hãy chuẩn bị tinh thần cho trận đấu trí gay cấn!</p>
                </div>
            );
        }

        if (challengeStatus === 'ended') {
            return (
                <div className="flex flex-col items-center justify-center h-full space-y-6 text-center p-6">
                    <Award className="w-24 h-24 text-yellow-500 animate-bounce" />
                    <h2 className="text-3xl font-bold text-slate-800">
                        {aiHP <= 0 ? `Chiến thắng rực rỡ! Bạn đã đánh bại ${character === 'marx' ? 'Karl Marx' : 'V.I. Lenin'}!` : 'Thử thách kết thúc!'}
                    </h2>
                    <p className="text-xl text-gray-700">Điểm số của bạn: <span className="font-bold text-yellow-600">{userScore}</span></p>
                    <div className="flex gap-4">
                        <Button onClick={resetChallenge} className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300">
                            <RefreshCcw className="mr-2" /> Chơi lại
                        </Button>
                        <Button onClick={onBack} variant="secondary" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300">
                            <ChevronLeft className="mr-2" /> Về trang chủ
                        </Button>
                    </div>
                </div>
            );
        }

        // Đang chơi
        return (
            <div className="flex flex-col h-full p-6 bg-gradient-to-b from-amber-50 to-white">
                <div className="flex justify-between items-center mb-6 border-b pb-4 border-yellow-200">
                    <Button onClick={onBack} variant="ghost" className="text-slate-700 hover:text-yellow-600">
                        <ChevronLeft className="mr-2" /> Quay lại
                    </Button>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center text-slate-800 font-bold">
                            <Heart className="text-red-500 mr-1" /> AI HP: {aiHP}
                            <div className="w-24 h-3 bg-gray-300 rounded-full ml-2 overflow-hidden">
                                <div className="h-full bg-red-500 transition-all duration-500" style={{ width: `${aiHP}%` }}></div>
                            </div>
                        </div>
                        <div className="flex items-center text-slate-800 font-bold">
                            <Zap className="text-yellow-500 mr-1" /> Điểm: {userScore}
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                        <AlertCircle className="text-red-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-red-800">{error}</p>
                    </div>
                )}

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center flex-1 text-slate-700">
                        <Loader2 className="w-12 h-12 animate-spin text-yellow-600 mb-4" />
                        <p className="text-lg font-medium">Đang chuẩn bị câu hỏi từ {character === 'marx' ? 'Karl Marx' : 'V.I. Lenin'}...</p>
                    </div>
                ) : (
                    currentQuestion && (
                        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                            <h3 className="text-xl font-bold text-slate-900 mb-4 bg-yellow-100 p-4 rounded-lg shadow-sm border-l-4 border-yellow-600">
                                <span className="text-yellow-600">Câu hỏi:</span> {currentQuestion.question}
                            </h3>
                            <div className="space-y-3">
                                {currentQuestion.options.map((option, index) => (
                                    <Button
                                        key={index}
                                        onClick={() => handleSubmitAnswer(index)}
                                        disabled={selectedOptionIndex !== null || isLoading}
                                        className={`w-full text-left p-4 rounded-lg shadow-sm transition-all duration-200 
                                            ${selectedOptionIndex === null && "hover:bg-blue-100 hover:border-blue-300 border border-gray-200"}
                                            ${selectedOptionIndex !== null && index === currentQuestion.correctAnswerIndex && "bg-green-100 border-green-500 text-green-800 font-semibold"}
                                            ${selectedOptionIndex !== null && index === selectedOptionIndex && index !== currentQuestion.correctAnswerIndex && "bg-red-100 border-red-500 text-red-800 font-semibold"}
                                            ${selectedOptionIndex !== null && index !== currentQuestion.correctAnswerIndex && index !== selectedOptionIndex && "bg-gray-100 text-gray-500 opacity-70 cursor-not-allowed"}
                                            ${selectedOptionIndex === null ? "bg-white text-slate-800" : ""}
                                        `}
                                        variant="outline"
                                    >
                                        <span className="font-bold mr-2">{String.fromCharCode(65 + index)}.</span> {option}
                                    </Button>
                                ))}
                            </div>
                            {feedback && (
                                <div className={`mt-6 p-4 rounded-lg shadow-md ${selectedOptionIndex === currentQuestion.correctAnswerIndex ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} text-slate-800 border`}>
                                    <p className="font-semibold text-base mb-2">Kết quả:</p>
                                    <p className="text-sm">{feedback}</p>
                                </div>
                            )}
                        </div>
                    )
                )}
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-2xl h-[90vh] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white flex justify-between items-center shadow-md">
                    <h1 className="text-xl font-bold">
                        Thách đấu Tri thức {character ? `với ${character === 'marx' ? 'Karl Marx' : 'V.I. Lenin'}` : ''}
                    </h1>
                    <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:bg-white/20 rounded-full h-8 w-8">
                        <XCircle size={24} />
                    </Button>
                </div>
                <div className="flex-1 overflow-auto">
                    {renderChallengeScreen()}
                </div>
            </div>
        </div>
    );
};

export default AIChallenge;