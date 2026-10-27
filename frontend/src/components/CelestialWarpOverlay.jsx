import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, ZapOff } from 'lucide-react';
import celestialAudio from '../utils/celestialAudio';

export default function CelestialWarpOverlay({ active, onToggle }) {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();
  const [renderVisible, setRenderVisible] = useState(active);

  useEffect(() => {
    if (active) {
      setRenderVisible(true);
    }
  }, [active]);

  useEffect(() => {
    if (!renderVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const cx = width / 2;
    const cy = height / 2;

    // Create 360 relativistic warp streak particles
    const stars = Array.from({ length: 360 }, () => ({
      x: (Math.random() - 0.5) * width * 1.2,
      y: (Math.random() - 0.5) * height * 1.2,
      z: Math.random() * width,
      pz: 0,
      size: Math.random() * 2.2 + 1,
      color: Math.random() > 0.45 
        ? isDark ? '#C4B5FD' : '#8B5CF6' 
        : isDark ? '#38BDF8' : '#F59E0B'
    }));

    let currentSpeed = 4;
    let targetSpeed = active ? 45 : 0;
    let shockwaveRadius = 0;
    let shockwaveAlpha = 0;
    let fadeOutAlpha = 1;
    let time = 0;

    const render = () => {
      time += 0.016;

      // Smooth acceleration / deceleration
      targetSpeed = active ? 42 : 0;
      currentSpeed += (targetSpeed - currentSpeed) * 0.08;

      if (!active) {
        fadeOutAlpha *= 0.92;
        if (fadeOutAlpha < 0.02 && currentSpeed < 1) {
          setRenderVisible(false);
          return;
        }
      } else {
        fadeOutAlpha += (1 - fadeOutAlpha) * 0.1;
      }

      // Dark translucent wash to create light streak trails
      ctx.fillStyle = isDark 
        ? `rgba(11, 9, 20, ${0.3 * fadeOutAlpha})` 
        : `rgba(251, 249, 245, ${0.3 * fadeOutAlpha})`;
      ctx.fillRect(0, 0, width, height);

      // Render warp streaks
      for (let star of stars) {
        star.pz = star.z;
        star.z -= currentSpeed;

        if (star.z <= 0) {
          star.z = width;
          star.pz = width;
          star.x = (Math.random() - 0.5) * width * 1.2;
          star.y = (Math.random() - 0.5) * height * 1.2;
        }

        const k = 250 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        const pk = 250 / star.pz;
        const ox = star.x * pk + cx;
        const oy = star.y * pk + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          ctx.beginPath();
          ctx.moveTo(ox, oy);
          ctx.lineTo(px, py);
          ctx.strokeStyle = star.color;
          ctx.lineWidth = Math.min(star.size * (1 - star.z / width) * 2.8, 4.5);
          ctx.shadowBlur = 12;
          ctx.shadowColor = star.color;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }

      // Ethereal reality shockwave ring expanding from center
      if (active) {
        shockwaveRadius = (shockwaveRadius + 8) % (Math.max(width, height) * 0.85);
        shockwaveAlpha = (1 - shockwaveRadius / (Math.max(width, height) * 0.85)) * 0.45;
        
        const grad = ctx.createRadialGradient(cx, cy, Math.max(0, shockwaveRadius - 90), cx, cy, shockwaveRadius);
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(0.6, isDark ? `rgba(139, 92, 246, ${shockwaveAlpha * 0.5})` : `rgba(244, 63, 94, ${shockwaveAlpha * 0.4})`);
        grad.addColorStop(0.9, isDark ? `rgba(196, 181, 253, ${shockwaveAlpha * 0.8})` : `rgba(124, 58, 237, ${shockwaveAlpha * 0.7})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, shockwaveRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [renderVisible, active, isDark]);

  if (!renderVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-500 pointer-events-none select-none ${
      active ? 'opacity-100' : 'opacity-0'
    }`}>
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Floating Center Warp Status & Click-to-Unwrap Trigger */}
      <div className="absolute top-16 inset-x-0 flex flex-col items-center justify-center gap-2 pointer-events-auto">
        <button
          onClick={() => {
            celestialAudio.playChime('affirm');
            if (onToggle) onToggle();
          }}
          className={`px-6 py-2.5 rounded-full font-mono text-xs tracking-widest uppercase font-bold backdrop-blur-2xl border shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer ${
            isDark 
              ? 'bg-aurora-night/90 border-aurora-violet text-aurora-lavender shadow-glow-violet hover:border-white' 
              : 'bg-white/95 border-atelier-violet text-atelier-violet shadow-glow-atelier hover:border-slate-900'
          }`}
          title="Click to collapse warp and restore standard universe"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
          <span>✦ HYPERDRIVE ACTIVE // CLICK TO UNWRAP ✦</span>
          <ZapOff className="w-3.5 h-3.5 ml-1 opacity-70" />
        </button>
      </div>
    </div>
  );
}
