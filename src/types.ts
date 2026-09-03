export type SocialPlatform = 
  | 'facebook'
  | 'youtube'
  | 'instagram'
  | 'tiktok'
  | 'whatsapp'
  | 'telegram'
  | 'discord'
  | 'twitter'
  | 'github'
  | 'linkedin'
  | 'spotify'
  | 'twitch'
  | 'snapchat'
  | 'website'
  | 'custom';

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  title: string;
  url: string;
  username?: string;
  subtitle?: string;
  buttonText?: string;
  iconName?: string;
  customColor?: string;
  isFeatured?: boolean;
  enabled: boolean;
}

export interface ProfileBadge {
  id: string;
  text: string;
  icon?: string;
  color?: string;
}

export interface GamingStats {
  enabled: boolean;
  gameName: string; // 'Free Fire' | 'PUBG Mobile' | 'Valorant' | 'Custom'
  inGameName: string; // e.g. "⚡ 乂 ＳＨＵＶＯ 乂 ⚡"
  uid: string; // e.g. "2111887942"
  rank: string; // e.g. "Grandmaster / Heroic ★★★"
  level: string; // e.g. "Level 72"
  guildName: string; // e.g. "TEAM_BD_LEGENDS"
  serverRegion: string; // e.g. "Bangladesh / South Asia"
  favoriteGunOrRole?: string; // e.g. "Sniper / Rusher"
}

export interface FeaturedMedia {
  enabled: boolean;
  type: 'youtube' | 'image' | 'spotify';
  title: string;
  description?: string;
  url: string; // e.g. https://www.youtube.com/watch?v=...
  embedId?: string;
}

export interface HighlightItem {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  linkUrl?: string;
}

export interface DirectContact {
  enabled: boolean;
  whatsappNumber?: string; // 88017...
  whatsappMessage?: string;
  email?: string;
  telegramUsername?: string;
  callNumber?: string;
  customNote?: string;
}

export interface PersonalInfo {
  name: string;
  handle: string; // e.g. @shuvo_gamer
  title: string; // e.g. "Content Creator & Free Fire Esports Player"
  bio: string; // Multi-line bio text
  location: string; // e.g. "Dhaka, Bangladesh"
  avatarUrl: string;
  bannerUrl: string;
  avatarShape: 'circle' | 'rounded' | 'squircle';
  verifiedBadge: boolean;
  onlineStatus: 'online' | 'gaming' | 'streaming' | 'offline';
  customStatusText?: string;
}

export interface SocialBioState {
  personal: PersonalInfo;
  badges: ProfileBadge[];
  socialLinks: SocialLink[];
  gamingStats: GamingStats;
  featuredMedia: FeaturedMedia;
  highlights: HighlightItem[];
  contact: DirectContact;
  showQrCode: boolean;
}

export interface BioTheme {
  id: string;
  name: string;
  nameBn: string;
  category: 'gamer' | 'minimal' | 'gradient' | 'glass' | 'neon' | 'cyber';
  bgGradient: string;
  cardBg: string;
  cardBorder: string;
  textColor: string;
  subTextColor: string;
  accentColor: string;
  accentHover: string;
  buttonStyle: 'gradient' | 'glass' | 'solid' | 'neon-glow' | 'minimal-outline';
  badgeBg: string;
  fontFamily: 'sans' | 'display' | 'tech';
}
