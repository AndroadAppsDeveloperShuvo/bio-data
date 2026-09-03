import React from 'react';
import { GamingStats } from '../../types';
import { Flame, Shield, Trophy, Crosshair, Copy } from 'lucide-react';

interface GamingStatsEditorProps {
  gamingStats: GamingStats;
  onChange: (stats: GamingStats) => void;
}

const COMMON_GAMES = [
  'Garena Free Fire',
  'PUBG Mobile',
  'Valorant',
  'BGMI',
  'Call of Duty Mobile',
  'Mobile Legends',
  'GTA V / FiveM',
  'Roblox'
];

export const GamingStatsEditor: React.FC<GamingStatsEditorProps> = ({
  gamingStats,
  onChange
}) => {
  const handleChange = (field: keyof GamingStats, value: any) => {
    onChange({
      ...gamingStats,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      {/* Enable Toggle Card */}
      <div className="p-3.5 bg-gradient-to-r from-orange-100 to-amber-100 border-2 border-orange-300 rounded-2xl flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-orange-600 text-white rounded-xl shadow-xs">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-950">গেমিং প্রোফাইল ও প্লেয়ার UID কার্ড</h4>
            <p className="text-xs font-semibold text-slate-800">Free Fire / PUBG গেম আইডি, লেভেল ও র‍্যাংক প্রদর্শন করুন</p>
          </div>
        </div>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={gamingStats.enabled}
            onChange={(e) => handleChange('enabled', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
        </label>
      </div>

      {gamingStats.enabled && (
        <div className="p-4 bg-white border-2 border-slate-300 rounded-2xl space-y-3.5 shadow-sm">
          
          {/* Game Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-black text-slate-950 mb-1.5">
                গেমের নাম
              </label>
              <select
                value={gamingStats.gameName}
                onChange={(e) => handleChange('gameName', e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-600"
              >
                {COMMON_GAMES.map((g, idx) => (
                  <option key={idx} value={g}>{g}</option>
                ))}
                <option value="Custom Game">অন্যান্য গেম (Custom)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-950 mb-1.5">
                ইন-গেম নাম (Player IGN / Nickname) *
              </label>
              <input
                type="text"
                value={gamingStats.inGameName}
                onChange={(e) => handleChange('inGameName', e.target.value)}
                placeholder="যেমন: ⚡ 乂 ＳＨＵＶＯ 乂 ⚡"
                className="w-full px-3 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-600 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Player UID & Rank */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-black text-slate-950 mb-1.5 flex items-center justify-between">
                <span>প্লেয়ার UID / আইডি নাম্বার *</span>
                <span className="text-xs text-orange-700 font-extrabold">1-ক্লিক কপি সাপোর্ট</span>
              </label>
              <input
                type="text"
                value={gamingStats.uid}
                onChange={(e) => handleChange('uid', e.target.value)}
                placeholder="যেমন: 2111887942"
                className="w-full px-3 py-2 text-xs sm:text-sm font-mono font-black text-slate-950 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-600 placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-950 mb-1.5">
                বর্তমান র‍্যাংক (Rank / Tier)
              </label>
              <input
                type="text"
                value={gamingStats.rank}
                onChange={(e) => handleChange('rank', e.target.value)}
                placeholder="যেমন: Grandmaster ★★★★ / Heroic"
                className="w-full px-3 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-600 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Level & Guild */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-black text-slate-950 mb-1.5">
                প্লেয়ার লেভেল ও লাইক
              </label>
              <input
                type="text"
                value={gamingStats.level}
                onChange={(e) => handleChange('level', e.target.value)}
                placeholder="যেমন: Level 76 (Like: 35K)"
                className="w-full px-3 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-600 placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-950 mb-1.5">
                গিল্ড / ক্ল্যান নাম (Guild Name)
              </label>
              <input
                type="text"
                value={gamingStats.guildName}
                onChange={(e) => handleChange('guildName', e.target.value)}
                placeholder="যেমন: 『TEAM_LEGENDS』"
                className="w-full px-3 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-600 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Role / Favorite weapon */}
          <div>
            <label className="block text-xs font-black text-slate-950 mb-1.5">
              গেমিং রোল / প্রিয় গান (Role / Favorite Weapon)
            </label>
            <input
              type="text"
              value={gamingStats.favoriteGunOrRole || ''}
              onChange={(e) => handleChange('favoriteGunOrRole', e.target.value)}
              placeholder="যেমন: M1887 / AWM Rusher 🎯 / Sniper Specialist"
              className="w-full px-3 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-600 placeholder:text-slate-400"
            />
          </div>

        </div>
      )}
    </div>
  );
};
