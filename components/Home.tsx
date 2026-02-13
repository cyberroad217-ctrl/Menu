import React, { useEffect, useState } from 'react';
import { Sparkles, Zap, Brain, Rocket, ArrowRight, ShoppingBag, BookOpen } from 'lucide-react';
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-[10px] uppercase tracking-[0.3em] font-black mb-8 animate-in slide-in-from-top-4 duration-1000">
            <Sparkles size={14} className="animate-spin" /> The Protocol of Excellence
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-6 leading-tight">
            Design Your <span className="gold-gradient italic">Legacy</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
            Harnessing advanced LLMs and AGI methodologies to architect high-performance workflows for the modern digital mastermind.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => onNavigate('blog')}
              className="px-12 py-5 bg-gold-500 text-black font-black uppercase tracking-[0.2em] rounded hover:bg-gold-400 transition-all flex items-center gap-3 shadow-xl shadow-gold-500/10"
            >
              Access Neural Feed <ArrowRight size={20} />
            </button>
            <button 
              onClick={loadHero}
              className="px-12 py-5 border border-white/20 hover:border-gold-500 text-white font-black uppercase tracking-[0.2em] rounded transition-all backdrop-blur-md"
            >
              {loading ? 'Recalibrating Art...' : 'Regenerate Interface'}
            </button>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-32 max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {features.map((f, i) => (
            <div key={i} className="p-10 border border-white/5 bg-neutral-950/50 hover:border-gold-500/30 transition-all rounded-2xl group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 blur-3xl rounded-full translate-x-16 -translate-y-16 group-hover:translate-x-8 group-hover:-translate-y-8 transition-all" />
              <f.icon className="w-12 h-12 text-gold-500 mb-8 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-2xl font-serif font-bold mb-4 text-white uppercase tracking-tight">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-light">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Ecosystem Navigation */}
      <section className="py-32 bg-neutral-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <div className="text-[10px] uppercase tracking-[0.5em] text-gold-500 mb-6 font-black">Neural Entry Points</div>
          <h2 className="text-5xl font-serif font-bold mb-20 text-white">Explore the Protocol</h2>
          <div className="flex flex-wrap justify-center gap-20">
             {[
              { label: 'Neural Feed', icon: BookOpen, page: 'blog' },
              { label: 'Asset Market', icon: ShoppingBag, page: 'marketplace' },
              { label: 'Mastery Course', icon: Rocket, page: 'store' },
              { label: 'AGI Hub', icon: Brain, page: 'about' }
             ].map((item, i) => (
               <div 
                key={i} 
                onClick={() => onNavigate(item.page as any)}
                className="flex flex-col items-center gap-6 cursor-pointer group"
               >
                 <div className="w-24 h-24 rounded-full border border-gold-500/10 flex items-center justify-center bg-black group-hover:bg-gold-500/20 group-hover:border-gold-500 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all duration-500">
                   <item.icon className="w-10 h-10 text-gold-500 group-hover:scale-125 transition-transform" />
                 </div>
                 <span className="text-[10px] uppercase tracking-[0.4em] text-gray-600 group-hover:text-gold-500 font-black transition-colors">{item.label}</span>
               </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;