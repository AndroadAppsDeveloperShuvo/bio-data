import React, { useState } from 'react';
import { SocialBioState } from '../../types';
import { PersonalInfoEditor } from './PersonalInfoEditor';
import { SocialLinksEditor } from './SocialLinksEditor';
import { GamingStatsEditor } from './GamingStatsEditor';
import { FeaturedMediaEditor } from './FeaturedMediaEditor';
import { BadgesEditor } from './BadgesEditor';
import { DirectContactEditor } from './DirectContactEditor';
import { HighlightsEditor } from './HighlightsEditor';
import { 
  User, 
  Share2, 
  Flame, 
  Youtube, 
  Tag, 
  MessageSquare, 
  Image as ImageIcon,
  Sparkles
} from 'lucide-react';

interface BioFormContainerProps {
  state: SocialBioState;
  onChange: (newState: SocialBioState) => void;
}

type TabType = 'personal' | 'socials' | 'gaming' | 'media' | 'badges' | 'contact' | 'highlights';

export const BioFormContainer: React.FC<BioFormContainerProps> = ({
  state,
  onChange
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('personal');

  const tabs: { id: TabType; label: string; icon: React.ReactNode; badgeCount?: number }[] = [
    { id: 'personal', label: 'ব্যক্তিগত তথ্য', icon: <User className="w-4 h-4" /> },
    { id: 'socials', label: 'সোশ্যাল লিংক', icon: <Share2 className="w-4 h-4" />, badgeCount: state.socialLinks.filter(s => s.enabled).length },
    { id: 'gaming', label: 'গেমিং প্রোফাইল (FF/PUBG)', icon: <Flame className="w-4 h-4" />, badgeCount: state.gamingStats.enabled ? 1 : undefined },
    { id: 'media', label: 'ইউটিউব ভিডিও', icon: <Youtube className="w-4 h-4" /> },
    { id: 'badges', label: 'ট্যাগ ও ব্যাজ', icon: <Tag className="w-4 h-4" />, badgeCount: state.badges.length },
    { id: 'contact', label: 'কনট্যাক্ট (WhatsApp)', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'highlights', label: 'হাইলাইটস ও ফটো', icon: <ImageIcon className="w-4 h-4" />, badgeCount: state.highlights.length },
  ];

  return (
    <div className="bg-white border-2 border-slate-300 rounded-3xl overflow-hidden shadow-lg flex flex-col h-full">
      
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
