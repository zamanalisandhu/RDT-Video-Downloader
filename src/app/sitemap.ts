import { MetadataRoute } from 'next';
import { getSortedPostsData } from '@/lib/markdown';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rdtvideodownloader.com';
  
  // Base pages
  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/contact', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/blog', priority: 0.8, changeFrequency: 'daily' as const },
  ].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
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
    priority: 0.3,
  }));

  // Category pages
  const categories = ['tutorials', 'tools', 'guides', 'troubleshooting'];
  const categoryRoutes = categories.map((cat) => ({
    url: `${baseUrl}/blog/category/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  // Blog pages (relocated to /blog/[slug])
  const blogPosts = getSortedPostsData('blog');
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: getValidDate(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...routes, ...categoryRoutes, ...legalRoutes, ...blogRoutes];
}
