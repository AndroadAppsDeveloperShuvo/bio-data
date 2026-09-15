import React, { useState, useRef } from 'react';
import { SocialBioState, BioTheme } from '../types';
import { parseBioHtml, ParseHtmlResult } from '../utils/htmlParser';
import { BIO_THEMES } from '../data/themes';
import { 
  X, 
  Upload, 
  FileCode, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ArrowRight, 
  FileText,
  User,
  Share2,
  Palette,
  ExternalLink,
  Info
} from 'lucide-react';

interface HtmlImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (state: SocialBioState, theme?: BioTheme) => void;
}

export const HtmlImportModal: React.FC<HtmlImportModalProps> = ({
  isOpen,
  onClose,
  onImport
}) => {
  const [activeMode, setActiveMode] = useState<'upload' | 'paste'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<string>('');
  const [pastedCode, setPastedCode] = useState<string>('');
  const [parseResult, setParseResult] = useState<ParseHtmlResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const processHtmlContent = (content: string, name?: string, size?: number) => {
    setIsLoading(true);
    if (name) setFileName(name);
    if (size) setFileSize(`${(size / 1024).toFixed(1)} KB`);

    setTimeout(() => {
      const result = parseBioHtml(content);
      setParseResult(result);
      setIsLoading(false);
    }, 150);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      processHtmlContent(content, file.name, file.size);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      processHtmlContent(content, file.name, file.size);
    };
    reader.readAsText(file);
  };

  const handlePasteProcess = () => {
    if (!pastedCode.trim()) return;
    processHtmlContent(pastedCode, 'Pasted_HTML_Code.html');
  };

  const handleApply = () => {
    if (!parseResult?.success || !parseResult.state) return;

    let matchedTheme: BioTheme | undefined;
    if (parseResult.themeId) {
      matchedTheme = BIO_THEMES.find(t => t.id === parseResult.themeId);
    }

    onImport(parseResult.state, matchedTheme);
    handleClose();
  };

  const handleClose = () => {
    setParseResult(null);
    setFileName('');
    setFileSize('');
    setPastedCode('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/20 border border-cyan-500/40 rounded-2xl text-cyan-400 shadow-sm">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>তৈরি করা HTML আপলোড করে এডিট করুন</span>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full font-bold">
                  Auto-Restore
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                আগে ডাউনলোড করা HTML ফাইলটি দিলে সাথে সাথে সব তথ্য এডিটরে চলে আসবে
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
          
          {/* Mode Switch Tabs */}
          <div className="flex bg-slate-950/80 p-1 rounded-2xl border border-slate-800 w-fit">
            <button
              type="button"
              onClick={() => setActiveMode('upload')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                activeMode === 'upload'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileCode className="w-4 h-4" />
              <span>HTML ফাইল আপলোড</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMode('paste')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                activeMode === 'paste'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>কোড পেস্ট করুন</span>
            </button>
          </div>

          {/* Upload Box Mode */}
          {activeMode === 'upload' && (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-3xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
                isDragging 
                  ? 'border-cyan-400 bg-cyan-950/30 scale-[1.01]' 
                  : 'border-slate-700 hover:border-cyan-500/80 bg-slate-950/40 hover:bg-slate-950/70'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".html,.htm"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
                <Upload className="w-7 h-7 animate-bounce" />
              </div>

              <h4 className="text-sm font-bold text-white mb-1">
                এখানে ক্লিক করে আপনার <span className="text-cyan-400">.html</span> ফাইল সিলেক্ট করুন
              </h4>
              <p className="text-xs text-slate-400 mb-3">
                অথবা ফাইলটি মাউস দিয়ে টেনে এনে (Drag & Drop) ছেড়ে দিন
              </p>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800/80 rounded-full border border-slate-700 text-[11px] font-semibold text-slate-300">
                <span>সাপোর্ট:</span>
                <span className="text-cyan-300 font-mono">.html, .htm ফাইল</span>
              </div>
            </div>
          )}

          {/* Paste HTML Code Mode */}
          {activeMode === 'paste' && (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-300">
                HTML কোড নিচে পেস্ট করুন:
              </label>
              <textarea
                value={pastedCode}
                onChange={(e) => setPastedCode(e.target.value)}
                placeholder="<!DOCTYPE html> ... আপনার তৈরি করা বায়ো HTML কোড এখানে পেস্ট করুন"
                rows={6}
                className="w-full p-3 font-mono text-xs text-cyan-300 bg-slate-950 border border-slate-700 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder:text-slate-600 resize-y"
              />
              <button
                type="button"
                onClick={handlePasteProcess}
                disabled={!pastedCode.trim()}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl border border-slate-700 transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>কোড বিশ্লেষণ ও রিকভার করুন</span>
              </button>
            </div>
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-cyan-500/30 flex items-center justify-center gap-2 text-xs font-bold text-cyan-400 animate-pulse">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>HTML ফাইল রিড ও ডেটা রিকভার করা হচ্ছে...</span>
            </div>
          )}

          {/* Error Message */}
          {parseResult && !parseResult.success && (
            <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/40 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-red-300">ফাইল প্রসেস ব্যর্থ হয়েছে</h5>
                <p className="text-xs text-red-200/80 mt-0.5">{parseResult.error}</p>
              </div>
            </div>
          )}

          {/* Success / Detected Details Card */}
          {parseResult?.success && parseResult.state && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border-2 border-emerald-500/50 shadow-lg space-y-4">
              
              <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-black text-emerald-300">
                    ফাইল সফলভাবে সনাক্ত হয়েছে!
                  </span>
                </div>
                {fileName && (
                  <span className="text-[11px] font-mono text-slate-400 truncate max-w-[200px]">
                    {fileName} ({fileSize})
                  </span>
                )}
              </div>

              {/* Summary of What Will Be Restored */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                
                {/* Profile Identity */}
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center gap-3">
                  {parseResult.state.personal.avatarUrl ? (
                    <img
                      src={parseResult.state.personal.avatarUrl}
                      alt="Avatar"
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded-xl object-cover border border-slate-700 shrink-0"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-extrabold text-white truncate text-xs">
                      {parseResult.state.personal.name || 'নাম নেই'}
                    </p>
                    <p className="text-[11px] text-cyan-300 font-mono truncate">
                      {parseResult.state.personal.handle || '@username'}
                    </p>
                    {parseResult.state.personal.location && (
                      <p className="text-[10px] text-slate-400 truncate">
                        📍 {parseResult.state.personal.location}
                      </p>
                    )}
                  </div>
                </div>

                {/* Social Links Count */}
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-slate-400 font-bold flex items-center gap-1">
                      <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>সোশ্যাল লিংক:</span>
                    </p>
                    <p className="text-white font-extrabold text-sm">
                      {parseResult.state.socialLinks.filter(s => s.enabled).length} টি লিংক যুক্ত আছে
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-cyan-950 text-cyan-300 text-[10px] font-bold rounded-lg border border-cyan-800">
                    Active
                  </span>
                </div>

                {/* Custom Share URL */}
                {parseResult.state.shareSettings?.customShareUrl && (
                  <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 col-span-1 sm:col-span-2">
                    <p className="text-slate-400 font-bold text-[11px] mb-0.5">
                      কাস্টম শেয়ার লিংক:
                    </p>
                    <p className="text-cyan-300 font-mono font-bold text-xs truncate">
                      {parseResult.state.shareSettings.customShareUrl}
                    </p>
                  </div>
                )}

              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleApply}
                  className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-sm rounded-2xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 fill-slate-950" />
                  <span>এই তথ্যগুলো এডিটরে লোড করুন (Edit Now)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Footer info note */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>টিপস: এই অ্যাপ দিয়ে তৈরি করা যেকোনো HTML ফাইল সরাসরি আপলোড করা যাবে।</span>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="text-slate-400 hover:text-white font-bold text-xs"
          >
            বন্ধ করুন
          </button>
        </div>

      </div>
    </div>
  );
};
