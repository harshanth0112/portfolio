import React, { useEffect, useState } from "react";

export default function SplashScreen({ onComplete }) {
  const [stage, setStage] = useState(0); // 0: initial, 1: letters in, 2: bar filling, 3: exit slide
  const nameChars = "HARSHANTH".split("");

  useEffect(() => {
    // 1. Letters fade & slide in
    const timer1 = setTimeout(() => setStage(1), 80);
    // 2. Bar sweep
    const timer2 = setTimeout(() => setStage(2), 650);
    // 3. Slide up
    const timer3 = setTimeout(() => setStage(3), 1300);
    // 4. Complete unmount
    const timer4 = setTimeout(() => {
      onComplete?.();
    }, 1850);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-bg overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
        stage >= 3 ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Brand Name with Staggered Entrance */}
      <div className="flex font-display text-6xl sm:text-8xl md:text-9xl tracking-wider text-[#F0EDE8] overflow-hidden leading-none select-none">
        {nameChars.map((char, index) => (
          <span
            key={index}
            className="inline-block transition-all duration-500 ease-out"
            style={{
              transitionDelay: `${index * 45}ms`,
              transform: stage >= 1 ? "translateY(0)" : "translateY(110%)",
              opacity: stage >= 1 ? 1 : 0,
            }}
          >
            {char}
          </span>
        ))}
      </div>

      {/* Subtitle */}
      <div
        className="font-mono text-xs sm:text-sm uppercase tracking-[0.35em] text-accent mt-4 transition-all duration-500"
        style={{
          opacity: stage >= 1 ? 1 : 0,
          transform: stage >= 1 ? "translateY(0)" : "translateY(10px)",
          transitionDelay: "450ms",
        }}
      >
        AI &amp; Data Science
      </div>

      {/* Progress Line */}
      <div className="w-48 sm:w-64 h-[2px] bg-surface3 mt-8 relative overflow-hidden rounded-full">
        <div
          className="absolute inset-y-0 left-0 bg-accent transition-all duration-600 ease-in-out shadow-[0_0_10px_#C8FF00]"
          style={{
            width: stage >= 2 ? "100%" : "0%",
          }}
        />
      </div>

      {/* Quick Skip button */}
      <button
        onClick={onComplete}
        className="absolute bottom-8 text-xs font-mono text-muted hover:text-accent transition-colors tracking-widest uppercase cursor-pointer"
      >
        [Skip Intro]
      </button>
    </div>
  );
}
