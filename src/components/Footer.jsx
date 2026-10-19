import React from "react";
import { ArrowUp, Lock } from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioData";

export default function Footer({ onOpenAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border bg-surface2 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-muted">
        <div>
          <span className="text-[#F0EDE8]">{PERSONAL_INFO.footerText}</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="uppercase tracking-widest text-accent hidden sm:inline">
            BUILT WITH REACT · TAILWIND CSS · VITE
          </span>

          {/* Discrete Admin Panel Trigger */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 hover:text-accent transition-colors py-1 px-2 rounded hover:bg-surface border border-transparent hover:border-border cursor-pointer text-muted/70 hover:text-accent"
            title="Open Admin Dashboard"
          >
            <Lock className="w-3.5 h-3.5 text-accent/80" />
            <span className="text-[11px] font-mono uppercase">Admin</span>
          </button>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-accent transition-colors p-2 -mr-2 cursor-pointer"
            title="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
