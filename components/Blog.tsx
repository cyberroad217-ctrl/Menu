import React, { useState, useEffect } from 'react';
import { Share2, Plus, Clock, ChevronLeft, ChevronRight, User, Send, X, Activity, Globe, Zap, Check, ArrowLeft, Maximize2, Wand2, Sparkles, FileText } from 'lucide-react';
import { Post } from '../types';
import { generateBlogContent } from '../services/geminiService';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [justShared, setJustShared] = useState<string | null>(null);
  const [viewingPost, setViewingPost] = useState<Post | null>(null);

  // Load and Sync Logic
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
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (e) {
        console.error("Neural Sync Failed", e);
      }
    }
    setPosts(basePosts);
  }, []);

  // Permanent Storage
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
      console.error("Synthesizer failed", error);
    } finally {
      setIsSynthesizing(false);
    }
  };

  const handleManualPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const userPost: Post = {
      id: `usr-${Date.now()}`,
      title: newPost.title,
      content: newPost.content,
      author: 'Master User',
      timestamp: Date.now(),
      tags: ['Community', 'Synthesized'],
      imageUrl: `https://picsum.photos/seed/${Date.now()}/800/400?grayscale`
    };

    setPosts(prev => [userPost, ...prev]);
    setNewPost({ title: '', content: '' });
    setIsPosting(false);
  };

  const shareArticle = async (post: Post) => {
    const serialized = btoa(JSON.stringify(post));
    const shareUrl = `${window.location.origin}${window.location.pathname}?shared=${serialized}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: post.title, url: shareUrl });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setJustShared(post.id);
        setTimeout(() => setJustShared(null), 2000);
      }
    } catch (err) { console.error('Share failed', err); }
  };

  if (viewingPost) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12 animate-in fade-in duration-500">
        <button onClick={() => setViewingPost(null)} className="flex items-center gap-2 text-gold-500 text-[10px] uppercase font-black mb-12 group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Feed
        </button>
        <div className="space-y-8">
          <h1 className="text-4xl font-serif font-bold text-white leading-tight">{viewingPost.title}</h1>
          <div className="flex items-center gap-4 text-[9px] text-gray-500 uppercase tracking-widest font-bold">
            <span className="text-gold-500">{viewingPost.author}</span>
            <span>•</span>
            <span>{new Date(viewingPost.timestamp).toLocaleDateString()}</span>
          </div>
          <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden grayscale">
            <img src={viewingPost.imageUrl} className="w-full h-full object-cover" alt="" />
          </div>
          <p className="text-lg text-gray-300 font-light leading-relaxed">{viewingPost.content}</p>
          <div className="pt-12 border-t border-white/5">
             <button onClick={() => shareArticle(viewingPost)} className="flex items-center gap-2 bg-gold-500 text-black px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all">
               <Share2 size={16} /> Share This Insight
             </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-serif font-bold gold-gradient mb-2">Neural Feed</h1>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Decentralized Intelligence Network</p>
        </div>
        <button 
          onClick={() => setIsPosting(!isPosting)}
          className="flex items-center gap-2 bg-gold-500 text-black px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-gold-500/10"
        >
          {isPosting ? <X size={16} /> : <FileText size={16} />}
          {isPosting ? 'Close' : 'Create Article'}
        </button>
      </div>

      {isPosting && (
        <div className="mb-16 space-y-8 animate-in slide-in-from-top-4 duration-500">
          {/* Idea Synthesizer */}
          <div className="p-8 bg-neutral-900/50 border border-gold-500/20 rounded-2xl">
            <h3 className="text-sm font-serif italic text-gold-500 mb-4 flex items-center gap-2">
              <Sparkles size={16} /> Neural Idea Synthesizer
            </h3>
            <textarea 
              placeholder="Type discrete ideas, bullet points, or raw thoughts here..." 
              className="w-full bg-black/50 border border-white/5 p-6 min-h-[120px] outline-none focus:border-gold-500 transition-all rounded-xl text-gray-400 text-sm leading-relaxed resize-none mb-4"
              value={rawIdeas}
              onChange={e => setRawIdeas(e.target.value)}
            />
            <button 
              onClick={synthesizeIdeas}
              disabled={isSynthesizing || !rawIdeas.trim()}
              className="w-full bg-white text-black py-3 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-gold-500 disabled:opacity-30 transition-all flex items-center justify-center gap-2"
            >
              {isSynthesizing ? <Activity size={16} className="animate-spin" /> : <Wand2 size={16} />}
              {isSynthesizing ? 'Synthesizing Neural Map...' : 'Synthesize Into Article'}
            </button>
          </div>

          {/* Posting Form */}
          <form onSubmit={handleManualPost} className="p-8 border border-white/5 bg-neutral-950 rounded-2xl shadow-xl">
            <h3 className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-6 font-bold">Article Output</h3>
            <div className="space-y-6">
              <input 
                type="text" 
                placeholder="Headline" 
                className="w-full bg-transparent border-b border-white/10 py-3 text-2xl font-serif outline-none focus:border-gold-500 transition-all text-white"
                value={newPost.title}
                onChange={e => setNewPost({...newPost, title: e.target.value})}
                required
              />
              <textarea 
                placeholder="Article content..." 
                className="w-full bg-transparent border border-white/10 p-6 min-h-[200px] outline-none focus:border-gold-500 transition-all rounded-xl text-gray-400 text-sm leading-relaxed resize-none"
                value={newPost.content}
                onChange={e => setNewPost({...newPost, content: e.target.value})}
                required
              />
              <button type="submit" className="w-full bg-gold-500 text-black py-4 rounded-lg font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-gold-500/10">
                <Send size={16} /> Post Permanently to Network
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-12">
        {posts.map((post) => (
          <article key={post.id} className="group border border-white/5 bg-neutral-950/30 p-6 rounded-2xl hover:border-gold-500/20 transition-all duration-500">
            <div className="flex flex-col md:flex-row gap-8 items-start">
               <div className="w-full md:w-1/3 aspect-[4/3] rounded-xl overflow-hidden cursor-pointer" onClick={() => setViewingPost(post)}>
                  <img src={post.imageUrl} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-700" alt="" />
               </div>
               <div className="w-full md:w-2/3 space-y-4">
                  <div className="flex items-center gap-4 text-[8px] text-gray-600 uppercase tracking-widest font-black">
                    <span className="text-gold-500">{post.author}</span>
                    <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-white group-hover:text-gold-500 transition-colors cursor-pointer" onClick={() => setViewingPost(post)}>
                    {post.title}
                  </h2>
                  <p className="text-gray-400 text-sm font-light leading-relaxed line-clamp-3">
                    {post.content}
                  </p>
                  <div className="flex items-center justify-between pt-4">
                    <button 
                      onClick={() => setViewingPost(post)}
                      className="text-[9px] uppercase tracking-widest font-black text-white hover:text-gold-500 transition-all border-b border-gold-500/30 pb-1"
                    >
                      Read Analysis
                    </button>
                    <button 
                      onClick={() => shareArticle(post)}
                      className={`text-[9px] uppercase tracking-widest font-black flex items-center gap-2 transition-all ${
                        justShared === post.id ? 'text-green-500' : 'text-gray-600 hover:text-gold-500'
                      }`}
                    >
                      {justShared === post.id ? <Check size={14} /> : <Share2 size={14} />}
                      {justShared === post.id ? 'Copied' : 'Share'}
                    </button>
                  </div>
               </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;