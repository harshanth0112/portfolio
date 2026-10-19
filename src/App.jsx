import React, { useState } from "react";
import CustomCursor from "./components/CustomCursor";
import ScrollProgressBar from "./components/ScrollProgressBar";
import SplashScreen from "./components/SplashScreen";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import MarqueeTicker from "./components/MarqueeTicker";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import CertificationsSection from "./components/CertificationsSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";

export default function App() {
  const [splashFinished, setSplashFinished] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-bg text-[#F0EDE8] selection:bg-accent selection:text-black font-body">
      {/* Editorial Custom Cursor */}
      <CustomCursor />

      {/* Top Scroll Indicator */}
      <ScrollProgressBar />

      {/* Animated Splash Screen */}
      {!splashFinished && (
        <SplashScreen onComplete={() => setSplashFinished(true)} />
      )}

      {/* Navigation */}
      <Navbar />

      {/* Main Page Sections */}
      <main>
        <HeroSection />
        <MarqueeTicker />
        <AboutSection />
        <SkillsSection />
        <CertificationsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* Footer with Admin Trigger */}
      <Footer onOpenAdmin={() => setAdminOpen(true)} />

      {/* Admin Control Panel Modal */}
      <AdminPanel isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
    </div>
  );
}
