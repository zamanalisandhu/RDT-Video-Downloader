'use client';

import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { PostData } from '@/types';

interface BlogListProps {
  posts: PostData[];
}

export default function BlogList({ posts }: BlogListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-32 bg-white">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
          <BookOpen size={40} />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">No articles found</h3>
        <p className="text-slate-500">We&apos;re currently writing new guides for you. Check back soon!</p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto list-none">
      {posts.map((post, index) => (
        <li 
          key={post.slug} 
          className={`list-none animate-fade-in-up ${
            index === 0 ? 'animation-delay-100' :
            index === 1 ? 'animation-delay-150' :
            index === 2 ? 'animation-delay-200' :
            'animation-delay-300'
          }`}
        >
          <Link 
            href={`/${post.slug}`}
            className="group flex flex-col bg-white border border-[#FFE8DF] hover:border-brand-orange/30 rounded-[32px] hover:shadow-2xl hover:shadow-slate-200/60 hover:-translate-y-2 transition-all duration-500 h-full p-6"
          >
            <article className="flex flex-col h-full flex-grow">
              {post.image && (
                <div className="aspect-[1200/628] w-full overflow-hidden bg-slate-50 rounded-[20px] mb-6">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    width={800}
                    height={419}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" 
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = '/og-image.png';
                    }}
                  />
                </div>
              )}
              <div className="flex flex-col items-center text-center flex-grow">
                <div className="text-[12px] font-bold text-slate-400 mb-3 uppercase tracking-wider">
                  {post.date} &nbsp;•&nbsp; {post.readingTime || 5} min read
                </div>
                
                <h2 className="text-[22px] md:text-[24px] font-black text-slate-900 mb-3 group-hover:text-brand-orange transition-colors leading-snug">
                  {post.title}
                </h2>
                
                <p className="text-slate-500 text-[14px] md:text-[15px] line-clamp-3 mb-6 leading-relaxed max-w-md">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto text-brand-orange font-bold text-[14px] md:text-[15px] inline-flex items-center gap-1 hover:text-brand-orange-light transition-colors">
                  Read Full Article &rarr;
                </div>
              </div>
            </article>
          </Link>
        </li>
      ))}
    </ul>
  );
}
