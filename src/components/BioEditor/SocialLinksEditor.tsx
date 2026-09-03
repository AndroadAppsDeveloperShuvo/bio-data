import React from 'react';
import { SocialLink, SocialPlatform } from '../../types';
import { 
  Plus, 
  Trash2, 
  Eye, 
  EyeOff, 
  MoveUp, 
  MoveDown, 
  ExternalLink,
  Globe,
  Star
} from 'lucide-react';

interface SocialLinksEditorProps {
  socialLinks: SocialLink[];
  onChange: (links: SocialLink[]) => void;
}

const PLATFORM_PRESETS: { platform: SocialPlatform; name: string; defaultTitle: string; defaultBtn: string; defaultPlaceholder: string }[] = [
  { platform: 'facebook', name: 'Facebook (ফেসবুক)', defaultTitle: 'Facebook Profile / Page', defaultBtn: 'ফলো করুন', defaultPlaceholder: 'https://facebook.com/yourname' },
  { platform: 'youtube', name: 'YouTube (ইউটিউব)', defaultTitle: 'YouTube Gaming / Vlogs', defaultBtn: 'সাবস্ক্রাইব', defaultPlaceholder: 'https://youtube.com/@channel' },
  { platform: 'instagram', name: 'Instagram (ইন্সটাগ্রাম)', defaultTitle: 'Instagram Photos & Reels', defaultBtn: 'ফলো করুন', defaultPlaceholder: 'https://instagram.com/username' },
  { platform: 'tiktok', name: 'TikTok (টিকটক)', defaultTitle: 'TikTok Viral Clips', defaultBtn: 'ফলো করুন', defaultPlaceholder: 'https://tiktok.com/@username' },
  { platform: 'whatsapp', name: 'WhatsApp (হোয়াটসঅ্যাপ)', defaultTitle: 'Direct WhatsApp Chat', defaultBtn: 'মেসেজ দিন', defaultPlaceholder: 'https://wa.me/8801700000000' },
  { platform: 'telegram', name: 'Telegram (টেলিগ্রাম)', defaultTitle: 'Telegram Channel / Inbox', defaultBtn: 'যুক্ত হোন', defaultPlaceholder: 'https://t.me/username' },
  { platform: 'discord', name: 'Discord (ডিসকর্ড)', defaultTitle: 'Discord Gaming Server', defaultBtn: 'জয়েন করুন', defaultPlaceholder: 'https://discord.gg/invite' },
  { platform: 'github', name: 'GitHub (গিটহাব)', defaultTitle: 'GitHub Code Repos', defaultBtn: 'কোড দেখুন', defaultPlaceholder: 'https://github.com/username' },
  { platform: 'linkedin', name: 'LinkedIn (লিংকডইন)', defaultTitle: 'LinkedIn Network', defaultBtn: 'কানেক্ট করুন', defaultPlaceholder: 'https://linkedin.com/in/username' },
  { platform: 'spotify', name: 'Spotify (স্পটিফাই)', defaultTitle: 'Spotify Favorite Playlist', defaultBtn: 'শুনুন', defaultPlaceholder: 'https://open.spotify.com/playlist/...' },
  { platform: 'twitter', name: 'X / Twitter (টুইটার)', defaultTitle: 'X (Twitter) Profile', defaultBtn: 'ফলো করুন', defaultPlaceholder: 'https://twitter.com/username' },
  { platform: 'website', name: 'Website / Blog (ওয়েবসাইট)', defaultTitle: 'My Official Portfolio', defaultBtn: 'ভিজিট করুন', defaultPlaceholder: 'https://mywebsite.com' },
];

export const SocialLinksEditor: React.FC<SocialLinksEditorProps> = ({
  socialLinks,
  onChange
}) => {
  const handleUpdate = (id: string, updates: Partial<SocialLink>) => {
    const updated = socialLinks.map(link => {
      if (link.id === id) {
        return { ...link, ...updates };
      }
      return link;
    });
    onChange(updated);
  };

  const handleToggle = (id: string) => {
    const updated = socialLinks.map(link => {
      if (link.id === id) {
        return { ...link, enabled: !link.enabled };
      }
      return link;
    });
    onChange(updated);
  };

  const handleDelete = (id: string) => {
    onChange(socialLinks.filter(link => link.id !== id));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= socialLinks.length) return;
    const newLinks = [...socialLinks];
    const temp = newLinks[index];
    newLinks[index] = newLinks[targetIndex];
    newLinks[targetIndex] = temp;
    onChange(newLinks);
  };

  const handleAddPlatform = (preset: typeof PLATFORM_PRESETS[0]) => {
    const newLink: SocialLink = {
      id: 'link_' + Date.now() + Math.random().toString(36).substring(2, 5),
      platform: preset.platform,
      title: preset.defaultTitle,
      url: preset.defaultPlaceholder,
      username: '',
      subtitle: '',
      buttonText: preset.defaultBtn,
      enabled: true,
      isFeatured: false
    };
    onChange([...socialLinks, newLink]);
  };

  return (
    <div className="space-y-4">
      {/* Quick Add Platform Badges */}
      <div className="p-3.5 bg-slate-100 border-2 border-slate-300 rounded-2xl">
        <p className="text-xs font-black text-slate-950 mb-2 flex items-center gap-1.5">
          <Plus className="w-4 h-4 text-cyan-700" />
          <span>সোশ্যাল প্রোফাইল লিংক যোগ করুন (Quick Add Platform):</span>
        </p>
        <div className="flex flex-wrap gap-1.5">
          {PLATFORM_PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleAddPlatform(p)}
              className="text-xs font-bold px-3 py-1.5 bg-white hover:bg-cyan-50 border-2 border-slate-300 hover:border-cyan-600 text-slate-900 hover:text-cyan-950 rounded-xl transition-all flex items-center gap-1 shadow-2xs"
            >
              <span>+ {p.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Social Links List */}
      <div className="space-y-3">
        {socialLinks.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50">
            <Globe className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <p className="text-xs text-slate-800 font-bold">কোন সোশ্যাল লিংক যোগ করা হয়নি।</p>
            <p className="text-xs text-slate-600 font-medium mt-1">উপরের বাটনগুলো থেকে ফেসবুক, ইউটিউব ইত্যাদি যোগ করুন।</p>
          </div>
        ) : (
          socialLinks.map((link, index) => (
            <div 
              key={link.id}
              className={`p-4 rounded-2xl border-2 transition-all ${
                link.enabled 
                  ? 'bg-white border-slate-300 shadow-sm' 
                  : 'bg-slate-100 border-slate-300 opacity-60'
              }`}
            >
              {/* Top controls */}
              <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b-2 border-slate-200">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-cyan-100 text-cyan-950 border border-cyan-300 shrink-0">
                    {link.platform}
                  </span>
                  <input
                    type="text"
                    value={link.title}
                    onChange={(e) => handleUpdate(link.id, { title: e.target.value })}
                    className="text-xs sm:text-sm font-black text-slate-950 bg-slate-50 border border-slate-300 focus:border-cyan-600 rounded-lg px-2 py-1 flex-1"
                    placeholder="লিংক টাইটেল..."
                  />
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {/* Reorder Up/Down */}
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => handleMove(index, 'up')}
                    className="p-1.5 text-slate-700 hover:text-slate-950 disabled:opacity-30 rounded-lg hover:bg-slate-200"
                    title="উপরে নিন"
                  >
                    <MoveUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={index === socialLinks.length - 1}
                    onClick={() => handleMove(index, 'down')}
                    className="p-1.5 text-slate-700 hover:text-slate-950 disabled:opacity-30 rounded-lg hover:bg-slate-200"
                    title="নিচে নিন"
                  >
                    <MoveDown className="w-4 h-4" />
                  </button>

                  {/* Toggle Visibility */}
                  <button
                    type="button"
                    onClick={() => handleToggle(link.id)}
                    className={`p-1.5 rounded-lg transition-colors font-bold ${
                      link.enabled ? 'text-emerald-700 hover:bg-emerald-100' : 'text-slate-600 hover:bg-slate-200'
                    }`}
                    title={link.enabled ? 'হাইড করুন' : 'শো করুন'}
                  >
                    {link.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => handleDelete(link.id)}
                    className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg"
                    title="ডিলিট"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* URL & Subtitle & Button Text */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    প্রোফাইল URL লিংক *
                  </label>
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => handleUpdate(link.id, { url: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 text-xs font-mono font-bold text-slate-950 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    সাবটাইটেল / বর্ণনা / ফলোয়ার তথ্য
                  </label>
                  <input
                    type="text"
                    value={link.subtitle || ''}
                    onChange={(e) => handleUpdate(link.id, { subtitle: e.target.value })}
                    placeholder="যেমন: ১ লক্ষ+ ফলোয়ার • নিয়মিত লাইভ"
                    className="w-full px-3 py-2 text-xs font-bold text-slate-950 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    বাটন টেক্সট (Action Label)
                  </label>
                  <input
                    type="text"
                    value={link.buttonText || ''}
                    onChange={(e) => handleUpdate(link.id, { buttonText: e.target.value })}
                    placeholder="যেমন: ফলো করুন / সাবস্ক্রাইব"
                    className="w-full px-3 py-2 text-xs font-bold text-slate-950 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-600"
                  />
                </div>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};
