import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { principles, keyConcepts, type Principle } from '@/data/principles-data';

function AccordionItem({ principle, isOpen, onToggle }: { 
  principle: Principle; 
  isOpen: boolean; 
  onToggle: () => void;
}) {
  const Icon = principle.icon;

  return (
    <div className="parchment-card rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-start gap-4 text-left transition-colors hover:bg-gold/5"
      >
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-gold" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-heading font-bold text-foreground mb-1">
            {principle.title}
          </h3>
          <p className="text-sm text-gold italic mb-2">
            {principle.englishTitle}
          </p>
          <p className="text-muted-foreground">
            {principle.description}
          </p>
        </div>
        <div className="flex-shrink-0 pt-2">
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-gold" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gold" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 border-t border-gold/10">
              <div className="pl-16 space-y-6">
                {principle.content.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h4 className="font-heading font-semibold text-gold mb-2">
                      {section.heading}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {section.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PrinciplesPage() {
  const [openItems, setOpenItems] = useState<string[]>([principles[0].id]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="ornate-divider mb-8">
              <BookOpen className="h-8 w-8 text-gold" />
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-gold-gradient mb-4">
              Nội dung lý thuyết
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nội dung được trích từ Giáo trình Triết học Mác - Lênin (Bộ Giáo dục và Đào tạo, 2021).
              Bao gồm các khái niệm cơ bản về triết học, chủ nghĩa duy vật biện chứng, 
              chủ nghĩa duy vật lịch sử và chủ nghĩa xã hội khoa học.
            </p>
          </motion.div>

          {/* Quick Overview Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16"
          >
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <button
                  key={principle.id}
                  onClick={() => toggleItem(principle.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    openItems.includes(principle.id)
                      ? 'border-gold bg-gold/5'
                      : 'border-gold/20 hover:border-gold/40'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-5 w-5 text-gold" />
                    <span className="text-gold font-heading font-semibold text-sm">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-sm mb-1 line-clamp-2">
                    {principle.title}
                  </h3>
                  <p className="text-xs text-gold italic line-clamp-1">
                    {principle.englishTitle}
                  </p>
                </button>
              );
            })}
          </motion.div>

          {/* Accordion */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4 max-w-4xl mx-auto"
          >
            {principles.map((principle) => (
              <AccordionItem
                key={principle.id}
                principle={principle}
                isOpen={openItems.includes(principle.id)}
                onToggle={() => toggleItem(principle.id)}
              />
            ))}
          </motion.div>

          {/* Key Concepts Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="ornate-divider mb-8">
              <span className="text-2xl">✦</span>
            </div>
            <h2 className="text-2xl font-heading font-bold text-center mb-12">
              Các khái niệm quan trọng
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {keyConcepts.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="p-5 parchment-card rounded-lg"
                >
                  <h4 className="font-heading font-semibold text-gold mb-2">
                    {item.term}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {item.definition}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Source Reference */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-sm text-muted-foreground italic">
              Nguồn: Giáo trình Triết học Mác - Lênin (Dành cho bậc đại học hệ không chuyên lý luận chính trị)
              <br />
              Nhà xuất bản Chính trị Quốc gia Sự thật, Hà Nội - 2021
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
