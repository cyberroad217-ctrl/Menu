import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Twitter, Linkedin, ChevronRight, Layout as LayoutIcon, ShoppingBag, BookOpen, User, Home, Globe, ArrowUpRight, Zap } from 'lucide-react';
import { Page } from '../types.ts';

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
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', value: 'home' as Page, icon: Home },
    { label: 'Neural Feed', value: 'blog' as Page, icon: BookOpen },
    { label: 'Marketplace', value: 'marketplace' as Page, icon: ShoppingBag },
    { label: 'Store', value: 'store' as Page, icon: LayoutIcon },
    { label: 'About', value: 'about' as Page, icon: User },
  ];

  const handleNav = (page: Page) => {
    setPage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-gold-500 selection:text-black">
      {/* Header - More compact for focused experience */}
      <header 
        className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
          scrolled ? 'bg-black/90 backdrop-blur-md h-14' : 'bg-transparent h-20'
        }`}
      >
        <div className="max-w-5xl mx-auto px-5 h-full flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => handleNav('home')}>
            <div className="relative w-8 h-8 border border-gold-500/50 rounded flex items-center justify-center font-serif text-sm font-black text-gold-500 group-hover:bg-gold-500 group-hover:text-black transition-all">
              M
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-serif font-black tracking-tight gold-gradient uppercase">Ai Menu</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleNav(item.value)}
                  className={`text-[9px] uppercase tracking-[0.2em] font-black transition-all hover:text-gold-500 ${
                    currentPage === item.value ? 'text-gold-500' : 'text-gray-400'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Clickable Hamburger (3 Lines) */}
            <button 
              className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none z-[120] hover:bg-white/5 rounded-full transition-all" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              <div className="flex flex-col items-end gap-1 scale-90">
                <span className={`h-0.5 bg-gold-500 transition-all duration-300 ${isMenuOpen ? 'w-6 rotate-45 translate-y-1.5' : 'w-6'}`}></span>
                <span className={`h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'w-0 opacity-0' : 'w-4'}`}></span>
                <span className={`h-0.5 bg-gold-500 transition-all duration-300 ${isMenuOpen ? 'w-6 -rotate-45 -translate-y-1.5' : 'w-5'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Simplified Mobile-Ready Full Menu */}
      <div 
        className={`fixed inset-0 z-[110] bg-black/98 backdrop-blur-2xl transition-all duration-700 ease-in-out ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="h-full flex flex-col items-center justify-center gap-4">
          <span className="text-[8px] tracking-[1em] text-gold-500 uppercase font-black mb-8 opacity-50">Neural Navigation Network</span>
          {navItems.map((item, idx) => (
            <button
              key={item.value}
              onClick={() => handleNav(item.value)}
              className="group py-2"
            >
              <h3 className={`text-4xl font-serif font-black transition-all group-hover:italic ${
                currentPage === item.value ? 'gold-gradient' : 'text-white/60 hover:text-white'
              }`}>
                {item.label}
              </h3>
            </button>
          ))}
          <div className="mt-12 flex gap-8">
             <Twitter size={18} className="text-gray-600 hover:text-gold-500 transition-colors cursor-pointer" />
             <Linkedin size={18} className="text-gray-600 hover:text-gold-500 transition-colors cursor-pointer" />
             <Instagram size={18} className="text-gray-600 hover:text-gold-500 transition-colors cursor-pointer" />
          </div>
        </div>
      </div>

      <main className="flex-grow pt-20">
        {children}
      </main>

      <footer className="bg-black border-t border-white/5 py-8">
        <div className="max-w-5xl mx-auto px-5 flex flex-col md:flex-row justify-between items-center gap-4 text-[7px] text-gray-700 tracking-[0.3em] uppercase font-black">
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
            AI MENU NODE ACTIVE
          </div>
          <div className="flex items-center gap-4">
            <a href={PROTOCOL_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gold-500">PROTOCOL HUB</a>
            <span>&copy; {new Date().getFullYear()} AI MENU</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;