import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSortedPostsData } from '@/lib/markdown';
import BlogHero from '@/components/BlogHero';
import BlogList from '@/components/BlogList';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import { Tag } from 'lucide-react';
import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rdtvideodownloader.com';

export const metadata: Metadata = {
  title: "Blog - RDT Video Downloader",
  description: "Guides, tips, and updates about downloading Reddit videos, audio, and images.",
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
};

export default function BlogPage() {
  const posts = getSortedPostsData('blog');

  const categories = [
    { name: 'All Articles', slug: '' },
    { name: 'Tutorials', slug: 'tutorials' },
    { name: 'Tools', slug: 'tools' },
    { name: 'Guides', slug: 'guides' },
    { name: 'Troubleshooting', slug: 'troubleshooting' }
  ];

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <BlogHero />
      
      <div className="flex-grow py-6">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Breadcrumbs trail */}
          <Breadcrumbs items={[{ label: 'Blog' }]} />

          {/* Category Filter Bar */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4 text-slate-500 text-sm font-bold uppercase tracking-wider">
              <Tag size={16} className="text-brand-orange" />
              <span>Filter by Category</span>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => {
                const isAll = category.slug === '';
                const href = isAll ? '/blog' : `/blog/category/${category.slug}`;
                
                return (
                  <Link
                    key={category.slug}
                    href={href}
                    className={`px-6 py-3 rounded-2xl font-bold text-sm border transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                      isAll
                        ? 'bg-slate-900 border-slate-900 text-white hover:bg-slate-800'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-brand-orange/30 hover:text-brand-orange'
                    }`}
                  >
                    {category.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <BlogList posts={posts} />
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
