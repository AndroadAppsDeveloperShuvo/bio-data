import { BioTheme } from '../types';

export const BIO_THEMES: BioTheme[] = [
  {
    id: 'cyber-gamer',
    name: 'Cyberpunk Gamer Neon',
    nameBn: 'সাইবারপাঙ্ক গেমার নিয়ন',
    category: 'gamer',
    bgGradient: 'from-slate-950 via-[#0a0f1d] to-[#05050f]',
    cardBg: 'bg-slate-900/80 backdrop-blur-md',
    cardBorder: 'border-cyan-500/30 hover:border-cyan-400',
    textColor: 'text-slate-100',
    subTextColor: 'text-cyan-300/80',
    accentColor: '#06b6d4', // cyan-500
    accentHover: '#0891b2',
    buttonStyle: 'neon-glow',
    badgeBg: 'bg-cyan-950/70 text-cyan-300 border border-cyan-500/40',
    fontFamily: 'tech'
  },
  {
    id: 'fire-inferno',
    name: 'FreeFire Red Flame',
    nameBn: 'ফায়ার ইনফ্যার্নো (রেড-অরেঞ্জ)',
    category: 'gamer',
    bgGradient: 'from-[#140505] via-[#1a0808] to-[#0a0202]',
    cardBg: 'bg-[#1e0a0a]/80 backdrop-blur-md',
    cardBorder: 'border-orange-500/30 hover:border-red-500',
    textColor: 'text-slate-100',
    subTextColor: 'text-orange-300/90',
    accentColor: '#f97316', // orange-500
    accentHover: '#ea580c',
    buttonStyle: 'gradient',
    badgeBg: 'bg-orange-950/70 text-orange-300 border border-orange-500/40',
    fontFamily: 'tech'
  },
  {
    id: 'midnight-purple',
    name: 'Midnight Nebula',
    nameBn: 'মিডনাইট পার্পল নেবুলা',
    category: 'neon',
    bgGradient: 'from-[#0b0314] via-[#120721] to-[#07010e]',
    cardBg: 'bg-[#180a2c]/70 backdrop-blur-md',
    cardBorder: 'border-purple-500/30 hover:border-fuchsia-400',
    textColor: 'text-slate-100',
    subTextColor: 'text-purple-300/90',
    accentColor: '#a855f7', // purple-500
    accentHover: '#9333ea',
    buttonStyle: 'neon-glow',
    badgeBg: 'bg-purple-950/70 text-purple-300 border border-purple-500/40',
    fontFamily: 'sans'
  },
  {
    id: 'bento-dark',
    name: 'Modern Bento Dark',
    nameBn: 'মডার্ন বেন্তো ডার্ক',
    category: 'minimal',
    bgGradient: 'from-zinc-950 via-zinc-900 to-black',
    cardBg: 'bg-zinc-900/90 border border-zinc-800/80',
    cardBorder: 'border-zinc-700/60 hover:border-zinc-500',
    textColor: 'text-zinc-100',
    subTextColor: 'text-zinc-400',
    accentColor: '#3b82f6', // blue-500
    accentHover: '#2563eb',
    buttonStyle: 'solid',
    badgeBg: 'bg-zinc-800 text-zinc-200 border border-zinc-700',
    fontFamily: 'sans'
  },
  {
    id: 'sunset-vibe',
    name: 'Sunset Radiant',
    nameBn: 'সানসেট ভাইব্রেন্ট গ্লো',
    category: 'gradient',
    bgGradient: 'from-[#2e0854] via-[#4a0e4e] to-[#7b1b38]',
    cardBg: 'bg-white/10 backdrop-blur-lg border border-white/15',
    cardBorder: 'border-pink-400/30 hover:border-pink-300',
    textColor: 'text-white',
    subTextColor: 'text-pink-200',
    accentColor: '#ec4899', // pink-500
    accentHover: '#db2777',
    buttonStyle: 'glass',
    badgeBg: 'bg-pink-500/20 text-pink-200 border border-pink-400/40',
    fontFamily: 'sans'
  },
  {
    id: 'emerald-matrix',
    name: 'Emerald Toxic Green',
    nameBn: 'টক্সিক এমারেল্ড গ্রিন',
    category: 'gamer',
    bgGradient: 'from-[#03140a] via-[#051c0e] to-[#010904]',
    cardBg: 'bg-[#0a2715]/80 backdrop-blur-md',
    cardBorder: 'border-emerald-500/30 hover:border-emerald-400',
    textColor: 'text-slate-100',
    subTextColor: 'text-emerald-300/90',
    accentColor: '#10b981', // emerald-500
    accentHover: '#059669',
    buttonStyle: 'neon-glow',
    badgeBg: 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/40',
    fontFamily: 'tech'
  },
  {
    id: 'clean-light',
    name: 'Clean Minimal Light',
    nameBn: 'ক্লিন মিনিমাল লাইট',
    category: 'minimal',
    bgGradient: 'from-slate-100 via-white to-slate-200',
    cardBg: 'bg-white shadow-sm border border-slate-200/80',
    cardBorder: 'border-slate-300 hover:border-slate-400',
    textColor: 'text-slate-900',
    subTextColor: 'text-slate-600',
    accentColor: '#2563eb', // blue-600
    accentHover: '#1d4ed8',
    buttonStyle: 'solid',
    badgeBg: 'bg-slate-100 text-slate-700 border border-slate-200',
    fontFamily: 'sans'
  }
];
