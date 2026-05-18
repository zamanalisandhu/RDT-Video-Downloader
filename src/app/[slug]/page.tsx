import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPostData, getSortedPostsData } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import { Calendar, User, Clock, ArrowLeft, Tag } from 'lucide-react';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { Metadata } from 'next';

interface BlogPostParams {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogPostParams): Promise<Metadata> {
  try {
    const post = await getPostData(params.slug, 'blog');
    return {
      title: post.title,
      description: post.excerpt || `Read our guide about ${post.title} on RDT Video Downloader.`,
      openGraph: {
        title: post.title,
        description: post.excerpt || `Read our guide about ${post.title} on RDT Video Downloader.`,
        type: 'article',
        publishedTime: post.date,
        authors: [post.author || 'RDT Admin'],
        images: [
          {
            url: post.image || '/og-image.jpg',
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      alternates: {
        canonical: `/${params.slug}`,
      },
    };
  } catch {
    return {
      title: 'Blog Post',
    };
  }
}

export async function generateStaticParams() {
  const posts = getSortedPostsData('blog');
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostParams) {
  try {
    const post = await getPostData(params.slug, 'blog');
    const allPosts = getSortedPostsData('blog');
    const relatedPosts = allPosts
      .filter((p) => p.slug !== params.slug)
      .slice(0, 3);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rdtvideodownloader.com';

    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      image: post.image || `${siteUrl}/og-image.jpg`,
      datePublished: post.date,
      dateModified: post.date,
      author: {
        '@type': 'Person',
        name: post.author || 'RDT Admin',
      },
      publisher: {
        '@type': 'Organization',
        name: 'RDT Video Downloader',
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/logo.png`,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${siteUrl}/${params.slug}`,
      },
    };

    return (
      <main className="min-h-screen flex flex-col bg-white">
        <JsonLd data={articleSchema} />
        <Header />
        
        {/* Post Header */}
        <header className="pt-16 pb-12 bg-slate-50 border-b border-slate-100">
          <div className="container mx-auto px-4 max-w-4xl">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-orange font-bold text-sm mb-10 transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>
            
            <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
              <span className="flex items-center gap-2">
                <Calendar size={16} className="text-brand-orange" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <User size={16} className="text-brand-orange" />
                {post.author || 'RDT Admin'}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} className="text-brand-orange" />
                5 min read
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1]">
              {post.title}
            </h1>
          </div>
        </header>

        <article className="flex-grow py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div 
              className="prose prose-slate lg:prose-xl max-w-none 
                prose-headings:text-slate-900 prose-headings:font-black 
                prose-a:text-brand-orange prose-a:underline hover:prose-a:text-brand-orange-light
                prose-strong:text-slate-900 prose-img:rounded-3xl prose-img:shadow-2xl
                prose-blockquote:border-brand-orange prose-blockquote:bg-slate-50 
                prose-blockquote:py-2 prose-blockquote:rounded-r-2xl"
              dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
            />
            
            {/* CTA Section */}
            <div className="mt-20 p-10 bg-slate-900 rounded-[40px] text-white text-center relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-3xl font-black mb-4">Try Our Reddit Downloader</h3>
                <p className="text-slate-400 mb-8 text-lg max-w-xl mx-auto">
                  Download any Reddit video with sound in high definition. Fast, free, and no registration required.
                </p>
                <Link 
                  href="/" 
                  className="inline-flex items-center gap-2 px-10 py-5 bg-brand-orange text-white font-black rounded-2xl shadow-xl shadow-brand-orange/20 hover:-translate-y-1 transition-all"
                >
                  Download Now
                </Link>
              </div>
              <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform">
                <Tag size={120} />
              </div>
            </div>

            {/* Author Section */}
            <div className="mt-20 pt-10 border-t border-slate-100 flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-brand-orange flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-brand-orange/20">
                {(post.author || 'RDT')[0]}
              </div>
              <div>
                <div className="font-bold text-xl text-slate-900">{post.author || 'RDT Admin'}</div>
                <div className="text-slate-500 max-w-md">Expert in Reddit media extraction and digital content preservation. Helping millions save their favorite Reddit moments since 2024.</div>
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-32">
                <h3 className="text-3xl font-black text-slate-900 mb-10">Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {relatedPosts.map((relatedPost) => (
                    <Link 
                      key={relatedPost.slug} 
                      href={`/${relatedPost.slug}`}
                      className="group block bg-slate-50 border border-slate-100 rounded-3xl p-6 hover:bg-white hover:shadow-xl transition-all"
                    >
                      <div className="text-sm font-bold text-brand-orange mb-3">{relatedPost.date}</div>
                      <h4 className="text-xl font-bold text-slate-900 group-hover:text-brand-orange transition-colors mb-4">
                        {relatedPost.title}
                      </h4>
                      <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                        Read Article <ArrowLeft className="rotate-180" size={16} />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
        
        <Footer />
      </main>
    );
  } catch {
    notFound();
  }
}
