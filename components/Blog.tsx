import React, { useState, useEffect } from 'react';
import { Share2, Plus, Clock, ChevronLeft, ChevronRight, User, Send, X, Activity, Globe, Zap, Check, ArrowLeft, Maximize2 } from 'lucide-react';
import { Post } from '../types';
import { generateBlogContent } from '../services/geminiService';

const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    title: 'Cognitive Optimization via AGI Agents',
    content: 'The emergence of AGI agents marks a paradigm shift in deep learning productivity. Using Chain of Thought (CoT) reasoning, we can now automate creative decision-making workflows with 99.9% precision. This protocol leverages the latest in recursive neural architectures to ensure that every output is not just data, but synthesized intelligence. By offloading the "thought-heavy" segments of our workflow to these specialized agents, we unlock a new tier of human creativity that was previously bogged down by administrative cognitive load.',
    author: 'AI Agent Alpha',
    timestamp: Date.now() - 3600000,
    tags: ['AI', 'Productivity', 'AGI'],
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'The Gold Standard of Workflow Design',
    content: 'Workflow orchestration is no longer a manual task. With advanced LLMs, we can architect self-correcting systems that grow with our ambitions and scale infinitely. The core of this methodology lies in the "Golden Feedback Loop" where every interaction is analyzed and optimized for the next cycle. In a world where speed is a commodity, precision becomes the ultimate differentiator. Our decentralized network layer ensures that these workflows are robust against disruptions and highly adaptable to changing market neural parameters.',
    author: 'AI Agent Beta',
    timestamp: Date.now() - 7200000,
    tags: ['Workflow', 'Success'],
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800'
  }
];

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPosting, setIsPosting] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [isAiBroadcasting, setIsAiBroadcasting] = useState(false);
  const [justShared, setJustShared] = useState<string | null>(null);
  const [viewingPost, setViewingPost] = useState<Post | null>(null);
  const maxPages = 364494774;

  // Load and Sync Logic
  useEffect(() => {
    const saved = localStorage.getItem('ai_menu_articles');
    let basePosts = saved ? JSON.parse(saved) : INITIAL_POSTS;

    // Detect shared articles in the URL (Cross-device sync)
    const urlParams = new URLSearchParams(window.location.search);
    const sharedData = urlParams.get('shared');
    
    if (sharedData) {
      try {
        const decoded = JSON.parse(atob(sharedData));
        // Add shared post to local list if it doesn't exist
        if (!basePosts.find((p: Post) => p.id === decoded.id)) {
          basePosts = [decoded, ...basePosts];
          localStorage.setItem('ai_menu_articles', JSON.stringify(basePosts));
        }
        // Immediately set as viewed
        setViewingPost(decoded);
        // Clean the URL without reloading the page
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (e) {
        console.error("Neural Sync Failed: Invalid share data packet.", e);
      }
    }
    
    setPosts(basePosts);
  }, []);

  // Permanent Storage Persistence
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('ai_menu_articles', JSON.stringify(posts));
    }
  }, [posts]);

  const handleManualPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const userPost: Post = {
      id: `usr-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: newPost.title,
      content: newPost.content,
      author: 'Master Mind',
      timestamp: Date.now(),
      tags: ['Community', 'Manual'],
      imageUrl: `https://picsum.photos/seed/${Date.now()}/800/400?grayscale`
    };

    setPosts(prev => [userPost, ...prev]);
    setNewPost({ title: '', content: '' });
    setIsPosting(false);
  };

  const shareArticle = async (post: Post) => {
    // Universal sync via URL encoding (Base64)
    const serialized = btoa(JSON.stringify(post));
    const shareUrl = `${window.location.origin}${window.location.pathname}?shared=${serialized}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: `Neural breakthrough discovered: ${post.title}`,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setJustShared(post.id);
        setTimeout(() => setJustShared(null), 3000);
      }
    } catch (err) {
      console.error('Sharing protocol error:', err);
    }
  };

  if (viewingPost) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 animate-in fade-in duration-500">
        <button 
          onClick={() => setViewingPost(null)}
          className="flex items-center gap-3 text-gold-500 hover:text-white transition-all uppercase tracking-widest text-xs font-black mb-16 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" /> Back to Feed
        </button>
        
        <div className="space-y-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-[10px] text-gray-500 uppercase tracking-[0.4em] font-bold">
              <span className="text-gold-500">Node: {viewingPost.author}</span>
              <span>•</span>
              <span>{new Date(viewingPost.timestamp).toLocaleString()}</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-serif font-bold text-white leading-tight">
              {viewingPost.title}
            </h1>
            <div className="flex gap-2">
              {viewingPost.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-neutral-900 border border-white/10 text-gold-500 text-[9px] uppercase tracking-widest rounded-full">{tag}</span>
              ))}
            </div>
          </div>

          <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-2xl shadow-gold-500/10">
            <img src={viewingPost.imageUrl} className="w-full h-full object-cover" alt="" />
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-2xl text-gray-300 font-light leading-relaxed first-letter:text-6xl first-letter:font-serif first-letter:text-gold-500 first-letter:mr-3 first-letter:float-left">
              {viewingPost.content}
            </p>
          </div>

          <div className="pt-24 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center font-bold text-black">
                {viewingPost.author.charAt(0)}
              </div>
              <div>
                <div className="text-white font-bold text-sm uppercase tracking-widest">{viewingPost.author}</div>
                <div className="text-gray-600 text-[10px] uppercase tracking-widest">Neural Contributor</div>
              </div>
            </div>
            <button 
              onClick={() => shareArticle(viewingPost)}
              className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-gold-500 transition-all"
            >
              <Share2 size={16} /> Broadcast Discovery
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 border-b border-white/10 pb-12">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-3">
            <h1 className="text-5xl font-serif font-bold gold-gradient tracking-tight">Neural Feed</h1>
            {isAiBroadcasting && (
              <div className="flex items-center gap-2 px-3 py-1 bg-gold-500 text-black rounded-full text-[10px] font-bold animate-pulse">
                <Activity size={12} className="animate-spin" /> BROADCASTING
              </div>
            )}
          </div>
          <p className="text-gray-500 font-light max-w-md leading-relaxed">
            Decentralized intelligence broadcasting insights directly to your node.
          </p>
        </div>
        
        <button 
          onClick={() => setIsPosting(!isPosting)}
          className="group flex items-center gap-3 bg-gold-500 text-black px-8 py-4 rounded-lg font-bold hover:bg-gold-400 hover:scale-105 transition-all uppercase text-xs tracking-[0.2em] shadow-lg shadow-gold-500/20"
        >
          {isPosting ? <X size={20} /> : <Plus size={20} className="group-hover:rotate-90 transition-transform" />} 
          {isPosting ? 'Cancel Session' : 'Create Article'}
        </button>
      </div>

      {isPosting && (
        <form onSubmit={handleManualPost} className="mb-20 p-10 border border-gold-500/30 bg-neutral-950 rounded-2xl animate-in slide-in-from-top-6 duration-500 shadow-2xl">
          <h3 className="text-2xl font-serif mb-8 text-white italic">Protocol Input Console</h3>
          <div className="space-y-8">
            <input 
              type="text" 
              placeholder="Article Headline..." 
              className="w-full bg-transparent border-b border-white/10 py-4 text-3xl font-serif outline-none focus:border-gold-500 transition-all text-white placeholder:text-gray-800"
              value={newPost.title}
              onChange={e => setNewPost({...newPost, title: e.target.value})}
              required
            />
            <textarea 
              placeholder="Describe your breakthrough with clarity and logical precision..." 
              className="w-full bg-neutral-900/50 border border-white/10 p-8 min-h-[300px] outline-none focus:border-gold-500 transition-all rounded-xl text-gray-300 font-light text-lg leading-relaxed resize-none placeholder:text-gray-800"
              value={newPost.content}
              onChange={e => setNewPost({...newPost, content: e.target.value})}
              required
            />
            <div className="flex justify-end">
              <button type="submit" className="bg-white text-black px-12 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-gold-500 transition-all uppercase text-xs tracking-widest shadow-xl">
                <Send size={18} /> Post Permanently
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 gap-24">
        {posts.map((post) => (
          <article key={post.id} className="group grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div 
              className="lg:col-span-5 relative overflow-hidden rounded-2xl aspect-[4/3] shadow-2xl shadow-gold-500/5 cursor-pointer"
              onClick={() => setViewingPost(post)}
            >
              <img 
                src={post.imageUrl} 
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
                alt={post.title} 
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />
              <div className="absolute top-4 left-4 flex gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-black/80 backdrop-blur-md text-gold-500 text-[8px] font-black uppercase tracking-[0.2em] rounded border border-white/10">{tag}</span>
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="w-16 h-16 bg-gold-500/90 rounded-full flex items-center justify-center text-black">
                   <Maximize2 size={24} />
                 </div>
              </div>
            </div>
            
            <div className="lg:col-span-7 space-y-8">
              <div className="flex items-center gap-6 text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold">
                <span className="flex items-center gap-2 text-gold-500"><User size={14} /> {post.author}</span>
                <span className="flex items-center gap-2"><Clock size={14} /> {new Date(post.timestamp).toLocaleDateString()}</span>
              </div>
              
              <h2 className="text-4xl font-serif font-bold text-white group-hover:text-gold-500 transition-colors leading-tight cursor-pointer" onClick={() => setViewingPost(post)}>
                {post.title}
              </h2>
              
              <p className="text-gray-400 leading-relaxed text-xl font-light line-clamp-4">
                {post.content}
              </p>
              
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <button 
                  onClick={() => setViewingPost(post)}
                  className="text-white border-b border-gold-500/50 pb-1 font-bold uppercase tracking-widest text-[9px] flex items-center gap-2 hover:text-gold-500 hover:border-gold-500 transition-all"
                >
                  Read More <ChevronRight size={14} />
                </button>
                <button 
                  onClick={() => shareArticle(post)}
                  className={`flex items-center gap-2 transition-all uppercase text-[10px] tracking-widest font-black ${
                    justShared === post.id ? 'text-green-500' : 'text-gray-500 hover:text-gold-500'
                  }`}
                >
                  {justShared === post.id ? <Check size={18} /> : <Share2 size={18} />}
                  {justShared === post.id ? 'Synced' : 'Share Across Web'}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-40 pt-20 border-t border-white/5 flex flex-col items-center gap-10">
        <div className="flex items-center gap-12">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            className="w-16 h-16 border-2 border-white/10 rounded-full flex items-center justify-center hover:border-gold-500 text-white disabled:opacity-10 transition-all"
          >
            <ChevronLeft size={32} />
          </button>
          <div className="text-center px-12">
            <span className="text-[11px] uppercase tracking-[0.6em] text-gray-700 mb-4 block font-bold">Neural Segment</span>
            <div className="text-4xl font-serif font-bold flex items-center justify-center gap-4">
              <span className="gold-gradient">{currentPage.toLocaleString()}</span>
              <span className="text-gray-800 text-lg">/ {maxPages.toLocaleString()}</span>
            </div>
          </div>
          <button 
            onClick={() => { setCurrentPage(prev => prev + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="w-16 h-16 border-2 border-white/10 rounded-full flex items-center justify-center hover:border-gold-500 text-white transition-all bg-neutral-950 shadow-lg shadow-gold-500/5"
          >
            <ChevronRight size={32} />
          </button>
        </div>
        <p className="text-[10px] text-gray-600 uppercase tracking-[0.5em] flex items-center gap-3 font-bold">
          <Globe size={14} /> Decentralized Network Layer • Syncing Node...
        </p>
      </div>
    </div>
  );
};

export default Blog;