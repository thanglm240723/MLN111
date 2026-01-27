import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { HelpCircle, CheckCircle, XCircle, RotateCcw, Trophy, ArrowRight, ArrowLeft, Filter } from 'lucide-react';
import { questions, STORAGE_KEY, type Question } from '@/data/quiz-data';

interface QuizState {
  currentQuestion: number;
  answers: (number | null)[];
  isComplete: boolean;
  score: number;
}

export default function QuizPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredQuestions = selectedCategory
    ? questions.filter(q => q.category === selectedCategory)
    : questions;

  const categories = [...new Set(questions.map(q => q.category).filter(Boolean))];

  const [state, setState] = useState<QuizState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Reset if question count changed
        if (parsed.answers?.length !== questions.length) {
          return {
            currentQuestion: 0,
            answers: Array(questions.length).fill(null),
            isComplete: false,
            score: 0,
          };
        }
        return parsed;
      } catch {
        return {
          currentQuestion: 0,
          answers: Array(questions.length).fill(null),
          isComplete: false,
          score: 0,
        };
      }
    }
    return {
      currentQuestion: 0,
      answers: Array(questions.length).fill(null),
      isComplete: false,
      score: 0,
    };
  });

  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Get current question from filtered list
  const currentQIndex = Math.min(state.currentQuestion, filteredQuestions.length - 1);
  const currentQ = filteredQuestions[currentQIndex];
  const originalIndex = currentQ ? questions.findIndex(q => q.id === currentQ.id) : 0;
  const hasAnswered = state.answers[originalIndex] !== null;

  const handleSelectOption = (optionIndex: number) => {
    if (hasAnswered) return;
    setSelectedOption(optionIndex);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null || !currentQ) return;

    const newAnswers = [...state.answers];
    newAnswers[originalIndex] = selectedOption;

    const isCorrect = selectedOption === currentQ.correctAnswer;
    const newScore = isCorrect ? state.score + 1 : state.score;

    setState((prev) => ({
      ...prev,
      answers: newAnswers,
      score: newScore,
    }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (state.currentQuestion < filteredQuestions.length - 1) {
      setState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
      }));
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setState((prev) => ({
        ...prev,
        isComplete: true,
      }));
    }
  };

  const handlePrev = () => {
    if (state.currentQuestion > 0) {
      setState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1,
      }));
      setSelectedOption(null);
      setShowExplanation(false);
    }
  };

  const handleReset = () => {
    setState({
      currentQuestion: 0,
      answers: Array(questions.length).fill(null),
      isComplete: false,
      score: 0,
    });
    setSelectedOption(null);
    setShowExplanation(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  const getOptionClass = (optionIndex: number) => {
    const isAnswered = state.answers[originalIndex] !== null;
    const isSelected = selectedOption === optionIndex;
    const wasSelected = state.answers[originalIndex] === optionIndex;
    const isCorrect = currentQ && optionIndex === currentQ.correctAnswer;

    if (isAnswered) {
      if (isCorrect) return 'quiz-option correct';
      if (wasSelected && !isCorrect) return 'quiz-option incorrect';
      return 'quiz-option opacity-50';
    }

    if (isSelected) return 'quiz-option selected';
    return 'quiz-option';
  };

  // Calculate score for filtered questions only
  const filteredScore = filteredQuestions.reduce((acc, q) => {
    const idx = questions.findIndex(oq => oq.id === q.id);
    if (state.answers[idx] === q.correctAnswer) return acc + 1;
    return acc;
  }, 0);

  const answeredCount = filteredQuestions.filter(q => {
    const idx = questions.findIndex(oq => oq.id === q.id);
    return state.answers[idx] !== null;
  }).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="ornate-divider mb-8">
              <HelpCircle className="h-8 w-8 text-gold" />
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-gold-gradient mb-4">
              Trắc nghiệm ôn tập
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Kiểm tra kiến thức của bạn với {questions.length} câu hỏi trắc nghiệm về Triết học Mác-Lênin.
              Nội dung dựa trên Giáo trình Triết học Mác - Lênin (Bộ GD&ĐT, 2021).
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto mb-8"
          >
            <div className="flex items-center gap-2 mb-3">
              <Filter className="h-4 w-4 text-gold" />
              <span className="text-sm text-muted-foreground">Lọc theo chủ đề:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setState(prev => ({ ...prev, currentQuestion: 0 }));
                  setSelectedOption(null);
                  setShowExplanation(false);
                }}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  selectedCategory === null
                    ? 'bg-gold text-primary-foreground'
                    : 'bg-muted hover:bg-gold/20 text-muted-foreground'
                }`}
              >
                Tất cả ({questions.length})
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category || null);
                    setState(prev => ({ ...prev, currentQuestion: 0 }));
                    setSelectedOption(null);
                    setShowExplanation(false);
                  }}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                    selectedCategory === category
                      ? 'bg-gold text-primary-foreground'
                      : 'bg-muted hover:bg-gold/20 text-muted-foreground'
                  }`}
                >
                  {category} ({questions.filter(q => q.category === category).length})
                </button>
              ))}
            </div>
          </motion.div>

          {/* Progress Bar */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Tiến độ {selectedCategory ? `(${selectedCategory})` : ''}</span>
              <span>
                {answeredCount} / {filteredQuestions.length} câu
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${(answeredCount / filteredQuestions.length) * 100}%`,
                }}
                className="h-full bg-gold rounded-full"
              />
            </div>
          </div>

          {state.isComplete ? (
            /* Results Screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="parchment-card p-12 rounded-xl">
                <Trophy className="h-20 w-20 text-gold mx-auto mb-6" />
                <h2 className="text-3xl font-heading font-bold mb-4">
                  Hoàn thành!
                </h2>
                <p className="text-xl mb-2">Điểm số của bạn:</p>
                <p className="text-6xl font-heading font-bold text-gold mb-4">
                  {filteredScore}/{filteredQuestions.length}
                </p>
                <p className="text-muted-foreground mb-8">
                  {filteredScore >= filteredQuestions.length * 0.8
                    ? 'Xuất sắc! Bạn đã nắm vững kiến thức cơ bản về Triết học Mác-Lênin.'
                    : filteredScore >= filteredQuestions.length * 0.5
                    ? 'Khá tốt! Hãy ôn lại một số phần còn yếu.'
                    : 'Cần cố gắng hơn! Hãy xem lại nội dung lý thuyết.'}
                </p>
                <Button variant="classical" size="xl" onClick={handleReset}>
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Làm lại
                </Button>
              </div>
            </motion.div>
          ) : currentQ ? (
            /* Question Card */
            <motion.div
              key={currentQ.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-3xl mx-auto"
            >
              <div className="parchment-card p-8 rounded-xl">
                {/* Question Number & Category */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-gold font-heading text-lg">
                      Câu {state.currentQuestion + 1} / {filteredQuestions.length}
                    </span>
                    {currentQ.category && (
                      <span className="ml-3 px-2 py-0.5 bg-gold/10 text-gold text-xs rounded-full">
                        {currentQ.category}
                      </span>
                    )}
                  </div>
                  <span className="text-muted-foreground text-sm">
                    Điểm: {filteredScore}
                  </span>
                </div>

                {/* Question */}
                <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-8">
                  {currentQ.question}
                </h2>

                {/* Options */}
                <div className="space-y-3 mb-8">
                  {currentQ.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectOption(index)}
                      disabled={hasAnswered}
                      className={`w-full text-left p-4 rounded-lg flex items-start gap-3 ${getOptionClass(index)}`}
                    >
                      <span className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-sm font-semibold">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1 pt-1">{option}</span>
                      {hasAnswered && index === currentQ.correctAnswer && (
                        <CheckCircle className="h-6 w-6 text-accent flex-shrink-0" />
                      )}
                      {hasAnswered &&
                        state.answers[originalIndex] === index &&
                        index !== currentQ.correctAnswer && (
                          <XCircle className="h-6 w-6 text-destructive flex-shrink-0" />
                        )}
                    </button>
                  ))}
                </div>

                {/* Explanation */}
                <AnimatePresence>
                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-8"
                    >
                      <div className="p-4 bg-gold/5 border border-gold/20 rounded-lg">
                        <h4 className="font-heading font-semibold text-gold mb-2">
                          Giải thích:
                        </h4>
                        <p className="text-muted-foreground">
                          {currentQ.explanation}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <Button
                    variant="marble"
                    onClick={handlePrev}
                    disabled={state.currentQuestion === 0}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Câu trước
                  </Button>

                  <div className="flex gap-3">
                    {!hasAnswered ? (
                      <Button
                        variant="classical"
                        onClick={handleConfirmAnswer}
                        disabled={selectedOption === null}
                      >
                        Xác nhận
                      </Button>
                    ) : (
                      <Button variant="classical" onClick={handleNext}>
                        {state.currentQuestion < filteredQuestions.length - 1
                          ? 'Câu tiếp'
                          : 'Xem kết quả'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Question Navigation Dots */}
              <div className="flex flex-wrap justify-center gap-2 mt-8">
                {filteredQuestions.map((q, index) => {
                  const qOriginalIndex = questions.findIndex(oq => oq.id === q.id);
                  const isAnswered = state.answers[qOriginalIndex] !== null;
                  const isCorrect = state.answers[qOriginalIndex] === q.correctAnswer;
                  
                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setState((prev) => ({ ...prev, currentQuestion: index }));
                        setSelectedOption(null);
                        setShowExplanation(false);
                      }}
                      className={`w-8 h-8 rounded-full text-xs font-semibold transition-all ${
                        index === state.currentQuestion
                          ? 'bg-gold text-primary-foreground'
                          : isAnswered
                          ? isCorrect
                            ? 'bg-accent/20 text-accent border border-accent/30'
                            : 'bg-destructive/20 text-destructive border border-destructive/30'
                          : 'bg-muted text-muted-foreground hover:bg-gold/20'
                      }`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  );
}
