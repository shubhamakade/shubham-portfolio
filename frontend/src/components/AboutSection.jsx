import React, { useState } from 'react';
import { 
  ShieldCheck, Layers, Zap, Cpu, CheckCircle2, Code2, 
  GraduationCap, Briefcase, MapPin, Mail, Phone, ExternalLink, Copy, Check, FileDown 
} from 'lucide-react';
import { architecturePillars, personalInfo } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import SpotlightCard from './SpotlightCard';
import MagneticButton from './MagneticButton';
import AnimatedIcon from './AnimatedIcon';
import celestialAudio from '../utils/celestialAudio';

export default function AboutSection() {
  const [selectedPillar, setSelectedPillar] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { isDark } = useTheme();

  const iconMap = {
    ShieldCheck: ShieldCheck,
    Layers: Layers,
    Zap: Zap,
    Cpu: Cpu,
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(personalInfo.social.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const codeSnippets = [
    {
      title: "Pessimistic Concurrency Lock in Spring Data JPA",
      file: "EppsMaterialTransferRepository.java",
      lang: "java",
      code: `@Lock(LockModeType.PESSIMISTIC_WRITE)
@Query("SELECT s FROM EppsSubStoreStock s WHERE s.storeCode = :store AND s.itemCode = :item")
Optional<EppsSubStoreStock> findStockForUpdate(
    @Param("store") String store, 
    @Param("item") String item
);

@Transactional(isolation = Isolation.READ_COMMITTED)
public TransferReceipt executeTransfer(TransferRequest req) {
    // Zero-data-loss atomic transfer between pantries
    EppsSubStoreStock source = findStockForUpdate(req.from(), req.item())
        .orElseThrow(() -> new InsufficientStockException());
    source.decrement(req.quantity());
    return ledger.record(source, req);
}`
    },
    {
      title: "Domain Aggregate Root & Invariant Enforcement",
      file: "EppsDemandOrderHdr.java",
      lang: "java",
      code: `@Entity
@Table(name = "EPPS_DEMAND_ORDER_HDR")
public class EppsDemandOrderHdr {
    @EmbeddedId
    private DemandOrderId id;
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EppsDemandOrderDtl> items = new ArrayList<>();

    public void recalculateIngredients(int projectedHeadcount, NutritionalNorms norms) {
        if (projectedHeadcount <= 0) throw new IllegalArgumentException("Headcount > 0");
        this.items.forEach(item -> item.scaleToHeadcount(projectedHeadcount, norms));
        this.status = DemandStatus.CALCULATED;
    }
}`
    },
    {
      title: "Entity Graph Optimization Eliminating N+1 Overhead",
      file: "EppsMessMenuCardRepository.java",
      lang: "java",
      code: `@EntityGraph(attributePaths = {
    "mealDetails", 
    "mealDetails.itemDetails", 
    "mealDetails.itemDetails.nutritionalProfile"
})
@Query("SELECT m FROM EppsMessMenuCardHdr m WHERE m.weekCycleNumber = :cycle")
List<EppsMessMenuCardHdr> findFullCycleWithEagerDetails(@Param("cycle") int cycle);
// Executes in 1 single optimized JOIN query (<12ms latency)`
    },
    {
      title: "Mobile GraphQL Query Resolver for Financial Aging",
      file: "AccountsPayableGraphQLController.java",
      lang: "java",
      code: `@Controller
public class AccountsPayableGraphQLController {
    @Autowired
    private FasAccountsPayableService apService;

    @QueryMapping
    public List<CreditorAgingBucketDTO> getCreditorAgingSummary(
        @Argument String companyCode,
        @Argument String divisionCode
    ) {
        // Sub-40ms aggregated financial aging for mobile ERP executives
        return apService.calculateAgingBuckets(companyCode, divisionCode);
    }
}`
    }
  ];

  return (
    <section id="architecture" className="py-24 relative z-10 section-ambient-divider transition-colors duration-500">
      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================
            PART 1: VERIFIED ENGINEERING PROFILE DOSSIER
            ======================================================== */}
        <div className={`p-8 sm:p-10 rounded-3xl border backdrop-blur-2xl shadow-2xl mb-20 hud-border ambient-sheen-container card-breathing-aura transition-all ${
          isDark
            ? 'bg-white/[0.05] border-white/15 shadow-[0_12px_45px_rgba(0,0,0,0.5)]'
            : 'bg-white border-slate-200 shadow-xl'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Authentic Portrait of Shubham Akade */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="relative group">
                <div className={`absolute -inset-1.5 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500 ${
                  isDark ? 'bg-gradient-to-r from-violet-500 via-sky-400 to-emerald-400' : 'bg-gradient-to-r from-violet-600 via-purple-400 to-rose-400'
                }`} />
                <div className={`relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-2 shadow-2xl ${
                  isDark ? 'border-violet-400/60 bg-aurora-night' : 'border-violet-400/50 bg-slate-100'
                }`}>
                  <img
                    src={personalInfo.avatar}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 px-2.5 py-1 rounded-xl bg-black/75 backdrop-blur-md text-[10px] font-mono text-center text-white/95 border border-white/15">
                    VERIFIED ENGINEER // PUNE
                  </div>
                </div>
              </div>

              {/* Status Indicator */}
              <div className={`mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[11px] font-semibold border backdrop-blur-xl ${
                isDark ? 'bg-emerald-500/15 text-emerald-300 border-emerald-400/40 shadow-[0_0_15px_rgba(16,185,129,0.25)]' : 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-xs'
              }`}>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>EPPS INFOTECH LTD. // ACTIVE</span>
              </div>
            </div>

            {/* Right: Authentic Profile Narrative & Verified Credentials */}
            <div className="lg:col-span-8 flex flex-col justify-center">
              
              <div className={`font-mono text-xs uppercase tracking-widest font-extrabold mb-2 flex items-center gap-2 ${
                isDark ? 'text-violet-300' : 'text-violet-700'
              }`}>
                <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-violet-400' : 'bg-violet-600'} animate-ping`} />
                [01] VERIFIED PROFESSIONAL PROFILE
              </div>

              <h2 className="font-display font-extrabold text-2xl sm:text-4xl tracking-tight mb-2 text-shimmer-aurora">
                SHUBHAM AKADE
              </h2>

              <p className={`font-mono text-xs sm:text-sm font-bold mb-4 ${
                isDark ? 'text-violet-300' : 'text-violet-700'
              }`}>
                Java Full Stack Developer & Systems Engineer
              </p>

              <p className={`font-sans text-sm sm:text-base leading-relaxed mb-6 font-medium ${
                isDark ? 'text-slate-200' : 'text-slate-600'
              }`}>
                Graduated with a <strong>Bachelor of Engineering in Computer Engineering</strong> from <strong>Government College of Engineering, Chandrapur (GCOE Chandrapur) in 2023</strong>. Currently engineering core enterprise ERP backend solutions and high-performance mobile services at <strong>EPPS Infotech Ltd.</strong> in Pune, Maharashtra. Specialized in architecting multi-module Maven suites in Java 17, Spring Boot 3, and Spring Data JPA—spanning Mess Management (MMS), Fixed Assets (FAMS), and Quality Assurance (PQMS)—coupled with surgical GraphQL & REST APIs and reactive React frontends.
              </p>

              {/* Verified Credentials Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 font-mono text-xs">
                <div className={`p-3.5 rounded-2xl border backdrop-blur-xl flex items-center gap-3 transition-all ${
                  isDark 
                    ? 'bg-gradient-to-r from-emerald-950/40 via-white/[0.06] to-emerald-950/20 border-emerald-400/30 text-slate-100 shadow-[0_4px_20px_rgba(16,185,129,0.15)]' 
                    : 'bg-white border-slate-200/90 text-slate-800 shadow-xs'
                }`}>
                  <div className={`p-2 rounded-xl border ${isDark ? 'bg-emerald-500/20 border-emerald-400/30' : 'bg-emerald-50 border-emerald-200'}`}>
                    <AnimatedIcon icon={Briefcase} variant="bounce" color="emerald" size="sm" badge={false} />
                  </div>
                  <div>
                    <div className={`text-[10px] uppercase font-semibold ${isDark ? 'text-emerald-300 opacity-80' : 'text-emerald-700 font-bold'}`}>Current Organization</div>
                    <div className={`font-bold text-xs mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>EPPS Infotech Ltd. (Jul 2025 — Present)</div>
                  </div>
                </div>

                <div className={`p-3.5 rounded-2xl border backdrop-blur-xl flex items-center gap-3 transition-all ${
                  isDark 
                    ? 'bg-gradient-to-r from-cyan-950/40 via-white/[0.06] to-sky-950/20 border-cyan-400/30 text-slate-100 shadow-[0_4px_20px_rgba(56,189,248,0.15)]' 
                    : 'bg-white border-slate-200/90 text-slate-800 shadow-xs'
                }`}>
                  <div className={`p-2 rounded-xl border ${isDark ? 'bg-cyan-500/20 border-cyan-400/30' : 'bg-sky-50 border-sky-200'}`}>
                    <AnimatedIcon icon={GraduationCap} variant="float" color="cyan" size="sm" badge={false} />
                  </div>
                  <div>
                    <div className={`text-[10px] uppercase font-semibold ${isDark ? 'text-cyan-300 opacity-80' : 'text-sky-700 font-bold'}`}>Degree & College</div>
                    <div className={`font-bold text-xs mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>B.E. Computer Engineering, GCOE Chandrapur ('23)</div>
                  </div>
                </div>
              </div>

              {/* Verified Contact Badges with Magnetic Pull */}
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                <MagneticButton>
                  <button
                    onClick={copyEmailToClipboard}
                    className={`px-3.5 py-2.5 rounded-xl border backdrop-blur-xl transition-all flex items-center gap-2 ${
                      isDark 
                        ? 'bg-white/[0.08] hover:bg-white/[0.15] text-white border-white/20 hover:border-sky-400 shadow-md' 
                        : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 shadow-xs'
                    }`}
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Mail className="w-3.5 h-3.5 text-sky-400" />}
                    <span>{copiedEmail ? 'EMAIL COPIED!' : personalInfo.social.email}</span>
                  </button>
                </MagneticButton>

                <div className={`px-3.5 py-2.5 rounded-xl border backdrop-blur-xl flex items-center gap-2 ${
                  isDark ? 'bg-white/[0.08] text-white border-white/20' : 'bg-white text-slate-800 border-slate-200 shadow-xs'
                }`}>
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{personalInfo.social.phone}</span>
                </div>

                <MagneticButton>
                  <a
                    href={personalInfo.social.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-[0_4px_20px_rgba(139,92,246,0.35)]"
                  >
                    <span>LINKEDIN PROFILE</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </MagneticButton>

                <MagneticButton>
                  <a
                    href="/Shubham_Akade_Resume.pdf"
                    download="Shubham_Akade_Java_Full_Stack_Resume.pdf"
                    onClick={() => celestialAudio.playChime('affirm')}
                    className="px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-[0_4px_20px_rgba(16,185,129,0.35)]"
                    title="Download Verified Official ATS Resume (PDF 93KB)"
                  >
                    <FileDown className="w-3.5 h-3.5 text-white" />
                    <span>DOWNLOAD ATS RESUME</span>
                  </a>
                </MagneticButton>
              </div>

            </div>
          </div>
        </div>

        {/* ========================================================
            PART 2: ARCHITECTURAL PHILOSOPHY & RUNTIME CODE
            ======================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-current/10 gap-6">
          <div>
            <div className={`font-mono text-xs uppercase tracking-widest font-bold mb-2 flex items-center gap-2 ${
              isDark ? 'text-aurora-lavender' : 'text-atelier-violet'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-aurora-violet' : 'bg-atelier-violet'}`} />
              [02] ARCHITECTURAL PHILOSOPHY
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight uppercase text-shimmer-aurora">
              ENGINEERING FOR ZERO TOLERANCE.
            </h2>
          </div>
          <p className={`font-sans text-sm sm:text-base max-w-md ${
            isDark ? 'text-slate-300' : 'text-slate-600 font-medium'
          }`}>
            In enterprise supply chains and culinary ERPs, software failure isn't a glitch—it's thousands of missing meals and corrupted inventory balance sheets.
          </p>
        </div>

        {/* Pillars & Code Architecture Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 4 Interactive Pillar Cards with Dynamic Spotlight */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {architecturePillars.map((pillar, idx) => {
              const Icon = iconMap[pillar.icon] || ShieldCheck;
              const isSelected = selectedPillar === idx;
              const floatClass = idx % 2 === 0 ? 'card-alive-float-1' : 'card-alive-float-2';

              return (
                <SpotlightCard
                  key={pillar.code}
                  onClick={() => {
                    celestialAudio.playChime('chime');
                    setSelectedPillar(idx);
                  }}
                  className={`p-5 rounded-2xl cursor-pointer transition-all border backdrop-blur-xl ${floatClass} ${
                    isSelected
                      ? isDark
                        ? 'bg-white/[0.12] border-2 border-violet-400 shadow-[0_8px_32px_rgba(167,139,250,0.35)]'
                        : 'bg-white border-2 border-violet-600 shadow-md ring-1 ring-violet-500/20'
                      : isDark
                      ? 'bg-white/[0.05] hover:bg-white/[0.10] border-white/10 hover:border-white/25 shadow-md'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-xs'
                  }`}
                  spotlightColor={isDark ? 'rgba(167, 139, 250, 0.25)' : 'rgba(109, 40, 217, 0.12)'}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-xl ${isDark ? 'bg-white/[0.08] border border-white/10' : 'bg-slate-100 border border-slate-200'}`}>
                        <AnimatedIcon
                          icon={Icon}
                          variant={idx === 0 ? 'radar' : idx === 1 ? 'float' : idx === 2 ? 'wiggle' : 'pulse'}
                          color={idx === 0 ? 'emerald' : idx === 1 ? 'violet' : idx === 2 ? 'amber' : 'cyan'}
                          size="md"
                          sound="chime"
                        />
                      </div>
                      <span className={`font-mono text-xs font-bold ${
                        isDark ? 'text-violet-300' : 'text-violet-700'
                      }`}>
                        PILLAR_{pillar.code}
                      </span>
                    </div>
                    <span className={`font-mono text-[10px] uppercase px-2 py-0.5 rounded-full ${
                      isSelected 
                        ? 'bg-violet-500/20 text-violet-300 border border-violet-400/40 font-bold' 
                        : isDark ? 'opacity-60 text-slate-400' : 'text-slate-500 font-bold'
                    }`}>
                      {isSelected ? '● AUDITING' : 'INSPECT'}
                    </span>
                  </div>

                  <h3 className={`font-display font-black text-lg mb-1 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {pillar.title}
                  </h3>
                  <p className={`font-sans text-xs leading-relaxed mb-3 font-medium ${
                    isDark ? 'text-slate-200' : 'text-slate-600'
                  }`}>
                    {pillar.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {pillar.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className={`px-2 py-0.5 rounded font-mono text-[10px] border font-semibold ${
                          isDark
                            ? 'bg-white/[0.08] text-slate-200 border-white/10'
                            : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              );
            })}
          </div>

          {/* Right Column: Code & Architecture Blueprint Inspector */}
          <div className="lg:col-span-7 sticky top-28">
            <div className={`rounded-2xl border overflow-hidden shadow-2xl backdrop-blur-2xl transition-all ${
              isDark ? 'bg-white/[0.05] border-white/15 shadow-[0_12px_45px_rgba(0,0,0,0.6)]' : 'bg-slate-950 border-slate-800 text-white shadow-2xl'
            }`}>
              
              {/* Terminal Window Bar */}
              <div className="px-5 py-3.5 bg-white/[0.04] border-b border-white/10 flex items-center justify-between font-mono text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 inline-block shadow-sm"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block shadow-sm"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow-sm"></span>
                  <span className="ml-2 text-white font-semibold flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-violet-400" />
                    {codeSnippets[selectedPillar].file}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(codeSnippets[selectedPillar].code);
                      celestialAudio.playChime('affirm');
                    }}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all flex items-center gap-1.5"
                    title="Copy code snippet to clipboard"
                  >
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>COPY CODE</span>
                  </button>
                  <span className="text-[10px] text-violet-300 uppercase tracking-wider font-semibold hidden sm:inline">
                    VERIFIED RUNTIME
                  </span>
                </div>
              </div>

              {/* Code Snippet */}
              <div className="p-6 font-mono text-xs overflow-x-auto leading-relaxed text-slate-200 bg-black/40">
                <div className="text-violet-300/80 mb-3 text-[11px] pb-2 border-b border-white/10 font-semibold">
                  // PATTERN: {codeSnippets[selectedPillar].title}
                </div>
                <pre className="text-violet-200 font-mono leading-relaxed">
                  <code>{codeSnippets[selectedPillar].code}</code>
                </pre>
              </div>

              {/* Architectural Audit Footer */}
              <div className="px-5 py-3.5 bg-white/[0.03] border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ZERO-LOSS TRANSACTION SAFETY AUDITED</span>
                </div>
                <div className="text-slate-400 font-semibold">
                  ENGINE: JAVA_17_LTS
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
