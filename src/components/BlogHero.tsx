'use client';

import { motion } from 'framer-motion';

export default function BlogHero() {
  return (
    <section className="relative pt-16 pb-8 bg-white text-center">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[32px] md:text-[40px] font-black text-slate-900 mb-4 tracking-tight leading-tight"
          style={{ fontFamily: 'var(--font-title)' }}
        >
          Latest Articles & Guides
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-[15px] md:text-[16px] text-slate-500 max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          Learn how to download and convert Reddit videos, audio, and images in high quality on all your devices.
        </motion.p>
      </div>
    </section>
  );
}
