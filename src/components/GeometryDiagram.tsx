import React, { useState } from 'react';
import { Layers, Compass, Mountain, CheckCircle } from 'lucide-react';

export const GeometryDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'triangle' | 'heightDistance' | 'alligation'>('triangle');
  const [triangleCenter, setTriangleCenter] = useState<'incenter' | 'circumcenter' | 'centroid' | 'orthocenter'>('incenter');
  const [angleElevation, setAngleElevation] = useState<number>(30);
  const [towerHeight, setTowerHeight] = useState<number>(50);

  // Height & distance calculation: base = h / tan(angle)
  const angleRad = (angleElevation * Math.PI) / 180;
  const baseDistance = Math.round(towerHeight / Math.tan(angleRad));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-400" />
            Visual Geometry & Quant Diagram Studio
          </h3>
          <p className="text-xs text-slate-400">
            Interactive visual proofs for Triangle Centers, Height & Distance, and Alligation Cross
          </p>
        </div>
        <div className="flex gap-1.5 bg-slate-800/80 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('triangle')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'triangle' ? 'bg-indigo-600 text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            Triangle Centers
          </button>
          <button
            onClick={() => setActiveTab('heightDistance')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'heightDistance' ? 'bg-indigo-600 text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            Height & Distance
          </button>
          <button
            onClick={() => setActiveTab('alligation')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'alligation' ? 'bg-indigo-600 text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            Alligation Cross
          </button>
        </div>
      </div>

      {/* 1. TRIANGLE CENTERS */}
      {activeTab === 'triangle' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 flex justify-center bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
            <svg viewBox="0 0 400 300" className="w-full max-w-[380px] h-[260px] overflow-visible">
              <defs>
                <linearGradient id="triGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              {/* Triangle ABC */}
              <polygon points="200,40 60,250 340,250" fill="url(#triGrad)" stroke="#818cf8" strokeWidth="2.5" />
              
              {/* Vertex Labels */}
              <text x="200" y="25" textAnchor="middle" fill="#c7d2fe" fontWeight="bold" fontSize="14">A</text>
              <text x="45" y="260" textAnchor="middle" fill="#c7d2fe" fontWeight="bold" fontSize="14">B</text>
              <text x="355" y="260" textAnchor="middle" fill="#c7d2fe" fontWeight="bold" fontSize="14">C</text>

              {/* INCENTER */}
              {triangleCenter === 'incenter' && (
                <>
                  {/* Angle Bisectors */}
                  <line x1="200" y1="40" x2="200" y2="175" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" />
                  <line x1="60" y1="250" x2="200" y2="175" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" />
                  <line x1="340" y1="250" x2="200" y2="175" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" />
                  {/* Incircle */}
                  <circle cx="200" cy="175" r="75" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.6" />
                  {/* Center Dot */}
                  <circle cx="200" cy="175" r="5" fill="#f59e0b" />
                  <text x="215" y="172" fill="#fbbf24" fontWeight="bold" fontSize="13">I (Incenter)</text>
                  <text x="200" y="210" textAnchor="middle" fill="#fde68a" fontSize="11">∠BIC = 90° + ∠A/2</text>
                </>
              )}

              {/* CIRCUMCENTER */}
              {triangleCenter === 'circumcenter' && (
                <>
                  {/* Perpendicular Bisectors */}
                  <line x1="200" y1="250" x2="200" y2="135" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="4 3" />
                  <line x1="130" y1="145" x2="200" y2="135" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="4 3" />
                  <line x1="270" y1="145" x2="200" y2="135" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="4 3" />
                  {/* Circumcircle */}
                  <circle cx="200" cy="148" r="142" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.5" />
                  <circle cx="200" cy="148" r="5" fill="#06b6d4" />
                  <text x="215" y="145" fill="#38bdf8" fontWeight="bold" fontSize="13">O (Circumcenter)</text>
                  <text x="200" y="185" textAnchor="middle" fill="#bae6fd" fontSize="11">∠BOC = 2∠A</text>
                </>
              )}

              {/* CENTROID */}
              {triangleCenter === 'centroid' && (
                <>
                  {/* Medians */}
                  <line x1="200" y1="40" x2="200" y2="250" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 3" />
                  <line x1="60" y1="250" x2="270" y2="145" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 3" />
                  <line x1="340" y1="250" x2="130" y2="145" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 3" />
                  <circle cx="200" cy="180" r="5" fill="#10b981" />
                  <text x="215" y="180" fill="#34d399" fontWeight="bold" fontSize="13">G (Centroid)</text>
                  <text x="200" y="215" textAnchor="middle" fill="#a7f3d0" fontSize="11">Divides median in 2:1</text>
                </>
              )}

              {/* ORTHOCENTER */}
              {triangleCenter === 'orthocenter' && (
                <>
                  {/* Altitudes */}
                  <line x1="200" y1="40" x2="200" y2="250" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="4 3" />
                  <line x1="60" y1="250" x2="245" y2="108" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="4 3" />
                  <line x1="340" y1="250" x2="155" y2="108" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="4 3" />
                  <circle cx="200" cy="190" r="5" fill="#ec4899" />
                  <text x="215" y="195" fill="#f472b6" fontWeight="bold" fontSize="13">H (Orthocenter)</text>
                  <text x="200" y="228" textAnchor="middle" fill="#fbcfe8" fontSize="11">∠BHC = 180° - ∠A</text>
                </>
              )}
            </svg>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Select Center Type</h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setTriangleCenter('incenter')}
                className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                  triangleCenter === 'incenter'
                    ? 'bg-amber-500/10 border-amber-500/50 text-amber-300'
                    : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-bold">Incenter (I)</div>
                <div className="text-[10px] text-slate-400">Angle Bisectors</div>
              </button>
              <button
                onClick={() => setTriangleCenter('circumcenter')}
                className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                  triangleCenter === 'circumcenter'
                    ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300'
                    : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-bold">Circumcenter (O)</div>
                <div className="text-[10px] text-slate-400">Perpendicular Bisectors</div>
              </button>
              <button
                onClick={() => setTriangleCenter('centroid')}
                className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                  triangleCenter === 'centroid'
                    ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300'
                    : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-bold">Centroid (G)</div>
                <div className="text-[10px] text-slate-400">Medians (2 : 1)</div>
              </button>
              <button
                onClick={() => setTriangleCenter('orthocenter')}
                className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                  triangleCenter === 'orthocenter'
                    ? 'bg-pink-500/10 border-pink-500/50 text-pink-300'
                    : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-bold">Orthocenter (H)</div>
                <div className="text-[10px] text-slate-400">Altitudes</div>
              </button>
            </div>

            <div className="bg-slate-800/70 p-3 rounded-xl border border-slate-700/60 text-xs space-y-1.5">
              <div className="font-semibold text-slate-200">Exam Shortcut Rule:</div>
              {triangleCenter === 'incenter' && (
                <p className="text-slate-300">
                  <span className="text-amber-400 font-mono font-bold">∠BIC = 90° + ∠A/2</span>. Inradius <span className="font-mono">r = Δ / s</span>.
                </p>
              )}
              {triangleCenter === 'circumcenter' && (
                <p className="text-slate-300">
                  <span className="text-cyan-400 font-mono font-bold">∠BOC = 2∠A</span>. Circumradius <span className="font-mono">R = abc / (4Δ)</span>.
                </p>
              )}
              {triangleCenter === 'centroid' && (
                <p className="text-slate-300">
                  <span className="text-emerald-400 font-mono font-bold">AG : GD = 2 : 1</span>. Divides Δ into 3 equal areas.
                </p>
              )}
              {triangleCenter === 'orthocenter' && (
                <p className="text-slate-300">
                  <span className="text-pink-400 font-mono font-bold">∠BHC = 180° - ∠A</span>. H, G, O collinear in 2:1 ratio (Euler line).
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. HEIGHT & DISTANCE */}
      {activeTab === 'heightDistance' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 flex justify-center bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
            <svg viewBox="0 0 420 260" className="w-full max-w-[400px] h-[240px] overflow-visible">
              {/* Ground */}
              <line x1="20" y1="210" x2="400" y2="210" stroke="#64748b" strokeWidth="2.5" />
              {/* Tower */}
              <line x1="340" y1="210" x2="340" y2="50" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />
              <rect x="330" y="45" width="20" height="10" fill="#f43f5e" rx="2" />
              <text x="365" y="130" fill="#fda4af" fontWeight="bold" fontSize="13">
                h = {towerHeight}m
              </text>

              {/* Observer Point */}
              <circle cx="80" cy="210" r="4" fill="#38bdf8" />
              <text x="80" y="235" textAnchor="middle" fill="#38bdf8" fontWeight="bold" fontSize="12">
                Observer (P)
              </text>

              {/* Line of Sight */}
              <line x1="80" y1="210" x2="340" y2="50" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5 3" />

              {/* Angle Arc */}
              <path d="M 120 210 A 40 40 0 0 0 115 188" fill="none" stroke="#fde047" strokeWidth="2" />
              <text x="135" y="195" fill="#fde047" fontWeight="bold" fontSize="12">
                θ = {angleElevation}°
              </text>

              {/* Base Distance */}
              <line x1="80" y1="218" x2="340" y2="218" stroke="#94a3b8" strokeWidth="1.5" />
              <text x="210" y="238" textAnchor="middle" fill="#cbd5e1" fontWeight="bold" fontSize="12">
                Base Distance = {baseDistance}m
              </text>
            </svg>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Angle of Elevation (θ): <span className="text-amber-400 font-bold">{angleElevation}°</span>
              </label>
              <div className="flex gap-2">
                {[30, 45, 60].map((deg) => (
                  <button
                    key={deg}
                    onClick={() => setAngleElevation(deg)}
                    className={`flex-1 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                      angleElevation === deg
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {deg}°
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Tower Height (h): <span className="text-rose-400 font-bold">{towerHeight} m</span>
              </label>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={towerHeight}
                onChange={(e) => setTowerHeight(Number(e.target.value))}
                className="w-full accent-rose-500"
              />
            </div>

            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/70 text-xs space-y-1">
              <div className="font-bold text-slate-200">Standard Ratio Rule:</div>
              {angleElevation === 30 && (
                <p className="text-slate-300">
                  In 30°-60°-90°: Base = <span className="text-amber-300 font-mono">h√3 = {towerHeight}√3 ≈ {(towerHeight * 1.732).toFixed(1)} m</span>.
                </p>
              )}
              {angleElevation === 45 && (
                <p className="text-slate-300">
                  In 45°-45°-90°: Base = <span className="text-amber-300 font-mono">Height = {towerHeight} m</span>.
                </p>
              )}
              {angleElevation === 60 && (
                <p className="text-slate-300">
                  In 30°-60°-90°: Base = <span className="text-amber-300 font-mono">h / √3 = {towerHeight}/√3 ≈ {(towerHeight / 1.732).toFixed(1)} m</span>.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. ALLIGATION CROSS */}
      {activeTab === 'alligation' && (
        <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80">
          <div className="max-w-md mx-auto text-center space-y-5">
            <h4 className="text-sm font-bold text-indigo-300">The Universal Alligation Cross</h4>
            <div className="relative py-8 px-6 bg-slate-900/90 rounded-2xl border border-slate-700/80">
              {/* Cross diagram */}
              <div className="flex justify-between items-center text-sm font-bold">
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/40 rounded-xl text-emerald-400">
                  Cheaper Price (c)
                  <div className="text-xs text-slate-400 font-normal">e.g. Rs.15/kg</div>
                </div>
                <div className="p-3 bg-rose-500/10 border border-rose-500/40 rounded-xl text-rose-400">
                  Dearer Price (d)
                  <div className="text-xs text-slate-400 font-normal">e.g. Rs.20/kg</div>
                </div>
              </div>

              {/* Center Mean */}
              <div className="my-6 inline-block px-5 py-2.5 bg-amber-500/20 border-2 border-amber-400 rounded-2xl text-amber-300 font-extrabold text-base">
                Mean Price (m) = Rs.16.50/kg
              </div>

              {/* Bottom Result Ratios */}
              <div className="flex justify-between items-center text-sm font-bold pt-4 border-t border-slate-700/60">
                <div className="p-3 bg-indigo-500/15 border border-indigo-500/40 rounded-xl text-indigo-300 text-left">
                  <div>(d - m)</div>
                  <div className="text-xs text-slate-400">20 - 16.5 = 3.5</div>
                  <div className="text-base text-amber-400 font-mono mt-1">7 parts</div>
                </div>
                <div className="text-xl font-black text-slate-400">:</div>
                <div className="p-3 bg-indigo-500/15 border border-indigo-500/40 rounded-xl text-indigo-300 text-right">
                  <div>(m - c)</div>
                  <div className="text-xs text-slate-400">16.5 - 15 = 1.5</div>
                  <div className="text-base text-amber-400 font-mono mt-1">3 parts</div>
                </div>
              </div>
            </div>
            <div className="text-xs text-slate-300 bg-slate-800/50 p-2.5 rounded-lg border border-slate-700">
              <span className="font-bold text-emerald-400">Ratio of Cheaper : Dearer = 7 : 3</span>. Works for mixtures, profit & loss, speeds, and interest rates!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
