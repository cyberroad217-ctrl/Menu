import React, { useEffect, useState } from 'react';
import { Sparkles, Zap, Brain, Rocket, ArrowRight, ShoppingBag, BookOpen } from 'lucide-react';
import { generateImage } from '../services/geminiService';

const Home: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadHero = async () => {
    setLoading(true);
    const img = await generateImage("Minimalist professional black and gold productivity setup, high-end desk accessories, cinematic lighting, 8k");
    if (img) setHeroImage(img);
    setLoading(false);
  };

  useEffect(() => { loadHero(); }, []);

  return (
    <div className="animate-in fade-in duration-700">
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          {heroImage ? (
            <img src={heroImage} className="w-full h-full object-cover grayscale brightness-50" alt="Hero" />
          ) : (
            <div className="w-full h-full bg-neutral-900 animate-pulse" />
          )}
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-500/20 bg-gold-500/5 text-gold-500 text-[8px] uppercase tracking-[0.4em] font-black mb-6">
            Protocol v5.0 Ready
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            Design Your <span className="gold-gradient italic">Legacy</span>
          </h1>
          <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto font-light leading-relaxed">
            Harnessing advanced intelligence to architect high-performance workflows for the modern creator.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button 
              onClick={() => onNavigate('blog')}
              className="px-8 py-4 bg-gold-500 text-black font-black uppercase tracking-widest text-[10px] rounded hover:bg-white transition-all flex items-center gap-2 shadow-xl shadow-gold-500/10"
            >
              Access Neural Feed <ArrowRight size={16} />
            </button>
            <button 
              onClick={() => onNavigate('marketplace')}
              className="px-8 py-4 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] rounded hover:border-gold-500 transition-all backdrop-blur-md"
            >
              Marketplace
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Brain, title: 'Neural Sync', desc: 'LLM Integration.' },
            { icon: Zap, title: 'Velocity', desc: 'Rapid execution.' },
            { icon: Rocket, title: 'Scalability', desc: 'Future-proof.' },
            { icon: Sparkles, title: 'Premium', desc: 'Golden standard.' },
          ].map((f, i) => (
            <div key={i} className="p-6 border border-white/5 bg-neutral-950/50 rounded-xl hover:border-gold-500/30 transition-all text-center">
              <f.icon className="w-8 h-8 text-gold-500 mx-auto mb-4" />
              <h3 className="text-sm font-serif font-bold mb-2 text-white uppercase tracking-tight">{f.title}</h3>
              <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;