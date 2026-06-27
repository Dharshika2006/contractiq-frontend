"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";

interface HeaderProps {
  activeRole: "Counsel" | "Admin";
}

export default function Header({ activeRole }: HeaderProps) {
  const pathname = usePathname();

  // Helper to resolve route to breadcrumb label
  const getBreadcrumbLabel = () => {
    switch (pathname) {
      case "/dashboard":
      case "/":
        return "Dashboard";
      case "/upload":
        return "Upload Contract";
      case "/clause-analysis":
        return "Clause Analysis";
      case "/template-comparison":
        return "Template Comparison";
      case "/summary":
        return "AI Summary";
      case "/search":
        return "Clause Search";
      case "/knowledge":
        return "Knowledge Assistant";
      case "/comparison":
        return "Contract Comparison";
      case "/compliance":
        return "Compliance Monitor";
      default:
        return "Dashboard";
    }
  };

  return (
    <header className="bg-white border-b border-slate-200/80 px-6 py-4 flex items-center justify-between select-none">
      {/* Breadcrumb Path */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <span>ContractIQ</span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-800 font-semibold">{getBreadcrumbLabel()}</span>
      </div>

      {/* Right Actions Block */}
      <div className="flex items-center gap-4">
        {/* Notification bell */}
        <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Role badge display */}
        <div className="px-3.5 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-xs font-bold text-blue-600">
          {activeRole === "Counsel" ? "Legal Counsel" : "Administrator"}
        </div>
      </div>
    </header>
  );
}
