
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Filter, ChevronLeft, ChevronRight, Star, Eye, Package, ArrowRight, Zap } from 'lucide-react';
import { Product } from '../types';

const Marketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const maxPages = 54883237565;

  // Simulated massive product database generation based on page
  const mockProducts: Product[] = Array.from({ length: 12 }).map((_, i) => ({
    id: `prod-${currentPage}-${i}`,
    name: `Neural System v${currentPage}.${i}`,
    description: `High-performance AGI utility for advanced productivity mapping and deep learning automation.`,
    price: Math.floor(Math.random() * 500) + 149.99,
    imageUrl: `https://picsum.photos/seed/market-${currentPage}-${i}/600/700?grayscale`,
    category: currentPage % 2 === 0 ? 'Framework' : 'Module'
  }));

  useEffect(() => {
    const saved = localStorage.getItem('ai_menu_market_memory');
    if (saved) {
      try {
        setRecentlyViewed(JSON.parse(saved));
      } catch (e) {
        setRecentlyViewed([]);
      }
    }
  }, []);

  const addToMemory = (product: Product) => {
    const updated = [product, ...recentlyViewed.filter(p => p.id !== product.id)].slice(0, 5);
    setRecentlyViewed(updated);
    localStorage.setItem('ai_menu_market_memory', JSON.stringify(updated));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Search and Filter Header */}
      <div className="flex flex-col lg:flex-row items-end justify-between gap-10 mb-16">
        <div className="max-w-2xl">
          <div className="inline-block px-3 py-1 bg-gold-500/10 text-gold-500 text-[10px] font-bold tracking-[0.3em] rounded uppercase mb-4">
            Decentralized Assets
          </div>
          <h1 className="text-6xl font-serif font-bold gold-gradient mb-6">Neural Marketplace</h1>
          <p className="text-gray-500 font-light text-xl leading-relaxed">
            Discovery portal for billions of digital assets. Browsing page <span className="text-white font-bold">{currentPage.toLocaleString()}</span> of {maxPages.toLocaleString()}.
          </p>
        </div>
        
        <div className="flex gap-4 w-full lg:w-auto">
          <div className="relative flex-grow lg:flex-grow-0">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gold-500" size={20} />
            <input 
              type="text" 
              placeholder="Filter neural assets..." 
              className="bg-neutral-900 border border-white/10 rounded-xl px-14 py-4 w-full lg:w-96 focus:border-gold-500 outline-none transition-all text-white"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-4 bg-neutral-900 border border-white/10 rounded-xl hover:border-gold-500 transition-colors text-white">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Marketplace Memory (Recently Viewed) */}
      {recentlyViewed.length > 0 && (
        <section className="mb-20 animate-in fade-in slide-in-from-left-4 duration-700">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[11px] uppercase tracking-[0.5em] text-gold-500 flex items-center gap-3 font-black">
              <Eye size={18} /> Neural Memory
            </h2>
            <button 
              onClick={() => { setRecentlyViewed([]); localStorage.removeItem('ai_menu_market_memory'); }}
              className="text-[10px] text-gray-600 hover:text-white transition-colors uppercase tracking-widest"
            >
              Clear Memory
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {recentlyViewed.map(product => (
              <div 
                key={product.id} 
                className="group flex flex-col gap-4 bg-neutral-950 p-4 border border-white/5 rounded-xl hover:border-gold-500/30 transition-all cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <div className="aspect-square overflow-hidden rounded-lg">
                  <img src={product.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold truncate text-white mb-1">{product.name}</div>
                  <div className="text-xs text-gold-500 font-serif">${product.price.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Main Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
        {mockProducts.map((product) => (
          <div 
            key={product.id} 
            className="group border border-white/5 bg-neutral-950/50 rounded-2xl overflow-hidden hover:border-gold-500/50 hover:bg-neutral-900 transition-all duration-500 shadow-2xl"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img 
                src={product.imageUrl} 
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" 
                alt={product.name} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <button 
                onClick={() => addToMemory(product)}
                className="absolute bottom-6 right-6 p-4 bg-gold-500 text-black rounded-full shadow-2xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:bg-white"
              >
                <ShoppingCart size={24} />
              </button>
              <div className="absolute top-6 left-6">
                <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[9px] uppercase tracking-widest text-gold-500 font-bold">
                  {product.category}
                </span>
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex items-center gap-1 text-gold-500 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
                <span className="text-[10px] text-gray-500 ml-2">(4.9)</span>
              </div>
              <h3 className="text-2xl font-serif font-bold mb-3 text-white group-hover:text-gold-500 transition-colors">{product.name}</h3>
              <p className="text-gray-500 text-sm line-clamp-2 mb-6 font-light leading-relaxed">{product.description}</p>
              
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <span className="text-2xl font-serif font-bold text-white">${product.price.toFixed(2)}</span>
                <button className="flex items-center gap-2 px-6 py-2 bg-white text-black text-[10px] font-black uppercase rounded-full hover:bg-gold-500 transition-all">
                  Acquire <Zap size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Massive Pagination Module */}
      <div className="flex flex-col items-center gap-8 mt-24 py-16 border-t border-white/10 bg-neutral-950/30 rounded-3xl">
        <h4 className="text-[10px] uppercase tracking-[0.5em] text-gray-600 font-black">Segment Index Navigation</h4>
        <div className="flex items-center gap-10">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            className="w-14 h-14 border border-white/10 rounded-full flex items-center justify-center hover:border-gold-500 hover:text-gold-500 disabled:opacity-10 transition-all"
          >
            <ChevronLeft size={28} />
          </button>
          
          <div className="flex flex-col items-center gap-3">
             <div className="flex items-center gap-4">
               <span className="text-gray-600 uppercase tracking-widest text-[10px] font-bold">Page</span>
               <input 
                 type="text" 
                 className="bg-black border-2 border-gold-500/30 text-center w-48 py-3 text-2xl gold-gradient font-bold font-serif rounded-xl focus:border-gold-500 outline-none" 
                 value={currentPage.toLocaleString()}
                 readOnly
               />
               <span className="text-gray-600 uppercase tracking-widest text-[10px] font-bold">of {maxPages.toLocaleString()}</span>
             </div>
             <p className="text-[9px] text-gray-700 tracking-[0.4em] uppercase">Massive Neural Database Layer</p>
          </div>
          
          <button 
             onClick={() => {
               setCurrentPage(prev => prev + 1);
               window.scrollTo({ top: 0, behavior: 'smooth' });
             }}
             className="flex items-center gap-3 px-8 py-4 bg-gold-500 text-black text-xs font-black uppercase rounded-full hover:bg-white hover:scale-105 transition-all shadow-xl shadow-gold-500/20"
          >
            Next Segment <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
