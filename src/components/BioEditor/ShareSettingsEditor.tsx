import React, { useState } from 'react';
import { ShareSettings } from '../../types';
import { 
  Share2, 
  Link as LinkIcon, 
  Check, 
  Copy, 
  Globe, 
  Sparkles, 
  ExternalLink,
  Info
} from 'lucide-react';

interface ShareSettingsEditorProps {
  settings?: ShareSettings;
  onChange: (settings: ShareSettings) => void;
}

export const ShareSettingsEditor: React.FC<ShareSettingsEditorProps> = ({
  settings,
  onChange
}) => {
  const currentSettings: ShareSettings = settings || {
    enabled: true,
    title: 'বন্ধুদের সাথে শেয়ার করুন',
    subtitle: 'এই বায়ো পেজের লিংক এক ক্লিকে কপি করুন',
    customShareUrl: 'https://bio-data-ochre.vercel.app',
    buttonText: 'শেয়ার লিংক'
  };

  const [copiedTest, setCopiedTest] = useState(false);

  const update = (partial: Partial<ShareSettings>) => {
    onChange({
      ...currentSettings,
      ...partial
    });
  };

  const handleTestCopy = () => {
    const url = currentSettings.customShareUrl && currentSettings.customShareUrl.trim() !== ''
      ? currentSettings.customShareUrl.trim()
      : window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedTest(true);
    setTimeout(() => setCopiedTest(false), 2000);
  };

  const handleUseCurrentPage = () => {
    update({ customShareUrl: window.location.href });
  };

  const handleUseShuvoDefault = () => {
    update({ customShareUrl: 'https://bio-data-ochre.vercel.app' });
  };

  return (
    <div className="space-y-5 text-slate-950">
      
      {/* Header Info Banner */}
      <div className="p-4 bg-gradient-to-r from-cyan-50 via-sky-50 to-blue-50 border-2 border-cyan-300 rounded-2xl flex items-start gap-3 shadow-xs">
        <div className="p-2.5 bg-cyan-600 text-white rounded-xl shadow-xs shrink-0 mt-0.5">
          <Share2 className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-black text-slate-950">
            শেয়ার বক্স ও কাস্টম লিংক কনফিগারেশন 🔗
          </h3>
          <p className="text-xs font-semibold text-slate-700 leading-relaxed">
            এখানে আপনার মন মতো যেকোনো লিংক বসিয়ে দিন। বায়ো পেজে ভিজিটররা 
            <strong className="text-cyan-800"> "শেয়ার লিংক" </strong> 
            বাটনে ক্লিক করলে আপনার দেওয়া এই লিংকটিই এক ক্লিকে কপি হয়ে যাবে!
          </p>
        </div>
      </div>

      {/* Enable Toggle Card */}
      <div className="p-4 bg-white border-2 border-slate-300 rounded-2xl flex items-center justify-between gap-4 shadow-xs">
        <div className="space-y-0.5">
          <label className="text-xs sm:text-sm font-black text-slate-950 flex items-center gap-2 cursor-pointer">
            <span>শেয়ার বক্স পেজে প্রদর্শন করুন</span>
            {currentSettings.enabled ? (
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-black rounded-full border border-emerald-300">
                সক্রিয় (Visible)
              </span>
            ) : (
              <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-black rounded-full border border-slate-300">
                লুকানো (Hidden)
              </span>
            )}
          </label>
          <p className="text-[11px] font-medium text-slate-500">
            অন থাকলে প্রোফাইল কার্ডের নিচে "বন্ধুদের সাথে শেয়ার করুন" সেকশনটি শো করবে।
          </p>
        </div>

        <button
          type="button"
          onClick={() => update({ enabled: !currentSettings.enabled })}
          className={`w-12 h-6 rounded-full transition-colors relative shrink-0 p-0.5 ${
            currentSettings.enabled ? 'bg-cyan-600' : 'bg-slate-300'
          }`}
          title="টগল করুন"
        >
          <div
            className={`w-5 h-5 rounded-full bg-white transition-transform shadow-xs ${
              currentSettings.enabled ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Main Settings Form */}
      {currentSettings.enabled && (
        <div className="space-y-4 p-4 bg-slate-50/80 border-2 border-slate-300 rounded-2xl">
          
          {/* Custom Share URL */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <label className="text-xs sm:text-sm font-black text-slate-950 flex items-center gap-1.5">
                <LinkIcon className="w-4 h-4 text-cyan-600" />
                <span>আপনার মন মতো শেয়ার লিংক (Custom Share URL) *</span>
              </label>
              {currentSettings.customShareUrl && (
                <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  ✓ কাস্টম লিংক সেট আছে
                </span>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Globe className="w-4 h-4 text-cyan-600" />
              </div>
              <input
                type="url"
                value={currentSettings.customShareUrl}
                onChange={(e) => update({ customShareUrl: e.target.value })}
                placeholder="যেমন: https://bio-data-ochre.vercel.app অথবা আপনার যেকোনো লিংক"
                className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm font-mono font-bold text-slate-900 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-600 placeholder:text-slate-400 placeholder:font-sans"
              />
            </div>

            {/* Quick Helper Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleUseShuvoDefault}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg shadow-2xs active:scale-95 transition-all"
              >
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>ডিফল্ট Vercel লিংক বসান</span>
              </button>

              <button
                type="button"
                onClick={handleUseCurrentPage}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg shadow-2xs active:scale-95 transition-all"
              >
                <Globe className="w-3 h-3 text-cyan-600" />
                <span>বর্তমান পেজের URL বসান</span>
              </button>

              <button
                type="button"
                onClick={handleTestCopy}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg shadow-2xs active:scale-95 transition-all ml-auto"
              >
                {copiedTest ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                <span>{copiedTest ? 'কপি সফল!' : 'লিংক টেস্ট কপি'}</span>
              </button>
            </div>
          </div>

          {/* Title & Subtitle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-black text-slate-950 mb-1">
                বক্সের হেডিং / টাইটেল
              </label>
              <input
                type="text"
                value={currentSettings.title}
                onChange={(e) => update({ title: e.target.value })}
                placeholder="যেমন: বন্ধুদের সাথে শেয়ার করুন"
                className="w-full px-3 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-600"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-950 mb-1">
                সাব-টাইটেল / বিবরণ
              </label>
              <input
                type="text"
                value={currentSettings.subtitle}
                onChange={(e) => update({ subtitle: e.target.value })}
                placeholder="যেমন: এই বায়ো পেজের লিংক এক ক্লিকে কপি করুন"
                className="w-full px-3 py-2 text-xs sm:text-sm font-medium text-slate-950 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-600"
              />
            </div>
          </div>

          {/* Button Label */}
          <div>
            <label className="block text-xs font-black text-slate-950 mb-1">
              বাটন টেক্সট (Button Text)
            </label>
            <input
              type="text"
              value={currentSettings.buttonText}
              onChange={(e) => update({ buttonText: e.target.value })}
              placeholder="যেমন: শেয়ার লিংক"
              className="w-full sm:w-1/2 px-3 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-600"
            />
          </div>

          {/* Interactive Live Preview of Share Box */}
          <div className="pt-3 border-t-2 border-slate-200">
            <p className="text-xs font-black text-slate-800 mb-2 flex items-center gap-1.5">
              <span>কার্ডে যেমন দেখাবে (লাইভ প্রিভিউ):</span>
            </p>
            <div className="p-3.5 rounded-2xl bg-slate-900 border-2 border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
              <div className="space-y-0.5 min-w-0">
                <h4 className="text-xs font-bold text-white truncate">
                  {currentSettings.title || 'বন্ধুদের সাথে শেয়ার করুন'}
                </h4>
                <p className="text-xs text-slate-300 font-medium truncate">
                  {currentSettings.subtitle || 'এই বায়ো পেজের লিংক এক ক্লিকে কপি করুন'}
                </p>
                {currentSettings.customShareUrl && (
                  <p className="text-[10px] font-mono text-cyan-400 truncate opacity-90 mt-0.5 flex items-center gap-1">
                    <LinkIcon className="w-2.5 h-2.5 shrink-0" />
                    <span>কপি হবে: {currentSettings.customShareUrl}</span>
                  </p>
                )}
              </div>

              <button 
                type="button" 
                onClick={handleTestCopy}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-2xs shrink-0"
              >
                {copiedTest ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-cyan-400" />}
                <span>{copiedTest ? 'কপি হয়েছে' : (currentSettings.buttonText || 'শেয়ার লিংক')}</span>
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
