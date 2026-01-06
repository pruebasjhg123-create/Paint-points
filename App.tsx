
import React, { useState, useEffect, useCallback } from 'react';
import { PainPoint } from './types';
import { fetchRandomOpportunities } from './services/supabaseService';
import { generatePainPoints } from './services/geminiService';
import { INITIAL_PAIN_POINTS } from './constants';
import PainPointCard from './components/PainPointCard';
import SideDrawer from './components/SideDrawer';
import ScannerEffect from './components/ScannerEffect';
import SectorsBar from './components/SectorsBar';
import { Sparkles, Zap, Search, Info, AlertCircle, Bookmark, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [painPoints, setPainPoints] = useState<PainPoint[]>([]);
  const [favorites, setFavorites] = useState<PainPoint[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<PainPoint | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeSector, setActiveSector] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [engine, setEngine] = useState<'Supabase' | 'Gemini AI' | 'Local Engine'>('Supabase');

  /**
   * Función núcleo de generación/obtención de datos
   */
  const handleGenerate = useCallback(async (sector?: string) => {
    setIsScanning(true);
    setError(null);
    setActiveSector(sector || null);
    
    try {
      let newPoints: PainPoint[] = [];
      
      // PASO 1: Intentar obtener de Supabase
      try {
        newPoints = await fetchRandomOpportunities(sector);
        if (newPoints && newPoints.length > 0) {
          setEngine('Supabase');
        } else {
          // Si no hay datos (o el servicio falló silenciosamente), saltamos a IA
          throw new Error("Supabase returned no results, fallback to AI.");
        }
      } catch (dbErr: any) {
        console.warn("Database fallback activated:", dbErr?.message || "DB Connection error");
        
        // PASO 2: Intentar generar con Gemini AI
        try {
          newPoints = await generatePainPoints(sector);
          setEngine('Gemini AI');
        } catch (aiErr: any) {
          console.error("AI Generation failed, using local emergency dataset:", aiErr?.message);
          // PASO 3: Datos locales de emergencia si todo lo demás falla
          newPoints = INITIAL_PAIN_POINTS.slice(0, 5);
          setEngine('Local Engine');
        }
      }

      // Simulación de escaneo para feeling "SaaS Premium"
      await new Promise(resolve => setTimeout(resolve, 1200));
      setPainPoints(newPoints);
    } catch (err: any) {
      console.error("Critical error in generation cycle:", err);
      setError(`Intelligence scan failed. Re-connecting to servers...`);
    } finally {
      setIsScanning(false);
    }
  }, []);

  // Carga inicial al arrancar la app
  useEffect(() => {
    const saved = localStorage.getItem('painpoint_favorites');
    if (saved) {
      try { setFavorites(JSON.parse(saved)); } catch (e) {}
    }
    handleGenerate();
  }, [handleGenerate]);

  // Sincronizar favoritos con persistencia local
  useEffect(() => {
    localStorage.setItem('painpoint_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (e: React.MouseEvent, point: PainPoint) => {
    e.stopPropagation();
    setFavorites(prev => {
      const exists = prev.find(p => p.id === point.id);
      return exists ? prev.filter(p => p.id !== point.id) : [...prev, point];
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30 font-inter">
      {/* Navigation */}
      <nav className="fixed top-0 z-40 w-full border-b border-[#1A1A1A] bg-[#050505]/80 px-6 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.location.reload()}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
              <Zap size={16} fill="white" />
            </div>
            <span className="font-bold tracking-tight text-lg">PainPoint Scout</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <button 
              onClick={() => setShowFavorites(false)} 
              className={`hover:text-white transition-colors flex items-center gap-2 ${!showFavorites ? 'text-white' : ''}`}
            >
              Explorer
            </button>
            <button 
              onClick={() => setShowFavorites(true)} 
              className={`flex items-center gap-2 hover:text-white transition-colors ${showFavorites ? 'text-white' : ''}`}
            >
              Saved {favorites.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-indigo-500 text-[10px] text-white animate-pulse">
                  {favorites.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-6 pt-32 pb-20">
        {!showFavorites ? (
          <>
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 text-cen20 text-center px-4"
            >
                {/* Badge superior más refinado */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-indigo-300 text-[11px] font-semibold uppercase tracking-[0.2em] mb-8">
                      <Sparkles size={14} className="animate-pulse" /> Inteligencia en vivo
                    </div>

                {/* Título Masivo y Profesional */}
              <h1 className="mb-6 text-5xl md:className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter bg-gradient-to-b from-white via-white to-zinc-600 bg-clip-text text-transparent">               SaaS Opportunity <br /> 
                <span className="bg-gradient-to-r from-indigo-400 via-violet-400     ¿Qué quieres <br/>construir hoy?
              
              <p classN
                  
                    {/* Subtítulo con mejor lectura */}ame="mx-auto className="mx-auto max-w-2xl text-zinc-400 text-lg md:text-xl font-medium leading-relaxed mb-12">
    Detectando micro-oportunidades de ejecución rápida y alta rentabilidad.              </p>

              <div className="flex flex-col items-center gap-10">
                <button 
                  onClick={() => handleGenerate()}
                  disabled={isScanning}
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-[2px] font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 animate-[gradient_3s_linear_infinite]" />
                  <span className="relative flex items-center gap-3 rounded-full bg-[#050505] px-10 py-5 text-white transition-all group-hover:bg-transparent">
                    {isScanning ? <RefreshCw className="animate-spin" size={20} /> : <Search size={20} />}
                    {isScanning ? 'Syncing Database...' : 'Deep Scan for Opportunities'}
                  </span>
                </button>
                <SectorsBar onSelectSector={handleGenerate} activeSector={activeSector} />
              </div>
            </motion.div>

            {error && (
              <div className="mb-10 rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-center animate-in fade-in zoom-in duration-300">
                <div className="flex justify-center mb-2"><AlertCircle className="text-red-500" /></div>
                <p className="text-sm text-red-400 font-medium">{error}</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
              <AnimatePresence mode='popLayout'>
                {!isScanning && painPoints.map((point, index) => (
                  <PainPointCard 
                    key={point.id} 
                    data={point} 
                    index={index}
                    isFavorite={favorites.some(f => f.id === point.id)}
                    onFavoriteToggle={toggleFavorite}
                    onClick={setSelectedPoint}
                  />
                ))}
              </AnimatePresence>
            </div>

            {painPoints.length === 0 && !isScanning && !error && (
              <div className="mt-20 text-center py-20 border border-dashed border-[#1A1A1A] rounded-3xl">
                <Info className="mx-auto mb-4 text-zinc-700" size={40} />
                <p className="text-zinc-500">No signals detected. Click "Deep Scan" to query the database.</p>
              </div>
            )}
          </>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Saved Intelligence</h2>
              <button 
                onClick={() => setShowFavorites(false)}
                className="text-xs font-bold uppercase tracking-widest text-indigo-400 hover:text-indigo-300"
              >
                Back to Explorer
              </button>
            </div>
            
            {favorites.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((point, index) => (
                  <PainPointCard 
                    key={point.id} 
                    data={point} 
                    index={index}
                    isFavorite={true}
                    onFavoriteToggle={toggleFavorite}
                    onClick={setSelectedPoint}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border border-dashed border-[#1A1A1A] rounded-3xl">
                <Bookmark className="mx-auto mb-4 text-zinc-700 opacity-20" size={40} />
                <p className="text-zinc-500">You haven't saved any opportunities yet.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Source Indicator */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-[#1A1A1A] bg-[#0A0A0A]/90 px-4 py-2 backdrop-blur-md shadow-lg border-l-4 border-l-indigo-500">
        <div className={`h-2 w-2 rounded-full ${engine === 'Supabase' ? 'bg-emerald-500 animate-pulse' : engine === 'Gemini AI' ? 'bg-indigo-500' : 'bg-zinc-500'}`} />
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
          Intel: <span className="text-white">{engine}</span>
        </span>
      </div>

      <SideDrawer data={selectedPoint} onClose={() => setSelectedPoint(null)} />
      {isScanning && <ScannerEffect />}

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default App;
