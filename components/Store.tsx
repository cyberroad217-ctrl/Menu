
import React from 'react';
import { CheckCircle2, Star, ShieldCheck, Zap, Download } from 'lucide-react';

const Store: React.FC = () => {
  return (
    <div className="py-24 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Product Visual */}
        <div className="relative">
          <div className="absolute -inset-4 bg-gold-500/10 blur-3xl rounded-full" />
          <div className="relative border-4 border-gold-500 rounded-lg p-1 bg-black aspect-[3/4] max-w-md mx-auto shadow-[0_0_50px_rgba(212,175,55,0.2)] group overflow-hidden">
            <div className="w-full h-full bg-neutral-900 flex flex-col items-center justify-center p-12 text-center group-hover:scale-105 transition-transform duration-700">
              <div className="w-20 h-20 border-2 border-gold-500 rounded-full flex items-center justify-center font-serif text-4xl font-bold text-gold-500 mb-8">M</div>
              <h2 className="text-4xl font-serif font-bold text-white mb-4">THE AI MENU</h2>
              <div className="h-1 w-24 bg-gold-500 mx-auto mb-6" />
              <p className="text-xl text-gray-400 font-light italic mb-8">Mastering Productivity in the Age of Artificial General Intelligence</p>
              <div className="text-xs uppercase tracking-[0.4em] text-gold-500 mt-auto">A Faceless Brand Masterpiece</div>
            </div>
            <div className="absolute top-4 right-4 bg-gold-500 text-black font-bold px-3 py-1 text-sm rounded shadow-lg">$29.99</div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-1 text-gold-500 mb-4">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <span className="text-gray-400 text-sm ml-2">5,000+ Satisfied Minds</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Master the <span className="gold-gradient">Neural Workflow</span></h1>
            <p className="text-gray-400 text-xl font-light leading-relaxed">
              Stop guessing. Start executing. This 400-page comprehensive guide reveals the exact prompt architectures, deep learning strategies, and AGI integration techniques used by the world's most productive 1%.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              '400+ Pages of AI Strategy',
              'Custom Productivity Prompts',
              'Deep Learning Case Studies',
              'AGI Readiness Roadmap',
              'Lifetime Free Updates',
              'Community Access Pass'
            ].map(item => (
              <div key={item} className="flex items-center gap-3 text-sm text-gray-300">
                <CheckCircle2 className="text-gold-500" size={18} /> {item}
              </div>
            ))}
          </div>

          <div className="pt-8 space-y-4">
            <button className="w-full bg-gold-500 text-black py-5 rounded font-bold uppercase tracking-[0.2em] text-lg hover:bg-gold-400 transition-all shadow-xl shadow-gold-500/10 flex items-center justify-center gap-3">
              Purchase for $29.99 <Download size={24} />
            </button>
            <p className="text-center text-xs text-gray-600 flex items-center justify-center gap-2">
              <ShieldCheck size={14} /> Secure Transaction • Instant PDF Download • 30-Day Guarantee
            </p>
          </div>

          <div className="border-t border-white/10 pt-8 flex items-center justify-between gap-8 grayscale opacity-50">
            <div className="flex items-center gap-2 text-xl font-bold italic"><Zap size={24} className="text-gold-500"/> TechCrunch</div>
            <div className="flex items-center gap-2 text-xl font-bold italic"><Brain size={24} className="text-gold-500"/> Wired</div>
            <div className="flex items-center gap-2 text-xl font-bold italic"><Rocket size={24} className="text-gold-500"/> Forbes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Brain, Rocket } from 'lucide-react';

export default Store;
