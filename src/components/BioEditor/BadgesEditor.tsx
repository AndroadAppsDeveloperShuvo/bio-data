import React, { useState } from 'react';
import { ProfileBadge } from '../../types';
import { Tag, Plus, Trash2 } from 'lucide-react';

interface BadgesEditorProps {
  badges: ProfileBadge[];
  onChange: (badges: ProfileBadge[]) => void;
}

const BADGE_PRESETS = [
  '🎮 Free Fire Pro',
  '🏆 Esports Player',
  '🎬 YouTuber',
  '⚡ Live Streamer',
  '📸 Content Creator',
  '💻 Developer',
  '🎧 Music Lover',
  '🔥 Trending Creator',
  '📱 TikToker',
  '🇧🇩 Bangladesh',
];

export const BadgesEditor: React.FC<BadgesEditorProps> = ({
  badges,
  onChange
}) => {
  const [newText, setNewText] = useState('');

  const handleAdd = (text: string) => {
    if (!text.trim()) return;
    const newBadge: ProfileBadge = {
      id: 'b_' + Date.now() + Math.random().toString(36).substring(2, 5),
      text: text.trim()
    };
    onChange([...badges, newBadge]);
    setNewText('');
  };

  const handleDelete = (id: string) => {
    onChange(badges.filter(b => b.id !== id));
  };

  return (
    <div className="space-y-4">
      {/* Add Custom Tag */}
      <div className="p-3.5 bg-slate-100 border-2 border-slate-300 rounded-2xl space-y-2.5">
        <label className="block text-xs font-black text-slate-950">
          নতুন ব্যাজ বা ট্যাগ যোগ করুন
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAdd(newText);
              }
            }}
            placeholder="যেমন: 🎮 Gamer / 🚀 Designer"
            className="flex-1 px-3 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-600 placeholder:text-slate-400"
          />
          <button
            type="button"
            onClick={() => handleAdd(newText)}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-black text-xs rounded-xl shadow-md flex items-center gap-1 transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>যোগ করুন</span>
          </button>
        </div>

        {/* Preset Badges */}
        <div className="pt-2">
          <p className="text-xs font-black text-slate-900 mb-1.5">জনপ্রিয় প্রিসেট ট্যাগসমূহ (ক্লিক করুন):</p>
          <div className="flex flex-wrap gap-1.5">
            {BADGE_PRESETS.map((tag, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleAdd(tag)}
                className="text-xs font-bold px-2.5 py-1 bg-white border-2 border-slate-300 hover:border-cyan-600 hover:text-cyan-950 text-slate-900 rounded-xl transition-colors shadow-2xs"
              >
                + {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Badges */}
      <div>
        <label className="block text-xs font-black text-slate-950 mb-2">
          বর্তমান ব্যাজসমূহ ({badges.length}টি):
        </label>
        {badges.length === 0 ? (
          <p className="text-xs text-slate-600 font-semibold italic">কোন ব্যাজ যোগ করা হয়নি।</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {badges.map(b => (
              <span
                key={b.id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-950 text-white text-xs font-black rounded-xl border-2 border-slate-700 shadow-sm"
              >
                <span>{b.text}</span>
                <button
                  type="button"
                  onClick={() => handleDelete(b.id)}
                  className="p-0.5 text-slate-300 hover:text-red-400 transition-colors ml-1"
                  title="মুছুন"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
