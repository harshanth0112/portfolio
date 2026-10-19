import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch-only devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setPos({ x: mouseX, y: mouseY });
    };

    let animFrame;
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      setRingPos({ x: ringX, y: ringY });
      animFrame = requestAnimationFrame(animateRing);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animFrame = requestAnimationFrame(animateRing);

    const handleMouseOver = (e) => {
      const target = e.target.closest("a, button, [role='button'], input, textarea, .cursor-pointer");
      if (target) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Primary Dot Cursor */}
      <div
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none rounded-full bg-accent mix-blend-exclusion z-[9999] transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 ${
          isHovered ? "w-5 h-5" : "w-2.5 h-2.5"
        }`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
        }}
      />
      {/* Trailing Ring Cursor */}
      <div
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none rounded-full border border-accent mix-blend-exclusion z-[9998] transition-all duration-150 ease-out -translate-x-1/2 -translate-y-1/2 ${
          isHovered ? "w-14 h-14 opacity-90 scale-110" : "w-9 h-9 opacity-50"
        }`}
        style={{
          transform: `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`,
        }}
      />
    </>
  );
}
