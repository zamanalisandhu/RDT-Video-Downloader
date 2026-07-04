'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

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
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && href.startsWith('/#') && pathname === '/') return false; // Anchor links on homepage
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

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
      <div className="relative z-[100] w-full px-4 pt-4 pb-2">
        <header 
          className="max-w-6xl mx-auto w-full bg-white border border-[#FFE8DF] rounded-full shadow-lg shadow-slate-200/20 py-2.5 px-4 md:px-6 flex items-center justify-between"
        >
          {/* Logo Container */}
          <div className="flex items-center gap-2">
            <Link 
              href="/" 
              className="flex items-center gap-2 md:gap-2.5 z-[110] group" 
              onClick={closeMenu}
            >
              <div className="relative w-8 h-8 md:w-9 md:h-9 rounded-lg overflow-hidden shadow-md shadow-brand-orange/25 transition-transform duration-200 group-hover:scale-105">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="RDT Video Downloader Logo"
                  className="object-cover w-full h-full"
                  width={36}
                  height={36}
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
              <span className="text-base sm:text-xl md:text-[20px] font-black text-slate-900 tracking-tighter sm:tracking-tight transition-colors">
                RDT<span className="text-brand-orange">Video</span>Downloader
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center gap-1 md:gap-2">
            <ul className="flex items-center gap-1 md:gap-2 list-none">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className={`text-[14px] md:text-[15px] font-bold transition-all px-4 py-1.5 rounded-full block ${
                      isActive(link.href)
                        ? 'bg-brand-orange/10 text-brand-orange'
                        : 'text-slate-600 hover:text-brand-orange'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Button - Right */}
          <div className="hidden md:flex items-center">
            <Link 
              href="https://chromewebstore.google.com/detail/rdt-video-downloader-save/mjphhkbhfkiffmlldcjcapkmninehbej"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-brand-orange hover:bg-brand-orange-light text-white font-bold rounded-full text-[14px] md:text-[15px] shadow-md shadow-brand-orange/20 transition-all active:scale-[0.98]"
              aria-label="Install RDT Video Downloader Chrome Extension"
            >
              Extension
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              className="z-[140] p-2 text-slate-900 focus:outline-none rounded-full border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors relative w-9 h-9 flex items-center justify-center overflow-hidden"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                <span className={`absolute transition-all duration-300 transform ${isMenuOpen ? 'rotate-90 opacity-0 scale-75' : 'rotate-0 opacity-100 scale-100'}`}>
                  <Menu size={20} strokeWidth={2.5} />
                </span>
                <span className={`absolute transition-all duration-300 transform ${isMenuOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-75'}`}>
                  <X size={20} strokeWidth={2.5} />
                </span>
              </div>
            </button>
          </div>
        </header>
      </div>

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
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden shadow-sm shadow-brand-orange/25">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/logo.png"
                      alt="Logo"
                      className="object-cover w-full h-full"
                      width={32}
                      height={32}
                      loading="lazy"
                    />
                  </div>
                  <span className="font-bold text-slate-900">
                    RDT <span className="text-brand-orange">Video</span> Downloader
                  </span>
                </div>
              </div>

              <div className="p-6 flex-grow overflow-y-auto">
                <ul className="flex flex-col gap-2 list-none">
                  {navLinks.map((link) => (
                    <motion.li key={link.name} variants={itemVariants}>
                      <Link 
                        href={link.href} 
                        className={`flex items-center justify-between p-3.5 rounded-2xl text-lg font-bold transition-all ${
                          isActive(link.href)
                            ? 'bg-brand-orange/10 text-brand-orange'
                            : 'text-slate-900 hover:bg-slate-50'
                        }`}
                        onClick={closeMenu}
                      >
                        {link.name}
                        <ChevronRight className="text-slate-300" size={20} aria-hidden="true" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                <motion.div variants={itemVariants}>
                  <Link 
                    href="https://chromewebstore.google.com/detail/rdt-video-downloader-save/mjphhkbhfkiffmlldcjcapkmninehbej"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 bg-brand-orange text-white text-center font-bold rounded-full shadow-lg shadow-brand-orange/25 flex items-center justify-center gap-2 text-base active:scale-[0.98] transition-transform"
                    onClick={closeMenu}
                    aria-label="Install RDT Video Downloader Chrome Extension"
                  >
                    Install Extension
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




