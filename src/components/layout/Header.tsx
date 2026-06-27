"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Bell, Menu } from "lucide-react";

interface HeaderProps {
  activeRole: "Counsel" | "Admin";
  toggleMobileMenu?: () => void;
}

export default function Header({ activeRole, toggleMobileMenu }: HeaderProps) {
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
    <header className="bg-white border-b border-slate-200/80 px-4 sm:px-6 py-4 flex items-center justify-between select-none">
      <div className="flex items-center gap-3">
        {/* Hamburger Menu (Mobile Only) */}
        <button 
          onClick={toggleMobileMenu}
          className="p-1.5 -ml-1.5 md:hidden text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
        >
          <Menu size={20} />
        </button>
        
        {/* Breadcrumb Path */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <span className="hidden sm:inline">ContractIQ</span>
          <span className="hidden sm:inline text-slate-300">/</span>
          <span className="text-slate-800 font-semibold">{getBreadcrumbLabel()}</span>
        </div>
      </div>

      {/* Right Actions Block */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Notification bell */}
        <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Role badge display */}
        <div className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 bg-blue-50 border border-blue-100 rounded-full text-[10px] sm:text-xs font-bold text-blue-600 whitespace-nowrap">
          {activeRole === "Counsel" ? "Legal Counsel" : "Administrator"}
        </div>
      </div>
    </header>
  );
}
