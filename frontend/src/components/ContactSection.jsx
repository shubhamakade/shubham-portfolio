import React, { useState } from 'react';
import { Terminal, Send, CheckCircle2, Linkedin, Github, Mail, Loader2, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import SpotlightCard from './SpotlightCard';
import MagneticButton from './MagneticButton';
import AnimatedIcon from './AnimatedIcon';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState('pending'); // 'api_delivered' | 'client_fallback'
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { isDark } = useTheme();

  // Terminal State
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'system', text: 'INITIATING ARCHITECTURAL DISPATCH LINK...' },
    { type: 'system', text: 'Type "help" for a list of terminal commands or use the dispatch form below.' },
  ]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.social.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const getGmailWebUrl = (data = formData) => {
    const subject = encodeURIComponent(`[Engineering Dispatch] Inquiry from ${data.name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Hello Shubham,\n\n${data.message || ''}\n\n---\nSender: ${data.name || ''}\nEmail: ${data.email || ''}\nDispatched via: Shubham Akade Engineering Portfolio`
    );
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.social.email}&su=${subject}&body=${body}`;
  };

  const getMailtoUrl = (data = formData) => {
    const subject = encodeURIComponent(`[Engineering Dispatch] Inquiry from ${data.name || 'Portfolio Visitor'}`);
    const body = encodeURIComponent(
      `Hello Shubham,\n\n${data.message || ''}\n\n---\nSender: ${data.name || ''}\nEmail: ${data.email || ''}\nDispatched via: Shubham Akade Engineering Portfolio`
    );
    return `mailto:${personalInfo.social.email}?subject=${subject}&body=${body}`;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Launch Gmail Web Compose in a new browser tab (No Thunderbird, No third-party tokens)
    const gmailUrl = getGmailWebUrl(formData);
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');

    setSubmitted(true);
    setDeliveryStatus('gmail_opened');

    setTerminalHistory(prev => [
      ...prev,
      { type: 'user', text: `dispatch --sender="${formData.name}" --email="${formData.email}" --target="${personalInfo.social.email}" --channel="gmail-web"` },
      { type: 'success', text: `✓ GMAIL COMPOSE LAUNCHED: Ready to send from ${formData.email} to ${personalInfo.social.email}.` }
    ]);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: isDark ? ['#A78BFA', '#38BDF8', '#10B981'] : ['#7C3AED', '#E11D48', '#059669']
    });
  };


  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...terminalHistory, { type: 'user', text: cmd }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: 'AVAILABLE COMMANDS:\n  • status   - Check engineering availability & node location\n  • mms      - Inspect Mess Management System metadata\n  • linkedin - Open official LinkedIn profile\n  • clear    - Clear terminal buffer\n  • contact  - View direct communication channels'
        });
        break;
      case 'status':
        newHistory.push({
          type: 'output',
          text: `NODE STATUS: ${personalInfo.status}\nLOCATION: ${personalInfo.location} (${personalInfo.coordinates})\nROLE: ${personalInfo.title} (${personalInfo.company})\nEDUCATION: ${personalInfo.education}`
        });
        break;
      case 'erp':
      case 'mms':
        newHistory.push({
          type: 'output',
          text: 'FLAGSHIP ERP SUITE: Multi-module enterprise ERP (Trunk Product Suite) with Mess Management (MMS), Fixed Assets (FAMS), Product Quality (PQMS), and EPPS Smart Mobile ERP Backend with GraphQL + REST.'
        });
        break;
      case 'linkedin':
        window.open(personalInfo.social.linkedin, '_blank');
        newHistory.push({ type: 'success', text: `REDIRECTING TO: ${personalInfo.social.linkedin}` });
        break;
      case 'contact':
        newHistory.push({
          type: 'output',
          text: `EMAIL: ${personalInfo.social.email}\nLINKEDIN: ${personalInfo.social.linkedin}\nGITHUB: ${personalInfo.social.github}`
        });
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        newHistory.push({
          type: 'error',
          text: `Command not recognized: "${cmd}". Type "help" for available commands.`
        });
    }

    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  return (
    <section id="contact" className="py-24 relative z-10 section-ambient-divider transition-colors duration-500">
      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-current/10 gap-6">
          <div>
            <div className={`font-mono text-xs uppercase tracking-widest font-bold mb-2 flex items-center gap-2 ${
              isDark ? 'text-aurora-lavender' : 'text-atelier-violet'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-aurora-violet' : 'bg-atelier-violet'}`} />
              [07] DISPATCH & DIRECT CHANNELS
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight uppercase text-shimmer-aurora">
              INITIALIZE COMMS.
            </h2>
          </div>
          <p className={`font-sans text-sm sm:text-base max-w-md ${
            isDark ? 'text-slate-400' : 'text-slate-600 font-medium'
          }`}>
            Looking for a Java Full Stack Developer & Systems Engineer to build high-scale, bulletproof enterprise systems? Let's discuss your engineering roadmap.
          </p>
        </div>

        {/* 2-Column Command Terminal & Dispatch Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Terminal CLI with Terminal Phosphor Spotlight */}
          <SpotlightCard
            className={`lg:col-span-6 rounded-2xl border backdrop-blur-2xl overflow-hidden shadow-2xl hud-border ambient-sheen-container ${
              isDark
                ? 'border-white/15 bg-white/[0.04] shadow-[0_16px_50px_rgba(0,0,0,0.4)] text-slate-200'
                : 'border-slate-800 bg-slate-950 shadow-2xl text-slate-100'
            }`}
            spotlightColor={isDark ? 'rgba(56, 189, 248, 0.20)' : 'rgba(109, 40, 217, 0.14)'}
          >
            
            {/* Terminal Top Bar */}
            <div className="px-5 py-3.5 bg-white/[0.06] border-b border-white/10 flex items-center justify-between font-mono text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block shadow-[0_0_8px_rgba(244,63,94,0.6)]"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block shadow-[0_0_8px_rgba(245,158,11,0.6)]"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
                <span className="ml-2 text-white font-semibold flex items-center gap-1.5">
                  <AnimatedIcon icon={Terminal} variant="spin" palette="cyan" size="sm" />
                  <span>shubham-cli@pune-primary:~$</span>
                </span>
              </div>
              <div className="text-[10px] text-cyan-300 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                <span>TTY_LIVE</span>
              </div>
            </div>

            {/* Terminal History Box */}
            <div className="p-6 font-mono text-xs h-[300px] overflow-y-auto space-y-2.5 text-slate-200 bg-black/40">
              {terminalHistory.map((item, idx) => (
                <div key={idx} className="leading-relaxed">
                  {item.type === 'user' && (
                    <div className="text-white flex items-center gap-1.5">
                      <span className="text-cyan-400 font-bold">$</span>
                      <span className="font-semibold text-violet-200">{item.text}</span>
                    </div>
                  )}
                  {item.type === 'system' && (
                    <div className="text-slate-400 font-normal">{item.text}</div>
                  )}
                  {item.type === 'output' && (
                    <div className="text-slate-200 whitespace-pre-line pl-3 border-l-2 border-cyan-400/50 my-1.5 py-0.5">{item.text}</div>
                  )}
                  {item.type === 'success' && (
                    <div className="text-emerald-300 font-semibold">{item.text}</div>
                  )}
                  {item.type === 'error' && (
                    <div className="text-rose-400">{item.text}</div>
                  )}
                </div>
              ))}
            </div>

            {/* Terminal Input Form */}
            <form onSubmit={handleTerminalSubmit} className="p-3.5 bg-white/[0.06] border-t border-white/10 flex items-center gap-2.5 font-mono text-xs">
              <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>$</span>
              </span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="type 'help', 'status', 'mms'..."
                className="w-full bg-transparent text-white focus:outline-none placeholder-slate-400 font-medium"
              />
              <button type="submit" className="p-1.5 rounded-lg text-slate-300 hover:text-cyan-300 hover:bg-white/10 transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </form>

          </SpotlightCard>

          {/* Right Column: Dispatch Form & Social Connect with Dynamic Spotlight */}
          <SpotlightCard
            className={`lg:col-span-6 rounded-2xl border backdrop-blur-2xl p-6 sm:p-8 shadow-2xl hud-border ambient-sheen-container transition-all ${
              isDark
                ? 'bg-white/[0.05] border-white/15 shadow-[0_16px_50px_rgba(0,0,0,0.4)]'
                : 'bg-white border-slate-200 shadow-xl'
            }`}
            spotlightColor={isDark ? 'rgba(167, 139, 250, 0.22)' : 'rgba(109, 40, 217, 0.14)'}
          >
            
            <div className="flex items-center gap-2.5 mb-1.5">
              <AnimatedIcon icon={Send} variant="float" palette="violet" size="sm" isGlowing={true} />
              <h3 className={`font-display font-extrabold text-2xl tracking-tight ${isDark ? 'text-white' : 'text-slate-900 font-black'}`}>
                Direct Engineering Dispatch
              </h3>
            </div>
            <p className={`font-sans text-xs sm:text-sm mb-6 font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Send an architectural brief or collaboration mandate directly to Shubham Akade.
            </p>

            {submitted ? (
              <div className={`p-8 rounded-2xl border text-center space-y-4 ${
                isDark ? 'bg-white/[0.06] border-cyan-400/40 shadow-[0_0_30px_rgba(56,189,248,0.15)]' : 'bg-cyan-50 border-cyan-200'
              }`}>
                <div className="flex justify-center mx-auto">
                  <AnimatedIcon icon={CheckCircle2} variant="pulse" palette="cyan" size="lg" isGlowing={true} />
                </div>
                <h4 className="font-display font-extrabold text-xl text-white">
                  GMAIL DISPATCH READY
                </h4>
                <p className="font-sans text-xs sm:text-sm text-slate-200 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-cyan-300">{formData.name}</strong>. A Gmail Web tab has been opened with your dispatch pre-filled from <strong className="text-cyan-300">{formData.email}</strong> to <strong className="text-emerald-300">{personalInfo.social.email}</strong>. Simply click <strong>"Send"</strong> in Gmail to transmit directly from your account.
                </p>

                <div className="pt-2 pb-1 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={getGmailWebUrl(formData)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-xs font-bold bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white shadow-[0_4px_20px_rgba(56,189,248,0.35)] hover:brightness-110 transition-all border border-cyan-400/50"
                  >
                    <Mail className="w-4 h-4" />
                    <span>RE-OPEN GMAIL TAB</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', message: '' });
                    }}
                    className={`px-5 py-3 rounded-xl font-mono text-xs font-bold border transition-all ${
                      isDark ? 'bg-white/[0.08] hover:bg-white/[0.15] text-white border-white/20' : 'bg-white hover:bg-slate-50 text-violet-700 border-slate-200 shadow-xs'
                    }`}
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 font-mono text-xs">
                <div>
                  <label className={`block uppercase text-[11px] mb-1.5 font-bold tracking-wider ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Your Name / Organization
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Enterprise Engineering VP"
                    className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${
                      isDark
                        ? 'bg-white/[0.06] border-white/15 text-white placeholder-slate-400 focus:border-cyan-400 focus:bg-white/[0.1] shadow-inner'
                        : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-violet-600 focus:ring-1 focus:ring-violet-500 shadow-sm'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block uppercase text-[11px] mb-1.5 font-bold tracking-wider ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Your Email Address (Sender)
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${
                      isDark
                        ? 'bg-white/[0.06] border-white/15 text-white placeholder-slate-400 focus:border-cyan-400 focus:bg-white/[0.1] shadow-inner'
                        : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-violet-600 focus:ring-1 focus:ring-violet-500 shadow-sm'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block uppercase text-[11px] mb-1.5 font-bold tracking-wider ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Project Scope / Role Specification
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Discuss an architectural mandate, backend overhaul, or senior role..."
                    className={`w-full px-4 py-3 rounded-xl border transition-all resize-none outline-none ${
                      isDark
                        ? 'bg-white/[0.06] border-white/15 text-white placeholder-slate-400 focus:border-cyan-400 focus:bg-white/[0.1] shadow-inner'
                        : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-violet-600 focus:ring-1 focus:ring-violet-500 shadow-sm'
                    }`}
                  />
                </div>

                <MagneticButton className="w-full pt-2">
                  <button
                    type="submit"
                    className={`w-full py-3.5 rounded-xl font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 border shadow-lg ${
                      isDark
                        ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-[0_4px_25px_rgba(167,139,250,0.45)] border-violet-400/40'
                        : 'bg-violet-700 text-white hover:bg-violet-800 shadow-md border-violet-700'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    <span>TRANSMIT VIA GMAIL (WEB) ↗</span>
                  </button>
                </MagneticButton>

                <div className="pt-1 text-center">
                  <a
                    href={getMailtoUrl(formData)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>Or send via Outlook / default mail app</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                </div>
              </form>
            )}

            {/* Quick Connect Links */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl border bg-white/[0.05] border-white/10 hover:border-cyan-400/40 hover:bg-white/[0.1] text-slate-200 hover:text-white transition-all shadow-sm"
              >
                <AnimatedIcon icon={Linkedin} variant="pulse" palette="cyan" size="sm" />
                <span className="font-semibold">LINKEDIN ↗</span>
              </a>

              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl border bg-white/[0.05] border-white/10 hover:border-violet-400/40 hover:bg-white/[0.1] text-slate-200 hover:text-white transition-all shadow-sm"
              >
                <AnimatedIcon icon={Github} variant="spin" palette="violet" size="sm" />
                <span className="font-semibold">GITHUB ↗</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border bg-white/[0.05] border-white/10 hover:border-emerald-400/40 hover:bg-white/[0.1] text-slate-200 hover:text-white transition-all shadow-sm"
              >
                <AnimatedIcon icon={Mail} variant="wiggle" palette="emerald" size="sm" />
                <span className="font-semibold">{copiedEmail ? 'COPIED!' : 'COPY EMAIL'}</span>
              </button>
            </div>

          </SpotlightCard>

        </div>

      </div>
    </section>
  );
}
