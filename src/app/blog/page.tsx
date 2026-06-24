import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSortedPostsData } from '@/lib/blog';
import BlogHero from '@/components/BlogHero';
import BlogList from '@/components/BlogList';
import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rdtvideodownloader.com';

export const metadata: Metadata = {
  title: "Blog - RDT Video Downloader",
  description: "Guides, tips, and updates about downloading Reddit videos, audio, and images.",
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
};

export default async function BlogPage() {
  const posts = await getSortedPostsData('blog');


  return (
    <>
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
