import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { celestialAudio } from '../utils/celestialAudio';
import { Sparkles, Database, Layers, Cpu, Server, Code2, Box } from 'lucide-react';
import confetti from 'canvas-confetti';
import AnimatedIcon from './AnimatedIcon';

export default function CelestialPortal3D({ onSupernova }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const { isDark } = useTheme();
  
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [supernovaActive, setSupernovaActive] = useState(false);

  // Mouse tilt tracking for 3D gyroscope effect
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setTilt({ x: x * 12, y: -y * 12 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handlePortalClick = (e) => {
    setSupernovaActive(true);
    celestialAudio.playChime('supernova');
    if (onSupernova) onSupernova();

    if (typeof window !== 'undefined' && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const originX = (rect.left + rect.width / 2) / window.innerWidth;
      const originY = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 50,
        spread: 100,
        origin: { x: originX, y: originY },
        colors: isDark ? ['#A78BFA', '#38BDF8', '#10B981', '#F59E0B'] : ['#7C3AED', '#E11D48', '#059669', '#EA580C'],
        scalar: 0.9,
        ticks: 120,
      });
    }

    setTimeout(() => setSupernovaActive(false), 1400);
  };

  // Canvas Sacred Geometry & Gyroscopic Orbit Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let time = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      time += 0.018;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Smooth mouse-influenced rotation
      const rotX = 0.52 + (tilt.y * Math.PI) / 240;
      const rotY = time * 0.18 + (tilt.x * Math.PI) / 240;

      // 3D Projection function for orbital rings
      const project = (x, y, z) => {
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;

        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        const depth = 450;
        const scale = depth / (depth + z2);
        return {
          x: cx + x1 * scale,
          y: cy + y2 * scale,
          scale: scale,
          depth: z2,
        };
      };

      // 1. Radiant Volumetric God Rays
      const rayCount = 8;
      const maxRayLen = Math.min(w, h) * 0.48;
      for (let i = 0; i < rayCount; i++) {
        const rayAngle = (i / rayCount) * Math.PI * 2 + time * 0.08;
        const rayAlpha = Math.sin(time + i) * 0.1 + (isHovered ? 0.22 : 0.08);

        const gx = cx + Math.cos(rayAngle) * maxRayLen;
        const gy = cy + Math.sin(rayAngle) * maxRayLen;

        const rayGrad = ctx.createLinearGradient(cx, cy, gx, gy);
        rayGrad.addColorStop(0, isDark ? `rgba(196, 181, 253, ${rayAlpha * 1.4})` : `rgba(244, 63, 94, ${rayAlpha * 1.1})`);
        rayGrad.addColorStop(0.5, isDark ? `rgba(139, 92, 246, ${rayAlpha * 0.9})` : `rgba(124, 58, 237, ${rayAlpha * 0.7})`);
        rayGrad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = rayGrad;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(rayAngle - 0.1) * maxRayLen, cy + Math.sin(rayAngle - 0.1) * maxRayLen);
        ctx.lineTo(cx + Math.cos(rayAngle + 0.1) * maxRayLen, cy + Math.sin(rayAngle + 0.1) * maxRayLen);
        ctx.closePath();
        ctx.fill();
      }

      // 2. Sacred Concentric Gyroscopic Rings (3D Perspective)
      // Scaled comfortably outside portrait bounds (rx: 170, 210, 250)
      const ringRadii = [170, 210, 250];
      ringRadii.forEach((r, idx) => {
        ctx.beginPath();
        const steps = 64;
        for (let i = 0; i <= steps; i++) {
          const a = (i / steps) * Math.PI * 2;
          const pt = project(Math.cos(a) * r, Math.sin(a * 2 + time * (idx + 1) * 0.2) * 14, Math.sin(a) * r);
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = isDark 
          ? `rgba(167, 139, 250, ${0.22 + idx * 0.12})` 
          : `rgba(124, 58, 237, ${0.18 + idx * 0.1})`;
        ctx.lineWidth = idx === 1 ? 1.5 : 1;
        ctx.stroke();

        // Orbiting glowing starlight beacon node on each ring
        const nodeAngle = time * (0.8 + idx * 0.3);
        const nodePt = project(Math.cos(nodeAngle) * r, Math.sin(nodeAngle * 2) * 14, Math.sin(nodeAngle) * r);
        ctx.beginPath();
        ctx.arc(nodePt.x, nodePt.y, 3 * nodePt.scale, 0, Math.PI * 2);
        ctx.fillStyle = idx === 0 ? '#10B981' : idx === 1 ? '#38BDF8' : '#EC4899';
        ctx.shadowBlur = 10;
        ctx.shadowColor = ctx.fillStyle;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 3. Supernova chromatic shockwave burst if clicked
      if (supernovaActive) {
        // Multi-ring concentric blast waves
        [160, 205, 250].forEach((ringR, rIdx) => {
          ctx.beginPath();
          ctx.arc(cx, cy, ringR + Math.sin(time * 12 + rIdx) * 35, 0, Math.PI * 2);
          ctx.strokeStyle = rIdx === 0 
            ? (isDark ? 'rgba(167, 139, 250, 0.95)' : 'rgba(124, 58, 237, 0.95)')
            : rIdx === 1 
            ? (isDark ? 'rgba(56, 189, 248, 0.85)' : 'rgba(225, 29, 72, 0.85)')
            : (isDark ? 'rgba(251, 191, 36, 0.75)' : 'rgba(16, 185, 129, 0.75)');
          ctx.lineWidth = 3 - rIdx * 0.8;
          ctx.shadowBlur = 22;
          ctx.shadowColor = ctx.strokeStyle;
          ctx.stroke();
          ctx.shadowBlur = 0;
        });

        // 16 radiating particle sparks
        const sparks = 16;
        for (let s = 0; s < sparks; s++) {
          const sAngle = (s / sparks) * Math.PI * 2 + time * 0.4;
          const sDist = 180 + Math.sin(time * 8 + s) * 55;
          const sx = cx + Math.cos(sAngle) * sDist;
          const sy = cy + Math.sin(sAngle) * sDist;
          ctx.beginPath();
          ctx.arc(sx, sy, 3.2, 0, Math.PI * 2);
          ctx.fillStyle = s % 3 === 0 ? '#38BDF8' : s % 3 === 1 ? '#A78BFA' : '#F59E0B';
          ctx.shadowBlur = 14;
          ctx.shadowColor = ctx.fillStyle;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [isDark, isHovered, supernovaActive, tilt]);

  // Core Enterprise Architecture Skills for the continuous running stream
  const streamSkills = [
    {
      id: 'spring',
      label: 'Spring Boot 3',
      metric: '12.3ms SLA Core',
      icon: Server,
      color: 'emerald',
      dotColor: 'bg-emerald-400',
      textColor: isDark ? 'text-emerald-300' : 'text-emerald-700',
      borderColor: isDark ? 'border-emerald-500/30 hover:border-emerald-400/80 bg-emerald-950/25' : 'border-emerald-300 hover:border-emerald-500 bg-emerald-50/70',
    },
    {
      id: 'react',
      label: 'React 18',
      metric: '60 FPS GPU UI',
      icon: Layers,
      color: 'indigo',
      dotColor: 'bg-indigo-400',
      textColor: isDark ? 'text-indigo-300' : 'text-indigo-700',
      borderColor: isDark ? 'border-indigo-500/30 hover:border-indigo-400/80 bg-indigo-950/25' : 'border-indigo-300 hover:border-indigo-500 bg-indigo-50/70',
    },
    {
      id: 'postgres',
      label: 'PostgreSQL',
      metric: '99.999% ACID',
      icon: Database,
      color: 'sky',
      dotColor: 'bg-sky-400',
      textColor: isDark ? 'text-sky-300' : 'text-sky-700',
      borderColor: isDark ? 'border-sky-500/30 hover:border-sky-400/80 bg-sky-950/25' : 'border-sky-300 hover:border-sky-500 bg-sky-50/70',
    },
    {
      id: 'graphql',
      label: 'GraphQL API',
      metric: 'P99 <40ms',
      icon: Cpu,
      color: 'pink',
      dotColor: 'bg-pink-400',
      textColor: isDark ? 'text-pink-300' : 'text-pink-700',
      borderColor: isDark ? 'border-pink-500/30 hover:border-pink-400/80 bg-pink-950/25' : 'border-pink-300 hover:border-pink-500 bg-pink-50/70',
    },
    {
      id: 'java',
      label: 'Java 17 / 21',
      metric: 'JDK Core & JVM',
      icon: Code2,
      color: 'amber',
      dotColor: 'bg-amber-400',
      textColor: isDark ? 'text-amber-300' : 'text-amber-700',
      borderColor: isDark ? 'border-amber-500/30 hover:border-amber-400/80 bg-amber-950/25' : 'border-amber-300 hover:border-amber-500 bg-amber-50/70',
    },
    {
      id: 'docker',
      label: 'Docker & Cloud',
      metric: 'Microservices',
      icon: Box,
      color: 'cyan',
      dotColor: 'bg-cyan-400',
      textColor: isDark ? 'text-cyan-300' : 'text-cyan-700',
      borderColor: isDark ? 'border-cyan-500/30 hover:border-cyan-400/80 bg-cyan-950/25' : 'border-cyan-300 hover:border-cyan-500 bg-cyan-50/70',
    },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handlePortalClick}
      className="relative w-full max-w-[480px] sm:max-w-[540px] h-auto min-h-[380px] sm:min-h-[430px] flex flex-col items-center justify-center cursor-pointer select-none group overflow-visible pt-1"
      style={{ perspective: 1200 }}
    >
      {/* 3D Sacred Geometry Canvas Layer (Rings, God Rays, Gyro Beacons) */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

      {/* Central Portrait Card */}
      <div className="relative">
        
        {/* Floating 3D Portrait Monolith Card (z-20) */}
        <div
          className={`relative z-20 w-44 sm:w-48 xl:w-52 h-60 sm:h-64 xl:h-72 rounded-2xl sm:rounded-3xl overflow-hidden border-2 transition-transform duration-200 ease-out shadow-2xl backdrop-blur-2xl hud-border ${
            isDark 
              ? 'bg-aurora-card/85 border-aurora-violet/50 shadow-glow-violet' 
              : 'bg-white/95 border-slate-200/90 shadow-[0_16px_40px_rgba(0,0,0,0.08)]'
          }`}
          style={{
            transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(30px)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Dynamic Holographic Specular Glaze */}
          <div 
            className="absolute inset-0 pointer-events-none z-30 opacity-60 mix-blend-overlay transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${50 + tilt.x * 2}% ${50 + tilt.y * 2}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 65%)`
            }}
          />

          {/* Executive Portrait of Shubham Akade */}
          <img
            src="/shubham_akade_executive.png"
            alt="Shubham Akade - Java Full Stack Systems Engineer"
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />

          {/* Bottom Ethereal Identity Strip */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-40 font-mono text-white">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold text-aurora-lavender tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                EPPS INFOTECH LTD.
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/20 text-white/90 font-semibold">
                B.E. 2023
              </span>
            </div>
            <div className="text-xs font-display font-extrabold tracking-wide text-white">
              SHUBHAM AKADE
            </div>
            <div className="text-[10px] text-slate-300 opacity-90 truncate">
              Java Full Stack Developer & Systems Engineer
            </div>
          </div>

          {/* Click Hint Tooltip */}
          <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-mono text-aurora-lavender border border-white/10 z-40 flex items-center gap-1 group-hover:border-aurora-violet transition-colors">
            <Sparkles className="w-2.5 h-2.5 text-amber-400 animate-spin" />
            <span>CLICK TO BURST</span>
          </div>
        </div>

      </div>

      {/* ========================================================
          EXECUTIVE CONTINUOUS ARCHITECTURE TELEMETRY DECK
          Seamless left-to-right animated stream, 0% side clutter
          ======================================================== */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`mt-4 w-full max-w-[340px] sm:max-w-[440px] xl:max-w-[480px] rounded-2xl border backdrop-blur-2xl p-2.5 transition-all shadow-xl z-30 pointer-events-auto select-none ${
          isDark 
            ? 'bg-slate-950/80 border-aurora-violet/35 shadow-[0_12px_35px_rgba(0,0,0,0.5)]' 
            : 'bg-white/95 border-slate-200/90 shadow-[0_12px_35px_rgba(15,23,42,0.06)]'
        }`}
      >
        {/* Header Telemetry Status Bar */}
        <div className="flex items-center justify-between px-2 pb-2 mb-1.5 border-b border-white/10 dark:border-white/5 font-mono">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className={`text-[10px] font-extrabold uppercase tracking-wider ${isDark ? 'text-aurora-lavender' : 'text-slate-800'}`}>
              CORE STACK TELEMETRY
            </span>
          </div>
          <div className="flex items-center gap-1 text-[8.5px] uppercase tracking-wider font-semibold opacity-75">
            <span className="text-emerald-400 font-bold">STREAMING</span>
            <span className="text-emerald-400 animate-pulse font-bold">⇾</span>
          </div>
        </div>

        {/* Continuous Left-to-Right Animated Carousel Viewport */}
        <div 
          className="relative overflow-hidden w-full py-1"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          }}
        >
          <div className="animate-stream-right flex items-center gap-2.5">
            {[...streamSkills, ...streamSkills].map((sat, idx) => {
              const IconComponent = sat.icon;
              const colorKey = sat.color === 'emerald' ? 'emerald' : sat.color === 'sky' ? 'cyan' : sat.color === 'pink' ? 'rose' : sat.color === 'amber' ? 'amber' : sat.color === 'cyan' ? 'cyan' : 'violet';
              return (
                <div
                  key={`${sat.id}-${idx}`}
                  onMouseEnter={() => celestialAudio.playChime('hover')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border backdrop-blur-xl transition-all duration-300 hover:scale-105 shrink-0 shadow-sm cursor-pointer ${sat.borderColor} ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  <div className={`p-1 rounded-lg shrink-0 ${isDark ? 'bg-white/[0.08]' : 'bg-white shadow-xs'}`}>
                    <AnimatedIcon
                      icon={IconComponent}
                      variant="float"
                      color={colorKey}
                      size="sm"
                      badge={false}
                      className="shrink-0"
                    />
                  </div>
                  <div className="flex flex-col min-w-0 pr-1">
                    <span className={`font-mono text-[10.5px] font-bold tracking-tight leading-tight whitespace-nowrap ${sat.textColor}`}>
                      {sat.label}
                    </span>
                    <span className={`font-mono text-[8px] uppercase tracking-wider opacity-65 leading-none whitespace-nowrap ${
                      isDark ? 'text-slate-300' : 'text-slate-600 font-semibold'
                    }`}>
                      {sat.metric}
                    </span>
                  </div>
                  <span className={`w-1.5 h-1.5 rounded-full ${sat.dotColor} shrink-0`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
