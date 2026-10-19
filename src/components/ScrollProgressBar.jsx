import React, { useEffect, useState } from "react";

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin="0"
      aria-valuemax="100"
      className="fixed top-0 left-0 w-full h-[2px] z-[999] bg-transparent pointer-events-none"
    >
      <div
        className="h-full bg-accent transition-all duration-75 ease-linear shadow-[0_0_8px_rgba(200,255,0,0.8)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
