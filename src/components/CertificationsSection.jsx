import React, { useState } from "react";
import { CERTIFICATES } from "../data/portfolioData";
import { ArrowUpRight, Award, Search } from "lucide-react";
import CertificateModal from "./CertificateModal";

export default function CertificationsSection() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Cloud", "Generative AI", "Full Stack", "AI & Cloud", "Programming", "Workshops"];

  const filteredCerts = CERTIFICATES.filter((cert) => {
    const matchesCategory =
      selectedCategory === "All" ||
      cert.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="certifications" className="py-24 max-w-7xl mx-auto px-6 md:px-12 border-t border-border">
      {/* Section Subtitle */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-accent font-mono text-xs uppercase tracking-[0.25em]">
          // 03 · ACHIEVEMENTS
        </span>
        <div className="h-[1px] w-12 bg-border" />
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="font-display text-5xl md:text-7xl tracking-wider text-[#F0EDE8] uppercase">
            CERTIFICATIONS
          </h2>
          <p className="font-mono text-xs text-muted mt-2">
            Click any certificate card to inspect verified credentials.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search certs or issuer..."
            aria-label="Search certificates by title or issuer"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface2 border border-border focus:border-accent text-xs font-mono py-2.5 pl-9 pr-3 text-[#F0EDE8] rounded-sm focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Certificate categories">
        {categories.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={selectedCategory === cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-sm transition-all cursor-pointer ${
              selectedCategory === cat
                ? "bg-accent text-black font-semibold shadow-[0_0_12px_rgba(200,255,0,0.3)]"
                : "bg-surface2 text-muted hover:text-white border border-border"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Certificates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCerts.map((cert) => (
          <div
            key={cert.id}
            onClick={() => setSelectedCert(cert)}
            className="group p-5 bg-surface border border-border hover:border-accent transition-all duration-300 rounded-sm cursor-pointer flex flex-col justify-between relative overflow-hidden"
          >
            {/* Corner accent glow */}
            <div className="absolute top-0 right-0 w-8 h-8 bg-accent/5 rounded-bl-full group-hover:bg-accent/20 transition-colors" />

            <div>
              <div className="flex items-center justify-between text-muted text-xs font-mono uppercase tracking-wider mb-2">
                <span className="truncate pr-2">{cert.issuer}</span>
                <span className="text-[10px] text-muted/70 flex-shrink-0">{cert.date}</span>
              </div>

              <h3 className="font-body font-medium text-base text-[#F0EDE8] group-hover:text-accent transition-colors leading-snug line-clamp-2">
                {cert.title}
              </h3>
            </div>

            <div className="mt-6 pt-3 border-t border-border/60 flex items-center justify-between">
              <span className="text-[11px] font-mono text-muted group-hover:text-[#F0EDE8] transition-colors">
                View Proof
              </span>
              <span className="text-muted group-hover:text-accent transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredCerts.length === 0 && (
        <div className="text-center py-16 text-muted font-mono text-sm">
          No certificates matched your criteria.
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedCert && (
        <CertificateModal
          certificate={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </section>
  );
}
