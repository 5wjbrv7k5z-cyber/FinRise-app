import { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { LearnTab } from './components/LearnTab';
import { SimulatorTab } from './components/SimulatorTab';
import { ProfileTab } from './components/ProfileTab';
import { BRAND_CONFIG } from './config/brand';

interface StoredProgress {
  xp: number;
  streak: number;
  lastActiveDate: string | null;
  completedLessons: string[];
}

const DEFAULT_PROGRESS: StoredProgress = {
  xp: 0,
  streak: 1,
  lastActiveDate: null,
  completedLessons: [],
};

const DEFAULT_USER_NAME = 'Explorator';

function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('learn');

  const [userName, setUserName] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(BRAND_CONFIG.storageKeys.userProfile);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.name === 'string' && parsed.name.trim()) {
          return parsed.name;
        }
      }
    } catch {
      // Ignore storage read errors
    }
    return DEFAULT_USER_NAME;
  });

  const [progress, setProgress] = useState<StoredProgress>(() => {
    try {
      const saved = localStorage.getItem(BRAND_CONFIG.storageKeys.progress);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          xp: typeof parsed.xp === 'number' ? parsed.xp : 0,
          streak: typeof parsed.streak === 'number' ? parsed.streak : 1,
          lastActiveDate: typeof parsed.lastActiveDate === 'string' ? parsed.lastActiveDate : null,
          completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
        };
      }
    } catch {
      // Ignore storage read errors
    }
    return DEFAULT_PROGRESS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        BRAND_CONFIG.storageKeys.userProfile,
        JSON.stringify({ name: userName })
      );
    } catch {
      // Ignore storage write errors
    }
  }, [userName]);

  useEffect(() => {
    try {
      localStorage.setItem(BRAND_CONFIG.storageKeys.progress, JSON.stringify(progress));
    } catch {
      // Ignore storage write errors
    }
  }, [progress]);

  const handleCompleteLesson = (lessonId: string, earnedXp: number) => {
    const today = getTodayKey();

    setProgress((prev) => {
      const alreadyDone = prev.completedLessons.includes(lessonId);
      const updatedLessons = alreadyDone
        ? prev.completedLessons
        : [...prev.completedLessons, lessonId];

      let nextStreak = prev.streak;
      if (prev.lastActiveDate !== today) {
        const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
        nextStreak = prev.lastActiveDate === yesterday ? prev.streak + 1 : 1;
      }

      return {
        xp: prev.xp + earnedXp,
        streak: nextStreak,
        lastActiveDate: today,
        completedLessons: updatedLessons,
      };
    });
  };

  const handleResetProgress = () => {
    setProgress({
      xp: 0,
      streak: 1,
      lastActiveDate: getTodayKey(),
      completedLessons: [],
    });
  };

  return (
    <div className="min-h-screen bg-[#0B1026] text-[#F8FAFC] flex flex-col">
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        xp={progress.xp}
        streak={progress.streak}
      />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 pt-6 pb-24 md:pb-12">
        {activeTab === 'learn' && (
          <LearnTab
            completedLessons={progress.completedLessons}
            xp={progress.xp}
            userName={userName}
            onCompleteLesson={handleCompleteLesson}
          />
        )}

        {activeTab === 'simulator' && <SimulatorTab />}

        {activeTab === 'profile' && (
          <ProfileTab
            userName={userName}
            xp={progress.xp}
            streak={progress.streak}
            completedLessons={progress.completedLessons}
            onUpdateName={setUserName}
            onResetProgress={handleResetProgress}
          />
        )}
      </main>
    </div>
  );
}

export default App;
