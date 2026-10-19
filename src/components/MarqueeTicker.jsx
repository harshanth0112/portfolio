import React from "react";
import { MARQUEE_ITEMS } from "../data/portfolioData";

export default function MarqueeTicker() {
  return (
    <div className="w-full bg-surface2 border-y border-border py-4 overflow-hidden relative select-none">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {/* Render twice for endless seamless loop */}
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
          <div key={index} className="flex items-center mx-6">
            <span className="font-display text-2xl tracking-widest text-[#F0EDE8]/80 uppercase hover:text-accent transition-colors">
              {item}
            </span>
            <span className="w-2 h-2 rounded-full bg-accent/60 mx-6 inline-block" />
          </div>
        ))}
      </div>
    </div>
  );
}
