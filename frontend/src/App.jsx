import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import LivingBackground from './components/LivingBackground';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import ArchitecturePlayground from './components/ArchitecturePlayground';
import SkillsMatrix from './components/SkillsMatrix';
import TimelineSection from './components/TimelineSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CelestialWarpOverlay from './components/CelestialWarpOverlay';
import ResumeModal from './components/ResumeModal';
import HUDTerminalModal from './components/HUDTerminalModal';
import FloatingActionDock from './components/FloatingActionDock';

function PortfolioContent() {
  const { isDark } = useTheme();
  const [isWarped, setIsWarped] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [terminalModalOpen, setTerminalModalOpen] = useState(false);

  const handleToggleWarp = () => {
    setIsWarped((prev) => !prev);
  };

  // Keyboard shortcut listener: `~` or `Ctrl+K` for terminal, `Esc` to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.key === 'k') || e.key === '`') {
        e.preventDefault();
        setTerminalModalOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setTerminalModalOpen(false);
        setResumeModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`min-h-screen relative overflow-x-hidden transition-colors duration-500 ${
      isDark
        ? 'bg-aurora-night text-slate-100 selection:bg-aurora-violet/30 selection:text-white'
        : 'bg-atelier-ivory text-stone-900 selection:bg-atelier-violet/20 selection:text-atelier-violet'
    }`}>
      {/* Fullscreen Relativistic Celestial Warp <-> Unwrap Engine */}
      <CelestialWarpOverlay active={isWarped} onToggle={handleToggleWarp} />

      {/* Living Animated Dual-Theme Canvas Background */}
      <LivingBackground />

      {/* Interactive 60FPS Micro Cursor with Comet Dust */}
      <CustomCursor />

      {/* Navigation Header with Theme Toggle, Audio, Resume & Warp State */}
      <Navbar
        onWarp={handleToggleWarp}
        isWarped={isWarped}
        onOpenResume={() => setResumeModalOpen(true)}
        onOpenTerminal={() => setTerminalModalOpen(true)}
      />

      {/* Main Content Experience */}
      <main className="relative z-10">
        <HeroSection
          onWarp={handleToggleWarp}
          isWarped={isWarped}
          onOpenResume={() => setResumeModalOpen(true)}
          onOpenTerminal={() => setTerminalModalOpen(true)}
        />
        <AboutSection />
        <ProjectsSection />
        <ArchitecturePlayground />
        <SkillsMatrix />
        <TimelineSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Floating Action Dock for Instant Control */}
      <FloatingActionDock
        onOpenResume={() => setResumeModalOpen(true)}
        onWarp={handleToggleWarp}
        isWarped={isWarped}
        onOpenTerminal={() => setTerminalModalOpen(true)}
      />

      {/* Interactive Official Resume Modal with Instant Download */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      {/* Cyber HUD Terminal Modal */}
      <HUDTerminalModal
        isOpen={terminalModalOpen}
        onClose={() => setTerminalModalOpen(false)}
        onWarp={handleToggleWarp}
        onOpenResume={() => setResumeModalOpen(true)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
}
