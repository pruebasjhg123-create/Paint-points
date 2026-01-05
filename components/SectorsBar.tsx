
import React, { useState } from 'react';
import { 
  Scale, 
  Stethoscope, 
  Truck, 
  Building2, 
  ShoppingBag, 
  CreditCard, 
  GraduationCap, 
  Factory, 
  Users, 
  Leaf,
  Sparkles,
  Bot,
  Brain,
  Zap,
  Coins,
  Terminal,
  Gem,
  Search,
  ArrowRight,
  Trophy,
  Activity,
  Dumbbell
} from 'lucide-react';

const SECTORS = [
  { name: 'Legal', icon: Scale },
  { name: 'Healthcare', icon: Stethoscope },
  { name: 'Logistics', icon: Truck },
  { name: 'Real Estate', icon: Building2 },
  { name: 'E-commerce', icon: ShoppingBag },
  { name: 'FinTech', icon: CreditCard },
  { name: 'Sports', icon: Trophy },
  { name: 'EdTech', icon: GraduationCap },
  { name: 'Manufacturing', icon: Factory },
  { name: 'AgriTech', icon: Leaf },
];

interface SectorsBarProps {
  onSelectSector: (sector: string) => void;
  activeSector: string | null;
}

const SectorsBar: React.FC<SectorsBarProps> = ({ onSelectSector, activeSector }) => {
  const [customInput, setCustomInput] = useState('');

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim()) {
      onSelectSector(customInput.trim());
    }
  };
  
  const renderCategoryButton = (
    title: string, 
    categoryName: string, 
    gradientClasses: string, 
    icon: React.ElementType,
    label: string
  ) => {
    const Icon = icon;
    const isActive = activeSector === categoryName;

    return (
      <div className="flex flex-col items-center">
        <div className="mb-4 flex w-full items-center justify-between">
          <h2 className={`text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500`}>{title}</h2>
          <div className="h-px flex-1 bg-[#1A1A1A] ml-4"></div>
        </div>
        
        <button 
          onClick={() => onSelectSector(categoryName)}
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-[1.5px] font-bold transition-all hover:scale-105 active:scale-95"
        >
          <span className={`absolute inset-0 bg-gradient-to-r ${gradientClasses} ${isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'} transition-opacity`} />
          <span className="relative flex items-center gap-2 rounded-full bg-[#050505] px-6 py-3 text-xs text-white transition-all group-hover:bg-transparent">
            <Icon size={14} className="text-white" />
            {label}
          </span>
        </button>
      </div>
    );
  };

  const renderSectorGroup = (title: string, sectors: typeof SECTORS) => (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">{title}</h2>
        <div className="h-px flex-1 bg-[#1A1A1A] ml-4"></div>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {sectors.map((sector) => {
          const Icon = sector.icon;
          const isActive = activeSector === sector.name;
          return (
            <button
              key={sector.name}
              onClick={() => onSelectSector(sector.name)}
              className={`group flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-medium transition-all duration-300 ${
                isActive 
                ? `border-indigo-500 bg-indigo-500/10 text-indigo-400 shadow-[0_0_15px_-5px_rgba(99,102,241,0.5)]` 
                : `border-[#1A1A1A] bg-[#0A0A0A] text-zinc-500 hover:border-zinc-700 hover:text-white`
              }`}
            >
              <Icon size={12} className={isActive ? 'text-indigo-400' : 'text-zinc-600 group-hover:text-zinc-400'} />
              {sector.name}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="w-full py-8 space-y-12 max-w-4xl">
      {/* Standard Sectors */}
      {renderSectorGroup("Global Industries", SECTORS)}

      {/* Custom Sector Input */}
      <div className="max-w-xl mx-auto">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Target Specific Niche</h2>
          <div className="h-px flex-1 bg-[#1A1A1A] ml-4"></div>
        </div>
        <form onSubmit={handleCustomSubmit} className="relative group">
          <input 
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="e.g. Pet Care, BioTech, Padel Clubs..."
            className="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl py-4 pl-12 pr-32 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all font-medium"
          />
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-indigo-400 transition-colors" />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black px-4 py-2 rounded-xl text-xs font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2"
          >
            Scan Niche <ArrowRight size={14} />
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 pt-4">
        {/* Luxury */}
        {renderCategoryButton(
          "Luxury Markets", 
          "Luxury & High-Ticket Services", 
          "from-amber-400 via-yellow-500 to-amber-600", 
          Gem,
          "Generate Luxury Intel"
        )}

        {/* AI Agents */}
        {renderCategoryButton(
          "AI Agents", 
          "Autonomous AI Agents & Orchestration", 
          "from-cyan-400 via-blue-500 to-indigo-600", 
          Bot,
          "Generate Agent Blueprints"
        )}

        {/* AI Core */}
        {renderCategoryButton(
          "AI Core", 
          "LLMs & Predictive Intelligence", 
          "from-violet-400 via-purple-500 to-fuchsia-600", 
          Brain,
          "Generate AI Core Ops"
        )}

        {/* Vibe Coding */}
        {renderCategoryButton(
          "Vibe Coding", 
          "Natural Language Programming & Cursor Ecosystem", 
          "from-fuchsia-400 via-pink-500 to-rose-600", 
          Terminal,
          "Generate Vibe Tools"
        )}

        {/* Crypto */}
        {renderCategoryButton(
          "Crypto & Web3", 
          "DeFi, NFTs & Web3 Infrastructure", 
          "from-emerald-400 via-teal-500 to-cyan-600", 
          Coins,
          "Generate Web3 Frictions"
        )}

        {/* Deep Tech */}
        {renderCategoryButton(
          "Deep Tech", 
          "Robotics & BioTech", 
          "from-orange-400 via-red-500 to-rose-600", 
          Zap,
          "Generate Deep Tech"
        )}

        {/* Sports & Performance (New Section) */}
        {renderCategoryButton(
          "Sports & Performance", 
          "Sports Science, Wearables & Fan Engagement", 
          "from-lime-400 via-emerald-500 to-teal-600", 
          Activity,
          "Generate Sports Intel"
        )}

        {/* High Performance Training */}
        {renderCategoryButton(
          "Elite Training", 
          "Pro Athlete Biometrics & Data Analysis", 
          "from-blue-600 via-indigo-600 to-violet-700", 
          Dumbbell,
          "Scan Elite Ops"
        )}

        {/* Sports Management */}
        {renderCategoryButton(
          "Sports Management", 
          "Club Operations & Talent Scouting AI", 
          "from-slate-400 via-zinc-500 to-neutral-600", 
          Trophy,
          "Generate Management Intel"
        )}
      </div>
    </div>
  );
};

export default SectorsBar;
