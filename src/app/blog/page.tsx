import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSortedPostsData } from '@/lib/blog';
import BlogHero from '@/components/BlogHero';
import BlogList from '@/components/BlogList';
import JsonLd from '@/components/JsonLd';
import { pageSEO } from '@/lib/seo';
import { Metadata } from 'next';

export const metadata: Metadata = pageSEO({
  title: "Blog — Reddit Saving Tips, Guides & Tutorials | RDT",
  description: "Weekly guides on downloading Reddit videos with sound, saving Reddit GIFs as MP4, archiving gallery posts, and fixing silent video issues. Step-by-step tutorials for iPhone, Android, and PC.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getSortedPostsData('blog');
  const siteUrl = 'https://rdtvideodownloader.com';

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "RDT Video Downloader Blog",
    "url": `${siteUrl}/blog`,
    "description": "Guides, tips, and updates about downloading Reddit videos, audio, and images.",
    "publisher": {
      "@type": "Organization",
      "name": "RDT Video Downloader",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    },
    "blogPost": posts.map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "url": `${siteUrl}/${post.slug}`,
      "datePublished": post.date,
      "dateModified": post.date,
      "author": {
        "@type": "Organization",
        "name": "RDT Editorial Team"
      },
      "image": post.image ? (post.image.startsWith('http') ? post.image : `${siteUrl}${post.image.startsWith('/') ? '' : '/'}${post.image}`) : `${siteUrl}/og-image.jpg`
    }))
  };

  return (
    <>
      <JsonLd data={blogSchema as Record<string, unknown>} />
      <Header />
      <main className="min-h-screen flex flex-col flex-grow bg-white">
        <BlogHero />
        
        <div className="flex-grow pb-16 pt-4">
          <div className="container mx-auto px-4 max-w-[1200px]">
            <BlogList posts={posts} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
