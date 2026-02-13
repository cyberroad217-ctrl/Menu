
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
      {/* Premium Navigation Header */}
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
              <span className="text-[7px] tracking-[0.5em] text-gray-500 uppercase mt-2 font-bold">Advanced Productivity AGI</span>
            </div>
          </div>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-12">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNav(item.value)}
                className={`text-[9px] uppercase tracking-[0.3em] font-black transition-all hover:text-gold-500 relative py-2 ${
                  currentPage === item.value ? 'text-gold-500' : 'text-gray-400'
                }`}
              >
                {item.label}
                {currentPage === item.value && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold-500 shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                )}
              </button>
            ))}
          </nav>

          {/* The 3 Straight Lines (Hamburger Menu) - Fully Clickable & Dynamic */}
          <button 
            className="group relative p-4 flex flex-col items-end gap-2 focus:outline-none z-[110]" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Access Main Menu"
          >
            {isMenuOpen ? (
              <X size={32} className="text-gold-500 hover:rotate-90 transition-all duration-500" />
            ) : (
              <div className="space-y-1.5 flex flex-col items-end">
                <span className="w-10 h-0.5 bg-gold-500 block group-hover:w-6 transition-all duration-300"></span>
                <span className="w-8 h-0.5 bg-white block group-hover:w-10 transition-all duration-300"></span>
                <span className="w-6 h-0.5 bg-gold-500 block group-hover:w-8 transition-all duration-300"></span>
              </div>
            )}
            <span className="absolute -bottom-4 right-4 text-[7px] text-gold-500 uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              {isMenuOpen ? 'CLOSE' : 'CONSOLE'}
            </span>
          </button>
        </div>
      </header>

      {/* Full-Screen Console Overlay Navigation */}
      <div 
        className={`fixed inset-0 z-[95] bg-neutral-950 transition-all duration-1000 cubic-bezier(0.77, 0, 0.175, 1) flex items-center justify-center ${
          isMenuOpen ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-110'
        }`}
      >
        {/* Background Visual Artifacts */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-gold-500/10 blur-[150px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-white/5 blur-[100px] rounded-full animate-bounce" />
          <div className="grid grid-cols-12 h-full w-full opacity-10">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border-r border-white/5" />
            ))}
          </div>
        </div>
        
        <div className="relative z-10 w-full max-w-4xl px-12 flex flex-col gap-10">
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.8em] text-gold-500 mb-6 border-b border-white/5 pb-6">
            <Globe size={16} /> Neural Navigation Network v4.0
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10">
            {navItems.map((item, idx) => (
              <button
                key={item.value}
                onClick={() => handleNav(item.value)}
                className={`group flex items-center gap-8 text-left transition-all duration-700 ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="relative flex-shrink-0">
                  <span className="text-gray-900 font-serif text-5xl font-black group-hover:text-gold-500/20 transition-colors">0{idx + 1}</span>
                  <item.icon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-gold-500 opacity-0 group-hover:opacity-100 transition-all scale-50 group-hover:scale-100" />
                </div>
                <div>
                  <h3 className={`text-4xl lg:text-5xl font-serif font-black transition-all leading-tight ${
                    currentPage === item.value ? 'text-gold-500 italic' : 'text-white hover:text-gold-500 hover:translate-x-4'
                  }`}>
                    {item.label.split(' ')[0]}
                    <br />
                    <span className="text-2xl font-sans font-light tracking-widest text-gray-500 uppercase">{item.label.split(' ')[1]}</span>
                  </h3>
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-20 pt-10 border-t border-white/5 flex flex-wrap justify-between items-center gap-8">
            <div className="flex gap-8">
              <Twitter className="w-5 h-5 text-gray-600 hover:text-gold-500 cursor-pointer transition-all" />
              <Instagram className="w-5 h-5 text-gray-600 hover:text-gold-500 cursor-pointer transition-all" />
              <Linkedin className="w-5 h-5 text-gray-600 hover:text-gold-500 cursor-pointer transition-all" />
            </div>
            <div className="flex items-center gap-3 text-[9px] uppercase tracking-widest text-gray-700 font-bold group cursor-pointer">
              Access Private Protocol <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-gold-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Page Injector */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Faceless Brand Footer */}
      <footer className="bg-black border-t border-white/5 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="space-y-8 col-span-1 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border-2 border-gold-500 rounded-lg flex items-center justify-center font-serif text-gold-500 font-black text-xl">M</div>
              <h3 className="font-serif text-3xl font-black gold-gradient tracking-tight">Ai Menu</h3>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed tracking-widest font-light uppercase">
              The premium destination for AGI-enhanced productivity. Architecting the future for faceless digital titans.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-gold-500 transition-colors cursor-pointer group">
                <Globe size={16} className="text-gray-500 group-hover:text-gold-500" />
              </div>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-gold-500 transition-colors cursor-pointer group">
                <Zap size={16} className="text-gray-500 group-hover:text-gold-500" />
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-black mb-10 text-[10px] uppercase tracking-[0.4em] text-gold-500">The Network</h4>
            <ul className="space-y-6 text-gray-500 text-[10px] uppercase tracking-[0.2em] font-black">
              <li className="hover:text-gold-500 cursor-pointer transition-all flex items-center gap-2" onClick={() => handleNav('home')}>Index Node</li>
              <li className="hover:text-gold-500 cursor-pointer transition-all flex items-center gap-2" onClick={() => handleNav('blog')}>AGI Feed</li>
              <li className="hover:text-gold-500 cursor-pointer transition-all flex items-center gap-2" onClick={() => handleNav('marketplace')}>Asset Market</li>
              <li className="hover:text-gold-500 cursor-pointer transition-all flex items-center gap-2" onClick={() => handleNav('store')}>Mastery Course</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black mb-10 text-[10px] uppercase tracking-[0.4em] text-gold-500">Support</h4>
            <ul className="space-y-6 text-gray-500 text-[10px] uppercase tracking-[0.2em] font-black">
              <li className="hover:text-gold-500 cursor-pointer transition-all">Encrypted Support</li>
              <li className="hover:text-gold-500 cursor-pointer transition-all">Documentation</li>
              <li className="hover:text-gold-500 cursor-pointer transition-all">Privacy Cipher</li>
              <li className="hover:text-gold-500 cursor-pointer transition-all">Terms of Protocol</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black mb-10 text-[10px] uppercase tracking-[0.4em] text-gold-500">Neural Subscription</h4>
            <p className="text-gray-600 text-[9px] mb-8 tracking-widest font-bold leading-relaxed">
              SUBSCRIBE TO THE NEURAL FEED TO RECEIVE REAL-TIME AGI UPDATES EVERY 10 MINUTES.
            </p>
            <div className="flex bg-neutral-900 border border-white/10 rounded-xl px-5 py-4 focus-within:border-gold-500 transition-all group">
              <input type="email" placeholder="NEURAL IDENTITY" className="bg-transparent text-[10px] w-full outline-none text-white tracking-[0.3em] font-black" />
              <button className="text-gold-500 hover:scale-125 transition-transform">
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-8 mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] text-gray-700 tracking-[0.5em] uppercase font-black">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            SYSTEMS NOMINAL • AI MENU v4.0.2
          </div>
          <span>&copy; {new Date().getFullYear()} AI MENU • ALL RIGHTS RESERVED</span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
