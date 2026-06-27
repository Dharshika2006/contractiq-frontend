"use client";

import React, { useState } from "react";
import { AlertTriangle, ChevronDown } from "lucide-react";
import { mockContracts } from "@/data/mockData";

export default function ComparisonPage() {
  const contract = mockContracts[0];
  const comparisons = contract.versionComparisons || [];
  
  const changedCount = comparisons.filter(c => c.status !== "Unchanged").length;

  const [versionA, setVersionA] = useState("v1.2 (Vendor Draft)");
  const [versionB, setVersionB] = useState("v2.0 (Executed)");
  const [showDropdownA, setShowDropdownA] = useState(false);
  const [showDropdownB, setShowDropdownB] = useState(false);
  const [mobileView, setMobileView] = useState<"versionA" | "versionB">("versionB");

  const versions = [
    "v1.0 (Initial Draft)",
    "v1.1 (Internal Review)",
    "v1.2 (Vendor Draft)",
    "v1.5 (Negotiation)",
    "v2.0 (Executed)",
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-slate-900">Contract Comparison</h1>
        <p className="text-slate-500 text-sm">{contract.name.replace(".pdf", "")} — Compare versions</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3 shadow-sm">
        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
        <p className="text-amber-800 text-sm">
          <strong>{changedCount} clauses changed</strong> between {versionA.split(' ')[0]} and {versionB.split(' ')[0]}. Highlighted differences indicate new risk exposure introduced in {versionB.split(' ')[0]}.
        </p>
      </div>

      {/* Mobile Toggle Control */}
      <div className="md:hidden flex p-1 bg-slate-100 rounded-xl mb-4">
        <button
          onClick={() => setMobileView("versionA")}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
            mobileView === "versionA"
              ? "bg-white text-slate-900 shadow-sm border border-slate-200/50"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Version A
        </button>
        <button
          onClick={() => setMobileView("versionB")}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
            mobileView === "versionB"
              ? "bg-white text-slate-900 shadow-sm border border-slate-200/50"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Version B
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-slate-200 bg-slate-50/50">
          <div className={`p-4 border-b md:border-b-0 md:border-r border-slate-200 flex items-center justify-between relative ${mobileView === "versionA" ? "block" : "hidden md:flex"}`}>
            <h3 className="font-semibold text-slate-600 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              Version A
            </h3>
            <div className="relative">
              <button 
                onClick={() => { setShowDropdownA(!showDropdownA); setShowDropdownB(false); }}
                className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <span className="truncate max-w-[120px] sm:max-w-none">{versionA}</span>
                <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
              </button>
              {showDropdownA && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-10">
                  {versions.map(v => (
                    <button 
                      key={v}
                      onClick={() => { setVersionA(v); setShowDropdownA(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    >
                      {v}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className={`p-4 flex items-center justify-between relative ${mobileView === "versionB" ? "block" : "hidden md:flex"}`}>
            <h3 className="font-semibold text-blue-600 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Version B
            </h3>
            <div className="relative">
              <button 
                onClick={() => { setShowDropdownB(!showDropdownB); setShowDropdownA(false); }}
                className="flex items-center gap-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200/60 px-3 py-1.5 rounded-lg hover:bg-blue-100/50 transition-colors"
              >
                <span className="truncate max-w-[120px] sm:max-w-none">{versionB}</span>
                <ChevronDown className="w-4 h-4 text-blue-400 shrink-0" />
              </button>
              {showDropdownB && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-10">
                  {versions.map(v => (
                    <button 
                      key={v}
                      onClick={() => { setVersionB(v); setShowDropdownB(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    >
                      {v}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {comparisons.map((comp) => {
            const isAdded = comp.status === "Added";
            const isRemoved = comp.status === "Removed";
            const isModified = comp.status === "Modified";
            const isUnchanged = comp.status === "Unchanged";

            return (
              <div key={comp.id} className="grid grid-cols-1 md:grid-cols-2">
                {/* Left Column (Original) */}
                <div className={`p-4 sm:p-6 border-b md:border-b-0 md:border-r border-slate-200 space-y-3 ${isAdded ? "bg-slate-50/50" : ""} ${mobileView === "versionA" ? "block" : "hidden md:block"}`}>
                  <div className="flex flex-wrap items-center gap-3">
                    <h4 className={`font-medium ${isAdded ? "text-slate-300" : "text-slate-500"}`}>{comp.clauseName}</h4>
                    {isUnchanged && (
                      <span className="px-2 py-0.5 bg-slate-50 text-slate-500 text-xs font-medium rounded border border-slate-200">
                        Unchanged
                      </span>
                    )}
                    {isRemoved && (
                      <span className="px-2 py-0.5 bg-rose-50 text-rose-600 text-xs font-medium rounded border border-rose-100">
                        Removed
                      </span>
                    )}
                  </div>
                  <p className={`text-sm leading-relaxed ${
                    isRemoved ? "p-3 rounded-lg border bg-rose-50/50 border-rose-100 text-slate-800 line-through decoration-rose-300" 
                    : isAdded ? "text-slate-300 italic"
                    : "text-slate-500"
                  }`}>
                    {comp.originalText || "Clause not present in original version."}
                  </p>
                </div>
                
                {/* Right Column (Current) */}
                <div className={`p-4 sm:p-6 space-y-3 ${isRemoved ? "bg-slate-50/50" : ""} ${mobileView === "versionB" ? "block" : "hidden md:block"}`}>
                  <div className="flex flex-wrap items-center gap-3">
                    <h4 className={`font-medium ${isRemoved ? "text-slate-300" : "text-slate-700"}`}>{comp.clauseName}</h4>
                    {isModified && (
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-xs font-medium rounded border border-amber-100">
                        Modified
                      </span>
                    )}
                    {isAdded && (
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-xs font-medium rounded border border-emerald-100">
                        Added
                      </span>
                    )}
                  </div>
                  <p className={`text-sm leading-relaxed ${
                    isModified ? "p-3 rounded-lg border bg-amber-50/50 border-amber-100 text-slate-800" 
                    : isAdded ? "p-3 rounded-lg border bg-emerald-50/50 border-emerald-100 text-slate-800"
                    : isRemoved ? "text-slate-300 italic"
                    : "text-slate-600"
                  }`}>
                    {comp.currentText || "Clause removed from current version."}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

