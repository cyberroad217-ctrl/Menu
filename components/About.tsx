import React from 'react';

const About: React.FC = () => {
  const PROTOCOL_URL = "https://productivityprotocol.netlify.app";

  return (
    <div className="py-24 max-w-4xl mx-auto px-4">
      <div className="text-center mb-16">
        <div className="w-24 h-24 border-4 border-gold-500 rounded-full flex items-center justify-center font-serif text-5xl font-bold text-gold-500 mx-auto mb-8 shadow-2xl shadow-gold-500/20">M</div>
        <h1 className="text-5xl font-serif font-bold mb-4 gold-gradient">About Ai Menu</h1>
        <p className="text-xl text-gray-500 font-light">The Faceless Standard for Digital Excellence</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-8 text-gray-400 font-light text-lg leading-relaxed">
        <p>
          <strong className="text-white font-bold">Ai Menu</strong> is not just a brand; it is a philosophy. We believe that true productivity is achieved when the barriers between human intent and machine execution are dissolved. Our ecosystem is built on the pillars of <span className="text-gold-500">Black</span> (Sophistication), <span className="text-white">White</span> (Clarity), and <span className="text-gold-500">Gold</span> (Excellence).
        </p>
        
        <h2 className="text-3xl font-serif font-bold text-white pt-8 border-t border-white/5">The Faceless Brand</h2>
        <p>
          We operate as a faceless entity because we believe the message is more important than the messenger. Our value lies in the results our systems provide to thousands of creators globally. By removing the ego, we focus entirely on the engineering of AGI-driven workflows.
        </p>

        <h2 className="text-3xl font-serif font-bold text-white pt-8 border-t border-white/5">The Productivity Protocol</h2>
        <p>
          As part of our commitment to universal cognitive output, we synchronize our efforts with the <a href={PROTOCOL_URL} target="_blank" rel="noopener noreferrer" className="text-gold-500 hover:underline font-bold">Productivity Protocol Hub</a>. This central node serves as the primary intelligence repository for our decentralized network, ensuring that all neural assets are optimized for maximum human-machine synergy.
        </p>

        <h2 className="text-3xl font-serif font-bold text-white pt-8 border-t border-white/5">Deep Learning Heritage</h2>
        <p>
          Our foundations are built on cutting-edge LLM research and Chain of Thought (CoT) algorithms. Every article, every product, and every strategy shared within the Ai Menu network is vetted through a rigorous neural evaluation process to ensure it meets the golden standard of productivity.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/5">
          <div className="text-center">
            <div className="text-4xl font-serif font-bold text-gold-500 mb-2">12M+</div>
            <div className="text-xs uppercase tracking-widest text-gray-600">Neutral Parameters</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-serif font-bold text-gold-500 mb-2">350k+</div>
            <div className="text-xs uppercase tracking-widest text-gray-600">Active Minds</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-serif font-bold text-gold-500 mb-2">∞</div>
            <div className="text-xs uppercase tracking-widest text-gray-600">Possibilities</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;