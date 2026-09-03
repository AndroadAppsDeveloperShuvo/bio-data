import React from 'react';
import { PersonalInfo } from '../../types';
import { User, Image, MapPin, CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';

interface PersonalInfoEditorProps {
  personal: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

const AVATAR_PRESETS = [
  { label: 'Gamer 1', url: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&auto=format&fit=crop&q=80' },
  { label: 'Gamer 2', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80' },
  { label: 'Creator', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80' },
  { label: 'Anime/Avatar', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80' },
  { label: 'Esports', url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&auto=format&fit=crop&q=80' },
];

const BANNER_PRESETS = [
  { label: 'Gaming Setup', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1000&auto=format&fit=crop&q=80' },
  { label: 'Cyber City', url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1000&auto=format&fit=crop&q=80' },
  { label: 'Dark Tech', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&auto=format&fit=crop&q=80' },
  { label: 'Nature/Vlog', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&auto=format&fit=crop&q=80' },
];

export const PersonalInfoEditor: React.FC<PersonalInfoEditorProps> = ({
  personal,
  onChange
}) => {
  const handleChange = (field: keyof PersonalInfo, value: any) => {
    onChange({
      ...personal,
      [field]: value
    });
  };

  return (
    <div className="space-y-4 text-slate-950">
      
      {/* Name & Handle */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-black text-slate-950 mb-1.5">
            আপনার নাম / গেমিং নাম *
          </label>
          <input
            type="text"
            value={personal.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="যেমন: SHUVO GAMING / তানভীর হাসান"
            className="w-full px-3 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-600 placeholder:text-slate-400"
          />
        </div>

        <div>
          <label className="block text-xs font-black text-slate-950 mb-1.5">
            ইউজারনেম / হ্যান্ডেল (@handle)
          </label>
          <input
            type="text"
            value={personal.handle}
            onChange={(e) => handleChange('handle', e.target.value)}
            placeholder="যেমন: @shuvo_ff_official"
            className="w-full px-3 py-2 text-xs sm:text-sm font-mono font-bold text-slate-950 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-600 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Professional / Gamer Title */}
      <div>
        <label className="block text-xs font-black text-slate-950 mb-1.5">
          পদবী / ট্যাগলাইন (Title / Headline)
        </label>
        <input
          type="text"
          value={personal.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="যেমন: 🎮 Free Fire Esports Player & Content Creator"
          className="w-full px-3 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-600 placeholder:text-slate-400"
        />
      </div>

      {/* Bio / About text */}
      <div>
        <label className="block text-xs font-black text-slate-950 mb-1.5">
          বায়ো বর্ণনা (Short Bio / Welcome Note)
        </label>
        <textarea
          rows={3}
          value={personal.bio}
          onChange={(e) => handleChange('bio', e.target.value)}
          placeholder="আপনার সম্পর্কে সংক্ষিপ্ত তথ্য লিখুন..."
          className="w-full px-3 py-2 text-xs sm:text-sm font-semibold text-slate-950 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-600 leading-relaxed placeholder:text-slate-400"
        />
      </div>

      {/* Location & Online Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-black text-slate-950 mb-1.5">
            লোকেশন (Location)
          </label>
          <input
            type="text"
            value={personal.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="যেমন: Dhaka, Bangladesh 🇧🇩"
            className="w-full px-3 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-600 placeholder:text-slate-400"
          />
        </div>

        <div>
          <label className="block text-xs font-black text-slate-950 mb-1.5">
            লাইভ স্ট্যাটাস মোড
          </label>
          <select
            value={personal.onlineStatus}
            onChange={(e) => handleChange('onlineStatus', e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-600"
          >
            <option value="gaming">🎮 Playing Game (ফ্রি ফায়ার/গেম মোড)</option>
            <option value="streaming">🔴 Live Stream (লাইভ স্ট্রিমিং)</option>
            <option value="online">🟢 Active / Online (এক্টিভ)</option>
            <option value="offline">⚪ Offline (অফলাইন)</option>
          </select>
        </div>
      </div>

      {/* Custom Status text if gaming/streaming */}
      <div>
        <label className="block text-xs font-black text-slate-950 mb-1.5">
          কাস্টম স্ট্যাটাস ব্যাজ টেক্সট
        </label>
        <input
          type="text"
          value={personal.customStatusText || ''}
          onChange={(e) => handleChange('customStatusText', e.target.value)}
          placeholder="যেমন: Playing Free Fire 🎮 / Live on YouTube 🔴"
          className="w-full px-3 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-600 placeholder:text-slate-400"
        />
      </div>

      {/* Profile Photo / Avatar URL */}
      <div className="p-3.5 bg-slate-100 border-2 border-slate-300 rounded-2xl space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-black text-slate-950 flex items-center gap-1.5">
            <User className="w-4 h-4 text-cyan-700" />
            <span>প্রোফাইল ছবি / অবতার (Avatar Image URL)</span>
          </label>
          <label className="flex items-center gap-1.5 text-xs text-slate-950 cursor-pointer font-bold bg-white px-2 py-1 rounded-lg border border-slate-300">
            <input
              type="checkbox"
              checked={personal.verifiedBadge}
              onChange={(e) => handleChange('verifiedBadge', e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
            />
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-blue-600" /> ব্লু ভেরিফাইড ব্যাজ
            </span>
          </label>
        </div>

        <input
          type="text"
          value={personal.avatarUrl}
          onChange={(e) => handleChange('avatarUrl', e.target.value)}
          placeholder="https://images.unsplash.com/..."
          className="w-full px-3 py-2 text-xs font-mono font-bold text-slate-950 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-600"
        />

        {/* Avatar Preset Buttons */}
        <div className="flex items-center gap-2 pt-1 overflow-x-auto">
          <span className="text-xs text-slate-900 shrink-0 font-bold">প্রিসেট ছবি:</span>
          {AVATAR_PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleChange('avatarUrl', p.url)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold bg-white border-2 border-slate-300 hover:border-cyan-600 hover:text-cyan-900 text-slate-900 rounded-xl shrink-0 transition-colors shadow-2xs"
            >
              <img src={p.url} alt={p.label} className="w-4 h-4 rounded-full object-cover border border-slate-400" />
              <span>{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Banner Cover URL */}
      <div className="p-3.5 bg-slate-100 border-2 border-slate-300 rounded-2xl space-y-2.5">
        <label className="text-xs font-black text-slate-950 flex items-center gap-1.5">
          <Image className="w-4 h-4 text-indigo-700" />
          <span>কভার ব্যানার ইমেজ (Cover Banner Image URL)</span>
        </label>
        
        <input
          type="text"
          value={personal.bannerUrl}
          onChange={(e) => handleChange('bannerUrl', e.target.value)}
          placeholder="https://images.unsplash.com/..."
          className="w-full px-3 py-2 text-xs font-mono font-bold text-slate-950 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-600"
        />

        <div className="flex items-center gap-2 pt-1 overflow-x-auto">
          <span className="text-xs text-slate-900 shrink-0 font-bold">কভার প্রিসেট:</span>
          {BANNER_PRESETS.map((b, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleChange('bannerUrl', b.url)}
              className="px-2.5 py-1 text-xs font-bold bg-white border-2 border-slate-300 hover:border-indigo-600 hover:text-indigo-900 text-slate-900 rounded-xl shrink-0 transition-colors shadow-2xs"
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
