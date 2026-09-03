import React, { useState } from 'react';
import { SocialBioState, BioTheme } from '../../types';
import { SocialBioCard } from './SocialBioCard';
import { 
  Download, 
  Smartphone, 
  Monitor, 
  Palette, 
  Code, 
  Share2, 
  ZoomIn, 
  ZoomOut, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { generateStandaloneBioHtml } from '../../utils/htmlGenerator';

interface BioPreviewProps {
  state: SocialBioState;
  theme: BioTheme;
  onOpenThemeModal: () => void;
  onOpenExportModal: () => void;
}

export const BioPreview: React.FC<BioPreviewProps> = ({
  state,
  theme,
  onOpenThemeModal,
  onOpenExportModal
}) => {
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'desktop'>('mobile');
  const [zoom, setZoom] = useState<number>(100);

  const handleDownloadDirectHtml = () => {
    const htmlContent = generateStandaloneBioHtml(state, theme);
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const cleanName = (state.personal.name || 'social_bio').toLowerCase().replace(/[^a-z0-9]/g, '_');
    link.download = `${cleanName}_bio_profile.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleOpenLiveHtmlTab = () => {
    const htmlContent = generateStandaloneBioHtml(state, theme);
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
      
      {/* Top Preview Toolbar */}
      <div className="px-4 py-3 bg-slate-950/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
        
        {/* Device Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setDeviceMode('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              deviceMode === 'mobile' 
                ? 'bg-cyan-500 text-slate-950 shadow-sm' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>মোবাইল ভিউ</span>
          </button>

          <button
            type="button"
            onClick={() => setDeviceMode('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              deviceMode === 'desktop' 
                ? 'bg-cyan-500 text-slate-950 shadow-sm' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>ফুল ভিউ</span>
          </button>
        </div>

        {/* Theme & Zoom & Action Buttons */}
        <div className="flex items-center gap-2">
          
          {/* Theme Selector Button */}
          <button
            type="button"
            onClick={onOpenThemeModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl transition-all shadow-xs"
          >
            <Palette className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden sm:inline">থিম:</span>
            <span className="text-cyan-300 font-bold">{theme.nameBn}</span>
          </button>

          {/* Open in New Tab */}
          <button
            type="button"
            onClick={handleOpenLiveHtmlTab}
            className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-xl transition-colors"
            title="নতুন ট্যাবে ওপেন করুন"
          >
            <ExternalLink className="w-4 h-4" />
          </button>

          {/* HTML Export Button */}
          <button
            type="button"
            onClick={handleDownloadDirectHtml}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>HTML ডাউনলোড</span>
          </button>
        </div>

      </div>

      {/* Preview Canvas */}
      <div className={`flex-1 overflow-y-auto p-4 sm:p-6 flex items-center justify-center bg-gradient-to-br ${theme.bgGradient} transition-colors duration-500`}>
        
        {deviceMode === 'mobile' ? (
          /* iPhone-style phone frame */
          <div className="relative w-full max-w-[420px] rounded-[42px] p-3 bg-slate-950 border-[6px] border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            
            {/* Phone Speaker & Dynamic Island Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-20 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-800 mr-2"></div>
              <div className="w-8 h-1 rounded-full bg-slate-900"></div>
            </div>

            {/* Inner Phone Screen */}
            <div className="w-full bg-slate-950 rounded-[34px] overflow-hidden pt-2 border border-slate-900">
              <SocialBioCard state={state} theme={theme} onOpenExport={onOpenExportModal} />
            </div>

            {/* Phone Home Bar */}
            <div className="w-28 h-1 bg-slate-700 rounded-full mx-auto mt-2"></div>
          </div>
        ) : (
          /* Wide Desktop Card Preview */
          <div className="w-full max-w-2xl">
            <SocialBioCard state={state} theme={theme} onOpenExport={onOpenExportModal} />
          </div>
        )}

      </div>

      {/* Bottom Hint Banner */}
      <div className="px-4 py-2 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>HTML ডাউনলোড করলে ফাইলটি যেকোনো ব্রাউজারে অফলাইনেও সরাসরি কাজ করবে!</span>
        </div>
        <button
          type="button"
          onClick={onOpenExportModal}
          className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
        >
          <Code className="w-3 h-3" /> কোড দেখুন
        </button>
      </div>

    </div>
  );
};
