'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LiveCounter() {
  const [sessions, setSessions] = useState(42);

  useEffect(() => {
    const interval = setInterval(() => {
      setSessions(prev => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return Math.max(38, Math.min(64, prev + change));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-1 mb-6">
      <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100 shadow-sm">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={sessions}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-brand-orange"
            >
              {sessions}
            </motion.span>
          </AnimatePresence>
          people currently downloading
        </span>
      </div>
      <p className="text-sm text-slate-500 font-medium">
        Over <strong className="text-slate-900 font-bold">1.4 Million</strong> videos saved to date
      </p>
    </div>
  );
}
