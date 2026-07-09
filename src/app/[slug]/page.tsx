import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPostData, getSortedPostsData } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { FAQItem } from '@/components/FAQAccordion';
import GutenbergFaqHandler from '@/components/GutenbergFaqHandler';
import { articleSEO } from '@/lib/seo';

import { Metadata } from 'next';

interface BlogPostParams {
  params: { slug: string };
}

/**
 * Clean up content HTML by removing Gutenberg comments and inline style blocks.
 */
function cleanPostContent(html: string): string {
  if (!html) return '';
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '');
}

/**
 * Dynamically inject loading="lazy" and decoding="async" into all images in the content.
 */
function injectLazyLoading(html: string): string {
  if (!html) return '';
  return html.replace(/<img([^>]*?)>/gi, (match, attributes) => {
    let newAttributes = attributes;
    if (/loading=/i.test(newAttributes)) {
      newAttributes = newAttributes.replace(/loading=["'][^"']*["']/i, 'loading="lazy"');
    } else {
      newAttributes += ' loading="lazy"';
    }
    if (/decoding=/i.test(newAttributes)) {
      newAttributes = newAttributes.replace(/decoding=["'][^"']*["']/i, 'decoding="async"');
    } else {
      newAttributes += ' decoding="async"';
    }
    return `<img${newAttributes}>`;
  });
}

/**
 * Extract FAQ items server-side from Gutenberg, RankMath, and Yoast HTML accordion elements.
 */
function parseServerSideFaqs(html: string): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  if (!html) return faqs;

  // 1. Kadence Accordion Pane parsing
  const paneParts = html.split(/class="[^"]*kt-accordion-pane/g);
  if (paneParts.length > 1) {
    for (let i = 1; i < paneParts.length; i++) {
      const paneHtml = paneParts[i];
      const titleMatch = paneHtml.match(/class="[^"]*kt-blocks-accordion-title[^"]*"[^>]*>([\s\S]*?)<\/(?:button|div|span|h[1-6])/i);
      const panelMatch = paneHtml.match(/class="[^"]*(?:kt-accordion-panel-inner|kt-accordion-panel)[^"]*"[^>]*>([\s\S]*?)<\/div/i);
      if (titleMatch && panelMatch) {
        const question = titleMatch[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
        const answer = panelMatch[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
        if (question && answer) {
          faqs.push({ question, answer });
        }
      }
    }
  }

  // 2. RankMath list items parsing
  const rmParts = html.split(/class="[^"]*rank-math-list-item/g);
  if (rmParts.length > 1) {
    for (let i = 1; i < rmParts.length; i++) {
      const rmHtml = rmParts[i];
      const qMatch = rmHtml.match(/class="[^"]*rank-math-question[^"]*"[^>]*>([\s\S]*?)<\/(?:h[1-6]|div|span|p)/i);
      const aMatch = rmHtml.match(/class="[^"]*rank-math-answer[^>]*>([\s\S]*?)<\/div/i);
      if (qMatch && aMatch) {
        const question = qMatch[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
        const answer = aMatch[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
        if (question && answer) {
          faqs.push({ question, answer });
        }
      }
    }
  }

  // 3. Yoast section parsing
  const yoastParts = html.split(/class="[^"]*schema-faq-section/g);
  if (yoastParts.length > 1) {
    for (let i = 1; i < yoastParts.length; i++) {
      const yoastHtml = yoastParts[i];
      const qMatch = yoastHtml.match(/class="[^"]*schema-faq-question[^"]*"[^>]*>([\s\S]*?)<\/(?:strong|h[1-6]|div|span|p)/i);
      const aMatch = yoastHtml.match(/class="[^"]*schema-faq-answer[^"]*"[^>]*>([\s\S]*?)<\/div/i);
      if (qMatch && aMatch) {
        const question = qMatch[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
        const answer = aMatch[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
        if (question && answer) {
          faqs.push({ question, answer });
        }
      }
    }
  }

  return faqs;
}

export async function generateMetadata({ params }: BlogPostParams): Promise<Metadata> {
  try {
    const post = await getPostData(params.slug, 'blog');
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rdtvideodownloader.com';
    
    const rawTitle = post.metaTitle || post.title;
    let title = rawTitle
      .replace(/\s*-\s*My\s*Blog/gi, '')
      .replace(/\s*-\s*admin/gi, '')
      .trim();
    
    // Ensure "RDT Video Downloader" branding exists exactly once in the title
    if (!title.includes('RDT Video Downloader')) {
      title = `${title} | RDT Video Downloader`;
    }

    const description = post.metaDescription || post.excerpt || `Read our guide about ${post.title} on RDT Video Downloader.`;
    
    const absoluteImageUrl = post.image
      ? (post.image.startsWith('http') ? post.image : `${siteUrl}${post.image.startsWith('/') ? '' : '/'}${post.image}`)
      : `${siteUrl}/og-image.jpg`;

    return articleSEO({
      title,
      description,
      path: `/${params.slug}`,
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author || 'RDT Editorial Team'],
      image: absoluteImageUrl,
    });
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
    
    // Prioritize related guides belonging to the same category
    const sameCategoryPosts = otherPosts.filter((p) => p.categoryName && post.categoryName && p.categoryName === post.categoryName);
    const relatedGuides = [
      ...sameCategoryPosts,
      ...otherPosts.filter((p) => !p.categoryName || !post.categoryName || p.categoryName !== post.categoryName),
    ].slice(0, 2);



    // Previous and Next post navigation
    const currentIndex = allPosts.findIndex((p) => p.slug === params.slug);
    const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
    const prevPost = currentIndex < allPosts.length - 1 && currentIndex !== -1 ? allPosts[currentIndex + 1] : null;

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rdtvideodownloader.com';

    // 1. Author and Organization schemas
    const authorSchema = {
      '@type': 'Organization',
      'name': 'RDT Editorial Team',
      'url': `${siteUrl}/blog`,
      'logo': {
        '@type': 'ImageObject',
        'url': `${siteUrl}/logo.png`,
      },
      'description': 'The official editorial team of RDT Video Downloader. We provide reliable guides, tips, and insights for downloading and saving media from platforms like Reddit.',
      'sameAs': [
        siteUrl,
        'https://twitter.com/rdtdownloader',
        'https://facebook.com/rdtdownloader'
      ]
    };

    // Calculate word count
    const cleanText = (post.contentHtml || '').replace(/<[^>]*>/g, '').trim();
    const wordCount = cleanText.split(/\s+/).filter(Boolean).length;

    const absoluteImageUrl = post.image
      ? (post.image.startsWith('http') ? post.image : `${siteUrl}${post.image.startsWith('/') ? '' : '/'}${post.image}`)
      : `${siteUrl}/og-image.jpg`;

    // 2. BlogPosting Schema
    const blogPostingSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      image: absoluteImageUrl,
      datePublished: post.date,
      dateModified: post.date,
      author: authorSchema,
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
      wordCount: wordCount,
      inLanguage: 'en-US',
      articleSection: post.categoryName || 'Blog',
    };

    // 3. BreadcrumbList Schema
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: siteUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: `${siteUrl}/blog`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title,
          item: `${siteUrl}/${params.slug}`,
        },
      ],
    };

    // 4. FAQ Page Schema (combined WordPress custom field FAQs and Gutenberg/RankMath/Yoast parsed accordions)
    const parsedFaqs = parseServerSideFaqs(post.contentHtml || '');
    const combinedFaqs = [...(post.faqs || []), ...parsedFaqs];
    const hasFaqs = combinedFaqs.length > 0;
    const faqSchema = hasFaqs ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: combinedFaqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        }
      }))
    } : null;

    // Clean up content HTML and inject lazy loading/decoding
    const cleanedContent = cleanPostContent(post.contentHtml || '');
    const finalContentHtml = injectLazyLoading(cleanedContent);

    return (
      <>
        <JsonLd data={blogPostingSchema as Record<string, unknown>} />
        <JsonLd data={breadcrumbSchema} />
        {faqSchema && <JsonLd data={faqSchema as Record<string, unknown>} />}
        <GutenbergFaqHandler slug={params.slug} />
        <Header />
        <main className="min-h-screen flex flex-col flex-grow bg-white">
          
          <article className="flex-grow py-12 bg-white">
            <div className="container mx-auto px-4 max-w-[850px]">
              
              {/* Back to Guides */}
              <div className="mb-6">
                <Link 
                  href="/blog" 
                  className="text-brand-orange hover:text-brand-orange-light font-bold text-sm inline-flex items-center gap-1.5 transition-colors group"
                >
                  &lt; Back to Guides
                </Link>
              </div>

              {/* Category Badge */}
              <div className="text-center mb-4">
                <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-orange bg-brand-orange/5 border border-brand-orange/10 rounded-full">
                  {post.categoryName || 'Blog'}
                </span>
              </div>
              
              {/* Title */}
              <h1 
                className="text-center font-black text-slate-900 leading-[1.25] tracking-tight mb-5 text-[32px] md:text-[2.6rem]"
                style={{ fontFamily: 'var(--font-title)' }}
              >
                {post.title}
              </h1>

              {/* Metadata */}
              <div className="flex items-center justify-center flex-wrap gap-2.5 text-[13px] font-medium text-slate-500 mb-8 tracking-normal">
                <span>By {authorSchema.name}</span>
                <span className="text-slate-300">•</span>
                <time dateTime={post.date}>{post.date}</time>
                <span className="text-slate-300">•</span>
                <span>{post.readingTime || 5} min read</span>
              </div>

              {/* Featured Image */}
              {post.image && (
                <div className="blog-image-wrapper aspect-[1200/628] w-full overflow-hidden rounded-[16px] border border-slate-100 bg-slate-50 shadow-xl shadow-slate-200/40 mb-10">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    width={1200}
                    height={628}
                    className="object-cover w-full h-full"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              )}

              {/* Article Content */}
              <div 
                className="prose prose-slate max-w-none 
                  prose-headings:text-slate-900 prose-headings:font-bold prose-headings:tracking-tight
                  prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-slate-600 prose-p:leading-[1.65] prose-p:text-[1.05rem] prose-p:mb-6
                  prose-a:text-brand-orange prose-a:no-underline hover:prose-a:underline font-semibold
                  prose-strong:text-slate-900 prose-strong:font-bold
                  prose-img:rounded-2xl prose-img:border prose-img:border-slate-100 prose-img:my-6
                  prose-blockquote:border-l-4 prose-blockquote:border-brand-orange prose-blockquote:bg-slate-50/50 
                  prose-blockquote:px-5 prose-blockquote:py-4 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-slate-600
                  prose-li:text-slate-600 prose-li:text-[1.05rem] prose-li:leading-[1.65]"
                style={{ fontFamily: 'var(--font-sans)' }}
                dangerouslySetInnerHTML={{ __html: finalContentHtml }}
              />

              {/* Injected FAQ Section visually at the end of content if present */}
              {hasFaqs && (
                <div className="faq-section mt-12 pt-10 border-t border-slate-100">
                  <h2 
                    className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 tracking-tight"
                    style={{ fontFamily: 'var(--font-title)' }}
                  >
                    Frequently Asked Questions
                  </h2>
                  <dl className="space-y-4">
                    {combinedFaqs.map((faq, index) => (
                      <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                  </dl>
                </div>
              )}
              
              {/* CTA Section */}
              <div className="mt-12 p-6 bg-slate-900 rounded-3xl text-white text-center relative overflow-hidden group">
                <div className="relative z-10 py-2">
                  <h3 className="text-2xl font-extrabold mb-2 tracking-tight">Try Our Reddit Downloader</h3>
                  <p className="text-slate-400 mb-6 text-sm max-w-lg mx-auto leading-relaxed">
                    Download any Reddit video with sound in high definition. Fast, free, and no registration required.
                  </p>
                  <Link 
                    href="/" 
                    className="inline-flex items-center gap-1.5 px-6 py-3 bg-brand-orange hover:bg-brand-orange-light text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-orange/10 hover:-translate-y-0.5 transition-all"
                  >
                    Download Now <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Author Section */}
              <div className="mt-12 pt-8 border-t border-slate-100 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-lg shrink-0 border border-slate-200">
                  R
                </div>
                <div>
                  <div className="font-bold text-base text-slate-900">{authorSchema.name}</div>
                  <div className="text-slate-500 text-sm mt-1 max-w-xl leading-relaxed">{authorSchema.description}</div>
                </div>
              </div>

              {/* Previous / Next Navigation */}
              {(prevPost || nextPost) && (
                <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-stretch justify-between gap-4">
                  {prevPost ? (
                    <Link
                      href={`/${prevPost.slug}`}
                      className="group flex flex-col items-start gap-1 w-full sm:w-1/2 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-brand-orange/20 transition-all text-left"
                    >
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <ArrowLeft size={10} className="group-hover:-translate-x-0.5 transition-transform" /> Previous Guide
                      </span>
                      <span className="font-bold text-sm text-slate-800 line-clamp-1 group-hover:text-brand-orange transition-colors">
                        {prevPost.title}
                      </span>
                    </Link>
                  ) : (
                    <div className="hidden sm:block w-1/2" />
                  )}

                  {nextPost ? (
                    <Link
                      href={`/${nextPost.slug}`}
                      className="group flex flex-col items-end gap-1 w-full sm:w-1/2 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-brand-orange/20 transition-all text-right"
                    >
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        Next Guide <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                      </span>
                      <span className="font-bold text-sm text-slate-800 line-clamp-1 group-hover:text-brand-orange transition-colors">
                        {nextPost.title}
                      </span>
                    </Link>
                  ) : (
                    <div className="hidden sm:block w-1/2" />
                  )}
                </div>
              )}

              {/* Related Guides / Recommended Articles Footer Grid */}
              {relatedGuides.length > 0 && (
                <div className="mt-16 pt-10 border-t border-slate-100">
                  <h3 
                    className="text-2xl font-bold text-slate-900 mb-8 tracking-tight"
                    style={{ fontFamily: 'var(--font-title)' }}
                  >
                    Recommended Guides
                  </h3>
                  <div className="blog-grid grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {relatedGuides.map((guide) => (
                      <Link 
                        key={guide.slug}
                        href={`/${guide.slug}`}
                        className="blog-card group flex flex-col bg-white border border-slate-200/60 rounded-2xl overflow-hidden hover:border-brand-orange/20 hover:shadow-xl hover:shadow-slate-100/40 transition-all duration-300 text-left"
                      >
                        {guide.image && (
                          <div className="blog-image-wrapper aspect-[1200/628] w-full overflow-hidden bg-slate-50 border-b border-slate-100">
                            <img 
                              src={guide.image} 
                              alt={guide.title} 
                              className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                              width={400}
                              height={209}
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div className="p-5 flex flex-col flex-grow">
                          <div className="flex items-center gap-2 mb-2.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-orange/5 text-brand-orange border border-brand-orange/10">
                              {guide.categoryName || 'Guide'}
                            </span>
                            <span className="text-[11px] font-medium text-slate-400">{guide.date}</span>
                          </div>
                          <h4 
                            className="text-base font-bold text-slate-900 group-hover:text-brand-orange transition-colors mb-2 line-clamp-2 leading-snug"
                            style={{ fontFamily: 'var(--font-title)' }}
                          >
                            {guide.title}
                          </h4>
                          <p className="text-slate-500 text-[13px] leading-relaxed line-clamp-3 mb-4 mt-auto">
                            {guide.excerpt}
                          </p>
                          <div className="flex items-center gap-1.5 text-brand-orange font-bold text-xs mt-3">
                            Read Guide <ArrowRight className="group-hover:translate-x-0.5 transition-transform" size={14} />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
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
