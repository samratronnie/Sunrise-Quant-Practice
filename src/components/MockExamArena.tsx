import React, { useState, useEffect } from 'react';
import { MOCK_EXAMS } from '../data/mockTests';
import { MockExamTest, MockQuestion } from '../types/quant';
import { MathRenderer } from './MathRenderer';
import confetti from 'canvas-confetti';
import { 
  Timer, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  RotateCcw, 
  Award, 
  Zap, 
  ArrowRight, 
  ArrowLeft, 
  Bookmark, 
  ShieldAlert,
  Play
} from 'lucide-react';

export const MockExamArena: React.FC = () => {
  const [selectedMockId, setSelectedMockId] = useState<string>('ssc-cgl-sprint-1');
  const [isTestActive, setIsTestActive] = useState<boolean>(false);
  const [isTestSubmitted, setIsTestSubmitted] = useState<boolean>(false);
  
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: number]: number }>({});
  const [markedForReview, setMarkedForReview] = useState<{ [qId: number]: boolean }>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(12 * 60);

  const activeMock = MOCK_EXAMS.find((m) => m.id === selectedMockId) || MOCK_EXAMS[0];
  const currentQuestion = activeMock.questions[currentQIndex];

  // Timer hook
  useEffect(() => {
    let interval: any = null;
    if (isTestActive && !isTestSubmitted) {
      interval = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTestActive, isTestSubmitted]);

  const handleStartTest = (mock: MockExamTest) => {
    setSelectedMockId(mock.id);
    setTimeLeftSeconds(mock.durationMinutes * 60);
    setUserAnswers({});
    setMarkedForReview({});
    setCurrentQIndex(0);
    setIsTestActive(true);
    setIsTestSubmitted(false);
  };

  const handleSelectOption = (optionIndex: number) => {
    if (isTestSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }));
  };

  const handleToggleMarkReview = () => {
    setMarkedForReview((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id],
    }));
  };

  const handleClearAnswer = () => {
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQuestion.id];
      return copy;
    });
  };

  const handleSubmitTest = () => {
    setIsTestActive(false);
    setIsTestSubmitted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // safe fallback
    }
  };

  // Calculate scores
  let correctCount = 0;
  let wrongCount = 0;
  let unattemptedCount = 0;

  activeMock.questions.forEach((q) => {
    const userChoice = userAnswers[q.id];
    if (userChoice === undefined) {
      unattemptedCount++;
    } else if (userChoice === q.correctIndex) {
      correctCount++;
    } else {
      wrongCount++;
    }
  });

  const rawPositive = correctCount * activeMock.marksPerQuestion;
  const negativeDeduction = wrongCount * activeMock.negativeMarking;
  const netScore = Number((rawPositive - negativeDeduction).toFixed(2));
  const maxMarks = activeMock.totalQuestions * activeMock.marksPerQuestion;
  const accuracyPct =
    correctCount + wrongCount > 0 ? Math.round((correctCount / (correctCount + wrongCount)) * 100) : 0;

  // Format timer
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* 1. TEST SELECTION SCREEN (When not active and not submitted) */}
      {!isTestActive && !isTestSubmitted && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-400" />
              Quant Speed Mock Arena (Exam Simulation)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Test your exam temperament with timed sectional mocks for SSC CGL, Railway NTPC, LIC AAO, FCI, and WBPSC. Includes real negative marking and post-test Topper shortcut reviews.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {MOCK_EXAMS.map((mock) => (
                <div
                  key={mock.id}
                  className="bg-slate-950/80 border border-slate-800 hover:border-indigo-500/60 rounded-2xl p-5 space-y-4 transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-indigo-400 bg-indigo-950 px-2.5 py-0.5 rounded-full border border-indigo-800/50">
                        {mock.exam}
                      </span>
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                        <Timer className="w-3.5 h-3.5 text-amber-400" />
                        {mock.durationMinutes} Minutes
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {mock.title}
                    </h4>

                    <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                      <span>Questions: <strong className="text-slate-200">{mock.totalQuestions}</strong></span>
                      <span>Marks: <strong className="text-slate-200">+{mock.marksPerQuestion} / -{mock.negativeMarking}</strong></span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartTest(mock)}
                    className="w-full mt-3 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-2 transition-all"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    Start Live Mock Test
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. ACTIVE TEST ARENA */}
      {isTestActive && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Question Panel */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
            {/* Top Bar inside active test */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">
                  Question {currentQIndex + 1} of {activeMock.totalQuestions}
                </span>
                <span className="text-[11px] font-mono text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800/40">
                  {currentQuestion.topic}
                </span>
              </div>

              {/* Timer Pill */}
              <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold border ${
                timeLeftSeconds < 120
                  ? 'bg-rose-950/80 border-rose-500/80 text-rose-300 animate-pulse'
                  : 'bg-slate-950 border-slate-700 text-amber-300'
              }`}>
                <Timer className="w-3.5 h-3.5" />
                Time Left: {formatTime(timeLeftSeconds)}
              </div>
            </div>

            {/* Question Text */}
            <div className="text-sm font-semibold text-slate-100 leading-relaxed py-2">
              <MathRenderer content={currentQuestion.question} />
            </div>

            {/* Options List */}
            <div className="space-y-2.5">
              {currentQuestion.options.map((opt, idx) => {
                const isSelected = userAnswers[currentQuestion.id] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200 ring-1 ring-indigo-500'
                        : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? 'bg-indigo-600 border-indigo-400 text-white'
                          : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>
                        <MathRenderer content={opt} />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleMarkReview}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
                    markedForReview[currentQuestion.id]
                      ? 'bg-purple-950/60 border-purple-500 text-purple-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  {markedForReview[currentQuestion.id] ? 'Marked for Review' : 'Mark for Review'}
                </button>

                {userAnswers[currentQuestion.id] !== undefined && (
                  <button
                    onClick={handleClearAnswer}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-rose-400 text-xs font-medium transition-all"
                  >
                    Clear Response
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentQIndex === 0}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs font-bold flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Prev
                </button>

                {currentQIndex < activeMock.totalQuestions - 1 ? (
                  <button
                    onClick={() => setCurrentQIndex((prev) => prev + 1)}
                    className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1 shadow"
                  >
                    Next
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitTest}
                    className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow"
                  >
                    Submit Test
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Question Palette Sidebar */}
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
              Question Palette
            </h4>

            {/* Grid of question buttons */}
            <div className="grid grid-cols-5 gap-2">
              {activeMock.questions.map((q, idx) => {
                const isAnswered = userAnswers[q.id] !== undefined;
                const isMarked = markedForReview[q.id];
                const isCurrent = currentQIndex === idx;

                let btnClass = 'bg-slate-950 border-slate-800 text-slate-400';
                if (isAnswered && isMarked) {
                  btnClass = 'bg-purple-900/80 border-purple-500 text-purple-200';
                } else if (isAnswered) {
                  btnClass = 'bg-emerald-900/80 border-emerald-500 text-emerald-200 font-bold';
                } else if (isMarked) {
                  btnClass = 'bg-purple-950/60 border-purple-400 text-purple-300';
                } else if (isCurrent) {
                  btnClass = 'border-indigo-400 text-white';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQIndex(idx)}
                    className={`h-9 rounded-xl border text-xs font-mono font-bold transition-all relative ${btnClass} ${
                      isCurrent ? 'ring-2 ring-indigo-400' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-3 border-t border-slate-800/80 text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Answered ({Object.keys(userAnswers).length})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                <span>Unanswered ({activeMock.totalQuestions - Object.keys(userAnswers).length})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <span>Marked Review</span>
              </div>
            </div>

            {/* Final Submit Button */}
            <button
              onClick={handleSubmitTest}
              className="w-full py-2.5 mt-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl shadow transition-all"
            >
              Submit & View Topper Solutions
            </button>
          </div>
        </div>
      )}

      {/* 3. TEST RESULT & COMPREHENSIVE SOLUTION REVIEW */}
      {isTestSubmitted && (
        <div className="space-y-6">
          {/* Score Summary Card */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/40 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-900/60 pb-5">
              <div>
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
                  Exam Simulation Completed: {activeMock.exam}
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  Scorecard & Performance Analysis
                </h3>
              </div>

              <button
                onClick={() => handleStartTest(activeMock)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow self-start sm:self-center transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retake This Mock
              </button>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-2xl">
                <span className="text-[11px] text-slate-400 font-medium block">Net Score</span>
                <div className="text-2xl font-black text-white mt-1 font-mono">
                  {netScore} <span className="text-xs text-slate-500 font-sans">/ {maxMarks}</span>
                </div>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-2xl">
                <span className="text-[11px] text-emerald-400 font-medium block">Correct (+{activeMock.marksPerQuestion})</span>
                <div className="text-2xl font-black text-emerald-400 mt-1 font-mono">
                  {correctCount} <span className="text-xs text-slate-500 font-sans">({rawPositive} pts)</span>
                </div>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-2xl">
                <span className="text-[11px] text-rose-400 font-medium block">Negative Penalty (-{activeMock.negativeMarking})</span>
                <div className="text-2xl font-black text-rose-400 mt-1 font-mono">
                  -{negativeDeduction} <span className="text-xs text-slate-500 font-sans">({wrongCount} wrong)</span>
                </div>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-2xl">
                <span className="text-[11px] text-amber-400 font-medium block">Accuracy Rate</span>
                <div className="text-2xl font-black text-amber-400 mt-1 font-mono">
                  {accuracyPct}%
                </div>
              </div>
            </div>
          </div>

          {/* Solutions & Topper Shortcut Walkthrough */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Complete Answer Keys & 30-Second Topper Speed Tricks
            </h4>

            {activeMock.questions.map((q, idx) => {
              const userChoice = userAnswers[q.id];
              const isCorrect = userChoice === q.correctIndex;
              const isUnattempted = userChoice === undefined;

              return (
                <div
                  key={q.id}
                  className={`bg-slate-900 border rounded-2xl p-5 space-y-3 transition-all ${
                    isCorrect
                      ? 'border-emerald-500/40'
                      : isUnattempted
                      ? 'border-slate-800'
                      : 'border-rose-500/40'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                    <span className="text-xs font-bold text-slate-300">
                      Q{idx + 1}. Topic: {q.topic}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        isCorrect
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : isUnattempted
                          ? 'bg-slate-800 text-slate-400'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                      }`}
                    >
                      {isCorrect ? 'Correct (+2)' : isUnattempted ? 'Unattempted' : 'Wrong (-0.5)'}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-100">
                    <MathRenderer content={q.question} />
                  </p>

                  {/* Options with marked state */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, optIdx) => {
                      const isOptionCorrect = optIdx === q.correctIndex;
                      const isOptionSelected = userChoice === optIdx;

                      let optClass = 'bg-slate-950 border-slate-800 text-slate-400';
                      if (isOptionCorrect) {
                        optClass = 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold';
                      } else if (isOptionSelected) {
                        optClass = 'bg-rose-950/40 border-rose-500 text-rose-300 line-through';
                      }

                      return (
                        <div key={optIdx} className={`p-2.5 rounded-xl border flex items-center gap-2 ${optClass}`}>
                          <span className="font-mono font-bold">({String.fromCharCode(65 + optIdx)})</span>
                          <span>
                            <MathRenderer content={opt} />
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Topper Speed Trick Walkthrough */}
                  <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-3 text-xs space-y-1">
                    <div className="text-amber-300 font-bold flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      ⚡ 30-Second Topper Shortcut:
                    </div>
                    <p className="text-slate-200">
                      <MathRenderer content={q.explanation.shortcut} />
                    </p>
                  </div>

                  {/* Detailed method */}
                  <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 text-xs space-y-1 text-slate-300">
                    <div className="text-slate-400 font-bold">Detailed Method:</div>
                    <p>
                      <MathRenderer content={q.explanation.detail} />
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
