
import React from 'react';

const ScannerEffect: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[60] pointer-events-none flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-indigo-500/5 animate-pulse" />
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent absolute top-0 animate-[scan_2s_linear_infinite]" />
      <div className="flex flex-col items-center gap-4">
        <div className="w-64 h-2 bg-zinc-900 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-500 animate-[progress_1.5s_ease-in-out_infinite]" />
        </div>
        <p className="text-indigo-400 font-mono text-xs uppercase tracking-widest animate-pulse">
          Scanning Professional Markets...
        </p>
      </div>
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
        @keyframes progress {
          0% { width: 0%; margin-left: 0; }
          50% { width: 100%; margin-left: 0; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  );
};

export default ScannerEffect;
