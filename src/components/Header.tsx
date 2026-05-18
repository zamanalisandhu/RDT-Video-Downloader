'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Menu, 
  X, 
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);


  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'How it works', href: '/#how-it-works' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 40,
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.08,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
  };


  return (
    <>
      <header 
        className={`sticky top-0 z-[100] w-full transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md py-1.5 shadow-lg shadow-slate-200/40' 
            : 'bg-white/80 backdrop-blur-md py-2.5'
        }`}
      >
        <div className="container mx-auto px-4 flex items-center">
          {/* Logo Container */}
          <div className="flex-1 flex justify-start">
            <Link 
              href="/" 
              className="flex items-center gap-2 md:gap-3 z-[110] group" 
              onClick={closeMenu}
            >
              <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-xl overflow-hidden shadow-lg shadow-brand-orange/25 group-hover:scale-105 transition-transform duration-200">
                <Image
                  src="/logo.png"
                  alt="RDT Video Downloader Logo"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <span className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tighter sm:tracking-tight">
                RDT<span className="text-brand-orange">Video</span>Downloader
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className="text-[15px] text-slate-600 hover:text-brand-orange font-bold transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button / Placeholder Container */}
          <div className="flex-1 flex justify-end">
            <button 
              className="md:hidden z-[140] p-2 text-slate-900 focus:outline-none bg-slate-50 rounded-xl border border-slate-100 shadow-sm"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={28} strokeWidth={3} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={28} strokeWidth={3} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Sidebar */}
      <AnimatePresence initial={false}>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[120] md:hidden"
            />
            
            {/* Sidebar */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[340px] bg-white z-[130] shadow-2xl md:hidden flex flex-col"
            >
            <div className="p-6 flex items-center justify-between border-b border-slate-50">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="font-bold text-slate-900">RDT Downloader</span>
              </div>
            </div>

            <div className="p-6 flex-grow overflow-y-auto">
                <div className="flex flex-col gap-3">
                  {navLinks.map((link) => (
                    <motion.div key={link.name} variants={itemVariants}>
                      <Link 
                        href={link.href} 
                        className="flex items-center justify-between p-4 rounded-2xl text-xl font-extrabold text-slate-900 hover:bg-brand-orange/5 hover:text-brand-orange transition-all group"
                        onClick={closeMenu}
                      >
                        {link.name}
                        <ChevronRight className="text-slate-300 group-hover:text-brand-orange transition-all" size={24} />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                <motion.div variants={itemVariants}>
                   <Link 
                    href="/" 
                    className="w-full py-4 bg-brand-orange text-white text-center font-bold rounded-2xl shadow-xl shadow-brand-orange/30 flex items-center justify-center gap-3 text-lg active:scale-[0.98] transition-transform"
                    onClick={closeMenu}
                  >
                    <div className="relative w-6 h-6 rounded-lg overflow-hidden bg-white/20">
                      <Image
                        src="/logo.png"
                        alt="Logo"
                        fill
                        className="object-cover brightness-0 invert"
                      />
                    </div>
                    Download Now
                  </Link>
                </motion.div>
                <div className="mt-8 flex justify-center gap-6">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Premium Quality</span>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Fast Speed</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}




