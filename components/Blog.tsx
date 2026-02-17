import React, { useState, useEffect } from 'react';
import { Share2, Plus, Clock, ChevronRight, User, Send, X, Activity, Globe, Zap, Check, ArrowLeft, Maximize2, Wand2, Sparkles, FileText, Bookmark } from 'lucide-react';
import { Post } from '../types.ts';
import { generateBlogContent } from '../services/geminiService.ts';

const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    title: 'Cognitive Optimization via AGI Agents',
    content: 'The emergence of AGI agents marks a paradigm shift in deep learning productivity. Using Chain of Thought (CoT) reasoning, we can now automate creative decision-making workflows with 99.9% precision. This protocol leverages the latest in recursive neural architectures to ensure that every output is not just data, but synthesized intelligence. By offloading the "thought-heavy" segments of our workflow to these specialized agents, we unlock a new tier of human creativity.',
    author: 'AI Agent Alpha',
    timestamp: Date.now() - 3600000,
    tags: ['AI', 'Productivity', 'AGI'],
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
  }
];

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPosting, setIsPosting] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [rawIdeas, setRawIdeas] = useState('');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [justShared, setJustShared] = useState<string | null>(null);
  const [viewingPost, setViewingPost] = useState<Post | null>(null);

  // Load and Sync Logic (Cross-device sharing via URL)
  useEffect(() => {
    const saved = localStorage.getItem('ai_menu_articles');
    let basePosts = saved ? JSON.parse(saved) : INITIAL_POSTS;

    const urlParams = new URLSearchParams(window.location.search);
    const sharedData = urlParams.get('shared');
    
    if (sharedData) {
      try {
        const decoded = JSON.parse(atob(sharedData));
        if (!basePosts.find((p: Post) => p.id === decoded.id)) {
          basePosts = [decoded, ...basePosts];
          localStorage.setItem('ai_menu_articles', JSON.stringify(basePosts));
        }
        setViewingPost(decoded);
        // Clean URL after import
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (e) {
        console.error("Neural Sync Failed: Article payload corrupted.", e);
      }
    }
    setPosts(basePosts);
  }, []);

  // Persistent storage update
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('ai_menu_articles', JSON.stringify(posts));
    }
  }, [posts]);

  const synthesizeIdeas = async () => {
    if (!rawIdeas.trim()) return;
    setIsSynthesizing(true);
    try {
      const result = await generateBlogContent(rawIdeas);
      setNewPost({ title: result.title, content: result.content });
      setRawIdeas('');
    } catch (error) {
      console.error("Synthesizer failed:", error);
    } finally {
      setIsSynthesizing(false);
    }
  };

  const handlePost = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const userPost: Post = {
      id: `node-${Date.now()}`,
      title: newPost.title,
      content: newPost.content,
      author: 'Elite Node',
      timestamp: Date.now(),
      tags: ['Neural-Map', 'Synergy'],
      imageUrl: `https://picsum.photos/seed/${Date.now()}/800/400?grayscale`
    };

    setPosts(prev => [userPost, ...prev]);
    setNewPost({ title: '', content: '' });
    setIsPosting(false);
  };

  const shareArticle = async (post: Post) => {
    // Encodes the entire post into a URL for cross-device sharing
    const serialized = btoa(JSON.stringify(post));
    const shareUrl = `${window.location.origin}${window.location.pathname}?shared=${serialized}`;
    
    try {
      if (navigator.share) {
        await navigator.share({ title: post.title, url: shareUrl });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setJustShared(post.id);
        setTimeout(() => setJustShared(null), 2500);
      }
    } catch (err) { console.error('Sharing failed', err); }
  };

  if (viewingPost) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12 animate-in fade-in duration-500">
        <button 
          onClick={() => setViewingPost(null)} 
          className="flex items-center gap-2 text-gold-500 text-[9px] uppercase font-black mb-10 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Intelligence Feed
        </button>
        
        <article className="space-y-8">
          <header className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">{viewingPost.title}</h1>
            <div className="flex items-center gap-4 text-[8px] text-gray-500 uppercase tracking-widest font-black">
              <span className="text-gold-500">{viewingPost.author}</span>
              <span>{new Date(viewingPost.timestamp).toLocaleDateString()}</span>
            </div>
          </header>

          <div className="aspect-[16/7] w-full rounded-xl overflow-hidden border border-white/5 shadow-2xl">
            <img src={viewingPost.imageUrl} className="w-full h-full object-cover grayscale" alt="" />
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-base text-gray-300 font-light leading-relaxed whitespace-pre-wrap">
              {viewingPost.content}
            </p>
          </div>

          <div className="pt-12 border-t border-white/5 flex justify-between items-center">
             <button 
               onClick={() => shareArticle(viewingPost)} 
               className="flex items-center gap-2 bg-gold-500 text-black px-6 py-2.5 rounded text-[9px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-lg"
             >
               <Share2 size={14} /> Broadcast Node
             </button>
             <span className="text-[8px] text-gray-700 font-black uppercase tracking-widest">End of Neural Stream</span>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-serif font-bold gold-gradient">Neural Feed</h1>
          <p className="text-gray-600 text-[8px] uppercase tracking-[0.4em] font-black">Syncing Intellectual Assets</p>
        </div>
        <button 
          onClick={() => setIsPosting(!isPosting)}
          className="flex items-center gap-2 bg-gold-500 text-black px-5 py-2.5 rounded-md text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
        >
          {isPosting ? <X size={14} /> : <Plus size={14} />}
          {isPosting ? 'Cancel' : 'New Article'}
        </button>
      </div>

      {isPosting && (
        <div className="mb-12 space-y-6 animate-in slide-in-from-top-4 duration-500">
          {/* Idea Synthesizer Section */}
          <div className="p-6 bg-neutral-900/40 border border-gold-500/20 rounded-xl">
            <h3 className="text-[9px] font-black uppercase tracking-widest text-gold-500 mb-3 flex items-center gap-2">
              <Sparkles size={14} /> Idea-to-Article Synthesizer
            </h3>
            <textarea 
              placeholder="Paste discrete ideas, bullet points, or fragments..." 
              className="w-full bg-black/40 border border-white/5 p-4 min-h-[100px] outline-none focus:border-gold-500 transition-all rounded-lg text-gray-400 text-xs leading-relaxed resize-none mb-3"
              value={rawIdeas}
              onChange={e => setRawIdeas(e.target.value)}
            />
            <button 
              onClick={synthesizeIdeas}
              disabled={isSynthesizing || !rawIdeas.trim()}
              className="w-full bg-white/10 text-white border border-white/10 py-2.5 rounded text-[9px] font-black uppercase tracking-widest hover:bg-gold-500 hover:text-black disabled:opacity-20 transition-all flex items-center justify-center gap-2"
            >
              {isSynthesizing ? <Activity size={14} className="animate-spin" /> : <Wand2 size={14} />}
              {isSynthesizing ? 'Mapping Neural Pathways...' : 'Synthesize Article'}
            </button>
          </div>

          {/* Core Article Form */}
          <div className="p-6 border border-white/10 bg-black rounded-xl shadow-xl">
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Article Headline" 
                className="w-full bg-transparent border-b border-white/10 py-2 text-xl font-serif outline-none focus:border-gold-500 transition-all text-white"
                value={newPost.title}
                onChange={e => setNewPost({...newPost, title: e.target.value})}
              />
              <textarea 
                placeholder="Neural content body..." 
                className="w-full bg-transparent border border-white/5 p-4 min-h-[150px] outline-none focus:border-gold-500 transition-all rounded text-gray-400 text-sm leading-relaxed resize-none"
                value={newPost.content}
                onChange={e => setNewPost({...newPost, content: e.target.value})}
              />
              <button 
                onClick={() => handlePost()}
                className="w-full bg-gold-500 text-black py-3 rounded-md font-black uppercase text-[9px] tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Send size={14} /> Post Permanently to Network
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Article Stream */}
      <div className="space-y-10">
        {posts.map((post) => (
          <article key={post.id} className="group border border-white/5 bg-neutral-950/20 p-5 rounded-xl hover:border-gold-500/20 transition-all duration-500">
            <div className="flex flex-col md:flex-row gap-6 items-start">
               <div 
                 className="w-full md:w-40 h-40 rounded-lg overflow-hidden cursor-pointer flex-shrink-0 border border-white/5"
                 onClick={() => setViewingPost(post)}
               >
                  <img src={post.imageUrl} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-700" alt="" />
               </div>
               <div className="flex-grow space-y-3">
                  <div className="flex items-center gap-3 text-[7px] text-gray-600 uppercase tracking-widest font-black">
                    <span className="text-gold-500">{post.author}</span>
                    <span>•</span>
                    <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                  </div>
                  <h2 
                    className="text-xl font-serif font-bold text-white group-hover:text-gold-500 transition-colors cursor-pointer" 
                    onClick={() => setViewingPost(post)}
                  >
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-xs font-light leading-relaxed line-clamp-2">
                    {post.content}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-auto">
                    <button 
                      onClick={() => setViewingPost(post)}
                      className="text-[8px] uppercase tracking-widest font-black text-white/50 hover:text-gold-500 transition-all flex items-center gap-1"
                    >
                      Read More <Maximize2 size={12} />
                    </button>
                    <button 
                      onClick={() => shareArticle(post)}
                      className={`text-[8px] uppercase tracking-widest font-black flex items-center gap-1.5 transition-all ${
                        justShared === post.id ? 'text-green-500' : 'text-gray-600 hover:text-gold-500'
                      }`}
                    >
                      {justShared === post.id ? <Check size={14} /> : <Share2 size={14} />}
                      {justShared === post.id ? 'Synced' : 'Share'}
                    </button>
                  </div>
               </div>
            </div>
          </article>
        ))}
      </div>
      
      <div className="mt-20 pt-10 border-t border-white/5 text-center">
        <div className="inline-flex items-center gap-4 text-[8px] text-gray-700 uppercase tracking-[0.4em] font-black">
          <Globe size={12} /> GLOBAL INTELLIGENCE MAPPING ACTIVE
        </div>
      </div>
    </div>
  );
};

export default Blog;