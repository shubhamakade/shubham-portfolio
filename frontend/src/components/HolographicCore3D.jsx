import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function HolographicCore3D({ className = "" }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const { theme, isDark } = useTheme();
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = 0;
    let height = 0;
    let time = 0;

    const resize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 42 }, () => ({
      tier: Math.floor(Math.random() * 3),
      angle: Math.random() * Math.PI * 2,
      speed: 0.015 + Math.random() * 0.018,
      radius: 1.2 + Math.random() * 1.8,
      verticalProgress: Math.random(),
      verticalDir: Math.random() > 0.5 ? 1 : -1,
    }));

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mousePos.current.targetX = x * 0.35;
      mousePos.current.targetY = y * 0.25;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      time += 0.02;

      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const isMidnight = themeRef.current === 'midnight';
      const centerX = width / 2;
      const centerY = height / 2 + 10;
      const rotX = 0.55 + mousePos.current.y;
      const rotY = time * 0.18 + mousePos.current.x;

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
          x: centerX + x1 * scale,
          y: centerY + y2 * scale,
          scale: scale,
          depth: z2,
        };
      };

      // 1. Orbital Rings
      ctx.lineWidth = 1;
      for (let r = 120; r <= 220; r += 50) {
        ctx.beginPath();
        for (let a = 0; a <= Math.PI * 2 + 0.1; a += 0.2) {
          const pt = project(Math.cos(a) * r, 0, Math.sin(a) * r);
          if (a === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = isMidnight ? 'rgba(167, 139, 250, 0.1)' : 'rgba(124, 58, 237, 0.08)';
        ctx.stroke();
      }

      // 2. Three Architectural Tiers
      const tiers = isMidnight
        ? [
            { y: -75, label: "INGRESS", color: "rgba(167, 139, 250, ", size: 100 },
            { y: 0, label: "KERNEL", color: "rgba(129, 140, 248, ", size: 125 },
            { y: 75, label: "STORAGE", color: "rgba(45, 212, 191, ", size: 100 },
          ]
        : [
            { y: -75, label: "INGRESS", color: "rgba(124, 58, 237, ", size: 100 },
            { y: 0, label: "KERNEL", color: "rgba(225, 29, 72, ", size: 125 },
            { y: 75, label: "STORAGE", color: "rgba(13, 148, 136, ", size: 100 },
          ];

      // Vertical Conduits
      const conduitCorners = [
        { x: -50, z: -50 },
        { x: 50, z: -50 },
        { x: 50, z: 50 },
        { x: -50, z: 50 },
      ];

      ctx.lineWidth = 1;
      conduitCorners.forEach((c) => {
        const topPt = project(c.x, -85, c.z);
        const botPt = project(c.x, 85, c.z);
        ctx.beginPath();
        ctx.moveTo(topPt.x, topPt.y);
        ctx.lineTo(botPt.x, botPt.y);
        ctx.strokeStyle = isMidnight ? 'rgba(196, 181, 253, 0.18)' : 'rgba(28, 25, 23, 0.12)';
        ctx.stroke();
      });

      // Tier Plates
      tiers.forEach((tier, index) => {
        const s = tier.size;
        const pts = [
          project(-s, tier.y, -s),
          project(s, tier.y, -s),
          project(s, tier.y, s),
          project(-s, tier.y, s),
        ];

        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        pts.forEach((p) => ctx.lineTo(p.x, p.y));
        ctx.closePath();
        ctx.fillStyle = `${tier.color}0.04)`;
        ctx.fill();

        ctx.strokeStyle = `${tier.color}0.38)`;
        ctx.lineWidth = index === 1 ? 1.8 : 1.2;
        ctx.stroke();

        const centerPt = project(0, tier.y, 0);
        ctx.beginPath();
        ctx.arc(centerPt.x, centerPt.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `${tier.color}0.85)`;
        ctx.fill();

        for (let g = -s + 40; g < s; g += 40) {
          const l1 = project(g, tier.y, -s);
          const l2 = project(g, tier.y, s);
          ctx.beginPath();
          ctx.moveTo(l1.x, l1.y);
          ctx.lineTo(l2.x, l2.y);
          ctx.strokeStyle = `${tier.color}0.08)`;
          ctx.stroke();
        }
      });

      // Moving Particles
      particles.forEach((p) => {
        p.angle += p.speed;
        p.verticalProgress += 0.008 * p.verticalDir;
        if (p.verticalProgress > 1 || p.verticalProgress < 0) {
          p.verticalDir *= -1;
        }

        const tierY = -75 + p.verticalProgress * 150;
        const radius = 60 + Math.sin(time + p.angle) * 30;
        const px = Math.cos(p.angle) * radius;
        const pz = Math.sin(p.angle) * radius;

        const projected = project(px, tierY, pz);

        ctx.beginPath();
        ctx.arc(projected.x, projected.y, Math.max(1, p.radius * projected.scale), 0, Math.PI * 2);
        ctx.fillStyle = isMidnight ? (p.angle > Math.PI ? '#A78BFA' : '#38BDF8') : (p.angle > Math.PI ? '#7C3AED' : '#E11D48');
        ctx.fill();
      });

      // Spinning Central Core Cube
      const cubeSize = 24 + Math.sin(time * 2) * 2.5;
      const cubeCorners = [
        project(-cubeSize, -cubeSize, -cubeSize),
        project(cubeSize, -cubeSize, -cubeSize),
        project(cubeSize, cubeSize, -cubeSize),
        project(-cubeSize, cubeSize, -cubeSize),
        project(-cubeSize, -cubeSize, cubeSize),
        project(cubeSize, -cubeSize, cubeSize),
        project(cubeSize, cubeSize, cubeSize),
        project(-cubeSize, cubeSize, cubeSize),
      ];

      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7],
      ];

      ctx.strokeStyle = isMidnight ? '#A78BFA' : '#7C3AED';
      ctx.lineWidth = 1.6;
      edges.forEach(([i, j]) => {
        ctx.beginPath();
        ctx.moveTo(cubeCorners[i].x, cubeCorners[i].y);
        ctx.lineTo(cubeCorners[j].x, cubeCorners[j].y);
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full h-full min-h-[420px] select-none ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Futuristic HUD Clean Top Bar */}
      <div className={`absolute top-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] tracking-wider px-3 py-1.5 rounded-lg border backdrop-blur-md transition-colors ${
        isDark
          ? 'bg-aurora-night/85 border-aurora-violet/20 text-slate-300'
          : 'bg-white/85 border-slate-200 text-slate-700 shadow-sm'
      }`}>
        <div className={`flex items-center gap-2 font-bold ${isDark ? 'text-aurora-lavender' : 'text-atelier-violet'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-aurora-violet animate-ping' : 'bg-atelier-violet animate-ping'}`} />
          <span>KERNEL: SPRING_BOOT_3.2</span>
        </div>
        <div className="opacity-80">
          TX_ISOLATION: <span className="font-semibold text-emerald-500">READ_COMMITTED</span>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className={`absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] px-3 py-1.5 rounded-lg border backdrop-blur-md transition-colors ${
        isDark
          ? 'bg-aurora-night/70 border-white/5 text-slate-400'
          : 'bg-white/70 border-slate-200 text-slate-600'
      }`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-aurora-violet' : 'bg-atelier-violet'}`} />
            T1: INGRESS
          </span>
          <span className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-indigo-400' : 'bg-rose-500'}`} />
            T2: KERNEL/JPA
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            T3: POSTGRESQL/REDIS
          </span>
        </div>
        <div className={`font-semibold hidden md:block ${isDark ? 'text-aurora-lavender' : 'text-atelier-violet'}`}>
          PARALLAX: 60 FPS
        </div>
      </div>
    </div>
  );
}
