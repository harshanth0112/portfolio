import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import confetti from "canvas-confetti";
import { ArrowUpRight, CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS, EMAILJS_CONFIG } from "../data/portfolioData";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#C8FF00", "#FFFFFF", "#181818"],
      });
    } catch (_) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please complete all required fields.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateId || !EMAILJS_CONFIG.publicKey) {
      setStatus("error");
      setErrorMessage("Contact service is not configured. Please set EmailJS keys in .env or contact via LinkedIn.");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const templateParams = {
        from_name: formData.name.trim(),
        from_email: formData.email.trim(),
        message: formData.message.trim(),
      };

      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams,
        EMAILJS_CONFIG.publicKey
      );

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      triggerConfetti();

      // Reset success message after 7 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 7000);
    } catch (err) {
      console.error("Email send error:", err);
      setStatus("error");
      setErrorMessage("Failed to send message. Please reach out via LinkedIn or direct email.");
    }
  };

  return (
    <section id="contact" className="py-24 max-w-7xl mx-auto px-6 md:px-12 border-t border-border">
      {/* Section Subtitle */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-accent font-mono text-xs uppercase tracking-[0.25em]">
          // 05 · LET'S TALK
        </span>
        <div className="h-[1px] w-12 bg-border" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
        
        {/* Left Column: Contact Editorial */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <h2 className="font-display text-6xl sm:text-7xl md:text-8xl tracking-tight text-[#F0EDE8] uppercase leading-[0.9] mb-6">
              GET IN <br />
              <span className="text-accent">TOUCH</span>
            </h2>

            <p className="text-muted text-base sm:text-lg font-light leading-relaxed max-w-sm mb-8">
              {PERSONAL_INFO.contactSub}
            </p>
          </div>

          {/* Contact Direct Links */}
          <div className="flex flex-col gap-3 font-mono text-xs uppercase">
            <a
              href={SOCIAL_LINKS.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-surface border border-border hover:border-accent flex items-center justify-between rounded-sm transition-all"
            >
              <span className="text-muted group-hover:text-white transition-colors">LinkedIn</span>
              <span className="text-[#F0EDE8] group-hover:text-accent flex items-center gap-1 transition-colors">
                {SOCIAL_LINKS.linkedin.username}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </a>

            <a
              href={SOCIAL_LINKS.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-surface border border-border hover:border-accent flex items-center justify-between rounded-sm transition-all"
            >
              <span className="text-muted group-hover:text-white transition-colors">GitHub</span>
              <span className="text-[#F0EDE8] group-hover:text-accent flex items-center gap-1 transition-colors">
                {SOCIAL_LINKS.github.username}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </a>

            <a
              href={SOCIAL_LINKS.huggingface.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-surface border border-border hover:border-accent flex items-center justify-between rounded-sm transition-all"
            >
              <span className="text-muted group-hover:text-white transition-colors">Hugging Face</span>
              <span className="text-[#F0EDE8] group-hover:text-accent flex items-center gap-1 transition-colors">
                {SOCIAL_LINKS.huggingface.username}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </a>

            <div className="p-4 bg-surface border border-border flex items-center justify-between rounded-sm">
              <span className="text-muted">Phone</span>
              <span className="text-[#F0EDE8]">{SOCIAL_LINKS.phone.value}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-surface p-6 sm:p-10 border border-border rounded-sm shadow-xl relative">
          
          {/* Success Banner */}
          {status === "success" && (
            <div
              role="status"
              aria-live="polite"
              className="mb-6 p-4 bg-accent/10 border border-accent rounded text-accent flex items-center gap-3 animate-fadeIn"
            >
              <CheckCircle2 className="w-6 h-6 flex-shrink-0" aria-hidden="true" />
              <div>
                <h4 className="font-display text-lg tracking-wider">Message Sent Successfully!</h4>
                <p className="text-xs font-mono text-[#F0EDE8]">
                  Thank you for reaching out. Harshanth will get back to you shortly.
                </p>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {status === "error" && (
            <div
              role="alert"
              aria-live="assertive"
              className="mb-6 p-4 bg-red-500/10 border border-red-500/60 rounded text-red-400 flex items-center gap-3 animate-fadeIn"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              <p className="text-xs font-mono">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-muted mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Alex Mercer"
                required
                className="w-full bg-surface2 border border-border focus:border-accent text-sm font-body px-4 py-3.5 text-[#F0EDE8] rounded-sm focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-muted mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. alex@company.com"
                required
                className="w-full bg-surface2 border border-border focus:border-accent text-sm font-body px-4 py-3.5 text-[#F0EDE8] rounded-sm focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-muted mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project, role, or ideas..."
                required
                className="w-full bg-surface2 border border-border focus:border-accent text-sm font-body px-4 py-3.5 text-[#F0EDE8] rounded-sm focus:outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-black font-mono text-xs uppercase tracking-[0.2em] font-semibold rounded-sm hover:shadow-[0_0_20px_rgba(200,255,0,0.5)] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Transmitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
