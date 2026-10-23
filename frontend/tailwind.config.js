/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        '3xl': '1920px',
        '4xl': '2560px',
      },
      colors: {
        // Theme variables mapped to Tailwind utilities
        theme: {
          base: 'var(--bg-base)',
          surface: 'var(--bg-surface)',
          card: 'var(--bg-card)',
          cardHover: 'var(--bg-card-hover)',
          border: 'var(--border-subtle)',
          borderProminent: 'var(--border-prominent)',
          text: 'var(--text-primary)',
          textSecondary: 'var(--text-secondary)',
          textMuted: 'var(--text-muted)',
          accent: 'var(--accent-primary)',
          accentSecondary: 'var(--accent-secondary)',
          accentTertiary: 'var(--accent-tertiary)',
        },
        // Midnight Aurora palette
        aurora: {
          night: '#0B0914',
          deep: '#100D1F',
          card: '#18142E',
          cardHover: '#221C3D',
          violet: '#A78BFA',
          lavender: '#C4B5FD',
          indigo: '#818CF8',
          teal: '#2DD4BF',
          sky: '#38BDF8',
          coral: '#FB7185',
        },
        // Ivory Atelier palette
        atelier: {
          ivory: '#FBF9F5',
          cream: '#F4EFE6',
          paper: '#FFFFFF',
          card: '#FFFFFF',
          cardHover: '#FAF7F0',
          charcoal: '#18181B',
          stone: '#52525B',
          muted: '#71717A',
          border: 'rgba(28, 25, 23, 0.08)',
          violet: '#7C3AED',
          rose: '#E11D48',
          emerald: '#059669',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Sora', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        grotesk: ['"Space Grotesk"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'shimmer-slow': 'text-shimmer 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        'text-shimmer': {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
      },
      boxShadow: {
        'glow-violet': '0 0 25px -4px rgba(167, 139, 250, 0.35)',
        'glow-teal': '0 0 25px -4px rgba(45, 212, 191, 0.3)',
        'glow-emerald': '0 0 25px -4px rgba(16, 185, 129, 0.4)',
        'glow-sky': '0 0 25px -4px rgba(56, 189, 248, 0.4)',
        'glow-amber': '0 0 25px -4px rgba(245, 158, 11, 0.35)',
        'glow-atelier': '0 12px 30px -8px rgba(124, 58, 237, 0.18)',
      },
    },
  },
  plugins: [],
}
