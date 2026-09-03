import React from 'react';
import { DirectContact } from '../../types';
import { MessageSquare, Mail, Phone, Send, Info } from 'lucide-react';

interface DirectContactEditorProps {
  contact: DirectContact;
  onChange: (contact: DirectContact) => void;
}

export const DirectContactEditor: React.FC<DirectContactEditorProps> = ({
  contact,
  onChange
}) => {
  const handleChange = (field: keyof DirectContact, value: any) => {
    onChange({
      ...contact,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      {/* Toggle */}
      <div className="p-3.5 bg-gradient-to-r from-emerald-100 to-teal-100 border-2 border-emerald-300 rounded-2xl flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-600 text-white rounded-xl shadow-xs">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-950">ডাইরেক্ট কনট্যাক্ট বাটন (WhatsApp, Email, etc.)</h4>
            <p className="text-xs font-semibold text-slate-800">ভিজিটররা সরাসরি হোয়াটসঅ্যাপ বা ইমেইলে মেসেজ পাঠাতে পারবে</p>
          </div>
        </div>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={contact.enabled}
            onChange={(e) => handleChange('enabled', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
        </label>
      </div>

      {contact.enabled && (
        <div className="p-4 bg-white border-2 border-slate-300 rounded-2xl space-y-3.5 shadow-sm">
          
          {/* WhatsApp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-black text-slate-950 mb-1.5 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>WhatsApp নম্বর (কান্ট্রি কোড সহ)</span>
              </label>
              <input
                type="text"
                value={contact.whatsappNumber || ''}
                onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                placeholder="যেমন: +8801818000000"
                className="w-full px-3 py-2 text-xs sm:text-sm font-mono font-bold text-slate-950 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-950 mb-1.5">
                WhatsApp অটো মেসেজ (Default Message)
              </label>
              <input
                type="text"
                value={contact.whatsappMessage || ''}
                onChange={(e) => handleChange('whatsappMessage', e.target.value)}
                placeholder="যেমন: আসসালামু আলাইকুম ভাই! আপনার বায়ো দেখে নক দিচ্ছি।"
                className="w-full px-3 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Email & Telegram */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-black text-slate-950 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-cyan-700" />
                <span>ইমেইল এড্রেস (Email Address)</span>
              </label>
              <input
                type="email"
                value={contact.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="business.shuvo@gmail.com"
                className="w-full px-3 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-950 mb-1.5 flex items-center gap-1.5">
                <Send className="w-4 h-4 text-sky-600" />
                <span>টেলিগ্রাম ইউজারনেম (Telegram Username)</span>
              </label>
              <input
                type="text"
                value={contact.telegramUsername || ''}
                onChange={(e) => handleChange('telegramUsername', e.target.value)}
                placeholder="shuvo_gaming_admin"
                className="w-full px-3 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Custom Note */}
          <div>
            <label className="block text-xs font-black text-slate-950 mb-1.5">
              যোগাযোগের নোট / নির্দেশিকা (Contact Note)
            </label>
            <input
              type="text"
              value={contact.customNote || ''}
              onChange={(e) => handleChange('customNote', e.target.value)}
              placeholder="যেমন: স্পনসরশিপ, প্রমোশন অথবা টুর্নামেন্ট ইনভাইটের জন্য যোগাযোগ করুন।"
              className="w-full px-3 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 placeholder:text-slate-400"
            />
          </div>

        </div>
      )}
    </div>
  );
};
