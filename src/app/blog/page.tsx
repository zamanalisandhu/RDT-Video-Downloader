import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSortedPostsData } from '@/lib/blog';
import BlogHero from '@/components/BlogHero';
import BlogList from '@/components/BlogList';
import JsonLd from '@/components/JsonLd';
import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rdtvideodownloader.com';

export const metadata: Metadata = {
  title: "Blog",
  description: "Guides, tips, and updates about downloading Reddit videos, audio, and images.",
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    title: "Blog | RDT Video Downloader",
    description: "Guides, tips, and updates about downloading Reddit videos, audio, and images.",
    url: `${siteUrl}/blog`,
    type: "website",
    siteName: "RDT Video Downloader",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Blog | RDT Video Downloader",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Blog | RDT Video Downloader",
    description: "Guides, tips, and updates about downloading Reddit videos, audio, and images.",
    images: [`${siteUrl}/og-image.jpg`],
  },
};

export default async function BlogPage() {
  const posts = await getSortedPostsData('blog');

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
          <div className="container mx-auto px-4 max-w-6xl">
            <BlogList posts={posts} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
