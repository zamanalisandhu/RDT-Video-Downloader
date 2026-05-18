import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSortedPostsData } from '@/lib/markdown';
import BlogHero from '@/components/BlogHero';
import BlogList from '@/components/BlogList';

export const metadata = {
  title: "Blog - RDT Video Downloader",
  description: "Guides, tips, and updates about downloading Reddit videos, audio, and images.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  const posts = getSortedPostsData('blog');

  return (
    <main className="min-h-screen flex flex-col bg-slate-50/50">
      <Header />
      <BlogHero />
      <div className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <BlogList posts={posts} />
        </div>
      </div>
      <Footer />
    </main>
  );
}


