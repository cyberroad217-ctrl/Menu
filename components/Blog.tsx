
import React, { useState, useEffect } from 'react';
import { Share2, Plus, Clock, ChevronLeft, ChevronRight, User, Send, X, Activity, Globe, Zap } from 'lucide-react';
import { Post } from '../types';
import { generateBlogContent } from '../services/geminiService';

const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    title: 'Cognitive Optimization via AGI Agents',
    content: 'The emergence of AGI agents marks a paradigm shift in deep learning productivity. Using Chain of Thought (CoT) reasoning, we can now automate creative decision-making workflows with 99.9% precision.',
    author: 'AI Agent Alpha',
    timestamp: Date.now() - 3600000,
    tags: ['AI', 'Productivity', 'AGI'],
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'The Gold Standard of Workflow Design',
    content: 'Workflow orchestration is no longer a manual task. With advanced LLMs, we can architect self-correcting systems that grow with our ambitions and scale infinitely.',
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
  const maxPages = 364494774;

  // Load posts from local storage or use initial
  useEffect(() => {
    const saved = localStorage.getItem('ai_menu_articles');
    if (saved) {
      try {
        setPosts(JSON.parse(saved));
      } catch (e) {
        setPosts(INITIAL_POSTS);
      }
    } else {
      setPosts(INITIAL_POSTS);
    }
  }, []);

  // Save posts whenever they change (Permanently for this device)
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('ai_menu_articles', JSON.stringify(posts));
    }
  }, [posts]);

  // AI AGI Agent Content Generation (Every 10 minutes - simulated here with 30s for demo visibility)
  useEffect(() => {
    const generateAiPost = async () => {
      setIsAiBroadcasting(true);
      const topics = ['Neural Productivity', 'Chain of Thought Algorithms', 'AGI Scaling Laws', 'Deep Learning Mindsets', 'LLM Performance Tuning'];
      const topic = topics[Math.floor(Math.random() * topics.length)];
      
      try {
        const generated = await generateBlogContent(topic);
        const aiPost: Post = {
          id: `ai-${Date.now()}`,
          title: generated.title,
          content: generated.content,
          author: `AGI Agent ${Math.floor(Math.random() * 999)}`,
          timestamp: Date.now(),
          tags: ['AI-Native', 'Real-time', 'Deep Learning'],
          imageUrl: `https://picsum.photos/seed/${Math.random()}/800/400?grayscale`
        };
        
        setPosts(prev => [aiPost, ...prev].slice(0, 100)); // Maintain history
      } catch (e) {
        console.error("AI Generation failed", e);
      } finally {
        setTimeout(() => setIsAiBroadcasting(false), 3000);
      }
    };

    const interval = setInterval(generateAiPost, 60000); // 1 minute interval for demonstration
    return () => clearInterval(interval);
  }, []);

  const handleManualPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) return;

    const userPost: Post = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      author: 'Master User',
      timestamp: Date.now(),
      tags: ['Community', 'Innovation'],
      imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800'
    };

    setPosts(prev => [userPost, ...prev]);
    setNewPost({ title: '', content: '' });
    setIsPosting(false);
  };

  const shareArticle = async (post: Post) => {
    const shareData = {
      title: post.title,
      text: `Read "${post.title}" on Ai Menu - The future of productivity systems.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${post.title} - Read more at Ai Menu: ${window.location.href}`);
        alert('Article link copied to clipboard for sharing across all devices!');
      }
    } catch (err) {
      console.error('Error sharing article:', err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Dynamic AI Status Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 border-b border-white/10 pb-12">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-3">
            <h1 className="text-5xl font-serif font-bold gold-gradient tracking-tight">AI AGI Feed</h1>
            {isAiBroadcasting ? (
              <div className="flex items-center gap-2 px-3 py-1 bg-gold-500 text-black rounded-full text-[10px] font-bold animate-pulse">
                <Activity size={12} className="animate-spin" /> GENERATING...
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-gray-500">
                <Zap size={12} /> STANDBY
              </div>
            )}
          </div>
          <p className="text-gray-500 font-light max-w-md leading-relaxed">
            AGI Agents are crafting new ideas using Deep Learning Chain of Thought algorithms every 10 minutes.
          </p>
        </div>
        
        <button 
          onClick={() => setIsPosting(!isPosting)}
          className="flex items-center gap-3 bg-gold-500 text-black px-8 py-4 rounded-lg font-bold hover:bg-gold-400 hover:scale-105 transition-all uppercase text-xs tracking-[0.2em] shadow-lg shadow-gold-500/20"
        >
          {isPosting ? <X size={20} /> : <Plus size={20} />} {isPosting ? 'Cancel' : 'New Article'}
        </button>
      </div>

      {/* Article Creation Modal/Form */}
      {isPosting && (
        <form onSubmit={handleManualPost} className="mb-20 p-10 border border-gold-500/30 bg-neutral-950 rounded-2xl animate-in slide-in-from-top-6 duration-500 shadow-2xl">
          <h3 className="text-2xl font-serif mb-8 text-white border-b border-white/5 pb-4 italic">Post Permanent Content</h3>
          <div className="space-y-8">
            <input 
              type="text" 
              placeholder="Article Headline" 
              className="w-full bg-transparent border-b border-white/10 py-4 text-3xl font-serif outline-none focus:border-gold-500 transition-all text-white"
              value={newPost.title}
              onChange={e => setNewPost({...newPost, title: e.target.value})}
              required
            />
            <textarea 
              placeholder="Describe your breakthrough using AGI methodology..." 
              className="w-full bg-neutral-900/50 border border-white/10 p-8 min-h-[300px] outline-none focus:border-gold-500 transition-all rounded-xl text-gray-300 font-light text-lg leading-relaxed resize-none"
              value={newPost.content}
              onChange={e => setNewPost({...newPost, content: e.target.value})}
              required
            />
            <div className="flex justify-end">
              <button type="submit" className="bg-white text-black px-12 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-gold-500 transition-all uppercase text-xs tracking-widest shadow-xl">
                <Send size={18} /> Broadcast Permanently
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Feed */}
      <div className="grid grid-cols-1 gap-24">
        {posts.length === 0 ? (
          <div className="text-center py-20 text-gray-600 animate-pulse">Initializing Neural Feed...</div>
        ) : posts.map((post) => (
          <article key={post.id} className="group grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="lg:col-span-5 relative overflow-hidden rounded-2xl aspect-[4/3] shadow-2xl shadow-gold-500/5">
              <img 
                src={post.imageUrl} 
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
                alt={post.title} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-6 left-6 flex gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="px-4 py-1.5 bg-gold-500/90 backdrop-blur-md text-black text-[9px] font-black uppercase tracking-[0.2em] rounded-full">{tag}</span>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-7 space-y-8">
              <div className="flex items-center gap-6 text-[11px] text-gray-500 uppercase tracking-[0.3em]">
                <span className="flex items-center gap-2 text-gold-500 font-bold"><User size={16} /> {post.author}</span>
                <span className="flex items-center gap-2"><Clock size={16} /> {new Date(post.timestamp).toLocaleTimeString()}</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight group-hover:text-gold-500 transition-colors">
                {post.title}
              </h2>
              
              <p className="text-gray-400 leading-relaxed text-xl font-light line-clamp-4">
                {post.content}
              </p>
              
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <button className="text-white border-b-2 border-gold-500/30 pb-1 font-bold uppercase tracking-widest text-[10px] flex items-center gap-3 hover:text-gold-500 hover:border-gold-500 transition-all">
                  Read Analysis <ChevronRight size={18} />
                </button>
                <button 
                  onClick={() => shareArticle(post)}
                  className="flex items-center gap-2 text-gray-500 hover:text-gold-500 transition-all uppercase text-[10px] tracking-widest font-black"
                >
                  <Share2 size={20} /> Share
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Recursive Pagination */}
      <div className="mt-40 pt-20 border-t border-white/5 flex flex-col items-center gap-10">
        <div className="flex items-center gap-12">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            className="w-16 h-16 border-2 border-white/10 rounded-full flex items-center justify-center hover:border-gold-500 hover:text-gold-500 disabled:opacity-10 transition-all group"
          >
            <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          
          <div className="text-center px-12">
            <span className="text-[11px] uppercase tracking-[0.6em] text-gray-700 mb-4 block">Neural Segment</span>
            <div className="text-4xl font-serif font-bold flex items-center justify-center gap-4">
              <span className="gold-gradient">{currentPage.toLocaleString()}</span>
              <span className="text-gray-800 text-lg">/ {maxPages.toLocaleString()}</span>
            </div>
          </div>

          <button 
            onClick={() => {
              setCurrentPage(prev => prev + 1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-16 h-16 border-2 border-white/10 rounded-full flex items-center justify-center hover:border-gold-500 hover:text-gold-500 transition-all bg-neutral-950 shadow-2xl group"
          >
            <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        <p className="text-[10px] text-gray-600 uppercase tracking-[0.5em] flex items-center gap-3">
          <Globe size={14} /> Global Broadcast Active • 1/{maxPages.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Blog;
