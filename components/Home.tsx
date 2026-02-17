import React, { useEffect, useState } from 'react';
import { Sparkles, Zap, Brain, Rocket, ArrowRight } from 'lucide-react';
import { generateImage } from '../services/geminiService.ts';

const Home: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [heroImage, setHeroImage] = useState<string | null>(null);

  useEffect(() => {
    const loadHero = async () => {
      const img = await generateImage("Minimalist black and gold professional productivity, 8k, cinematic");
      if (img) setHeroImage(img);
    };
    loadHero();
  }, []);

  return (
    <div className="animate-in fade-in duration-700">
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {heroImage ? (
            <img src={heroImage} className="w-full h-full object-cover grayscale brightness-50" alt="Hero" />
          ) : (
            <div className="w-full h-full bg-neutral-900 animate-pulse" />
          )}
        </div>
        
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full border border-gold-500/20 bg-gold-500/5 text-gold-500 text-[7px] uppercase tracking-[0.3em] font-black">
            Excellence Standard v5.0
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
            Curate Your <span className="gold-gradient italic">Workflow</span>
          </h1>
          <p className="text-base text-gray-400 max-w-lg mx-auto font-light leading-relaxed">
            High-performance intelligence architecture for creators who demand absolute clarity and recursive efficiency.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => onNavigate('blog')}
              className="px-6 py-3 bg-gold-500 text-black font-black uppercase tracking-widest text-[9px] rounded hover:bg-white transition-all flex items-center gap-2 shadow-lg"
            >
              Access Feed <ArrowRight size={14} />
            </button>
            <button 
              onClick={() => onNavigate('marketplace')}
              className="px-6 py-3 border border-white/10 text-white font-black uppercase tracking-widest text-[9px] rounded hover:border-gold-500 transition-all"
            >
              Browse Assets
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-3xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Brain, title: 'Neural Sync', desc: 'AGI Flow' },
            { icon: Zap, title: 'Velocity', desc: 'Fast execution' },
            { icon: Rocket, title: 'Scale', desc: 'Unlimited' },
            { icon: Sparkles, title: 'Golden', desc: 'Excellence' },
          ].map((f, i) => (
            <div key={i} className="p-4 border border-white/5 bg-neutral-950/40 rounded-lg text-center">
              <f.icon className="w-6 h-6 text-gold-500 mx-auto mb-3" />
              <h3 className="text-[10px] font-serif font-bold mb-1 text-white uppercase">{f.title}</h3>
              <p className="text-gray-600 text-[7px] font-black uppercase tracking-widest">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;