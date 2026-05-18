/**
 * Reddit Video Downloader API Client
 * 
 * Direct browser-to-Cloudflare-Worker integration.
 * No Vercel API routes used — all calls bypass Vercel for zero bandwidth.
 */

// ============================================================================
// URL CONSTRUCTION (Bulletproof)
// ============================================================================

/**
 * Get clean base URL with no trailing slashes
 */
function getBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL || 'https://rdtapidownload.techiesline.workers.dev';
  // Remove ALL trailing slashes
  return url.replace(/\/+$/, '');
}

/**
 * Build full API endpoint URL
 */
function buildEndpoint(path: string): string {
  const base = getBaseUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

/**
 * Direct API call to the worker. 
 * Bypasses Vercel entirely for zero bandwidth/load on the Vercel server.
 */
async function workerRequest<T>(
  path: string,
  payload: Record<string, unknown>
): Promise<{ ok: true; data: T } | { ok: false; status?: number; errorText: string }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(buildEndpoint(path), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (response.ok) {
      const data = (await response.json()) as T;
      return { ok: true, data };
    }

    return {
      ok: false,
      status: response.status,
      errorText: await response.text(),
    };
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      return { ok: false, errorText: 'Request timed out. Please try again.' };
    }
    return {
      ok: false,
      errorText: error instanceof Error ? error.message : 'Network error. Check your connection.',
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

const API_TIMEOUT = Number.parseInt(
  process.env.NEXT_PUBLIC_API_TIMEOUT || '30000',
  10
);

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface VideoFormat {
  quality: string;
  height?: number;
  width?: number;
  url?: string;
  ext?: string;
  isPrimary?: boolean;
}

export interface GalleryImage {
  url: string;
  width?: number;
  height?: number;
  ext?: string;
}

export interface VideoInfo {
  success: boolean;
  title?: string;
  author?: string;
  subreddit?: string;
  duration?: number;
  thumbnail?: string;
  permalink?: string;
  type?: 'video' | 'gif' | 'gallery' | 'image' | 'external' | 'audio';
  videoId?: string;
  hasAudio?: boolean;
  audioUrl?: string;
  dashUrl?: string;
  hlsUrl?: string;
  formats?: VideoFormat[];
  images?: GalleryImage[];
  imageCount?: number;
  isCrosspost?: boolean;
  externalUrl?: string;
  provider?: string;
  cached?: boolean;
  error?: string;
}

export interface DownloadResponse {
  success: boolean;
  downloadUrl?: string;
  audioUrl?: string;
  filename?: string;
  quality?: string;
  hasAudio?: boolean;
  type?: string;
  title?: string;
  author?: string;
  duration?: number;
  images?: GalleryImage[];
  error?: string;
}

// ============================================================================
// API CALLS
// ============================================================================

/**
 * Fetch video metadata and quality options from Reddit
 */
export async function fetchVideoInfo(url: string): Promise<VideoInfo> {
  const result = await workerRequest<VideoInfo>(
    '/api/video-info',
    {
      url: url.trim(),
      platform: 'reddit',
      audioOnly: false,
    }
  );

  if (!result.ok) {
    console.error(`Video info request failed (${result.status ?? 'network'}):`, result.errorText);
    return {
      success: false,
      error: result.status
        ? `API error: ${result.status}. Try again or check the URL.`
        : result.errorText,
    };
  }

  return result.data;
}

/**
 * Get download URL for specific video quality
 */
export async function getDownloadUrl(
  url: string,
  quality: number | string,
  audioOnly: boolean = false
): Promise<DownloadResponse> {
  const result = await workerRequest<DownloadResponse>(
    '/api/download',
    {
      url: url.trim(),
      quality,
      ext: 'mp4',
      audioOnly,
    }
  );

  if (!result.ok) {
    return {
      success: false,
      error: result.status ? `Download failed: ${result.status}` : result.errorText,
    };
  }

  return result.data;
}

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * Validate Reddit URL format
 */
export function isValidRedditUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;

  const patterns = [
    /^https?:\/\/(www\.|old\.|m\.|np\.)?reddit\.com\//i,
    /^https?:\/\/redd\.it\//i,
    /^https?:\/\/v\.redd\.it\//i,
  ];

  return patterns.some(pattern => pattern.test(url.trim()));
}

/**
 * Format error message for user display
 */
export function formatErrorMessage(error: string): string {
  if (!error) return 'Something went wrong';

  const errorMap: Record<string, string> = {
    'Invalid Reddit URL': 'Please enter a valid Reddit URL',
    'Post not found': 'This post was deleted or is private',
    'No video found': 'No video found in this post',
    'Rate limit exceeded': 'Too many requests. Please wait a moment.',
    'Request timed out': 'Connection timed out. Try again.',
  };

  for (const [key, message] of Object.entries(errorMap)) {
    if (error.includes(key)) return message;
  }

  return error;
}
