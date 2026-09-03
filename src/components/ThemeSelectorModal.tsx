import React from 'react';
import { BioTheme } from '../types';
import { BIO_THEMES } from '../data/themes';
import { X, Check, Sparkles, Palette } from 'lucide-react';

interface ThemeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: BioTheme;
  onSelectTheme: (theme: BioTheme) => void;
}

export const ThemeSelectorModal: React.FC<ThemeSelectorModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onSelectTheme
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-pink-500/20 border border-pink-500/40 rounded-xl text-pink-400">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">কালার থিম নির্বাচন করুন</h3>
              <p className="text-xs text-slate-400">আপনার পছন্দমতো বায়ো পেজের ভিজ্যুয়াল স্টাইল সিলেক্ট করুন</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Theme Grid */}
        <div className="p-6 max-h-[70vh] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {BIO_THEMES.map((th) => {
            const isSelected = th.id === currentTheme.id;
            return (
              <button
                key={th.id}
                type="button"
                onClick={() => {
                  onSelectTheme(th);
                  onClose();
                }}
                className={`relative text-left p-4 rounded-2xl border transition-all overflow-hidden group ${
                  isSelected 
                    ? 'border-cyan-400 ring-2 ring-cyan-500/30 bg-slate-800/90' 
                    : 'border-slate-800 hover:border-slate-700 bg-slate-950/60 hover:bg-slate-800/50'
                }`}
              >
                {/* Background swatch snippet */}
                <div className={`h-10 w-full rounded-xl bg-gradient-to-r ${th.bgGradient} border border-white/10 mb-3 flex items-center justify-between px-3`}>
                  <span className="text-[10px] font-mono font-bold uppercase text-white/90">
                    {th.category}
                  </span>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: th.accentColor }}></div>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {th.nameBn}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{th.name}</p>
                  </div>

                  {isSelected && (
                    <span className="p-1 bg-cyan-500 text-slate-950 rounded-full shrink-0 shadow-sm">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors"
          >
            বন্ধ করুন
          </button>
        </div>

      </div>
    </div>
  );
};
