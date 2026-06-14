import { NextResponse } from 'next/server';
import { getSortedPostsData } from '@/lib/markdown';

export const dynamic = 'force-static';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rdtvideodownloader.com';
  
  const getValidDateStr = (dateStr: string) => {
    const d = new Date(dateStr);
    const validDate = isNaN(d.getTime()) ? new Date() : d;
    return validDate.toISOString().split('T')[0];
  };

  const legalPosts = getSortedPostsData('legal');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${legalPosts
    .map(
      (post) => `
  <url>
    <loc>${baseUrl}/legal/${post.slug}</loc>
    <lastmod>${getValidDateStr(post.date)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
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
