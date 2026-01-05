
import React from 'react';
import { PainPoint } from '../types';
import { TrendingUp, BarChart3, Rocket, ChevronRight, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';

interface PainPointCardProps {
  data: PainPoint;
  onClick: (data: PainPoint) => void;
  onFavoriteToggle: (e: React.MouseEvent, data: PainPoint) => void;
  isFavorite: boolean;
  index: number;
}

const PainPointCard: React.FC<PainPointCardProps> = ({ data, onClick, onFavoriteToggle, isFavorite, index }) => {
  const intensity = data.intensity || 'High Margin'; // Fallback for Supabase data
  
  const getIntensityColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'Systemic': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'High Margin': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'Regulatory': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      default: return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      onClick={() => onClick(data)}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-[#1A1A1A] bg-[#0A0A0A] p-6 transition-all duration-400 hover:scale-[1.02] hover:border-indigo-500/50 hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.3)]"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-col gap-1 pr-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            {data.industry || 'General SaaS'}
          </span>
          <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors leading-tight">
            {data.title}
          </h3>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className={`px-2 py-1 rounded text-[10px] font-bold border whitespace-nowrap ${getIntensityColor(intensity)}`}>
            {intensity}
          </div>
          <button 
            onClick={(e) => onFavoriteToggle(e, data)}
            className={`p-2 rounded-full border transition-all ${isFavorite ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-400' : 'bg-transparent border-[#1A1A1A] text-zinc-600 hover:text-zinc-400 hover:border-zinc-700'}`}
          >
            <Bookmark size={14} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <p className="text-sm text-zinc-400 line-clamp-3 mb-6 min-h-[60px]">
        {data.description}
      </p>

      <div className="space-y-3">
        {data.reasoning && (
          <div className="flex items-center gap-3 text-xs text-zinc-300">
            <TrendingUp size={14} className="text-indigo-400 shrink-0" />
            <span className="font-medium">Logic:</span>
            <span className="text-zinc-500 truncate">{data.reasoning}</span>
          </div>
        )}
        <div className="flex items-center gap-3 text-xs text-zinc-300">
          <BarChart3 size={14} className="text-indigo-400 shrink-0" />
          <span className="font-medium">Stat:</span>
          <span className="text-zinc-500 truncate">{data.statistic || '85% Efficiency Gap'}</span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[#1A1A1A] flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-medium text-white">
          <Rocket size={14} className="text-violet-400" />
          <span>Blueprint Ready</span>
        </div>
        <ChevronRight size={16} className="text-zinc-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};

export default PainPointCard;
