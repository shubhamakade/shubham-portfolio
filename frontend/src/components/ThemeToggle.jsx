import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? 'Ivory Atelier' : 'Midnight Aurora'} theme`}
      className={`relative inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-300 font-mono text-xs select-none ${
        isDark
          ? 'bg-aurora-card/60 border-white/10 text-aurora-lavender hover:border-aurora-violet hover:shadow-glow-violet'
          : 'bg-white border-stone-200 text-stone-800 hover:border-atelier-violet hover:shadow-glow-atelier'
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-aurora-violet transition-transform duration-300 rotate-0" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-amber-500 transition-transform duration-300 rotate-90" />
        )}
      </div>

      <span className="font-semibold text-[11px] tracking-wide hidden 2xl:inline">
        {isDark ? 'MIDNIGHT AURORA' : 'IVORY ATELIER'}
      </span>
    </button>
  );
}
