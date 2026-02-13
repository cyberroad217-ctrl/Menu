import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Twitter, Linkedin, ChevronRight, Layout as LayoutIcon, ShoppingBag, BookOpen, User, Home, Globe, ArrowUpRight, Zap } from 'lucide-react';
import { Page } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  setPage: (page: Page) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, setPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const PROTOCOL_URL = "https://productivityprotocol.netlify.app";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home Index', value: 'home' as Page, icon: Home },
    { label: 'Neural Blog', value: 'blog' as Page, icon: BookOpen },
    { label: 'Decentralized Market', value: 'marketplace' as Page, icon: ShoppingBag },
    { label: 'Mastery E-Book', value: 'store' as Page, icon: LayoutIcon },
    { label: 'About Intelligence', value: 'about' as Page, icon: User },
  ];

  const handleNav = (page: Page) => {
    setPage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-gold-500 selection:text-black">
      {/* Header - Scaled down for compact feel */}
      <header 
        className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
          scrolled ? 'bg-black/95 backdrop-blur-xl border-b border-white/5 h-16' : 'bg-transparent h-24'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNav('home')}>
            <div className="relative w-10 h-10 border-2 border-gold-500 rounded-lg flex items-center justify-center font-serif text-xl font-black text-gold-500 group-hover:bg-gold-500 group-hover:text-black transition-all">
              M
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif font-black tracking-tighter gold-gradient leading-none uppercase">Ai Menu</span>
              <span className="text-[6px] tracking-[0.4em] text-gray-500 uppercase mt-1 font-black">Elite Protocol</span>
            </div>
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNav(item.value)}
                className={`text-[9px] uppercase tracking-[0.3em] font-black transition-all hover:text-gold-500 ${
                  currentPage === item.value ? 'text-gold-500 border-b border-gold-500 pb-1' : 'text-gray-400'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Functional 3 Lines Menu */}
          <button 
            className="group relative h-12 w-12 flex flex-col items-center justify-center gap-1.5 focus:outline-none z-[120] hover:bg-white/5 rounded-full transition-all" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X size={24} className="text-gold-500" />
            ) : (
              <div className="flex flex-col items-end gap-1 scale-90">
                <span className="w-8 h-0.5 bg-gold-500 block group-hover:w-5 transition-all duration-300"></span>
                <span className="w-5 h-0.5 bg-white block group-hover:w-8 transition-all duration-300"></span>
                <span className="w-8 h-0.5 bg-gold-500 block group-hover:w-6 transition-all duration-300"></span>
              </div>
            )}
          </button>
        </div>
      </header>

      {/* Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[110] bg-black/98 backdrop-blur-2xl transition-all duration-700 ease-in-out ${
          isMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="h-full flex flex-col items-center justify-center gap-6">
          <span className="text-[8px] tracking-[1em] text-gold-500 uppercase font-black mb-4">Neural Access Panel</span>
          {navItems.map((item, idx) => (
            <button
              key={item.value}
              onClick={() => handleNav(item.value)}
              className="group flex flex-col items-center gap-2"
            >
              <h3 className={`text-4xl font-serif font-black transition-all hover:scale-110 ${
                currentPage === item.value ? 'gold-gradient italic' : 'text-white'
              }`}>
                {item.label}
              </h3>
            </button>
          ))}
          <div className="mt-12 flex gap-6 grayscale opacity-50">
             <Twitter size={20} className="hover:text-gold-500 transition-colors cursor-pointer" />
             <Linkedin size={20} className="hover:text-gold-500 transition-colors cursor-pointer" />
             <Instagram size={20} className="hover:text-gold-500 transition-colors cursor-pointer" />
          </div>
        </div>
      </div>

      <main className="flex-grow pt-24">
        {children}
      </main>

      <footer className="bg-neutral-950 border-t border-white/5 py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-[8px] text-gray-700 tracking-[0.4em] uppercase font-black">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            NETWORK SYNCED • {PROTOCOL_URL.split('//')[1]}
          </div>
          <span>&copy; {new Date().getFullYear()} AI MENU • EXCELLENCE ONLY</span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;