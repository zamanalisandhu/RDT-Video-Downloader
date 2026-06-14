import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rdtvideodownloader.com';
  const currentDate = new Date().toISOString();

  const sitemaps = [
    '/sitemap-main.xml',
    '/sitemap-blog.xml',
    '/sitemap-categories.xml',
    '/sitemap-legal.xml',
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps
    .map(
      (sitemap) => `
  <sitemap>
    <loc>${baseUrl}${sitemap}</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>`
    )
    .join('')}
</sitemapindex>`.trim();

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=59',
    },
  });
}
