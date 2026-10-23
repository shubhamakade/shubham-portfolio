import React, { useRef } from 'react';

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(167, 139, 250, 0.20)',
  spotlightSize = 380,
  as: Component = 'div',
  ...props
}) {
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty('--mouse-x', `${x}px`);
    containerRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <Component
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`spotlight-card relative overflow-hidden group ${className}`}
      {...props}
    >
      {/* Specular Dynamic Spotlight Layer */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(${spotlightSize}px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${spotlightColor}, transparent 75%)`,
        }}
      />
      {children}
    </Component>
  );
}
