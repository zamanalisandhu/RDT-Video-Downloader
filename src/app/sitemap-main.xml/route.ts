import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rdtvideodownloader.com';
  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'daily' },
    { path: '/contact', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/blog', priority: 0.8, changeFrequency: 'daily' },
  ];

  const currentDate = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map(
      (route) => `
  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`
    )
    .join('')}
</urlset>`.trim();

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=59',
    },
  });
}
