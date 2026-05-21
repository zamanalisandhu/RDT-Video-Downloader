import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogList from '@/components/BlogList';
import Breadcrumbs, { BreadcrumbItem } from '@/components/Breadcrumbs';
import { getSortedPostsData } from '@/lib/markdown';
import { Metadata } from 'next';
import { BookOpen } from 'lucide-react';

interface CategoryPageParams {
  params: { slug: string };
}

function getCategoryDisplayName(slug: string): string {
  const map: Record<string, string> = {
    'tutorials': 'Tutorials',
    'tools': 'Tools',
    'guides': 'Guides',
    'troubleshooting': 'Troubleshooting'
  };
  return map[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
}

export async function generateStaticParams() {
  return [
    { slug: 'tutorials' },
    { slug: 'tools' },
    { slug: 'guides' },
    { slug: 'troubleshooting' }
  ];
}

export async function generateMetadata({ params }: CategoryPageParams): Promise<Metadata> {
  const categoryName = getCategoryDisplayName(params.slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rdtvideodownloader.com';
  return {
    title: `Reddit Video Downloader ${categoryName} & Guides (2026)`,
    description: `Browse all articles, guides, and tools in our ${categoryName} category on RDT Video Downloader. Learn how to save Reddit videos with sound.`,
    alternates: {
      canonical: `${siteUrl}/blog/category/${params.slug}`,
    }
  };
}

export default async function CategoryPage({ params }: CategoryPageParams) {
  const categoryName = getCategoryDisplayName(params.slug);
  const allPosts = getSortedPostsData('blog');
  
  // Filter posts by category slug
  const filteredPosts = allPosts.filter((post) => {
    if (!post.categoryName) return false;
    const postCategorySlug = post.categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return postCategorySlug === params.slug;
  });

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Blog', url: '/blog' },
    { label: categoryName }
  ];

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      {/* Category Hero */}
      <section className="pt-24 pb-16 bg-white border-b border-slate-200/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <Breadcrumbs items={breadcrumbItems} />
          
          <div className="flex items-center gap-4 mb-4">
            <span className="p-3 rounded-2xl bg-orange-50 text-brand-orange border border-orange-100 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </span>
            <span className="text-sm font-bold text-brand-orange uppercase tracking-wider">
              Category Archive
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
            {categoryName}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            Discover expert tutorials, tools, and troubleshooting guides focused on {categoryName.toLowerCase()} to help you download and manage Reddit media files effortlessly.
          </p>
        </div>
      </section>

      {/* Category Articles Grid */}
      <section className="flex-grow py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <BlogList posts={filteredPosts} />
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
