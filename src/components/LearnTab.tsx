import React, { useState } from 'react';
import { CheckCircle2, PlayCircle, Sparkles, BookOpen, ChevronRight } from 'lucide-react';
import { CURRICULUM, Lesson, Module } from '../data/curriculum';
import { LessonModal } from './LessonModal';

interface LearnTabProps {
  completedLessons: string[];
  xp: number;
  userName: string;
  onCompleteLesson: (lessonId: string, earnedXp: number) => void;
}

export const LearnTab: React.FC<LearnTabProps> = ({
  completedLessons,
  xp,
  userName,
  onCompleteLesson,
}) => {
  const [activeLessonInfo, setActiveLessonInfo] = useState<{
    lesson: Lesson;
    moduleTitle: string;
  } | null>(null);

  const totalLessons = CURRICULUM.reduce((acc, mod) => acc + mod.lessons.length, 0);
  const completedCount = completedLessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const currentLevel = Math.floor(xp / 150) + 1;
  const xpIntoLevel = xp % 150;
  const levelProgress = Math.round((xpIntoLevel / 150) * 100);

  return (
    <div className="space-y-8">
      {/* Hero Progress Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#171D3D] via-[#171D3D] to-[#0B1026] border border-white/10 p-6 sm:p-8">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#4361EE]/15 blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-[#8B5CF6]/15 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4361EE]/15 border border-[#4361EE]/30 text-xs font-bold text-[#22D3EE]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Nivelul {currentLevel} • FinRise Academy</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Salut, {userName || 'exploratorule'}! Hai să îți crești viitorul.
            </h1>
            <p className="text-sm sm:text-base text-[#A5B4D8]">
              Parcurge lecțiile scurte, rezolvă quiz-urile și deblochează încrederea în deciziile tale financiare.
            </p>
          </div>

          {/* Progress Card */}
          <div className="w-full md:w-72 p-4 rounded-2xl bg-[#0B1026]/80 border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-[#A5B4D8]">Progres curs</span>
              <span className="text-[#22D3EE]">
                {completedCount}/{totalLessons} lecții ({progressPercent}%)
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-[#171D3D] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#4361EE] via-[#8B5CF6] to-[#22D3EE] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="pt-1 flex items-center justify-between text-xs text-[#A5B4D8]">
              <span>Până la Nivelul {currentLevel + 1}</span>
              <span className="font-semibold text-white">{xpIntoLevel}/150 XP</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#171D3D] overflow-hidden">
              <div
                className="h-full bg-[#FACC15] transition-all duration-500"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Modules List */}
      <div className="space-y-6">
        {CURRICULUM.map((module: Module) => {
          const moduleCompletedCount = module.lessons.filter((l) =>
            completedLessons.includes(l.id)
          ).length;

          return (
            <section
              key={module.id}
              className="rounded-3xl bg-[#171D3D]/85 border border-white/10 p-5 sm:p-6 space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div className="flex items-start sm:items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-base text-white shrink-0 shadow-md"
                    style={{
                      backgroundColor: `${module.badgeColor}22`,
                      border: `1px solid ${module.badgeColor}66`,
                      color: module.badgeColor,
                    }}
                  >
                    {module.number}
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white">{module.title}</h2>
                    <p className="text-xs sm:text-sm text-[#A5B4D8] mt-0.5">{module.subtitle}</p>
                  </div>
                </div>

                <div className="self-start sm:self-center px-3 py-1 rounded-full bg-[#0B1026] border border-white/10 text-xs font-bold text-[#A5B4D8] shrink-0">
                  {moduleCompletedCount} / {module.lessons.length} completate
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {module.lessons.map((lesson) => {
                  const isDone = completedLessons.includes(lesson.id);

                  return (
                    <button
                      key={lesson.id}
                      onClick={() =>
                        setActiveLessonInfo({ lesson, moduleTitle: module.title })
                      }
                      className={`group text-left p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 ${
                        isDone
                          ? 'bg-[#0B1026]/70 border-emerald-500/30 hover:border-emerald-400/60'
                          : 'bg-[#0B1026]/80 border-white/10 hover:border-[#4361EE]/60 hover:bg-[#0B1026]'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A5B4D8]">
                            <BookOpen className="w-3.5 h-3.5 text-[#A78BFA]" />
                            {lesson.duration}
                          </span>

                          {isDone ? (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400">
                              <CheckCircle2 className="w-4 h-4" />
                              Completată
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#FACC15]">
                              <Sparkles className="w-3.5 h-3.5" />+{lesson.xpReward} XP
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-bold text-white group-hover:text-[#22D3EE] transition-colors leading-snug">
                          {lesson.title}
                        </h3>
                        <p className="text-xs text-[#A5B4D8] line-clamp-2 leading-relaxed">
                          {lesson.summary}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs font-bold">
                        <span className="inline-flex items-center gap-1.5 text-white">
                          <PlayCircle className="w-4 h-4 text-[#4361EE]" />
                          {isDone ? 'Revizuiește lecția' : 'Începe lecția'}
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#A5B4D8] group-hover:translate-x-1 group-hover:text-white transition-all" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* Lesson Modal */}
      {activeLessonInfo && (
        <LessonModal
          lesson={activeLessonInfo.lesson}
          moduleTitle={activeLessonInfo.moduleTitle}
          alreadyCompleted={completedLessons.includes(activeLessonInfo.lesson.id)}
          onClose={() => setActiveLessonInfo(null)}
          onCompleteLesson={onCompleteLesson}
        />
      )}
    </div>
  );
};
