import React, { useState, useEffect } from 'react';
import { SocialBioState, BioTheme } from './types';
import { 
  DEFAULT_SHUVO_PRESET,
  GAMER_FREEFIRE_PRESET, 
  CREATOR_VLOGGER_PRESET, 
  DEVELOPER_TECH_PRESET 
} from './data/presets';
import { BIO_THEMES } from './data/themes';
import { HeaderNavbar } from './components/HeaderNavbar';
import { BioFormContainer } from './components/BioEditor/BioFormContainer';
import { BioPreview } from './components/BioPreview/BioPreview';
import { ThemeSelectorModal } from './components/ThemeSelectorModal';
import { HtmlExportModal } from './components/HtmlExportModal';
import { 
  Sparkles, 
  Eye, 
  Edit3, 
  Smartphone, 
  Download, 
  Share2, 
  Flame,
  CheckCircle
} from 'lucide-react';

const STORAGE_KEY = 'social_bio_maker_state_v3';
const THEME_STORAGE_KEY = 'social_bio_maker_theme_v3';

export function App() {
  const [bioState, setBioState] = useState<SocialBioState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.personal?.name && !parsed.personal.name.includes('Tanvir')) {
          return parsed;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_SHUVO_PRESET;
  });

  const [currentTheme, setCurrentTheme] = useState<BioTheme>(() => {
    try {
      const savedThemeId = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedThemeId) {
        const found = BIO_THEMES.find(t => t.id === savedThemeId);
        if (found) return found;
      }
    } catch (e) {
      console.error(e);
    }
    return BIO_THEMES[3] || BIO_THEMES[0]; // Modern Bento Dark
  });

  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [mobileActiveView, setMobileActiveView] = useState<'editor' | 'preview'>('editor');

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bioState));
    } catch (e) {
      console.error(e);
    }
  }, [bioState]);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, currentTheme.id);
    } catch (e) {
      console.error(e);
    }
  }, [currentTheme]);

  const handleSelectPreset = (type: 'gamer' | 'creator' | 'developer') => {
    if (type === 'gamer') {
      setBioState(GAMER_FREEFIRE_PRESET);
      const gamerTheme = BIO_THEMES.find(t => t.id === 'cyber-gamer') || BIO_THEMES[0];
      setCurrentTheme(gamerTheme);
    } else if (type === 'creator') {
      setBioState(CREATOR_VLOGGER_PRESET);
      const creatorTheme = BIO_THEMES.find(t => t.id === 'sunset-vibe') || BIO_THEMES[4];
      setCurrentTheme(creatorTheme);
    } else if (type === 'developer') {
      setBioState(DEVELOPER_TECH_PRESET);
      const techTheme = BIO_THEMES.find(t => t.id === 'bento-dark') || BIO_THEMES[3];
      setCurrentTheme(techTheme);
    }
  };

  const handleReset = () => {
    if (window.confirm('আপনি কি নিশ্চিত যে সকল ডাটা রিসেট করে ডিফল্ট শুভ (SHUVO) প্রিসেটে ফিরে যেতে চান?')) {
      setBioState(DEFAULT_SHUVO_PRESET);
      setCurrentTheme(BIO_THEMES[3] || BIO_THEMES[0]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* Top Navbar */}
      <HeaderNavbar
        currentTheme={currentTheme}
        onOpenThemeModal={() => setIsThemeModalOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onSelectPreset={handleSelectPreset}
        onReset={handleReset}
        socialCount={bioState.socialLinks.filter(s => s.enabled).length}
      />

      {/* Mobile View Toggle Buttons (visible on small screens) */}
      <div className="lg:hidden px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setMobileActiveView('editor')}
          className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-xl transition-all ${
            mobileActiveView === 'editor'
              ? 'bg-cyan-500 text-slate-950 shadow-sm'
              : 'bg-slate-800 text-slate-300'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>কাস্টমাইজ ও এডিটর</span>
        </button>

        <button
          type="button"
          onClick={() => setMobileActiveView('preview')}
          className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-xl transition-all ${
            mobileActiveView === 'preview'
              ? 'bg-cyan-500 text-slate-950 shadow-sm'
              : 'bg-slate-800 text-slate-300'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>লাইভ প্রিভিউ</span>
        </button>
      </div>

      {/* Main Workspace Layout (2 Columns on Desktop) */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
        
        {/* Left Column: Form Editor */}
        <div className={`lg:col-span-6 xl:col-span-5 h-[calc(100vh-140px)] min-h-[580px] ${
          mobileActiveView === 'editor' ? 'block' : 'hidden lg:block'
        }`}>
          <BioFormContainer
            state={bioState}
            onChange={setBioState}
          />
        </div>

        {/* Right Column: Live Interactive Bio Preview */}
        <div className={`lg:col-span-6 xl:col-span-7 h-[calc(100vh-140px)] min-h-[580px] ${
          mobileActiveView === 'preview' ? 'block' : 'hidden lg:block'
        }`}>
          <BioPreview
            state={bioState}
            theme={currentTheme}
            onOpenThemeModal={() => setIsThemeModalOpen(true)}
            onOpenExportModal={() => setIsExportModalOpen(true)}
          />
        </div>

      </main>

      {/* Modals */}
      <ThemeSelectorModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        currentTheme={currentTheme}
        onSelectTheme={setCurrentTheme}
      />

      <HtmlExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        state={bioState}
        theme={currentTheme}
      />

    </div>
  );
}

export default App;
