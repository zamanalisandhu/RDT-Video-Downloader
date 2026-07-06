'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Calculate total scrollable height
      const scrolled = window.scrollY;
      const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Show button if user has scrolled past half of the page
      if (totalScrollableHeight > 0 && scrolled > totalScrollableHeight / 2) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    // Trigger once on mount in case page is already scrolled
    toggleVisibility();

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange text-white shadow-lg shadow-brand-orange/30 backdrop-blur-sm transition-transform hover:scale-110 active:scale-95 focus:outline-none"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5 stroke-[2.5px]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
