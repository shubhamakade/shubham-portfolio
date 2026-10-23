import React, { useState } from 'react';
import { Cpu, Database, Layout, Wrench, CheckCircle2, ChevronRight, Terminal, Sparkles, Activity, Network } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillsHierarchy } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import SpotlightCard from './SpotlightCard';
import AnimatedIcon from './AnimatedIcon';
import celestialAudio from '../utils/celestialAudio';

const relatedNodesMap = {
  "Java (11 / 17 / 21 LTS)": ["Spring Boot 3", "Project Loom", "JVM Concurrency", "PostgreSQL"],
  "Spring Boot 3.x Ecosystem": ["Hibernate JPA", "PostgreSQL", "RESTful APIs", "HikariCP"],
  "Hibernate & JPA Persistence": ["PostgreSQL", "2nd-Level Cache", "Pessimistic Locks", "Spring Data"],
  "RESTful API Architecture": ["Spring Boot 3", "OpenAPI 3 Spec", "Spring Security", "React 18"],
  "Spring Security & Auth": ["Stateless JWT", "RBAC Policies", "Spring MVC", "BCrypt"],
  "GraphQL & Resolvers": ["DataLoader Batching", "Spring Boot 3", "Mobile ERP", "Apollo Client"],
  "PostgreSQL Engine": ["Composite B-Trees", "EXPLAIN ANALYZE", "Hibernate JPA", "ACID Transactions"],
  "MySQL & InnoDB": ["InnoDB Locks", "Redo Logs", "Row Locks", "JDBC Engine"],
  "Redis In-Memory Engine": ["Distributed Locking", "Cache Invalidation", "Atomic Ops", "Session Store"],
  "Schema Migrations & DDL": ["Flyway", "Liquibase", "Zero-Downtime DDL", "PostgreSQL"],
  "Transaction Isolation Design": ["Pessimistic Locks", "READ_COMMITTED", "Phantom Prevention", "HikariCP"],
  "React 18 & Concurrent Features": ["Framer Motion", "Custom Hooks", "Tailwind CSS", "Vite Bundler"],
  "Modern JavaScript (ESNext)": ["Async / Await", "Closures", "Immutable State", "TypeScript"],
  "Tailwind CSS & Design Systems": ["HUD Theme Tokens", "Glassmorphic Panels", "GPU Transitions", "Responsive Grid"],
  "Framer Motion & Kinetic Choreography": ["Spring Physics", "AnimatePresence", "60fps GPU Compositing", "Layout Transitions"],
  "Responsive Layout Engineering": ["Touch Gestures", "Fluid Viewports", "CSS Grid", "Flexbox Core"],
  "Docker Containerization": ["Multi-Stage Builds", "Alpine Linux", "Compose Stacks", "Spring Boot JRE"],
  "Git Workflow & Version Control": ["Trunk-Based Delivery", "Rebase Workflows", "Release Tags", "GitLab CI"],
  "Maven Build Lifecycle": ["Dependency Management", "Surefire Unit Testing", "Profile Switching", "Fat JAR Packaging"],
  "Linux Production Environments": ["Systemd Daemons", "Shell Scripting", "SSH Hardening", "Process Profiling"]
};

export default function SkillsMatrix() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState(0);
  const { isDark } = useTheme();

  const categoryIcons = [Cpu, Database, Layout, Wrench];

  const currentCategory = skillsHierarchy[activeCategory];
  const activeSkillData = currentCategory.skills[selectedSkill] || currentCategory.skills[0];

  // Helper to map tier to percentage for animated meter
  const getProficiencyPercentage = (tier) => {
    switch (tier) {
      case 'ARCHITECTURAL LEAD':
        return 96;
      case 'CORE PRODUCTION':
        return 92;
      case 'PRODUCTION SPECIALIST':
        return 88;
      default:
        return 90;
    }
  };

  return (
    <section id="skills" className="py-24 relative z-10 section-ambient-divider transition-colors duration-500">
      <div className="max-w-7xl 2xl:max-w-[1440px] 3xl:max-w-[1640px] 4xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-current/10 gap-6">
          <div>
            <div className={`font-mono text-xs uppercase tracking-widest font-bold mb-2 flex items-center gap-2 ${
              isDark ? 'text-aurora-lavender' : 'text-atelier-violet'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-aurora-violet' : 'bg-atelier-violet'} animate-pulse`} />
              [05] ARCHITECTURAL BLUEPRINT & CAPABILITIES
            </div>
            <AnimatePresence mode="wait">
              <motion.h2
                key={activeCategory}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight uppercase text-shimmer-aurora"
              >
                {[
                  'BACKEND ARCHITECTURE.',
                  'DATABASES & ACID STORAGE.',
                  'REACTIVE UI SYSTEMS.',
                  'DEVOPS & PRODUCTION TOOLCHAIN.'
                ][activeCategory]}
              </motion.h2>
            </AnimatePresence>
          </div>
          <p className={`font-sans text-sm sm:text-base max-w-md ${
            isDark ? 'text-slate-400' : 'text-stone-600'
          }`}>
            Audited engineering proficiencies across backend execution engines, transactional database clusters, and reactive client interfaces.
          </p>
        </div>

        {/* Domain Selection Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-10 font-mono text-xs relative">
          {skillsHierarchy.map((cat, idx) => {
            const Icon = categoryIcons[idx] || Cpu;
            const isActive = activeCategory === idx;
            const domainMeta = [
              {
                domain: 'DOMAIN_01',
                title: 'Backend Architecture',
                subtitle: 'Java 21 • Spring Boot 3',
                palette: 'violet',
                accentColor: '#A78BFA',
                tagClass: isDark ? 'text-violet-200 bg-violet-500/30 border-violet-300/40' : 'text-violet-700 bg-violet-100 border-violet-200',
                activeBg: isDark
                  ? 'bg-gradient-to-br from-violet-600/45 via-purple-600/30 to-indigo-600/35 border-2 border-violet-300 shadow-[0_12px_36px_rgba(167,139,250,0.4)]'
                  : 'bg-gradient-to-br from-violet-100/90 via-white to-purple-50/80 border-2 border-violet-500 shadow-lg text-stone-900',
                inactiveBg: isDark
                  ? 'bg-gradient-to-br from-violet-950/30 via-white/[0.08] to-indigo-950/20 hover:from-violet-900/40 hover:via-white/[0.12] hover:to-indigo-900/30 border border-white/20 hover:border-violet-300/60 text-slate-100'
                  : 'bg-white/90 hover:bg-white border border-stone-200 hover:border-violet-300 shadow-sm text-stone-700',
                glowColor: 'rgba(167, 139, 250, 0.45)',
                activeIndicator: 'bg-violet-300 shadow-[0_0_12px_#C4B5FD]'
              },
              {
                domain: 'DOMAIN_02',
                title: 'Databases & ACID',
                subtitle: 'PostgreSQL • Redis • Locks',
                palette: 'cyan',
                accentColor: '#38BDF8',
                tagClass: isDark ? 'text-cyan-200 bg-cyan-500/30 border-cyan-300/40' : 'text-cyan-700 bg-cyan-100 border-cyan-200',
                activeBg: isDark
                  ? 'bg-gradient-to-br from-cyan-600/45 via-sky-600/30 to-blue-600/35 border-2 border-cyan-300 shadow-[0_12px_36px_rgba(56,189,248,0.4)]'
                  : 'bg-gradient-to-br from-cyan-100/90 via-white to-sky-50/80 border-2 border-cyan-500 shadow-lg text-stone-900',
                inactiveBg: isDark
                  ? 'bg-gradient-to-br from-cyan-950/30 via-white/[0.08] to-sky-950/20 hover:from-cyan-900/40 hover:via-white/[0.12] hover:to-sky-900/30 border border-white/20 hover:border-cyan-300/60 text-slate-100'
                  : 'bg-white/90 hover:bg-white border border-stone-200 hover:border-cyan-300 shadow-sm text-stone-700',
                glowColor: 'rgba(56, 189, 248, 0.45)',
                activeIndicator: 'bg-cyan-300 shadow-[0_0_12px_#7DD3FC]'
              },
              {
                domain: 'DOMAIN_03',
                title: 'Reactive UI Systems',
                subtitle: 'React 18 • Framer • Canvas',
                palette: 'rose',
                accentColor: '#F43F5E',
                tagClass: isDark ? 'text-rose-200 bg-rose-500/30 border-rose-300/40' : 'text-rose-700 bg-rose-100 border-rose-200',
                activeBg: isDark
                  ? 'bg-gradient-to-br from-rose-600/45 via-pink-600/30 to-purple-600/35 border-2 border-rose-300 shadow-[0_12px_36px_rgba(244,63,94,0.4)]'
                  : 'bg-gradient-to-br from-rose-100/90 via-white to-pink-50/80 border-2 border-rose-500 shadow-lg text-stone-900',
                inactiveBg: isDark
                  ? 'bg-gradient-to-br from-rose-950/30 via-white/[0.08] to-pink-950/20 hover:from-rose-900/40 hover:via-white/[0.12] hover:to-pink-900/30 border border-white/20 hover:border-rose-300/60 text-slate-100'
                  : 'bg-white/90 hover:bg-white border border-stone-200 hover:border-rose-300 shadow-sm text-stone-700',
                glowColor: 'rgba(244, 63, 94, 0.45)',
                activeIndicator: 'bg-rose-300 shadow-[0_0_12px_#FDA4AF]'
              },
              {
                domain: 'DOMAIN_04',
                title: 'DevOps & Toolchain',
                subtitle: 'Docker • Linux • CI/CD',
                palette: 'emerald',
                accentColor: '#10B981',
                tagClass: isDark ? 'text-emerald-200 bg-emerald-500/30 border-emerald-300/40' : 'text-emerald-700 bg-emerald-100 border-emerald-200',
                activeBg: isDark
                  ? 'bg-gradient-to-br from-emerald-600/45 via-teal-600/30 to-cyan-600/35 border-2 border-emerald-300 shadow-[0_12px_36px_rgba(16,185,129,0.4)]'
                  : 'bg-gradient-to-br from-emerald-100/90 via-white to-teal-50/80 border-2 border-emerald-600 shadow-lg text-stone-900',
                inactiveBg: isDark
                  ? 'bg-gradient-to-br from-emerald-950/30 via-white/[0.08] to-teal-950/20 hover:from-emerald-900/40 hover:via-white/[0.12] hover:to-teal-900/30 border border-white/20 hover:border-emerald-300/60 text-slate-100'
                  : 'bg-white/90 hover:bg-white border border-stone-200 hover:border-emerald-300 shadow-sm text-stone-700',
                glowColor: 'rgba(16, 185, 129, 0.45)',
                activeIndicator: 'bg-emerald-300 shadow-[0_0_12px_#6EE7B7]'
              },
            ][idx];

            return (
              <motion.button
                key={cat.code}
                whileHover={{ y: -3, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  celestialAudio.playChime('chime');
                  setActiveCategory(idx);
                  setSelectedSkill(0);
                }}
                className={`p-4 rounded-2xl text-left border relative transition-all duration-300 flex flex-col justify-between overflow-hidden backdrop-blur-2xl ${
                  isActive ? domainMeta.activeBg : domainMeta.inactiveBg
                }`}
              >
                {/* Luminous Animated Shimmer on Active Card */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none z-0"
                    initial={{ x: '-150%' }}
                    animate={{ x: '250%' }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: 'easeInOut',
                      repeatDelay: 1,
                    }}
                  >
                    <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12" />
                  </motion.div>
                )}

                {/* Top Row: Domain Tag & Active Beacon */}
                <div className="flex items-center justify-between mb-3 relative z-10 w-full">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase border ${domainMeta.tagClass}`}>
                    {domainMeta.domain}
                  </span>

                  {isActive ? (
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-[9px] font-mono font-bold">
                      <span className={`w-1.5 h-1.5 rounded-full ${domainMeta.activeIndicator} animate-pulse`} />
                      <span className={isDark ? 'text-white' : 'text-stone-900'}>ACTIVE</span>
                    </span>
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 opacity-40 group-hover:opacity-80" />
                  )}
                </div>

                {/* Middle Content: Icon + Title */}
                <div className="flex items-center gap-3 relative z-10 min-w-0 mb-2">
                  <div className={`p-2 rounded-xl shrink-0 transition-colors ${
                    isActive 
                      ? 'bg-white/15 border border-white/25 shadow-md' 
                      : 'bg-white/[0.06] border border-white/10'
                  }`}>
                    <AnimatedIcon
                      icon={Icon}
                      variant={isActive ? 'bounce' : 'float'}
                      palette={domainMeta.palette}
                      size="sm"
                      isGlowing={isActive}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className={`font-display font-extrabold text-sm sm:text-base tracking-tight truncate ${
                      isActive ? 'text-white' : isDark ? 'text-slate-100' : 'text-stone-900'
                    }`}>
                      {domainMeta.title}
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Subtitle Stack Details */}
                <div className="relative z-10 pt-2 border-t border-current/10 w-full">
                  <div className={`text-[11px] font-mono tracking-tight truncate ${
                    isActive
                      ? isDark ? 'text-slate-200 font-medium' : 'text-stone-800 font-semibold'
                      : isDark ? 'text-slate-400' : 'text-stone-600'
                  }`}>
                    {domainMeta.subtitle}
                  </div>
                </div>

                {/* Subtle Radiant Hairline Bottom Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeDomainLine"
                    className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-white/80 to-transparent"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Blueprint Layout: Asymmetrical Interactive Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Capability Roster */}
          <div className="lg:col-span-7 space-y-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCategory.code}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className={`p-5 rounded-2xl border mb-4 backdrop-blur-2xl transition-all ${
                  isDark ? 'bg-white/[0.05] border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.3)]' : 'bg-white/80 border-stone-200/90 shadow-sm'
                }`}
              >
                <div className={`font-mono text-xs uppercase font-bold mb-1 flex items-center justify-between ${
                  isDark ? 'text-cyan-300' : 'text-atelier-violet'
                }`}>
                  <span>DOMAIN MANIFESTO // {currentCategory.code}</span>
                  <span className="text-[10px] opacity-75 font-mono">{currentCategory.skills.length} VERIFIED STACKS</span>
                </div>
                <p className={`font-sans text-sm leading-relaxed ${
                  isDark ? 'text-slate-200' : 'text-stone-600'
                }`}>
                  {currentCategory.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="space-y-2.5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCategory.code}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2.5"
                >
                  {currentCategory.skills.map((skill, sIdx) => {
                    const isSelected = selectedSkill === sIdx;
                    return (
                      <SpotlightCard
                        as={motion.div}
                        key={skill.name}
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        onClick={() => setSelectedSkill(sIdx)}
                        className={`p-4 rounded-xl cursor-pointer border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative overflow-hidden ${
                          isSelected
                            ? isDark
                              ? 'bg-white/[0.09] border-violet-400/50 shadow-[0_8px_30px_rgba(167,139,250,0.25)] pl-5'
                              : 'bg-white border-atelier-violet shadow-glow-atelier pl-5'
                            : isDark
                            ? 'bg-white/[0.04] border-white/10 hover:border-white/20 hover:bg-white/[0.08]'
                            : 'bg-white/70 border-stone-200 hover:border-stone-300 hover:bg-white shadow-sm'
                        }`}
                        spotlightColor={isDark ? 'rgba(167, 139, 250, 0.22)' : 'rgba(109, 40, 217, 0.12)'}
                      >
                        {isSelected && (
                          <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                            isDark ? 'bg-gradient-to-b from-cyan-400 to-violet-500 shadow-[0_0_10px_#38BDF8]' : 'bg-gradient-to-b from-atelier-violet to-atelier-coral'
                          }`} />
                        )}

                        <div className="flex-1 pr-2 relative z-10">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="font-display font-bold text-base">
                              {skill.name}
                            </span>
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                              skill.tier === 'ARCHITECTURAL LEAD'
                                ? isDark
                                  ? 'bg-aurora-violet/20 text-aurora-lavender border border-aurora-violet/40'
                                  : 'bg-purple-100 text-atelier-violet border border-purple-200'
                                : isDark
                                ? 'bg-sky-950/40 text-sky-300 border border-sky-500/30'
                                : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}>
                              {skill.tier}
                            </span>
                          </div>
                          <div className={`font-mono text-xs ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
                            {skill.highlight}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-mono opacity-70 self-end sm:self-center shrink-0 relative z-10">
                          <span className={isSelected ? (isDark ? 'text-aurora-lavender font-bold' : 'text-atelier-violet font-bold') : ''}>
                            {isSelected ? 'INSPECTING' : 'VIEW DETAILS'}
                          </span>
                          <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
                            isSelected ? (isDark ? 'text-aurora-lavender translate-x-1.5' : 'text-atelier-violet translate-x-1.5') : ''
                          }`} />
                        </div>
                      </SpotlightCard>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Technical Inspector Blueprint Dossier with Dynamic Specular Spotlight */}
          <div className="lg:col-span-5 sticky top-28">
            <AnimatePresence mode="wait">
              <SpotlightCard
                as={motion.div}
                key={`${currentCategory.code}-${activeSkillData.name}`}
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`rounded-2xl border backdrop-blur-2xl p-6 sm:p-7 shadow-2xl hud-border ambient-sheen-container transition-all ${
                  isDark
                    ? 'bg-white/[0.05] border-white/15 shadow-[0_16px_50px_rgba(0,0,0,0.4)]'
                    : 'bg-white/95 border-stone-300/80 shadow-xl'
                }`}
                spotlightColor={isDark ? 'rgba(167, 139, 250, 0.22)' : 'rgba(109, 40, 217, 0.14)'}
              >
                
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div className={`flex items-center gap-2 font-mono text-xs font-semibold ${
                    isDark ? 'text-cyan-300' : 'text-atelier-violet'
                  }`}>
                    <AnimatedIcon icon={Terminal} variant="spin" color="violet" size="sm" badge={false} />
                    <span>ARCHITECTURE DOSSIER</span>
                  </div>
                  <div className="text-[10px] font-mono text-emerald-300 font-semibold flex items-center gap-1.5 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-400/30 shadow-[0_0_10px_rgba(52,211,153,0.2)]">
                    <AnimatedIcon icon={CheckCircle2} variant="pulse" color="emerald" size="sm" badge={false} />
                    <span>PRODUCTION VERIFIED</span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-[11px] font-mono opacity-60 uppercase tracking-wider mb-1 flex items-center gap-1.5 text-slate-300">
                    <AnimatedIcon icon={Sparkles} variant="wiggle" color="amber" size="sm" badge={false} />
                    <span>CORE SPECIALIZATION</span>
                  </div>
                  <h3 className={`font-display font-extrabold text-2xl sm:text-3xl mb-2 ${isDark ? 'text-white' : 'text-stone-900'}`}>
                    {activeSkillData.name}
                  </h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`inline-block px-3 py-1 rounded-lg font-mono text-xs font-semibold border ${
                      isDark ? 'bg-white/[0.08] text-violet-200 border-white/15 shadow-sm' : 'bg-stone-100 text-atelier-violet border-stone-300'
                    }`}>
                      TIER: {activeSkillData.tier}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">
                      {getProficiencyPercentage(activeSkillData.tier)}% OPERATIONAL CONFIDENCE
                    </span>
                  </div>

                  {/* Dynamic Animated Meter */}
                  <div className="mt-4 pt-2">
                    <div className="flex justify-between text-[10px] font-mono mb-1.5 opacity-80 text-slate-300">
                      <span className="flex items-center gap-1">
                        <Activity className="w-3 h-3 text-cyan-400" />
                        CAPABILITY DEPTH
                      </span>
                      <span className="font-bold text-cyan-300">{getProficiencyPercentage(activeSkillData.tier)}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${getProficiencyPercentage(activeSkillData.tier)}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={`h-full rounded-full ${
                          isDark
                            ? 'bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400 shadow-[0_0_12px_#38BDF8]'
                            : 'bg-gradient-to-r from-atelier-violet via-atelier-coral to-emerald-500'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6 text-xs font-mono">
                  <div className={`p-4 rounded-xl border ${
                    isDark ? 'bg-white/[0.04] border-white/10' : 'bg-stone-50 border-stone-200'
                  }`}>
                    <div className="text-[10px] text-cyan-300 font-bold uppercase mb-1 tracking-wider">PRODUCTION APPLICATION</div>
                    <div className="leading-relaxed text-slate-200 font-normal">
                      {activeSkillData.highlight}
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl border ${
                    isDark ? 'bg-white/[0.04] border-white/10' : 'bg-stone-50 border-stone-200'
                  }`}>
                    <div className="text-[10px] text-cyan-300 font-bold uppercase mb-1 tracking-wider">APPLIED IN ENTERPRISE SYSTEMS</div>
                    <div className="text-slate-200 leading-relaxed font-normal">
                      MMS Mess Management ERP, High-Throughput Inventory Ledger, Mobile Approvals Microservices.
                    </div>
                  </div>

                  {/* Interactive Connected Architectural Nodes */}
                  <div className={`p-4 rounded-xl border ${
                    isDark ? 'bg-white/[0.04] border-white/10' : 'bg-stone-50 border-stone-200'
                  }`}>
                    <div className="text-[10px] text-cyan-300 uppercase mb-2.5 flex items-center gap-1.5 font-bold tracking-wider">
                      <Network className="w-3.5 h-3.5 text-cyan-400" />
                      CONNECTED ARCHITECTURAL NODES
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(relatedNodesMap[activeSkillData.name] || ["Spring Boot 3", "PostgreSQL", "Docker", "REST"]).map((nodeName, nIdx) => (
                        <motion.button
                          key={nIdx}
                          whileHover={{ scale: 1.05, y: -1 }}
                          whileTap={{ scale: 0.95 }}
                          onMouseEnter={() => celestialAudio.playChime('chime')}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-medium border transition-all ${
                            isDark
                              ? 'bg-white/[0.06] border-white/15 text-slate-200 hover:border-cyan-400/50 hover:text-white hover:bg-white/[0.12] hover:shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                              : 'bg-white border-stone-300 text-atelier-violet hover:border-atelier-coral hover:text-atelier-coral shadow-sm'
                          }`}
                        >
                          <span className="opacity-50 mr-1 text-cyan-400">#</span>{nodeName}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-current/10 flex items-center justify-between text-[11px] font-mono opacity-75">
                  <span>RUNTIME ENVIRONMENT</span>
                  <span className="font-bold opacity-100">JDK 17 / 21 LTS + React 18</span>
                </div>

              </SpotlightCard>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
