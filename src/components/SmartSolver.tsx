import React, { useState, useRef } from 'react';
import { TargetExam, SolverMode, SolverResult } from '../types/quant';
import { MathRenderer } from './MathRenderer';
import { SYLLABUS_TOPICS } from '../data/syllabusTopics';
import { solveQuantQuestionClient } from '../utils/clientQuantSolver';
import { 
  Zap, 
  BookOpen, 
  Sparkles, 
  UploadCloud, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  Copy, 
  Check, 
  Lightbulb, 
  ArrowRight, 
  Clock, 
  ShieldAlert,
  HelpCircle
} from 'lucide-react';

interface SmartSolverProps {
  selectedExam: TargetExam;
  onExamChange: (exam: TargetExam) => void;
}

export const SmartSolver: React.FC<SmartSolverProps> = ({ selectedExam, onExamChange }) => {
  const [questionText, setQuestionText] = useState<string>('');
  const [solverMode, setSolverMode] = useState<SolverMode>('DUAL_METHOD');
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageMime, setImageMime] = useState<string>('image/png');
  const [imageFileName, setImageFileName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<SolverResult | null>(null);
  const [activeMethodTab, setActiveMethodTab] = useState<'shortcut' | 'conventional'>('shortcut');
  const [revealedHints, setRevealedHints] = useState<{ [key: number]: boolean }>({});
  const [revealedAnswers, setRevealedAnswers] = useState<{ [key: number]: boolean }>({});
  const [copied, setCopied] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Quick math symbols insert
  const insertSymbol = (sym: string) => {
    setQuestionText((prev) => prev + sym);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        alert('File size exceeds 8MB. Please choose a smaller image.');
        return;
      }
      setImageMime(file.type);
      setImageFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImageBase64(null);
    setImageFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Pre-fill sample question
  const loadSampleQuestion = (topicId: string, qId: string) => {
    const topic = SYLLABUS_TOPICS.find((t) => t.id === topicId);
    if (!topic) return;
    const q = topic.sampleQuestions.find((sq) => sq.id === qId);
    if (q) {
      let fullQ = q.question;
      if (q.options && q.options.length > 0) {
        fullQ += '\nOptions:\n' + q.options.map((opt, i) => `(${String.fromCharCode(65 + i)}) ${opt}`).join('\n');
      }
      setQuestionText(fullQ);
      clearImage();
    }
  };

  const handleSolve = async () => {
    if (!questionText.trim() && !imageBase64) {
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: questionText.trim(),
          exam: selectedExam,
          mode: solverMode,
          imageBase64: imageBase64,
          mimeType: imageMime,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data: SolverResult = await response.json();
      setResult(data);
      setActiveMethodTab('shortcut');
    } catch (err) {
      console.warn('Backend /api/solve offline or static hosting detected (e.g. Netlify CDN). Running built-in client engine:', err);
      // Run the smart client quant solver instantly
      const clientSolution = solveQuantQuestionClient(questionText.trim(), selectedExam);
      setResult(clientSolution);
      setActiveMethodTab('shortcut');
    } finally {
      setIsLoading(false);
    }
  };

  const copySolution = () => {
    if (!result) return;
    const text = `QuantGuru Solution:
Problem: ${result.problemAnalysis}
Exam: ${result.targetExamFit}
Formula: ${result.formulaUsed}
Topper Shortcut (${result.examShortcut.speedEstimate}):
${result.examShortcut.stepByStep.join('\n')}
Conventional Method:
${result.conventionalMethod.stepByStep.join('\n')}
Final Answer: ${result.finalAnswer} ${result.correctOptionLetter ? `(Option ${result.correctOptionLetter})` : ''}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Hero Controls */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/60 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Quant Solver & Topper Tricks
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Solve Any Quant Question with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-amber-300">Dual Methods</span>
          </h2>
          <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Instant solutions for all 15 syllabus topics. Compares the <strong>30-Second Topper Speed Trick</strong> (Vedic tricks, ratio & elimination) against the <strong>Step-by-Step Conventional Academic Method</strong>.
          </p>

          {/* Exam Selector Pills */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 mr-1">Target Exam:</span>
            {[
              { id: 'ALL_EXAMS', label: 'All Exams' },
              { id: 'SSC_CGL', label: 'SSC CGL' },
              { id: 'RAILWAY_NTPC', label: 'Railway NTPC / Group D' },
              { id: 'LIC_AAO', label: 'LIC AAO' },
              { id: 'FCI', label: 'FCI' },
              { id: 'WBPSC', label: 'WBPSC' },
            ].map((exam) => (
              <button
                key={exam.id}
                onClick={() => onExamChange(exam.id as TargetExam)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedExam === exam.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                }`}
              >
                {exam.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Solver Input Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 md:p-7 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base text-white">Enter or Upload Question</h3>
          </div>
          
          {/* Mode Selector */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-medium">
            <button
              onClick={() => setSolverMode('DUAL_METHOD')}
              className={`px-3 py-1 rounded-lg transition-all ${
                solverMode === 'DUAL_METHOD' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Dual Method (Topper + Standard)
            </button>
            <button
              onClick={() => setSolverMode('TO_EXAM_TOPPER')}
              className={`px-3 py-1 rounded-lg transition-all ${
                solverMode === 'TO_EXAM_TOPPER' ? 'bg-amber-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Topper Speed Trick Only
            </button>
            <button
              onClick={() => setSolverMode('CONVENTIONAL')}
              className={`px-3 py-1 rounded-lg transition-all ${
                solverMode === 'CONVENTIONAL' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Conventional Step-by-Step
            </button>
          </div>
        </div>

        {/* Text Area */}
        <div className="relative">
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Type or paste any Quant question here... (e.g. 'If x + 1/x = 4, find x³ + 1/x³' or 'A train 150m long passes a pole in 15 seconds...')"
            rows={4}
            className="w-full bg-slate-950/80 border border-slate-700/80 rounded-2xl p-4 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-sans leading-relaxed"
          />

          {/* Quick Math Symbols Bar */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <span className="text-[11px] font-medium text-slate-400 mr-1">Insert Math:</span>
            {[
              { label: '√x', val: '√' },
              { label: 'x²', val: '²' },
              { label: 'x³', val: '³' },
              { label: 'π', val: 'π' },
              { label: 'θ', val: 'θ' },
              { label: 'Δ', val: 'Δ' },
              { label: '∠A', val: '∠' },
              { label: 'sin', val: 'sin ' },
              { label: '×', val: '×' },
              { label: '÷', val: '÷' },
              { label: '±', val: '±' },
              { label: '%', val: '%' },
            ].map((sym) => (
              <button
                key={sym.label}
                type="button"
                onClick={() => insertSymbol(sym.val)}
                className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono rounded-md border border-slate-700 transition-colors"
              >
                {sym.label}
              </button>
            ))}
          </div>
        </div>

        {/* Image Upload Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-3">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="quant-image-input"
            />
            <label
              htmlFor="quant-image-input"
              className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 transition-all"
            >
              <UploadCloud className="w-4 h-4 text-indigo-400" />
              Upload Photo / Screenshot of Question
            </label>

            {imageBase64 && (
              <div className="flex items-center gap-2 bg-indigo-950/60 border border-indigo-800/60 px-3 py-1.5 rounded-xl text-xs text-indigo-200">
                <span className="truncate max-w-[140px] font-mono">{imageFileName || 'Image Attached'}</span>
                <button onClick={clearImage} className="text-rose-400 hover:text-rose-300">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Solve Button */}
          <button
            onClick={handleSolve}
            disabled={isLoading || (!questionText.trim() && !imageBase64)}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing & Solving...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-amber-300" />
                Solve with Topper Tricks
              </>
            )}
          </button>
        </div>

        {/* Image Preview if uploaded */}
        {imageBase64 && (
          <div className="relative inline-block mt-2 border border-slate-700 rounded-xl overflow-hidden max-h-48">
            <img src={imageBase64} alt="Question upload" className="max-h-48 object-contain bg-slate-950" />
          </div>
        )}

        {/* Quick Load PYQ Samples */}
        <div className="pt-3 border-t border-slate-800/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              Try Curated Exam PYQs (1-Click Load):
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {[
              {
                topicId: 'triangle-centers',
                qId: 'q-tri-1',
                label: 'Triangle Incenter Angle (SSC CGL 2023)',
                tag: 'Geometry'
              },
              {
                topicId: 'mixture-alligations',
                qId: 'q-mix-1',
                label: 'Alligation Rice Ratio (FCI 2021)',
                tag: 'Mixture'
              },
              {
                topicId: 'time-distance',
                qId: 'q-tsd-1',
                label: 'Opposite Trains Crossing (Railway NTPC)',
                tag: 'Time & Speed'
              },
              {
                topicId: 'square-cube',
                qId: 'q-sc-1',
                label: 'Algebraic x³ + 1/x³ (SSC CGL 2023)',
                tag: 'Algebra'
              },
              {
                topicId: 'elementary-surds',
                qId: 'q-surd-1',
                label: 'Square Root of Surd √(8 + 2√15)',
                tag: 'Surds'
              },
              {
                topicId: 'height-distance',
                qId: 'q-hd-1',
                label: 'Complementary Angles Tower (SSC CGL)',
                tag: 'Trig'
              }
            ].map((sample) => (
              <button
                key={sample.qId}
                onClick={() => loadSampleQuestion(sample.topicId, sample.qId)}
                className="text-left p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/60 border border-slate-800 hover:border-slate-700 transition-all text-xs group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200 group-hover:text-indigo-300 truncate">
                    {sample.label}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                    {sample.tag}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SOLUTION DISPLAY SECTION */}
      {result && (
        <div className="bg-slate-900 border border-indigo-900/60 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
          {/* Header Badges & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-bold">
                  Topic: {result.topicDetected}
                </span>
                <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-bold">
                  {result.targetExamFit}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                <strong>Analysis:</strong> {result.problemAnalysis}
              </p>
            </div>

            <button
              onClick={copySolution}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-medium border border-slate-700 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy Solution'}
            </button>
          </div>

          {/* Formula Used Banner */}
          {result.formulaUsed && (
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Core Formula / Theorem Used:
                </span>
                <div className="mt-1 text-slate-200 text-sm">
                  <MathRenderer content={result.formulaUsed} />
                </div>
              </div>
              <div className="text-xs font-semibold text-indigo-400 bg-indigo-950/60 border border-indigo-800/50 px-3 py-1.5 rounded-xl whitespace-nowrap self-start sm:self-center">
                Syllabus Theorem
              </div>
            </div>
          )}

          {/* Method Switching Tabs */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <button
                onClick={() => setActiveMethodTab('shortcut')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeMethodTab === 'shortcut'
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Zap className="w-4 h-4" />
                ⚡ Exam Topper Speed Trick ({result.examShortcut.speedEstimate})
              </button>
              <button
                onClick={() => setActiveMethodTab('conventional')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeMethodTab === 'conventional'
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                📝 Conventional Method (Step-by-Step)
              </button>
            </div>

            {/* TOPPER SHORTCUT VIEW */}
            {activeMethodTab === 'shortcut' && (
              <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      Method: {result.examShortcut.methodName}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-amber-400 bg-amber-500/20 px-2.5 py-1 rounded-full border border-amber-500/40">
                    <Clock className="w-3 h-3" />
                    Speed: {result.examShortcut.speedEstimate}
                  </span>
                </div>

                {/* Steps */}
                <div className="space-y-2.5">
                  {result.examShortcut.stepByStep.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-slate-200 text-sm">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div className="flex-1">
                        <MathRenderer content={step} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Topper Tip Box */}
                {result.examShortcut.topperTip && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-200 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong>AIR-1 Speed Hack:</strong> {result.examShortcut.topperTip}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* CONVENTIONAL METHOD VIEW */}
            {activeMethodTab === 'conventional' && (
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                    Textbook Proof & Step-by-Step Derivation
                  </span>
                </div>

                <div className="space-y-3">
                  {result.conventionalMethod.stepByStep.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-slate-200 text-sm">
                      <span className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div className="flex-1">
                        <MathRenderer content={step} />
                      </div>
                    </div>
                  ))}
                </div>

                {result.conventionalMethod.explanation && (
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-300">
                    <strong>Conceptual Note:</strong> {result.conventionalMethod.explanation}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* FINAL ANSWER BANNER */}
          <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-emerald-950/60 border border-emerald-500/40 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0" />
              <div>
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">
                  Final Answer
                </span>
                <div className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  <MathRenderer content={result.finalAnswer} />
                </div>
              </div>
            </div>

            {result.correctOptionLetter && (
              <div className="px-4 py-2 bg-emerald-500 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-emerald-500/30">
                Correct Option: ({result.correctOptionLetter})
              </div>
            )}
          </div>

          {/* SILLY MISTAKES & NEGATIVE MARKING WARNING */}
          {result.examTips && result.examTips.length > 0 && (
            <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4" />
                Negative Marking Traps & Aspirant Pitfalls
              </div>
              <ul className="space-y-1.5 text-xs text-rose-200/90 pl-6 list-disc">
                {result.examTips.map((tip, idx) => (
                  <li key={idx}>
                    <MathRenderer content={tip} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* SIMILAR PRACTICE QUESTIONS */}
          {result.similarQuestions && result.similarQuestions.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-400" />
                Master This Concept: Similar Practice Questions
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.similarQuestions.map((sq, i) => (
                  <div key={i} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-3">
                    <div className="text-xs font-medium text-slate-200 leading-relaxed">
                      <MathRenderer content={`Q${i + 1}: ${sq.question}`} />
                    </div>
                    <div className="flex items-center gap-2 pt-1 border-t border-slate-800/80">
                      <button
                        onClick={() => setRevealedHints((prev) => ({ ...prev, [i]: !prev[i] }))}
                        className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2"
                      >
                        {revealedHints[i] ? 'Hide Hint' : 'View Hint'}
                      </button>
                      <span className="text-slate-600">|</span>
                      <button
                        onClick={() => setRevealedAnswers((prev) => ({ ...prev, [i]: !prev[i] }))}
                        className="text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-2"
                      >
                        {revealedAnswers[i] ? 'Hide Answer' : 'Check Answer'}
                      </button>
                    </div>

                    {revealedHints[i] && (
                      <div className="bg-amber-950/30 border border-amber-800/40 p-2.5 rounded-xl text-xs text-amber-300">
                        <strong>Hint:</strong> <MathRenderer content={sq.hint} />
                      </div>
                    )}
                    {revealedAnswers[i] && (
                      <div className="bg-emerald-950/30 border border-emerald-800/40 p-2.5 rounded-xl text-xs text-emerald-300 font-mono">
                        <strong>Answer:</strong> <MathRenderer content={sq.answer} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
