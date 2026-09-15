import React from 'react';
import { BioTheme } from '../types';
import { 
  Sparkles, 
  Palette, 
  Download, 
  Upload,
  RotateCcw, 
  Share2, 
  Layers, 
  Flame, 
  Video, 
  Code2
} from 'lucide-react';

interface HeaderNavbarProps {
  currentTheme: BioTheme;
  onOpenThemeModal: () => void;
  onOpenExportModal: () => void;
  onOpenImportModal: () => void;
  onSelectPreset: (type: 'gamer' | 'creator' | 'developer') => void;
  onReset: () => void;
  socialCount: number;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  currentTheme,
  onOpenThemeModal,
  onOpenExportModal,
  onOpenImportModal,
  onSelectPreset,
  onReset,
  socialCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 border-b border-slate-800 backdrop-blur-md px-4 lg:px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-pink-500 p-0.5 shadow-lg shadow-cyan-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                Social Bio Maker
              </h1>
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                PRO HTML
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              ফেসবুক, ইউটিউব ও গেমিং প্রোফাইল বায়ো পেজ মেকার
            </p>
          </div>
        </div>

        {/* Presets & Actions */}
        <div className="flex items-center flex-wrap gap-2">
          
          {/* Preset Buttons Dropdown/Row */}
          <div className="flex items-center bg-slate-950/80 p-1 rounded-2xl border border-slate-800">
            <button
              type="button"
              onClick={() => onSelectPreset('gamer')}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-orange-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
              title="Free Fire / Gamer Pro Profile Preset"
            >
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden md:inline">গেমার</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectPreset('creator')}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-red-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
              title="YouTuber / Vlogger Preset"
            >
              <Video className="w-3.5 h-3.5 text-red-400" />
              <span className="hidden md:inline">ইউটিউবার</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectPreset('developer')}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-cyan-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
              title="Developer Preset"
            >
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">টেক</span>
            </button>
          </div>

          {/* Theme Button */}
          <button
            type="button"
            onClick={onOpenThemeModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold rounded-xl transition-all shadow-xs"
          >
            <Palette className="w-4 h-4 text-pink-400" />
            <span className="hidden sm:inline">থিম:</span>
            <span className="text-cyan-300">{currentTheme.nameBn}</span>
          </button>

          {/* Reset Button */}
          <button
            type="button"
            onClick={onReset}
            className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-xl transition-colors"
            title="রিসেট করুন"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* HTML Upload & Re-edit Button */}
          <button
            type="button"
            onClick={onOpenImportModal}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 hover:border-cyan-500/60 text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs active:scale-95 cursor-pointer"
            title="পূর্বে তৈরি করা HTML ফাইল আপলোড করে এডিট করুন"
          >
            <Upload className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">HTML</span>
            <span>আপলোড</span>
          </button>

          {/* Primary HTML Download Button */}
          <button
            type="button"
            onClick={onOpenExportModal}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-cyan-500/25 transition-all active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>HTML ডাউনলোড</span>
          </button>

        </div>

      </div>
    </header>
  );
};
