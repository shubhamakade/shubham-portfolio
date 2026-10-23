import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Terminal, Layers, Zap, ChevronDown, Sparkles, FileDown, ZapOff, Network, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import CelestialPortal3D from './CelestialPortal3D';
import DecryptedText from './DecryptedText';
import SpotlightCard from './SpotlightCard';
import MagneticButton from './MagneticButton';
import AnimatedCount from './AnimatedCount';
import AnimatedIcon from './AnimatedIcon';
import celestialAudio from '../utils/celestialAudio';

export default function HeroSection({ onWarp, isWarped, onOpenResume, onOpenTerminal }) {
  const { isDark } = useTheme();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      const handler = (e) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  // Continuous subtle floating kinematics for the 4 statistic cards
  // Distinct natural harmonic frequencies and phase delays prevent rigid synchronous motion
  const cardFloatProfiles = [
    { yDelta: -8, duration: 3.2, delay: 0 },
    { yDelta: -6.5, duration: 4.0, delay: 0.75 },
    { yDelta: -8.5, duration: 3.6, delay: 1.4 },
    { yDelta: -7, duration: 4.3, delay: 0.35 },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-4.5rem)] flex flex-col justify-start pt-3 sm:pt-6 pb-6 px-4 sm:px-6 lg:px-8 max-w-[1280px] w-full mx-auto overflow-visible"
    >
      <div className="w-full py-2 sm:py-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-center overflow-visible">
          
          {/* Left Column: Architectural Dossier (Balanced proportion) */}
          <div className="col-span-1 lg:col-span-6 flex flex-col gap-3 sm:gap-3.5 z-10 w-full min-w-0">
            
            {/* Real Status Badge */}
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] sm:text-xs font-mono tracking-wider border backdrop-blur-xl transition-colors ${
                isDark
                  ? 'bg-aurora-card/60 border-aurora-violet/30 text-aurora-lavender'
                  : 'bg-white/80 border-stone-300 text-stone-800 shadow-sm'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>JAVA DEVELOPER @ EPPS INFOTECH // PUNE, INDIA // {personalInfo.coordinates}</span>
              </span>
            </div>

            {/* Kinetic Decrypted Typographic Monument */}
            <div className="space-y-1">
              <div className="font-mono text-[10px] sm:text-xs tracking-widest uppercase opacity-60 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>PORTFOLIO OF</span>
              </div>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl tracking-tight leading-[0.92]">
                <DecryptedText
                  text="SHUBHAM"
                  className={`block transition-colors ${
                    isDark ? 'text-white' : 'text-stone-900'
                  }`}
                  speed={38}
                  replayEveryMs={4500}
                />
                <DecryptedText
                  text="AKADE."
                  className={`block transition-colors ${
                    isDark ? 'text-aurora-lavender' : 'text-atelier-violet'
                  }`}
                  speed={45}
                  replayEveryMs={4500}
                />
              </h1>
            </div>

            {/* Sub-headline: Pure Authenticity with Chromatic Shimmer */}
            <div className="flex items-center gap-2.5">
              <div className={`h-[2px] w-8 sm:w-10 ${isDark ? 'bg-aurora-violet' : 'bg-atelier-violet'}`} />
              <p className="font-mono text-xs sm:text-sm tracking-wider uppercase font-extrabold text-shimmer-aurora">
                JAVA FULL STACK DEVELOPER & SYSTEMS ENGINEER
              </p>
            </div>

            {/* Narrative Bio */}
            <p className={`text-xs sm:text-[13px] lg:text-sm leading-snug sm:leading-relaxed max-w-xl font-sans ${
              isDark ? 'text-slate-300' : 'text-stone-700'
            }`}>
              Specialized in high-concurrency enterprise backends engineered in{' '}
              <strong className={isDark ? 'text-aurora-lavender' : 'text-atelier-violet'}>
                Java 17 & Spring Boot 3
              </strong>{' '}
              with zero-data-loss ACID guarantees, paired with responsive{' '}
              <strong className={isDark ? 'text-sky-300' : 'text-rose-600'}>
                React 18
              </strong>{' '}
              interfaces and GraphQL mobile endpoints. Core engineer on the{' '}
              <strong>EPPS Enterprise ERP (MMS, FAMS, PQMS)</strong> and{' '}
              <strong>EPPS Smart Mobile ERP</strong>.
            </p>

            {/* Action Buttons Hub with Tactile Magnetic Pull & Interactive Chimes */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {/* Primary: Magnetic Resume Download Button */}
              <MagneticButton>
                <button
                  onClick={() => {
                    celestialAudio.playChime('affirm');
                    if (onOpenResume) onOpenResume();
                  }}
                  className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg font-mono text-[11px] sm:text-xs uppercase tracking-wider font-extrabold border transition-all flex items-center gap-2 group relative overflow-hidden shadow-lg ${
                    isDark
                      ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/25 hover:border-emerald-400 shadow-glow-emerald'
                      : 'bg-emerald-50 border-emerald-500 text-emerald-800 hover:bg-emerald-100 shadow-sm'
                  }`}
                  title="Download Official ATS-Compliant Resume (PDF, 93 KB)"
                >
                  <FileDown className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-y-0.5 transition-transform animate-bounce" style={{ animationDuration: '2.5s' }} />
                  <span>RESUME (ATS PDF)</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                    93KB
                  </span>
                </button>
              </MagneticButton>

              {/* Secondary: Magnetic Flagship Projects Link */}
              <MagneticButton>
                <a
                  href="#projects"
                  onClick={() => celestialAudio.playChime('affirm')}
                  className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg font-mono text-[11px] sm:text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 group ${
                    isDark
                      ? 'bg-aurora-violet text-aurora-night hover:bg-white shadow-glow-violet'
                      : 'bg-atelier-violet text-white hover:bg-stone-900 shadow-glow-atelier'
                  }`}
                >
                  <span>EXPLORE ERP SUITE [FLAGSHIP]</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </MagneticButton>

              {/* Stateful Magnetic Warp <-> Unwrap Button */}
              <MagneticButton>
                <button
                  onClick={() => {
                    if (!isWarped) celestialAudio.playWarpSweep();
                    else celestialAudio.playChime('affirm');
                    if (onWarp) onWarp();
                  }}
                  className={`px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-lg font-mono text-[11px] sm:text-xs uppercase tracking-wider font-extrabold border transition-all flex items-center gap-2 shadow-lg group ${
                    isWarped
                      ? isDark
                        ? 'bg-gradient-to-r from-emerald-950 via-teal-900 to-cyan-950 text-emerald-300 border-emerald-400 shadow-glow-emerald animate-pulse'
                        : 'bg-gradient-to-r from-emerald-100 via-teal-100 to-cyan-100 text-emerald-900 border-emerald-600 shadow-md'
                      : isDark
                      ? 'bg-gradient-to-r from-purple-900/70 via-aurora-violet/30 to-indigo-900/70 text-white border-aurora-violet/60 hover:border-white shadow-glow-violet'
                      : 'bg-gradient-to-r from-purple-100 via-rose-100 to-amber-100 text-stone-900 border-atelier-violet/40 hover:border-atelier-violet shadow-sm'
                  }`}
                  title={isWarped ? 'Click to unwrap reality and restore normal spacetime' : 'Engage relativistic celestial reality warp'}
                >
                  {isWarped ? (
                    <>
                      <ZapOff className="w-3.5 h-3.5 text-emerald-400" />
                      <span>[⚡ RESTORE]</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                      <span>[⚡ CELESTIAL WARP]</span>
                    </>
                  )}
                </button>
              </MagneticButton>

              {/* Interactive Magnetic Terminal Button */}
              <MagneticButton>
                <button
                  onClick={() => {
                    celestialAudio.playChime('chime');
                    if (onOpenTerminal) onOpenTerminal();
                  }}
                  className={`px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-lg font-mono text-[11px] sm:text-xs border backdrop-blur-xl transition-all flex items-center gap-2 ${
                    isDark
                      ? 'bg-aurora-card/50 text-slate-300 border-white/10 hover:text-white hover:border-aurora-violet'
                      : 'bg-stone-100 text-stone-700 border-stone-200 hover:text-stone-900'
                  }`}
                  title="Open Interactive Cyber HUD Terminal"
                >
                  <Terminal className={`w-3.5 h-3.5 ${isDark ? 'text-sky-300' : 'text-rose-600'}`} />
                  <span>CLI TERMINAL</span>
                </button>
              </MagneticButton>
            </div>

          </div>

          {/* Right Column: Celestial Portal 3D Monolith (Balanced 50% proportion) */}
          <div className="col-span-1 lg:col-span-6 flex justify-center items-center relative overflow-visible py-2 w-full lg:-translate-x-14 xl:translate-x-0">
            <CelestialPortal3D
              onSupernova={() => {
                celestialAudio.playChime('supernova');
              }}
            />
          </div>

          {/* Full-Width Row: Continuously Bouncing & Floating Frosted Glass Statistic Cards */}
          <div className="col-span-1 lg:col-span-12 pt-2.5 sm:pt-3 border-t border-white/10 overflow-visible w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5 lg:gap-3 overflow-visible">
              {personalInfo.metrics.map((m, idx) => {
                const profile = cardFloatProfiles[idx % cardFloatProfiles.length];
                const isDailyMeals = m.value === '12,000+';
                const isLatency = m.value === '<40ms';

                return (
                  <motion.div
                    key={idx}
                    animate={
                      prefersReducedMotion
                        ? { y: 0 }
                        : {
                            y: [0, profile.yDelta, 0],
                          }
                    }
                    transition={
                      prefersReducedMotion
                        ? {}
                        : {
                            duration: profile.duration,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                            delay: profile.delay,
                          }
                    }
                    whileHover={{ scale: 1.03, y: -3 }}
                    className="will-change-transform cursor-default"
                  >
                    <SpotlightCard
                      className={`p-2.5 sm:p-3 xl:p-3.5 rounded-xl border backdrop-blur-2xl transition-all duration-300 ${
                        isDark
                          ? 'bg-aurora-card/45 border-white/10 hover:border-aurora-violet/50 hover:shadow-glow-violet'
                          : 'bg-white/80 border-stone-200 shadow-sm hover:border-atelier-violet/40 hover:shadow-glow-atelier'
                      }`}
                      spotlightColor={isDark ? 'rgba(167, 139, 250, 0.22)' : 'rgba(109, 40, 217, 0.15)'}
                    >
                      <div className={`font-display font-extrabold text-sm sm:text-base lg:text-base xl:text-lg 2xl:text-xl tracking-tight transition-colors flex items-center justify-between ${
                        isDark ? 'text-white group-hover:text-aurora-lavender' : 'text-stone-900 group-hover:text-atelier-violet'
                      }`}>
                        {isDailyMeals ? (
                          <AnimatedCount target={12000} suffix="+" />
                        ) : (
                          <span>{m.value}</span>
                        )}

                        {/* Animated Visual Micro-Telemetry or Waveform */}
                        {isLatency ? (
                          <div className="flex items-end gap-0.5 h-3.5 px-1" title="Real-time P99 Latency Telemetry">
                            <span className="w-[2px] rounded-full bg-emerald-400 waveform-bar-1" />
                            <span className="w-[2px] rounded-full bg-sky-400 waveform-bar-2" />
                            <span className="w-[2px] rounded-full bg-violet-400 waveform-bar-3" />
                            <span className="w-[2px] rounded-full bg-emerald-400 waveform-bar-4" />
                          </div>
                        ) : idx === 0 ? (
                          <AnimatedIcon icon={Layers} variant="float" color="violet" size="sm" badge={false} />
                        ) : idx === 1 ? (
                          <AnimatedIcon icon={Network} variant="radar" color="cyan" size="sm" badge={false} />
                        ) : (
                          <AnimatedIcon icon={ShieldCheck} variant="pulse" color="emerald" size="sm" badge={false} />
                        )}
                      </div>
                      <div className="font-mono text-[8.5px] sm:text-[9.5px] 2xl:text-xs opacity-75 tracking-wider uppercase mt-0.5 font-medium">
                        {m.label}
                      </div>
                      <div className={`font-mono text-[8.5px] sm:text-[9.5px] 2xl:text-xs mt-0.5 font-semibold flex items-center gap-1.5 ${
                        isDark ? 'text-emerald-400' : 'text-emerald-600'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        <span>{m.change}</span>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Refined Animated Scroll Indicator */}
      <div className="w-full flex justify-center pt-1 pb-1">
        <a
          href="#architecture"
          className="inline-flex flex-col items-center gap-0.5 opacity-70 hover:opacity-100 transition-opacity font-mono text-[9px] sm:text-[10px] tracking-widest uppercase group"
        >
          <span>SCROLL TO AUDIT ARCHITECTURE</span>
          <ChevronDown className={`w-3 h-3 animate-bounce ${isDark ? 'text-aurora-violet' : 'text-atelier-violet'}`} />
        </a>
      </div>

    </section>
  );
}
