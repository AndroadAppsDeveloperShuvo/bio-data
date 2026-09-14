/**
 * ImgBB and Image URL Resolver Utilities
 * Handles converting ImgBB viewer links (ibb.co/xxx), HTML embed codes,
 * BBCodes, and Markdown into clean, direct image URLs (i.ibb.co/xxx).
 */

/**
 * Extracts a direct image URL from rich text/code snippets:
 * - HTML embed: <a href="..."><img src="https://i.ibb.co/..." /></a>
 * - BBCode: [img]https://i.ibb.co/...[/img] or [url=...][img]...[/img][/url]
 * - Markdown: [![alt](https://i.ibb.co/...)](...)
 * - Raw direct links: https://i.ibb.co/...
 */
export function extractDirectImageUrl(rawInput: string): string {
  if (!rawInput) return '';
  const trimmed = rawInput.trim();

  // 1. Check for HTML <img> tag with src
  const htmlImgMatch = trimmed.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (htmlImgMatch && htmlImgMatch[1]) {
    return htmlImgMatch[1].trim();
  }

  // 2. Check for BBCode [img]...[/img]
  const bbCodeMatch = trimmed.match(/\[img\](.*?)\[\/img\]/i);
  if (bbCodeMatch && bbCodeMatch[1]) {
    return bbCodeMatch[1].trim();
  }

  // 3. Check for Markdown ![...](...)
  const mdMatch = trimmed.match(/!\[.*?\]\((https?:\/\/[^\s\)]+)\)/i);
  if (mdMatch && mdMatch[1]) {
    return mdMatch[1].trim();
  }

  // 4. Check if text contains a direct i.ibb.co or i.ibb.co.com URL anywhere inside
  const directIbbMatch = trimmed.match(/https?:\/\/i\.ibb\.co(?:\.com)?\/[a-zA-Z0-9_\-\.\/]+/i);
  if (directIbbMatch && directIbbMatch[0]) {
    return directIbbMatch[0].trim();
  }

  // 5. If wrapped in quotes, unquote it
  const unquoted = trimmed.replace(/^["']|["']$/g, '');
  return unquoted;
}

/**
 * Checks if the given URL is an ImgBB viewer page URL (like https://ibb.co/xyz or https://ibb.co.com/xyz)
 * rather than a direct raw image link (i.ibb.co/xyz).
 */
export function isImgBBViewerUrl(url: string): boolean {
  if (!url) return false;
  const clean = extractDirectImageUrl(url);
  // If it's already direct i.ibb.co, it's not a viewer page
  if (clean.includes('i.ibb.co') || clean.includes('i.ibb.co.com')) {
    return false;
  }
  // Check for ibb.co or ibb.co.com or imgbb.com viewer paths
  const viewerPattern = /https?:\/\/(?:www\.)?(?:ibb\.co|ibb\.co\.com|imgbb\.com)\/[a-zA-Z0-9]+/i;
  return viewerPattern.test(clean);
}

/**
 * Resolves an ImgBB viewer URL or image URL to its direct image file URL.
 * First extracts any embed code, then resolves via local API proxy,
 * and falls back to public CORS proxy if needed.
 */
export async function resolveImageUrl(inputUrl: string): Promise<{
  success: boolean;
  directUrl: string;
  source: 'direct' | 'embed_extracted' | 'api_resolved' | 'cors_resolved' | 'fallback';
  message?: string;
}> {
  if (!inputUrl) {
    return { success: false, directUrl: '', source: 'fallback', message: 'URL খালি' };
  }

  // Step 1: Extract if embed code was pasted
  const extracted = extractDirectImageUrl(inputUrl);

  // If it was an embed code or already has direct i.ibb.co
  if (extracted !== inputUrl.trim() && (extracted.includes('i.ibb.co') || extracted.match(/\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/i))) {
    return {
      success: true,
      directUrl: extracted,
      source: 'embed_extracted',
      message: 'এমবেড কোড থেকে সরাসরি ইমেজ লিংক নেওয়া হয়েছে'
    };
  }

  // If already direct image link (i.ibb.co or ending with image extension)
  if (extracted.includes('i.ibb.co') || extracted.includes('i.ibb.co.com')) {
    return {
      success: true,
      directUrl: extracted,
      source: 'direct',
      message: 'ImgBB সরাসরি ইমেজ লিংক'
    };
  }

  // If it's not an ImgBB viewer URL, return as is
  if (!isImgBBViewerUrl(extracted)) {
    return {
      success: true,
      directUrl: extracted,
      source: 'direct'
    };
  }

  // Step 2: It's an ImgBB viewer URL (e.g., https://ibb.co/xyz).
  // Try local backend resolver endpoint
  try {
    const apiRes = await fetch(`/api/resolve-image?url=${encodeURIComponent(extracted)}`, {
      headers: { Accept: 'application/json' }
    });
    if (apiRes.ok) {
      const data = await apiRes.json();
      if (data.directUrl) {
        return {
          success: true,
          directUrl: data.directUrl,
          source: 'api_resolved',
          message: 'ImgBB ভিউয়ার থেকে আসল ছবি নেওয়া হয়েছে'
        };
      }
    }
  } catch {
    // Backend fetch failed, continue to fallback
  }

  // Step 3: Client-side CORS proxy fallback
  try {
    const corsProxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(extracted)}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const corsRes = await fetch(corsProxyUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (corsRes.ok) {
      const html = await corsRes.text();
      // Match og:image
      const ogMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
        || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
      if (ogMatch && ogMatch[1]) {
        return {
          success: true,
          directUrl: ogMatch[1],
          source: 'cors_resolved',
          message: 'ImgBB আসল ছবি সফলভাবে লোড হয়েছে'
        };
      }

      // Match i.ibb.co in html
      const ibbMatch = html.match(/https?:\/\/i\.ibb\.co(?:\.com)?\/[^\s"']+\.(?:jpg|jpeg|png|webp|gif)/i);
      if (ibbMatch && ibbMatch[0]) {
        return {
          success: true,
          directUrl: ibbMatch[0],
          source: 'cors_resolved',
          message: 'ImgBB আসল ছবি সফলভাবে লোড হয়েছে'
        };
      }
    }
  } catch {
    // CORS proxy timed out or failed
  }

  // If could not resolve to direct, return extracted URL
  return {
    success: false,
    directUrl: extracted,
    source: 'fallback',
    message: 'লিংকটি রূপান্তর করা যায়নি, অনুগ্রহ করে ImgBB থেকে "Direct link" কপি করুন।'
  };
}
