import Link from 'next/link';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

interface LatestBlogsProps {
  posts: Post[];
}

export default function LatestBlogs({ posts }: LatestBlogsProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-20 bg-slate-50/50 border-t border-b border-slate-100">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-orange/10 rounded-xl mb-4">
              <BookOpen size={16} className="text-brand-orange animate-pulse" />
              <span className="text-xs font-black text-brand-orange uppercase tracking-wider">Guides & Tutorials</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
              Latest Reddit Saving Tips
            </h2>
            <p className="text-slate-600 mt-3 text-lg">
              Expert advice, legal breakdowns, and easy-to-follow tutorials on downloading Reddit media.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-brand-orange hover:text-brand-orange-light font-black transition-colors group"
            >
              Explore All Guides
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article 
              key={post.slug}
              className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              {/* Date */}
              <div className="flex items-center gap-2 text-slate-400 text-sm font-bold mb-4">
                <Calendar size={16} className="text-brand-orange" />
                {post.date}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-orange transition-colors line-clamp-2 leading-snug">
                <Link href={`/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h3>

              {/* Excerpt */}
              <p className="text-slate-500 line-clamp-3 leading-relaxed text-sm mb-6 flex-grow">
                {post.excerpt}
              </p>

              {/* Link */}
              <div className="pt-4 border-t border-slate-50">
                <Link 
                  href={`/${post.slug}`}
                  className="inline-flex items-center gap-2 text-slate-900 group-hover:text-brand-orange font-bold text-sm transition-colors"
                >
                  Read Guide
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
