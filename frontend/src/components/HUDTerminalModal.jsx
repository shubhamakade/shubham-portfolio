import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, Minimize2, CornerDownLeft, Sparkles, FileDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import celestialAudio from '../utils/celestialAudio';

export default function HUDTerminalModal({ isOpen, onClose, onWarp, onOpenResume }) {
  const { isDark, toggleTheme, theme } = useTheme();
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'EPPS HYPERVISOR KERNEL v2.6.4 — INITIALIZED' },
    { type: 'system', text: 'AUTHENTICATED AGENT: SHUBHAM AKADE [JAVA FULL STACK]' },
    { type: 'info', text: 'Type "help" to display operational directives, or "resume" to retrieve official credentials.' },
  ]);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    celestialAudio.playChime('chime');

    const newHistory = [...history, { type: 'user', text: `$ ${inputVal}` }];
    setInputVal('');

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'response',
          text: `AVAILABLE SYSTEM DIRECTIVES:
  • resume / cv     : Transmit and download official ATS Resume (PDF 93KB)
  • warp / ascend   : Engage relativistic celestial hyperspace warp
  • skills          : Display audited enterprise technology stack
  • projects        : Audit EPPS Enterprise ERP (MMS, FAMS, PQMS) and Mobile ERP
  • whoami          : Identity dossier & engineering profile
  • theme           : Toggle between Midnight Aurora and Ivory Atelier
  • audio           : Toggle celestial Web Audio synthesizer chimes
  • contact         : Access verified comms channels (Email, Phone, LinkedIn)
  • clear           : Purge telemetry buffer
  • exit            : Terminate terminal session`,
        });
        break;

      case 'resume':
      case 'cv':
      case 'download':
        celestialAudio.playChime('affirm');
        // Trigger download
        const link = document.createElement('a');
        link.href = '/Shubham_Akade_Resume.pdf';
        link.download = 'Shubham_Akade_Java_Full_Stack_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        newHistory.push({
          type: 'success',
          text: `[SUCCESS] Dispatched Shubham_Akade_Java_Full_Stack_Resume.pdf (93 KB).
Verification: B.E. Computer Engineering (GCOE Chandrapur 2023) | Java Developer @ EPPS Infotech Ltd.`,
        });
        if (onOpenResume) {
          setTimeout(() => onOpenResume(), 400);
        }
        break;

      case 'warp':
      case 'ascend':
      case 'hyperspace':
        celestialAudio.playWarpSweep();
        newHistory.push({
          type: 'system',
          text: '[ALERT] ENGAGING CELESTIAL REALITY WARP ENGINE...',
        });
        if (onWarp) {
          setTimeout(() => {
            onClose();
            onWarp();
          }, 300);
        }
        break;

      case 'skills':
        newHistory.push({
          type: 'response',
          text: `CORE PRODUCTION STACK:
  [BACKEND]   : Java 17, Spring Boot 3, Spring Data JPA, Hibernate, REST APIs, GraphQL
  [FRONTEND]  : React 18, Angular, TypeScript, Tailwind CSS, Web Audio API, Canvas 2D
  [DATABASE]  : PostgreSQL (Pessimistic Concurrency), MySQL, Liquibase
  [ENTERPRISE]: Multi-Module Maven, Tomcat, NGINX, Docker, SVN/Git`,
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'response',
          text: `VERIFIED ENTERPRISE CODEBASES:
  1. EPPS Enterprise ERP (Trunk Suite)
     - Modules: MMS (Mess Management), FAMS (Fixed Assets), PQMS (Quality Assurance)
     - Architecture: Java 17, Spring MVC, Spring Data JPA, PostgreSQL
  2. EPPS Smart Mobile ERP
     - Architecture: Spring Boot 3, GraphQL @QueryMapping, Docker
     - High-speed Sub-40ms P99 Latency SLA`,
        });
        break;

      case 'whoami':
        newHistory.push({
          type: 'response',
          text: `IDENT: Shubham Akade
ROLE : Java Full Stack Developer & Distributed Systems Architect
ORG  : EPPS Infotech Ltd. (Jul 2025 - Present)
ALUM : Government College of Engineering, Chandrapur (B.E. 2019-2023)
LOC  : Pune, Maharashtra, India [18.5204° N, 73.8567° E]`,
        });
        break;

      case 'theme':
        toggleTheme();
        newHistory.push({
          type: 'system',
          text: `Visual theme altered to: ${theme === 'midnight' ? 'Ivory Atelier' : 'Midnight Aurora'}.`,
        });
        break;

      case 'audio':
        const muted = celestialAudio.toggleMute();
        newHistory.push({
          type: 'system',
          text: `Celestial audio synthesizer: ${muted ? 'MUTED' : 'ACTIVE (E Major Harmonics)'}.`,
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'response',
          text: `DISPATCH COMMS:
  • Email    : akadeshubham@gmail.com
  • Phone    : +91 9373156685
  • LinkedIn : https://www.linkedin.com/in/shubham-akade-b342211ab/
  • GitHub   : https://github.com/shubhamakade`,
        });
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `Directive "${cmd}" not recognized. Type "help" for catalog of commands.`,
        });
        break;
    }

    setHistory(newHistory);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-md bg-black/70 animate-in fade-in duration-200">
      <div
        className={`w-full max-w-3xl rounded-xl border shadow-2xl overflow-hidden flex flex-col font-mono text-xs transition-all ${
          isDark
            ? 'bg-slate-950/95 border-aurora-violet/50 text-slate-200 shadow-glow-violet'
            : 'bg-slate-950/95 border-slate-700 text-slate-200 shadow-2xl'
        }`}
        style={{ height: '520px' }}
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-black/60 border-b border-white/10 select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer" onClick={onClose} />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-[11px] font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-aurora-violet" />
              <span>TERMINAL // SHUBHAM_AKADE_CORE</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-slate-400">
            <button
              onClick={() => handleCommand({ preventDefault: () => {}, target: { value: 'resume' } })}
              className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-600/40 text-emerald-400 hover:bg-emerald-900/60 transition-colors flex items-center gap-1"
            >
              <FileDown className="w-3 h-3" />
              <span>GET RESUME</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:text-white transition-colors"
              aria-label="Close Terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Logs & Output */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2 select-text font-mono text-xs leading-relaxed">
          {history.map((line, idx) => (
            <div
              key={idx}
              className={`${
                line.type === 'user'
                  ? 'text-sky-300 font-bold'
                  : line.type === 'system'
                  ? 'text-aurora-lavender opacity-80'
                  : line.type === 'success'
                  ? 'text-emerald-400 font-semibold'
                  : line.type === 'error'
                  ? 'text-rose-400'
                  : 'text-slate-300'
              }`}
            >
              <pre className="whitespace-pre-wrap font-mono">{line.text}</pre>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Prompt Input Form */}
        <form onSubmit={handleCommand} className="flex items-center px-4 py-3 bg-black/80 border-t border-white/10">
          <span className="text-emerald-400 font-bold mr-2 select-none">shubham@core:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'resume', 'warp', 'skills', or 'help'..."
            className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs placeholder:text-slate-600"
          />
          <button
            type="submit"
            className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
