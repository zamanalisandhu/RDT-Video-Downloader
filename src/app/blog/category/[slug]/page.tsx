import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogList from '@/components/BlogList';
import { getSortedPostsData } from '@/lib/blog';
import { Metadata } from 'next';

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
      languages: {
        'en': `${siteUrl}/blog/category/${params.slug}`,
        'x-default': `${siteUrl}/blog/category/${params.slug}`,
      },
    }
  };
}

export default async function CategoryPage({ params }: CategoryPageParams) {
  const categoryName = getCategoryDisplayName(params.slug);
  const allPosts = await getSortedPostsData('blog');
  
  // Filter posts by category slug
  const filteredPosts = allPosts.filter((post) => {
    if (!post.categoryName) return false;
    const postCategorySlug = post.categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return postCategorySlug === params.slug;
  });

  // Breadcrumbs removed for clean design

  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col flex-grow bg-white">
        
        {/* Category Hero */}
        <section className="relative pt-16 pb-8 bg-white text-center">
          <div className="container mx-auto px-4 max-w-4xl">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-3">
              Category Archive
            </span>
            <h1 
              className="text-[32px] md:text-[40px] font-black text-slate-900 mb-4 tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-title)' }}
            >
              {categoryName}
            </h1>
            <p 
              className="text-[15px] md:text-[16px] text-slate-500 max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Discover expert tutorials, tools, and troubleshooting guides focused on {categoryName.toLowerCase()} to help you download and manage Reddit media files effortlessly.
            </p>
          </div>
        </section>

        {/* Category Articles Grid */}
        <section className="flex-grow pb-16 pt-4">
          <div className="container mx-auto px-4 max-w-6xl">
            <BlogList posts={filteredPosts} />
          </div>
        </section>
        
      </main>
      <Footer />
    </>
  );
}
