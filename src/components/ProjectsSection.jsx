import React from "react";
import { ArrowUpRight, RefreshCw, Sparkles } from "lucide-react";
import useGitHubProjects from "../hooks/useGitHubProjects";

export default function ProjectsSection() {
  const { projects, loading, isFallback } = useGitHubProjects();

  return (
    <section id="projects" className="py-24 max-w-7xl mx-auto px-6 md:px-12 border-t border-border">
      {/* Section Subtitle & Live Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <span className="text-accent font-mono text-xs uppercase tracking-[0.25em]">
            // 04 · WORK
          </span>
          <div className="h-[1px] w-12 bg-border" />
        </div>

        {/* Sync Indicator */}
        <div className="flex items-center gap-2 font-mono text-[11px] text-muted">
          {loading ? (
            <span className="inline-flex items-center gap-1.5 text-accent animate-pulse">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>SYNCING GITHUB REPOS...</span>
            </span>
          ) : isFallback ? (
            <span className="text-muted/80">CURATED ARCHIVE ({projects.length})</span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-muted hover:text-accent transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>LIVE GITHUB SYNC ACTIVE ({projects.length})</span>
            </span>
          )}
        </div>
      </div>

      <h2 className="font-display text-5xl md:text-7xl tracking-wider text-[#F0EDE8] uppercase mb-12">
        FEATURED PROJECTS
      </h2>

      {/* Editorial List View */}
      <div className="divide-y divide-border border-y border-border">
        {projects.map((project) => (
          <a
            key={project.id || project.num}
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group py-8 px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-surface/60 transition-all duration-300 relative cursor-pointer"
          >
            {/* Left Column: Index Number & Title + Details */}
            <div className="flex items-start gap-6 md:gap-10">
              <span className="font-mono text-sm md:text-base text-muted group-hover:text-accent transition-colors pt-1">
                {project.num}
              </span>

              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="font-display text-2xl sm:text-3xl tracking-wide text-[#F0EDE8] group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>

                  {/* AUTO-SYNC badge for dynamically fetched repos */}
                  {project.isDynamic && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest bg-accent/10 border border-accent/40 text-accent font-semibold">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>AUTO-SYNC</span>
                    </span>
                  )}
                </div>

                <p className="text-muted text-sm sm:text-base font-light leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-surface2 border border-border text-[11px] font-mono text-muted tracking-wider uppercase rounded-sm group-hover:border-accent/40 group-hover:text-white transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Link Action */}
            <div className="flex items-center gap-3 self-end md:self-center">
              <span className="hidden sm:inline font-mono text-xs uppercase tracking-wider text-muted group-hover:text-accent transition-colors">
                View Code
              </span>
              <div className="w-10 h-10 rounded-full border border-border group-hover:border-accent flex items-center justify-center text-muted group-hover:text-accent group-hover:bg-accentDim transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
