import React from "react";
import { ArrowRight, Terminal } from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioData";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen pt-28 pb-16 flex items-center justify-center relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Editorial Info */}
        <div className="lg:col-span-7 flex flex-col justify-center z-10">
          
          {/* Tag badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface2 border border-border text-accent text-xs font-mono tracking-wider mb-6 w-fit">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>{PERSONAL_INFO.heroTags}</span>
          </div>

          {/* Big Editorial Title */}
          <h1 className="font-display text-7xl sm:text-8xl md:text-9xl leading-[0.88] tracking-tight text-[#F0EDE8] uppercase mb-6 select-none">
            <span
              className="block text-transparent"
              style={{
                WebkitTextStroke: "1.5px #F0EDE8",
              }}
            >
              {PERSONAL_INFO.firstName}
            </span>
            <span className="text-accent">{PERSONAL_INFO.lastName}</span>
          </h1>

          {/* Bio text */}
          <p className="text-muted text-base sm:text-lg md:text-xl font-body font-light max-w-xl leading-relaxed mb-8">
            {PERSONAL_INFO.heroDescription}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-accent text-black font-mono text-sm uppercase tracking-wider font-semibold rounded-sm hover:shadow-[0_0_20px_rgba(200,255,0,0.5)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-surface border border-border text-[#F0EDE8] font-mono text-sm uppercase tracking-wider hover:border-accent hover:text-accent transition-all rounded-sm cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-accent" />
              <span>Get In Touch</span>
            </a>
          </div>
        </div>

        {/* Right Portrait Wrap */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
          <div className="relative group w-full max-w-md">
            
            {/* Background geometric accents */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-transparent rounded-lg blur-lg opacity-40 group-hover:opacity-80 transition duration-500" />
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-accent/40 pointer-events-none" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-border pointer-events-none" />

            {/* Portrait Image Frame */}
            <div className="relative rounded-lg overflow-hidden border border-border bg-surface aspect-[4/5] shadow-2xl">
              <img
                src={PERSONAL_INFO.avatarImage}
                alt={PERSONAL_INFO.name}
                className="w-full h-full object-cover object-center transition-all duration-700 ease-out transform group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/Picsart_24-09-24_18-37-59-843.jpg";
                }}
              />
              
              {/* Floating Badge */}
              <div className="absolute bottom-4 right-4 bg-surface3/90 backdrop-blur-md border border-accent/40 px-4 py-2.5 rounded text-right shadow-xl">
                <div className="font-mono text-[10px] text-accent tracking-widest uppercase">Status</div>
                <div className="font-display text-sm tracking-wider text-[#F0EDE8] leading-tight">
                  AI &amp; DS Graduate<br />Class of 2026
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
