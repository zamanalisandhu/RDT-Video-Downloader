/* eslint-disable @typescript-eslint/no-explicit-any */
import { PostData } from '@/types';
import { getSortedPostsData as getLocalSortedPosts, getPostData as getLocalPost } from './markdown';

/**
 * Robustly decodes HTML entities into human-readable characters.
 */
export function decodeHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—')
    .replace(/&nbsp;/g, ' ')
    // Decimal entities
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)))
    // Hex entities
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

/**
 * Custom fetch with timeout to prevent Vercel build hangs when headless WordPress is slow.
 */
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 8000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

/**
 * Extracts the featured image from a WordPress post, supporting fallback custom keys
 * and a high-quality colorful gradient placeholder from Unsplash.
 */
function getFeaturedImage(wpPost: any): string {
  // 1. Try standard embedded media
  let url = wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  
  // 2. Try fallback custom keys
  if (!url) {
    url = wpPost.featured_image_url || wpPost.featured_image_src || wpPost.featured_media_src_url;
  }
  
  // 3. Verify it's a valid http(s) URL
  if (typeof url === 'string' && url.trim().startsWith('http')) {
    return url.trim();
  }
  
  // 4. Default fallback colorful gradient placeholder image
  return 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=800';
}

/**
 * Helper to extract RankMath SEO description from raw head string.
 */
function extractRankMathDescription(head: string): string | null {
  if (!head) return null;
  const match = head.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i) ||
                head.match(/<meta\s+content=["']([\s\S]*?)["']\s+name=["']description["']/i);
  return match ? match[1] : null;
}

/**
 * Helper to extract RankMath SEO title from raw head string.
 */
function extractRankMathTitle(head: string): string | null {
  if (!head) return null;
  const match = head.match(/<title>([\s\S]*?)<\/title>/i);
  return match ? match[1] : null;
}

/**
 * Maps a raw WordPress API post object to the PostData interface.
 */
function mapWpPostToPostData(wpPost: any, rankMathHead?: string | null): PostData {
  const id = wpPost.id;
  const slug = wpPost.slug;
  const rawTitle = wpPost.title?.rendered || '';
  const rawExcerpt = wpPost.excerpt?.rendered || '';
  const rawContent = wpPost.content?.rendered || '';
  const isoDate = wpPost.date || new Date().toISOString();
  
  // Parse WordPress ISO date to 'YYYY-MM-DD'
  const date = isoDate.split('T')[0];
  
  const title = decodeHtml(rawTitle);
  const excerpt = decodeHtml(rawExcerpt.replace(/<[^>]*>/g, '').trim());
  const contentHtml = decodeHtml(rawContent);
  const image = getFeaturedImage(wpPost);
  
  // Extract author name from embed or use fallback (clean generic author names for E-E-A-T guidelines)
  const rawAuthor = wpPost._embedded?.author?.[0]?.name || 'RDT Editorial Team';
  const author = (rawAuthor.toLowerCase() === 'admin' || rawAuthor.toLowerCase() === 'rdt admin')
    ? 'RDT Editorial Team'
    : rawAuthor;
  
  // Extract categories and tags
  const termsList = wpPost._embedded?.['wp:term']?.flat() || [];
  const categoryTerm = termsList.find((term: any) => term.taxonomy === 'category' && term.name !== 'Uncategorized');
  const categoryName = categoryTerm ? decodeHtml(categoryTerm.name) : undefined;
  const tags = termsList
    .filter((term: any) => term.taxonomy === 'post_tag')
    .map((term: any) => decodeHtml(term.name));
  
  // Calculate dynamic reading time (200 words/minute average)
  const cleanText = rawContent.replace(/<[^>]*>/g, '').trim();
  const wordsCount = cleanText.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.round(wordsCount / 200));

  // Meta tags (supporting RankMath SEO first, then Yoast, otherwise falling back)
  let metaTitle = title;
  let metaDescription = excerpt;

  if (rankMathHead) {
    const rmTitle = extractRankMathTitle(rankMathHead);
    const rmDesc = extractRankMathDescription(rankMathHead);
    if (rmTitle) metaTitle = decodeHtml(rmTitle);
    if (rmDesc) metaDescription = decodeHtml(rmDesc);
  } else if (wpPost.yoast_head_json?.title) {
    metaTitle = decodeHtml(wpPost.yoast_head_json.title);
    if (wpPost.yoast_head_json.description) {
      metaDescription = decodeHtml(wpPost.yoast_head_json.description);
    }
  }

  // Clean title metadata by stripping out " - admin" and " - My Blog" from WordPress SEO outputs
  metaTitle = metaTitle
    .replace(/\s*-\s*My\s*Blog/gi, '')
    .replace(/\s*-\s*admin/gi, '')
    .trim();

  // Extract custom FAQs if available
  const faqs = wpPost.faqs || [];

  return {
    id,
    slug,
    title,
    date,
    excerpt,
    author,
    image,
    contentHtml,
    category: 'blog',
    categoryName,
    tags,
    readingTime,
    metaTitle,
    metaDescription,
    faqs,
  };
}

export async function getSortedPostsData(category: 'blog' | 'legal' = 'blog'): Promise<PostData[]> {
  if (category === 'legal') {
    return getLocalSortedPosts('legal');
  }
  
  try {
    const res = await fetchWithTimeout('https://admin.rdtvideodownloader.com/wp-json/wp/v2/posts?_embed&per_page=100', {
      next: { revalidate: 10 } // Incremental Static Regeneration (10 seconds)
    }, 8000);
    
    if (!res.ok) {
      console.error(`Failed to fetch WordPress posts: ${res.status} ${res.statusText}`);
      return [];
    }
    
    const wpPosts = await res.json();
    if (!Array.isArray(wpPosts)) {
      return [];
    }
    
    const mappedPosts = wpPosts.map((wpPost) => {
      return mapWpPostToPostData(wpPost, null);
    });
 
    return mappedPosts.sort((a, b) => {
      if (a.date < b.date) return 1;
      if (a.date > b.date) return -1;
      return 0;
    });
  } catch (error) {
    console.error('Error fetching sorted WordPress posts:', error);
    return [];
  }
}

/**
 * Fetches a single post by slug (or local markdown for legal docs).
 */
export async function getPostData(slug: string, category: 'blog' | 'legal' = 'blog'): Promise<PostData> {
  if (category === 'legal') {
    return getLocalPost(slug, 'legal');
  }
  
  const res = await fetchWithTimeout(`https://admin.rdtvideodownloader.com/wp-json/wp/v2/posts?_embed&slug=${slug}`, {
    next: { revalidate: 10 } // Incremental Static Regeneration (10 seconds)
  }, 8000);
  
  if (!res.ok) {
    throw new Error(`Failed to fetch WordPress post: ${res.status} ${res.statusText}`);
  }
  
  const wpPosts = await res.json();
  if (!Array.isArray(wpPosts) || wpPosts.length === 0) {
    throw new Error(`WordPress post not found for slug: ${slug}`);
  }
  
  const wpPost = wpPosts[0];
  let rankMathHead: string | null = null;
  if (wpPost.link) {
    try {
      const rmRes = await fetchWithTimeout(`https://admin.rdtvideodownloader.com/wp-json/rankmath/v1/getHead?url=${encodeURIComponent(wpPost.link)}`, {
        next: { revalidate: 10 }
      }, 4000);
      if (rmRes.ok) {
        const rmData = await rmRes.json();
        if (rmData.success && rmData.head) {
          rankMathHead = rmData.head;
        }
      }
    } catch (e) {
      console.error(`Error fetching RankMath head for slug ${slug}:`, e);
    }
  }

  return mapWpPostToPostData(wpPost, rankMathHead);
}
