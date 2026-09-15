import { SocialBioState, SocialLink, ProfileBadge, HighlightItem } from '../types';
import { DEFAULT_SHUVO_PRESET } from '../data/presets';

export interface ParseHtmlResult {
  success: boolean;
  state?: SocialBioState;
  themeId?: string;
  error?: string;
  importSource?: 'embedded_metadata' | 'dom_extracted';
  detectedFieldsCount?: number;
}

export function parseBioHtml(htmlString: string): ParseHtmlResult {
  if (!htmlString || typeof htmlString !== 'string' || htmlString.trim().length === 0) {
    return { success: false, error: 'ফাইলটিতে কোনো কনটেন্ট পাওয়া যায়নি।' };
  }

  // 1. Try to find embedded JSON metadata in <script id="bio-profile-data">
  const embeddedMatch = htmlString.match(/<script[^>]*id=["']bio-profile-data["'][^>]*>([\s\S]*?)<\/script>/i);
  if (embeddedMatch && embeddedMatch[1]) {
    try {
      const rawJson = embeddedMatch[1].trim();
      const parsed = JSON.parse(rawJson);
      
      const candidateState: SocialBioState = parsed.state || parsed;

      if (candidateState && (candidateState.personal || candidateState.socialLinks)) {
        // Deep merge with DEFAULT_SHUVO_PRESET to ensure all required fields exist
        const mergedState: SocialBioState = {
          ...DEFAULT_SHUVO_PRESET,
          ...candidateState,
          personal: {
            ...DEFAULT_SHUVO_PRESET.personal,
            ...(candidateState.personal || {})
          },
          badges: Array.isArray(candidateState.badges) ? candidateState.badges : DEFAULT_SHUVO_PRESET.badges,
          socialLinks: Array.isArray(candidateState.socialLinks) ? candidateState.socialLinks : DEFAULT_SHUVO_PRESET.socialLinks,
          gamingStats: {
            ...DEFAULT_SHUVO_PRESET.gamingStats,
            ...(candidateState.gamingStats || {})
          },
          featuredMedia: {
            ...DEFAULT_SHUVO_PRESET.featuredMedia,
            ...(candidateState.featuredMedia || {})
          },
          highlights: Array.isArray(candidateState.highlights) ? candidateState.highlights : DEFAULT_SHUVO_PRESET.highlights,
          contact: {
            ...DEFAULT_SHUVO_PRESET.contact,
            ...(candidateState.contact || {})
          },
          showQrCode: candidateState.showQrCode ?? true,
          shareSettings: candidateState.shareSettings || DEFAULT_SHUVO_PRESET.shareSettings
        };

        return {
          success: true,
          state: mergedState,
          themeId: parsed.themeId,
          importSource: 'embedded_metadata',
          detectedFieldsCount: Object.keys(mergedState.personal).length + mergedState.socialLinks.length
        };
      }
    } catch (err) {
      console.warn('Embedded JSON parse error, trying DOM fallback:', err);
    }
  }

  // 2. DOM Parser Fallback for HTML files generated earlier or edited by hand
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    // Name & Title
    const h1El = doc.querySelector('h1');
    const titleEl = doc.querySelector('title');
    let extractedName = h1El ? h1El.textContent?.trim() : '';
    if (!extractedName && titleEl) {
      extractedName = titleEl.textContent?.split('-')[0]?.trim() || '';
    }

    // Handle (e.g. @shuvo_bhai_444)
    let extractedHandle = '';
    const allTextEls = Array.from(doc.querySelectorAll('p, span, div, h2, h3'));
    for (const el of allTextEls) {
      const text = el.textContent?.trim() || '';
      if (text.startsWith('@') && text.length <= 35 && !text.includes(' ')) {
        extractedHandle = text;
        break;
      }
    }

    // Subtitle / Title
    const titleCandidates = doc.querySelectorAll('h3, p');
    let extractedTitle = '';
    for (const el of Array.from(titleCandidates)) {
      const text = el.textContent?.trim() || '';
      if (text.length > 5 && text.length < 90 && (text.includes('Developer') || text.includes('Pro') || text.includes('Creator') || text.includes('Gamer') || text.includes('💻') || text.includes('🎮'))) {
        extractedTitle = text;
        break;
      }
    }

    // Bio Text
    let extractedBio = '';
    for (const el of Array.from(doc.querySelectorAll('p'))) {
      const text = el.textContent?.trim() || '';
      if (text.length > 25 && text.length < 300 && !text.includes('কপি করুন') && !text.includes('ক্লিক করুন')) {
        extractedBio = text;
        break;
      }
    }

    // Avatar & Banner
    let extractedAvatar = '';
    let extractedBanner = '';
    const imgs = Array.from(doc.querySelectorAll('img'));
    for (const img of imgs) {
      const src = img.getAttribute('src') || '';
      const alt = (img.getAttribute('alt') || '').toLowerCase();
      if (!src) continue;
      if (alt.includes('avatar') || alt.includes('profile') || alt.includes('অবতার') || alt.includes('প্রোফাইল')) {
        extractedAvatar = src;
      } else if (alt.includes('banner') || alt.includes('cover') || alt.includes('ব্যানার')) {
        extractedBanner = src;
      } else if (!extractedAvatar && (src.includes('ibb.co') || src.includes('avatar') || img.className.includes('rounded-full') || img.className.includes('rounded-3xl'))) {
        extractedAvatar = src;
      }
    }

    // Location
    let extractedLocation = '';
    for (const el of allTextEls) {
      const text = el.textContent?.trim() || '';
      if (text.includes('Bangladesh') || text.includes('Dhaka') || text.includes('Natore') || text.includes('বাংলাদেশ')) {
        extractedLocation = text;
        break;
      }
    }

    // Social Links
    const extractedLinks: SocialLink[] = [];
    const anchorEls = Array.from(doc.querySelectorAll('a[href]'));
    const seenUrls = new Set<string>();

    for (const a of anchorEls) {
      const href = a.getAttribute('href')?.trim() || '';
      if (!href || href === '#' || href.startsWith('javascript:') || seenUrls.has(href)) continue;
      
      let platform: SocialLink['platform'] = 'custom';
      let title = a.querySelector('h4, span, div')?.textContent?.trim() || a.textContent?.trim() || 'Social Link';
      
      if (href.includes('facebook.com')) {
        platform = 'facebook';
        if (title === 'Social Link') title = 'Facebook Profile';
      } else if (href.includes('t.me') || href.includes('telegram')) {
        platform = 'telegram';
        if (title === 'Social Link') title = 'Telegram Channel';
      } else if (href.includes('youtube.com') || href.includes('youtu.be')) {
        platform = 'youtube';
        if (title === 'Social Link') title = 'YouTube Channel';
      } else if (href.includes('wa.me') || href.includes('whatsapp.com')) {
        platform = 'whatsapp';
        if (title === 'Social Link') title = 'WhatsApp Chat';
      } else if (href.includes('instagram.com')) {
        platform = 'instagram';
        if (title === 'Social Link') title = 'Instagram';
      } else if (href.includes('github.com')) {
        platform = 'github';
        if (title === 'Social Link') title = 'GitHub';
      } else if (href.includes('tiktok.com')) {
        platform = 'tiktok';
        if (title === 'Social Link') title = 'TikTok';
      } else if (href.includes('discord.gg') || href.includes('discord.com')) {
        platform = 'discord';
        if (title === 'Social Link') title = 'Discord Server';
      } else {
        continue; // skip other random anchors like scripts/back-to-top
      }

      seenUrls.add(href);
      extractedLinks.push({
        id: 'imported_' + Math.random().toString(36).substring(2, 7),
        platform,
        title,
        url: href,
        username: href.split('/').filter(Boolean).pop() || '',
        buttonText: 'যুক্ত হোন',
        enabled: true,
        isFeatured: extractedLinks.length < 3
      });
    }

    // Share link extraction from scripts
    let extractedShareUrl = '';
    const scriptTexts = Array.from(doc.querySelectorAll('script')).map(s => s.textContent || '').join('\n');
    const shareUrlMatch = scriptTexts.match(/customTargetShareUrl\s*=\s*["']([^"']+)["']/);
    if (shareUrlMatch && shareUrlMatch[1]) {
      extractedShareUrl = shareUrlMatch[1];
    }

    // Construct recovered state
    const recoveredState: SocialBioState = {
      ...DEFAULT_SHUVO_PRESET,
      personal: {
        ...DEFAULT_SHUVO_PRESET.personal,
        name: extractedName || DEFAULT_SHUVO_PRESET.personal.name,
        handle: extractedHandle || DEFAULT_SHUVO_PRESET.personal.handle,
        title: extractedTitle || DEFAULT_SHUVO_PRESET.personal.title,
        bio: extractedBio || DEFAULT_SHUVO_PRESET.personal.bio,
        avatarUrl: extractedAvatar || DEFAULT_SHUVO_PRESET.personal.avatarUrl,
        bannerUrl: extractedBanner || DEFAULT_SHUVO_PRESET.personal.bannerUrl,
        location: extractedLocation || DEFAULT_SHUVO_PRESET.personal.location
      },
      socialLinks: extractedLinks.length > 0 ? extractedLinks : DEFAULT_SHUVO_PRESET.socialLinks,
      shareSettings: {
        ...DEFAULT_SHUVO_PRESET.shareSettings!,
        customShareUrl: extractedShareUrl || DEFAULT_SHUVO_PRESET.shareSettings?.customShareUrl || ''
      }
    };

    return {
      success: true,
      state: recoveredState,
      importSource: 'dom_extracted',
      detectedFieldsCount: extractedLinks.length + (extractedName ? 1 : 0) + (extractedAvatar ? 1 : 0)
    };

  } catch (err: any) {
    return {
      success: false,
      error: `HTML ফাইল প্রসেস করতে সমস্যা হয়েছে: ${err?.message || 'অজানা ত্রুটি'}`
    };
  }
}
