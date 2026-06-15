import React, { useState } from 'react';
import { BookOpen, User, Calendar, Clock, X, ArrowRight, Share2, Heart } from 'lucide-react';
import { BLOG_ARTICLES } from '../data';
import { BlogArticle } from '../types';

export default function BlogSection() {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Hygiene & Care' | 'Prevention' | 'Restorative' | 'Nutrition'>('All');
  const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>({});
  const [hasLiked, setHasLiked] = useState<{ [key: string]: boolean }>({});
  const [shareCopied, setShareCopied] = useState(false);

  const categories = ['All', 'Hygiene & Care', 'Prevention', 'Restorative', 'Nutrition'] as const;

  const filteredArticles = BLOG_ARTICLES.filter((art) => {
    if (activeCategory === 'All') return true;
    return art.category === activeCategory;
  });

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid opening the article modal
    const liked = hasLiked[id];
    setHasLiked((prev) => ({ ...prev, [id]: !liked }));
    setLikeCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 24) + (liked ? -1 : 1),
    }));
  };

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareCopied(true);
    setTimeout(() => {
      setShareCopied(false);
    }, 2500);
  };

  return (
    <div className="w-full bg-[#0a0f18] text-white py-12 md:py-24 px-4 font-sans">
      
      {/* Blog Intro Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col gap-3">
        <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block">Oral Health Blog</span>
        <h2 className="font-serif font-light text-3xl sm:text-4xl text-white tracking-tight">Expert Oral Health Insights</h2>
        <div className="h-0.5 w-12 bg-[#D4AF37] mx-auto rounded-full mt-1" />
        <p className="font-sans text-gray-400 text-sm leading-relaxed mt-2 text-pretty">
          Educating yourself is the first step toward lifelong teeth wellness. Read medical guidelines curated by our lead consultants BDS and MDS specialists.
        </p>
      </div>

      {/* Category Tabs Filter */}
      <div className="flex flex-wrap justify-center items-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`font-sans text-xs sm:text-sm font-semibold py-2 px-5 rounded-full border transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-teal-500 text-black border-transparent shadow-[#D4AF37]/10 shadow-lg'
                : 'bg-[#0d1522] text-gray-400 border-white/5 hover:border-white/10 hover:bg-[#0d1522]/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Articles Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredArticles.map((article) => {
          const currentLikes = likeCounts[article.id] || 24;
          const userLiked = hasLiked[article.id];
          return (
            <article 
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="bg-[#0d1522]/40 rounded-2xl border border-white/5 shadow-2xl overflow-hidden flex flex-col hover:shadow-2xl hover:border-white/10 hover:bg-[#0d1522]/80 transition-all cursor-pointer hover:-translate-y-1 duration-300"
            >
              {/* Photo */}
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 bg-[#0a0f18]/90 text-[10px] text-teal-400 font-bold px-2.5 py-1 rounded border border-white/10 uppercase tracking-widest font-sans">
                  {article.category}
                </span>
              </div>

              {/* Detail Content */}
              <div className="p-6 flex flex-col gap-3.5 flex-grow justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs font-sans text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-teal-450" /> {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-teal-450" /> {article.readTime}
                    </span>
                  </div>
                  
                  <h3 className="font-serif text-[#D4AF37] text-lg sm:text-xl tracking-tight leading-snug mt-2 text-balance font-light">
                    {article.title}
                  </h3>
                  
                  <p className="font-sans text-gray-400 text-xs sm:text-sm leading-relaxed text-pretty mt-1">
                    {article.excerpt}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4 mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#D4AF37] to-teal-500 flex items-center justify-center text-[#0a0f18] text-[10px] uppercase font-mono font-black">
                      {article.author.charAt(4) || 'DS'}
                    </div>
                    <div>
                      <p className="font-sans text-xs font-bold text-white leading-none">{article.author}</p>
                      <p className="font-sans text-[10px] text-gray-500 mt-1">Dental Specialist</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Social Like indicator */}
                    <button 
                      onClick={(e) => handleLike(article.id, e)}
                      className={`flex items-center gap-1 text-[10px] font-sans font-bold cursor-pointer transition-colors px-2.5 py-1 rounded ${userLiked ? 'text-black bg-teal-500' : 'text-gray-400 hover:text-white bg-white/[0.02]'}`}
                      title={userLiked ? "Unlike" : "Like"}
                    >
                      <Heart className={`w-3.5 h-3.5 ${userLiked ? 'fill-current' : ''}`} />
                      <span>{currentLikes}</span>
                    </button>
                    
                    <span className="text-xs font-bold text-teal-450 text-teal-400 flex items-center gap-1 uppercase tracking-widest">
                      <span>Read</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>

            </article>
          );
        })}
      </div>

      {/* Main Full Blog Modal Reader */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0d1522] rounded-3xl overflow-hidden max-w-3xl w-full max-h-[90vh] shadow-2xl flex flex-col border border-white/10 animate-in zoom-in-95 duration-150 text-white">
            
            {/* Modal Heading Header */}
            <div className="p-4 sm:p-6 border-b border-white/5 flex justify-between items-center bg-[#0a0f18]">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-teal-400" />
                <span className="font-serif text-gray-400 text-xs sm:text-sm uppercase tracking-wide">Clinic Article Reader</span>
              </div>
              <button 
                onClick={() => setSelectedArticle(null)}
                className="p-2 text-gray-400 hover:text-white bg-white/[0.02] border border-white/10 rounded-full hover:bg-white/10 transition-colors shadow-sm cursor-pointer"
                title="Close Reader"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scroll Content */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-grow flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-gray-400">
                <span className="bg-teal-500/10 text-teal-400 font-bold px-2 py-1 rounded border border-teal-500/20">
                  {selectedArticle.category}
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-teal-400" /> {selectedArticle.date}</span>
                <span>&bull;</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-teal-400" /> {selectedArticle.readTime}</span>
              </div>

              <h1 className="font-serif text-[#D4AF37] text-xl sm:text-3xl tracking-tight leading-tight font-light">
                {selectedArticle.title}
              </h1>

              <div className="h-64 rounded-xl overflow-hidden bg-slate-900 border border-white/5 shadow-sm shrink-0">
                <img 
                  src={selectedArticle.imageUrl} 
                  alt={selectedArticle.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Main Medical Text Markdown-style Rendering */}
              <div className="font-sans text-gray-300 text-sm leading-relaxed text-pretty whitespace-pre-line border-t border-white/5 pt-6">
                {selectedArticle.content}
              </div>

              {/* Author footer banner */}
              <div className="bg-[#0a0f18]/80 p-5 rounded-2xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-teal-500 flex items-center justify-center text-[#0a0f18] font-black font-mono">
                    M
                  </div>
                  <div>
                    <p className="font-sans text-sm font-bold text-[#D4AF37]">{selectedArticle.author}</p>
                    <p className="font-sans text-xs text-gray-450 text-gray-450">Official Clinical Consultant at Markz Dental Clinic</p>
                  </div>
                </div>
                
                <span className="text-[10px] font-sans font-semibold text-teal-450 text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded border border-teal-500/20 uppercase tracking-wildest self-start sm:self-center">
                  Verified Dental Guide
                </span>
              </div>
            </div>

            {/* Modal Sticky Bottom Controls */}
            <div className="p-4 border-t border-white/5 flex justify-between items-center bg-[#0a0f18] font-sans">
              <button
                onClick={(e) => {
                  handleLike(selectedArticle.id, e);
                }}
                className="flex items-center gap-2 bg-[#0d1522] hover:bg-white/5 text-gray-400 hover:text-white font-sans text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm border border-white/5 transition-colors cursor-pointer"
              >
                <Heart className={`w-4 h-4 ${hasLiked[selectedArticle.id] ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>Like Article ({likeCounts[selectedArticle.id] || 24})</span>
              </button>

              <button
                onClick={handleShareClick}
                className="flex items-center gap-1.5 text-gray-450 hover:text-teal-400 font-sans text-xs font-semibold py-2 px-3 transition-colors cursor-pointer text-gray-400 hover:text-white"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{shareCopied ? "Link Copied!" : "Share Post"}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
