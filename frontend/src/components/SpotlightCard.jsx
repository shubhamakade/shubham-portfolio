import React, { useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor,
  spotlightSize = 380,
  variant = 'default', // 'default' | 'kpi' | 'featured' | 'interactive'
  as: Component = 'div',
  ...props
}) {
  const containerRef = useRef(null);
  const { isDark } = useTheme();

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty('--mouse-x', `${x}px`);
    containerRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  // Theme-aware dynamic spotlight fallback
  const resolvedSpotlight = spotlightColor || (
    isDark
      ? 'rgba(167, 139, 250, 0.22)'
      : 'rgba(124, 58, 237, 0.14)'
  );

  // Variant class mapping
  const variantClass = {
    default: '',
    kpi: 'dynamic-kpi-border',
    featured: 'dynamic-border-beam',
    interactive: 'dynamic-card-glow',
  }[variant] || '';

  return (
    <Component
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`spotlight-card relative overflow-hidden group ${variantClass} ${className}`}
      {...props}
    >
      {/* Specular Interactive Cursor Spotlight Layer */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(${spotlightSize}px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${resolvedSpotlight}, transparent 75%)`,
        }}
      />

      {/* Living Ambient Diagonal Sheen for High-Impact Cards */}
      {(variant === 'featured' || variant === 'kpi') && (
        <div
          className="pointer-events-none absolute -inset-full opacity-[0.035] group-hover:opacity-[0.07] transition-opacity duration-500"
          style={{
            background: isDark
              ? 'linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.8) 50%, transparent 60%)'
              : 'linear-gradient(115deg, transparent 40%, rgba(124,58,237,0.5) 50%, transparent 60%)',
            backgroundSize: '200% 200%',
            animation: 'dynamic-border-sweep 14s ease-in-out infinite',
          }}
        />
      )}

      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </Component>
  );
}
