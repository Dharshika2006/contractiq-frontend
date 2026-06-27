"use client";

import React from "react";
import { AlertOctagon } from "lucide-react";
import { mockContracts } from "@/data/mockData";

export default function TemplateComparisonPage() {
  const contract = mockContracts[0];
  const comparisons = contract.comparisons || [];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-slate-900">Template Comparison</h1>
        <p className="text-slate-500 text-sm">Compare contract clauses against approved templates</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3 shadow-sm">
        <AlertOctagon className="w-5 h-5 text-amber-500" />
        <p className="text-amber-800 text-sm">
          <strong>{comparisons.length} deviations found</strong> against the standard <em>SaaS Vendor Agreement Template</em>. Highlighted differences indicate non-standard language.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50/50">
          <div className="p-4 border-r border-slate-200">
            <h3 className="font-semibold text-emerald-600 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Approved Template
            </h3>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-slate-600 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              Current Contract: {contract.name.replace(".pdf", "")}
            </h3>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {comparisons.map((comp) => {
            const isMajor = comp.deviationType === "Major Deviation";
            const isMinor = comp.deviationType === "Minor Deviation";
            const badgeColors = isMajor 
              ? "bg-rose-50 text-rose-700 border-rose-100" 
              : isMinor 
                ? "bg-amber-50 text-amber-700 border-amber-100" 
                : "bg-slate-50 text-slate-600 border-slate-200";
            
            const bgColors = isMajor 
              ? "bg-rose-50/50 border-rose-100 text-slate-800" 
              : isMinor 
                ? "bg-amber-50/50 border-amber-100 text-slate-800" 
                : "bg-transparent border-transparent text-slate-600 px-0 py-0";

            return (
              <div key={comp.id} className="grid grid-cols-2">
                {/* Left Column (Template) */}
                <div className="p-6 border-r border-slate-200 space-y-3">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium text-slate-700">{comp.clauseName}</h4>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                    {comp.approvedText}
                  </p>
                </div>
                
                {/* Right Column (Contract) */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-slate-900">{comp.clauseName}</h4>
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded border ${badgeColors}`}>
                      {comp.deviationType}
                    </span>
                  </div>
                  <p className={`text-sm leading-relaxed p-3 rounded-lg border ${bgColors}`}>
                    {comp.contractText}
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
