import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rdtvideodownloader.com';

  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/*?utm_',
        '/*?ref=',
      ],
      disallow: [
        '/api/', 
        '/_next/', 
        '/*?url=',     // Explicit protection for downloader queries
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
