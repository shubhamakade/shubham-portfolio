import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const canvasRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouse = { x: -100, y: -100 };
    let ring = { x: -100, y: -100 };
    let isHovered = false;
    let isVisible = false;
    let sparks = [];
    let animId;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const colorsDark = [
      { hex: '#C084FC', rgb: '192, 132, 252' },
      { hex: '#38BDF8', rgb: '56, 189, 248' },
      { hex: '#34D399', rgb: '52, 211, 153' },
      { hex: '#FBBF24', rgb: '251, 191, 36' },
    ];
    const colorsLight = [
      { hex: '#7C3AED', rgb: '124, 58, 237' },
      { hex: '#E11D48', rgb: '225, 29, 72' },
      { hex: '#059669', rgb: '5, 150, 105' },
    ];

    const getPalette = () => (isDark ? colorsDark : colorsLight);

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!isVisible) isVisible = true;

      // Emit multi-spectral stardust spark
      if (Math.random() > 0.35) {
        const palette = getPalette();
        const chosen = palette[Math.floor(Math.random() * palette.length)];
        sparks.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 0.9,
          vy: (Math.random() - 0.5) * 0.9 - 0.2, // subtle upward drift
          radius: Math.random() * 2.2 + 1.2,
          alpha: 0.75,
          color: chosen,
        });
        if (sparks.length > 36) sparks.shift();
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.dataset.interactive
      ) {
        if (!isHovered) {
          // Emit subtle micro-sparkle burst on hover
          const palette = getPalette();
          for (let k = 0; k < 4; k++) {
            const chosen = palette[Math.floor(Math.random() * palette.length)];
            const angle = (Math.PI * 2 * k) / 4 + Math.random() * 0.5;
            const speed = 1.2 + Math.random() * 0.8;
            sparks.push({
              x: mouse.x,
              y: mouse.y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              radius: Math.random() * 2 + 1.5,
              alpha: 0.85,
              color: chosen,
            });
          }
        }
        isHovered = true;
      } else {
        isHovered = false;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    const render = () => {
      // Lerp ring towards mouse with smooth damping
      ring.x += (mouse.x - ring.x) * 0.18;
      ring.y += (mouse.y - ring.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%) scale(${
          isHovered ? 1.8 : 1
        })`;
        dotRef.current.style.opacity = isVisible ? '1' : '0';
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${
          isHovered ? 1.5 : 1
        }) rotate(${isHovered ? '45deg' : '0deg'})`;
        ringRef.current.style.opacity = isVisible ? '1' : '0';
      }

      // Render multi-spectral comet sparks
      ctx.clearRect(0, 0, width, height);
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha *= 0.91;
        s.radius *= 0.96;

        if (s.alpha < 0.02) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        const col = s.color || (isDark ? colorsDark[0] : colorsLight[0]);
        ctx.fillStyle = `rgba(${col.rgb}, ${s.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = col.hex;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, [isDark]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50 block transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Center Precision Cursor Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-50 transition-transform duration-100 ease-out ${
          isDark
            ? 'bg-aurora-lavender shadow-glow-violet'
            : 'bg-atelier-violet shadow-glow-atelier'
        }`}
      />

      {/* Orbiting Halo Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-7 h-7 rounded-full border pointer-events-none z-50 transition-all duration-200 ease-out ${
          isDark
            ? 'border-aurora-violet/50 shadow-glow-violet'
            : 'border-atelier-violet/40 shadow-glow-atelier'
        }`}
      />
    </>
  );
}
