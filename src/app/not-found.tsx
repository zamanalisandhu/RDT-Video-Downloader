import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="flex-grow flex items-center justify-center py-20 px-4">
        <div className="text-center max-w-xl">
          <div className="text-9xl font-black text-slate-100 mb-8 select-none">404</div>
          <h1 className="text-4xl font-black text-slate-900 mb-6">Oops! Page Not Found</h1>
          <p className="text-xl text-slate-500 mb-10 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. 
            Don&apos;t worry, you can still download your favorite Reddit videos.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/" 
              className="w-full sm:w-auto px-8 py-4 bg-brand-orange text-white font-bold rounded-2xl shadow-xl shadow-brand-orange/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              <Home size={20} />
              Back to Home
            </Link>
            <Link 
              href="/blog" 
              className="w-full sm:w-auto px-8 py-4 bg-slate-100 text-slate-900 font-bold rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
            >
              <Search size={20} />
              Read Our Blog
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
