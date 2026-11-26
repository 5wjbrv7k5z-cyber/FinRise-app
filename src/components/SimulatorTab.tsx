import React, { useState, useMemo } from 'react';
import { TrendingUp, PiggyBank, Calendar, Sparkles, Info } from 'lucide-react';

export const SimulatorTab: React.FC = () => {
  const [initialAmount, setInitialAmount] = useState<number>(500);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(150);
  const [annualRate, setAnnualRate] = useState<number>(8);
  const [years, setYears] = useState<number>(10);

  const simulation = useMemo(() => {
    const months = years * 12;
    const monthlyRate = annualRate / 100 / 12;

    let balance = initialAmount;
    let totalContributed = initialAmount;

    const yearlySnapshots: {
      year: number;
      balance: number;
      contributed: number;
      interest: number;
    }[] = [
      {
        year: 0,
        balance: Math.round(initialAmount),
        contributed: Math.round(initialAmount),
        interest: 0,
      },
    ];

    for (let m = 1; m <= months; m++) {
      balance = balance * (1 + monthlyRate) + monthlyContribution;
      totalContributed += monthlyContribution;

      if (m % 12 === 0) {
        const yearNum = m / 12;
        yearlySnapshots.push({
          year: yearNum,
          balance: Math.round(balance),
          contributed: Math.round(totalContributed),
          interest: Math.round(balance - totalContributed),
        });
      }
    }

    const finalBalance = Math.round(balance);
    const finalContributed = Math.round(totalContributed);
    const finalInterest = Math.max(0, finalBalance - finalContributed);

    return {
      finalBalance,
      finalContributed,
      finalInterest,
      yearlySnapshots,
    };
  }, [initialAmount, monthlyContribution, annualRate, years]);

  const formatRon = (value: number) =>
    new Intl.NumberFormat('ro-RO', {
      style: 'currency',
      currency: 'RON',
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="rounded-3xl bg-gradient-to-br from-[#171D3D] to-[#0B1026] border border-white/10 p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22D3EE]/15 border border-[#22D3EE]/30 text-xs font-bold text-[#22D3EE] mb-3">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Simulator Dobândă Compusă</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Vezi cum crește bulgărele tău de zăpadă
        </h1>
        <p className="text-sm sm:text-base text-[#A5B4D8] mt-1.5 max-w-2xl">
          Joacă-te cu sumele și orizontul de timp pentru a înțelege de ce timpul este cel mai mare aliat al tău în finanțe.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-5 rounded-3xl bg-[#171D3D]/85 border border-white/10 p-6 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-bold">
              <label htmlFor="initial-amount" className="text-[#F8FAFC]">
                Suma inițială
              </label>
              <span className="text-[#22D3EE]">{formatRon(initialAmount)}</span>
            </div>
            <input
              id="initial-amount"
              type="range"
              min={0}
              max={10000}
              step={100}
              value={initialAmount}
              onChange={(e) => setInitialAmount(Number(e.target.value))}
              className="w-full accent-[#4361EE] cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm font-bold">
              <label htmlFor="monthly-contribution" className="text-[#F8FAFC]">
                Contribuție lunară
              </label>
              <span className="text-[#8B5CF6]">{formatRon(monthlyContribution)}/lună</span>
            </div>
            <input
              id="monthly-contribution"
              type="range"
              min={0}
              max={2000}
              step={25}
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full accent-[#8B5CF6] cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm font-bold">
              <label htmlFor="annual-rate" className="text-[#F8FAFC]">
                Randament mediu anual estimat
              </label>
              <span className="text-[#FACC15]">{annualRate}% / an</span>
            </div>
            <input
              id="annual-rate"
              type="range"
              min={1}
              max={15}
              step={0.5}
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value))}
              className="w-full accent-[#FACC15] cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm font-bold">
              <label htmlFor="years-slider" className="text-[#F8FAFC]">
                Perioada de timp
              </label>
              <span className="text-white">
                {years} {years === 1 ? 'an' : years < 20 ? 'ani' : 'de ani'}
              </span>
            </div>
            <input
              id="years-slider"
              type="range"
              min={1}
              max={30}
              step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full accent-[#22D3EE] cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-2xl bg-[#0B1026]/80 border border-white/10 flex items-start gap-3 text-xs text-[#A5B4D8]">
            <Info className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Simularea are scop educațional și folosește o capitalizare lunară constantă. Piețele reale pot fluctua de la un an la altul.
            </p>
          </div>
        </div>

        {/* Results & Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-[#171D3D] border border-white/10 p-4 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#A5B4D8]">
                <PiggyBank className="w-4 h-4 text-[#4361EE]" />
                <span>Total depus</span>
              </div>
              <p className="text-xl font-extrabold text-white">
                {formatRon(simulation.finalContributed)}
              </p>
            </div>

            <div className="rounded-2xl bg-[#171D3D] border border-white/10 p-4 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#A5B4D8]">
                <Sparkles className="w-4 h-4 text-[#22D3EE]" />
                <span>Profit din dobândă</span>
              </div>
              <p className="text-xl font-extrabold text-[#22D3EE]">
                +{formatRon(simulation.finalInterest)}
              </p>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-[#4361EE]/25 to-[#8B5CF6]/25 border border-[#4361EE]/40 p-4 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F8FAFC]">
                <Calendar className="w-4 h-4 text-[#FACC15]" />
                <span>Sold estimat ({years}a)</span>
              </div>
              <p className="text-xl font-extrabold text-white">
                {formatRon(simulation.finalBalance)}
              </p>
            </div>
          </div>

          {/* Yearly Visual Bars */}
          <div className="rounded-3xl bg-[#171D3D]/85 border border-white/10 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white">Evoluția pe ani</h2>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="inline-flex items-center gap-1.5 text-[#A5B4D8]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4361EE]" />
                  Depus
                </span>
                <span className="inline-flex items-center gap-1.5 text-[#22D3EE]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#22D3EE]" />
                  Dobândă
                </span>
              </div>
            </div>

            <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
              {simulation.yearlySnapshots
                .filter((s) => s.year > 0)
                .map((snap) => {
                  const maxVal = Math.max(simulation.finalBalance, 1);
                  const contributedWidth = (snap.contributed / maxVal) * 100;
                  const interestWidth = (snap.interest / maxVal) * 100;

                  return (
                    <div key={snap.year} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#A5B4D8]">Anul {snap.year}</span>
                        <span className="font-bold text-white">{formatRon(snap.balance)}</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-[#0B1026] overflow-hidden flex">
                        <div
                          className="h-full bg-[#4361EE] transition-all duration-300"
                          style={{ width: `${contributedWidth}%` }}
                        />
                        <div
                          className="h-full bg-[#22D3EE] transition-all duration-300"
                          style={{ width: `${interestWidth}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
