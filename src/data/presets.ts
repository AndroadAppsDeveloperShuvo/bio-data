import { SocialBioState } from '../types';

export const GAMER_FREEFIRE_PRESET: SocialBioState = {
  personal: {
    name: 'SHUVO GAMING',
    handle: '@shuvo_ff_official',
    title: '🎮 Free Fire Esports Player & Content Creator',
    bio: '🔥 Welcome to my official Bio Page! Daily live streams, gameplay highlights, and tournaments. Join the family and connect with me across all socials!',
    location: 'Dhaka, Bangladesh 🇧🇩',
    avatarUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1000&auto=format&fit=crop&q=80',
    avatarShape: 'squircle',
    verifiedBadge: true,
    onlineStatus: 'gaming',
    customStatusText: 'Playing Free Fire 🎮'
  },
  badges: [
    { id: 'b1', text: '🎮 Free Fire Pro', color: '#f97316' },
    { id: 'b2', text: '🏆 Esports Grandmaster', color: '#eab308' },
    { id: 'b3', text: '🎬 100K+ Youtuber', color: '#ef4444' },
    { id: 'b4', text: '⚡ Live Streamer', color: '#06b6d4' }
  ],
  socialLinks: [
    {
      id: 's1',
      platform: 'youtube',
      title: 'YouTube Gaming Channel',
      url: 'https://youtube.com',
      username: '@ShuvoGamingLive',
      subtitle: '১ লক্ষ+ সাবস্ক্রাইবার • নতুন ভিডিও ও লাইভ স্ট্রিম',
      buttonText: 'সাবস্ক্রাইব করুন',
      isFeatured: true,
      enabled: true
    },
    {
      id: 's2',
      platform: 'facebook',
      title: 'Official Facebook Page',
      url: 'https://facebook.com',
      username: 'Shuvo Gaming BD',
      subtitle: 'ডেইলি হাইলাইটস, গিভঅ্যাওয়ে ও পোস্ট',
      buttonText: 'ফলো করুন',
      isFeatured: true,
      enabled: true
    },
    {
      id: 's3',
      platform: 'instagram',
      title: 'Instagram Reels & Photos',
      url: 'https://instagram.com',
      username: '@shuvo.ff',
      subtitle: 'ব্যক্তিগত লাইফস্টাইল ও শর্টস ভিডিও',
      buttonText: 'ফলো করুন',
      enabled: true
    },
    {
      id: 's4',
      platform: 'tiktok',
      title: 'TikTok Viral Clips',
      url: 'https://tiktok.com',
      username: '@shuvo_ff_clips',
      subtitle: 'সেরা ওয়ান-ট্যাপ হেডশট ক্লিপস',
      buttonText: 'ফলো করুন',
      enabled: true
    },
    {
      id: 's5',
      platform: 'discord',
      title: 'Discord Community Server',
      url: 'https://discord.com',
      username: 'TEAM SHUVO ESPORTS',
      subtitle: 'ফ্রি ফায়ার কাস্টম রুম ও ভয়েস চ্যাট',
      buttonText: 'জয়েন করুন',
      enabled: true
    },
    {
      id: 's6',
      platform: 'telegram',
      title: 'Telegram Official Channel',
      url: 'https://t.me',
      username: '@shuvogaming_channel',
      subtitle: 'গিভঅ্যাওয়ে নোটিশ ও রিডিম কোড আপডেট',
      buttonText: 'যুক্ত হোন',
      enabled: true
    }
  ],
  gamingStats: {
    enabled: true,
    gameName: 'Garena Free Fire',
    inGameName: '⚡ 乂 ＳＨＵＶＯ 乂 ⚡',
    uid: '2111887942',
    rank: 'Grandmaster ★★★★ (Top 1% BD)',
    level: 'Level 76 (Like: 35.4K)',
    guildName: '『TEAM_LEGENDS』(ID: 1009842)',
    serverRegion: 'Bangladesh Server',
    favoriteGunOrRole: 'M1887 / AWM Rusher 🎯'
  },
  featuredMedia: {
    enabled: true,
    type: 'youtube',
    title: '🔥 My Best Free Fire Tournament Gameplay 2026',
    description: 'ভিডিওটি দেখে ভালো লাগলে অবশ্যই সাবস্ক্রাইব ও লাইক করবেন!',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    embedId: 'dQw4w9WgXcQ'
  },
  highlights: [
    {
      id: 'h1',
      title: '🏆 Champion BD Cup',
      subtitle: 'Esports 2025',
      imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 'h2',
      title: '🎯 100K Silver Button',
      subtitle: 'YouTube Creator',
      imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 'h3',
      title: '🎮 Gaming Setup',
      subtitle: 'PC & ROG Phone',
      imageUrl: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=300&auto=format&fit=crop&q=80'
    }
  ],
  contact: {
    enabled: true,
    whatsappNumber: '+8801818000000',
    whatsappMessage: 'আসসালামু আলাইকুম শুভ ভাই! আমি আপনার বায়ো পেজ থেকে নক দিচ্ছি।',
    email: 'business.shuvogaming@gmail.com',
    telegramUsername: 'shuvo_gaming_admin',
    customNote: 'স্পনসরশিপ, প্রমোশন অথবা টুর্নামেন্ট ইনভাইটেশনের জন্য সরাসরি যোগাযোগ করুন।'
  },
  showQrCode: true
};

export const CREATOR_VLOGGER_PRESET: SocialBioState = {
  personal: {
    name: 'Afnan Chowdhury',
    handle: '@afnan_vlogs',
    title: '🎬 Travel & Tech Video Creator',
    bio: '🌟 Exploring beautiful Bangladesh & Tech Gadgets. Creating stories that inspire and connect. Welcome to my creative universe!',
    location: 'Sylhet & Dhaka, Bangladesh',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&auto=format&fit=crop&q=80',
    avatarShape: 'circle',
    verifiedBadge: true,
    onlineStatus: 'online',
    customStatusText: 'Editing New Travel Vlog 🎥'
  },
  badges: [
    { id: 'b1', text: '🎬 Video Creator', color: '#ef4444' },
    { id: 'b2', text: '✈️ Travel Blogger', color: '#3b82f6' },
    { id: 'b3', text: '📸 Photographer', color: '#a855f7' },
    { id: 'b4', text: '🎧 Podcaster', color: '#10b981' }
  ],
  socialLinks: [
    {
      id: 's1',
      platform: 'youtube',
      title: 'YouTube Main Channel',
      url: 'https://youtube.com',
      username: 'Afnan Vlogs BD',
      subtitle: 'সাপ্তাহিক ট্রাভেল ভ্লগ ও সিনেমাটিক ভিডিও',
      buttonText: 'ভিডিও দেখুন',
      isFeatured: true,
      enabled: true
    },
    {
      id: 's2',
      platform: 'facebook',
      title: 'Facebook Page & Community',
      url: 'https://facebook.com',
      username: 'Afnan Chowdhury Official',
      subtitle: 'ডেইলি স্টোরিজ ও লাইভ আড্ডা',
      buttonText: 'যুক্ত হোন',
      isFeatured: true,
      enabled: true
    },
    {
      id: 's3',
      platform: 'instagram',
      title: 'Instagram Photos & Stories',
      url: 'https://instagram.com',
      username: '@afnan.traveller',
      subtitle: 'সিনেমাটিক ট্রাভেল ফটোগ্রাফি',
      buttonText: 'ফলো করুন',
      enabled: true
    },
    {
      id: 's4',
      platform: 'tiktok',
      title: 'TikTok Mini Vlogs',
      url: 'https://tiktok.com',
      username: '@afnan_daily',
      subtitle: 'শর্ট ট্রাভেল মোমেন্টস',
      buttonText: 'ফলো করুন',
      enabled: true
    },
    {
      id: 's5',
      platform: 'spotify',
      title: 'Spotify Chill Playlist',
      url: 'https://spotify.com',
      username: 'Afnan Roadtrip Vibes',
      subtitle: 'ভ্রমণের প্রিয় গানসমূহ',
      buttonText: 'শুনুন',
      enabled: true
    }
  ],
  gamingStats: {
    enabled: false,
    gameName: 'Free Fire',
    inGameName: '',
    uid: '',
    rank: '',
    level: '',
    guildName: '',
    serverRegion: ''
  },
  featuredMedia: {
    enabled: true,
    type: 'youtube',
    title: '🌲 Exploring The Hidden Waterfalls of Sajek Valley',
    description: 'আমার সবশেষ ট্রাভেল এক্সপেরিয়েন্সের পুরো ভিডিওটি দেখতে পারেন!',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    embedId: 'dQw4w9WgXcQ'
  },
  highlights: [
    {
      id: 'h1',
      title: '🏔️ Sajek Tour',
      subtitle: 'Cinematic Vlog',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 'h2',
      title: '🌊 Cox’s Bazar',
      subtitle: 'Sunset Views',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop&q=80'
    }
  ],
  contact: {
    enabled: true,
    whatsappNumber: '+8801700000000',
    whatsappMessage: 'হ্যালো আফনান ভাই! আপনার কাজের বিষয়ে কথা বলতে চাচ্ছিলাম।',
    email: 'contact.afnanvlogs@gmail.com',
    telegramUsername: 'afnan_official',
    customNote: 'ব্র্যান্ড কোলাবোরেশন ও স্পনসরশিপের জন্য যোগাযোগ করুন।'
  },
  showQrCode: true
};

export const DEVELOPER_TECH_PRESET: SocialBioState = {
  personal: {
    name: 'Tanvir Hasan',
    handle: '@tanvir_codes',
    title: '💻 Full-Stack Developer & Tech Enthusiast',
    bio: '🚀 Building modern web apps with React, Node.js & TypeScript. Open source contributor, tech writer and gamer in free time!',
    location: 'Dhaka, Bangladesh',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&auto=format&fit=crop&q=80',
    avatarShape: 'rounded',
    verifiedBadge: true,
    onlineStatus: 'online',
    customStatusText: 'Coding Next Big Thing 🚀'
  },
  badges: [
    { id: 'b1', text: '💻 Full-Stack Dev', color: '#3b82f6' },
    { id: 'b2', text: '⚛️ React & Node', color: '#06b6d4' },
    { id: 'b3', text: '🐙 Open Source', color: '#a855f7' },
    { id: 'b4', text: '📱 UI/UX Lover', color: '#10b981' }
  ],
  socialLinks: [
    {
      id: 's1',
      platform: 'github',
      title: 'GitHub Repositories',
      url: 'https://github.com',
      username: 'tanvir-hasan-dev',
      subtitle: '৫০+ ওপেন সোর্স প্রজেক্ট ও কোড লাইব্রেরি',
      buttonText: 'কোড দেখুন',
      isFeatured: true,
      enabled: true
    },
    {
      id: 's2',
      platform: 'linkedin',
      title: 'LinkedIn Professional Profile',
      url: 'https://linkedin.com',
      username: 'Tanvir Hasan',
      subtitle: 'ক্যারিয়ার হিস্টোরি ও প্রফেশনাল নেটওয়ার্ক',
      buttonText: 'কানেক্ট করুন',
      isFeatured: true,
      enabled: true
    },
    {
      id: 's3',
      platform: 'facebook',
      title: 'Facebook Profile',
      url: 'https://facebook.com',
      username: 'Tanvir Hasan',
      subtitle: 'টেক আলোচনা ও দৈনন্দিন ভাবনা',
      buttonText: 'ফলো করুন',
      enabled: true
    },
    {
      id: 's4',
      platform: 'youtube',
      title: 'YouTube Coding Tutorials',
      url: 'https://youtube.com',
      username: 'Tanvir Tech Lab',
      subtitle: 'বাংলায় ওয়েব ডেভেলপমেন্ট ও প্রজেক্ট টিউটোরিয়াল',
      buttonText: 'সাবস্ক্রাইব',
      enabled: true
    },
    {
      id: 's5',
      platform: 'twitter',
      title: 'X (Twitter) Tech Threads',
      url: 'https://twitter.com',
      username: '@tanvir_codes',
      subtitle: 'দৈনিক ওয়েব ডেভ টিপস ও নিউজ',
      buttonText: 'ফলো করুন',
      enabled: true
    }
  ],
  gamingStats: {
    enabled: false,
    gameName: '',
    inGameName: '',
    uid: '',
    rank: '',
    level: '',
    guildName: '',
    serverRegion: ''
  },
  featuredMedia: {
    enabled: false,
    type: 'youtube',
    title: '',
    url: ''
  },
  highlights: [
    {
      id: 'h1',
      title: '🚀 Portfolio 2026',
      subtitle: 'Live Projects',
      imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=300&auto=format&fit=crop&q=80'
    }
  ],
  contact: {
    enabled: true,
    whatsappNumber: '+8801900000000',
    whatsappMessage: 'Hello Tanvir, I would like to discuss a project with you.',
    email: 'tanvir.dev.bd@gmail.com',
    telegramUsername: 'tanvir_dev',
    customNote: 'ফ্রিল্যান্সিং প্রজেক্ট অথবা ফুল-টাইম কাজের জন্য যোগাযোগ করুন।'
  },
  showQrCode: true
};
