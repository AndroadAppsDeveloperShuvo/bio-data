import React, { useState } from 'react';
import { SocialBioState, BioTheme } from '../types';
import { generateStandaloneBioHtml } from '../utils/htmlGenerator';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  Code, 
  ExternalLink, 
  CheckCircle,
  Sparkles,
  Globe,
  Share2
} from 'lucide-react';

interface HtmlExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: SocialBioState;
  theme: BioTheme;
}

export const HtmlExportModal: React.FC<HtmlExportModalProps> = ({
  isOpen,
  onClose,
  state,
  theme
}) => {
  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState(
    `${(state.personal.name || 'social_bio').toLowerCase().replace(/[^a-z0-9]/g, '_')}_profile.html`
  );

  if (!isOpen) return null;

  const htmlCode = generateStandaloneBioHtml(state, theme);

  const handleDownload = () => {
    const blob = new Blob([htmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName.endsWith('.html') ? fileName : `${fileName}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenNewTab = () => {
    const blob = new Blob([htmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-cyan-500/20 border border-cyan-500/40 rounded-xl text-cyan-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Standalone HTML ফাইল ডাউনলোড</h3>
              <p className="text-xs text-slate-400">সম্পূর্ণ স্বয়ংসম্পূর্ণ HTML ফাইল যা যেকোনো ব্রাউজারে অফলাইনেও চলবে</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          
          {/* Action Row */}
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">ফাইল নেইম:</label>
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="block text-xs font-mono font-bold text-cyan-300 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-xl focus:ring-1 focus:ring-cyan-400"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
                <span>{copied ? 'কোড কপি হয়েছে!' : 'HTML কপি করুন'}</span>
              </button>

              <button
                type="button"
                onClick={handleOpenNewTab}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs rounded-xl border border-slate-700 transition-colors"
                title="নতুন ট্যাবে প্রিভিউ"
              >
                <ExternalLink className="w-4 h-4" />
                <span>লাইভ প্রিভিউ</span>
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-cyan-500/25 transition-all active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>HTML ডাউনলোড করুন</span>
              </button>
            </div>
          </div>

          {/* Features check list */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-300">
            <div className="p-3 bg-slate-950/50 border border-slate-800 rounded-xl flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-bold">100% স্ট্যান্ডঅ্যালোন</strong>
                <span className="text-[11px] text-slate-400">কোন এক্সটার্নাল সার্ভার ছাড়াই ব্রাউজারে চলবে</span>
              </div>
            </div>

            <div className="p-3 bg-slate-950/50 border border-slate-800 rounded-xl flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-bold">সোশ্যাল ও WhatsApp ইন্টিগ্রেশন</strong>
                <span className="text-[11px] text-slate-400">ক্লিক করলেই সরাসরি ফেসবুক/ইউটিউবে যাবে</span>
              </div>
            </div>

            <div className="p-3 bg-slate-950/50 border border-slate-800 rounded-xl flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-bold">হোস্টিং ও শেয়ারিং রেডি</strong>
                <span className="text-[11px] text-slate-400">GitHub Pages / Vercel বা বন্ধুদের সাথে শেয়ারযোগ্য</span>
              </div>
            </div>

            <div className="p-3 bg-cyan-950/40 border border-cyan-500/40 rounded-xl flex items-start gap-2 col-span-1 sm:col-span-3">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-cyan-300 block font-bold text-xs">পুনরায় যেকোনো সময় এডিট সুবিধা (Auto-Editable)</strong>
                <span className="text-[11px] text-slate-300">
                  ভবিষ্যতে কোনো লিংক বা তথ্য পরিবর্তন করতে চাইলে নতুন করে লিখতে হবে না। শুধু এই ডাউনলোড করা <code className="text-cyan-300 font-mono font-bold">.html</code> ফাইলটি এই অ্যাপে <strong>"HTML আপলোড"</strong> বাটনে দিলেই সব তথ্য স্বয়ংক্রিয়ভাবে ফিরে আসবে!
                </span>
              </div>
            </div>
          </div>

          {/* Code Viewer */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="flex items-center gap-1 font-mono font-bold">
                <Code className="w-3.5 h-3.5 text-cyan-400" /> index.html Code Preview:
              </span>
              <span className="text-[11px]">{htmlCode.length} bytes</span>
            </div>
            <pre className="p-3.5 bg-black rounded-2xl border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-48 scrollbar-thin">
              <code>{htmlCode}</code>
            </pre>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            ডাউনলোড করা ফাইলটি ডাবল ক্লিক করে মোবাইলে বা পিসিতে সরাসরি ওপেন করুন।
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors"
          >
            বন্ধ করুন
          </button>
        </div>

      </div>
    </div>
  );
};
