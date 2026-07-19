'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console or error reporting service
    console.error('App Router error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center bg-slate-50">
      <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-5 shadow-sm">
        <AlertCircle size={28} />
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
        Something Went Wrong
      </h1>
      
      <p className="text-slate-600 max-w-md mx-auto mb-8 text-sm sm:text-base leading-relaxed">
        An unexpected error occurred while loading this page. Please try again or return to the homepage.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF4500] hover:bg-[#ff5714] text-white font-extrabold rounded-xl transition-all shadow-md active:scale-[0.98] text-sm"
        >
          <RefreshCw size={16} />
          <span>Try Again</span>
        </button>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 hover:text-slate-900 font-bold rounded-xl transition-all shadow-sm hover:border-slate-300 text-sm"
        >
          <Home size={16} />
          <span>Go to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
