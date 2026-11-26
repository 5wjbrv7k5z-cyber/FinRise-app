import React, { useState } from 'react';
import { User, Sparkles, Flame, CheckCircle2, RotateCcw, Edit3, Check } from 'lucide-react';
import { CURRICULUM } from '../data/curriculum';

interface ProfileTabProps {
  userName: string;
  xp: number;
  streak: number;
  completedLessons: string[];
  onUpdateName: (newName: string) => void;
  onResetProgress: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  userName,
  xp,
  streak,
  completedLessons,
  onUpdateName,
  onResetProgress,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(userName);
  const [confirmReset, setConfirmReset] = useState(false);

  const totalLessons = CURRICULUM.reduce((acc, mod) => acc + mod.lessons.length, 0);
  const level = Math.floor(xp / 150) + 1;

  const handleSaveName = () => {
    const trimmed = nameInput.trim();
    if (trimmed) {
      onUpdateName(trimmed);
    } else {
      setNameInput(userName);
    }
    setIsEditing(false);
  };

  const handleResetClick = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    onResetProgress();
    setConfirmReset(false);
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Profile Card */}
      <section className="rounded-3xl bg-gradient-to-br from-[#171D3D] to-[#0B1026] border border-white/10 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4361EE] to-[#8B5CF6] flex items-center justify-center text-white shadow-lg shadow-[#4361EE]/25 shrink-0">
              <User className="w-8 h-8" />
            </div>

            <div>
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                    className="px-3 py-1.5 rounded-xl bg-[#0B1026] border border-[#4361EE] text-white font-bold text-lg focus:outline-none"
                    placeholder="Numele tău"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveName}
                    className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 hover:bg-emerald-500/30 transition-colors"
                    aria-label="Salvează numele"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2.5">
                  <h1 className="text-2xl font-extrabold text-white">
                    {userName || 'Explorator FinRise'}
                  </h1>
                  <button
                    onClick={() => {
                      setNameInput(userName);
                      setIsEditing(true);
                    }}
                    className="p-1.5 rounded-lg text-[#A5B4D8] hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Editează numele"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              )}
              <p className="text-sm text-[#A5B4D8] mt-0.5">
                Nivelul {level} • Viitorul tău financiar începe acum
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="p-4 rounded-2xl bg-[#0B1026]/80 border border-white/10 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#22D3EE]/15 border border-[#22D3EE]/30 flex items-center justify-center text-[#22D3EE]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#A5B4D8]">Total XP</p>
              <p className="text-xl font-extrabold text-white">{xp}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0B1026]/80 border border-white/10 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#FB923C]/15 border border-[#FB923C]/30 flex items-center justify-center text-[#FB923C]">
              <Flame className="w-5 h-5 fill-[#FB923C]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#A5B4D8]">Streak activ</p>
              <p className="text-xl font-extrabold text-white">
                {streak} {streak === 1 ? 'zi' : 'zile'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0B1026]/80 border border-white/10 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#A5B4D8]">Lecții terminate</p>
              <p className="text-xl font-extrabold text-white">
                {completedLessons.length} / {totalLessons}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reset Section */}
      <section className="rounded-3xl bg-[#171D3D]/80 border border-white/10 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white">Resetează progresul local</h2>
          <p className="text-xs sm:text-sm text-[#A5B4D8] mt-0.5">
            Șterge lecțiile completate, punctele XP și streak-ul salvat în acest browser.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {confirmReset && (
            <button
              onClick={() => setConfirmReset(false)}
              className="px-4 py-2.5 rounded-xl bg-[#0B1026] border border-white/10 text-xs font-bold text-[#A5B4D8] hover:text-white transition-colors"
            >
              Anulează
            </button>
          )}
          <button
            onClick={handleResetClick}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors ${
              confirmReset
                ? 'bg-[#EF6461] border-[#EF6461] text-white'
                : 'bg-[#0B1026] border-[#EF6461]/40 text-[#EF6461] hover:bg-[#EF6461]/15'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{confirmReset ? 'Confirmă resetarea' : 'Resetează'}</span>
          </button>
        </div>
      </section>
    </div>
  );
};
