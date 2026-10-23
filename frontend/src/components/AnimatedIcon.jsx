import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import celestialAudio from '../utils/celestialAudio';

export default function AnimatedIcon({
  icon: Icon,
  variant = 'pulse',
  color = 'violet',
  size = 'md',
  badge = true,
  className = '',
  sound = null,
  onClick,
}) {
  const { isDark } = useTheme();

  if (!Icon) return null;

  // Color theme presets
  const colorMap = {
    violet: {
      darkBadge: 'bg-aurora-violet/15 border-aurora-violet/40 text-aurora-lavender shadow-glow-violet',
      lightBadge: 'bg-purple-50 border-purple-200 text-atelier-violet shadow-sm',
      radar: isDark ? 'bg-aurora-violet' : 'bg-atelier-violet',
      glow: '#A78BFA',
    },
    cyan: {
      darkBadge: 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300 shadow-glow-cyan',
      lightBadge: 'bg-sky-50 border-sky-200 text-sky-700 shadow-sm',
      radar: 'bg-cyan-400',
      glow: '#38BDF8',
    },
    emerald: {
      darkBadge: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 shadow-glow-emerald',
      lightBadge: 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm',
      radar: 'bg-emerald-400',
      glow: '#34D399',
    },
    amber: {
      darkBadge: 'bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-glow-amber',
      lightBadge: 'bg-amber-50 border-amber-200 text-amber-700 shadow-sm',
      radar: 'bg-amber-400',
      glow: '#FBBF24',
    },
    rose: {
      darkBadge: 'bg-rose-500/15 border-rose-500/40 text-rose-300',
      lightBadge: 'bg-rose-50 border-rose-200 text-rose-700 shadow-sm',
      radar: 'bg-rose-400',
      glow: '#FB7185',
    },
  };

  const scheme = colorMap[color] || colorMap.violet;

  // Size presets
  const sizeMap = {
    sm: { container: 'w-7 h-7', icon: 'w-3.5 h-3.5' },
    md: { container: 'w-9 h-9', icon: 'w-4.5 h-4.5' },
    lg: { container: 'w-11 h-11', icon: 'w-5.5 h-5.5' },
    xl: { container: 'w-14 h-14', icon: 'w-7 h-7' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  // Variant motion animations
  const iconVariants = {
    pulse: {
      animate: { scale: [1, 1.08, 1] },
      transition: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
    },
    float: {
      animate: { y: [0, -3.5, 0] },
      transition: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
    },
    spin: {
      animate: { rotate: 360 },
      transition: { duration: 16, repeat: Infinity, ease: 'linear' },
    },
    radar: {
      animate: { scale: [1, 1.12, 1] },
      transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
    },
    wiggle: {
      whileHover: { rotate: [0, -8, 8, -4, 4, 0], scale: 1.15 },
      transition: { duration: 0.45 },
    },
  };

  const chosenVariant = iconVariants[variant] || iconVariants.pulse;

  const handleClick = (e) => {
    if (sound) celestialAudio.playChime(sound);
    if (onClick) onClick(e);
  };

  const iconElement = (
    <motion.div
      {...chosenVariant}
      whileHover={{ scale: 1.15, rotate: variant === 'spin' ? undefined : 6 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      className="relative flex items-center justify-center select-none"
    >
      <Icon className={currentSize.icon} />
    </motion.div>
  );

  if (!badge) {
    return (
      <div onClick={handleClick} className={"inline-flex items-center justify-center " + className}>
        {iconElement}
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 350, damping: 20 }}
      onClick={handleClick}
      className={"relative rounded-xl border backdrop-blur-md flex items-center justify-center group/icon transition-colors " + currentSize.container + " " + (isDark ? scheme.darkBadge : scheme.lightBadge) + " " + className}
    >
      {/* Ambient Pulsing Radar Ring */}
      <span
        className={"absolute -inset-0.5 rounded-xl opacity-35 filter blur-sm pointer-events-none group-hover/icon:opacity-80 transition-opacity " + scheme.radar}
      />

      {/* Center Icon */}
      <div className="relative z-10 flex items-center justify-center">
        {iconElement}
      </div>
    </motion.div>
  );
}
