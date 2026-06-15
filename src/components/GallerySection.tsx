import React, { useState, useEffect } from 'react';
import { Image, CheckCircle, HelpCircle, Eye, EyeOff, Sparkles } from 'lucide-react';
import { CLINIC_GALLERY } from '../data';
import { GalleryItem } from '../types';

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Clinic' | 'Equipment' | 'Transformations'>('All');
  const [toggleBeforeAfter, setToggleBeforeAfter] = useState<{ [key: string]: 'Before' | 'After' }>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  const filteredGallery = CLINIC_GALLERY.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const handleToggleSmile = (id: string, state: 'Before' | 'After') => {
    setToggleBeforeAfter((prev) => ({
      ...prev,
      [id]: state,
    }));
  };

  return (
    <div className="w-full bg-[#0a0f18] text-white py-12 md:py-24 px-4 font-sans">
      
      {/* Intro Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col gap-3">
        <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block">Photo Showcase</span>
        <h2 className="font-serif font-light text-3xl sm:text-4xl text-white tracking-tight">Explore Markz Dental Clinic</h2>
        <div className="h-0.5 w-12 bg-[#D4AF37] mx-auto rounded-full mt-1" />
        <p className="font-sans text-gray-400 text-sm leading-relaxed mt-2 text-pretty">
          Step inside our clinical operatories, view our hygienic sterilization tools, and analyze the premium dental implants and orthodontic smile corrections we deliver.
        </p>
      </div>

      {/* Category Tabs Filter */}
      <div className="flex flex-wrap justify-center items-center gap-2 mb-10">
        {(['All', 'Clinic', 'Equipment', 'Transformations'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`font-sans text-xs sm:text-sm font-semibold py-2 px-5 rounded-full border transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-teal-500 text-black border-transparent shadow-lg shadow-teal-500/10'
                : 'bg-[#0d1522] text-gray-400 border-white/5 hover:border-white/10 hover:bg-[#0d1522]/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Items Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div 
              key={`gallery-skeleton-${i}`}
              className="bg-[#0d1522]/40 rounded-2xl border border-white/5 shadow-2xl overflow-hidden flex flex-col animate-pulse"
              id={`gallery-skeleton-card-${i}`}
            >
              {/* Photo Box Skeleton */}
              <div className="relative aspect-[4/3] bg-white/[0.02] overflow-hidden flex items-center justify-center">
                <Image className="w-8 h-8 text-white/[0.05]" />
                <div className="absolute top-4 right-4 bg-white/[0.03] w-20 h-5 rounded-full border border-white/5" />
              </div>
              {/* Text Particulars Skeleton */}
              <div className="p-5 flex flex-col gap-3">
                {/* Title skeleton */}
                <div className="h-4 bg-[#D4AF37]/10 rounded w-2/3" />
                {/* Description lines skeleton */}
                <div className="flex flex-col gap-2">
                  <div className="h-3 bg-white/[0.04] rounded w-full" />
                  <div className="h-3 bg-white/[0.04] rounded w-5/6" />
                </div>
              </div>
            </div>
          ))
        ) : (
          filteredGallery.map((item) => {
            const isTransformation = item.category === 'Transformations';
            // Default to 'After' unless requested 'Before'
            const smileState = toggleBeforeAfter[item.id] || 'After';
            
            return (
              <div 
                key={item.id}
                className="bg-[#0d1522]/40 rounded-2xl border border-white/5 shadow-2xl overflow-hidden flex flex-col hover:shadow-md hover:border-white/10 transition-all duration-300"
              >
                
                {/* Photo box */}
                <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden group">
                  
                  {/* Standard Photo */}
                  {!isTransformation ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    /* Smile Transformation Toggle Box */
                    <div className="w-full h-full relative">
                      <img 
                      src={smileState === 'Before' ? item.beforeAfter?.beforeUrl : item.beforeAfter?.afterUrl} 
                      alt={`${item.title} - ${smileState}`} 
                      className="w-full h-full object-cover animate-fade-in"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Before/After banner label */}
                    <div className="absolute top-3 left-3 bg-[#0a0f18]/90 text-[10px] text-teal-400 border border-white/10 font-mono uppercase tracking-widest px-2 py-1 rounded shadow-md z-12">
                      {smileState} Image
                    </div>

                    {/* Interactive Selector Overlay Buttons */}
                    <div className="absolute bottom-3 right-3 bg-[#0d1522]/90 border border-white/10 p-1.5 rounded-lg shadow-lg flex items-center gap-1 z-12">
                      <button
                        onClick={() => handleToggleSmile(item.id, 'Before')}
                        className={`text-[10px] font-sans font-bold px-2 py-1 rounded transition-colors cursor-pointer ${
                          smileState === 'Before' 
                            ? 'bg-rose-600 text-white' 
                            : 'bg-[#0a0f18] text-gray-400 hover:text-white'
                        }`}
                      >
                        Before State
                      </button>
                      <button
                        onClick={() => handleToggleSmile(item.id, 'After')}
                        className={`text-[10px] font-sans font-bold px-2 py-1 rounded flex items-center gap-0.5 transition-colors cursor-pointer ${
                          smileState === 'After' 
                            ? 'bg-teal-500 text-black' 
                            : 'bg-[#0a0f18] text-gray-400 hover:text-white'
                        }`}
                      >
                        <Sparkles className="w-2.5 h-2.5 fill-current" /> After Smile
                      </button>
                    </div>
                  </div>
                )}

                {/* Categories Badge pill */}
                <div className="absolute top-4 right-4 bg-teal-500/10 text-teal-400 font-sans px-2.5 py-1 text-[10px] rounded-full uppercase tracking-wider font-bold border border-teal-500/20 shadow-sm">
                  {item.category}
                </div>
              </div>

              {/* Text Particulars */}
              <div className="p-5 flex flex-col gap-2">
                <h3 className="font-serif text-[#D4AF37] text-base sm:text-lg tracking-tight leading-snug font-light">
                  {item.title}
                </h3>
                <p className="font-sans text-gray-400 text-xs sm:text-sm leading-relaxed text-pretty">
                  {item.description}
                </p>
                {isTransformation && (
                  <div className="mt-2 text-[10px] sm:text-xs text-teal-400 font-sans flex items-center gap-1.5 font-semibold">
                    <CheckCircle className="w-3.5 h-3.5" /> Completed CAD/CAM Orthodontic corrections
                  </div>
                )}
              </div>

            </div>
          );
        })
      )}
      </div>
    </div>
  );
}
