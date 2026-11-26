import React, { useMemo, useState } from 'react';

interface PrimaLunaPeContPropriuProps {
  onCompleteSimulation?: (xpReward: number) => void;
  hasClaimedXp?: boolean;
}

interface BudgetValues {
  locuinta: number;
  utilitati: number;
  alimentatie: number;
  transport: number;
  divertisment: number;
  economii: number;
  altele: number;
}

interface CategoryConfig {
  key: keyof BudgetValues;
  label: string;
  shortLabel: string;
  color: string;
  maxSlider: number;
}

const MONTHLY_INCOME = 3500;
const UNEXPECTED_EXPENSE_AMOUNT = 500;
const XP_REWARD = 50;

const CATEGORIES: CategoryConfig[] = [
  { key: 'locuinta', label: 'Locuință și chirie', shortLabel: 'Locuință', color: '#3B82F6', maxSlider: 2500 },
  { key: 'utilitati', label: 'Utilități', shortLabel: 'Utilități', color: '#8B5CF6', maxSlider: 1000 },
  { key: 'alimentatie', label: 'Alimentație', shortLabel: 'Alimentație', color: '#2563EB', maxSlider: 1800 },
  { key: 'transport', label: 'Transport', shortLabel: 'Transport', color: '#334155', maxSlider: 1000 },
  { key: 'divertisment', label: 'Divertisment și cumpărături', shortLabel: 'Divertisment', color: '#10B981', maxSlider: 1500 },
  { key: 'economii', label: 'Economii', shortLabel: 'Economii', color: '#06B6D4', maxSlider: 2000 },
  { key: 'altele', label: 'Alte cheltuieli', shortLabel: 'Alte cheltuieli', color: '#6366F1', maxSlider: 1500 },
];

const INITIAL_BUDGET: BudgetValues = {
  locuinta: 1100,
  utilitati: 350,
  alimentatie: 800,
  transport: 150,
  divertisment: 300,
  economii: 500,
  altele: 200,
};

function formatLei(amount: number): string {
  return `${Math.round(amount).toLocaleString('ro-RO')} lei`;
}

export const PrimaLunaPeContPropriu: React.FC<PrimaLunaPeContPropriuProps> = ({
  onCompleteSimulation,
  hasClaimedXp = false,
}) => {
  const [values, setValues] = useState<BudgetValues>(INITIAL_BUDGET);
  const [unexpectedExpense, setUnexpectedExpense] = useState<number>(0);
  const [claimedLocally, setClaimedLocally] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const isXpClaimed = hasClaimedXp || claimedLocally;

  const totalExpensesWithoutSavings = useMemo(() => {
    return (
      values.locuinta +
      values.utilitati +
      values.alimentatie +
      values.transport +
      values.divertisment +
      values.altele +
      unexpectedExpense
    );
  }, [values, unexpectedExpense]);

  const totalAllocated = useMemo(() => {
    return totalExpensesWithoutSavings + values.economii;
  }, [totalExpensesWithoutSavings, values.economii]);

  const availableBalance = MONTHLY_INCOME - totalAllocated;
  const allocatedPercent = Math.round((totalAllocated / MONTHLY_INCOME) * 100);

  const handleAmountChange = (key: keyof BudgetValues, rawValue: string) => {
    const cleaned = rawValue.replace(/[^\d]/g, '');
    const numeric = cleaned === '' ? 0 : Math.min(99999, parseInt(cleaned, 10));
    setValues((prev) => ({
      ...prev,
      [key]: numeric,
    }));
  };

  const handleUnexpectedExpense = () => {
    setUnexpectedExpense((prev) => prev + UNEXPECTED_EXPENSE_AMOUNT);
    setStatusMessage(
      `S-a adăugat o cheltuială neprevăzută de ${formatLei(UNEXPECTED_EXPENSE_AMOUNT)}. Revizuiește-ți categoriile pentru a păstra bugetul sub control.`
    );
  };

  const handleReset = () => {
    setValues(INITIAL_BUDGET);
    setUnexpectedExpense(0);
    setStatusMessage(null);
  };

  const handleComplete = () => {
    if (availableBalance < 0) {
      setStatusMessage('Ai depășit venitul lunar de 3.500 lei. Ajustează sumele înainte de a finaliza simularea.');
      return;
    }

    if (!isXpClaimed) {
      setClaimedLocally(true);
      onCompleteSimulation?.(XP_REWARD);
      setStatusMessage(`Simulare finalizată! Ai primit +${XP_REWARD} XP (o singură dată).`);
    } else {
      setStatusMessage('Ai finalizat simularea. Recompensa de 50 XP a fost deja acordată o singură dată.');
    }
  };

  // Feedback personalizat în timp real
  const feedback = useMemo(() => {
    if (availableBalance < 0) {
      return {
        tone: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
        text: `Atenție: ai depășit bugetul cu ${formatLei(Math.abs(availableBalance))}. Redu cheltuielile sau economiile pentru a reveni pe plus.`,
      };
    }

    if (values.economii <= 0) {
      return {
        tone: 'text-amber-300 border-amber-500/30 bg-amber-500/10',
        text: 'Nu ai alocat bani pentru economii. Chiar și o sumă mică pusă deoparte lunar îți construiește fondul de urgență și siguranța financiară.',
      };
    }

    const housingRatio = values.locuinta / MONTHLY_INCOME;
    const savingsRatio = values.economii / MONTHLY_INCOME;

    if (savingsRatio >= 0.1 && housingRatio <= 0.4 && availableBalance >= 0) {
      return {
        tone: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10',
        text: 'Felicitări! Îți gestionezi echilibrat venitul, păstrezi un sold pozitiv și aloci bani constant pentru economii.',
      };
    }

    return {
      tone: 'text-sky-300 border-sky-500/30 bg-sky-500/10',
      text: 'Te încadrezi în buget și ai alocat bani pentru economii. Ajustează categoriile după prioritățile tale.',
    };
  }, [availableBalance, values.economii, values.locuinta]);

  // Date pentru graficul circular (donut chart)
  const chartSegments = useMemo(() => {
    const baseSegments = CATEGORIES.map((cat) => ({
      label: cat.shortLabel,
      fullLabel: cat.label,
      amount: values[cat.key],
      color: cat.color,
    }));

    if (unexpectedExpense > 0) {
      baseSegments.push({
        label: 'Neprevăzute',
        fullLabel: 'Cheltuieli neprevăzute',
        amount: unexpectedExpense,
        color: '#F59E0B',
      });
    }

    const sum = baseSegments.reduce((acc, item) => acc + item.amount, 0);
    const radius = 62;
    const circumference = 2 * Math.PI * radius;

    if (sum <= 0) {
      return {
        radius,
        circumference,
        segments: [] as Array<{
          label: string;
          amount: number;
          color: string;
          dashArray: string;
          dashOffset: number;
        }>,
      };
    }

    let cumulativeLength = 0;
    const computed = baseSegments
      .filter((s) => s.amount > 0)
      .map((s) => {
        const segmentLength = (s.amount / sum) * circumference;
        const dashArray = `${segmentLength} ${circumference}`;
        const dashOffset = -cumulativeLength;
        cumulativeLength += segmentLength;
        return {
          label: s.label,
          amount: s.amount,
          color: s.color,
          dashArray,
          dashOffset,
        };
      });

    return { radius, circumference, segments: computed };
  }, [values, unexpectedExpense]);

  return (
    <section className="w-full max-w-xl mx-auto rounded-2xl border border-white/10 bg-[#0B1026] text-[#F8FAFC] p-4 sm:p-6 shadow-xl">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4361EE]">
              FinRise • Simulator Educațional
            </p>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
              Prima lună pe cont propriu
            </h2>
          </div>
          <span className="shrink-0 rounded-full border border-[#4361EE]/40 bg-[#4361EE]/15 px-3 py-1 text-xs font-semibold text-[#93C5FD]">
            {isXpClaimed ? '50 XP obținuți' : '+50 XP'}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Gestionează venitul tău lunar virtual. Toate sumele sunt simulate în scop educațional.
        </p>
      </div>

      {/* Carduri Venit lunar & Sold disponibil */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="rounded-xl border border-white/10 bg-[#111836] p-3.5">
          <p className="text-xs text-slate-400">Venit lunar</p>
          <p className="text-lg sm:text-xl font-bold text-white mt-1 tabular-nums">
            {formatLei(MONTHLY_INCOME)}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#111836] p-3.5">
          <p className="text-xs text-slate-400">Sold disponibil</p>
          <p
            className={`text-lg sm:text-xl font-bold mt-1 tabular-nums ${
              availableBalance < 0 ? 'text-rose-400' : 'text-emerald-400'
            }`}
          >
            {formatLei(availableBalance)}
          </p>
        </div>
      </div>

      {/* Grafic circular + Legendă */}
      <div className="rounded-xl border border-white/10 bg-[#0E1530]/90 p-4 mb-5">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90" aria-label="Distribuția bugetului">
              <circle
                cx="80"
                cy="80"
                r={chartSegments.radius}
                fill="none"
                stroke="rgba(148, 163, 184, 0.16)"
                strokeWidth="18"
              />
              {chartSegments.segments.map((seg, idx) => (
                <circle
                  key={`${seg.label}-${idx}`}
                  cx="80"
                  cy="80"
                  r={chartSegments.radius}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth="18"
                  strokeDasharray={seg.dashArray}
                  strokeDashoffset={seg.dashOffset}
                />
              ))}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span
                className={`text-xl font-extrabold tabular-nums ${
                  allocatedPercent > 100 ? 'text-rose-400' : 'text-white'
                }`}
              >
                {allocatedPercent}%
              </span>
              <span className="text-[11px] text-slate-400">Buget alocat</span>
            </div>
          </div>

          <div className="w-full space-y-2 text-xs sm:text-sm">
            {CATEGORIES.map((cat) => (
              <div key={cat.key} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-slate-300 truncate">{cat.shortLabel}</span>
                </div>
                <span className="font-semibold text-white tabular-nums shrink-0">
                  {formatLei(values[cat.key])}
                </span>
              </div>
            ))}

            {unexpectedExpense > 0 && (
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/10">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0 bg-amber-400" />
                  <span className="text-amber-300 truncate">Neprevăzute</span>
                </div>
                <span className="font-semibold text-amber-300 tabular-nums shrink-0">
                  {formatLei(unexpectedExpense)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Categorii de buget (input manual + slider pentru mobil) */}
      <div className="space-y-4 mb-5">
        {CATEGORIES.map((cat) => {
          const val = values[cat.key];
          return (
            <div key={cat.key} className="rounded-xl border border-white/5 bg-[#101733]/70 p-3">
              <div className="flex items-center justify-between gap-3 mb-2">
                <label
                  htmlFor={`cat-${cat.key}`}
                  className="text-xs sm:text-sm font-medium text-slate-200"
                >
                  {cat.label}
                </label>

                <div className="flex items-center gap-1.5">
                  <input
                    id={`cat-${cat.key}`}
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={99999}
                    step={50}
                    value={val === 0 ? '' : val}
                    placeholder="0"
                    onChange={(e) => handleAmountChange(cat.key, e.target.value)}
                    className="w-24 rounded-lg border border-white/15 bg-[#0B1026] px-2.5 py-1 text-right text-sm font-bold text-[#38BDF8] tabular-nums focus:border-[#4361EE] focus:outline-none"
                  />
                  <span className="text-xs font-semibold text-[#38BDF8]">lei</span>
                </div>
              </div>

              <input
                type="range"
                min={0}
                max={cat.maxSlider}
                step={50}
                value={Math.min(val, cat.maxSlider)}
                onChange={(e) => handleAmountChange(cat.key, e.target.value)}
                aria-label={`Ajustează ${cat.label}`}
                className="w-full accent-[#4361EE] cursor-pointer"
              />
            </div>
          );
        })}
      </div>

      {/* Rezumate sume */}
      <div className="rounded-xl border border-white/10 bg-[#111836] p-3.5 space-y-2 text-xs sm:text-sm mb-4">
        <div className="flex items-center justify-between">
          <span className="text-slate-300">Total cheltuieli (fără economii)</span>
          <span className="font-bold text-white tabular-nums">
            {formatLei(totalExpensesWithoutSavings)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-300">Suma economisită</span>
          <span className="font-bold text-emerald-400 tabular-nums">
            {formatLei(values.economii)}
          </span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <span className="text-slate-300">Total buget alocat</span>
          <span
            className={`font-bold tabular-nums ${
              totalAllocated > MONTHLY_INCOME ? 'text-rose-400' : 'text-white'
            }`}
          >
            {formatLei(totalAllocated)}
          </span>
        </div>
      </div>

      {/* Feedback personalizat în timp real */}
      <div className={`rounded-xl border p-3.5 text-xs sm:text-sm mb-4 ${feedback.tone}`}>
        {feedback.text}
      </div>

      {statusMessage && (
        <div className="rounded-xl border border-[#4361EE]/40 bg-[#4361EE]/15 p-3 text-xs sm:text-sm text-slate-100 mb-4">
          {statusMessage}
        </div>
      )}

      {/* Acțiuni: Cheltuială neprevăzută, Finalizare (+50 XP), Reset */}
      <div className="flex flex-col gap-2.5">
        <button
          type="button"
          onClick={handleUnexpectedExpense}
          className="w-full rounded-xl border border-white/15 bg-[#161F42] hover:bg-[#1D2854] active:scale-[0.99] transition px-4 py-3 text-xs sm:text-sm font-semibold text-white cursor-pointer"
        >
          ⚡ Cheltuială neprevăzută (+500 lei)
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleComplete}
            className="w-full rounded-xl bg-[#4361EE] hover:bg-[#3651D4] active:scale-[0.99] transition px-4 py-3 text-xs sm:text-sm font-bold text-white cursor-pointer"
          >
            {isXpClaimed ? 'Simulare finalizată (XP acordat)' : 'Finalizează simularea (+50 XP)'}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="w-full rounded-xl border border-white/10 bg-transparent hover:bg-white/5 transition px-4 py-3 text-xs sm:text-sm font-semibold text-slate-300 cursor-pointer"
          >
            Resetează bugetul
          </button>
        </div>
      </div>
    </section>
  );
};

export default PrimaLunaPeContPropriu;
