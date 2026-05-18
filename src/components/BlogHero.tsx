'use client';

import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export default function BlogHero() {
  return (
    <section className="relative py-20 overflow-hidden bg-white">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-sm font-bold mb-6"
          >
            <BookOpen size={16} />
            <span>Resources & Guides</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight"
          >
            The <span className="text-brand-orange">RDT Video</span> Downloader Blog
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 leading-relaxed max-w-2xl"
          >
            Expert tips, step-by-step guides, and the latest updates on Reddit media downloading. Master the art of saving high-quality content.
          </motion.p>
        </div>
      </div>
      
      {/* Abstract shapes */}
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-20">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-brand-orange/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[300px] h-[300px] bg-brand-blue/10 rounded-full blur-[100px]" />
      </div>
    </section>
  );
}
