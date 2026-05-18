import { MetadataRoute } from 'next';
import { getSortedPostsData } from '@/lib/markdown';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rdtvideodownloader.com';
  
  // Base pages
  const routes = [
    '',
    '/contact',
    '/about',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Helper to ensure valid date
  const getValidDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? new Date() : d;
  };

  // Legal pages
  const legalPosts = getSortedPostsData('legal');
  const legalRoutes = legalPosts.map((post) => ({
    url: `${baseUrl}/legal/${post.slug}`,
    lastModified: getValidDate(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  // Blog pages
  const blogPosts = getSortedPostsData('blog');
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/${post.slug}`,
    lastModified: getValidDate(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...routes, ...legalRoutes, ...blogRoutes];
}
