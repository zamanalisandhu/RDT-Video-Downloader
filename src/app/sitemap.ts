import { MetadataRoute } from 'next';
import { getSortedPostsData as getBlogPosts } from '@/lib/blog';
import { getSortedPostsData as getLegalPosts } from '@/lib/markdown';

export const revalidate = 3600; // Cache sitemap for 1 hour for fast crawling

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rdtvideodownloader.com';
  const currentDate = new Date();

  // 1. Main Pages
  const mainRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: currentDate, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/contact`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.8 },
  ];

  // 2. WordPress Blog Posts
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogPosts = await getBlogPosts('blog');
    blogRoutes = blogPosts.map((post) => {
      const d = new Date(post.date);
      const lastMod = isNaN(d.getTime()) ? currentDate : d;
      return {
        url: `${baseUrl}/${post.slug}`,
        lastModified: lastMod,
        changeFrequency: 'weekly',
        priority: 0.8,
      };
    });
  } catch (error) {
    console.error('Error generating blog sitemap routes:', error);
  }

  // 3. Legal Pages (Local markdown)
  let legalRoutes: MetadataRoute.Sitemap = [];
  try {
    const legalPosts = getLegalPosts('legal');
    legalRoutes = legalPosts.map((post) => {
      const d = new Date(post.date);
      const lastMod = isNaN(d.getTime()) ? currentDate : d;
      return {
        url: `${baseUrl}/legal/${post.slug}`,
        lastModified: lastMod,
        changeFrequency: 'monthly',
        priority: 0.3,
      };
    });
  } catch (error) {
    console.error('Error generating legal sitemap routes:', error);
  }

  return [...mainRoutes, ...blogRoutes, ...legalRoutes];
}
