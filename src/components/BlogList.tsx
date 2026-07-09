'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import { PostData } from '@/types';

interface BlogListProps {
  posts: PostData[];
}

export default function BlogList({ posts }: BlogListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

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

  // Pagination calculations
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = posts.slice(startIndex, startIndex + postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 250,
      behavior: 'smooth',
    });
  };

  return (
    <div className="w-full">
      {/* Blog Cards Grid */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 list-none m-0 p-0">
        {paginatedPosts.map((post, index) => (
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
              className="blog-card group flex flex-col bg-white/75 backdrop-blur-md border border-[#FFE8DF] hover:border-brand-orange/40 rounded-[28px] transition-all duration-300 h-full p-5 text-left"
              style={{
                transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.3s, box-shadow 0.4s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 40px -15px rgba(255, 87, 34, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <article className="flex flex-col h-full flex-grow">
                {post.image && (
                  <div className="blog-image-wrapper aspect-[1200/628] w-full overflow-hidden bg-slate-50 rounded-[16px] relative">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      width={800}
                      height={419}
                      className="object-cover w-full h-full" 
                      style={{
                        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.03)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = '/og-image.png';
                      }}
                    />
                  </div>
                )}
                
                <div className="flex flex-col flex-grow pt-4 px-2">
                  {/* Metadata Row */}
                  <div className="flex items-center gap-2 text-[12px] font-medium text-slate-500 mb-2.5">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readingTime || 5} min read</span>
                  </div>
                  
                  {/* Card Title */}
                  <h2 
                    className="text-[20px] font-bold text-slate-900 mb-2.5 leading-[1.3] group-hover:text-brand-orange"
                    style={{ 
                      fontFamily: 'var(--font-title)',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {post.title}
                  </h2>
                  
                  {/* Excerpt Text */}
                  <p className="text-slate-500 text-[14px] leading-[1.5] line-clamp-3 mb-5 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  {/* Read More Link */}
                  <div className="blog-card-link mt-auto text-brand-orange font-semibold text-[13.5px] inline-flex items-center gap-1.5 hover:text-brand-orange-light">
                    <span>Read Full Article</span>
                    <ArrowRight 
                      size={14} 
                      className="transition-transform duration-200 group-hover:translate-x-1" 
                    />
                  </div>
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ul>

      {/* Pagination Row */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 text-[14px] font-semibold rounded-lg border transition-all duration-200 ${
                currentPage === page
                  ? 'bg-brand-orange border-brand-orange text-white'
                  : 'bg-transparent border-slate-200 text-slate-500 hover:border-slate-300'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
