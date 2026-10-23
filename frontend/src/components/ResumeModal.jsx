import React, { useState } from 'react';
import { X, FileDown, ExternalLink, Check, Copy, Award, Briefcase, GraduationCap, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import celestialAudio from '../utils/celestialAudio';

export default function ResumeModal({ isOpen, onClose }) {
  const { isDark } = useTheme();
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloading(true);
    celestialAudio.playChime('affirm');

    // Trigger genuine download of official ATS resume PDF
    const link = document.createElement('a');
    link.href = '/Shubham_Akade_Resume.pdf';
    link.download = 'Shubham_Akade_Java_Full_Stack_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloading(false);
    }, 1800);
  };

  const handleCopySummary = () => {
    celestialAudio.playChime('chime');
    const summaryText = `SHUBHAM AKADE — JAVA FULL STACK DEVELOPER
Phone: +91 9373156685 | Email: akadeshubham@gmail.com | Pune, India
LinkedIn: https://www.linkedin.com/in/shubham-akade-b342211ab/

EXPERIENCE:
- Java Developer @ EPPS Infotech Ltd. (Jul 2025 - Present): Multi-module ERP (MMS, FAMS, PQMS) built with Java 17, Spring MVC, Spring Boot 3, Hibernate/JPA, PostgreSQL, and GraphQL mobile microservices.
- Java Full Stack Developer Intern @ Robowaves (Dec 2024 - Jun 2025): Telemetry APIs, MySQL relational modeling, React dashboards.

EDUCATION:
- B.E. in Computer Engineering — Government College of Engineering, Chandrapur (GCOE Chandrapur), 2019 - 2023.

TECHNICAL SKILLS:
Java 17, Spring Boot 3, Spring Data JPA, Hibernate, PostgreSQL, MySQL, GraphQL, REST APIs, React 18, Angular, Maven, Git, Docker, Linux.`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-md bg-black/60 animate-in fade-in duration-300">
      <div
        className={`w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden transition-all duration-300 ${
          isDark
            ? 'bg-aurora-night/95 border-aurora-violet/40 text-slate-100 shadow-glow-violet'
            : 'bg-white/95 border-stone-300 text-stone-900 shadow-2xl'
        }`}
      >
        {/* Modal Top Ribbon Header */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b ${
            isDark ? 'bg-aurora-card/60 border-white/10' : 'bg-stone-50 border-stone-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                isDark ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              <FileDown className="w-4 h-4 animate-bounce" style={{ animationDuration: '2.5s' }} />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-base tracking-tight flex items-center gap-2">
                <span>OFFICIAL ATS RESUME DOSSIER</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
                  VERIFIED 2026
                </span>
              </h3>
              <p className="font-mono text-[11px] opacity-60">Shubham_Akade_Java_Full_Stack_Resume.pdf (93 KB)</p>
            </div>
          </div>

          <button
            onClick={() => {
              celestialAudio.playChime('chime');
              onClose();
            }}
            className={`p-1.5 rounded-lg border transition-colors ${
              isDark ? 'border-white/10 text-slate-400 hover:text-white hover:bg-white/5' : 'border-stone-200 text-stone-500 hover:text-stone-900 hover:bg-stone-100'
            }`}
            aria-label="Close Resume Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / ATS Quick Highlights */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Quick Header Identity Card */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              isDark ? 'bg-aurora-card/40 border-white/10' : 'bg-stone-50 border-stone-200'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <img
                src="/shubham_akade_executive.png"
                alt="Shubham Akade"
                className="w-14 h-14 rounded-xl object-cover object-top border border-aurora-violet/30 shadow-md"
              />
              <div>
                <h4 className="font-display font-bold text-base">{personalInfo.name}</h4>
                <p className="font-mono text-xs opacity-75">{personalInfo.title}</p>
                <p className="font-mono text-[11px] text-emerald-400 font-medium">
                  {personalInfo.company} • {personalInfo.location}
                </p>
              </div>
            </div>

            <div className="flex sm:flex-col items-end gap-1.5 font-mono text-[11px]">
              <span className="opacity-60">{personalInfo.social.email}</span>
              <span className="opacity-60">{personalInfo.social.phone}</span>
            </div>
          </div>

          {/* Core Verified Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            <div
              className={`p-3.5 rounded-xl border ${
                isDark ? 'bg-aurora-card/30 border-white/5' : 'bg-white border-stone-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-1.5 text-aurora-lavender">
                <Briefcase className="w-4 h-4 text-aurora-violet" />
                <span>EXPERIENCE</span>
              </div>
              <p className="font-semibold text-slate-200">EPPS Infotech Ltd. (Jul 2025 - Present)</p>
              <p className="opacity-70 text-[11px] mt-0.5">
                Core Java Developer on Multi-module ERP (MMS, FAMS, PQMS) & Spring Boot 3 GraphQL mobile microservices.
              </p>
            </div>

            <div
              className={`p-3.5 rounded-xl border ${
                isDark ? 'bg-aurora-card/30 border-white/5' : 'bg-white border-stone-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-1.5 text-sky-400">
                <GraduationCap className="w-4 h-4 text-sky-400" />
                <span>EDUCATION</span>
              </div>
              <p className="font-semibold text-slate-200">B.E. Computer Engineering (2019 - 2023)</p>
              <p className="opacity-70 text-[11px] mt-0.5">
                Government College of Engineering, Chandrapur (GCOE Chandrapur).
              </p>
            </div>
          </div>

          {/* Key ATS Keywords Pill Cloud */}
          <div>
            <div className="text-[11px] font-mono opacity-60 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>ATS PARSED CORE COMPETENCIES</span>
            </div>
            <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
              {[
                'Java 17',
                'Spring Boot 3',
                'Spring Data JPA',
                'Hibernate',
                'PostgreSQL',
                'GraphQL',
                'RESTful APIs',
                'React 18',
                'Angular',
                'Enterprise ERP',
                'Maven',
                'Docker',
                'Liquibase',
                'Git / SVN',
              ].map((skill) => (
                <span
                  key={skill}
                  className={`px-2.5 py-1 rounded-md border ${
                    isDark
                      ? 'bg-aurora-card border-aurora-violet/20 text-slate-300'
                      : 'bg-stone-100 border-stone-200 text-stone-700'
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t ${
            isDark ? 'bg-aurora-card/60 border-white/10' : 'bg-stone-50 border-stone-200'
          }`}
        >
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopySummary}
              className={`flex-1 sm:flex-none px-3 py-2 rounded-lg font-mono text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                isDark
                  ? 'bg-aurora-card border-white/10 text-slate-300 hover:text-white'
                  : 'bg-white border-stone-300 text-stone-700 hover:text-stone-900'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY ATS SUMMARY'}</span>
            </button>

            <a
              href="/Shubham_Akade_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={() => celestialAudio.playChime('chime')}
              className={`flex-1 sm:flex-none px-3 py-2 rounded-lg font-mono text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                isDark
                  ? 'bg-aurora-card border-white/10 text-slate-300 hover:text-white'
                  : 'bg-white border-stone-300 text-stone-700 hover:text-stone-900'
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>PREVIEW IN TAB</span>
            </a>
          </div>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className={`w-full sm:w-auto px-6 py-2.5 rounded-lg font-mono text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-lg ${
              isDark
                ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-glow-emerald'
                : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md'
            }`}
          >
            <FileDown className={`w-4 h-4 ${downloading ? 'animate-bounce' : ''}`} />
            <span>{downloading ? 'TRANSMITTING PDF (93KB)...' : 'DOWNLOAD RESUME (PDF)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
