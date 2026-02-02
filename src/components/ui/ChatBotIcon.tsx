import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const ChatBotIcon = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-full w-14 h-14 shadow-lg bg-gold hover:bg-gold/90"
            >
                {isOpen ? <X /> : <MessageCircle />}
            </Button>

            {isOpen && (
                <div className="absolute bottom-16 right-0 w-80 h-[450px] parchment-card shadow-2xl rounded-xl overflow-hidden border border-gold/20">
                    {/* Nội dung khung chat của bạn ở đây */}
                    <div className="p-4 bg-gold text-white font-heading">Trợ lý Triết học</div>
                    <div className="h-full overflow-y-auto p-4 bg-background/50">
                        {/* Map tin nhắn chat ở đây */}
                    </div>
                </div>
            )}
        </div>
    );
};