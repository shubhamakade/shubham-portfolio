import React from 'react';
import { GitCommit, GitBranch, MapPin, Sparkles, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import { timelineMilestones } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import SpotlightCard from './SpotlightCard';
import AnimatedIcon from './AnimatedIcon';

export default function TimelineSection() {
  const { isDark } = useTheme();

  const commitHashes = [
    { hash: "8f3d1a9", ref: "HEAD -> main, v2.4-enterprise" },
    { hash: "5c207b4", ref: "origin/feature/iot-telemetry" },
    { hash: "1b04a91", ref: "root/genesis-academic-2023" }
  ];

  return (
    <section id="timeline" className="py-24 relative z-10 section-ambient-divider transition-colors duration-500">
      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-current/10 gap-6">
          <div>
            <div className={`font-mono text-xs uppercase tracking-widest font-bold mb-2 flex items-center gap-2 ${
              isDark ? 'text-aurora-lavender' : 'text-atelier-violet'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-aurora-violet' : 'bg-atelier-violet'} animate-pulse`} />
              [06] ENGINEERING CHANGELOG & CAREER TRAJECTORY
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight uppercase text-shimmer-aurora">
              EXPERIENCE LOGBOOK.
            </h2>
          </div>
          <p className={`font-sans text-sm sm:text-base max-w-md ${
            isDark ? 'text-slate-400' : 'text-stone-600'
          }`}>
            Chronological audit of enterprise ERP modules architected, microservices shipped, and foundational academic milestones.
          </p>
        </div>

        {/* Git Logbook Style Timeline with Glowing Conduit Line */}
        <div className="relative space-y-12">
          
          {/* Animated Vertical Conduit Line with Traveling Laser Pulse */}
          <div className={`absolute left-3.5 sm:left-4 top-8 bottom-8 w-0.5 -translate-x-1/2 overflow-hidden ${
            isDark
              ? 'bg-gradient-to-b from-aurora-cyan/40 via-aurora-violet/40 to-aurora-cyan/20 shadow-[0_0_8px_rgba(56,189,248,0.4)]'
              : 'bg-gradient-to-b from-atelier-violet/30 via-atelier-coral/40 to-atelier-violet/10'
          }`}>
            <div className={`w-full h-28 conduit-pulse-beam ${
              isDark
                ? 'bg-gradient-to-b from-transparent via-aurora-cyan to-transparent shadow-[0_0_12px_#38BDF8]'
                : 'bg-gradient-to-b from-transparent via-atelier-violet to-transparent'
            }`} />
          </div>

          {timelineMilestones.map((item, idx) => {
            const commit = commitHashes[idx] || { hash: "a000000", ref: "main" };
            const isActiveRole = idx === 0;
            const floatClass = idx % 2 === 0 ? 'card-alive-float-1' : 'card-alive-float-2';

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="relative flex items-start gap-4 sm:gap-6 group"
              >
                
                {/* Commit Node Marker with Animated Icon */}
                <div className="shrink-0 relative z-10 mt-6 sm:mt-7">
                  <div className={`relative rounded-full border-2 p-1.5 flex items-center justify-center transition-all ${
                    isDark
                      ? 'bg-aurora-night border-aurora-violet shadow-glow-violet'
                      : 'bg-white border-atelier-violet shadow-glow-atelier'
                  }`}>
                    {isActiveRole && (
                      <span className="absolute -inset-1.5 rounded-full bg-emerald-400 animate-ping opacity-35 pointer-events-none" />
                    )}
                    <AnimatedIcon
                      icon={GitCommit}
                      variant={isActiveRole ? 'bounce' : 'spin'}
                      color={isActiveRole ? 'emerald' : idx === 1 ? 'cyan' : 'violet'}
                      size="sm"
                      badge={false}
                    />
                  </div>
                </div>

                {/* Log Card: Translucent Frosted Glass with Living Breath & Dynamic Spotlight */}
                <SpotlightCard
                  className={`flex-1 p-6 sm:p-8 rounded-2xl border backdrop-blur-2xl transition-all duration-300 hud-border ambient-sheen-container ${floatClass} ${
                    isDark
                      ? 'bg-white/[0.05] border-white/15 group-hover:border-violet-400/40 group-hover:bg-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_50px_rgba(167,139,250,0.2)]'
                      : 'bg-white/90 border-stone-200/90 group-hover:border-atelier-violet/50 shadow-sm hover:shadow-md'
                  }`}
                  spotlightColor={isDark ? 'rgba(167, 139, 250, 0.22)' : 'rgba(109, 40, 217, 0.12)'}
                >
                  
                  {/* Meta Header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className={`font-mono text-xs px-3 py-1 rounded-lg font-bold border ${
                        isDark
                          ? 'bg-white/[0.08] text-violet-200 border-white/15 shadow-sm'
                          : 'bg-purple-50 text-atelier-violet border-purple-200'
                      }`}>
                        {item.period}
                      </span>
                      {isActiveRole && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shadow-[0_0_12px_rgba(52,211,153,0.25)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
                          ACTIVE PRODUCTION ROLE
                        </span>
                      )}
                      <span className={`font-mono text-xs flex items-center gap-1.5 ${
                        isDark ? 'text-slate-300 opacity-80' : 'text-slate-600 font-semibold'
                      }`}>
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        {item.location}
                      </span>
                    </div>

                    <div className={`font-mono text-[11px] flex items-center gap-2 px-3 py-1 rounded-lg border ${
                      isDark ? 'bg-white/[0.04] border-white/10 text-cyan-300' : 'bg-slate-100 border-slate-200 text-slate-700 font-medium'
                    }`}>
                      <GitBranch className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="font-bold">{commit.hash}</span>
                      <span className={isDark ? 'opacity-60 text-slate-400' : 'text-slate-500'}>[{commit.ref}]</span>
                    </div>
                  </div>

                  {/* Role & Entity */}
                  <div className="mt-5 mb-3">
                    <h3 className={`font-display font-extrabold text-2xl sm:text-3xl tracking-tight ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      {item.role}
                    </h3>
                    <div className={`font-mono text-xs sm:text-sm font-semibold mt-1.5 flex items-center gap-2 ${
                      isDark ? 'text-cyan-300' : 'text-violet-700'
                    }`}>
                      <Terminal className="w-3.5 h-3.5" />
                      <span>{item.entity}</span>
                    </div>
                  </div>

                  <p className={`font-sans text-sm sm:text-base leading-relaxed mb-6 ${
                    isDark ? 'text-slate-200' : 'text-slate-600'
                  }`}>
                    {item.summary}
                  </p>

                  {/* Key Deliverables */}
                  <div className="space-y-2 mb-6">
                    <div className={`font-mono text-[11px] uppercase tracking-wider font-bold mb-2 flex items-center gap-1.5 ${
                      isDark ? 'text-cyan-300' : 'text-violet-700'
                    }`}>
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      KEY ARCHITECTURAL DELIVERABLES:
                    </div>
                    {item.keyDeliverables.map((deliv, dIdx) => (
                      <div
                        key={dIdx}
                        className={`flex items-start gap-3 text-xs sm:text-sm p-3 rounded-xl border transition-all ${
                          isDark 
                            ? 'bg-white/[0.03] border-white/5 hover:border-white/15 hover:bg-white/[0.07] text-slate-200' 
                            : 'bg-stone-50 border-stone-200 hover:bg-white text-stone-700'
                        }`}
                      >
                        <span className={`font-mono text-xs font-bold shrink-0 mt-0.5 ${
                          isDark ? 'text-cyan-400' : 'text-atelier-violet'
                        }`}>
                          0{dIdx + 1}.
                        </span>
                        <span className="leading-relaxed">{deliv}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 font-mono text-[11px]">
                    {item.tech.map((t, tIdx) => (
                      <span key={tIdx} className={`px-2.5 py-1 rounded-lg border font-mono font-medium transition-all ${
                        isDark
                          ? 'bg-white/[0.06] border-white/10 text-slate-200 hover:border-violet-400/40 hover:text-white'
                          : 'bg-stone-100 border-stone-200 text-stone-700 hover:border-stone-400'
                      }`}>
                        {t}
                      </span>
                    ))}
                  </div>

                </SpotlightCard>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
