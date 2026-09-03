import { SocialBioState, BioTheme } from '../types';

export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export function generateStandaloneBioHtml(
  state: SocialBioState,
  theme: BioTheme
): string {
  const { personal, badges, socialLinks, gamingStats, featuredMedia, highlights, contact, showQrCode } = state;
  const candidateName = personal.name || 'My Social Bio';
  const ytId = featuredMedia.enabled && featuredMedia.url ? (extractYouTubeId(featuredMedia.url) || featuredMedia.embedId) : null;

  // Render SVG icons helper
  const getPlatformIconSvg = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return `<svg class="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`;
      case 'youtube':
        return `<svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`;
      case 'instagram':
        return `<svg class="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.13-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`;
      case 'tiktok':
        return `<svg class="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`;
      case 'whatsapp':
        return `<svg class="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>`;
      case 'telegram':
        return `<svg class="w-5 h-5 text-sky-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.942z"/></svg>`;
      case 'discord':
        return `<svg class="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>`;
      case 'github':
        return `<svg class="w-5 h-5 text-slate-100" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`;
      default:
        return `<svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>`;
    }
  };

  const whatsappHref = contact.whatsappNumber 
    ? `https://wa.me/${contact.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(contact.whatsappMessage || 'Hello!')}`
    : '#';

  return `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${candidateName} - Official Social Bio</title>
  <meta name="description" content="${personal.title || 'Official Social Media Profile and Links'}">
  <meta property="og:title" content="${candidateName} - Official Social Bio">
  <meta property="og:description" content="${personal.bio || personal.title}">
  <meta property="og:image" content="${personal.avatarUrl}">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Rajdhani:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Hind Siliguri', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
    }
    .font-tech {
      font-family: 'Rajdhani', 'Hind Siliguri', sans-serif;
    }
    .neon-glow {
      box-shadow: 0 0 20px ${theme.accentColor}40;
    }
    .neon-border:hover {
      box-shadow: 0 0 15px ${theme.accentColor}60;
    }
    @keyframes pulseGlow {
      0%, 100% { opacity: 0.8; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.03); }
    }
    .pulse-badge {
      animation: pulseGlow 2.5s infinite;
    }
  </style>
</head>
<body class="bg-gradient-to-br ${theme.bgGradient} min-h-screen text-slate-100 flex flex-col items-center py-6 px-3 sm:px-4 selection:bg-cyan-500 selection:text-black">

  <!-- Toast Feedback -->
  <div id="copyToast" class="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white border border-cyan-400 px-4 py-2 rounded-xl text-sm font-semibold shadow-2xl transition-all duration-300 opacity-0 pointer-events-none -translate-y-2 flex items-center gap-2">
    <span>✅ কপি সফল হয়েছে!</span>
  </div>

  <!-- Main Responsive Bio Container (Phone Mockup Frame in Center) -->
  <main class="w-full max-w-[480px] bg-slate-950/70 border border-slate-800/80 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl transition-all duration-300">
    
    <!-- Banner Cover -->
    <div class="relative h-36 sm:h-44 w-full bg-slate-800 overflow-hidden">
      ${personal.bannerUrl 
        ? `<img src="${personal.bannerUrl}" alt="Banner" class="w-full h-full object-cover opacity-80" />`
        : `<div class="w-full h-full bg-gradient-to-r from-cyan-900 via-indigo-900 to-purple-900"></div>`
      }
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30"></div>
      
      <!-- Top Action Status -->
      <div class="absolute top-3 right-3 flex items-center gap-2">
        ${personal.onlineStatus === 'gaming' ? `
          <span class="bg-red-500/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-md">
            <span class="w-2 h-2 rounded-full bg-white animate-ping"></span>
            ${personal.customStatusText || 'Playing Game'}
          </span>
        ` : personal.onlineStatus === 'streaming' ? `
          <span class="bg-purple-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-md">
            <span class="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            LIVE STREAM
          </span>
        ` : `
          <span class="bg-emerald-500/80 text-white text-[11px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
            Active
          </span>
        `}
      </div>
    </div>

    <!-- Profile Header & Avatar -->
    <div class="px-5 pt-0 pb-4 relative -mt-14 flex flex-col items-center text-center">
      
      <!-- Avatar -->
      <div class="relative group">
        <div class="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden p-1 bg-gradient-to-tr from-cyan-400 via-indigo-500 to-pink-500 shadow-xl">
          <img 
            src="${personal.avatarUrl || 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400'}" 
            alt="${candidateName}" 
            class="w-full h-full object-cover rounded-xl"
          />
        </div>
        ${personal.verifiedBadge ? `
          <div class="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1 rounded-full shadow-md border-2 border-slate-950" title="Verified Creator">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
          </div>
        ` : ''}
      </div>

      <!-- Names & Title -->
      <h1 class="text-xl sm:text-2xl font-bold mt-2.5 text-white tracking-tight flex items-center gap-1.5 justify-center">
        <span>${candidateName}</span>
      </h1>
      ${personal.handle ? `<p class="text-xs font-mono text-cyan-400 font-semibold mt-0.5">${personal.handle}</p>` : ''}
      ${personal.title ? `<p class="text-xs text-slate-300 font-medium mt-1 max-w-sm leading-relaxed">${personal.title}</p>` : ''}
      ${personal.location ? `<p class="text-[11px] text-slate-400 mt-1 flex items-center gap-1 justify-center">📍 ${personal.location}</p>` : ''}

      <!-- Bio Text -->
      ${personal.bio ? `
        <p class="text-xs text-slate-300 bg-slate-900/60 border border-slate-800 px-3.5 py-2 rounded-xl mt-2.5 leading-relaxed text-center max-w-sm">
          ${personal.bio}
        </p>
      ` : ''}

      <!-- Badges -->
      ${badges.length > 0 ? `
        <div class="flex flex-wrap gap-1.5 justify-center mt-3">
          ${badges.map(b => `
            <span class="text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${theme.badgeBg} flex items-center gap-1">
              ${b.text}
            </span>
          `).join('')}
        </div>
      ` : ''}
    </div>

    <!-- Content Sections -->
    <div class="px-5 pb-6 space-y-4">
      
      <!-- GAMING STATS CARD (Free Fire / PUBG) -->
      ${gamingStats.enabled && gamingStats.uid ? `
        <div class="bg-gradient-to-r from-orange-950/40 via-red-950/40 to-slate-900/80 border border-orange-500/40 rounded-2xl p-4 shadow-lg relative overflow-hidden">
          <div class="flex items-center justify-between mb-2.5">
            <div class="flex items-center gap-2">
              <span class="text-lg">🔥</span>
              <div>
                <h3 class="text-xs font-bold text-orange-400 uppercase tracking-wider">${gamingStats.gameName || 'Gamer Profile'}</h3>
                <p class="text-xs font-bold text-white font-mono">${gamingStats.inGameName || candidateName}</p>
              </div>
            </div>
            ${gamingStats.rank ? `<span class="text-[11px] font-bold text-yellow-400 bg-yellow-950/60 border border-yellow-500/40 px-2 py-0.5 rounded-lg">${gamingStats.rank}</span>` : ''}
          </div>

          <!-- UID Box with Copy Button -->
          <div class="bg-black/60 border border-orange-500/30 rounded-xl p-2.5 flex items-center justify-between gap-2">
            <div>
              <span class="text-[10px] text-slate-400 font-semibold block">PLAYER UID:</span>
              <span id="playerUidText" class="font-mono text-sm font-bold text-yellow-300 tracking-wider">${gamingStats.uid}</span>
            </div>
            <button 
              type="button" 
              onclick="copyUid('${gamingStats.uid}')"
              class="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-xs rounded-lg shadow-md transition-all active:scale-95 flex items-center gap-1"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>
              <span>UID কপি</span>
            </button>
          </div>

          <div class="grid grid-cols-2 gap-2 mt-2.5 text-[11px] text-slate-300">
            ${gamingStats.level ? `<div>লেভেল: <strong class="text-white">${gamingStats.level}</strong></div>` : ''}
            ${gamingStats.guildName ? `<div>গিল্ড: <strong class="text-white">${gamingStats.guildName}</strong></div>` : ''}
            ${gamingStats.favoriteGunOrRole ? `<div class="col-span-2">রোল/ফেভারিট: <strong class="text-orange-300">${gamingStats.favoriteGunOrRole}</strong></div>` : ''}
          </div>
        </div>
      ` : ''}

      <!-- SOCIAL MEDIA LINKS LIST -->
      <div class="space-y-2.5">
        <h2 class="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">সোশ্যাল লিংক ও প্ল্যাটফর্ম</h2>
        
        ${socialLinks.filter(s => s.enabled).map(s => `
          <a 
            href="${s.url}" 
            target="_blank" 
            rel="noopener noreferrer"
            class="group w-full flex items-center justify-between p-3 rounded-2xl ${theme.cardBg} border ${theme.cardBorder} transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl neon-border"
          >
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                ${getPlatformIconSvg(s.platform)}
              </div>
              <div class="min-w-0">
                <h3 class="font-bold text-xs sm:text-sm text-white group-hover:text-cyan-300 transition-colors truncate">
                  ${s.title}
                </h3>
                <p class="text-[11px] text-slate-400 truncate">
                  ${s.subtitle || s.username || s.url}
                </p>
              </div>
            </div>

            <div class="shrink-0 pl-2">
              <span class="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-xl bg-white/10 group-hover:bg-cyan-500 group-hover:text-slate-950 text-white transition-all">
                ${s.buttonText || 'ভিজিট'}
                <svg class="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
            </div>
          </a>
        `).join('')}
      </div>

      <!-- FEATURED YOUTUBE VIDEO -->
      ${featuredMedia.enabled && ytId ? `
        <div class="bg-slate-900/90 border border-red-500/40 rounded-2xl p-3.5 shadow-lg overflow-hidden">
          <div class="flex items-center gap-2 mb-2">
            <span class="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <h3 class="text-xs font-bold text-red-400 uppercase tracking-wider">${featuredMedia.title || 'ফিচার্ড ইউটিউব ভিডিও'}</h3>
          </div>
          <div class="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-slate-800">
            <iframe 
              src="https://www.youtube.com/embed/${ytId}" 
              title="${featuredMedia.title}" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
              class="w-full h-full"
            ></iframe>
          </div>
          ${featuredMedia.description ? `<p class="text-[11px] text-slate-400 mt-2">${featuredMedia.description}</p>` : ''}
        </div>
      ` : ''}

      <!-- HIGHLIGHTS / MOMENTS -->
      ${highlights.length > 0 ? `
        <div>
          <h2 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">হাইলাইটস ও মোমেন্টস</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
            ${highlights.map(h => `
              <div class="group relative rounded-xl overflow-hidden aspect-square border border-slate-800 bg-slate-900">
                <img src="${h.imageUrl}" alt="${h.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-2">
                  <h4 class="text-[11px] font-bold text-white leading-tight truncate">${h.title}</h4>
                  ${h.subtitle ? `<p class="text-[9px] text-cyan-300 truncate">${h.subtitle}</p>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- DIRECT CONTACT BUTTONS -->
      ${contact.enabled ? `
        <div class="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-xs font-bold text-cyan-400 uppercase tracking-wider">সরাসরি যোগাযোগ করুন</h3>
            <span class="text-[10px] text-slate-400">Direct Message</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            ${contact.whatsappNumber ? `
              <a 
                href="${whatsappHref}" 
                target="_blank" 
                rel="noopener noreferrer"
                class="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
              >
                ${getPlatformIconSvg('whatsapp')}
                <span>হোয়াটসঅ্যাপ মেসেজ</span>
              </a>
            ` : ''}

            ${contact.email ? `
              <a 
                href="mailto:${contact.email}" 
                class="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-all"
              >
                <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <span>ইমেইল পাঠান</span>
              </a>
            ` : ''}
          </div>

          ${contact.customNote ? `
            <p class="text-[10.5px] text-slate-400 italic text-center pt-1">
              "${contact.customNote}"
            </p>
          ` : ''}
        </div>
      ` : ''}

      <!-- QR CODE & SHARE -->
      ${showQrCode ? `
        <div class="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between gap-3">
          <div class="space-y-1">
            <h4 class="text-xs font-bold text-white">বন্ধুদের সাথে শেয়ার করুন</h4>
            <p class="text-[11px] text-slate-400">এই বায়ো পেজের লিংক এক ক্লিকে কপি করুন</p>
          </div>
          <button 
            type="button" 
            onclick="copyPageUrl()"
            class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <svg class="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
            <span>শেয়ার লিংক</span>
          </button>
        </div>
      ` : ''}

    </div>

    <!-- Footer -->
    <div class="px-5 py-4 bg-slate-950/90 border-t border-slate-900 text-center">
      <p class="text-[11px] text-slate-500">
        © ${new Date().getFullYear()} ${candidateName} • All Rights Reserved
      </p>
      <p class="text-[10px] text-slate-600 mt-0.5">
        Created with Social Bio Maker
      </p>
    </div>

  </main>

  <script>
    function copyUid(uid) {
      navigator.clipboard.writeText(uid).then(() => {
        showToast('✅ গেম UID কপি হয়েছে: ' + uid);
      });
    }

    function copyPageUrl() {
      navigator.clipboard.writeText(window.location.href).then(() => {
        showToast('🔗 প্রোফাইল লিংক কপি হয়েছে!');
      }).catch(() => {
        showToast('🔗 লিংক কপি করা হয়েছে');
      });
    }

    function showToast(msg) {
      var toast = document.getElementById('copyToast');
      if (toast) {
        toast.innerHTML = msg;
        toast.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-2');
        toast.classList.add('opacity-100', 'translate-y-0');
        setTimeout(function() {
          toast.classList.remove('opacity-100', 'translate-y-0');
          toast.classList.add('opacity-0', 'pointer-events-none', '-translate-y-2');
        }, 2200);
      }
    }
  </script>
</body>
</html>`;
}
