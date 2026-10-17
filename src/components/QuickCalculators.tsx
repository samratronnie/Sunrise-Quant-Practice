import React, { useState } from 'react';
import { 
  Calculator, 
  RotateCcw, 
  ArrowRight, 
  Zap, 
  Compass, 
  Percent, 
  HelpCircle,
  Binary
} from 'lucide-react';
import { 
  calculateUnitDigit, 
  calculateAlligation, 
  repeatedDilution, 
  degreeToRadian, 
  radianToDegree, 
  apNthTerm, 
  apSumNTerms, 
  detectSeriesPattern,
  recurringDecimalToFraction
} from '../utils/quantMath';

export const QuickCalculators: React.FC = () => {
  const [activeTool, setActiveTool] = useState<
    'unitDigit' | 'alligation' | 'dilution' | 'degRad' | 'series' | 'recurring'
  >('unitDigit');

  // 1. Unit Digit state
  const [unitBase, setUnitBase] = useState<number>(2137);
  const [unitPower, setUnitPower] = useState<number>(753);

  // 2. Alligation state
  const [cheaper, setCheaper] = useState<number>(15);
  const [dearer, setDearer] = useState<number>(20);
  const [mean, setMean] = useState<number>(16.5);

  // 3. Dilution state
  const [initMilk, setInitMilk] = useState<number>(60);
  const [takenOut, setTakenOut] = useState<number>(12);
  const [numOperations, setNumOperations] = useState<number>(2);

  // 4. Deg/Rad state
  const [degInput, setDegInput] = useState<number>(135);

  // 5. Series state
  const [seriesStr, setSeriesStr] = useState<string>('6, 13, 28, 59');

  // 6. Recurring Decimal state
  const [nonRep, setNonRep] = useState<string>('4');
  const [rep, setRep] = useState<string>('7');

  // Calculations
  const unitResult = calculateUnitDigit(unitBase, unitPower);
  const lastBaseDigit = Math.abs(unitBase) % 10;
  const mod4Power = unitPower % 4 === 0 ? 4 : unitPower % 4;

  let alligationResult = null;
  let alligationError = null;
  try {
    alligationResult = calculateAlligation(cheaper, dearer, mean);
  } catch (err: any) {
    alligationError = err.message;
  }

  const dilutionResult = repeatedDilution(initMilk, initMilk, takenOut, numOperations);

  const radResult = degreeToRadian(degInput);

  const parsedNumbers = seriesStr
    .split(',')
    .map((s) => parseFloat(s.trim()))
    .filter((n) => !isNaN(n));
  const seriesPattern = detectSeriesPattern(parsedNumbers);

  const fractionResult = recurringDecimalToFraction(nonRep, rep);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-400" />
              Quant Speed Calculators & Concept Engines
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Instant deterministic math tools for Unit Digits, Alligation, Dilution, Series Detection, and Radian Conversions
            </p>
          </div>

          {/* Tool Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            {[
              { id: 'unitDigit', label: 'Unit Digit (aᵇ)' },
              { id: 'alligation', label: 'Alligation Cross' },
              { id: 'dilution', label: 'Repeated Dilution' },
              { id: 'degRad', label: 'Degree ↔ Radian' },
              { id: 'series', label: 'Series Predictor' },
              { id: 'recurring', label: 'Recurring Decimal' },
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id as any)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTool === tool.id ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                {tool.label}
              </button>
            ))}
          </div>
        </div>

        {/* 1. UNIT DIGIT CALCULATOR */}
        {activeTool === 'unitDigit' && (
          <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Binary className="w-4 h-4 text-amber-400" />
                Find Unit Digit of (Base)ᵖᵒʷᵉʳ
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Base (a)</label>
                  <input
                    type="number"
                    value={unitBase}
                    onChange={(e) => setUnitBase(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Power (n)</label>
                  <input
                    type="number"
                    value={unitPower}
                    onChange={(e) => setUnitPower(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  { b: 2137, p: 753 },
                  { b: 3, p: 40 },
                  { b: 7, p: 105 },
                  { b: 2, p: 1024 },
                ].map((eg, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setUnitBase(eg.b);
                      setUnitPower(eg.p);
                    }}
                    className="text-[11px] bg-slate-800 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg border border-slate-700"
                  >
                    Try {eg.b}^{eg.p}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-950/70 border border-amber-500/30 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  Resultant Unit Digit:
                </span>
                <div className="text-4xl font-black text-amber-300 font-mono mt-2">
                  {unitResult}
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-xs space-y-1 text-slate-300">
                <div className="font-bold text-slate-200">Exam Trick Breakdown:</div>
                <p>1. Last digit of base = <span className="text-amber-400 font-mono">{lastBaseDigit}</span></p>
                <p>2. Cyclicity of {lastBaseDigit} is 4.</p>
                <p>3. Exponent {unitPower} mod 4 = <span className="text-amber-400 font-mono">{mod4Power}</span></p>
                <p>4. {lastBaseDigit}^{mod4Power} = {Math.pow(lastBaseDigit, mod4Power)} → Unit Digit = <strong className="text-emerald-400 font-mono">{unitResult}</strong></p>
              </div>
            </div>
          </div>
        )}

        {/* 2. ALLIGATION CALCULATOR */}
        {activeTool === 'alligation' && (
          <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                Rule of Alligation Calculator
              </h4>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Cheaper Value (c)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={cheaper}
                    onChange={(e) => setCheaper(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Dearer Value (d)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={dearer}
                    onChange={(e) => setDearer(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Mean / Desired Mixture Value (m)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={mean}
                    onChange={(e) => setMean(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-950/70 border border-indigo-500/30 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
              {alligationError ? (
                <div className="text-rose-400 text-xs p-3 bg-rose-950/40 border border-rose-800 rounded-xl">
                  {alligationError}
                </div>
              ) : alligationResult ? (
                <>
                  <div>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                      Mixing Ratio (Cheaper : Dearer):
                    </span>
                    <div className="text-3xl font-black text-emerald-300 font-mono mt-2">
                      {alligationResult.simplifiedRatio}
                    </div>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-xs space-y-1 text-slate-300 whitespace-pre-line font-mono">
                    {alligationResult.explanation}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        )}

        {/* 3. REPEATED DILUTION */}
        {activeTool === 'dilution' && (
          <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Percent className="w-4 h-4 text-cyan-400" />
                Repeated Replacement / Dilution: Q = C·(1 - x/C)ⁿ
              </h4>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Initial Pure Liquid Capacity (C)</label>
                  <input
                    type="number"
                    value={initMilk}
                    onChange={(e) => setInitMilk(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Quantity Drawn & Replaced Each Time (x)</label>
                  <input
                    type="number"
                    value={takenOut}
                    onChange={(e) => setTakenOut(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Number of Operations (n)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={numOperations}
                    onChange={(e) => setNumOperations(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-950/70 border border-cyan-500/30 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                  Remaining Pure Liquid:
                </span>
                <div className="text-3xl font-black text-cyan-300 font-mono mt-2">
                  {dilutionResult} units
                </div>
                <div className="text-xs text-slate-400 mt-1 font-mono">
                  Water in vessel = {(initMilk - dilutionResult).toFixed(4)} units
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-xs space-y-1 text-slate-300">
                <div className="font-bold text-slate-200">Formula Used:</div>
                <p className="font-mono text-cyan-300">
                  {initMilk} × (1 - {takenOut}/{initMilk})^{numOperations} = {initMilk} × ({(1 - takenOut/initMilk).toFixed(3)})^{numOperations} = {dilutionResult}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 4. DEGREE TO RADIAN */}
        {activeTool === 'degRad' && (
          <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-purple-400" />
                Degree to Radian Exact Fraction Engine
              </h4>
              <div className="text-xs">
                <label className="text-slate-400 block mb-1 font-semibold">Angle in Degrees (°)</label>
                <input
                  type="number"
                  value={degInput}
                  onChange={(e) => setDegInput(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {[30, 45, 60, 90, 120, 135, 150, 180, 270, 360].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDegInput(d)}
                    className="text-[11px] bg-slate-800 text-slate-300 hover:text-white px-2 py-1 rounded border border-slate-700"
                  >
                    {d}°
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-950/70 border border-purple-500/30 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">
                  Exact Radian Form:
                </span>
                <div className="text-3xl font-black text-purple-300 font-mono mt-2">
                  {radResult.piFraction} radians
                </div>
                <div className="text-xs text-slate-400 mt-1 font-mono">
                  Decimal equivalent: {radResult.radians} rad
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-xs space-y-1 text-slate-300">
                <div className="font-bold text-slate-200">Exam Trick:</div>
                <p>Divide degree by 180 and simplify fraction with π: {degInput}/180 = {radResult.piFraction}</p>
              </div>
            </div>
          </div>
        )}

        {/* 5. ARITHMETIC SERIES PREDICTOR */}
        {activeTool === 'series' && (
          <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Binary className="w-4 h-4 text-emerald-400" />
                Number Series Pattern Identifier & Next Term
              </h4>
              <div className="text-xs">
                <label className="text-slate-400 block mb-1 font-semibold">Enter numbers separated by comma</label>
                <input
                  type="text"
                  value={seriesStr}
                  onChange={(e) => setSeriesStr(e.target.value)}
                  placeholder="e.g. 6, 13, 28, 59"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  '3, 8, 13, 18, 23',
                  '2, 4, 8, 16, 32',
                  '4, 9, 16, 25, 36',
                  '2, 5, 10, 17, 26',
                ].map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSeriesStr(s)}
                    className="text-[11px] bg-slate-800 text-slate-300 hover:text-white px-2.5 py-1 rounded border border-slate-700 font-mono"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-950/70 border border-emerald-500/30 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
              {seriesPattern ? (
                <>
                  <div>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                      Pattern: {seriesPattern.type}
                    </span>
                    <div className="text-3xl font-black text-emerald-300 font-mono mt-2">
                      Next Number = {seriesPattern.nextNumber}
                    </div>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-xs space-y-1 text-slate-300">
                    <div className="font-bold text-slate-200">Series Rule:</div>
                    <p className="font-mono text-emerald-400">{seriesPattern.rule}</p>
                  </div>
                </>
              ) : (
                <div className="text-xs text-slate-400 p-4">
                  Please enter at least 3 numbers to detect arithmetic or geometric patterns.
                </div>
              )}
            </div>
          </div>
        )}

        {/* 6. RECURRING DECIMAL TO FRACTION */}
        {activeTool === 'recurring' && (
          <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Percent className="w-4 h-4 text-amber-400" />
                Recurring Decimal to Fraction (p/q form)
              </h4>
              <p className="text-xs text-slate-400">
                Format: 0. [Non-Repeating Digits] [Repeating Digits...]
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Non-Repeating (e.g. 4 in 0.477...)</label>
                  <input
                    type="text"
                    value={nonRep}
                    onChange={(e) => setNonRep(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Repeating (e.g. 7 in 0.477...)</label>
                  <input
                    type="text"
                    value={rep}
                    onChange={(e) => setRep(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  { nr: '', r: '3', label: '0.333...' },
                  { nr: '1', r: '6', label: '0.1666...' },
                  { nr: '4', r: '7', label: '0.4777...' },
                  { nr: '', r: '27', label: '0.2727...' },
                ].map((eg, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setNonRep(eg.nr);
                      setRep(eg.r);
                    }}
                    className="text-[11px] bg-slate-800 text-slate-300 hover:text-white px-2 py-1 rounded border border-slate-700"
                  >
                    {eg.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-950/70 border border-amber-500/30 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  Lowest Form Fraction:
                </span>
                <div className="text-3xl font-black text-amber-300 font-mono mt-2">
                  {fractionResult.numerator} / {fractionResult.denominator}
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-xs space-y-1 text-slate-300 font-mono">
                <p>Formula: (Full number - non repeating) / 9s and 0s</p>
                <p>Numerator: {nonRep + rep} - {nonRep || 0}</p>
                <p>Denominator: {'9'.repeat(rep.length) + '0'.repeat(nonRep.length)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
