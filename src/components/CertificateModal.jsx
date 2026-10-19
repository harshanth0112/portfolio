import React, { useEffect } from "react";
import { X, ExternalLink, ShieldCheck } from "lucide-react";
import { getAssetUrl } from "../utils/assetHelper";

export default function CertificateModal({ certificate, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!certificate) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10 cursor-pointer animate-fadeIn"
    >
      {/* Modal Container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cert-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full bg-surface border border-border rounded-lg overflow-hidden flex flex-col max-h-[92vh] shadow-2xl cursor-default"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface2">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-accent" aria-hidden="true" />
            <div>
              <h3 id="cert-modal-title" className="font-display text-lg tracking-wider text-[#F0EDE8]">
                {certificate.title}
              </h3>
              <p className="font-mono text-xs text-muted">
                {certificate.issuer} · {certificate.date}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={getAssetUrl(certificate.image)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted hover:text-accent transition-colors rounded hover:bg-surface3"
              aria-label="Open full certificate image in new tab"
              title="Open full image in new tab"
            >
              <ExternalLink className="w-5 h-5" aria-hidden="true" />
            </a>
            <button
              onClick={onClose}
              className="p-2 text-muted hover:text-accent transition-colors rounded hover:bg-surface3 focus:outline-none"
              aria-label="Close certificate preview"
              title="Close modal (Esc)"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Certificate Image Frame */}
        <div className="p-4 sm:p-6 overflow-auto flex items-center justify-center bg-bg/50">
          <img
            src={getAssetUrl(certificate.image)}
            alt={certificate.title}
            className="max-h-[75vh] w-auto max-w-full object-contain rounded border border-border shadow-md"
          />
        </div>
      </div>
    </div>
  );
}
