
import React, { useEffect, useState } from 'react';
import { Sparkles, Zap, Brain, Rocket, ChevronRight, ArrowRight } from 'lucide-react';
import { generateImage } from '../services/geminiService';

const Home: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadHero = async () => {
    setLoading(true);
    const img = await generateImage("Cinematic professional 8k hyper-realistic minimalist productivity desk setup with black and gold accents, futuristic AI hologram interface");
    if (img) setHeroImage(img);
    setLoading(false);
  };

  useEffect(() => {
    loadHero();
  }, []);

  const features = [
    { icon: Brain, title: 'AI Integration', desc: 'Seamless LLM workflows for maximum cognitive output.' },
    { icon: Zap, title: 'Rapid Execution', desc: 'Accelerated productivity systems for the modern era.' },
    { icon: Rocket, title: 'Future-Proof', desc: 'Scalable AGI-ready frameworks for creators.' },
    { icon: Sparkles, title: 'Golden Standard', desc: 'Premium design meets functional engineering.' },
  ];

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 opacity-40">
          {heroImage ? (
            <img src={heroImage} className="w-full h-full object-cover grayscale brightness-50" alt="Hero" />
          ) : (
            <div className="w-full h-full bg-neutral-900 animate-pulse" />
          )}
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-xs uppercase tracking-[0.2em] mb-8">
            <Sparkles size={14} /> The Future of Productivity
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-6 leading-tight">
            Master Your <span className="gold-gradient italic">Mindset</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-light tracking-wide">
            Leverage cutting-edge LLMs and deep learning algorithms to automate your life and achieve peak human performance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => onNavigate('store')}
              className="px-10 py-4 bg-gold-500 text-black font-bold uppercase tracking-widest rounded hover:bg-gold-400 transition-all flex items-center gap-2"
            >
              Get The E-Book <ArrowRight size={18} />
            </button>
            <button 
              onClick={loadHero}
              className="px-10 py-4 border border-white/20 hover:border-gold-500 text-white font-bold uppercase tracking-widest rounded transition-all"
            >
              {loading ? 'Generating...' : 'Regenerate Art'}
            </button>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-8 border border-white/5 bg-neutral-950/50 hover:border-gold-500/30 transition-all rounded-lg group">
              <f.icon className="w-10 h-10 text-gold-500 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-4">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Icons Section */}
      <section className="py-24 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif mb-12">Explore the Ecosystem</h2>
          <div className="flex flex-wrap justify-center gap-12">
             {[
              { label: 'Marketplace', icon: ShoppingBagIcon, page: 'marketplace' },
              { label: 'Deep Blog', icon: BookIcon, page: 'blog' },
              { label: 'Masterclass', icon: PlayIcon, page: 'store' },
              { label: 'AI Tools', icon: CpuIcon, page: 'home' }
             ].map((item, i) => (
               <div 
                key={i} 
                onClick={() => onNavigate(item.page as any)}
                className="flex flex-col items-center gap-4 cursor-pointer group"
               >
                 <div className="w-20 h-20 rounded-full border border-gold-500/20 flex items-center justify-center bg-black group-hover:bg-gold-500/10 group-hover:border-gold-500 transition-all">
                   <item.icon className="w-8 h-8 text-gold-500" />
                 </div>
                 <span className="text-sm uppercase tracking-widest text-gray-400 group-hover:text-white">{item.label}</span>
               </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper Components
const ShoppingBagIcon = (props: any) => <ShoppingBag {...props} />;
const BookIcon = (props: any) => <BookOpen {...props} />;
const PlayIcon = (props: any) => <Rocket {...props} />;
const CpuIcon = (props: any) => <Brain {...props} />;

import { ShoppingBag, BookOpen } from 'lucide-react';

export default Home;
