
import React from 'react';
import { PainPoint } from '../types';
import { X, Shield, AlertTriangle, Lightbulb, Target, ArrowUpRight, TrendingUp, BarChart3, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SideDrawerProps {
  data: PainPoint | null;
  onClose: () => void;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ data, onClose }) => {
  if (!data) return null;

  const swot = data.swot || {
    strengths: ['High Demand Market', 'Existing Workflow Pain'],
    weaknesses: ['Integration Complexity'],
    opportunities: ['Market Expansion', 'Enterprise Tiers'],
    threats: ['Platform Policy Changes']
  };

  return (
    <AnimatePresence>
      {data && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-xl border-l border-[#1A1A1A] bg-[#0A0A0A] shadow-2xl overflow-y-auto"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#1A1A1A] bg-[#0A0A0A]/90 p-6 backdrop-blur-md">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500 mb-1 block">
                  {data.industry || 'Market Intelligence'}
                </span>
                <h2 className="text-xl font-bold text-white leading-tight">{data.title}</h2>
              </div>
              <button 
                onClick={onClose}
                className="rounded-full p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-10">
              <section>
                <h3 className="mb-4 text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <AlertTriangle size={14} className="text-amber-500" /> The Specific Pain
                </h3>
                <p className="text-zinc-300 leading-relaxed text-lg font-medium italic">
                  "{data.description}"
                </p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-[#1A1A1A] bg-[#0F0F0F] p-5 border-l-2 border-l-indigo-500">
                  <h3 className="mb-2 text-[10px] font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                    <TrendingUp size={12} /> Strategic Why
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {data.reasoning || "This problem represents a critical bottleneck in professional workflows with high recurring costs."}
                  </p>
                </div>
                
                <div className="rounded-xl border border-[#1A1A1A] bg-[#0F0F0F] p-5 border-l-2 border-l-violet-500">
                  <h3 className="mb-2 text-[10px] font-bold text-violet-400 uppercase tracking-widest flex items-center gap-2">
                    <BarChart3 size={12} /> Market Data
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed font-bold">
                    {data.statistic || "80% of companies report this as a top-3 efficiency drag."}
                  </p>
                </div>
              </div>

              <section className="relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-indigo-500/5 p-8">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Rocket size={60} className="text-indigo-500" />
                </div>
                <h3 className="mb-4 text-xs font-bold text-indigo-300 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Target size={16} /> Micro-SaaS Blueprint
                </h3>
                <p className="text-white font-bold text-xl leading-relaxed">
                  {data.solution_idea || "Generate a specialized automation layer to solve this friction."}
                </p>
              </section>

              <section>
                <h3 className="mb-6 text-xs font-bold text-zinc-500 uppercase tracking-[0.2em]">SWOT Analysis</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-[#1A1A1A] bg-[#0F0F0F] p-5 hover:border-emerald-500/30 transition-colors">
                    <div className="mb-3 flex items-center gap-2 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                      <Shield size={14} /> Strengths
                    </div>
                    <ul className="space-y-2 text-[11px] text-zinc-500 font-medium">
                      {swot.strengths.map((s, i) => <li key={i} className="flex items-start gap-2"><span className="text-emerald-500">•</span>{s}</li>)}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-[#1A1A1A] bg-[#0F0F0F] p-5 hover:border-red-500/30 transition-colors">
                    <div className="mb-3 flex items-center gap-2 text-red-400 text-[10px] font-bold uppercase tracking-widest">
                      <AlertTriangle size={14} /> Risks
                    </div>
                    <ul className="space-y-2 text-[11px] text-zinc-500 font-medium">
                      {swot.weaknesses.map((w, i) => <li key={i} className="flex items-start gap-2"><span className="text-red-500">•</span>{w}</li>)}
                    </ul>
                  </div>
                </div>
              </section>

              <div className="pt-4">
                <button className="group w-full rounded-xl bg-white py-4 text-sm font-bold text-black transition-all hover:bg-indigo-50 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-xl shadow-white/5">
                  Ship This Blueprint <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideDrawer;
