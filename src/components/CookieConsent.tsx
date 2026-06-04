'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import Link from 'next/link';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Avoid showing the banner during SSR
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Set a short delay for a premium feel
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-[999] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col gap-4 text-slate-800 dark:text-slate-200"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center shrink-0 text-brand-orange">
              <Cookie size={24} />
            </div>
            <div className="flex-grow">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                We value your privacy
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                We use cookies to enhance your browsing experience, serve personalized ads or content via Google AdSense, and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies. Read our{' '}
                <Link href="/legal/privacy-policy" className="text-brand-orange hover:underline font-bold">
                  Privacy Policy
                </Link>{' '}
                for details.
              </p>
            </div>
            <button
              onClick={handleDecline}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex gap-3 justify-end mt-2">
            <button
              onClick={handleDecline}
              className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-bold text-slate-700 dark:text-slate-300 transition-colors"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="px-5 py-2.5 rounded-xl bg-brand-orange text-white hover:opacity-90 active:scale-[0.98] text-sm font-bold shadow-lg shadow-brand-orange/20 transition-all"
            >
              Accept All
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
