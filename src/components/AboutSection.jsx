import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Award, FolderGit2, Cpu, GraduationCap } from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS } from "../data/portfolioData";

function StatCounter({ target, suffix, label }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1400; // ms
          const start = Date.now();

          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div
      ref={elementRef}
      className="p-6 bg-surface border border-border rounded-sm hover:border-accent/50 transition-colors flex flex-col justify-between group"
    >
      <div className="flex items-baseline gap-1">
        <span className="font-display text-5xl md:text-6xl text-[#F0EDE8] group-hover:text-accent transition-colors">
          {count}
        </span>
        <span className="font-display text-3xl text-accent">{suffix}</span>
      </div>
      <div className="font-mono text-xs uppercase tracking-wider text-muted mt-2">
        {label}
      </div>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
      {/* Section Subtitle Tag */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-accent font-mono text-xs uppercase tracking-[0.25em]">
          // 01 · ABOUT
        </span>
        <div className="h-[1px] w-12 bg-border" />
      </div>

      <h2 className="font-display text-5xl md:text-7xl tracking-wider text-[#F0EDE8] uppercase mb-12">
        WHO I AM
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Narrative */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-[#F0EDE8]/85 font-light leading-relaxed text-base sm:text-lg">
          <p>
            I'm a motivated{" "}
            <strong className="text-white font-medium">
              B.Tech graduate in Artificial Intelligence and Data Science
            </strong>{" "}
            with hands-on experience in developing and deploying AI-powered and cloud-native applications.
          </p>
          <p>
            Skilled in{" "}
            <strong className="text-accent font-medium">
              Computer Vision, NLP, Multimodal AI, and Python full-stack development
            </strong>
            , with practical expertise in AWS services including Lambda, S3, and RDS.
          </p>
          <p>
            Passionate about building scalable, production-ready solutions and contributing to innovative AI and cloud technologies.
          </p>
          <p className="text-muted text-sm font-mono">
            Active on community platforms sharing code &amp; weights:
          </p>

          {/* Social Pills */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={SOCIAL_LINKS.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-surface2 border border-border text-xs font-mono uppercase tracking-wider text-[#F0EDE8] hover:border-accent hover:text-accent transition-all rounded-sm"
            >
              <span>{SOCIAL_LINKS.linkedin.label}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href={SOCIAL_LINKS.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-surface2 border border-border text-xs font-mono uppercase tracking-wider text-[#F0EDE8] hover:border-accent hover:text-accent transition-all rounded-sm"
            >
              <span>{SOCIAL_LINKS.github.label}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href={SOCIAL_LINKS.huggingface.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-surface2 border border-border text-xs font-mono uppercase tracking-wider text-[#F0EDE8] hover:border-accent hover:text-accent transition-all rounded-sm"
            >
              <span>{SOCIAL_LINKS.huggingface.label}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right Stats Grid */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          {PERSONAL_INFO.stats.map((stat) => (
            <StatCounter
              key={stat.label}
              target={stat.target}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
