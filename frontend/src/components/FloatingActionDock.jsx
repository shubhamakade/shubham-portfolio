import React, { useState, useEffect } from 'react';
import { FileDown, Sparkles, Terminal, Volume2, VolumeX, Moon, Sun, ArrowUp, ZapOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import AnimatedIcon from './AnimatedIcon';
import celestialAudio from '../utils/celestialAudio';

export default function FloatingActionDock({ onOpenResume, onWarp, isWarped, onOpenTerminal }) {
  const { isDark, toggleTheme } = useTheme();
  const [isAudioMuted, setIsAudioMuted] = useState(celestialAudio.isMuted);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Only reveal dock when scrolled past hero section so it never occludes hero cards
      setIsVisible(window.scrollY > 280);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleAudio = () => {
    const nextMuted = celestialAudio.toggleMute();
    setIsAudioMuted(nextMuted);
  };

  const scrollToTop = () => {
    celestialAudio.playChime('chime');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          aria-label="Quick Actions"
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 p-1.5 rounded-2xl backdrop-blur-xl border shadow-2xl transition-all duration-300 select-none bg-opacity-80"
        >
          <div className={`flex items-center gap-1.5 px-1 py-0.5 rounded-xl border ${
            isDark 
              ? 'bg-aurora-night/90 border-aurora-violet/30 shadow-glow-violet' 
              : 'bg-white/90 border-slate-200/90 diffuse-ivory-card specular-rim-light'
          }`}>

            {/* 1. Resume Download Button */}
            <button
              onClick={() => {
                celestialAudio.playChime('affirm');
                if (onOpenResume) onOpenResume();
              }}
              className={`px-3 py-2 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1.5 group ${
                isDark
                  ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25 shadow-glow-emerald'
                  : 'bg-emerald-50 border border-emerald-400 text-emerald-800 hover:bg-emerald-100 shadow-sm'
              }`}
              title="Download Official ATS Resume (PDF)"
            >
              <AnimatedIcon icon={FileDown} variant="bounce" color="emerald" size="sm" badge={false} className="text-emerald-400 group-hover:translate-y-0.5 transition-transform" />
              <span className="hidden sm:inline">RESUME</span>
              <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-400 hidden md:inline">
                PDF
              </span>
            </button>

            {/* Divider */}
            <span className="opacity-20 text-xs">|</span>

            {/* 2. Reality Warp <-> Unwrap Trigger */}
            <button
              onClick={() => {
                if (!isWarped) celestialAudio.playChime('warp');
                else celestialAudio.playChime('affirm');
                if (onWarp) onWarp();
              }}
              className={`p-2 rounded-lg transition-all ${
                isWarped
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 shadow-glow-emerald animate-pulse'
                  : isDark
                  ? 'text-amber-400 hover:bg-aurora-violet/20 hover:text-white'
                  : 'text-amber-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
              title={isWarped ? 'Click to Unwrap Reality' : 'Engage Celestial Warp'}
            >
              <AnimatedIcon
                icon={isWarped ? ZapOff : Sparkles}
                variant={isWarped ? 'pulse' : 'spin'}
                color={isWarped ? 'emerald' : 'amber'}
                size="sm"
                badge={false}
              />
            </button>

            {/* 3. Terminal Shortcut */}
            <button
              onClick={() => {
                celestialAudio.playChime('chime');
                if (onOpenTerminal) onOpenTerminal();
              }}
              className={`p-2 rounded-lg transition-all ${
                isDark 
                  ? 'text-slate-300 hover:text-white hover:bg-white/10' 
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Interactive Terminal (` or Ctrl+K)"
            >
              <AnimatedIcon icon={Terminal} variant="wiggle" color="violet" size="sm" badge={false} />
            </button>

            {/* 4. Audio Control */}
            <button
              onClick={handleToggleAudio}
              className={`p-2 rounded-lg transition-all ${
                isDark 
                  ? isAudioMuted 
                    ? 'text-slate-500 hover:text-slate-300' 
                    : 'text-emerald-400 hover:bg-emerald-950/40' 
                  : isAudioMuted 
                  ? 'text-slate-400 hover:text-slate-700' 
                  : 'text-emerald-600 hover:bg-emerald-50'
              }`}
              title={isAudioMuted ? 'Unmute Audio Chimes' : 'Mute Audio Chimes'}
            >
              <AnimatedIcon icon={isAudioMuted ? VolumeX : Volume2} variant="pulse" color="emerald" size="sm" badge={false} />
            </button>

            {/* 5. Quick Theme Switch */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all ${
                isDark 
                  ? 'text-amber-400 hover:bg-amber-400/10' 
                  : 'text-purple-600 hover:bg-purple-50'
              }`}
              title={`Switch to ${isDark ? 'Ivory Atelier' : 'Midnight Aurora'}`}
            >
              <AnimatedIcon icon={isDark ? Sun : Moon} variant="spin" color="amber" size="sm" badge={false} />
            </button>

            {/* 6. Scroll to Top Action */}
            <button
              onClick={scrollToTop}
              className={`p-2 rounded-lg transition-all border ${
                isDark
                  ? 'bg-aurora-card border-white/10 text-slate-300 hover:text-white hover:border-aurora-violet'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
              }`}
              title="Return to Horizon (Scroll to Top)"
            >
              <AnimatedIcon icon={ArrowUp} variant="float" color="violet" size="sm" badge={false} />
            </button>

          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
