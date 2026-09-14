import React, { useState } from 'react';
import { SocialBioState, BioTheme, SocialPlatform } from '../../types';
import { 
  Flame, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  Play, 
  MessageCircle, 
  Mail, 
  Send,
  Share2,
  QrCode,
  MapPin,
  Sparkles
} from 'lucide-react';
import { extractYouTubeId } from '../../utils/htmlGenerator';

interface SocialBioCardProps {
  state: SocialBioState;
  theme: BioTheme;
  onOpenExport?: () => void;
}

export const SocialBioCard: React.FC<SocialBioCardProps> = ({
  state,
  theme,
  onOpenExport
}) => {
  const { personal, badges, socialLinks, gamingStats, featuredMedia, highlights, contact, showQrCode } = state;
  const [copiedUid, setCopiedUid] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const candidateName = personal.name || 'Your Name / IGN';
  const ytId = featuredMedia.enabled && featuredMedia.url ? (extractYouTubeId(featuredMedia.url) || featuredMedia.embedId) : null;

  const handleCopyUid = (uid: string) => {
    navigator.clipboard.writeText(uid);
    setCopiedUid(true);
    setTimeout(() => setCopiedUid(false), 2000);
  };

  const handleCopyPageUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Platform icon helper with colors
  const renderPlatformIcon = (platform: SocialPlatform) => {
    switch (platform) {
      case 'facebook':
        return (
          <svg className="w-5 h-5 text-blue-500 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        );
      case 'youtube':
        return (
          <svg className="w-5 h-5 text-red-500 fill-current" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        );
      case 'instagram':
        return (
          <svg className="w-5 h-5 text-pink-500 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.13-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        );
      case 'tiktok':
        return (
          <svg className="w-5 h-5 text-cyan-400 fill-current" viewBox="0 0 24 24">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
          </svg>
        );
      case 'whatsapp':
        return (
          <svg className="w-5 h-5 text-emerald-400 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
        );
      case 'telegram':
        return (
          <svg className="w-5 h-5 text-sky-400 fill-current" viewBox="0 0 24 24">
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.942z"/>
          </svg>
        );
      case 'discord':
        return (
          <svg className="w-5 h-5 text-indigo-400 fill-current" viewBox="0 0 24 24">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
          </svg>
        );
      default:
        return <ExternalLink className="w-5 h-5 text-cyan-400" />;
    }
  };

  const whatsappHref = contact.whatsappNumber 
    ? `https://wa.me/${contact.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(contact.whatsappMessage || 'Hello!')}`
    : '#';

  return (
    <div className={`w-full max-w-[440px] mx-auto rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 border border-slate-800/80 ${theme.textColor}`}>
      
      {/* Banner */}
      <div className="relative h-36 w-full bg-slate-800 overflow-hidden">
        {personal.bannerUrl ? (
          <img 
            src={personal.bannerUrl} 
            alt="Cover" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-85" 
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-cyan-900 via-indigo-900 to-purple-900"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/30"></div>

        {/* Top Status */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          {personal.onlineStatus === 'gaming' ? (
            <span className="bg-red-500/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-md">
              <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              {personal.customStatusText || 'Playing Game'}
            </span>
          ) : personal.onlineStatus === 'streaming' ? (
            <span className="bg-purple-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-md">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              LIVE STREAM
            </span>
          ) : (
            <span className="bg-emerald-500/80 text-white text-[11px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              Active
            </span>
          )}
        </div>
      </div>

      {/* Header Profile Info */}
      <div className="px-5 pt-0 pb-3 relative -mt-14 flex flex-col items-center text-center">
        
        {/* Avatar */}
        <div className="relative group">
          <div className="w-24 h-24 rounded-2xl overflow-hidden p-1 bg-gradient-to-tr from-cyan-400 via-indigo-500 to-pink-500 shadow-xl">
            <img 
              src={personal.avatarUrl || 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400'} 
              alt={candidateName} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          {personal.verifiedBadge && (
            <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1 rounded-full shadow-md border-2 border-slate-950" title="Verified">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          )}
        </div>

        {/* Name, Handle, Title */}
        <h1 className="text-2xl font-black mt-2.5 text-white tracking-tight flex items-center gap-1.5 justify-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          <span>{candidateName}</span>
        </h1>
        {personal.handle && <p className="text-xs font-mono text-cyan-300 font-bold mt-0.5 tracking-wide">{personal.handle}</p>}
        {personal.title && <p className="text-xs text-slate-100 font-bold mt-1 max-w-xs drop-shadow-sm leading-relaxed">{personal.title}</p>}
        {personal.location && (
          <p className="text-xs text-slate-200 font-semibold mt-1 flex items-center gap-1 justify-center">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>{personal.location}</span>
          </p>
        )}

        {/* Bio */}
        {personal.bio && (
          <p className="text-xs text-slate-100 bg-slate-950/90 border-2 border-slate-700/80 px-4 py-2.5 rounded-xl mt-2.5 leading-relaxed text-center max-w-xs shadow-lg font-medium">
            {personal.bio}
          </p>
        )}

        {/* Badges */}
        {badges.length > 0 && (
          <div className="flex flex-wrap gap-1.5 justify-center mt-3">
            {badges.map(b => (
              <span key={b.id} className={`text-xs font-bold px-3 py-1 rounded-full ${theme.badgeBg} shadow-xs`}>
                {b.text}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="px-5 pb-6 space-y-3.5">
        
        {/* GAMING STATS CARD */}
        {gamingStats.enabled && gamingStats.uid && (
          <div className="bg-gradient-to-r from-orange-950/60 via-red-950/50 to-slate-950 border-2 border-orange-500/50 rounded-2xl p-4 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
                <div>
                  <h3 className="text-xs font-black text-orange-400 uppercase tracking-wider">{gamingStats.gameName || 'Gamer Profile'}</h3>
                  <p className="text-sm font-black text-white font-mono">{gamingStats.inGameName || candidateName}</p>
                </div>
              </div>
              {gamingStats.rank && (
                <span className="text-xs font-black text-yellow-300 bg-yellow-950 border-2 border-yellow-400/60 px-2.5 py-1 rounded-lg shadow-sm">
                  {gamingStats.rank}
                </span>
              )}
            </div>

            {/* UID with 1-Click Copy */}
            <div className="bg-black/80 border-2 border-orange-500/40 rounded-xl p-2.5 flex items-center justify-between gap-2">
              <div>
                <span className="text-[10px] text-slate-300 font-bold block">PLAYER UID:</span>
                <span className="font-mono text-sm font-black text-yellow-300 tracking-wider">{gamingStats.uid}</span>
              </div>
              <button 
                type="button" 
                onClick={() => handleCopyUid(gamingStats.uid)}
                className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-black text-xs rounded-lg shadow-md transition-all active:scale-95 flex items-center gap-1.5"
              >
                {copiedUid ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedUid ? 'কপি হয়েছে!' : 'UID কপি'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1.5 mt-2.5 text-xs text-slate-200">
              {gamingStats.level && <div>লেভেল: <strong className="text-white font-black">{gamingStats.level}</strong></div>}
              {gamingStats.guildName && <div>গিল্ড: <strong className="text-white font-black">{gamingStats.guildName}</strong></div>}
              {gamingStats.favoriteGunOrRole && (
                <div className="col-span-2 text-xs text-orange-300 font-bold">
                  রোল/গান: <strong>{gamingStats.favoriteGunOrRole}</strong>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SOCIAL LINKS */}
        <div className="space-y-2.5">
          <h2 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider px-1">সোশ্যাল লিংক ও মিডিয়া</h2>
          {socialLinks.filter(s => s.enabled).map(s => (
            <a 
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group w-full flex items-center justify-between p-3 rounded-2xl ${theme.cardBg} border-2 ${theme.cardBorder} transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  {renderPlatformIcon(s.platform)}
                </div>
                <div className="min-w-0">
                  <h3 className="font-extrabold text-xs sm:text-sm text-white group-hover:text-cyan-300 transition-colors truncate">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-200 font-medium truncate">
                    {s.subtitle || s.username || s.url}
                  </p>
                </div>
              </div>

              <div className="shrink-0 pl-2">
                <span className="inline-flex items-center gap-1 text-xs font-black px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 shadow-md group-hover:bg-cyan-400 transition-all">
                  <span>{s.buttonText || 'ভিজিট'}</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* FEATURED YOUTUBE VIDEO EMBED */}
        {featuredMedia.enabled && ytId && (
          <div className="bg-slate-950 border-2 border-red-500/50 rounded-2xl p-3.5 shadow-xl overflow-hidden">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <h3 className="text-xs font-extrabold text-red-400 uppercase tracking-wider">{featuredMedia.title || 'ফিচার্ড ইউটিউব ভিডিও'}</h3>
            </div>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-slate-800">
              <iframe 
                src={`https://www.youtube.com/embed/${ytId}`}
                title={featuredMedia.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            {featuredMedia.description && <p className="text-xs text-slate-200 font-medium mt-2">{featuredMedia.description}</p>}
          </div>
        )}

        {/* HIGHLIGHTS */}
        {highlights.length > 0 && (
          <div>
            <h2 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider mb-2 px-1">হাইলাইটস ও ফটোস</h2>
            <div className="grid grid-cols-2 gap-2">
              {highlights.map(h => {
                const hasLink = Boolean(h.linkUrl && h.linkUrl.trim() !== '');
                const cardInner = (
                  <>
                    <img 
                      src={h.imageUrl} 
                      alt={h.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-2">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs font-extrabold text-white leading-tight truncate">{h.title}</h4>
                        {hasLink && (
                          <span className="shrink-0 p-1 rounded-md bg-cyan-500/90 text-slate-950 shadow-xs group-hover:scale-110 transition-transform" title="লিংক ওপেন করুন">
                            <ExternalLink className="w-2.5 h-2.5 stroke-[2.5]" />
                          </span>
                        )}
                      </div>
                      {h.subtitle && <p className="text-[10px] text-cyan-200 font-semibold truncate">{h.subtitle}</p>}
                    </div>
                  </>
                );

                return hasLink ? (
                  <a 
                    key={h.id} 
                    href={h.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative rounded-xl overflow-hidden aspect-video border-2 border-slate-700 hover:border-cyan-400 bg-slate-900 shadow-md transition-all block cursor-pointer active:scale-[0.98]"
                    title={`${h.title} - লিংকে যেতে ক্লিক করুন`}
                  >
                    {cardInner}
                  </a>
                ) : (
                  <div 
                    key={h.id} 
                    className="group relative rounded-xl overflow-hidden aspect-video border-2 border-slate-700 bg-slate-900 shadow-md select-none"
                  >
                    {cardInner}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* DIRECT CONTACT */}
        {contact.enabled && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border-2 border-slate-700 space-y-2.5 shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-cyan-300 uppercase tracking-wider">সরাসরি যোগাযোগ করুন</h3>
              <span className="text-[10px] text-slate-300 font-semibold">Direct Message</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {contact.whatsappNumber && (
                <a 
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp মেসেজ</span>
                </a>
              )}

              {contact.email && (
                <a 
                  href={`mailto:${contact.email}`}
                  className="flex items-center justify-center gap-2 py-2.5 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border-2 border-slate-600 transition-all"
                >
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>ইমেইল পাঠান</span>
                </a>
              )}
            </div>

            {contact.customNote && (
              <p className="text-xs text-slate-200 font-medium italic text-center pt-1">
                "{contact.customNote}"
              </p>
            )}
          </div>
        )}

        {/* SHARE & QR CODE BOX */}
        {showQrCode && (
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border-2 border-slate-700 flex items-center justify-between gap-3 shadow-md">
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-white">বন্ধুদের সাথে শেয়ার করুন</h4>
              <p className="text-xs text-slate-300 font-medium">আপনার সোশ্যাল বায়ো লিংক কপি করুন</p>
            </div>
            <button 
              type="button" 
              onClick={handleCopyPageUrl}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{copiedLink ? 'কপি হয়েছে' : 'শেয়ার লিংক'}</span>
            </button>
          </div>
        )}

      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-slate-950/90 border-t border-slate-900 text-center">
        <p className="text-xs text-slate-400 font-medium">
          © {new Date().getFullYear()} {candidateName} • All Rights Reserved
        </p>
      </div>

    </div>
  );
};
