import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPostData, getSortedPostsData } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import { Shield, Clock, FileText, ArrowLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { Metadata } from 'next';
import { pageSEO } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug;

  const LEGAL_TITLES: Record<string, { title: string; description: string }> = {
    dmca: {
      title: "DMCA Notice — Copyright Policy | RDT Video Downloader",
      description: "Read RDT Video Downloader's DMCA policy. Learn how to file a takedown notice for copyrighted content and our process for handling infringement claims.",
    },
    "privacy-policy": {
      title: "Privacy Policy — How We Handle Your Data | RDT Video Downloader",
      description: "Our privacy policy explains what data we collect (none), how we process requests (real-time, no logs), and your rights. We don't store URLs, files, or personal identifiers.",
    },
    "terms-of-service": {
      title: "Terms of Service — Usage Agreement | RDT Video Downloader",
      description: "Review the terms of service for using RDT Video Downloader. Acceptable use, intellectual property, fair use guidelines, and limitation of liability.",
    },
  };

  const meta = LEGAL_TITLES[slug] || {
    title: `Legal — ${slug} | RDT Video Downloader`,
    description: "RDT Video Downloader legal document.",
  };

  return pageSEO({
    title: meta.title,
    description: meta.description,
    path: `/legal/${slug}`,
  });
}

export async function generateStaticParams() {
  const posts = getSortedPostsData('legal');
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function LegalPage({ params }: { params: { slug: string } }) {
  try {
    const post = await getPostData(params.slug, 'legal');
    const allLegalPosts = getSortedPostsData('legal');

    return (
      <>
        <Header />
        <main className="min-h-screen flex flex-col flex-grow bg-slate-50/30">
          
          {/* Legal Header */}
          <header className="pt-10 pb-6 bg-white border-b border-slate-100">
            <div className="container mx-auto px-4 max-w-6xl">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-orange font-bold text-sm mb-5 transition-colors group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
              
              <div className="flex items-center gap-3 text-brand-orange mb-6">
                <Shield size={24} />
                <span className="font-bold tracking-widest uppercase text-sm">Legal Documentation</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                {post.title}
              </h1>
              
              <div className="flex items-center gap-4 text-slate-500 text-sm font-medium">
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  Last updated: {post.date}
                </span>
                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                <span className="flex items-center gap-1.5">
                  <FileText size={14} />
                  Official Policy
                </span>
              </div>
            </div>
          </header>

          <article className="flex-grow py-8">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Sidebar Navigation */}
                <aside className="lg:col-span-1">
                  <nav className="sticky top-24 space-y-2">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-4">All Policies</h3>
                    <ul className="space-y-2 list-none">
                      {allLegalPosts.map((legalPost) => (
                        <li key={legalPost.slug}>
                          <Link
                            href={`/legal/${legalPost.slug}`}
                            className={`group flex items-center justify-between p-4 rounded-2xl text-sm font-bold transition-all ${
                              params.slug === legalPost.slug
                                ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20'
                                : 'bg-white text-slate-600 hover:bg-white hover:text-brand-orange border border-transparent hover:border-slate-100 shadow-sm'
                            }`}
                          >
                            {legalPost.title}
                            <ChevronRight size={14} className={params.slug === legalPost.slug ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} />
                          </Link>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-8 pt-8 border-t border-slate-100">
                      <Link 
                        href="/contact" 
                        className="flex flex-col gap-2 p-6 bg-slate-900 rounded-[32px] text-white group hover:bg-brand-orange transition-all shadow-xl shadow-slate-900/10"
                      >
                        <span className="text-sm font-bold opacity-80">Need help?</span>
                        <span className="text-lg font-black leading-tight">Contact Our Legal Team</span>
                      </Link>
                    </div>
                  </nav>
                </aside>

                {/* Main Content */}
                <div className="lg:col-span-3">
                  <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-slate-100">
                    <div 
                      className="prose prose-slate lg:prose-lg max-w-none 
                        prose-headings:text-slate-900 prose-headings:font-bold
                        prose-a:text-brand-orange prose-a:underline hover:prose-a:text-brand-orange-light
                        prose-p:leading-relaxed prose-li:leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
                    />
                  </div>
                </div>
              </div>
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


