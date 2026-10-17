import React, { useState } from 'react';
import { BarChart3, PieChart, Table, Calculator, CheckCircle, ArrowRight, Zap, Lightbulb } from 'lucide-react';
import { MathRenderer } from './MathRenderer';

export const DataInterpretationStudio: React.FC = () => {
  const [activeDIType, setActiveDIType] = useState<'pie' | 'table' | 'bar'>('pie');
  
  // Quick DI tools state
  const [degreeInput, setDegreeInput] = useState<number>(72);
  const [percentInput, setPercentInput] = useState<number>(25);

  const [v1, setV1] = useState<number>(120);
  const [v2, setV2] = useState<number>(150);

  // Solved states for interactive questions
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  const [showExplanation, setShowExplanation] = useState<{ [key: string]: boolean }>({});

  const pctFromDegree = (degreeInput / 3.6).toFixed(2);
  const degreeFromPct = (percentInput * 3.6).toFixed(2);
  const pctGrowth = v1 > 0 ? (((v2 - v1) / v1) * 100).toFixed(2) : '0';

  const handleSelectAnswer = (qKey: string, opt: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [qKey]: opt }));
    setShowExplanation((prev) => ({ ...prev, [qKey]: true }));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-400" />
              Data Interpretation (DI) Interactive Studio
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Master Table DI, Bar Graphs, Pie Charts (Degrees vs Percentages), and High-Speed Calculation Hacks
            </p>
          </div>

          <div className="flex gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setActiveDIType('pie')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeDIType === 'pie' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <PieChart className="w-3.5 h-3.5" />
              Pie Chart (Degrees)
            </button>
            <button
              onClick={() => setActiveDIType('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeDIType === 'table' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              Table DI
            </button>
            <button
              onClick={() => setActiveDIType('bar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeDIType === 'bar' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Bar Graph
            </button>
          </div>
        </div>

        {/* DI Speed Calculation Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-4">
          {/* Degree to % */}
          <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl flex items-center justify-between gap-2 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Angle to % (÷ 3.6)</span>
              <div className="flex items-center gap-1.5 mt-1">
                <input
                  type="number"
                  value={degreeInput}
                  onChange={(e) => setDegreeInput(Number(e.target.value))}
                  className="w-14 bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-xs text-amber-300 font-mono text-center"
                />
                <span className="text-slate-400">° =</span>
                <span className="text-amber-300 font-bold font-mono">{pctFromDegree}%</span>
              </div>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">360° = 100%</span>
          </div>

          {/* % to Degree */}
          <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl flex items-center justify-between gap-2 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-mono block">% to Angle (× 3.6)</span>
              <div className="flex items-center gap-1.5 mt-1">
                <input
                  type="number"
                  value={percentInput}
                  onChange={(e) => setPercentInput(Number(e.target.value))}
                  className="w-14 bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-xs text-cyan-300 font-mono text-center"
                />
                <span className="text-slate-400">% =</span>
                <span className="text-cyan-300 font-bold font-mono">{degreeFromPct}°</span>
              </div>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">1% = 3.6°</span>
          </div>

          {/* % Growth Calculator */}
          <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl flex items-center justify-between gap-2 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-mono block">% Growth [(V2-V1)/V1]</span>
              <div className="flex items-center gap-1 mt-1">
                <input
                  type="number"
                  value={v1}
                  onChange={(e) => setV1(Number(e.target.value))}
                  className="w-12 bg-slate-900 border border-slate-700 rounded px-1 py-0.5 text-xs text-slate-300 font-mono text-center"
                />
                <ArrowRight className="w-3 h-3 text-slate-500" />
                <input
                  type="number"
                  value={v2}
                  onChange={(e) => setV2(Number(e.target.value))}
                  className="w-12 bg-slate-900 border border-slate-700 rounded px-1 py-0.5 text-xs text-slate-300 font-mono text-center"
                />
                <span className="text-slate-400">=</span>
                <span className="text-emerald-400 font-bold font-mono">+{pctGrowth}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 1. PIE CHART DI */}
      {activeDIType === 'pie' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Chart Visual */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <PieChart className="w-4 h-4 text-indigo-400" />
              Annual Budget Distribution (Total: Rs.72,00,000)
            </h4>
            <div className="flex justify-center p-3">
              <svg viewBox="0 0 240 240" className="w-56 h-56">
                {/* Infrastructure: 108 deg (30%) - from 0 to 108 */}
                <path d="M 120 120 L 120 20 A 100 100 0 0 1 215.1 89.1 Z" fill="#6366f1" />
                {/* Agriculture: 90 deg (25%) - from 108 to 198 */}
                <path d="M 120 120 L 215.1 89.1 A 100 100 0 0 1 150.9 215.1 Z" fill="#10b981" />
                {/* Education: 72 deg (20%) - from 198 to 270 */}
                <path d="M 120 120 L 150.9 215.1 A 100 100 0 0 1 49.1 189.1 Z" fill="#f59e0b" />
                {/* Health: 54 deg (15%) - from 270 to 324 */}
                <path d="M 120 120 L 49.1 189.1 A 100 100 0 0 1 40.8 74.2 Z" fill="#ec4899" />
                {/* Others: 36 deg (10%) - from 324 to 360 */}
                <path d="M 120 120 L 40.8 74.2 A 100 100 0 0 1 120 20 Z" fill="#06b6d4" />
                
                {/* Center hole for donut aesthetic */}
                <circle cx="120" cy="120" r="42" fill="#090d16" />
                <text x="120" y="117" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold">TOTAL</text>
                <text x="120" y="130" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="bold">Rs.72 Lakh</text>
              </svg>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-500 shrink-0" />
                <span className="text-slate-300">Infra (108° / 30%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-slate-300">Agri (90° / 25%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
                <span className="text-slate-300">Edu (72° / 20%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-pink-500 shrink-0" />
                <span className="text-slate-300">Health (54° / 15%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-cyan-500 shrink-0" />
                <span className="text-slate-300">Others (36° / 10%)</span>
              </div>
            </div>
          </div>

          {/* Interactive Exam Questions on this Pie Chart */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  Real Exam Question (LIC AAO / SSC CGL Model)
                </h4>
                <span className="text-[10px] font-bold text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
                  Target Speed: 15s
                </span>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed font-semibold">
                Q1: What is the ratio of expenditure on Infrastructure and Education combined to the expenditure on Agriculture and Health combined?
              </p>

              {/* Options */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['5 : 4', '4 : 3', '3 : 2', '6 : 5'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelectAnswer('pie-q1', opt)}
                    className={`p-2.5 rounded-xl border text-left font-semibold transition-all ${
                      selectedAnswers['pie-q1'] === opt
                        ? opt === '5 : 4'
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                          : 'bg-rose-500/20 border-rose-500 text-rose-300'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    Option: {opt}
                  </button>
                ))}
              </div>

              {showExplanation['pie-q1'] && (
                <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-3 text-xs space-y-1.5">
                  <div className="text-amber-300 font-bold flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    Topper Direct Angle Shortcut (Never multiply by Rs.72 Lakh!):
                  </div>
                  <p className="text-slate-200">
                    Infra + Edu = 108° + 72° = <span className="font-mono text-amber-300 font-bold">180°</span>.
                    <br />
                    Agri + Health = 90° + 54° = <span className="font-mono text-amber-300 font-bold">144°</span>.
                    <br />
                    Ratio = 180 : 144 = (36 × 5) : (36 × 4) = <span className="font-mono text-emerald-400 font-bold">5 : 4</span>.
                  </p>
                  <p className="text-[11px] text-slate-400">
                    <em>Aspirant Trap:</em> Weak students compute 30% of 72 Lakh (21.6L) + 20% of 72L (14.4L) and then reduce. Directly use angles!
                  </p>
                </div>
              )}
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <p className="text-xs text-slate-200 leading-relaxed font-semibold">
                Q2: By how much does the expenditure on Agriculture exceed that on Health?
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {['Rs.7,20,000', 'Rs.5,40,000', 'Rs.9,00,000', 'Rs.6,00,000'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelectAnswer('pie-q2', opt)}
                    className={`p-2.5 rounded-xl border text-left font-semibold transition-all ${
                      selectedAnswers['pie-q2'] === opt
                        ? opt === 'Rs.7,20,000'
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                          : 'bg-rose-500/20 border-rose-500 text-rose-300'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {showExplanation['pie-q2'] && (
                <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-3 text-xs space-y-1.5">
                  <div className="text-amber-300 font-bold flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    Difference Shortcut:
                  </div>
                  <p className="text-slate-200">
                    Difference in angle = 90° - 54° = 36°.
                    <br />
                    Since 360° = Rs.72,00,000, 36° = 360° / 10 = <span className="font-mono text-emerald-400 font-bold">Rs.7,20,000</span>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. TABLE DI */}
      {activeDIType === 'table' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Table className="w-4 h-4 text-indigo-400" />
              Units Manufactured vs Defective Units by 5 Factories (A, B, C, D, E)
            </h4>
            <span className="text-xs text-slate-400 font-mono">Exam Frequency: SSC CGL Tier 2 / FCI</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono">
                <tr>
                  <th className="p-3 border-b border-slate-800">Factory</th>
                  <th className="p-3 border-b border-slate-800">Total Units Produced</th>
                  <th className="p-3 border-b border-slate-800">Defective Units</th>
                  <th className="p-3 border-b border-slate-800">Defective %</th>
                  <th className="p-3 border-b border-slate-800">Sound Units</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-mono text-slate-200">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-indigo-300 font-sans">A</td>
                  <td className="p-3">25,000</td>
                  <td className="p-3 text-rose-400">1,250</td>
                  <td className="p-3 text-amber-400">5.0%</td>
                  <td className="p-3 text-emerald-400">23,750</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-indigo-300 font-sans">B</td>
                  <td className="p-3">40,000</td>
                  <td className="p-3 text-rose-400">2,400</td>
                  <td className="p-3 text-amber-400">6.0%</td>
                  <td className="p-3 text-emerald-400">37,600</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-indigo-300 font-sans">C</td>
                  <td className="p-3">35,000</td>
                  <td className="p-3 text-rose-400">1,400</td>
                  <td className="p-3 text-amber-400">4.0%</td>
                  <td className="p-3 text-emerald-400">33,600</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-indigo-300 font-sans">D</td>
                  <td className="p-3">50,000</td>
                  <td className="p-3 text-rose-400">4,000</td>
                  <td className="p-3 text-amber-400">8.0%</td>
                  <td className="p-3 text-emerald-400">46,000</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-indigo-300 font-sans">E</td>
                  <td className="p-3">20,000</td>
                  <td className="p-3 text-rose-400">900</td>
                  <td className="p-3 text-amber-400">4.5%</td>
                  <td className="p-3 text-emerald-400">19,100</td>
                </tr>
                <tr className="bg-slate-950 font-bold text-slate-100">
                  <td className="p-3">TOTAL</td>
                  <td className="p-3">170,000</td>
                  <td className="p-3 text-rose-400">9,950</td>
                  <td className="p-3 text-amber-400">5.85%</td>
                  <td className="p-3 text-emerald-400">160,050</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Practice Question */}
          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-3 text-xs">
            <p className="text-slate-200 font-semibold">
              Question: What is the average number of sound (non-defective) units produced per factory across all 5 factories?
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-emerald-400 font-bold text-sm">
                Average = 160,050 ÷ 5 = 32,010 units
              </span>
              <span className="text-[11px] text-slate-400 bg-slate-900 px-2 py-1 rounded">
                ⚡ Mental Math: 160,000 / 5 = 32,000 + 50/5 = 10 =&gt; 32,010
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 3. BAR GRAPH */}
      {activeDIType === 'bar' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              Company Annual Revenue (in Crores ₹) over 5 Years
            </h4>
            <span className="text-xs text-slate-400 font-mono">Exam: Railway NTPC / WBPSC</span>
          </div>

          {/* SVG Bar Graph */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
            <div className="flex items-end justify-between gap-4 h-56 pt-8 pb-4 border-b border-slate-800 px-4">
              {[
                { year: '2020', val: 40, h: '40%' },
                { year: '2021', val: 55, h: '55%' },
                { year: '2022', val: 70, h: '70%' },
                { year: '2023', val: 90, h: '90%' },
                { year: '2024', val: 100, h: '100%' },
              ].map((item) => (
                <div key={item.year} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[11px] font-mono font-bold text-indigo-300 group-hover:text-amber-400">
                    ₹{item.val} Cr
                  </span>
                  <div
                    style={{ height: item.h }}
                    className="w-full max-w-[45px] bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg group-hover:from-amber-500 group-hover:to-amber-400 transition-all duration-300 shadow"
                  />
                  <span className="text-xs font-mono text-slate-400">{item.year}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-950/20 border border-amber-500/30 p-4 rounded-2xl text-xs space-y-1">
            <div className="font-bold text-amber-300">Exam Growth Shortcut:</div>
            <p className="text-slate-200">
              Percentage increase from 2020 (₹40 Cr) to 2024 (₹100 Cr) = [(100 - 40) / 40] × 100% = (60 / 40) × 100% = <span className="font-bold text-emerald-400">150%</span>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
