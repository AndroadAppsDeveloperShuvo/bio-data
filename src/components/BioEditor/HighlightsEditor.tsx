import React from 'react';
import { HighlightItem } from '../../types';
import { Sparkles, Plus, Trash2, Image, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { extractDirectImageUrl, isImgBBViewerUrl, resolveImageUrl } from '../../utils/imageHelper';

interface HighlightsEditorProps {
  highlights: HighlightItem[];
  onChange: (highlights: HighlightItem[]) => void;
}

const HIGHLIGHT_PRESETS = [
  { title: '🏆 Esports Champion', subtitle: 'Tournament 2025', imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&auto=format&fit=crop&q=80', linkUrl: '' },
  { title: '🎮 Gaming Setup', subtitle: 'PC & Monitor', imageUrl: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=300&auto=format&fit=crop&q=80', linkUrl: '' },
  { title: '🎯 YouTube 100K', subtitle: 'Silver Button', imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=300&auto=format&fit=crop&q=80', linkUrl: '' },
  { title: '🏔️ Travel Sajek', subtitle: 'Vlog Shoot', imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&auto=format&fit=crop&q=80', linkUrl: '' },
];

export const HighlightsEditor: React.FC<HighlightsEditorProps> = ({
  highlights,
  onChange
}) => {
  const handleAdd = (preset?: typeof HIGHLIGHT_PRESETS[0]) => {
    const newItem: HighlightItem = {
      id: 'h_' + Date.now() + Math.random().toString(36).substring(2, 5),
      title: preset ? preset.title : 'নতুন হাইলাইট মোমেন্ট',
      subtitle: preset ? preset.subtitle : 'ফটো ও মেমোরিজ',
      imageUrl: preset ? preset.imageUrl : 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&auto=format&fit=crop&q=80',
      linkUrl: preset?.linkUrl || ''
    };
    onChange([...highlights, newItem]);
  };

  const handleUpdate = (id: string, updates: Partial<HighlightItem>) => {
    onChange(highlights.map(h => h.id === id ? { ...h, ...updates } : h));
  };

  const handleDelete = (id: string) => {
    onChange(highlights.filter(h => h.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-black text-slate-950">হাইলাইটস ও ফটো কার্ড ({highlights.length}টি)</h4>
          <p className="text-xs font-semibold text-slate-800">আপনার সেরা অর্জন, গেমপ্লে বা ট্রাভেল মেমোরির ছোট ছবি কার্ড</p>
        </div>
        <button
          type="button"
          onClick={() => handleAdd()}
          className="px-3.5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-black text-xs rounded-xl shadow-md flex items-center gap-1 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>কার্ড যোগ করুন</span>
        </button>
      </div>

      {/* Preset Buttons */}
      <div className="p-3.5 bg-slate-100 border-2 border-slate-300 rounded-2xl">
        <p className="text-xs font-black text-slate-900 mb-1.5">প্রিসেট হাইলাইট কার্ড যোগ করুন:</p>
        <div className="flex flex-wrap gap-1.5">
          {HIGHLIGHT_PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleAdd(p)}
              className="text-xs font-bold px-2.5 py-1 bg-white border-2 border-slate-300 hover:border-cyan-600 hover:text-cyan-950 text-slate-900 rounded-xl transition-colors shadow-2xs"
            >
              + {p.title}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {highlights.map(h => (
          <div key={h.id} className="p-3.5 bg-white border-2 border-slate-300 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-3 shadow-xs">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <img 
                src={h.imageUrl} 
                alt={h.title} 
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-xl object-cover border-2 border-slate-300 shrink-0" 
              />
              <button
                type="button"
                onClick={() => handleDelete(h.id)}
                className="sm:hidden ml-auto p-2 text-red-600 hover:text-red-800 rounded-xl hover:bg-red-50"
                title="ডিলিট"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 min-w-0 w-full space-y-2">
              <input
                type="text"
                value={h.title}
                onChange={(e) => handleUpdate(h.id, { title: e.target.value })}
                placeholder="কার্ড টাইটেল"
                className="w-full text-xs sm:text-sm font-black text-slate-950 px-2.5 py-1.5 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-600 placeholder:text-slate-400"
              />

              <input
                type="text"
                value={h.imageUrl}
                onChange={async (e) => {
                  const val = e.target.value;
                  const extracted = extractDirectImageUrl(val);
                  handleUpdate(h.id, { imageUrl: extracted });
                  if (isImgBBViewerUrl(extracted)) {
                    const res = await resolveImageUrl(extracted);
                    if (res.success && res.directUrl) {
                      handleUpdate(h.id, { imageUrl: res.directUrl });
                    }
                  }
                }}
                placeholder="ইমেজ URL অথবা ImgBB লিংক"
                className="w-full text-xs font-mono font-bold text-slate-700 px-2.5 py-1.5 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-600"
              />

              {/* Target Click Link */}
              <div className="space-y-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-500">
                    <LinkIcon className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="url"
                    value={h.linkUrl || ''}
                    onChange={(e) => handleUpdate(h.id, { linkUrl: e.target.value })}
                    placeholder="ছবিতে ক্লিক করলে যে লিংকে যাবে (ঐচ্ছিক URL, যেমন: https://...)"
                    className="w-full text-xs font-medium text-slate-950 pl-8 pr-3 py-1.5 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-600 placeholder:text-slate-400"
                  />
                </div>
                {h.linkUrl && h.linkUrl.trim() !== '' ? (
                  <p className="text-[11px] font-bold text-emerald-700 flex items-center gap-1 pl-1">
                    <ExternalLink className="w-3 h-3 text-emerald-600" />
                    <span>ক্লিকযোগ্য লিংক যুক্ত করা হয়েছে (ছবিতে ক্লিক করলে লিংকে নিয়ে যাবে)</span>
                  </p>
                ) : (
                  <p className="text-[11px] font-semibold text-slate-500 pl-1">
                    * লিংক না দিলে ছবিতে ক্লিক করলে কোথাও যাবে না (শুধু ছবি প্রদর্শিত হবে)
                  </p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleDelete(h.id)}
              className="hidden sm:flex p-2 text-red-600 hover:text-red-800 rounded-xl hover:bg-red-50 shrink-0 self-center"
              title="ডিলিট"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
