import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Key, 
  CheckCircle2, 
  ExternalLink, 
  Cloud, 
  Cpu, 
  HelpCircle, 
  X, 
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';

interface NetlifyConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeyUpdated: () => void;
}

export const NetlifyConfigModal: React.FC<NetlifyConfigModalProps> = ({
  isOpen,
  onClose,
  onKeyUpdated,
}) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [copiedKeyName, setCopiedKeyName] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      const stored = localStorage.getItem('quantguru_gemini_key') || '';
      setApiKey(stored);
      setIsSaved(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('quantguru_gemini_key', apiKey.trim());
    } else {
      localStorage.removeItem('quantguru_gemini_key');
    }
    setIsSaved(true);
    onKeyUpdated();
    setTimeout(() => {
      setIsSaved(false);
    }, 2500);
  };

  const handleClearKey = () => {
    localStorage.removeItem('quantguru_gemini_key');
    setApiKey('');
    setIsSaved(false);
    onKeyUpdated();
  };

  const copyEnvVarName = () => {
    navigator.clipboard.writeText('GEMINI_API_KEY');
    setCopiedKeyName(true);
    setTimeout(() => setCopiedKeyName(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl text-slate-100 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Cloud className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Netlify Hosting & Math Solver Setup
            </h3>
            <p className="text-xs text-slate-400">
              Why math solving fails on Netlify and how to activate it in 30 seconds
            </p>
          </div>
        </div>

        {/* Explanation Card */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 mb-5 text-xs text-amber-200 space-y-2">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-300">Why was Netlify unable to solve math problems?</p>
              <p className="mt-1 text-slate-300 leading-relaxed">
                When you deploy to Netlify, Netlify’s cloud server does <strong>not have access to your local .env file</strong>. Without the <code className="px-1.5 py-0.5 bg-slate-800 text-amber-300 rounded font-mono">GEMINI_API_KEY</code> environment variable configured in Netlify, requests return an authorization error.
              </p>
            </div>
          </div>
        </div>

        {/* Option 1: Instant In-Browser Key (Fastest) */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-bold text-white">Solution 1: Enter Gemini API Key (Instant)</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              No Rebuild Required
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Paste your Google Gemini API key here. It is stored safely in your browser’s <code className="text-indigo-300">localStorage</code> and transmitted securely to solve math problems immediately.
          </p>

          <div className="space-y-2">
            <div className="relative">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveKey}
                className="flex-1 py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                {isSaved ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> : <Key className="w-3.5 h-3.5" />}
                {isSaved ? 'Key Saved Successfully!' : 'Save Key to Browser'}
              </button>
              {apiKey && (
                <button
                  onClick={handleClearKey}
                  className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-300 text-xs font-medium transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Option 2: Netlify Dashboard Environment Variable */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cloud className="w-4 h-4 text-sky-400" />
              <span className="text-sm font-bold text-white">Solution 2: Configure in Netlify Dashboard</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30">
              Permanent for all users
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            To enable AI math solving for everyone visiting your hosted Netlify URL, add the environment variable in Netlify:
          </p>

          <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside pl-1">
            <li>
              Log in to <a href="https://app.netlify.com" target="_blank" rel="noreferrer" className="text-indigo-400 underline inline-flex items-center gap-0.5">app.netlify.com <ExternalLink className="w-3 h-3" /></a> and select your site.
            </li>
            <li>
              Navigate to <strong>Site configuration</strong> &rarr; <strong>Environment variables</strong>.
            </li>
            <li>
              Click <strong>Add a variable</strong> and enter:
              <div className="flex items-center gap-2 mt-1.5 p-2 bg-slate-900 border border-slate-800 rounded-lg font-mono text-[11px] text-amber-300">
                <span className="text-slate-400 select-none">Key:</span>
                <span className="font-bold">GEMINI_API_KEY</span>
                <button
                  onClick={copyEnvVarName}
                  className="ml-auto text-slate-400 hover:text-white p-1"
                  title="Copy variable name"
                >
                  {copiedKeyName ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </li>
            <li>
              Set the <strong>Value</strong> to your Gemini API key, then click <strong>Save</strong>.
            </li>
            <li>
              Go to <strong>Deploys</strong> &rarr; <strong>Trigger deploy</strong> &rarr; <strong>Deploy site</strong>.
            </li>
          </ol>
        </div>

        {/* Built-in Offline Fallback Note */}
        <div className="bg-indigo-950/40 border border-indigo-900/50 rounded-2xl p-4 flex items-start gap-3 text-xs text-slate-300">
          <Cpu className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white">Built-in Resilient Math Engine:</span> QuantGuru now includes an upgraded calculation engine that runs directly in your browser without requiring any network requests or API keys. It handles arithmetic (BODMAS), Work & Time, Profit & Loss, SI/CI, Percentages, Speed-Distance, Quadratics, and Geometry.
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
          >
            Got it, Close
          </button>
        </div>
      </div>
    </div>
  );
};
