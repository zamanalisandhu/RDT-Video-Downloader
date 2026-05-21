'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { PostData } from '@/types';

interface BlogListProps {
  posts: PostData[];
}

export default function BlogList({ posts }: BlogListProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-32">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
          <BookOpen size={40} />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">No articles found</h3>
        <p className="text-slate-500">We&apos;re currently writing new guides for you. Check back soon!</p>
      </div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {posts.map((post) => (
        <motion.div key={post.slug} variants={itemVariants}>
          <Link 
            href={`/blog/${post.slug}`}
            className="group flex flex-col bg-white border border-slate-200 rounded-[32px] overflow-hidden hover:shadow-2xl hover:shadow-slate-200/60 hover:-translate-y-2 transition-all duration-500 h-full"
          >
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
                <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-full">
                  <Calendar size={12} />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={12} />
                  5 min read
                </span>
              </div>
              
              <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-brand-orange transition-colors leading-snug">
                {post.title}
              </h2>
              
              <p className="text-slate-600 line-clamp-3 mb-8 leading-relaxed">
                {post.excerpt}
              </p>
              
              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs border border-slate-200">
                    {post.author?.[0] || 'R'}
                  </div>
                  <span className="text-sm font-bold text-slate-900">{post.author || 'RDT Admin'}</span>
                </div>
                
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
                  <ArrowRight size={20} />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
