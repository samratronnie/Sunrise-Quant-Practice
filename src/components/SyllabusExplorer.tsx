import React, { useState } from 'react';
import { SYLLABUS_TOPICS } from '../data/syllabusTopics';
import { QuantTopic } from '../types/quant';
import { MathRenderer } from './MathRenderer';
import { 
  BookOpen, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Zap, 
  Check, 
  Copy, 
  ExternalLink,
  Target,
  FileQuestion,
  HelpCircle
} from 'lucide-react';

interface SyllabusExplorerProps {
  onLoadQuestionInSolver: (questionText: string) => void;
}

export const SyllabusExplorer: React.FC<SyllabusExplorerProps> = ({ onLoadQuestionInSolver }) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Arithmetic' | 'Advanced Math' | 'Data Interpretation'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>('numbers-fractions');
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);

  // Filter topics
  const filteredTopics = SYLLABUS_TOPICS.filter((t) => {
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.keyFormulas.some((f) => f.title.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedTopicId(expandedTopicId === id ? null : id);
  };

  const copyFormula = (formulaText: string) => {
    navigator.clipboard.writeText(formulaText);
    setCopiedFormula(formulaText);
    setTimeout(() => setCopiedFormula(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header and Filter */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              15-Topic Quant Syllabus & Formula Cheat Sheet
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Curated for SSC CGL, Railway (RRB NTPC / Group D), LIC AAO, FCI, WBPSC & State PSCs
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search formulas or topics..."
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-4">
          <span className="text-xs font-semibold text-slate-400 mr-2">Category:</span>
          {(['All', 'Arithmetic', 'Advanced Math', 'Data Interpretation'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
              }`}
            >
              {cat} ({cat === 'All' ? SYLLABUS_TOPICS.length : SYLLABUS_TOPICS.filter((t) => t.category === cat).length})
            </button>
          ))}
        </div>
      </div>

      {/* Topics Accordion List */}
      <div className="space-y-4">
        {filteredTopics.map((topic, index) => {
          const isExpanded = expandedTopicId === topic.id;

          return (
            <div
              key={topic.id}
              className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? 'bg-slate-900 border-indigo-500/50 shadow-xl'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleExpand(topic.id)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-base font-bold text-white group-hover:text-indigo-300">
                        {topic.name}
                      </h4>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          topic.category === 'Arithmetic'
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : topic.category === 'Advanced Math'
                            ? 'bg-purple-500/15 text-purple-400 border border-purple-500/30'
                            : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {topic.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-1">{topic.overview}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="hidden sm:inline-block text-[11px] font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md">
                    {topic.keyFormulas.length} Formulas
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-indigo-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500" />
                  )}
                </div>
              </button>

              {/* Accordion Expanded Content */}
              {isExpanded && (
                <div className="p-5 pt-0 border-t border-slate-800/80 space-y-6">
                  {/* Exam Weightage Row */}
                  <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 mt-4">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-rose-400" />
                      Exam Weightage Breakdown:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                      <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">SSC CGL</span>
                        <span className="font-bold text-indigo-300">{topic.examWeightage.ssc}</span>
                      </div>
                      <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Railway NTPC</span>
                        <span className="font-bold text-sky-300">{topic.examWeightage.railway}</span>
                      </div>
                      <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">LIC AAO</span>
                        <span className="font-bold text-amber-300">{topic.examWeightage.lic}</span>
                      </div>
                      <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">WBPSC</span>
                        <span className="font-bold text-emerald-300">{topic.examWeightage.wbpsc}</span>
                      </div>
                      <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">FCI</span>
                        <span className="font-bold text-pink-300">{topic.examWeightage.fci}</span>
                      </div>
                    </div>
                  </div>

                  {/* Key Formulas Section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                        Key Formulas & Theorems
                      </h5>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {topic.keyFormulas.map((f, i) => (
                        <div key={i} className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-3.5 space-y-2 relative group">
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-bold text-white">{f.title}</span>
                            <button
                              onClick={() => copyFormula(f.formula)}
                              className="text-slate-400 hover:text-white transition-colors"
                              title="Copy formula"
                            >
                              {copiedFormula === f.formula ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                          
                          <div className="py-1 text-indigo-200 text-sm overflow-x-auto">
                            <MathRenderer content={`$$${f.latex}$$`} />
                          </div>

                          <p className="text-[11px] text-slate-400 leading-relaxed border-t border-slate-800/60 pt-1.5">
                            <strong>Exam Note:</strong> {f.note}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shortcuts & Topper Tricks */}
                  <div className="space-y-2.5">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      AIR-1 Shortcuts & 30-Second Speed Tricks
                    </h5>
                    <div className="space-y-1.5">
                      {topic.shortcutsAndTricks.map((trick, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200 bg-amber-950/20 border border-amber-500/20 p-2.5 rounded-xl">
                          <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                            ⚡
                          </span>
                          <span>{trick}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Typical Previous Year Questions */}
                  {topic.sampleQuestions.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                        <FileQuestion className="w-3.5 h-3.5 text-emerald-400" />
                        Curated PYQs (Previous Year Questions)
                      </h5>
                      <div className="space-y-3">
                        {topic.sampleQuestions.map((q) => (
                          <div key={q.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-bold text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/40">
                                {q.exam} {q.year}
                              </span>
                              <button
                                onClick={() => {
                                  let fullQ = q.question;
                                  if (q.options) {
                                    fullQ += '\nOptions:\n' + q.options.map((opt, i) => `(${String.fromCharCode(65 + i)}) ${opt}`).join('\n');
                                  }
                                  onLoadQuestionInSolver(fullQ);
                                }}
                                className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                              >
                                Solve in Smart Solver
                                <ExternalLink className="w-3 h-3" />
                              </button>
                            </div>

                            <p className="text-xs font-semibold text-slate-100">{q.question}</p>

                            {q.options && (
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                                {q.options.map((opt, i) => (
                                  <div
                                    key={i}
                                    className={`p-2 rounded-lg border ${
                                      q.correctOption === String.fromCharCode(65 + i)
                                        ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300 font-bold'
                                        : 'bg-slate-900 border-slate-800 text-slate-300'
                                    }`}
                                  >
                                    ({String.fromCharCode(65 + i)}) {opt}
                                  </div>
                                ))}
                              </div>
                            )}

                            <div className="bg-amber-950/20 border border-amber-500/30 p-2.5 rounded-lg text-xs space-y-1">
                              <div className="text-amber-300 font-bold">⚡ Topper Shortcut:</div>
                              <p className="text-slate-200">{q.examShortcut}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
