import type { Metadata } from 'next';

const SITE_URL = 'https://rdtvideodownloader.com';
const SITE_NAME = 'RDT Video Downloader';

interface PageSEOOptions {
  title: string;
  description: string;
  path: string;                    // e.g., "/about", "/blog/category/guides"
  ogType?: 'website' | 'article';  // default: "website"
  image?: string;                  // optional custom OG image URL
  publishedTime?: string;          // for articles (ISO date)
  modifiedTime?: string;           // for articles (ISO date)
  authors?: string[];              // for articles
}

export function pageSEO(options: PageSEOOptions): Metadata {
  const {
    title,
    description,
    path,
    ogType = 'website',
    image,
    publishedTime,
    modifiedTime,
    authors,
  } = options;

  // Normalize path — ensure leading slash, no trailing slash (except root)
  const normalizedPath = path === '/' ? '' : path.replace(/\/$/, '');
  const fullUrl = `${SITE_URL}${normalizedPath}`;
  const ogImage = image || `${SITE_URL}/opengraph-image`;
  const twitterImage = image || `${SITE_URL}/twitter-image`;

  return {
    title,
    description,
    alternates: {
      canonical: fullUrl,
      languages: {
        'en': fullUrl,
        'x-default': fullUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: SITE_NAME,
      type: ogType,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(ogType === 'article' && {
        publishedTime,
        modifiedTime,
        authors: authors || ['RDT Editorial Team'],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [twitterImage],
    },
  };
}

// Helper for the homepage root (uses root URL)
export function homepageSEO(title: string, description: string): Metadata {
  return pageSEO({
    title,
    description,
    path: '/',
    ogType: 'website',
  });
}

// Helper for blog article pages
export function articleSEO(options: {
  title: string;
  description: string;
  path: string;
  publishedTime: string;
  modifiedTime?: string;
  authors?: string[];
  image?: string;
}): Metadata {
  return pageSEO({
    ...options,
    ogType: 'article',
  });
}
