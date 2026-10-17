import React, { useState } from 'react';
import { TargetExam } from './types/quant';
import { SmartSolver } from './components/SmartSolver';
import { SyllabusExplorer } from './components/SyllabusExplorer';
import { GeometryDiagram } from './components/GeometryDiagram';
import { DataInterpretationStudio } from './components/DataInterpretationStudio';
import { MockExamArena } from './components/MockExamArena';
import { QuickCalculators } from './components/QuickCalculators';
import { 
  Zap, 
  BookOpen, 
  Compass, 
  BarChart3, 
  Timer, 
  Calculator, 
  Sparkles, 
  GraduationCap,
  Award
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'solver' | 'syllabus' | 'geometry' | 'di' | 'mock' | 'calculators'
  >('solver');

  const [selectedExam, setSelectedExam] = useState<TargetExam>('ALL_EXAMS');

  // Trigger from Syllabus Explorer to Smart Solver
  const handleLoadQuestionInSolver = (qText: string) => {
    setActiveTab('solver');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-amber-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black tracking-tight text-white">
                  Quant<span className="text-amber-400">Guru</span>
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  AIR-1 Quant Engine
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                SSC CGL • Railway NTPC/Group D • LIC AAO • FCI • WBPSC
              </p>
            </div>
          </div>

          {/* Exam Tag Switcher */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs font-semibold">
              <span className="px-2 text-slate-400 text-[11px]">Exam:</span>
              {[
                { id: 'ALL_EXAMS', label: 'All Exams' },
                { id: 'SSC_CGL', label: 'SSC CGL' },
                { id: 'RAILWAY_NTPC', label: 'Railway' },
                { id: 'LIC_AAO', label: 'LIC AAO' },
                { id: 'WBPSC', label: 'WBPSC' },
                { id: 'FCI', label: 'FCI' },
              ].map((ex) => (
                <button
                  key={ex.id}
                  onClick={() => setSelectedExam(ex.id as TargetExam)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    selectedExam === ex.id
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {ex.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-slate-900/60 border-t border-slate-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-1 sm:space-x-3 overflow-x-auto py-2 scrollbar-none text-xs font-bold">
              <button
                onClick={() => setActiveTab('solver')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl whitespace-nowrap transition-all ${
                  activeTab === 'solver'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Zap className="w-4 h-4 text-amber-400" />
                ⚡ Smart Solver (Dual Methods)
              </button>

              <button
                onClick={() => setActiveTab('syllabus')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl whitespace-nowrap transition-all ${
                  activeTab === 'syllabus'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <BookOpen className="w-4 h-4 text-indigo-400" />
                📚 15-Topic Syllabus & Formulas
              </button>

              <button
                onClick={() => setActiveTab('geometry')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl whitespace-nowrap transition-all ${
                  activeTab === 'geometry'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Compass className="w-4 h-4 text-cyan-400" />
                📐 Visual Geometry & Proofs
              </button>

              <button
                onClick={() => setActiveTab('di')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl whitespace-nowrap transition-all ${
                  activeTab === 'di'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                📊 Data Interpretation (DI)
              </button>

              <button
                onClick={() => setActiveTab('mock')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl whitespace-nowrap transition-all ${
                  activeTab === 'mock'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Timer className="w-4 h-4 text-rose-400" />
                ⏱️ Mock Exam Arena
              </button>

              <button
                onClick={() => setActiveTab('calculators')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl whitespace-nowrap transition-all ${
                  activeTab === 'calculators'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Calculator className="w-4 h-4 text-purple-400" />
                🧮 Speed Calculators
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'solver' && (
          <SmartSolver selectedExam={selectedExam} onExamChange={setSelectedExam} />
        )}

        {activeTab === 'syllabus' && (
          <SyllabusExplorer onLoadQuestionInSolver={handleLoadQuestionInSolver} />
        )}

        {activeTab === 'geometry' && (
          <GeometryDiagram />
        )}

        {activeTab === 'di' && (
          <DataInterpretationStudio />
        )}

        {activeTab === 'mock' && (
          <MockExamArena />
        )}

        {activeTab === 'calculators' && (
          <QuickCalculators />
        )}
      </main>

      {/* Comprehensive Syllabus Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-8 text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-slate-300">Complete 15-Topic Exam Coverage:</span>
            </div>
            <div className="flex items-center gap-2 text-indigo-400">
              <span>Dual-Method Solving: 30s Speed Trick + Step-by-Step Rigor</span>
            </div>
          </div>

          <p className="leading-relaxed text-[11px] text-slate-400">
            Whole Number Decimal and Fractions • Percentage • Average • Profits and Loss • Partnership • Mixture and Alligations • Time & Distance • Square/Cube • Elementary Surds • Arithmetic number series • Triangle and its centers • Height and distance • Trigonometric Ratios • Degree and Radian • Data Interpretation
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-900 text-[11px]">
            <span>Designed for SSC CGL (Tier 1 & 2), Railway (RRB NTPC, Group D, ALP), LIC AAO, FCI, WBPSC, and Banking/State PSC aspirants.</span>
            <span>QuantGuru AI Exam Master</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
