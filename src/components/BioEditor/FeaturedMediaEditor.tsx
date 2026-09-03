import React from 'react';
import { FeaturedMedia } from '../../types';
import { Youtube, PlaySquare } from 'lucide-react';
import { extractYouTubeId } from '../../utils/htmlGenerator';

interface FeaturedMediaEditorProps {
  featuredMedia: FeaturedMedia;
  onChange: (media: FeaturedMedia) => void;
}

export const FeaturedMediaEditor: React.FC<FeaturedMediaEditorProps> = ({
  featuredMedia,
  onChange
}) => {
  const handleChange = (field: keyof FeaturedMedia, value: any) => {
    const updated = {
      ...featuredMedia,
      [field]: value
    };
    if (field === 'url') {
      const extracted = extractYouTubeId(value);
      if (extracted) {
        updated.embedId = extracted;
      }
    }
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {/* Toggle */}
      <div className="p-3.5 bg-gradient-to-r from-red-100 to-pink-100 border-2 border-red-300 rounded-2xl flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-red-600 text-white rounded-xl shadow-xs">
            <Youtube className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-950">ফিচার্ড ইউটিউব ভিডিও প্লেয়ার</h4>
            <p className="text-xs font-semibold text-slate-800">আপনার সেরা গেমপ্লে বা ভ্লগ ভিডিও বায়ো পেজে সরাসরি প্লে করুন</p>
          </div>
        </div>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={featuredMedia.enabled}
            onChange={(e) => handleChange('enabled', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
        </label>
      </div>

      {featuredMedia.enabled && (
        <div className="p-4 bg-white border-2 border-slate-300 rounded-2xl space-y-3.5 shadow-sm">
          <div>
            <label className="block text-xs font-black text-slate-950 mb-1.5">
              ইউটিউব ভিডিও URL বা লিংক *
            </label>
            <input
              type="text"
              value={featuredMedia.url}
              onChange={(e) => handleChange('url', e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-3 py-2 text-xs sm:text-sm font-mono font-bold text-slate-950 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-600 placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-950 mb-1.5">
              ভিডিওর শিরোনাম (Title)
            </label>
            <input
              type="text"
              value={featuredMedia.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="যেমন: 🔥 My Best Free Fire Gameplay 2026"
              className="w-full px-3 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-600 placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-950 mb-1.5">
              সংক্ষিপ্ত বিবরণ (Description)
            </label>
            <input
              type="text"
              value={featuredMedia.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="যেমন: ভিডিওটি ভালো লাগলে লাইক ও সাবস্ক্রাইব করুন!"
              className="w-full px-3 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-600 placeholder:text-slate-400"
            />
          </div>
        </div>
      )}
    </div>
  );
};
