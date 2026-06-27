"use client";

import React, { useState, useEffect } from "react";
import { mockContracts } from "@/data/mockData";
import { Sparkles, Clock, CheckCircle2, Copy, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function SummaryPage() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate AI loading delay
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const contract = mockContracts[0];
  const summary = contract.aiSummary;

  if (!summary) return null;

  const handleCopy = () => {
    toast.success("Summary copied to clipboard!");
  };

  const handleDownload = () => {
    toast.success("Summary downloaded successfully!");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-slate-900">AI Summary</h1>
          <p className="text-slate-500 text-sm">{contract.name.replace(".pdf", "")} — auto-generated plain-English analysis</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all duration-200 shadow-sm"
          >
            <Copy className="w-4 h-4" />
            Copy
          </button>
          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all duration-200 shadow-sm"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-violet-50 text-violet-700 rounded-lg border border-violet-200/60 font-semibold text-sm">
            <Sparkles className="w-4 h-4" />
            AI Generated
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-violet-50 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-violet-600 animate-spin" />
          </div>
          <div className="text-center">
            <h3 className="text-base font-semibold text-slate-900 mb-1">Generating AI Summary...</h3>
            <p className="text-sm text-slate-500">Extracting key obligations, deadlines, and risks.</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-500">
          
          {/* Executive Summary */}
          {summary.executiveSummary && (
            <div className="p-8 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-xs font-bold text-slate-400 tracking-wider mb-3 uppercase">Executive Summary</h3>
              <p className="text-slate-700 text-base leading-relaxed font-medium">
                {summary.executiveSummary}
              </p>
            </div>
          )}

          <div className="p-8 space-y-12">
            {/* Key Obligations */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 tracking-wider mb-4 uppercase">Key Obligations</h3>
              <ul className="space-y-4">
                {summary.obligations.map((obs) => (
                  <li key={obs.id} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                    <span className="text-slate-700 text-sm leading-relaxed">{obs.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Deadlines */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 tracking-wider mb-4 uppercase">Key Deadlines</h3>
              <div className="grid grid-cols-2 gap-4">
                {summary.deadlines.map((deadline) => (
                    <div 
                      key={deadline.id} 
                      className={`p-4 rounded-xl border flex items-start gap-3 transition-colors duration-200 hover:shadow-sm ${
                        deadline.isCritical 
                          ? "border-amber-300 bg-amber-50/30" 
                          : "bg-slate-50/50 border-slate-100"
                      }`}
                    >
                      <Clock className={`w-4 h-4 mt-0.5 ${deadline.isCritical ? "text-amber-500" : "text-slate-400"}`} />
                      <div>
                        <p className="text-xs text-slate-500 mb-1 font-medium">{deadline.title}</p>
                        <p className={`font-bold ${deadline.isCritical ? "text-amber-700" : "text-slate-800"}`}>
                          {deadline.date}
                        </p>
                      </div>
                    </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-12">
              {/* Financial Commitments */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 tracking-wider mb-4 uppercase">Financial Commitments</h3>
                <div className="space-y-0">
                  {summary.financialCommitments.map((fin) => (
                    <div key={fin.id} className="flex justify-between py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors px-2 rounded -mx-2">
                      <span className="text-slate-700 text-sm">{fin.name}</span>
                      <span className="font-bold text-slate-900 text-sm">{fin.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Renewal Terms */}
              {summary.renewalTerms && (
                <div>
                  <h3 className="text-xs font-bold text-slate-400 tracking-wider mb-4 uppercase">Renewal Terms</h3>
                  <ul className="space-y-3">
                    {summary.renewalTerms.map((term, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-slate-400 mt-0.5">•</span>
                        <span className="text-slate-700 text-sm">{term}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-12">
              {/* Termination Conditions */}
              {summary.terminationConditions && (
                <div>
                  <h3 className="text-xs font-bold text-slate-400 tracking-wider mb-4 uppercase">Termination Conditions</h3>
                  <ul className="space-y-3">
                    {summary.terminationConditions.map((cond, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-slate-400 mt-0.5">•</span>
                        <span className="text-slate-700 text-sm">{cond}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {summary.topRisks && (
                <div className="pt-8 border-t border-slate-100 -mt-8">
                  <h3 className="text-xs font-bold text-slate-400 tracking-wider mb-4 uppercase">
                    Top Risks
                  </h3>
                  <div className="grid gap-4">
                    {/* Hardcoding the mock data rendering to match Figma's specific text structure for the risks since it requires a bold title and a badge */}
                    <div className="flex items-start gap-4 bg-zinc-50/50 border border-zinc-100 rounded-xl p-5 hover:border-zinc-200 transition-colors duration-200">
                      <div className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-700 flex items-center justify-center shrink-0 font-bold text-sm mt-0.5">
                        1
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-bold text-slate-900 text-sm">Critically low liability cap</span>
                          <span className="px-2 py-0.5 bg-violet-50 text-violet-700 rounded text-[10px] font-bold border border-violet-200/60 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
                            Critical
                          </span>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          The $5,000 liability cap represents less than 6% of the annual contract value, leaving the organization nearly unprotected against significant vendor-caused damages.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 bg-zinc-50/50 border border-zinc-100 rounded-xl p-5 hover:border-zinc-200 transition-colors duration-200">
                      <div className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-700 flex items-center justify-center shrink-0 font-bold text-sm mt-0.5">
                        2
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-bold text-slate-900 text-sm">Missing indemnification clause</span>
                          <span className="px-2 py-0.5 bg-orange-50 text-orange-700 rounded text-[10px] font-bold border border-orange-200/60 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                            High
                          </span>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          No mutual indemnification clause was found. This leaves both parties exposed to third-party IP infringement claims without contractual protection.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Recommended Next Steps */}
            {summary.recommendedNextSteps && (
              <div className="pt-6 border-t border-zinc-100">
                <h3 className="text-xs font-bold text-teal-600 tracking-wider mb-4 uppercase flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Recommended Next Steps
                </h3>
                <div className="grid gap-3">
                  {summary.recommendedNextSteps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-teal-50/50 border border-teal-100/60 rounded-lg p-3 hover:bg-teal-50 transition-colors duration-200 cursor-default">
                      <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 text-xs font-bold">
                        {idx + 1}
                      </div>
                      <span className="text-teal-900 text-sm font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

