import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Volume2, VolumeX, FileDown, ZapOff, Zap, ExternalLink, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import celestialAudio from '../utils/celestialAudio';

export default function Navbar({ onWarp, isWarped, onOpenResume, onOpenTerminal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [currentTime, setCurrentTime] = useState('');
  const [isAudioMuted, setIsAudioMuted] = useState(celestialAudio.isMuted);
  const { isDark } = useTheme();

  // Scroll listener for sticky header styling and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Active section detection
      const sections = ['hero', 'architecture', 'projects', 'skills', 'timeline', 'contact'];
      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Indian Standard Time clock
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setCurrentTime(`${timeStr} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const handleToggleAudio = () => {
    const nextMuted = celestialAudio.toggleMute();
    setIsAudioMuted(nextMuted);
  };

  const handleWarpTrigger = () => {
    if (!isWarped) celestialAudio.playChime('warp');
    else celestialAudio.playChime('affirm');
    if (onWarp) onWarp();
  };

  const handleNavClick = (e, targetId) => {
    if (e) e.preventDefault();
    celestialAudio.playChime('chime');
    setMobileMenuOpen(false);

    const targetMap = {
      'home': 'hero',
      'about': 'architecture',
      'experience': 'timeline',
    };
    const finalId = targetMap[targetId] || targetId;

    setTimeout(() => {
      const el = document.getElementById(finalId) || document.getElementById(targetId);
      if (el) {
        const headerOffset = 70;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
        window.history.pushState(null, '', `#${targetId}`);
        setActiveSection(finalId);
      }
    }, 100);
  };

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'architecture', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'timeline', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      {/* 1. Slim Minimalist Telemetry Ticker */}
      <div className={`hidden md:flex justify-between items-center px-4 sm:px-6 lg:px-8 py-1 text-[11px] font-mono tracking-wider z-50 relative border-b transition-colors duration-300 ${
        isDark
          ? 'bg-aurora-night/95 border-white/5 text-slate-400'
          : 'bg-slate-100/80 border-slate-200/60 text-slate-600'
      }`}>
        <div className="max-w-[1280px] w-full mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className={`flex items-center gap-1.5 font-semibold ${isDark ? 'text-aurora-lavender' : 'text-atelier-violet'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-aurora-violet' : 'bg-atelier-violet'} animate-pulse`} />
              PUNE, INDIA // {personalInfo.coordinates}
            </span>
            <span className="opacity-30">•</span>
            <span className={`font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{currentTime}</span>
          </div>

          <div className="flex items-center gap-3.5">
            <span className={`flex items-center gap-1.5 font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-emerald-400' : 'bg-emerald-600'}`} />
              ACID INTEGRITY: 100%
            </span>
            <span className="opacity-30">•</span>
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:underline flex items-center gap-1 transition-colors hover:text-aurora-lavender"
            >
              <span>LinkedIn</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
            </a>
            <span className="opacity-30">•</span>
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noreferrer"
              className="hover:underline flex items-center gap-1 transition-colors hover:text-aurora-lavender"
            >
              <span>GitHub</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Architectural Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 radiant-hairline-track ${
          scrolled
            ? isDark
              ? 'bg-aurora-night/90 backdrop-blur-xl border-b border-aurora-violet/20 shadow-2xl py-2.5'
              : 'bg-white/85 backdrop-blur-2xl border-b border-slate-200/90 diffuse-ivory-card specular-rim-light py-2.5'
            : isDark
            ? 'bg-aurora-night/60 backdrop-blur-md border-b border-white/5 py-3'
            : 'bg-white/70 backdrop-blur-xl border-b border-slate-200/60 py-3'
        }`}
      >
        <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 lg:gap-3 xl:gap-4">
          
          {/* Identity Monolith: Elegant SA Logo + Name + Role */}
          <a href="#hero" className="flex items-center gap-2.5 sm:gap-3 group shrink-0 select-none">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm tracking-tight transition-all duration-300 shadow-sm dynamic-border-beam ${
              isDark
                ? 'bg-gradient-to-br from-aurora-card to-aurora-night border border-aurora-violet/40 text-aurora-lavender group-hover:border-aurora-violet group-hover:shadow-glow-violet'
                : 'bg-gradient-to-br from-white to-slate-100 border border-slate-300 text-atelier-violet group-hover:border-atelier-violet group-hover:shadow-glow-atelier'
            }`}>
              <span>SA</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className={`font-display font-extrabold text-sm sm:text-base tracking-tight whitespace-nowrap transition-colors ${
                  isDark ? 'text-white group-hover:text-aurora-lavender' : 'text-slate-900 group-hover:text-atelier-violet'
                }`}>
                  SHUBHAM AKADE
                </span>
                <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-emerald-400' : 'bg-emerald-500'} animate-pulse`} title="Available for Architectural Roles" />
              </div>
              <span className={`text-[9px] sm:text-[10px] font-mono tracking-wider uppercase whitespace-nowrap transition-colors ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Java Full Stack Architect
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links with Animated Active Indicator */}
          <nav className={`hidden lg:flex items-center gap-0.5 xl:gap-1 p-1 rounded-full border backdrop-blur-md transition-colors ${
            isDark
              ? 'bg-aurora-card/40 border-white/5'
              : 'bg-slate-100/80 border-slate-200/80'
          }`}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`relative px-2.5 xl:px-4 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide transition-colors duration-200 select-none ${
                    isActive
                      ? isDark
                        ? 'text-white font-semibold'
                        : 'text-slate-900 font-semibold'
                      : isDark
                      ? 'text-slate-400 hover:text-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbarActiveIndicator"
                      className={`absolute inset-0 rounded-full ${
                        isDark
                          ? 'bg-aurora-card border border-aurora-violet/50 shadow-glow-violet'
                          : 'bg-white border border-slate-300 shadow-sm'
                      }`}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Desktop Right Actions Area (Consistent heights, balanced spacing) */}
          <div className="hidden sm:flex items-center gap-1.5 xl:gap-2 shrink-0">
            
            {/* Warp <-> Unwrap Mode Toggle */}
            <button
              onClick={handleWarpTrigger}
              className={`h-9 px-2.5 xl:px-3 rounded-lg border text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
                isWarped
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-glow-emerald'
                  : isDark
                  ? 'bg-aurora-card/60 border-white/10 text-slate-300 hover:border-aurora-violet hover:text-white'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-atelier-violet hover:text-slate-900 shadow-sm'
              }`}
              title={isWarped ? 'Unwrap relativistic warp and restore standard universe' : 'Engage relativistic warp mode'}
            >
              {isWarped ? (
                <>
                  <ZapOff className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[11px] hidden xl:inline">UNWRAP</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[11px] hidden xl:inline">WARP</span>
                </>
              )}
            </button>

            {/* Audio Toggle Button */}
            <button
              onClick={handleToggleAudio}
              aria-label={isAudioMuted ? 'Enable Audio Chimes' : 'Mute Audio Chimes'}
              title={isAudioMuted ? 'Enable Ethereal Chimes' : 'Mute Audio'}
              className={`h-9 w-9 rounded-lg border flex items-center justify-center transition-all ${
                isDark
                  ? isAudioMuted
                    ? 'bg-aurora-card/60 border-white/10 text-slate-400 hover:text-white hover:border-aurora-violet/40'
                    : 'bg-aurora-card border-aurora-violet/50 text-emerald-400 shadow-glow-violet'
                  : isAudioMuted
                  ? 'bg-white border-slate-200 text-slate-500 hover:text-slate-900'
                  : 'bg-white border-atelier-violet/40 text-emerald-600 shadow-glow-atelier'
              }`}
            >
              {isAudioMuted ? (
                <VolumeX className="w-4 h-4 opacity-70" />
              ) : (
                <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
              )}
            </button>

            {/* Theme Switcher Toggle */}
            <ThemeToggle className="h-9 px-2.5 xl:px-3 rounded-lg" />

            {/* Interactive Terminal Button */}
            <button
              onClick={() => {
                celestialAudio.playChime('chime');
                if (onOpenTerminal) onOpenTerminal();
              }}
              className={`h-9 px-2.5 xl:px-3 rounded-lg border font-mono text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isDark
                  ? 'bg-aurora-card/60 border-white/10 text-slate-300 hover:border-aurora-violet hover:text-white'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:text-slate-900 shadow-sm'
              }`}
              title="Launch Cyber HUD Terminal (Ctrl+K or `)"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden xl:inline">TERMINAL</span>
            </button>

            {/* Primary Resume Download Button */}
            <button
              onClick={() => {
                celestialAudio.playChime('affirm');
                if (onOpenResume) onOpenResume();
              }}
              className={`h-9 px-3 sm:px-3.5 rounded-lg border text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-sm group shrink-0 ${
                isDark
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/60 hover:border-emerald-300 shadow-glow-emerald'
                  : 'bg-emerald-600 border-emerald-700 text-white hover:bg-emerald-700 shadow-md'
              }`}
              title="Download Official ATS-Compliant Resume (PDF 93KB)"
            >
              <FileDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              <span>RESUME</span>
              <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${
                isDark ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-800 text-emerald-100'
              }`}>
                PDF
              </span>
            </button>

          </div>

          {/* Mobile Right Controls: Theme Toggle & Menu (Spacious, zero crowding) */}
          <div className="flex sm:hidden items-center gap-2 shrink-0">
            <ThemeToggle className="h-9 w-9 p-0 rounded-lg" />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`h-9 w-9 rounded-lg border flex items-center justify-center transition-colors ${
                isDark
                  ? 'bg-aurora-card border-white/10 text-slate-300 hover:text-white'
                  : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className={`lg:hidden border-t overflow-hidden transition-colors ${
                isDark
                  ? 'bg-aurora-night/95 border-aurora-violet/20'
                  : 'bg-white/95 border-slate-200 shadow-xl'
              }`}
            >
              <div className="px-4 py-5 space-y-4 max-w-[1280px] w-full mx-auto">
                
                {/* Prominent Full-Width Resume Download CTA */}
                <button
                  onClick={() => {
                    celestialAudio.playChime('affirm');
                    if (onOpenResume) onOpenResume();
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full py-3 px-4 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm ${
                    isDark
                      ? 'bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 shadow-glow-emerald'
                      : 'bg-emerald-600 border border-emerald-700 text-white shadow-md'
                  }`}
                >
                  <FileDown className="w-4 h-4" />
                  <span>DOWNLOAD OFFICIAL RESUME (PDF 93KB)</span>
                </button>

                {/* 6 Core Navigation Destinations with Living Dynamic Colors */}
                <nav className="flex flex-col space-y-1.5">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.id;
                    return (
                      <a
                        key={link.id}
                        href={`#${link.id}`}
                        onClick={(e) => handleNavClick(e, link.id)}
                        className={`relative px-4 py-3 rounded-xl font-mono text-sm font-semibold transition-all flex items-center justify-between overflow-hidden ${
                          isActive
                            ? isDark
                              ? 'dynamic-selected-skill border-2 border-violet-400/80 shadow-[0_8px_25px_rgba(167,139,250,0.35)] pl-5'
                              : 'dynamic-selected-skill border-2 border-violet-600 shadow-md pl-5 text-slate-900'
                            : isDark
                            ? 'text-slate-300 hover:bg-white/[0.06] border border-transparent pl-4'
                            : 'text-slate-700 hover:bg-slate-50 border border-transparent pl-4'
                        }`}
                      >
                        {/* Dynamic Sweeping Sheen on Active Mobile Link */}
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 pointer-events-none z-0"
                            initial={{ x: '-150%' }}
                            animate={{ x: '250%' }}
                            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', repeatDelay: 1 }}
                          >
                            <div className={`w-1/2 h-full skew-x-12 ${
                              isDark ? 'bg-gradient-to-r from-transparent via-white/15 to-transparent' : 'bg-gradient-to-r from-transparent via-white/45 to-transparent'
                            }`} />
                          </motion.div>
                        )}

                        {/* Rounded Left Conduit Indicator */}
                        {isActive && (
                          <div className={`absolute left-0 top-2.5 bottom-2.5 w-1.5 rounded-r-full z-20 ${
                            isDark
                              ? 'bg-gradient-to-b from-cyan-400 via-violet-400 to-rose-400 shadow-[0_0_10px_#38BDF8]'
                              : 'bg-gradient-to-b from-violet-600 via-indigo-600 to-cyan-500 shadow-[0_0_10px_rgba(124,58,237,0.8)]'
                          } animate-pulse`} />
                        )}

                        <span className={`relative z-10 ${
                          isActive
                            ? isDark ? 'text-white font-black' : 'text-slate-900 font-black'
                            : ''
                        }`}>
                          {link.label}
                        </span>

                        {/* Animated Radar Beacon on Active Link */}
                        {isActive ? (
                          <div className="relative flex items-center justify-center w-5 h-5 z-10">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-65 ${
                              isDark ? 'bg-cyan-400' : 'bg-violet-400'
                            }`} />
                            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                              isDark ? 'bg-cyan-300 shadow-[0_0_8px_#38BDF8]' : 'bg-violet-600 shadow-[0_0_8px_#7C3AED]'
                            }`} />
                            <span className={`absolute inset-0 rounded-full border ${
                              isDark ? 'border-cyan-400/40' : 'border-violet-500/40'
                            }`} />
                          </div>
                        ) : (
                          <ChevronRight className="w-4 h-4 opacity-30 text-slate-400" />
                        )}
                      </a>
                    );
                  })}
                </nav>

                {/* Mobile Drawer Quick Action Controls */}
                <div className="pt-3 border-t border-current/10 grid grid-cols-2 gap-2 font-mono text-xs">
                  <button
                    onClick={() => {
                      handleWarpTrigger();
                      setMobileMenuOpen(false);
                    }}
                    className={`p-2.5 rounded-lg border text-center font-bold flex items-center justify-center gap-1.5 ${
                      isWarped
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                        : isDark
                        ? 'bg-aurora-card border-white/10 text-slate-300'
                        : 'bg-slate-100 border-slate-200 text-slate-800'
                    }`}
                  >
                    {isWarped ? <ZapOff className="w-3.5 h-3.5 text-emerald-400" /> : <Zap className="w-3.5 h-3.5 text-amber-400" />}
                    <span>{isWarped ? 'UNWRAP' : 'WARP'}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (onOpenTerminal) onOpenTerminal();
                      setMobileMenuOpen(false);
                    }}
                    className={`p-2.5 rounded-lg border text-center font-bold flex items-center justify-center gap-1.5 ${
                      isDark ? 'bg-aurora-card border-white/10 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-800'
                    }`}
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>TERMINAL</span>
                  </button>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] font-mono opacity-70">
                  <span>SHUBHAM AKADE • PUNE</span>
                  <span>ACID INTEGRITY: 100%</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </header>
    </>
  );
}
