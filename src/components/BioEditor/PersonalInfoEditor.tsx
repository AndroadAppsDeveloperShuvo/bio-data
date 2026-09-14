import React, { useState } from 'react';
import { PersonalInfo } from '../../types';
import { 
  User, 
  Image, 
  ShieldCheck, 
  ExternalLink, 
  Loader2, 
  CheckCircle2, 
  Sparkles,
  Upload,
  AlertCircle
} from 'lucide-react';
import { 
  extractDirectImageUrl, 
  isImgBBViewerUrl, 
  resolveImageUrl 
} from '../../utils/imageHelper';

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
  const [avatarResolving, setAvatarResolving] = useState(false);
  const [avatarStatus, setAvatarStatus] = useState<{ type: 'success' | 'info' | 'error'; text: string } | null>(null);
  const [avatarLoadError, setAvatarLoadError] = useState(false);

  const [bannerResolving, setBannerResolving] = useState(false);
  const [bannerStatus, setBannerStatus] = useState<{ type: 'success' | 'info' | 'error'; text: string } | null>(null);
  const [bannerLoadError, setBannerLoadError] = useState(false);

  const handleChange = (field: keyof PersonalInfo, value: any) => {
    onChange({
      ...personal,
      [field]: value
    });
  };

  // Smart handler for Avatar input
  const handleAvatarChange = async (rawVal: string) => {
    setAvatarLoadError(false);
    const extracted = extractDirectImageUrl(rawVal);
    
    // If it's already an embed code or direct link, set immediately
    handleChange('avatarUrl', extracted);

    // If it's an ImgBB viewer link (e.g. https://ibb.co/xyz)
    if (isImgBBViewerUrl(extracted)) {
      setAvatarResolving(true);
      setAvatarStatus({ type: 'info', text: 'ImgBB লিংক থেকে সরাসরি ছবি বের করা হচ্ছে...' });
      
      const result = await resolveImageUrl(extracted);
      setAvatarResolving(false);
      
      if (result.success && result.directUrl) {
        handleChange('avatarUrl', result.directUrl);
        setAvatarStatus({ 
          type: 'success', 
          text: '✓ ImgBB সরাসরি ছবি সফলভাবে লোড হয়েছে!' 
        });
        setTimeout(() => setAvatarStatus(null), 4000);
      } else {
        setAvatarStatus({ 
          type: 'error', 
          text: 'ভিউয়ার পেজ থেকে সরাসরি ছবি পাওয়া যায়নি। ImgBB থেকে "Direct link" কপি করে পেস্ট করুন।' 
        });
      }
    } else if (extracted.includes('i.ibb.co') || extracted.includes('i.ibb.co.com')) {
      setAvatarStatus({ type: 'success', text: '✓ ImgBB সরাসরি ইমেজ লিংক সক্রিয়' });
      setTimeout(() => setAvatarStatus(null), 3000);
    } else {
      setAvatarStatus(null);
    }
  };

  // Smart handler for Banner input
  const handleBannerChange = async (rawVal: string) => {
    setBannerLoadError(false);
    const extracted = extractDirectImageUrl(rawVal);
    
    handleChange('bannerUrl', extracted);

    if (isImgBBViewerUrl(extracted)) {
      setBannerResolving(true);
      setBannerStatus({ type: 'info', text: 'ImgBB ব্যানার লিংক রূপান্তর করা হচ্ছে...' });
      
      const result = await resolveImageUrl(extracted);
      setBannerResolving(false);
      
      if (result.success && result.directUrl) {
        handleChange('bannerUrl', result.directUrl);
        setBannerStatus({ 
          type: 'success', 
          text: '✓ ImgBB ব্যানার ছবি সফলভাবে লোড হয়েছে!' 
        });
        setTimeout(() => setBannerStatus(null), 4000);
      } else {
        setBannerStatus({ 
          type: 'error', 
          text: 'ভিউয়ার পেজ থেকে সরাসরি ছবি পাওয়া যায়নি। ImgBB থেকে "Direct link" কপি করে পেস্ট করুন।' 
        });
      }
    } else if (extracted.includes('i.ibb.co') || extracted.includes('i.ibb.co.com')) {
      setBannerStatus({ type: 'success', text: '✓ ImgBB সরাসরি ব্যানার লিংক সক্রিয়' });
      setTimeout(() => setBannerStatus(null), 3000);
    } else {
      setBannerStatus(null);
    }
  };

  return (
    <div className="space-y-4 text-slate-950">
      
      {/* ImgBB Global Helper Banner */}
      <div className="p-3.5 bg-gradient-to-r from-sky-50 via-cyan-50 to-blue-50 border-2 border-sky-300 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-start gap-2.5">
          <div className="p-2 bg-sky-600 text-white rounded-xl shadow-xs shrink-0 mt-0.5 sm:mt-0">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-black text-slate-950">ছবি আপলোডার ও ImgBB সাপোর্ট সক্রিয় 🚀</h4>
              <span className="px-2 py-0.5 bg-sky-200 text-sky-950 text-[10px] font-black rounded-full border border-sky-400">
                অটো কনভার্ট
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-800 mt-0.5">
              আপলোড করা ছবির লিংক (ibb.co বা ডিরেক্ট ইমেজ URL) পেস্ট করলেই প্রোফাইল ও কভারে ছবি শো করবে।
            </p>
          </div>
        </div>

        <a
          href="https://androadappsdevelopershuvo.github.io/web_image_uploader/WEB%20IMAGE%20UPLOAS.html"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-sky-600 hover:bg-sky-700 active:scale-95 text-white font-black text-xs rounded-xl shadow-sm transition-all shrink-0"
        >
          <span>ছবি আপলোড করুন</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

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

      {/* Profile Photo / Avatar URL with ImgBB Support */}
      <div className="p-4 bg-white border-2 border-slate-300 rounded-2xl space-y-3 shadow-xs">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <label className="text-xs font-black text-slate-950 flex items-center gap-1.5">
            <User className="w-4 h-4 text-cyan-700" />
            <span>প্রোফাইল ছবি / অবতার (Avatar Image URL)</span>
            <span className="px-2 py-0.5 bg-sky-100 text-sky-800 text-[10px] font-black rounded-lg border border-sky-300">
              ImgBB সাপোর্টেড
            </span>
          </label>
          <label className="flex items-center gap-1.5 text-xs text-slate-950 cursor-pointer font-bold bg-slate-50 px-2 py-1 rounded-lg border border-slate-300">
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

        <div className="relative">
          <input
            type="text"
            value={personal.avatarUrl}
            onChange={(e) => handleAvatarChange(e.target.value)}
            placeholder="https://ibb.co/... অথবা https://i.ibb.co/... অথবা ছবি URL"
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-mono font-bold text-slate-950 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-600 placeholder:text-slate-400 pr-10"
          />
          {avatarResolving && (
            <div className="absolute right-3 top-2.5 text-cyan-600 flex items-center gap-1">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          )}
        </div>

        {/* Status message */}
        {avatarStatus && (
          <div className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
            avatarStatus.type === 'success' 
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
              : avatarStatus.type === 'error'
              ? 'bg-amber-50 text-amber-900 border border-amber-300'
              : 'bg-sky-50 text-sky-900 border border-sky-300'
          }`}>
            {avatarStatus.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : avatarStatus.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            ) : (
              <Loader2 className="w-4 h-4 text-sky-600 animate-spin shrink-0" />
            )}
            <span>{avatarStatus.text}</span>
          </div>
        )}

        {/* Live Avatar Preview Card */}
        {personal.avatarUrl && (
          <div className="p-3 bg-slate-50 border-2 border-slate-200 rounded-xl flex items-center gap-3">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden border-2 border-slate-300 bg-slate-200 shrink-0">
              <img
                src={personal.avatarUrl}
                alt="Avatar Preview"
                referrerPolicy="no-referrer"
                onError={() => setAvatarLoadError(true)}
                onLoad={() => setAvatarLoadError(false)}
                className="w-full h-full object-cover"
              />
              {personal.verifiedBadge && (
                <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-0.5 rounded-full shadow-xs">
                  <ShieldCheck className="w-3 h-3" />
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-slate-900">প্রোফাইল ছবি লাইভ প্রিভিউ</span>
                {avatarLoadError ? (
                  <span className="text-[11px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded">
                    লোড হয়নি
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                    প্রদর্শিত হচ্ছে
                  </span>
                )}
              </div>
              <p className="text-[11px] font-mono text-slate-600 truncate mt-0.5">
                {personal.avatarUrl}
              </p>
            </div>
          </div>
        )}

        {/* Avatar Preset Buttons */}
        <div className="flex items-center gap-2 pt-1 overflow-x-auto">
          <span className="text-xs text-slate-900 shrink-0 font-black">প্রিসেট ছবি:</span>
          {AVATAR_PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleAvatarChange(p.url)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold bg-white border-2 border-slate-300 hover:border-cyan-600 hover:text-cyan-900 text-slate-900 rounded-xl shrink-0 transition-colors shadow-2xs"
            >
              <img src={p.url} alt={p.label} className="w-4 h-4 rounded-full object-cover border border-slate-400" />
              <span>{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Banner Cover URL with ImgBB Support */}
      <div className="p-4 bg-white border-2 border-slate-300 rounded-2xl space-y-3 shadow-xs">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <label className="text-xs font-black text-slate-950 flex items-center gap-1.5">
            <Image className="w-4 h-4 text-indigo-700" />
            <span>কভার ব্যানার ইমেজ (Cover Banner Image URL)</span>
            <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 text-[10px] font-black rounded-lg border border-indigo-300">
              ImgBB সাপোর্টেড
            </span>
          </label>
        </div>
        
        <div className="relative">
          <input
            type="text"
            value={personal.bannerUrl}
            onChange={(e) => handleBannerChange(e.target.value)}
            placeholder="https://ibb.co/... অথবা https://i.ibb.co/... অথবা ব্যানার URL"
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-mono font-bold text-slate-950 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-600 placeholder:text-slate-400 pr-10"
          />
          {bannerResolving && (
            <div className="absolute right-3 top-2.5 text-indigo-600 flex items-center gap-1">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          )}
        </div>

        {/* Status message */}
        {bannerStatus && (
          <div className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
            bannerStatus.type === 'success' 
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
              : bannerStatus.type === 'error'
              ? 'bg-amber-50 text-amber-900 border border-amber-300'
              : 'bg-indigo-50 text-indigo-900 border border-indigo-300'
          }`}>
            {bannerStatus.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : bannerStatus.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            ) : (
              <Loader2 className="w-4 h-4 text-indigo-600 animate-spin shrink-0" />
            )}
            <span>{bannerStatus.text}</span>
          </div>
        )}

        {/* Live Banner Preview Card */}
        {personal.bannerUrl && (
          <div className="p-3 bg-slate-50 border-2 border-slate-200 rounded-xl space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-900">কভার ব্যানার লাইভ প্রিভিউ</span>
              {bannerLoadError ? (
                <span className="text-[11px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded">
                  ব্যানার লোড হয়নি
                </span>
              ) : (
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                  প্রদর্শিত হচ্ছে
                </span>
              )}
            </div>
            <div className="relative h-20 w-full rounded-lg overflow-hidden border-2 border-slate-300 bg-slate-900">
              <img
                src={personal.bannerUrl}
                alt="Banner Preview"
                referrerPolicy="no-referrer"
                onError={() => setBannerLoadError(true)}
                onLoad={() => setBannerLoadError(false)}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Banner Presets */}
        <div className="flex items-center gap-2 pt-1 overflow-x-auto">
          <span className="text-xs text-slate-900 shrink-0 font-black">কভার প্রিসেট:</span>
          {BANNER_PRESETS.map((b, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleBannerChange(b.url)}
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
