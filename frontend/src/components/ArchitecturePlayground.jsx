import React, { useState } from 'react';
import { Play, RotateCcw, CheckCircle2, Terminal, ShieldCheck, Cpu, Zap, Database, Server, Flame, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useTheme } from '../context/ThemeContext';
import AnimatedIcon from './AnimatedIcon';
import celestialAudio from '../utils/celestialAudio';

export default function ArchitecturePlayground() {
  const [pipelineState, setPipelineState] = useState('IDLE');
  const [activeStep, setActiveStep] = useState(0);
  const [executionLogs, setExecutionLogs] = useState([]);
  const { isDark } = useTheme();

  const pipelineSteps = [
    {
      id: "INGRESS",
      layer: "HTTP Ingress & JWT Filter",
      component: "DispatcherServlet + SecurityFilterChain",
      metric: "1.2ms",
      desc: "Intercepts incoming POST request, validates Authorization Bearer JWT token, runs @Valid bean constraint validation.",
      log: "10:42:01.102 [http-nio-8080-exec-1] DEBUG org.springframework.security.web.FilterChainProxy - Securing POST /api/v1/mms/material-transfer [JWT Validated: sub=shubham.akade, role=CHIEF_ARCHITECT]",
      icon: ShieldCheck,
      palette: "violet",
      variant: "radar"
    },
    {
      id: "CONTROLLER",
      layer: "Spring MVC Controller",
      component: "EppsMaterialTransferController",
      metric: "0.8ms",
      desc: "Deserializes JSON payload into immutable TransferRequest record, invokes domain service interface.",
      log: "10:42:01.103 [http-nio-8080-exec-1] INFO c.e.mms.controller.TransferController - Received Requisition Request: [from=WH_CENTRAL, to=KP_NORTH, batchSize=500kg]",
      icon: Cpu,
      palette: "cyan",
      variant: "float"
    },
    {
      id: "TRANSACTION",
      layer: "@Transactional Interceptor",
      component: "PlatformTransactionManager (HikariCP)",
      metric: "2.1ms",
      desc: "Acquires connection from Hikari pool (active: 4/30), opens JDBC transaction with Isolation.READ_COMMITTED.",
      log: "10:42:01.105 [http-nio-8080-exec-1] DEBUG o.s.orm.jpa.JpaTransactionManager - Creating new transaction with name [EppsMaterialTransferService.executeTransfer]: PROPAGATION_REQUIRED,ISOLATION_READ_COMMITTED",
      icon: Zap,
      palette: "amber",
      variant: "pulse"
    },
    {
      id: "PERSISTENCE",
      layer: "Hibernate Persistence Context",
      component: "Spring Data JPA + EntityGraph",
      metric: "3.4ms",
      desc: "Pessimistic write lock issued on source pantry inventory. Entity state transitioned to MANAGED.",
      log: "10:42:01.108 [http-nio-8080-exec-1] DEBUG org.hibernate.SQL - SELECT stock_id, item_code, quantity FROM epps_sub_store_stock WHERE store_code = ? AND item_code = ? FOR UPDATE",
      icon: Database,
      palette: "emerald",
      variant: "float"
    },
    {
      id: "POSTGRESQL",
      layer: "PostgreSQL Engine & Commit",
      component: "ACID Database Storage",
      metric: "4.8ms",
      desc: "Executes stock decrement, generates immutable audit log row, commits transaction, releases lock.",
      log: "10:42:01.113 [http-nio-8080-exec-1] INFO c.e.mms.service.TransferService - Transfer Committed: Receipt #MMS-REC-2026-8819 [Balance Integrity: VERIFIED, Total Latency: 12.3ms]",
      icon: Server,
      palette: "rose",
      variant: "radar"
    }
  ];

  const runSimulation = (e) => {
    // Audio ignition blast
    try {
      celestialAudio.playChime('supernova');
    } catch (err) {}

    // Ember spark explosion from the clicked button
    if (e && e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 45,
        spread: 75,
        origin: { x, y },
        colors: ['#ff4500', '#f97316', '#fbbf24', '#ef4444', '#ffdd57']
      });
    }

    setPipelineState('RUNNING');
    setActiveStep(0);
    setExecutionLogs([pipelineSteps[0].log]);

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < pipelineSteps.length) {
        setActiveStep(current);
        setExecutionLogs(prev => [...prev, pipelineSteps[current].log]);
        try {
          celestialAudio.playChime('chime');
        } catch (err) {}
      } else {
        clearInterval(interval);
        setPipelineState('COMPLETED');
        try {
          celestialAudio.playChime('affirm');
        } catch (err) {}
      }
    }, 700);
  };

  const resetSimulation = () => {
    setPipelineState('IDLE');
    setActiveStep(0);
    setExecutionLogs([]);
  };

  return (
    <section id="playground" className="py-24 relative z-10 border-t border-current/10 transition-colors duration-500">
      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-current/10 gap-6">
          <div>
            <div className={`font-mono text-xs uppercase tracking-widest font-bold mb-2 flex items-center gap-2 ${
              isDark ? 'text-aurora-lavender' : 'text-atelier-violet'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-aurora-violet' : 'bg-atelier-violet'}`} />
              [04] ARCHITECTURE KERNEL LAB
            </div>
            <h2 className={`font-display font-extrabold text-3xl sm:text-5xl tracking-tight uppercase ${
              isDark ? 'text-white' : 'text-slate-900 font-black'
            }`}>
              TRANSACTION LIFECYCLE SIMULATOR.
            </h2>
          </div>
          <p className={`font-sans text-sm sm:text-base max-w-md ${
            isDark ? 'text-slate-400' : 'text-slate-600 font-medium'
          }`}>
            Step through an end-to-end Spring Boot request pipeline to inspect how security filters, transaction managers, and PostgreSQL row locks guarantee zero data loss.
          </p>
        </div>

        {/* Playground Interactive Hub */}
        <div className={`rounded-2xl border backdrop-blur-xl p-6 sm:p-8 shadow-2xl hud-border transition-colors ${
          isDark
            ? 'bg-aurora-night/80 border-aurora-violet/25'
            : 'bg-white border-slate-200 shadow-xl'
        }`}>
          
          {/* Top Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-current/10">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs opacity-75 font-semibold">TARGET ENDPOINT:</span>
              <code className={`px-3 py-1 rounded-md font-mono text-xs font-bold border ${
                isDark
                  ? 'bg-aurora-card text-aurora-lavender border-aurora-violet/30'
                  : 'bg-violet-50 text-violet-700 border-violet-200'
              }`}>
                POST /api/v1/mms/material-transfer
              </code>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={runSimulation}
                disabled={pipelineState === 'RUNNING'}
                className={`relative group px-6 py-2.5 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 overflow-hidden shadow-2xl ${
                  pipelineState === 'RUNNING'
                    ? 'bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 text-white shadow-[0_0_35px_rgba(249,115,22,0.95)] border border-amber-300 cursor-wait'
                    : 'bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 hover:from-amber-400 hover:via-orange-500 hover:to-rose-500 text-white shadow-[0_0_25px_rgba(249,115,22,0.55)] hover:shadow-[0_0_40px_rgba(249,115,22,0.95)] hover:scale-105 active:scale-95 border border-amber-300/80 cursor-pointer'
                }`}
              >
                {/* Ambient Fiery Halo Glow */}
                <span className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 opacity-60 blur-sm group-hover:opacity-100 transition-opacity animate-pulse" />

                {/* Hyper-Speed Left-to-Right Fire Surge Inside the Button */}
                {pipelineState === 'RUNNING' && (
                  <>
                    {/* Blazing Fire Plasma Core 1: Sweeping Left to Right at high speed */}
                    <motion.div
                      className="absolute inset-y-0 w-36 pointer-events-none z-0"
                      initial={{ x: '-150%' }}
                      animate={{ x: '350%' }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.65,
                        ease: 'linear',
                      }}
                    >
                      <div className="w-full h-full bg-gradient-to-r from-transparent via-amber-300 via-yellow-200 to-transparent blur-[2px] opacity-90" />
                    </motion.div>

                    {/* Blazing Fire Plasma Core 2: Secondary overlapping flame with deeper orange/red embers */}
                    <motion.div
                      className="absolute inset-y-0 w-48 pointer-events-none z-0"
                      initial={{ x: '-180%' }}
                      animate={{ x: '320%' }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.55,
                        ease: 'linear',
                        delay: 0.1,
                      }}
                    >
                      <div className="w-full h-full bg-gradient-to-r from-transparent via-orange-400 via-rose-500 to-transparent blur-md opacity-80" />
                    </motion.div>

                    {/* Blazing Flame Front & Heat Wave */}
                    <motion.div
                      className="absolute inset-y-0 w-16 pointer-events-none z-0"
                      initial={{ x: '-200%' }}
                      animate={{ x: '450%' }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.45,
                        ease: 'linear',
                        delay: 0.05,
                      }}
                    >
                      <div className="w-full h-full bg-white blur-[1px] opacity-70" />
                    </motion.div>
                  </>
                )}

                {/* Button Content */}
                <span className="relative z-10 flex items-center gap-2">
                  <Flame className={`w-4 h-4 text-amber-200 group-hover:scale-125 transition-transform ${pipelineState === 'RUNNING' ? 'animate-bounce' : 'animate-pulse'}`} />
                  <span className="tracking-wider font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {pipelineState === 'RUNNING' ? 'BURNING TRANSACTION...' : 'FIRE HTTP TRANSACTION'}
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
                </span>
              </button>

              <button
                onClick={resetSimulation}
                className={`p-2.5 rounded-xl border transition-all ${
                  isDark ? 'bg-aurora-card border-white/10 text-slate-400 hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-950'
                }`}
                title="Reset simulation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 5-Stage Visual Architecture Pipeline */}
          <div className="py-6 grid grid-cols-1 md:grid-cols-5 gap-3">
            {pipelineSteps.map((step, idx) => {
              const isCurrent = pipelineState === 'RUNNING' && activeStep === idx;
              const isDone = (pipelineState === 'RUNNING' && activeStep > idx) || pipelineState === 'COMPLETED';

              return (
                <div
                  key={step.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                    isCurrent
                      ? isDark
                        ? 'bg-aurora-card border-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.7)] scale-105 z-10'
                        : 'bg-white border-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.6)] scale-105 z-10'
                      : isDone
                      ? isDark
                        ? 'bg-aurora-card/60 border-emerald-500/40 text-slate-200'
                        : 'bg-emerald-50/80 border-emerald-300 text-slate-900 shadow-2xs'
                      : isDark
                      ? 'bg-aurora-night/50 border-white/5 opacity-60'
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 font-mono text-[10px]">
                      <div className="flex items-center gap-2">
                        <AnimatedIcon
                          icon={step.icon}
                          variant={isCurrent ? 'spin' : step.variant}
                          palette={step.palette}
                          size="sm"
                          isGlowing={isCurrent}
                        />
                        <span className={`font-semibold ${
                          isCurrent
                            ? isDark ? 'text-aurora-lavender' : 'text-violet-700 font-bold'
                            : isDone ? 'text-emerald-600 font-bold' : 'opacity-60'
                        }`}>
                          0{idx + 1}. {step.id}
                        </span>
                      </div>
                      {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 font-bold" />}
                      {isCurrent && (
                        <span className="text-[10px] font-bold text-orange-400 flex items-center gap-1 px-1.5 py-0.5 rounded bg-orange-500/20 border border-orange-500/40 animate-pulse">
                          <Flame className="w-3 h-3 text-orange-400 animate-bounce" />
                          <span>IGNITED</span>
                        </span>
                      )}
                    </div>

                    <h4 className={`font-display font-bold text-sm mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {step.layer}
                    </h4>
                    <div className={`font-mono text-[10px] font-semibold mb-2 ${
                      isDark ? 'text-aurora-lavender' : 'text-violet-700'
                    }`}>
                      {step.component}
                    </div>
                    <p className={`font-sans text-[11px] leading-normal font-medium ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-current/10 font-mono text-[10px] opacity-75 flex items-center justify-between">
                    <span>STEP TIME:</span>
                    <span className="font-bold opacity-100">{step.metric}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Real-Time Server Console Log Stream */}
          <div className="mt-4 rounded-xl border border-current/10 bg-black/85 text-slate-200 overflow-hidden font-mono text-xs shadow-inner">
            <div className="px-4 py-2.5 bg-black/50 border-b border-white/10 flex items-center justify-between text-slate-400 text-[11px]">
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Terminal}
                  variant="pulse"
                  palette="violet"
                  size="sm"
                  isGlowing={pipelineState === 'RUNNING'}
                />
                <span className="font-semibold tracking-wider">SPRING BOOT EMBEDDED SERVER LOGSTREAM</span>
              </div>
              <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${pipelineState === 'RUNNING' ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
                {pipelineState === 'RUNNING' ? 'PROCESSING...' : pipelineState === 'COMPLETED' ? 'TRANSACTION COMMITTED' : 'AWAITING DISPATCH'}
              </div>
            </div>

            <div className="p-4 space-y-2 min-h-[140px] max-h-[220px] overflow-y-auto text-slate-300">
              {executionLogs.length === 0 ? (
                <div className="text-slate-500 italic">
                  // Press "FIRE HTTP TRANSACTION" above to stream Spring Boot runtime execution logs...
                </div>
              ) : (
                executionLogs.map((log, lIdx) => (
                  <div key={lIdx} className="leading-relaxed">
                    <span className="text-violet-400 font-bold">{'>'}</span> {log}
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
