import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rdtvideodownloader.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/', 
        '/_next/', 
        '/*?*',        // Protect crawl budget by disallowing any URL with query parameters
        '/*?url=',     // Explicit protection for downloader queries
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
