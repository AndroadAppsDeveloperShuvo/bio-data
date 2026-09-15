import { SocialBioState } from '../types';

export const DEFAULT_SHUVO_PRESET: SocialBioState = {
  personal: {
    name: '⚡ 乂 ＳＨＵＶＯ 乂 ⚡',
    handle: '@shuvo_bhai_444',
    title: '💻 Full-Stack Developer & Tech Enthusiast',
    bio: '🚀 Building modern web apps with React, Node.js & TypeScript. Open source contributor, tech writer and gamer in free time!',
    location: 'Natore, Bangladesh',
    avatarUrl: 'https://i.ibb.co/pvmtN0Bv/20260827-18.jpg',
    bannerUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&auto=format&fit=crop&q=80',
    avatarShape: 'squircle',
    verifiedBadge: true,
    onlineStatus: 'online',
    customStatusText: 'Coding Next Big Thing 🚀'
  },
  badges: [
    { id: 'b1', text: '💻 Full-Stack Dev', color: '#3b82f6' },
    { id: 'b2', text: '⚡ Pro Gamer', color: '#f97316' },
    { id: 'b3', text: '🚀 Tech Creator', color: '#06b6d4' },
    { id: 'b4', text: '🔥 Shuvo Official', color: '#ec4899' }
  ],
  socialLinks: [
    {
      id: 's1',
      platform: 'facebook',
      title: 'Facebook Profile / Page',
      url: 'https://www.facebook.com/share/1c63KeYHxt/',
      username: '@shuvo_bhai_444',
      subtitle: 'অফিসিয়াল ফেসবুক প্রোফাইল ও পেজ',
      buttonText: 'যুক্ত হোন',
      isFeatured: true,
      enabled: true
    },
    {
      id: 's2',
      platform: 'telegram',
      title: 'Telegram Channel / Inbox',
      url: 'https://t.me/djhakar007ff',
      username: '@djhakar007ff',
      subtitle: 'টেলিগ্রাম চ্যানেল ও মেসেজ ইনবক্স',
      buttonText: 'যুক্ত হোন',
      isFeatured: true,
      enabled: true
    },
    {
      id: 's3',
      platform: 'youtube',
      title: 'YouTube Gaming / Vlogs',
      url: 'https://youtube.com/@lovewithsong',
      username: '@lovewithsong',
      subtitle: 'নতুন ভিডিও, ভ্লগ ও কনটেন্ট',
      buttonText: 'সাবস্ক্রাইব',
      isFeatured: true,
      enabled: true
    },
    {
      id: 's4',
      platform: 'whatsapp',
      title: 'Direct WhatsApp Chat',
      url: 'https://wa.me/8801778526313',
      username: '+8801778526313',
      subtitle: 'সরাসরি হোয়াটসঅ্যাপে দ্রুত মেসেজ দিন',
      buttonText: 'চ্যাট করুন',
      isFeatured: false,
      enabled: true
    },
    {
      id: 's5',
      platform: 'instagram',
      title: 'Instagram Photos & Reels',
      url: 'https://instagram.com/fbuser0007',
      username: '@fbuser0007',
      subtitle: 'ইনস্টাগ্রাম ফটো ও রিলস',
      buttonText: 'ফলো করুন',
      isFeatured: false,
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
    guildName: '『TEAM_SHUVO』',
    serverRegion: 'Bangladesh Server',
    favoriteGunOrRole: 'AWM / M1887 Rusher 🎯'
  },
  featuredMedia: {
    enabled: true,
    type: 'youtube',
    title: '🔥 Love With Song - YouTube Channel',
    description: 'আমার ইউটিউব চ্যানেলে নতুন ভিডিও ও কনটেন্ট দেখতে সাবস্ক্রাইব করুন!',
    url: 'https://youtube.com/@lovewithsong',
    embedId: ''
  },
  highlights: [
    {
      id: 'h1',
      title: '⚡ Shuvo Official Uploader',
      subtitle: 'Web Image Uploader',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&auto=format&fit=crop&q=80',
      linkUrl: 'https://androadappsdevelopershuvo.github.io/web_image_uploader/WEB%20IMAGE%20UPLOAS.html'
    }
  ],
  contact: {
    enabled: true,
    whatsappNumber: '+8801778526313',
    whatsappMessage: 'আসসালামু আলাইকুম শুভ ভাই! আপনার বায়ো পেজ দেখে যোগাযোগ করছি।',
    email: 'freefirelover2111887942@gmail.com',
    telegramUsername: 'djhakar007ff',
    customNote: 'যেকোনো প্রজেক্ট, কলাবোরেশন বা টেক প্রয়োজনে সরাসরি যোগাযোগ করুন।'
  },
  showQrCode: true,
  shareSettings: {
    enabled: true,
    title: 'বন্ধুদের সাথে শেয়ার করুন',
    subtitle: 'এই বায়ো পেজের লিংক এক ক্লিকে কপি করুন',
    customShareUrl: 'https://bio-data-ochre.vercel.app',
    buttonText: 'শেয়ার লিংক'
  }
};

export const GAMER_FREEFIRE_PRESET: SocialBioState = {
  ...DEFAULT_SHUVO_PRESET,
  personal: {
    ...DEFAULT_SHUVO_PRESET.personal,
    title: '🎮 Free Fire Esports Player & Streamer',
    bio: '🔥 Welcome to my official Free Fire Bio Page! Daily live streams, highlights & tournament updates. Connect with me across all socials!',
    onlineStatus: 'gaming',
    customStatusText: 'Playing Free Fire 🎮'
  },
  badges: [
    { id: 'b1', text: '🎮 Free Fire Pro', color: '#f97316' },
    { id: 'b2', text: '🏆 Esports Grandmaster', color: '#eab308' },
    { id: 'b3', text: '🎬 Content Creator', color: '#ef4444' },
    { id: 'b4', text: '⚡ Live Streamer', color: '#06b6d4' }
  ]
};

export const CREATOR_VLOGGER_PRESET: SocialBioState = {
  ...DEFAULT_SHUVO_PRESET,
  personal: {
    ...DEFAULT_SHUVO_PRESET.personal,
    title: '🎬 YouTube Video Creator & Tech Vlogger',
    bio: '🌟 Tech reviews, modern web apps and creative video creation. Welcome to my creative bio hub!',
    onlineStatus: 'streaming',
    customStatusText: 'Editing New Video 🎥'
  },
  badges: [
    { id: 'b1', text: '🎬 Video Creator', color: '#ef4444' },
    { id: 'b2', text: '💻 Full-Stack Dev', color: '#3b82f6' },
    { id: 'b3', text: '📸 Content Creator', color: '#a855f7' },
    { id: 'b4', text: '🎧 Tech Reviewer', color: '#10b981' }
  ]
};

export const DEVELOPER_TECH_PRESET: SocialBioState = {
  ...DEFAULT_SHUVO_PRESET
};
