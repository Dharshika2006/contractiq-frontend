"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import MetricCard from "@/components/dashboard/MetricCard";
import RiskDistributionChart from "@/components/dashboard/RiskDistributionChart";
import AgreementRateChart from "@/components/dashboard/AgreementRateChart";
import TopRiskCategories from "@/components/dashboard/TopRiskCategories";
import NeedsReviewQueue from "@/components/dashboard/NeedsReviewQueue";
import { mockDashboardData, mockNeedsReviewQueue } from "@/data/mockData";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="space-y-8 pb-12">
      {/* Title Section */}
      <div className="flex items-center justify-between select-none">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">
            Portfolio overview — March 2024
          </p>
        </div>
        
        {/* + New Contract button */}
        <button 
          onClick={() => router.push("/upload")}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2563eb] hover:bg-blue-600/90 text-white rounded-xl text-xs font-bold shadow-sm active:scale-[0.98] transition-all duration-150 cursor-pointer"
        >
          <Plus size={16} />
          New Contract
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Contracts Reviewed"
          value={mockDashboardData.contractsReviewed}
          subtext="This month"
          iconName="FileText"
          iconColor="text-blue-500"
        />
        <MetricCard
          title="Avg. Risk Score"
          value={mockDashboardData.avgRiskScore}
          subtext={mockDashboardData.avgRiskChange}
          iconName="Activity"
          iconColor="text-amber-500"
        />
        <MetricCard
          title="Critical / High Flags"
          value={mockDashboardData.criticalFlags}
          subtext={`Across ${mockDashboardData.criticalFlagsContractsCount} contracts`}
          iconName="AlertTriangle"
          iconColor="text-violet-500"
        />
        <MetricCard
          title="Est. Time Saved"
          value={mockDashboardData.timeSaved}
          subtext="vs. manual review"
          iconName="Clock"
          iconColor="text-teal-500"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RiskDistributionChart data={mockDashboardData.riskDistribution} />
        <AgreementRateChart data={mockDashboardData.agreementRate} />
        <TopRiskCategories categories={mockDashboardData.topRiskCategories} />
      </div>

      {/* Needs Review Queue */}
      <NeedsReviewQueue queue={mockNeedsReviewQueue} />
    </div>
  );
}
