import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPostData, getSortedPostsData } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { ArrowLeft, Tag } from 'lucide-react';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { FAQItem } from '@/components/FAQAccordion';
import GutenbergFaqHandler from '@/components/GutenbergFaqHandler';

import { Metadata } from 'next';

interface BlogPostParams {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogPostParams): Promise<Metadata> {
  try {
    const post = await getPostData(params.slug, 'blog');
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rdtvideodownloader.com';
    
    // Prioritize front-matter metaTitle and metaDescription
    const title = post.metaTitle || post.title;
    const description = post.metaDescription || post.excerpt || `Read our guide about ${post.title} on RDT Video Downloader.`;
    
    return {
      title,
      description,
      openGraph: {
        title,
        description,
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
        canonical: `${siteUrl}/${params.slug}`,
      },
    };
  } catch {
    return {
      title: 'Blog Post',
    };
  }
}

export async function generateStaticParams() {
  const posts = await getSortedPostsData('blog');
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostParams) {
  try {
    const post = await getPostData(params.slug, 'blog');
    const allPosts = await getSortedPostsData('blog');
    
    // Filter out the current post
    const otherPosts = allPosts.filter((p) => p.slug !== params.slug);
    
    // Prioritize related articles belonging to the same category
    const relatedPosts = [
      ...otherPosts.filter((p) => p.categoryName && post.categoryName && p.categoryName === post.categoryName),
      ...otherPosts.filter((p) => !p.categoryName || !post.categoryName || p.categoryName !== post.categoryName),
    ].slice(0, 3);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rdtvideodownloader.com';

    // 1. Article Schema
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

    // 2. FAQ Page Schema (Only if custom FAQs are defined in WordPress)
    const hasFaqs = post.faqs && post.faqs.length > 0;
    const faqSchema = hasFaqs && post.faqs ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        }
      }))
    } : null;



    return (
      <>
        <JsonLd data={articleSchema} />
        {faqSchema && <JsonLd data={faqSchema} />}
        <GutenbergFaqHandler slug={params.slug} />
        <Header />
        <main className="min-h-screen flex flex-col flex-grow bg-white">
          
          <article className="flex-grow py-12 bg-white">
            <div className="container mx-auto px-4 max-w-3xl">
              
              {/* Back to Guides */}
              <div className="mb-4">
                <Link 
                  href="/blog" 
                  className="text-brand-orange hover:text-brand-orange-light font-bold text-sm inline-flex items-center gap-1.5 transition-colors group"
                >
                  &lt; Back to Guides
                </Link>
              </div>

              {/* Category Badge */}
              <div className="text-[11px] font-black uppercase tracking-widest text-brand-orange mb-3">
                Blog
              </div>
              
              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
                {post.title}
              </h1>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-400 mb-6 uppercase tracking-wider">
                <time dateTime={post.date}>{post.date}</time>
                <span>·</span>
                <span>By {post.author || 'RDT Admin'}</span>
                <span>·</span>
                <span>{post.readingTime || 5} min read</span>
              </div>

              {/* Featured Image */}
              {post.image && (
                <div className="aspect-[1200/628] w-full overflow-hidden rounded-[24px] border border-slate-100 bg-slate-50 mb-8">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="object-cover w-full h-full"
                  />
                </div>
              )}

              {/* Article Content */}
              <div 
                className="prose prose-lg lg:prose-xl prose-slate max-w-none 
                  prose-headings:text-slate-900 prose-headings:font-black 
                  prose-a:text-brand-orange prose-a:underline hover:prose-a:text-brand-orange-light
                  prose-strong:text-slate-900 prose-img:rounded-3xl prose-img:shadow-2xl
                  prose-blockquote:border-brand-orange prose-blockquote:bg-slate-50 
                  prose-blockquote:py-2 prose-blockquote:rounded-r-2xl"
                dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
              />

              {/* Injected FAQ Section visually at the end of content if present in custom fields */}
              {hasFaqs && post.faqs && post.faqs.length > 0 && (
                <div className="faq-section mt-10 pt-8 border-t border-slate-100">
                  <h2 className="text-3xl font-black text-slate-900 mb-8">Frequently Asked Questions</h2>
                  <dl className="max-w-3xl mx-auto space-y-3">
                    {post.faqs.map((faq, index) => (
                      <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                  </dl>
                </div>
              )}
              
              {/* CTA Section */}
              <div className="mt-10 p-8 bg-slate-900 rounded-[40px] text-white text-center relative overflow-hidden group">
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
              <div className="mt-10 pt-6 border-t border-slate-100 flex items-center gap-6">
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
                <div className="mt-14">
                  <h3 className="text-3xl font-black text-slate-900 mb-8">Related Articles</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 list-none">
                    {relatedPosts.map((relatedPost) => (
                      <li key={relatedPost.slug}>
                        <Link 
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
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </article>
          
        </main>
        <Footer />
      </>
    );
  } catch {
    notFound();
  }
}
