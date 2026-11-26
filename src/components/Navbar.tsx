import React from 'react';
import { BookOpen, TrendingUp, User, Flame, Sparkles } from 'lucide-react';
import { Logo } from './Logo';

export type ActiveTab = 'learn' | 'simulator' | 'profile';

interface NavbarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  xp: number;
  streak: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab, xp, streak }) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'learn', label: 'Lecții', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'simulator', label: 'Simulator', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'profile', label: 'Profil', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Top Bar */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-[#0B1026]/85 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => onSelectTab('learn')}
            className="text-left focus:outline-none"
            aria-label="FinRise Home"
          >
            <Logo size="sm" />
          </button>

          {/* XP & Streak Pills */}
          <div className="flex items-center gap-2.5">
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#171D3D] border border-[#FB923C]/30 text-xs font-bold text-[#FB923C]"
              title="Zile consecutive de învățare"
            >
              <Flame className="w-3.5 h-3.5 fill-[#FB923C]" />
              <span>{streak}</span>
            </div>

            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#171D3D] border border-[#22D3EE]/30 text-xs font-bold text-[#22D3EE]"
              title="Puncte de experiență acumulate"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{xp} XP</span>
            </div>

            {/* Desktop Tabs */}
            <nav className="hidden md:flex items-center gap-1 ml-3 bg-[#171D3D]/80 p-1 rounded-xl border border-white/10">
              {navItems.map((item) => {
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                      active
                        ? 'bg-[#4361EE] text-white shadow-md shadow-[#4361EE]/30'
                        : 'text-[#A5B4D8] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 backdrop-blur-xl bg-[#0B1026]/95 border-t border-white/10">
        <div className="grid grid-cols-3 h-16">
          {navItems.map((item) => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex flex-col items-center justify-center gap-1 text-xs font-semibold transition-colors ${
                  active ? 'text-[#22D3EE]' : 'text-[#A5B4D8]'
                }`}
              >
                <div className={active ? 'scale-110 transition-transform' : ''}>{item.icon}</div>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
