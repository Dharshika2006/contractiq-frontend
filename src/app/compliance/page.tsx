"use client";

import React from "react";
import { Check, X, FileText, AlertTriangle } from "lucide-react";

export default function CompliancePage() {
  // Hardcoded matrix data to exactly match the Figma prototype
  const matrixData = [
    {
      id: "c1",
      name: "Meridian SaaS License",
      gdpr: "Fail",
      ccpa: "Fail",
      hipaa: "N/A",
      sox: "Pass",
      pci: "N/A",
      status: "Attention Required"
    },
    {
      id: "c2",
      name: "Vertex Vendor Agreement",
      gdpr: "Pass",
      ccpa: "Pass",
      hipaa: "N/A",
      sox: "Pass",
      pci: "N/A",
      status: "Compliant"
    },
    {
      id: "c3",
      name: "Acme Corp NDA",
      gdpr: "Pass",
      ccpa: "Pass",
      hipaa: "N/A",
      sox: "N/A",
      pci: "N/A",
      status: "Compliant"
    },
    {
      id: "c4",
      name: "Ironwood Procurement",
      gdpr: "Pass",
      ccpa: "Pass",
      hipaa: "N/A",
      sox: "Pass",
      pci: "Fail",
      status: "Attention Required"
    },
    {
      id: "c5",
      name: "Chen Employment",
      gdpr: "Pass",
      ccpa: "Pass",
      hipaa: "Pass",
      sox: "N/A",
      pci: "N/A",
      status: "Compliant"
    },
    {
      id: "c6",
      name: "BrightPath Partnership",
      gdpr: "Fail",
      ccpa: "Pass",
      hipaa: "N/A",
      sox: "Pass",
      pci: "N/A",
      status: "Attention Required"
    },
    {
      id: "c7",
      name: "Global Reach NDA",
      gdpr: "Pass",
      ccpa: "Pass",
      hipaa: "N/A",
      sox: "N/A",
      pci: "N/A",
      status: "Compliant"
    }
  ];

  const renderMatrixBadge = (value: string) => {
    if (value === "Pass") {
      return (
        <div className="flex items-center gap-1.5 text-teal-600 text-xs font-semibold">
          <Check className="w-3.5 h-3.5" /> Pass
        </div>
      );
    }
    if (value === "Fail") {
      return (
        <div className="flex items-center gap-1.5 text-rose-600 text-xs font-semibold">
          <X className="w-3.5 h-3.5" /> Fail
        </div>
      );
    }
    return (
      <div className="text-zinc-400 text-xs font-medium">N/A</div>
    );
  };

  const renderStatusBadge = (status: string) => {
    if (status === "Compliant") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50/50 text-teal-700 rounded-md text-xs font-semibold border border-teal-200/60">
          <Check className="w-3.5 h-3.5" /> Compliant
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50/50 text-rose-700 rounded-md text-xs font-semibold border border-rose-200/60">
        <AlertTriangle className="w-3.5 h-3.5" /> Attention Required
      </span>
    );
  };

  const passCount = 18;
  const failCount = 4;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-slate-900">Compliance Monitor</h1>
          <p className="text-slate-500 text-sm">Automated compliance checks against major regulations</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-1.5 bg-teal-50/50 text-teal-700 border border-teal-200/60 rounded-lg font-medium text-sm flex items-center gap-2 shadow-sm">
            <Check className="w-4 h-4" /> {passCount} Pass
          </div>
          <div className="px-4 py-1.5 bg-rose-50/50 text-rose-700 border border-rose-200/60 rounded-lg font-medium text-sm flex items-center gap-2 shadow-sm">
            <X className="w-4 h-4" /> {failCount} Fail
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-200 bg-white">
                <th className="py-5 px-8 text-xs font-bold text-slate-400 uppercase tracking-wider w-[250px]">Contract</th>
                <th className="py-5 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">GDPR</th>
                <th className="py-5 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">CCPA</th>
                <th className="py-5 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">HIPAA</th>
                <th className="py-5 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">SOX</th>
                <th className="py-5 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">PCI DSS</th>
                <th className="py-5 px-8 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {matrixData.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-5 px-8">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="font-semibold text-slate-700 text-sm">{row.name}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6">{renderMatrixBadge(row.gdpr)}</td>
                  <td className="py-5 px-6">{renderMatrixBadge(row.ccpa)}</td>
                  <td className="py-5 px-6">{renderMatrixBadge(row.hipaa)}</td>
                  <td className="py-5 px-6">{renderMatrixBadge(row.sox)}</td>
                  <td className="py-5 px-6">{renderMatrixBadge(row.pci)}</td>
                  <td className="py-5 px-8">{renderStatusBadge(row.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pt-4">
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Compliance Issues Summary</h3>
        <div className="space-y-3">
          {/* Issue 1 */}
          <div className="bg-white border border-zinc-200/60 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-3 sm:gap-4 shadow-sm">
            <div className="shrink-0 pt-0.5">
              <span className="px-2.5 py-1 bg-violet-50 text-violet-700 rounded text-[10px] font-bold border border-violet-200/60 flex items-center gap-1.5 uppercase tracking-wider w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
                Critical
              </span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                <h4 className="font-bold text-slate-900 text-sm">Meridian SaaS License</h4>
                <div className="flex gap-1.5 flex-wrap">
                  <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold border border-slate-200">GDPR</span>
                  <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold border border-slate-200">CCPA</span>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Overbroad data processing rights; vendor authorized to process data for own analytics without restriction. No standard contractual clauses (SCCs) for international transfers.
              </p>
            </div>
          </div>

          {/* Issue 2 */}
          <div className="bg-white border border-zinc-200/60 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-3 sm:gap-4 shadow-sm">
            <div className="shrink-0 pt-0.5">
              <span className="px-2.5 py-1 bg-orange-50 text-orange-700 rounded text-[10px] font-bold border border-orange-200/60 flex items-center gap-1.5 uppercase tracking-wider w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                High
              </span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                <h4 className="font-bold text-slate-900 text-sm">BrightPath Partnership</h4>
                <div className="flex gap-1.5 flex-wrap">
                  <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold border border-slate-200">GDPR</span>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                No data processing agreement (DPA) attached. EU personal data processing occurring without lawful basis documentation.
              </p>
            </div>
          </div>

          {/* Issue 3 */}
          <div className="bg-white border border-zinc-200/60 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-3 sm:gap-4 shadow-sm">
            <div className="shrink-0 pt-0.5">
              <span className="px-2.5 py-1 bg-orange-50 text-orange-700 rounded text-[10px] font-bold border border-orange-200/60 flex items-center gap-1.5 uppercase tracking-wider w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                High
              </span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                <h4 className="font-bold text-slate-900 text-sm">Ironwood Procurement</h4>
                <div className="flex gap-1.5 flex-wrap">
                  <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold border border-slate-200">PCI DSS</span>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Payment card data handling procedures not addressed in contract. Vendor handles cardholder data without explicit compliance obligation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
