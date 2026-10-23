import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import AnimatedIcon from './AnimatedIcon';

export default function Footer() {
  const { isDark } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-current/10 py-12 relative z-10 overflow-hidden transition-colors duration-500">
      {/* Ambient Aurora Glow Ribbon */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 blur-3xl pointer-events-none ${
        isDark
          ? 'bg-gradient-to-b from-aurora-violet/15 via-aurora-cyan/10 to-transparent'
          : 'bg-gradient-to-b from-atelier-violet/10 via-atelier-coral/5 to-transparent'
      }`} />

      <div className="max-w-7xl 2xl:max-w-[1440px] 3xl:max-w-[1640px] 4xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-current/10">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm card-alive-float-1 ${
              isDark ? 'bg-aurora-card border border-aurora-violet/40 text-aurora-lavender shadow-glow-violet' : 'bg-white border border-stone-300 text-atelier-violet shadow-sm'
            }`}>
              SA
            </div>
            <div>
              <div className="font-display font-bold text-base">
                SHUBHAM AKADE
              </div>
              <div className="font-mono text-[10px] opacity-60 uppercase tracking-wider">
                Java Full Stack Developer & Systems Engineer // Pune, India
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs opacity-75">
            <a href="#hero" className="hover:opacity-100 hover:text-aurora-lavender transition-all">TOP</a>
            <a href="#projects" className="hover:opacity-100 hover:text-aurora-lavender transition-all">ERP_SUITE</a>
            <a href="#architecture" className="hover:opacity-100 hover:text-aurora-lavender transition-all">PILLARS</a>
            <a href="#playground" className="hover:opacity-100 hover:text-aurora-lavender transition-all">KERNEL_LAB</a>
            <a href="#skills" className="hover:opacity-100 hover:text-aurora-lavender transition-all">BLUEPRINT</a>
            <a href="#contact" className="hover:opacity-100 hover:text-aurora-lavender transition-all">DISPATCH</a>
          </div>

          <button
            onClick={scrollToTop}
            className={`px-4 py-2.5 rounded-xl border transition-all flex items-center gap-2.5 font-mono text-xs w-fit group ${
              isDark
                ? 'bg-aurora-card border-white/10 text-slate-300 hover:text-white hover:border-aurora-violet/60 hover:shadow-glow-violet'
                : 'bg-white border-stone-200 text-stone-700 hover:border-atelier-violet/60 hover:text-stone-900 shadow-sm hover:shadow-glow-atelier'
            }`}
            title="Return to top of document"
          >
            <span>RETURN TO SUMMIT</span>
            <AnimatedIcon icon={ArrowUp} variant="float" palette="violet" size="sm" />
          </button>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[11px] opacity-60">
          <div>
            © {new Date().getFullYear()} Shubham Akade. Engineered for extreme reliability and transactional clarity.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>COORDINATES: {personalInfo.coordinates}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
