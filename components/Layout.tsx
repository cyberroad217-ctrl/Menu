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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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
      {/* Header */}
      <header 
        className={`fixed top-0 w-full z-[100] transition-all duration-700 ${
          scrolled ? 'bg-black/95 backdrop-blur-2xl border-b border-white/5 h-20' : 'bg-transparent h-32'
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => handleNav('home')}>
            <div className="relative w-12 h-12 border-2 border-gold-500 rounded-xl flex items-center justify-center font-serif text-2xl font-black text-gold-500 group-hover:bg-gold-500 group-hover:text-black transition-all rotate-6 group-hover:rotate-0 shadow-lg shadow-gold-500/10">
              M
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-serif font-black tracking-tighter gold-gradient leading-none uppercase">Ai Menu</span>
              <span className="text-[7px] tracking-[0.5em] text-gray-500 uppercase mt-2 font-black">Elite AGI Protocol</span>
            </div>
          </div>

          {/* Desktop Links (Hidden on small screens) */}
          <nav className="hidden lg:flex items-center gap-12">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNav(item.value)}
                className={`text-[10px] uppercase tracking-[0.3em] font-black transition-all hover:text-gold-500 relative py-2 ${
                  currentPage === item.value ? 'text-gold-500' : 'text-gray-400'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* High-Impact Clickable Hamburger (The 3 Lines) */}
          <button 
            className="group relative h-16 w-16 flex flex-col items-center justify-center gap-2 focus:outline-none z-[120] hover:bg-white/5 rounded-full transition-all" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Neural Menu"
          >
            {isMenuOpen ? (
              <X size={32} className="text-gold-500 animate-in zoom-in duration-300" />
            ) : (
              <div className="flex flex-col items-end gap-1.5">
                <span className="w-10 h-0.5 bg-gold-500 block group-hover:w-6 transition-all duration-500"></span>
                <span className="w-7 h-0.5 bg-white block group-hover:w-10 transition-all duration-500"></span>
                <span className="w-4 h-0.5 bg-gold-500 block group-hover:w-8 transition-all duration-500"></span>
              </div>
            )}
            <span className="absolute -bottom-2 text-[6px] text-gold-500 uppercase tracking-[0.4em] font-black opacity-0 group-hover:opacity-100 transition-opacity">
              {isMenuOpen ? 'CLOSE' : 'CONSOLE'}
            </span>
          </button>
        </div>
      </header>

      {/* Full-Screen Console Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[95] bg-black transition-all duration-1000 cubic-bezier(0.77, 0, 0.175, 1) flex items-center justify-center ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-full'
        }`}
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(212,175,55,0.1)_0%,transparent_70%)]" />
          <div className="grid grid-cols-12 h-full w-full">
            {[...Array(12)].map((_, i) => <div key={i} className="border-r border-white/5" />)}
          </div>
        </div>
        
        <div className="relative z-10 w-full max-w-4xl px-12 flex flex-col gap-8">
          <div className="text-[10px] uppercase tracking-[1em] text-gold-500 mb-6 border-b border-white/5 pb-6 text-center">
            Neural Navigation Network
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-x-20">
            {navItems.map((item, idx) => (
              <button
                key={item.value}
                onClick={() => handleNav(item.value)}
                className={`group flex items-center gap-8 transition-all duration-700 text-left ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="relative">
                  <span className="text-gray-900 font-serif text-6xl font-black group-hover:text-gold-500/20 transition-colors">0{idx + 1}</span>
                  <item.icon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-gold-500 opacity-0 group-hover:opacity-100 transition-all scale-50 group-hover:scale-100" />
                </div>
                <div>
                  <h3 className={`text-5xl font-serif font-black transition-all ${
                    currentPage === item.value ? 'text-gold-500 italic' : 'text-white hover:text-gold-500 hover:translate-x-4'
                  }`}>
                    {item.label.split(' ')[0]}
                  </h3>
                  <p className="text-[10px] tracking-[0.4em] text-gray-600 uppercase mt-1 font-bold group-hover:text-gold-400 transition-colors">
                    {item.label.split(' ').slice(1).join(' ')}
                  </p>
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-20 pt-10 border-t border-white/5 flex justify-between items-center text-gray-700 uppercase tracking-widest text-[9px] font-black">
            <div className="flex gap-8">
              <Twitter className="w-5 h-5 hover:text-gold-500 cursor-pointer" />
              <Instagram className="w-5 h-5 hover:text-gold-500 cursor-pointer" />
              <Linkedin className="w-5 h-5 hover:text-gold-500 cursor-pointer" />
            </div>
            <div className="flex items-center gap-2 group cursor-pointer hover:text-gold-500 transition-colors">
              Access Private Protocol <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      <main className="flex-grow">
        {children}
      </main>

      {/* Premium Footer */}
      <footer className="bg-black border-t border-white/5 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border-2 border-gold-500 rounded-lg flex items-center justify-center font-serif text-gold-500 font-black text-xl">M</div>
              <h3 className="font-serif text-3xl font-black gold-gradient tracking-tight uppercase">Ai Menu</h3>
            </div>
            <p className="text-gray-500 text-[10px] leading-relaxed tracking-widest font-black uppercase">
              The golden standard for AGI-enhanced productivity. Architecting the future for digital masterminds.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-black mb-10 text-[10px] uppercase tracking-[0.4em] text-gold-500">Protocol</h4>
            <ul className="space-y-6 text-gray-500 text-[9px] uppercase tracking-[0.2em] font-black">
              <li className="hover:text-gold-500 cursor-pointer" onClick={() => handleNav('home')}>Index</li>
              <li className="hover:text-gold-500 cursor-pointer" onClick={() => handleNav('blog')}>Neural Feed</li>
              <li className="hover:text-gold-500 cursor-pointer" onClick={() => handleNav('marketplace')}>Market Assets</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black mb-10 text-[10px] uppercase tracking-[0.4em] text-gold-500">Intelligence</h4>
            <ul className="space-y-6 text-gray-500 text-[9px] uppercase tracking-[0.2em] font-black">
              <li className="hover:text-gold-500 cursor-pointer">Encryption Support</li>
              <li className="hover:text-gold-500 cursor-pointer">AGI Roadmap</li>
              <li className="hover:text-gold-500 cursor-pointer">Privacy Cipher</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black mb-10 text-[10px] uppercase tracking-[0.4em] text-gold-500">Neural Sync</h4>
            <div className="flex bg-neutral-900 border border-white/10 rounded-xl px-5 py-4 focus-within:border-gold-500 transition-all">
              <input type="email" placeholder="IDENTITY EMAIL" className="bg-transparent text-[10px] w-full outline-none text-white tracking-widest font-black" />
              <button className="text-gold-500 hover:scale-125 transition-transform"><ChevronRight size={22} /></button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-8 mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[8px] text-gray-700 tracking-[0.5em] uppercase font-black">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            SYSTEMS NOMINAL • AI MENU v5.0
          </div>
          <span>&copy; {new Date().getFullYear()} AI MENU • ALL RIGHTS RESERVED</span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;