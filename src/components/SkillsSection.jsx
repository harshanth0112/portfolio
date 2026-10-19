import React from "react";
import { SKILLS } from "../data/portfolioData";
import { Code2, Layers, Database, Cpu, Cloud, Wrench, Rocket, Sparkles } from "lucide-react";

const getCategoryIcon = (cat) => {
  switch (cat.toLowerCase()) {
    case "languages":
      return <Code2 className="w-4 h-4 text-accent" />;
    case "full stack":
      return <Layers className="w-4 h-4 text-accent" />;
    case "backend":
      return <Database className="w-4 h-4 text-accent" />;
    case "ai / ml":
      return <Cpu className="w-4 h-4 text-accent" />;
    case "cloud":
      return <Cloud className="w-4 h-4 text-accent" />;
    case "tools":
      return <Wrench className="w-4 h-4 text-accent" />;
    case "deploy":
      return <Rocket className="w-4 h-4 text-accent" />;
    default:
      return <Sparkles className="w-4 h-4 text-accent" />;
  }
};

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 max-w-7xl mx-auto px-6 md:px-12 border-t border-border">
      {/* Section Subtitle */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-accent font-mono text-xs uppercase tracking-[0.25em]">
          // 02 · EXPERTISE
        </span>
        <div className="h-[1px] w-12 bg-border" />
      </div>

      <h2 className="font-display text-5xl md:text-7xl tracking-wider text-[#F0EDE8] uppercase mb-12">
        TECHNICAL SKILLS
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SKILLS.map((item, index) => (
          <div
            key={index}
            className="group p-6 bg-surface border border-border hover:border-accent/70 transition-all duration-300 rounded-sm relative overflow-hidden flex flex-col justify-between"
          >
            {/* Top hover accent bar */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-muted group-hover:text-accent transition-colors flex items-center gap-2">
                  {getCategoryIcon(item.category)}
                  {item.category}
                </span>
                <span className="font-mono text-[10px] text-muted/60">0{index + 1}</span>
              </div>

              <div className="font-body text-base text-[#F0EDE8] font-normal leading-snug">
                {item.name}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-accent transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
