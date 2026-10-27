import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function LivingBackground() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let time = 0;
    let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Scroll parallax tracking
    let scrollY = window.scrollY || 0;
    let targetScrollY = window.scrollY || 0;
    const handleScroll = () => {
      targetScrollY = window.scrollY || 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Spacetime distortion ripples on click
    const ripples = [];
    const handleClick = (e) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 6,
        maxRadius: Math.min(width, height) * 0.38,
        alpha: 0.65,
        growth: 4.5,
      });
      if (ripples.length > 8) ripples.shift();
    };
    window.addEventListener('click', handleClick);

    // Layer 1: Foreground Constellation Particles
    const fgCount = width < 768 ? 28 : 52;
    const fgParticles = Array.from({ length: fgCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.8 + 0.8,
      baseAlpha: Math.random() * 0.4 + 0.25,
      phase: Math.random() * Math.PI * 2,
    }));

    // Layer 2: Deep Background Celestial Embers (Slow rising stardust)
    const bgCount = width < 768 ? 30 : 65;
    const bgStardust = Array.from({ length: bgCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vy: -(Math.random() * 0.25 + 0.08), // Gentle upward drift
      vx: (Math.random() - 0.5) * 0.12,
      radius: Math.random() * 1.2 + 0.4,
      alpha: Math.random() * 0.35 + 0.1,
      period: Math.random() * 4 + 2,
    }));

    // Periodic Energy Pulse System
    let pulseRadius = 0;
    let pulseAlpha = 0;
    let pulseTimer = 0;

    let isVisible = true;
    const handleVisibility = () => {
      isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      time += 0.012;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      scrollY += (targetScrollY - scrollY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const isMidnight = themeRef.current === 'midnight';

      // 1. Radiant Volumetric God Rays (Harmonic Solar/Aurora Shafts)
      const rayOriginX = width * 0.35 + (mouse.x - width * 0.5) * 0.03;
      const rayOriginY = -40;
      const rayCount = 7;
      ctx.save();
      for (let r = 0; r < rayCount; r++) {
        const angleBase = 0.45 + (r / rayCount) * 0.85;
        const angleSway = Math.sin(time * 0.4 + r * 1.2) * 0.08;
        const currentAngle = angleBase + angleSway;
        const rayLength = Math.max(width, height) * 1.45;

        const endX = rayOriginX + Math.cos(currentAngle) * rayLength;
        const endY = rayOriginY + Math.sin(currentAngle) * rayLength;

        const rayGrad = ctx.createLinearGradient(rayOriginX, rayOriginY, endX, endY);
        const rayAlpha = Math.sin(time * 0.6 + r * 0.9) * 0.018 + 0.028;

        if (isMidnight) {
          rayGrad.addColorStop(0, `rgba(167, 139, 250, ${rayAlpha * 1.9})`);
          rayGrad.addColorStop(0.4, `rgba(56, 189, 248, ${rayAlpha * 1.3})`);
          rayGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else {
          rayGrad.addColorStop(0, `rgba(124, 58, 237, ${rayAlpha * 0.85})`);
          rayGrad.addColorStop(0.4, `rgba(2, 132, 199, ${rayAlpha * 0.55})`);
          rayGrad.addColorStop(1, 'rgba(248, 250, 252, 0)');
        }

        ctx.beginPath();
        const beamWidth = 45 + r * 16;
        ctx.moveTo(rayOriginX - beamWidth * 0.2, rayOriginY);
        ctx.lineTo(endX - beamWidth * 1.5, endY);
        ctx.lineTo(endX + beamWidth * 1.5, endY);
        ctx.lineTo(rayOriginX + beamWidth * 0.2, rayOriginY);
        ctx.closePath();
        ctx.fillStyle = rayGrad;
        ctx.fill();
      }
      ctx.restore();

      // 2. Atmospheric Drifting Light Fields (Breathing Ethereal Glow)
      const breath = Math.sin(time * 0.5) * 0.012;
      const orbs = isMidnight
        ? [
            { xR: 0.2, yR: 0.25, r: 490, col: `rgba(139, 92, 246, ${0.048 + breath})`, sp: 0.0006, ph: 0 },
            { xR: 0.8, yR: 0.65, r: 530, col: `rgba(129, 140, 248, ${0.042 + breath})`, sp: 0.0005, ph: 2 },
            { xR: 0.5, yR: 0.85, r: 430, col: `rgba(45, 212, 191, ${0.028 + breath})`, sp: 0.0007, ph: 4 },
          ]
        : [
            { xR: 0.25, yR: 0.2, r: 460, col: `rgba(124, 58, 237, ${0.022 + breath})`, sp: 0.0006, ph: 0 },
            { xR: 0.75, yR: 0.6, r: 510, col: `rgba(2, 132, 199, ${0.016 + breath})`, sp: 0.0005, ph: 2 },
            { xR: 0.45, yR: 0.8, r: 410, col: `rgba(5, 150, 105, ${0.012 + breath})`, sp: 0.0007, ph: 4 },
          ];

      orbs.forEach((orb) => {
        const scrollDrift = (scrollY * 0.08) % (height * 0.5);
        const ox = width * orb.xR + Math.cos(time * orb.sp * 1000 + orb.ph) * 80;
        const oy = height * orb.yR - scrollDrift + Math.sin(time * orb.sp * 800 + orb.ph) * 70;
        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.r);
        grad.addColorStop(0, orb.col);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      });

      // 3. Deep Background Rising Stardust with Scroll Parallax
      if (!prefersReducedMotion) {
        for (let i = 0; i < bgStardust.length; i++) {
          const s = bgStardust[i];
          s.y += s.vy;
          s.x += s.vx;
          if (s.y < -10) s.y = height + 10;
          if (s.x < -10) s.x = width + 10;
          if (s.x > width + 10) s.x = -10;

          const renderY = (s.y - (scrollY * 0.14) % height + height) % height;

          const shimmer = Math.sin(time * s.period) * 0.12 + 0.88;
          ctx.beginPath();
          ctx.arc(s.x, renderY, s.radius, 0, Math.PI * 2);
          ctx.fillStyle = isMidnight ? '#C4B5FD' : '#8B5CF6';
          ctx.globalAlpha = isMidnight ? s.alpha * shimmer * 0.8 : s.alpha * shimmer * 0.5;
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      // 4. 3D Perspective Horizon Grid with Subtle Mouse Parallax
      const horizonY = height * 0.42;
      const fov = 300;
      const gridSpacing = 46;
      const gridZSpeed = (time * 20) % gridSpacing;

      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = isMidnight ? 'rgba(167, 139, 250, 0.045)' : 'rgba(15, 23, 42, 0.035)';
      ctx.lineWidth = 1;

      const vanishX = width / 2 + (mouse.x - width / 2) * 0.04;
      const count = 16;
      for (let i = -count; i <= count; i++) {
        const startX = vanishX + i * 92;
        ctx.moveTo(vanishX, horizonY);
        ctx.lineTo(startX, height + 80);
      }

      for (let z = 30; z < 420; z += 35) {
        const currentZ = z - gridZSpeed;
        if (currentZ <= 10) continue;
        const py = horizonY + (fov * 85) / currentZ;
        if (py > height + 80) continue;
        ctx.moveTo(0, py);
        ctx.lineTo(width, py);
      }
      ctx.stroke();
      ctx.restore();

      // 5. Interactive Spacetime Distortion Ripples on Click
      for (let rIdx = ripples.length - 1; rIdx >= 0; rIdx--) {
        const rip = ripples[rIdx];
        rip.radius += rip.growth;
        rip.alpha *= 0.965;

        if (rip.alpha < 0.01 || rip.radius > rip.maxRadius) {
          ripples.splice(rIdx, 1);
          continue;
        }

        ctx.save();
        // Outer wave
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = isMidnight
          ? `rgba(167, 139, 250, ${rip.alpha * 0.45})`
          : `rgba(124, 58, 237, ${rip.alpha * 0.35})`;
        ctx.lineWidth = 2.2;
        ctx.stroke();

        // Harmonic echo wave
        if (rip.radius > 20) {
          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.radius * 0.65, 0, Math.PI * 2);
          ctx.strokeStyle = isMidnight
            ? `rgba(56, 189, 248, ${rip.alpha * 0.25})`
            : `rgba(244, 63, 94, ${rip.alpha * 0.2})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
        ctx.restore();
      }

      // 6. Periodic Ethereal Energy Pulse
      pulseTimer += 0.016;
      if (pulseTimer > 7.5) {
        pulseTimer = 0;
        pulseRadius = 10;
        pulseAlpha = 0.35;
      }
      if (pulseAlpha > 0.005) {
        pulseRadius += 3.2;
        pulseAlpha *= 0.985;
        ctx.save();
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, pulseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = isMidnight
          ? `rgba(167, 139, 250, ${pulseAlpha * 0.22})`
          : `rgba(124, 58, 237, ${pulseAlpha * 0.12})`;
        ctx.lineWidth = 1.8;
        ctx.stroke();
        ctx.restore();
      }

      // 7. Foreground Living Constellation Particles & Threads
      for (let i = 0; i < fgParticles.length; i++) {
        const p = fgParticles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distMouse = Math.hypot(dx, dy);
          if (distMouse < 130 && distMouse > 0) {
            const force = ((130 - distMouse) / 130) * 0.7;
            p.x += (dx / distMouse) * force;
            p.y += (dy / distMouse) * force;
          }
        }

        const pulse = Math.sin(time * 2 + p.phase) * 0.15 + 0.85;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * pulse, 0, Math.PI * 2);

        let pColor;
        if (isMidnight) {
          pColor = i % 2 === 0 ? '#A78BFA' : '#38BDF8';
        } else {
          pColor = i % 2 === 0 ? '#7C3AED' : '#52525B';
        }
        ctx.fillStyle = pColor;
        ctx.globalAlpha = isMidnight ? p.baseAlpha * pulse : (p.baseAlpha * 0.7) * pulse;
        ctx.fill();

        // Constellation proximity threads
        for (let j = i + 1; j < fgParticles.length; j++) {
          const p2 = fgParticles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            const threadAlpha = (1 - dist / 110) * (isMidnight ? 0.15 : 0.08);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isMidnight
              ? `rgba(167, 139, 250, ${threadAlpha})`
              : `rgba(28, 25, 23, ${threadAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 block w-full h-full transition-opacity duration-700"
      aria-hidden="true"
    />
  );
}
