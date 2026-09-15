import React, { useState } from 'react';
import { SocialBioState } from '../../types';
import { PersonalInfoEditor } from './PersonalInfoEditor';
import { SocialLinksEditor } from './SocialLinksEditor';
import { GamingStatsEditor } from './GamingStatsEditor';
import { FeaturedMediaEditor } from './FeaturedMediaEditor';
import { BadgesEditor } from './BadgesEditor';
import { DirectContactEditor } from './DirectContactEditor';
import { HighlightsEditor } from './HighlightsEditor';
import { ShareSettingsEditor } from './ShareSettingsEditor';
import { 
  User, 
  Share2, 
  Flame, 
  Youtube, 
  Tag, 
  MessageSquare, 
  Image as ImageIcon,
  Sparkles,
  Send,
  Upload,
  FileCode
} from 'lucide-react';

interface BioFormContainerProps {
  state: SocialBioState;
  onChange: (newState: SocialBioState) => void;
  onOpenImportModal?: () => void;
}

type TabType = 'personal' | 'socials' | 'share' | 'gaming' | 'media' | 'badges' | 'contact' | 'highlights';

export const BioFormContainer: React.FC<BioFormContainerProps> = ({
  state,
  onChange,
  onOpenImportModal
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('personal');

  const tabs: { id: TabType; label: string; icon: React.ReactNode; badgeCount?: number }[] = [
    { id: 'personal', label: 'ব্যক্তিগত তথ্য', icon: <User className="w-4 h-4" /> },
    { id: 'socials', label: 'সোশ্যাল লিংক', icon: <Share2 className="w-4 h-4" />, badgeCount: state.socialLinks.filter(s => s.enabled).length },
    { id: 'share', label: 'শেয়ার বক্স ও লিংক', icon: <Send className="w-4 h-4" />, badgeCount: state.shareSettings?.enabled !== false ? 1 : undefined },
    { id: 'gaming', label: 'গেমিং প্রোফাইল (FF/PUBG)', icon: <Flame className="w-4 h-4" />, badgeCount: state.gamingStats.enabled ? 1 : undefined },
    { id: 'media', label: 'ইউটিউব ভিডিও', icon: <Youtube className="w-4 h-4" /> },
    { id: 'badges', label: 'ট্যাগ ও ব্যাজ', icon: <Tag className="w-4 h-4" />, badgeCount: state.badges.length },
    { id: 'contact', label: 'কনট্যাক্ট (WhatsApp)', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'highlights', label: 'হাইলাইটস ও ফটো', icon: <ImageIcon className="w-4 h-4" />, badgeCount: state.highlights.length },
  ];

  return (
    <div className="bg-white border-2 border-slate-300 rounded-3xl overflow-hidden shadow-lg flex flex-col h-full">
      
      {/* Upload Existing HTML Prompt Banner */}
      {onOpenImportModal && (
        <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-1 bg-cyan-500/20 text-cyan-400 rounded-md shrink-0">
              <FileCode className="w-3.5 h-3.5" />
            </div>
            <p className="text-slate-200 font-medium truncate text-xs">
              পূর্বে ডাউনলোড করা <span className="text-cyan-400 font-mono font-bold">.html</span> ফাইল এডিট করতে চান?
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenImportModal}
            className="px-2.5 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-[11px] rounded-lg transition-all flex items-center gap-1 shrink-0 cursor-pointer shadow-xs active:scale-95"
            title="HTML ফাইল আপলোড করে এডিটরে রিস্টোর করুন"
          >
            <Upload className="w-3 h-3 stroke-[2.5]" />
            <span>HTML আপলোড</span>
          </button>
        </div>
      )}

      {/* Tab Navigation Ribbon */}
      <div className="px-3 pt-3 pb-2 bg-slate-100 border-b-2 border-slate-300 overflow-x-auto flex gap-2 scrollbar-none shrink-0">
        {tabs.map((t) => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-black rounded-xl whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-cyan-600 text-white shadow-md border-2 border-cyan-700'
                  : 'bg-white text-slate-800 hover:text-slate-950 hover:bg-slate-200/90 border border-slate-300 font-bold'
              }`}
            >
              {t.icon}
              <span>{t.label}</span>
              {t.badgeCount !== undefined && (
                <span className={`text-[10.5px] px-1.5 py-0.2 rounded-full font-black ${
                  isActive ? 'bg-white text-cyan-900' : 'bg-slate-200 text-slate-900 border border-slate-300'
                }`}>
                  {t.badgeCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Form Content */}
      <div className="p-4 sm:p-5 overflow-y-auto flex-1 bg-white">
        {activeTab === 'personal' && (
          <PersonalInfoEditor
            personal={state.personal}
            onChange={(personal) => onChange({ ...state, personal })}
          />
        )}

        {activeTab === 'socials' && (
          <SocialLinksEditor
            socialLinks={state.socialLinks}
            onChange={(socialLinks) => onChange({ ...state, socialLinks })}
          />
        )}

        {activeTab === 'share' && (
          <ShareSettingsEditor
            settings={state.shareSettings}
            onChange={(shareSettings) => onChange({ 
              ...state, 
              shareSettings,
              showQrCode: shareSettings.enabled 
            })}
          />
        )}

        {activeTab === 'gaming' && (
          <GamingStatsEditor
            gamingStats={state.gamingStats}
            onChange={(gamingStats) => onChange({ ...state, gamingStats })}
          />
        )}

        {activeTab === 'media' && (
          <FeaturedMediaEditor
            featuredMedia={state.featuredMedia}
            onChange={(featuredMedia) => onChange({ ...state, featuredMedia })}
          />
        )}

        {activeTab === 'badges' && (
          <BadgesEditor
            badges={state.badges}
            onChange={(badges) => onChange({ ...state, badges })}
          />
        )}

        {activeTab === 'contact' && (
          <DirectContactEditor
            contact={state.contact}
            onChange={(contact) => onChange({ ...state, contact })}
          />
        )}

        {activeTab === 'highlights' && (
          <HighlightsEditor
            highlights={state.highlights}
            onChange={(highlights) => onChange({ ...state, highlights })}
          />
        )}
      </div>

    </div>
  );
};
