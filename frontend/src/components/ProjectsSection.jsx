import React, { useState } from 'react';
import { 
  Building2, Utensils, Calculator, ArrowRightLeft, DollarSign, 
  CheckCircle2, Sliders, Play, RotateCcw, Activity, Smartphone,
  Layers, Database, FileText, Send, Zap, ShieldAlert, Cpu
} from 'lucide-react';
import { projects } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import SpotlightCard from './SpotlightCard';
import MagneticButton from './MagneticButton';
import AnimatedIcon from './AnimatedIcon';
import celestialAudio from '../utils/celestialAudio';

export default function ProjectsSection() {
  // Trunk ERP MMS State
  const [activeMmsTab, setActiveMmsTab] = useState('menu');
  const [headcount, setHeadcount] = useState(1250);
  const [transferStatus, setTransferStatus] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState('LUNCH');

  // Smart Mobile ERP State
  const [activeMobileTab, setActiveMobileTab] = useState('graphql-fas');
  const [mobileQueryExecuting, setMobileQueryExecuting] = useState(false);
  const [mobileQueryResult, setMobileQueryResult] = useState({
    executionTimeMs: 28,
    statusCode: 200,
    buckets: [
      { bucket: "0 — 30 Days", amount: "₹ 14,82,500", vendorCount: 12, status: "CURRENT" },
      { bucket: "31 — 60 Days", amount: "₹ 6,40,200", vendorCount: 5, status: "DUE_SOON" },
      { bucket: "61 — 90 Days", amount: "₹ 2,15,000", vendorCount: 2, status: "ATTENTION" },
      { bucket: "> 90 Days (Critical)", amount: "₹ 48,000", vendorCount: 1, status: "ESCALATED" }
    ]
  });
  const [poApprovalStatus, setPoApprovalStatus] = useState(null);

  const { isDark } = useTheme();

  const calculateIngredients = (count) => {
    return [
      { item: "Basmati Rice (Grade A)", norm: "0.14 kg/person", total: (count * 0.14).toFixed(1) + " KG", stock: "Available", status: "OK" },
      { item: "Toor Dal (Protein Core)", norm: "0.06 kg/person", total: (count * 0.06).toFixed(1) + " KG", stock: "Available", status: "OK" },
      { item: "Fresh Paneer / Cottage Cheese", norm: "0.10 kg/person", total: (count * 0.10).toFixed(1) + " KG", stock: "Sufficient", status: "OK" },
      { item: "Refined Sunflower Oil", norm: "0.025 L/person", total: (count * 0.025).toFixed(1) + " LTR", stock: "Available", status: "OK" },
      { item: "Whole Garam Masala & Spices", norm: "0.008 kg/person", total: (count * 0.008).toFixed(2) + " KG", stock: "Available", status: "OK" },
      { item: "Dairy Milk (Dessert / Tea)", norm: "0.12 L/person", total: (count * 0.12).toFixed(1) + " LTR", stock: "Batch Allocated", status: "RESERVED" }
    ];
  };

  const handleSimulateTransfer = () => {
    setTransferStatus('LOCKING_STOCK');
    setTimeout(() => {
      setTransferStatus('PESSIMISTIC_LOCK_ACQUIRED');
      setTimeout(() => {
        setTransferStatus('COMMITTED_SUCCESS');
      }, 700);
    }, 600);
  };

  const resetTransfer = () => setTransferStatus(null);

  const handleExecuteMobileGraphQL = () => {
    setMobileQueryExecuting(true);
    setTimeout(() => {
      setMobileQueryExecuting(false);
      setMobileQueryResult({
        executionTimeMs: 28,
        statusCode: 200,
        buckets: [
          { bucket: "0 — 30 Days", amount: "₹ 14,82,500", vendorCount: 12, status: "CURRENT" },
          { bucket: "31 — 60 Days", amount: "₹ 6,40,200", vendorCount: 5, status: "DUE_SOON" },
          { bucket: "61 — 90 Days", amount: "₹ 2,15,000", vendorCount: 2, status: "ATTENTION" },
          { bucket: "> 90 Days (Critical)", amount: "₹ 48,000", vendorCount: 1, status: "ESCALATED" }
        ]
      });
    }, 500);
  };

  const handleApprovePO = () => {
    setPoApprovalStatus('AUTHORIZING');
    setTimeout(() => {
      setPoApprovalStatus('APPROVED');
    }, 600);
  };

  const trunkProject = projects.find(p => p.id === 'trunk-erp') || projects[0];
  const mobileProject = projects.find(p => p.id === 'mobile-erp') || projects[1];
  const secondaryProjects = projects.filter(p => p.id !== 'trunk-erp' && p.id !== 'mobile-erp');

  return (
    <section id="projects" className="py-24 relative z-10 section-ambient-divider transition-colors duration-500">
      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-current/10 gap-6">
          <div>
            <div className={`font-mono text-xs uppercase tracking-widest font-bold mb-2 flex items-center gap-2 ${
              isDark ? 'text-aurora-lavender' : 'text-atelier-violet'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-aurora-violet' : 'bg-atelier-violet'}`} />
              [03] FLAGSHIP CASE STUDY & SYSTEMS
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight uppercase text-shimmer-aurora">
              MISSION-CRITICAL PORTFOLIO.
            </h2>
          </div>
          <div className={`font-mono text-xs px-4 py-2 rounded-lg border ${
            isDark ? 'bg-aurora-card border-white/10 text-slate-300' : 'bg-white border-slate-200 text-slate-800 shadow-xs'
          }`}>
            INSPECTED ENTITIES: <span className={`font-semibold ${isDark ? 'text-aurora-lavender' : 'text-violet-700 font-bold'}`}>EPPS MMS DOMAIN REPO</span>
          </div>
        </div>

        {/* ========================================================
            FLAGSHIP: MMS MESS MANAGEMENT & SUPPLY CHAIN ERP
            ======================================================== */}
        <div className={`rounded-3xl border backdrop-blur-2xl shadow-2xl overflow-hidden mb-20 hud-border ambient-sheen-container card-breathing-aura dynamic-card-glow transition-all ${
          isDark
            ? 'bg-white/[0.05] border-white/15 shadow-[0_12px_45px_rgba(0,0,0,0.5)]'
            : 'bg-white border-slate-200 shadow-xl'
        }`}>
          
          {/* Header Strip */}
          <div className={`p-6 sm:p-8 border-b ${
            isDark
              ? 'bg-white/[0.03] border-white/10'
              : 'bg-gradient-to-r from-slate-50 via-white to-slate-50 border-slate-200/90'
          }`}>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full font-mono text-xs font-bold tracking-wider uppercase ${
                  isDark ? 'bg-violet-500/20 text-violet-300 border border-violet-400/40' : 'bg-violet-700 text-white'
                }`}>
                  {trunkProject.badge}
                </span>
                <span className={`font-mono text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  CODEBASE: <code className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900 font-bold'}`}>epps-trunk-suite (Maven Multi-Module)</code>
                </span>
              </div>
              <div className={`flex items-center gap-2 text-xs font-mono px-3.5 py-1.5 rounded-full border backdrop-blur-xl ${
                isDark ? 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-xs'
              }`}>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold">ENTERPRISE PRODUCTION ARCHITECTURE</span>
              </div>
            </div>

            <h3 className={`font-display font-extrabold text-2xl sm:text-4xl tracking-tight mb-2 ${
              isDark ? 'text-white' : 'text-slate-900 font-black'
            }`}>
              {trunkProject.title}
            </h3>
            <p className={`font-sans text-base sm:text-lg max-w-4xl leading-relaxed mb-6 ${
              isDark ? 'text-slate-200' : 'text-slate-600 font-medium'
            }`}>
              {trunkProject.overview}
            </p>

            {/* Metrics Ribbon with Dynamic Spotlight */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-4 border-t border-white/10">
              {trunkProject.metrics.map((m, idx) => (
                <SpotlightCard
                  key={idx}
                  variant="kpi"
                  className={`p-4 rounded-2xl border transition-all backdrop-blur-xl ${
                    isDark ? 'bg-white/[0.07] hover:bg-white/[0.12] border-white/15 hover:border-violet-400/40 shadow-md' : 'bg-white border-slate-200/90 shadow-sm hover:border-violet-300 hover:shadow-md'
                  }`}
                  spotlightColor={isDark ? 'rgba(167, 139, 250, 0.25)' : 'rgba(109, 40, 217, 0.12)'}
                >
                  <div className={`font-display font-black text-2xl sm:text-3xl ${
                    isDark ? 'text-white drop-shadow-sm' : 'text-violet-700'
                  }`}>
                    {m.val}
                  </div>
                  <div className={`font-mono text-[10px] font-semibold uppercase mt-1 ${
                    isDark ? 'text-violet-300' : 'text-slate-600'
                  }`}>
                    {m.label}
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>

          {/* Interactive MMS Operations Console */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-col gap-6">
              
              {/* Console Navigation Tabs */}
              <div className={`flex flex-wrap items-center justify-between gap-4 pb-4 border-b font-mono text-xs ${
                isDark ? 'border-white/10' : 'border-slate-200/90'
              }`}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`font-mono text-xs uppercase font-extrabold mr-2 tracking-wider ${
                    isDark ? 'text-slate-300 opacity-80' : 'text-slate-900'
                  }`}>
                    OPERATIONS CONSOLE:
                  </span>
                  
                  <button
                    onClick={() => {
                      celestialAudio.playChime('chime');
                      setActiveMmsTab('menu');
                    }}
                    className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all font-semibold border ${
                      activeMmsTab === 'menu'
                        ? isDark
                          ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_4px_20px_rgba(139,92,246,0.35)] border-violet-400/50'
                          : 'bg-violet-700 text-white shadow-md border-violet-700'
                        : isDark
                        ? 'bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 border-white/10 hover:border-white/20'
                        : 'bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-50 border-slate-200 shadow-xs'
                    }`}
                  >
                    <AnimatedIcon icon={Utensils} variant={activeMmsTab === 'menu' ? 'bounce' : 'float'} color="emerald" size="sm" badge={false} />
                    <span>01. MENU CARD MATRIX</span>
                  </button>

                  <button
                    onClick={() => {
                      celestialAudio.playChime('chime');
                      setActiveMmsTab('demand');
                    }}
                    className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all font-semibold border ${
                      activeMmsTab === 'demand'
                        ? isDark
                          ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_4px_20px_rgba(139,92,246,0.35)] border-violet-400/50'
                          : 'bg-violet-700 text-white shadow-md border-violet-700'
                        : isDark
                        ? 'bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 border-white/10 hover:border-white/20'
                        : 'bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-50 border-slate-200 shadow-xs'
                    }`}
                  >
                    <AnimatedIcon icon={Calculator} variant={activeMmsTab === 'demand' ? 'pulse' : 'radar'} color="cyan" size="sm" badge={false} />
                    <span>02. HEADCOUNT DEMAND ENGINE</span>
                  </button>

                  <button
                    onClick={() => {
                      celestialAudio.playChime('chime');
                      setActiveMmsTab('transfer');
                    }}
                    className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all font-semibold border ${
                      activeMmsTab === 'transfer'
                        ? isDark
                          ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_4px_20px_rgba(139,92,246,0.35)] border-violet-400/50'
                          : 'bg-violet-700 text-white shadow-md border-violet-700'
                        : isDark
                        ? 'bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 border-white/10 hover:border-white/20'
                        : 'bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-50 border-slate-200 shadow-xs'
                    }`}
                  >
                    <AnimatedIcon icon={ArrowRightLeft} variant={activeMmsTab === 'transfer' ? 'wiggle' : 'float'} color="amber" size="sm" badge={false} />
                    <span>03. STORE-TO-STORE REQUISITION</span>
                  </button>

                  <button
                    onClick={() => {
                      celestialAudio.playChime('chime');
                      setActiveMmsTab('cost');
                    }}
                    className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all font-semibold border ${
                      activeMmsTab === 'cost'
                        ? isDark
                          ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_4px_20px_rgba(139,92,246,0.35)] border-violet-400/50'
                          : 'bg-violet-700 text-white shadow-md border-violet-700'
                        : isDark
                        ? 'bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 border-white/10 hover:border-white/20'
                        : 'bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-50 border-slate-200 shadow-xs'
                    }`}
                  >
                    <AnimatedIcon icon={DollarSign} variant={activeMmsTab === 'cost' ? 'pulse' : 'radar'} color="violet" size="sm" badge={false} />
                    <span>04. COST CENTER AUDITING</span>
                  </button>
                </div>

                <div className={`font-mono text-[11px] flex items-center gap-2 ${
                  isDark ? 'text-slate-300 opacity-80' : 'text-slate-700 font-bold'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>ENGINE: EppsMmsKernel_3.1</span>
                </div>
              </div>

              {/* Animated MMS Tabs Container */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMmsTab}
                  initial={{ opacity: 0, y: 12, scale: 0.995 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.995 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* TAB 1: MENU CARD MATRIX */}
                  {activeMmsTab === 'menu' && (
                    <div className="space-y-6">
                      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl border ${
                        isDark ? 'bg-aurora-card/60 border-white/5' : 'bg-slate-50/80 border-slate-200'
                      }`}>
                        <div>
                          <div className={`font-mono text-xs uppercase font-extrabold tracking-wider ${
                            isDark ? 'text-aurora-lavender' : 'text-violet-700'
                          }`}>
                            ENTITY: EppsMessMenuCardHdr.java & EppsMessMenuCardDtl.java
                          </div>
                          <div className={`font-sans text-sm mt-1 font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                            Multi-day cyclical menu roster with automatic dietary balance and portion sizing.
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 font-mono text-xs">
                          {['BREAKFAST', 'LUNCH', 'DINNER'].map((meal) => (
                            <button
                              key={meal}
                              onClick={() => setSelectedMeal(meal)}
                              className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
                                selectedMeal === meal
                                  ? isDark
                                    ? 'bg-aurora-lavender text-aurora-night shadow-sm'
                                    : 'bg-violet-700 text-white shadow-xs'
                                  : isDark
                                  ? 'bg-aurora-card text-slate-300 hover:bg-aurora-cardHover'
                                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 shadow-2xs'
                              }`}
                            >
                              {meal}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Menu Table */}
                      <div className={`overflow-x-auto rounded-xl border ${
                        isDark ? 'border-white/10 bg-aurora-night/40' : 'border-slate-200 bg-white shadow-xs'
                      }`}>
                        <table className="w-full text-left font-mono text-xs">
                          <thead className={`border-b uppercase text-[10px] tracking-wider font-bold ${
                            isDark ? 'bg-aurora-card text-slate-300 border-white/10' : 'bg-slate-100/90 text-slate-700 border-slate-200'
                          }`}>
                            <tr>
                              <th className="py-3 px-4">Menu Card Item Code</th>
                              <th className="py-3 px-4">Culinary Item Description</th>
                              <th className="py-3 px-4">Standard Norm / Person</th>
                              <th className="py-3 px-4">Caloric Target</th>
                              <th className="py-3 px-4">Dietary Class</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-current/10">
                            {selectedMeal === 'LUNCH' ? (
                              <>
                                <tr>
                                  <td className={`py-3 px-4 font-bold ${isDark ? 'text-aurora-lavender' : 'text-violet-700'}`}>MMS-ITM-0104</td>
                                  <td className={`py-3 px-4 font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Shahi Paneer Masala</td>
                                  <td className={`py-3 px-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>120 grams</td>
                                  <td className={`py-3 px-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>240 kcal</td>
                                  <td className="py-3 px-4 text-emerald-600 font-semibold">Vegetarian High-Protein</td>
                                </tr>
                                <tr>
                                  <td className={`py-3 px-4 font-bold ${isDark ? 'text-aurora-lavender' : 'text-violet-700'}`}>MMS-ITM-0211</td>
                                  <td className={`py-3 px-4 font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Steamed Jeera Basmati Rice</td>
                                  <td className={`py-3 px-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>150 grams</td>
                                  <td className={`py-3 px-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>190 kcal</td>
                                  <td className="py-3 px-4 text-emerald-600 font-semibold">Carbohydrate Base</td>
                                </tr>
                                <tr>
                                  <td className={`py-3 px-4 font-bold ${isDark ? 'text-aurora-lavender' : 'text-violet-700'}`}>MMS-ITM-0309</td>
                                  <td className={`py-3 px-4 font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Tadka Dal Yellow Lentils</td>
                                  <td className={`py-3 px-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>100 grams</td>
                                  <td className={`py-3 px-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>130 kcal</td>
                                  <td className="py-3 px-4 text-emerald-600 font-semibold">Essential Legume</td>
                                </tr>
                                <tr>
                                  <td className={`py-3 px-4 font-bold ${isDark ? 'text-aurora-lavender' : 'text-violet-700'}`}>MMS-ITM-0418</td>
                                  <td className={`py-3 px-4 font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Whole Wheat Tandoori Roti</td>
                                  <td className={`py-3 px-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>3 units (90g)</td>
                                  <td className={`py-3 px-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>210 kcal</td>
                                  <td className="py-3 px-4 text-emerald-600 font-semibold">Whole Grain Fiber</td>
                                </tr>
                              </>
                            ) : selectedMeal === 'BREAKFAST' ? (
                              <>
                                <tr>
                                  <td className={`py-3 px-4 font-bold ${isDark ? 'text-aurora-lavender' : 'text-violet-700'}`}>MMS-ITM-0012</td>
                                  <td className={`py-3 px-4 font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>South Indian Idli Sambar & Chutney</td>
                                  <td className={`py-3 px-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>4 units (160g)</td>
                                  <td className={`py-3 px-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>260 kcal</td>
                                  <td className="py-3 px-4 text-emerald-600 font-semibold">Fermented Carbohydrate</td>
                                </tr>
                                <tr>
                                  <td className={`py-3 px-4 font-bold ${isDark ? 'text-aurora-lavender' : 'text-violet-700'}`}>MMS-ITM-0044</td>
                                  <td className={`py-3 px-4 font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Sprouted Moong Salad</td>
                                  <td className={`py-3 px-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>60 grams</td>
                                  <td className={`py-3 px-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>90 kcal</td>
                                  <td className="py-3 px-4 text-emerald-600 font-semibold">Micro-Nutrient Vitality</td>
                                </tr>
                              </>
                            ) : (
                              <>
                                <tr>
                                  <td className={`py-3 px-4 font-bold ${isDark ? 'text-aurora-lavender' : 'text-violet-700'}`}>MMS-ITM-0512</td>
                                  <td className={`py-3 px-4 font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Mixed Vegetable Kadai</td>
                                  <td className={`py-3 px-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>130 grams</td>
                                  <td className={`py-3 px-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>180 kcal</td>
                                  <td className="py-3 px-4 text-emerald-600 font-semibold">Vegetarian</td>
                                </tr>
                                <tr>
                                  <td className={`py-3 px-4 font-bold ${isDark ? 'text-aurora-lavender' : 'text-violet-700'}`}>MMS-ITM-0588</td>
                                  <td className={`py-3 px-4 font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Gulab Jamun Sweet Delicacy</td>
                                  <td className={`py-3 px-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>2 units (70g)</td>
                                  <td className={`py-3 px-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>280 kcal</td>
                                  <td className="py-3 px-4 text-amber-600 font-semibold">Special Weekend Supplement</td>
                                </tr>
                              </>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: HEADCOUNT DEMAND ORDER ENGINE */}
                  {activeMmsTab === 'demand' && (
                    <div className="space-y-6">
                      <div className={`p-5 rounded-xl border ${
                        isDark ? 'bg-aurora-card/60 border-white/10' : 'bg-slate-50/80 border-slate-200'
                      }`}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                          <div>
                            <div className={`font-mono text-xs uppercase font-extrabold flex items-center gap-2 ${
                              isDark ? 'text-aurora-lavender' : 'text-violet-700'
                            }`}>
                              <Sliders className="w-4 h-4" />
                              <span>LIVE DEMAND CALCULATOR: EppsDemandOrderHdr & Dtl</span>
                            </div>
                            <p className={`font-sans text-sm mt-1 font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                              Slide the projected headcount to watch the Java recipe explosion algorithm dynamically forecast pantry ingredients.
                            </p>
                          </div>

                          <div className={`flex items-center gap-4 px-5 py-3 rounded-xl border ${
                            isDark ? 'bg-aurora-night border-aurora-violet/30' : 'bg-white border-slate-200 shadow-sm'
                          }`}>
                            <div className="text-right">
                              <div className="font-mono text-[10px] opacity-70 uppercase font-semibold">PROJECTED HEADCOUNT</div>
                              <div className={`font-display font-black text-2xl ${
                                isDark ? 'text-aurora-lavender' : 'text-violet-700'
                              }`}>
                                {headcount.toLocaleString()} <span className="text-xs font-mono opacity-70">DINERS</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Interactive Animated Supply-Chain Flow Topology */}
                        <div className={`grid grid-cols-2 md:grid-cols-5 gap-2.5 p-4 rounded-xl border backdrop-blur-xl mb-6 font-mono text-xs transition-colors ${
                          isDark ? 'bg-black/20 border-white/10' : 'bg-slate-100/90 border-slate-200'
                        }`}>
                          <div className={`p-3 rounded-lg border flex flex-col justify-between card-alive-float-1 ${
                            isDark ? 'bg-aurora-card/60 border-white/5' : 'bg-white border-slate-200 shadow-xs'
                          }`}>
                            <div className="text-[10px] opacity-70 uppercase font-bold text-slate-500">01. FORECAST</div>
                            <div className={`font-bold text-sm my-0.5 ${isDark ? 'text-aurora-lavender' : 'text-violet-700'}`}>
                              {headcount.toLocaleString()} DINERS
                            </div>
                            <div className="text-[9px] text-emerald-600 font-semibold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              <span>Active Demand</span>
                            </div>
                          </div>

                          <div className={`p-3 rounded-lg border flex flex-col justify-between card-alive-float-2 ${
                            isDark ? 'bg-aurora-card/60 border-white/5' : 'bg-white border-slate-200 shadow-xs'
                          }`}>
                            <div className="text-[10px] opacity-70 uppercase font-bold text-slate-500">02. NORM MATRIX</div>
                            <div className={`font-bold text-sm my-0.5 ${isDark ? 'text-sky-400' : 'text-sky-700'}`}>6 Core Items</div>
                            <div className="text-[9px] opacity-75 font-medium">Nutritional Rules</div>
                          </div>

                          <div className={`p-3 rounded-lg border flex flex-col justify-between card-alive-float-3 ${
                            isDark ? 'bg-aurora-card/60 border-white/5' : 'bg-white border-slate-200 shadow-xs'
                          }`}>
                            <div className="text-[10px] opacity-70 uppercase font-bold text-slate-500">03. REQUISITION</div>
                            <div className={`font-bold text-sm my-0.5 ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>{(headcount * 0.14).toFixed(0)} KG RICE</div>
                            <div className="text-[9px] text-amber-600 font-semibold">Dynamic Explode</div>
                          </div>

                          <div className={`p-3 rounded-lg border flex flex-col justify-between card-alive-float-1 ${
                            isDark ? 'bg-aurora-card/60 border-white/5' : 'bg-white border-slate-200 shadow-xs'
                          }`}>
                            <div className="text-[10px] opacity-70 uppercase font-bold text-slate-500">04. CONCURRENCY</div>
                            <div className={`font-bold text-sm my-0.5 ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>PESSIMISTIC</div>
                            <div className="text-[9px] text-emerald-600 font-semibold">Row-Level Lock</div>
                          </div>

                          <div className={`p-3 rounded-lg border flex flex-col justify-between col-span-2 md:col-span-1 card-alive-float-2 ${
                            isDark ? 'bg-aurora-card/60 border-white/5' : 'bg-white border-slate-200 shadow-xs'
                          }`}>
                            <div className="text-[10px] opacity-70 uppercase font-bold text-slate-500">05. LEDGER</div>
                            <div className="font-bold text-sm text-emerald-600 my-0.5">AUDIT VERIFIED</div>
                            <div className="text-[9px] text-emerald-600 font-semibold">Zero Variance</div>
                          </div>
                        </div>

                        {/* Interactive Range Slider */}
                        <div className="space-y-2">
                          <div className="flex justify-between font-mono text-[11px] opacity-75 font-medium">
                            <span>MIN: 200 DINERS</span>
                            <span className={`font-extrabold ${isDark ? 'text-aurora-lavender' : 'text-violet-700'}`}>
                              DRAG SLIDER TO SCALE DEMAND
                            </span>
                            <span>MAX: 5,000 DINERS</span>
                          </div>
                          <input
                            type="range"
                            min="200"
                            max="5000"
                            step="50"
                            value={headcount}
                            onChange={(e) => setHeadcount(Number(e.target.value))}
                            className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                              isDark ? 'bg-aurora-card accent-aurora-violet' : 'bg-slate-200 accent-violet-700'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Calculated Raw Ingredient Ledger */}
                      <div className={`overflow-x-auto rounded-xl border ${
                        isDark ? 'border-white/10 bg-aurora-night/40' : 'border-slate-200 bg-white shadow-xs'
                      }`}>
                        <table className="w-full text-left font-mono text-xs">
                          <thead className={`border-b uppercase text-[10px] tracking-wider font-bold ${
                            isDark ? 'bg-aurora-card text-slate-300 border-white/10' : 'bg-slate-100/90 text-slate-700 border-slate-200'
                          }`}>
                            <tr>
                              <th className="py-3 px-4">Raw Ingredient</th>
                              <th className="py-3 px-4">Standard Recipe Norm</th>
                              <th className={`py-3 px-4 font-extrabold ${isDark ? 'text-aurora-lavender' : 'text-violet-700'}`}>Total Requisition Demand</th>
                              <th className="py-3 px-4">Pantry Inventory State</th>
                              <th className="py-3 px-4">Allocation Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-current/10">
                            {calculateIngredients(headcount).map((row, idx) => (
                              <tr key={idx} className="hover:bg-current/[0.02]">
                                <td className={`py-3 px-4 font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{row.item}</td>
                                <td className={`py-3 px-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{row.norm}</td>
                                <td className={`py-3 px-4 font-bold ${isDark ? 'text-aurora-lavender' : 'text-violet-700'}`}>{row.total}</td>
                                <td className="py-3 px-4 text-emerald-600 font-semibold flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                  {row.stock}
                                </td>
                                <td className="py-3 px-4 font-mono text-[11px]">
                                  <span className={`px-2 py-0.5 rounded border font-semibold ${
                                    isDark ? 'bg-aurora-card border-white/5 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                                  }`}>
                                    {row.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: STORE-TO-STORE REQUISITION */}
                  {activeMmsTab === 'transfer' && (
                    <div className="space-y-6">
                      <div className={`p-5 rounded-xl border ${
                        isDark ? 'bg-aurora-card/60 border-white/10' : 'bg-slate-50/80 border-slate-200'
                      }`}>
                        <div className={`font-mono text-xs uppercase font-extrabold mb-2 ${
                          isDark ? 'text-aurora-lavender' : 'text-violet-700'
                        }`}>
                          ENTITY: EppsMaterialTransferHdr & EppsTempMmS2SDtl (Sub-Store Movement)
                        </div>
                        <p className={`font-sans text-sm mb-6 font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                          Simulate a high-concurrency stock movement between the Central Raw Goods Warehouse and the Main Dining Kitchen Sub-Store with pessimistic concurrency lock arbitration.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 font-mono text-xs">
                          <div className={`p-4 rounded-xl border ${
                            isDark ? 'bg-aurora-night border-white/5' : 'bg-white border-slate-200 shadow-xs'
                          }`}>
                            <div className="text-[10px] opacity-70 uppercase font-semibold text-slate-500">ORIGIN DISPATCH</div>
                            <div className={`font-bold text-sm mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>WH-CENTRAL-01</div>
                            <div className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Central Bulk Silo Hub</div>
                          </div>
                          
                          <div className={`p-4 rounded-xl border flex flex-col justify-center items-center text-center ${
                            isDark ? 'bg-aurora-night border-aurora-violet/40' : 'bg-white border-violet-200 shadow-xs'
                          }`}>
                            <div className={`text-[10px] uppercase font-extrabold ${
                              isDark ? 'text-aurora-lavender' : 'text-violet-700'
                            }`}>REQUISITION BATCH</div>
                            <div className={`font-bold text-sm mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>500 KG Basmati Rice</div>
                            <div className="text-emerald-600 font-semibold text-[11px] mt-0.5">Batch #MMS-TX-9042</div>
                          </div>

                          <div className={`p-4 rounded-xl border ${
                            isDark ? 'bg-aurora-night border-white/5' : 'bg-white border-slate-200 shadow-xs'
                          }`}>
                            <div className="text-[10px] opacity-70 uppercase font-semibold text-slate-500">DESTINATION KITCHEN</div>
                            <div className={`font-bold text-sm mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>KP-NORTH-04</div>
                            <div className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Sub-Pantry Active Line</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                          <button
                            onClick={handleSimulateTransfer}
                            disabled={transferStatus === 'COMMITTED_SUCCESS' || transferStatus === 'LOCKING_STOCK'}
                            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider disabled:opacity-50 transition-all flex items-center gap-2 ${
                              isDark
                                ? 'bg-aurora-violet text-aurora-night hover:bg-white shadow-glow-violet'
                                : 'bg-violet-700 text-white hover:bg-violet-800 shadow-md'
                            }`}
                          >
                            <Play className="w-3.5 h-3.5" />
                            <span>DISPATCH MATERIAL TRANSFER (TX)</span>
                          </button>

                          {transferStatus && (
                            <button
                              onClick={resetTransfer}
                              className={`px-4 py-2.5 rounded-xl font-mono text-xs transition-all flex items-center gap-2 font-semibold ${
                                isDark ? 'bg-aurora-card hover:bg-aurora-cardHover text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 shadow-2xs'
                              }`}
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              <span>RESET PIPELINE</span>
                            </button>
                          )}

                          {transferStatus === 'LOCKING_STOCK' && (
                            <div className="font-mono text-xs text-amber-600 font-semibold flex items-center gap-2 animate-pulse">
                              <Activity className="w-4 h-4" />
                              <span>ACQUIRING PESSIMISTIC ROW LOCK (SELECT FOR UPDATE)...</span>
                            </div>
                          )}

                          {transferStatus === 'PESSIMISTIC_LOCK_ACQUIRED' && (
                            <div className={`font-mono text-xs font-semibold flex items-center gap-2 ${
                              isDark ? 'text-aurora-lavender' : 'text-violet-700'
                            }`}>
                              <Activity className="w-4 h-4" />
                              <span>EXECUTING DUAL-STORE LEDGER DECREMENT / INCREMENT...</span>
                            </div>
                          )}

                          {transferStatus === 'COMMITTED_SUCCESS' && (
                            <div className="font-mono text-xs text-emerald-600 font-bold flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>COMMIT TRANSACTION 200 OK — LEDGER BALANCES VERIFIED (0 CONFLICTS)</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: COST CENTER AUDITING */}
                  {activeMmsTab === 'cost' && (
                    <div className="space-y-6">
                      <div className={`p-5 rounded-xl border ${
                        isDark ? 'bg-aurora-card/60 border-white/10' : 'bg-slate-50/80 border-slate-200'
                      }`}>
                        <div className={`font-mono text-xs uppercase font-extrabold mb-2 ${
                          isDark ? 'text-aurora-lavender' : 'text-violet-700'
                        }`}>
                          ENTITY: EppsIssueHdr.java & EppsIssueCostCenterDtl.java
                        </div>
                        <p className={`font-sans text-sm mb-6 font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                          Institutional accounting module attributing food materials to departmental cost centers with real-time wastage variance audits.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                          <div className={`p-4 rounded-xl border ${
                            isDark ? 'bg-aurora-night border-white/5' : 'bg-white border-slate-200 shadow-xs'
                          }`}>
                            <div className="opacity-70 text-[10px] uppercase font-bold text-slate-500">COST CENTER CODE</div>
                            <div className={`font-bold text-base mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>CC-ENG-RES-01</div>
                            <div className={`mt-1 font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Engineering Residential Dining</div>
                            <div className={`font-extrabold mt-2 ${isDark ? 'text-aurora-lavender' : 'text-violet-700'}`}>
                              ₹ 4,82,400 Monthly Allocation
                            </div>
                          </div>

                          <div className={`p-4 rounded-xl border ${
                            isDark ? 'bg-aurora-night border-white/5' : 'bg-white border-slate-200 shadow-xs'
                          }`}>
                            <div className="opacity-70 text-[10px] uppercase font-bold text-slate-500">COST CENTER CODE</div>
                            <div className={`font-bold text-base mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>CC-FAC-CAFE-03</div>
                            <div className={`mt-1 font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Faculty & Guest Executive Cafe</div>
                            <div className={`font-extrabold mt-2 ${isDark ? 'text-aurora-lavender' : 'text-violet-700'}`}>
                              ₹ 1,95,150 Monthly Allocation
                            </div>
                          </div>

                          <div className={`p-4 rounded-xl border ${
                            isDark ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-emerald-50/90 border-emerald-200 shadow-xs'
                          }`}>
                            <div className="text-emerald-700 text-[10px] uppercase font-extrabold">WASTAGE VARIANCE AUDIT</div>
                            <div className="font-extrabold text-base mt-1 text-emerald-700">-38.4% WASTE DROP</div>
                            <div className="font-medium text-emerald-800/80 mt-1">Saved ₹ 1.2M annually</div>
                            <div className="text-emerald-700 font-extrabold mt-2">AUDIT STATUS: APPROVED</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

          {/* Footer Verified Entities for Trunk ERP */}
          <div className={`p-6 border-t flex flex-wrap items-center justify-between gap-4 font-mono text-xs ${
            isDark ? 'bg-aurora-card/60 border-white/10 text-slate-400' : 'bg-slate-50/80 border-slate-200 text-slate-700'
          }`}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-extrabold text-slate-900 dark:text-slate-200">VERIFIED TRUNK DOMAIN ENTITIES:</span>
              {trunkProject.verifiedEntities.map((e, idx) => (
                <span key={idx} className={`px-2 py-0.5 rounded-md border font-semibold ${
                  isDark ? 'bg-aurora-night border-white/10 text-slate-300' : 'bg-white border-slate-200 text-slate-800 shadow-2xs'
                }`}>
                  {e.name}
                </span>
              ))}
            </div>
            <div className={`font-bold ${isDark ? 'text-aurora-lavender' : 'text-violet-700'}`}>
              TRUNK REPOSITORY VERIFIED
            </div>
          </div>

        </div>

        {/* ========================================================
            FLAGSHIP 2: EPPS SMART MOBILE ERP BACKEND (SPRING BOOT 3 + GRAPHQL)
            ======================================================== */}
        <div className={`rounded-3xl border backdrop-blur-2xl shadow-2xl overflow-hidden mb-20 hud-border ambient-sheen-container card-breathing-aura dynamic-card-glow transition-all ${
          isDark
            ? 'bg-white/[0.05] border-white/15 shadow-[0_12px_45px_rgba(0,0,0,0.5)]'
            : 'bg-white border-slate-200 shadow-xl'
        }`}>
          
          {/* Header Strip */}
          <div className={`p-6 sm:p-8 border-b ${
            isDark
              ? 'bg-white/[0.03] border-white/10'
              : 'bg-gradient-to-r from-slate-50 via-white to-slate-50 border-slate-200/90'
          }`}>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full font-mono text-xs font-bold tracking-wider uppercase ${
                  isDark ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40' : 'bg-violet-700 text-white'
                }`}>
                  {mobileProject.badge}
                </span>
                <span className={`font-mono text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  CODEBASE: <code className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900 font-bold'}`}>smart-erp-mobile (GraphQL & REST)</code>
                </span>
              </div>
              <div className={`flex items-center gap-2 text-xs font-mono px-3.5 py-1.5 rounded-full border backdrop-blur-xl ${
                isDark ? 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-xs'
              }`}>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold">SUB-40MS MOBILE SLA VERIFIED</span>
              </div>
            </div>

            <h3 className={`font-display font-extrabold text-2xl sm:text-4xl tracking-tight mb-2 ${
              isDark ? 'text-white' : 'text-slate-900 font-black'
            }`}>
              {mobileProject.title}
            </h3>
            <p className={`font-sans text-base sm:text-lg max-w-4xl leading-relaxed mb-6 ${
              isDark ? 'text-slate-200' : 'text-slate-600 font-medium'
            }`}>
              {mobileProject.overview}
            </p>

            {/* Metrics Ribbon with Dynamic Shimmer Spotlight */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-4 border-t border-white/10">
              {mobileProject.metrics.map((m, idx) => (
                <SpotlightCard
                  key={idx}
                  variant="kpi"
                  className={`p-4 rounded-2xl border transition-all backdrop-blur-xl ${
                    isDark ? 'bg-white/[0.07] hover:bg-white/[0.12] border-white/15 shadow-md' : 'bg-white border-slate-200/90 shadow-sm hover:border-violet-300 hover:shadow-md'
                  }`}
                  spotlightColor={isDark ? 'rgba(56, 189, 248, 0.25)' : 'rgba(109, 40, 217, 0.12)'}
                >
                  <div className={`font-display font-black text-2xl sm:text-3xl ${
                    isDark ? 'text-white drop-shadow-sm' : 'text-violet-700'
                  }`}>
                    {m.val}
                  </div>
                  <div className={`font-mono text-[10px] font-semibold uppercase mt-1 ${
                    isDark ? 'text-cyan-300' : 'text-slate-600'
                  }`}>
                    {m.label}
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>

          {/* Interactive Mobile ERP Operations Console */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-col gap-6">
              
              {/* Console Navigation Tabs */}
              <div className={`flex flex-wrap items-center justify-between gap-4 pb-4 border-b font-mono text-xs ${
                isDark ? 'border-white/10' : 'border-slate-200/90'
              }`}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`font-mono text-xs uppercase font-extrabold mr-2 tracking-wider ${
                    isDark ? 'text-slate-300 opacity-80' : 'text-slate-900'
                  }`}>
                    MOBILE ENDPOINT TESTER:
                  </span>
                  
                  <button
                    onClick={() => {
                      celestialAudio.playChime('chime');
                      setActiveMobileTab('graphql-fas');
                    }}
                    className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all font-semibold border ${
                      activeMobileTab === 'graphql-fas'
                        ? isDark
                          ? 'bg-gradient-to-r from-cyan-600 to-sky-600 text-white shadow-[0_4px_20px_rgba(56,189,248,0.35)] border-cyan-400/50'
                          : 'bg-violet-700 text-white shadow-md border-violet-700'
                        : isDark
                        ? 'bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 border-white/10 hover:border-white/20'
                        : 'bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-50 border-slate-200 shadow-xs'
                    }`}
                  >
                    <AnimatedIcon icon={Database} variant={activeMobileTab === 'graphql-fas' ? 'bounce' : 'float'} color="cyan" size="sm" badge={false} />
                    <span>01. GRAPHQL: FINANCIAL AGING</span>
                  </button>

                  <button
                    onClick={() => {
                      celestialAudio.playChime('chime');
                      setActiveMobileTab('rest-sdms');
                    }}
                    className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all font-semibold border ${
                      activeMobileTab === 'rest-sdms'
                        ? isDark
                          ? 'bg-gradient-to-r from-cyan-600 to-sky-600 text-white shadow-[0_4px_20px_rgba(56,189,248,0.35)] border-cyan-400/50'
                          : 'bg-violet-700 text-white shadow-md border-violet-700'
                        : isDark
                        ? 'bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 border-white/10 hover:border-white/20'
                        : 'bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-50 border-slate-200 shadow-xs'
                    }`}
                  >
                    <AnimatedIcon icon={Smartphone} variant={activeMobileTab === 'rest-sdms' ? 'wiggle' : 'pulse'} color="emerald" size="sm" badge={false} />
                    <span>02. REST: MOBILE SALES ORDER</span>
                  </button>

                  <button
                    onClick={() => {
                      celestialAudio.playChime('chime');
                      setActiveMobileTab('hrms-claim');
                    }}
                    className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all font-semibold border ${
                      activeMobileTab === 'hrms-claim'
                        ? isDark
                          ? 'bg-gradient-to-r from-cyan-600 to-sky-600 text-white shadow-[0_4px_20px_rgba(56,189,248,0.35)] border-cyan-400/50'
                          : 'bg-violet-700 text-white shadow-md border-violet-700'
                        : isDark
                        ? 'bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 border-white/10 hover:border-white/20'
                        : 'bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-50 border-slate-200 shadow-xs'
                    }`}
                  >
                    <AnimatedIcon icon={FileText} variant={activeMobileTab === 'hrms-claim' ? 'float' : 'radar'} color="amber" size="sm" badge={false} />
                    <span>03. HRMS: EXPENSE WORKFLOW</span>
                  </button>

                  <button
                    onClick={() => {
                      celestialAudio.playChime('chime');
                      setActiveMobileTab('mms-po');
                    }}
                    className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all font-semibold border ${
                      activeMobileTab === 'mms-po'
                        ? isDark
                          ? 'bg-gradient-to-r from-cyan-600 to-sky-600 text-white shadow-[0_4px_20px_rgba(56,189,248,0.35)] border-cyan-400/50'
                          : 'bg-violet-700 text-white shadow-md border-violet-700'
                        : isDark
                        ? 'bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 border-white/10 hover:border-white/20'
                        : 'bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-50 border-slate-200 shadow-xs'
                    }`}
                  >
                    <AnimatedIcon icon={CheckCircle2} variant={activeMobileTab === 'mms-po' ? 'pulse' : 'float'} color="emerald" size="sm" badge={false} />
                    <span>04. MMS: MOBILE PO APPROVAL</span>
                  </button>
                </div>

                <div className={`font-mono text-[11px] flex items-center gap-2 ${
                  isDark ? 'text-slate-300 opacity-80' : 'text-slate-700 font-bold'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>ENGINE: SpringBoot3_GraphQL</span>
                </div>
              </div>

              {/* Animated Mobile ERP Tabs Container */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMobileTab}
                  initial={{ opacity: 0, y: 12, scale: 0.995 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.995 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* TAB 1: GRAPHQL: FINANCIAL AGING */}
                  {activeMobileTab === 'graphql-fas' && (
                    <div className="space-y-6">
                      <div className={`p-5 rounded-xl border ${
                        isDark ? 'bg-aurora-card/60 border-white/10' : 'bg-slate-50/80 border-slate-200'
                      }`}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                          <div>
                            <div className={`font-mono text-xs uppercase font-extrabold ${
                              isDark ? 'text-aurora-lavender' : 'text-violet-700'
                            }`}>
                              RESOLVER: AccountsPayableGraphQLController.java (@QueryMapping)
                            </div>
                            <div className={`font-sans text-xs mt-1 font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                              Executes single-roundtrip GraphQL query aggregating outstanding vendor liabilities across aging brackets.
                            </div>
                          </div>

                          <button
                            onClick={handleExecuteMobileGraphQL}
                            disabled={mobileQueryExecuting}
                            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase transition-all flex items-center gap-2 ${
                              isDark
                                ? 'bg-aurora-violet text-aurora-night hover:bg-white shadow-glow-violet'
                                : 'bg-violet-700 text-white hover:bg-violet-800 shadow-md'
                            }`}
                          >
                            <Zap className="w-3.5 h-3.5" />
                            <span>{mobileQueryExecuting ? 'RESOLVING GRAPHQL...' : 'RUN GRAPHQL QUERY'}</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 font-mono text-xs">
                          {/* Query Editor Preview */}
                          <div className="p-4 rounded-xl border bg-slate-950 border-slate-800 text-slate-200 shadow-inner">
                            <div className="text-[10px] font-mono uppercase mb-2 text-cyan-400 font-extrabold tracking-wider">
                              # CLIENT GRAPHQL QUERY PAYLOAD
                            </div>
                            <pre className="text-[11px] leading-relaxed text-sky-300 font-mono">
{`query GetCreditorAging {
  creditorAgingSummary(companyCode: "EPPS_IND", divisionCode: "DIV_PUNE_01") {
    bucket
    amount
    vendorCount
    status
  }
}`}
                            </pre>
                          </div>

                          {/* Response Terminal */}
                          <div className="p-4 rounded-xl border bg-slate-950 border-slate-800 text-white shadow-inner">
                            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-white/10 text-[10px]">
                              <span className="text-emerald-400 font-bold uppercase flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span>RESOLVER TELEMETRY</span>
                              </span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1.5 ${mobileQueryResult ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-white/10 text-slate-400'}`}>
                                {mobileQueryResult && (
                                  <span className="flex items-end gap-0.5 h-3 px-0.5" title="Live GraphQL Data Pipe">
                                    <span className="w-[2px] rounded-full bg-emerald-400 waveform-bar-1" />
                                    <span className="w-[2px] rounded-full bg-sky-400 waveform-bar-2" />
                                    <span className="w-[2px] rounded-full bg-emerald-400 waveform-bar-3" />
                                  </span>
                                )}
                                <span>{mobileQueryResult ? `⚡ ${mobileQueryResult.executionTimeMs}ms • 200 OK • DATALOADER BATCHED` : 'STATUS: READY'}</span>
                              </span>
                            </div>

                            {mobileQueryResult ? (
                              <div className="space-y-2 mt-2">
                                {mobileQueryResult.buckets.map((b, bIdx) => (
                                  <div key={bIdx} className="flex items-center justify-between p-2 rounded bg-white/5 text-xs">
                                    <div>
                                      <span className="font-bold text-white">{b.bucket}</span>
                                      <span className="text-[10px] opacity-60 ml-2">({b.vendorCount} Vendors)</span>
                                    </div>
                                    <div className="text-right">
                                      <span className="font-bold text-emerald-400">{b.amount}</span>
                                      <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300">{b.status}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="py-8 text-center text-slate-400 font-mono text-xs">
                                Click [RUN GRAPHQL QUERY] to simulate mobile resolver execution...
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: REST: MOBILE SALES ORDER */}
                  {activeMobileTab === 'rest-sdms' && (
                    <div className="space-y-6">
                      <div className={`p-5 rounded-xl border ${
                        isDark ? 'bg-aurora-card/60 border-white/10' : 'bg-slate-50/80 border-slate-200'
                      }`}>
                        <div className={`font-mono text-xs uppercase font-extrabold mb-2 ${
                          isDark ? 'text-aurora-lavender' : 'text-violet-700'
                        }`}>
                          CONTROLLER: SalesOrderMobileController.java (POST /api/v1/mobile/sdms/orders)
                        </div>
                        <p className={`font-sans text-sm mb-4 font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                          Mobile sales dispatch pipeline with real-time inventory reservation, buyer credit limit validation, and automated tax calculations.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                          <div className={`p-4 rounded-xl border ${
                            isDark ? 'bg-aurora-night border-white/5' : 'bg-white border-slate-200 shadow-xs'
                          }`}>
                            <div className="text-[10px] opacity-70 uppercase font-semibold text-slate-500">CUSTOMER ACCOUNT</div>
                            <div className={`font-bold text-sm mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>APEX IND_902</div>
                            <div className="text-emerald-600 text-[11px] mt-0.5 font-bold">Credit Limit: ₹ 25,00,000</div>
                            <div className={`text-[10px] mt-1 font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Utilized: 42% (Approved)</div>
                          </div>

                          <div className={`p-4 rounded-xl border ${
                            isDark ? 'bg-aurora-night border-white/5' : 'bg-white border-slate-200 shadow-xs'
                          }`}>
                            <div className="text-[10px] opacity-70 uppercase font-semibold text-slate-500">PRODUCT SKU DISPATCH</div>
                            <div className={`font-bold text-sm mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>EPPS-IND-MOTOR-5HP</div>
                            <div className={`font-bold mt-0.5 ${isDark ? 'text-aurora-lavender' : 'text-violet-700'}`}>Quantity: 25 Units</div>
                            <div className="text-emerald-600 text-[10px] mt-1 font-bold">Warehouse Stock: 140 Units (Allocated)</div>
                          </div>

                          <div className={`p-4 rounded-xl border flex flex-col justify-between ${
                            isDark ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-emerald-50/90 border-emerald-200 shadow-xs'
                          }`}>
                            <div>
                              <div className="text-emerald-700 text-[10px] uppercase font-extrabold">PIPELINE VERIFICATION</div>
                              <div className="font-extrabold text-sm mt-1 text-emerald-700">HTTP 201 CREATED</div>
                              <div className="text-emerald-800/80 text-[10px] mt-0.5 font-medium">Order #SO-MBL-8840 Generated</div>
                            </div>
                            <div className="text-[10px] font-mono text-emerald-600 font-bold mt-2">
                              LATENCY: 34ms (WITHIN SLA)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: HRMS: EXPENSE WORKFLOW */}
                  {activeMobileTab === 'hrms-claim' && (
                    <div className="space-y-6">
                      <div className={`p-5 rounded-xl border ${
                        isDark ? 'bg-aurora-card/60 border-white/10' : 'bg-slate-50/80 border-slate-200'
                      }`}>
                        <div className={`font-mono text-xs uppercase font-extrabold mb-2 ${
                          isDark ? 'text-aurora-lavender' : 'text-violet-700'
                        }`}>
                          WORKFLOW: HrmsExpenseClaimWorkflow.java (State Machine: SUBMITTED → AUDITED → APPROVED)
                        </div>
                        <p className={`font-sans text-sm mb-4 font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                          Mobile employee claim management with policy ceiling verification, image voucher attachment hash checks, and hierarchical multi-tier manager authorizations.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                          <div className={`p-4 rounded-xl border ${
                            isDark ? 'bg-aurora-night border-white/5' : 'bg-white border-slate-200 shadow-xs'
                          }`}>
                            <div className="text-[10px] opacity-70 uppercase font-semibold text-slate-500">EXPENSE TYPE</div>
                            <div className={`font-bold text-sm mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Inter-City Client Travel</div>
                            <div className={`text-[11px] mt-0.5 font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Pune ⇄ Mumbai Depot</div>
                            <div className={`font-bold mt-1 ${isDark ? 'text-aurora-lavender' : 'text-violet-700'}`}>Amount: ₹ 4,250.00</div>
                          </div>

                          <div className={`p-4 rounded-xl border ${
                            isDark ? 'bg-aurora-night border-white/5' : 'bg-white border-slate-200 shadow-xs'
                          }`}>
                            <div className="text-[10px] opacity-70 uppercase font-semibold text-slate-500">POLICY VERIFICATION</div>
                            <div className="font-bold text-sm mt-1 text-emerald-600">POLICY COMPLIANT</div>
                            <div className={`text-[11px] mt-0.5 font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Ceiling: ₹ 6,000 / day</div>
                            <div className="text-[10px] text-emerald-600 font-semibold mt-1">Voucher Attachment: Verified</div>
                          </div>

                          <div className={`p-4 rounded-xl border flex flex-col justify-between ${
                            isDark ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-emerald-50/90 border-emerald-200 shadow-xs'
                          }`}>
                            <div>
                              <div className="text-emerald-700 text-[10px] uppercase font-extrabold">APPROVAL STAGE</div>
                              <div className="font-extrabold text-sm mt-1 text-emerald-700">STAGE 2 APPROVED</div>
                              <div className="text-emerald-800/80 text-[10px] mt-0.5 font-medium">Disbursed to Payroll Ledger</div>
                            </div>
                            <div className="text-[10px] font-mono text-emerald-600 font-bold mt-2">
                              PAYROLL SYNC: READY
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: MMS: MOBILE PO APPROVAL */}
                  {activeMobileTab === 'mms-po' && (
                    <div className="space-y-6">
                      <div className={`p-5 rounded-xl border ${
                        isDark ? 'bg-aurora-card/60 border-white/10' : 'bg-slate-50/80 border-slate-200'
                      }`}>
                        <div className={`font-mono text-xs uppercase font-extrabold mb-2 ${
                          isDark ? 'text-aurora-lavender' : 'text-violet-700'
                        }`}>
                          SERVICE: PurchaseOrderApprovalService.java (Executive One-Touch Authorization)
                        </div>
                        <p className={`font-sans text-sm mb-4 font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                          Authorizing high-value institutional procurement orders on mobile devices with automated vendor quote comparison and budget threshold validation.
                        </p>

                        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border mb-4 font-mono text-xs ${
                          isDark ? 'bg-current/[0.03] border-white/10' : 'bg-white border-slate-200 shadow-xs'
                        }`}>
                          <div>
                            <div className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>PO #EPPS-PO-2025-9012</div>
                            <div className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Vendor: Shri Agro Bulk Suppliers // Value: ₹ 3,45,000</div>
                          </div>

                          <div className="flex items-center gap-3">
                            {poApprovalStatus === 'APPROVED' ? (
                              <div className="px-3.5 py-1.5 rounded-lg bg-emerald-500 text-black font-bold text-xs flex items-center gap-1.5 shadow-sm">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>PO AUTHORIZED & DISPATCHED</span>
                              </div>
                            ) : (
                              <button
                                onClick={handleApprovePO}
                                disabled={poApprovalStatus === 'AUTHORIZING'}
                                className={`px-4 py-2 rounded-xl font-bold uppercase transition-all flex items-center gap-2 ${
                                  isDark
                                    ? 'bg-aurora-violet text-aurora-night hover:bg-white shadow-glow-violet'
                                    : 'bg-violet-700 text-white hover:bg-violet-800 shadow-md'
                                }`}
                              >
                                <CheckCircle2 className="w-4 h-4" />
                                <span>{poApprovalStatus === 'AUTHORIZING' ? 'DIGITALLY SIGNING...' : 'AUTHORIZE PO (EXECUTIVE)'}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

          {/* Footer Verified Entities for Mobile ERP */}
          <div className={`p-6 border-t flex flex-wrap items-center justify-between gap-4 font-mono text-xs ${
            isDark ? 'bg-aurora-card/60 border-white/10 text-slate-400' : 'bg-slate-50/80 border-slate-200 text-slate-700'
          }`}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-extrabold text-slate-900 dark:text-slate-200">VERIFIED MOBILE DOMAIN ENDPOINTS:</span>
              {mobileProject.verifiedEntities.map((e, idx) => (
                <span key={idx} className={`px-2 py-0.5 rounded-md border font-semibold ${
                  isDark ? 'bg-aurora-night border-white/10 text-slate-300' : 'bg-white border-slate-200 text-slate-800 shadow-2xs'
                }`}>
                  {e.name}
                </span>
              ))}
            </div>
            <div className={`font-bold ${isDark ? 'text-aurora-lavender' : 'text-violet-700'}`}>
              MOBILE REPOSITORY VERIFIED
            </div>
          </div>

        </div>

        {/* ========================================================
            ADDITIONAL PRODUCTION WORKLOADS
            ======================================================== */}
        <div className="mb-8">
          <div className="font-mono text-xs uppercase tracking-widest text-slate-500 font-bold mb-2">
            SECONDARY PRODUCTION WORKLOADS
          </div>
          <h3 className={`font-display font-black text-2xl sm:text-3xl uppercase tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            DEEP SPACE OBSERVATORY & ATOMIC STOCKS.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
          {secondaryProjects.map((p) => (
            <SpotlightCard
              key={p.id}
              className={`rounded-2xl border backdrop-blur-2xl p-7 flex flex-col justify-between transition-all duration-300 group hud-border ambient-sheen-container ${
                isDark
                  ? 'bg-white/[0.05] border-white/15 hover:border-violet-400/40 hover:bg-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.4)]'
                  : 'bg-white border-slate-200/90 hover:border-violet-300 hover:shadow-lg shadow-md'
              }`}
              spotlightColor={isDark ? 'rgba(167, 139, 250, 0.22)' : 'rgba(109, 40, 217, 0.12)'}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full font-mono text-[10px] font-bold tracking-wider uppercase border flex items-center gap-1.5 shadow-xs ${
                    isDark ? 'bg-violet-950/40 text-violet-200 border-violet-500/30' : 'bg-violet-50 text-violet-700 border-violet-200'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    {p.badge}
                  </span>
                  <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-slate-500">
                    {p.role}
                  </span>
                </div>

                <h4 className={`font-display font-black text-2xl mb-2 transition-colors ${
                  isDark ? 'text-white group-hover:text-cyan-300' : 'text-slate-900 group-hover:text-violet-700'
                }`}>
                  {p.title}
                </h4>
                <p className={`font-sans text-xs sm:text-sm leading-relaxed mb-6 font-medium ${
                  isDark ? 'text-slate-200' : 'text-slate-600'
                }`}>
                  {p.overview}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {p.metrics.map((m, mIdx) => (
                    <div key={mIdx} className={`p-3 rounded-xl border font-mono transition-all duration-200 ${
                      isDark ? 'bg-white/[0.04] border-white/10 hover:border-white/20' : 'bg-slate-50/90 border-slate-200/90'
                    }`}>
                      <div className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-cyan-300' : 'text-slate-600'}`}>{m.label}</div>
                      <div className={`font-display font-black text-lg mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>{m.val}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className={`flex flex-wrap gap-2 pt-4 border-t font-mono text-[11px] ${
                  isDark ? 'border-white/10' : 'border-slate-200'
                }`}>
                  {p.stack.map((tech, tIdx) => (
                    <span key={tIdx} className={`px-2.5 py-1 rounded-lg border font-semibold transition-all ${
                      isDark ? 'bg-white/[0.06] border-white/10 text-slate-200 hover:border-violet-400/40 hover:text-white' : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300'
                    }`}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

      </div>
    </section>
  );
}
