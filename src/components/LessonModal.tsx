import React, { useState } from 'react';
import { X, CheckCircle2, XCircle, Sparkles, ArrowRight, RotateCcw, Award } from 'lucide-react';
import { Lesson } from '../data/curriculum';

interface LessonModalProps {
  lesson: Lesson;
  moduleTitle: string;
  alreadyCompleted: boolean;
  onClose: () => void;
  onCompleteLesson: (lessonId: string, earnedXp: number) => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  lesson,
  moduleTitle,
  alreadyCompleted,
  onClose,
  onCompleteLesson,
}) => {
  const [step, setStep] = useState<'reading' | 'quiz' | 'result'>('reading');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const currentQuestion = lesson.quiz[currentQIndex];

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === currentQuestion.correctIndex) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex + 1 < lesson.quiz.length) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setStep('result');
    }
  };

  const handleRetryQuiz = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setCorrectCount(0);
    setStep('quiz');
  };

  const passedAll = correctCount === lesson.quiz.length;
  const totalEarnedXp = passedAll
    ? alreadyCompleted
      ? 10
      : lesson.xpReward + correctCount * 25
    : correctCount * 10;

  const handleFinish = () => {
    onCompleteLesson(lesson.id, totalEarnedXp);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#171D3D] border border-white/15 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#171D3D]/95 backdrop-blur border-b border-white/10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#22D3EE]">
              {moduleTitle} • {lesson.duration}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">{lesson.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#A5B4D8] hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Închide lecția"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {step === 'reading' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-[#0B1026]/80 border border-white/10">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#A78BFA] mb-2">
                  Ideea principală
                </h3>
                <p className="text-[#F8FAFC] leading-relaxed text-base">{lesson.summary}</p>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#22D3EE] mb-3">
                  Ce reții din lecția asta
                </h3>
                <ul className="space-y-3">
                  {lesson.keyTakeaways.map((point, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#0B1026]/50 border border-white/5"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#22D3EE] shrink-0 mt-0.5" />
                      <span className="text-sm text-[#F8FAFC]/90 leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#A5B4D8]">
                  <Sparkles className="w-4 h-4 text-[#FACC15]" />
                  <span>
                    Quiz rapid ({lesson.quiz.length}{' '}
                    {lesson.quiz.length === 1 ? 'întrebare' : 'întrebări'}) pentru XP
                  </span>
                </div>
                <button
                  onClick={() => setStep('quiz')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#4361EE] to-[#8B5CF6] text-white font-bold text-sm shadow-lg shadow-[#4361EE]/25 hover:opacity-95 transition-opacity"
                >
                  <span>Începe Quiz-ul</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 'quiz' && currentQuestion && (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs font-bold text-[#A5B4D8]">
                <span>
                  Întrebarea {currentQIndex + 1} din {lesson.quiz.length}
                </span>
                <span className="text-[#22D3EE]">+25 XP / răspuns corect</span>
              </div>

              <div className="w-full h-2 rounded-full bg-[#0B1026] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#4361EE] to-[#22D3EE] transition-all duration-300"
                  style={{ width: `${((currentQIndex + 1) / lesson.quiz.length) * 100}%` }}
                />
              </div>

              <h3 className="text-lg font-bold text-white leading-snug">
                {currentQuestion.question}
              </h3>

              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQuestion.correctIndex;

                  let cardStyle =
                    'bg-[#0B1026]/70 border-white/10 text-[#F8FAFC] hover:border-[#4361EE]/60';
                  if (isSubmitted) {
                    if (isCorrect) {
                      cardStyle = 'bg-emerald-500/15 border-emerald-400 text-white';
                    } else if (isSelected && !isCorrect) {
                      cardStyle = 'bg-[#EF6461]/15 border-[#EF6461] text-white';
                    } else {
                      cardStyle = 'bg-[#0B1026]/40 border-white/5 text-[#A5B4D8]';
                    }
                  } else if (isSelected) {
                    cardStyle = 'bg-[#4361EE]/20 border-[#4361EE] text-white';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isSubmitted}
                      onClick={() => setSelectedOption(idx)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${cardStyle}`}
                    >
                      <span className="text-sm font-medium leading-relaxed">{option}</span>
                      {isSubmitted && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {isSubmitted && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-[#EF6461] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {isSubmitted && (
                <div className="p-4 rounded-2xl bg-[#0B1026] border border-[#A78BFA]/30">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#A78BFA] mb-1">
                    Explicație
                  </p>
                  <p className="text-sm text-[#F8FAFC]/90 leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}

              <div className="flex justify-end pt-3 border-t border-white/10">
                {!isSubmitted ? (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={selectedOption === null}
                    className="px-5 py-3 rounded-xl bg-[#4361EE] disabled:opacity-40 text-white font-bold text-sm hover:bg-[#4361EE]/90 transition-colors"
                  >
                    Verifică răspunsul
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#4361EE] to-[#8B5CF6] text-white font-bold text-sm hover:opacity-95 transition-opacity"
                  >
                    <span>
                      {currentQIndex + 1 < lesson.quiz.length
                        ? 'Următoarea întrebare'
                        : 'Vezi rezultatul'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {step === 'result' && (
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#4361EE]/25 to-[#22D3EE]/25 border border-[#22D3EE]/40 flex items-center justify-center">
                <Award className="w-9 h-9 text-[#22D3EE]" />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white">
                  {passedAll ? 'Super treabă! Lecție completată!' : 'Bun început! Mai exersăm?'}
                </h3>
                <p className="text-sm text-[#A5B4D8] mt-1">
                  Ai răspuns corect la <strong className="text-white">{correctCount}</strong> din{' '}
                  <strong className="text-white">{lesson.quiz.length}</strong> întrebări.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#0B1026] border border-[#FACC15]/30 text-[#FACC15] font-extrabold text-base">
                <Sparkles className="w-5 h-5" />
                <span>+{totalEarnedXp} XP câștigate</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-white/10">
                {!passedAll && (
                  <button
                    onClick={handleRetryQuiz}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0B1026] border border-white/15 text-white font-bold text-sm hover:bg-white/5 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Încearcă din nou</span>
                  </button>
                )}
                <button
                  onClick={handleFinish}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#4361EE] to-[#22D3EE] text-[#0B1026] font-extrabold text-sm hover:opacity-95 transition-opacity"
                >
                  <span>Salvează și continuă</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
