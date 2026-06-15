import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, Award, Users, Heart } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  treatment: string;
  rating: number;
  date: string;
  avatarInitials: string;
  text: string;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't-1',
    name: 'Anirban Sarma',
    location: 'Ganeshguri, Guwahati',
    treatment: 'Full-Mouth Dental Implants',
    rating: 5,
    date: 'June 2026',
    avatarInitials: 'AS',
    text: 'Dr. Sudheer Krishna completely changed my outlook on dental health. I was terrified of implants, but his prosthodontic mastery and state-of-the-art 3D scanners made the entire process painless. Truly the most premium clinic in Assam!'
  },
  {
    id: 't-2',
    name: 'Priyanka Baruah',
    location: 'Six Mile, Guwahati',
    treatment: 'Clear Orthodontic Aligners',
    rating: 5,
    date: 'May 2026',
    avatarInitials: 'PB',
    text: 'I started my clear aligner journey 10 months ago and the transformation is dramatic. Aura, the clinic AI chatbot, was incredibly helpful in answering my off-hour questions, and the physical clinic itself feels like a luxurious lounge.'
  },
  {
    id: 't-3',
    name: 'Debojit Hazarika',
    location: 'Beltola, Guwahati',
    treatment: 'Porcelain Smile Makeover',
    rating: 5,
    date: 'April 2026',
    avatarInitials: 'DH',
    text: 'My severe fluorosis staining was rectified in just two visits. The Class-B sterilization protocols gave me complete peace of mind, and the E-max restorations look 100% natural. Markz Dental is unmatched in aesthetic precision.'
  },
  {
    id: 't-4',
    name: 'Meenakshi Kalita',
    location: 'Zoo Road, Guwahati',
    treatment: 'Laser Root Canal Treatment',
    rating: 5,
    date: 'March 2026',
    avatarInitials: 'MK',
    text: 'I visited during an acute midnight emergency with severe facial swelling. Dr. Abhrasweta Baruah on-call was exceptionally calm, gentle, and solved my pain immediately. Their transparent fees and 0% EMI finance options are wonderful.'
  },
  {
    id: 't-5',
    name: 'Dr. Rupam Gohain',
    location: 'VIP Road, Guwahati',
    treatment: 'Routine Dental Hygiene & Care',
    rating: 5,
    date: 'January 2026',
    avatarInitials: 'RG',
    text: 'As a medical professional myself, I am highly critical of clinic sanitization and autoclave protocols. I was highly impressed to see Markz Dental Clinic’s absolute compliance with international OSHA and Class-B standards.'
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const stats = [
    { label: "Patient Satisfaction", value: "99.8%", icon: Heart },
    { label: "Google Business Rating", value: "4.9 ★", icon: StarsIcon },
    { label: "Successful Implants", value: "2,400+", icon: Award },
    { label: "Active Families Served", value: "5,000+", icon: Users }
  ];

  function StarsIcon(props: any) {
    return (
      <div className="flex gap-0.5 text-[#D4AF37]">
        <Star className="w-4 h-4 fill-current" />
      </div>
    );
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  // Mouse Drag / Touch Swipe implementation for fluid carousel interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsSwiping(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeftState(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isSwiping || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // swipe speed multiplier
    carouselRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsSwiping(false);
    // snap to nearest slide on drag stop
    if (carouselRef.current) {
      const cardWidth = 320 + 24; // width + gap
      const snapIndex = Math.round(carouselRef.current.scrollLeft / cardWidth);
      if (snapIndex >= 0 && snapIndex < TESTIMONIALS_DATA.length) {
        setCurrentIndex(snapIndex);
        carouselRef.current.scrollTo({
          left: snapIndex * cardWidth,
          behavior: 'smooth'
        });
      }
    }
  };

  // Keep manual buttons synced with carousel position
  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = 320 + 24;
      carouselRef.current.scrollTo({
        left: currentIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  return (
    <section className="bg-[#0a0f18] text-white py-12 md:py-20 px-4 w-full relative overflow-hidden" id="patient-testimonials-section">
      {/* Background visual graphics */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-teal-500/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-[#D4AF37]/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-14 relative z-10">
        
        {/* Title and Top Layout Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-3 max-w-2xl text-left">
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Word of Mouth</span>
            <h2 className="font-serif font-light text-3xl sm:text-4xl text-white tracking-tight">
              Patient Stories of <span className="text-[#D4AF37]">Renewed Confidence</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed">
              Discover real experiences from patients who found world-class dentistry closer to home at our modern VIP Road center in Guwahati.
            </p>
          </div>

          {/* Carousel Slide Action Controllers */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handlePrev}
              className="p-3 bg-white/[0.02] border border-white/5 hover:border-white/15 hover:bg-white/5 rounded-xl text-gray-400 hover:text-white transition-all cursor-pointer"
              aria-label="Previous Review"
              id="testimonial-prev-btn"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-mono text-xs text-gray-500">
              <strong className="text-[#D4AF37]">{currentIndex + 1}</strong> / {TESTIMONIALS_DATA.length}
            </span>
            <button
              onClick={handleNext}
              className="p-3 bg-white/[0.02] border border-white/5 hover:border-white/15 hover:bg-white/5 rounded-xl text-gray-400 hover:text-white transition-all cursor-pointer"
              aria-label="Next Review"
              id="testimonial-next-btn"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Swipeable Carousel Container */}
        <div 
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className={`flex gap-6 overflow-x-auto pb-8 scrollbar-none snap-x snap-mandatory ${
            isSwiping ? 'cursor-grabbing select-none' : 'cursor-grab'
          }`}
          style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
        >
          {TESTIMONIALS_DATA.map((testimonial, i) => {
            const isActive = i === currentIndex;
            return (
              <div
                key={testimonial.id}
                className={`snap-center shrink-0 w-full max-w-[340px] sm:max-w-[400px] bg-[#0d1522]/40 rounded-3xl border p-6 sm:p-8 flex flex-col justify-between gap-6 transition-all duration-500 relative ${
                  isActive 
                    ? 'border-teal-500/30 bg-[#0d1522]/80 shadow-[0_15px_30px_rgba(20,184,166,0.06)]' 
                    : 'border-white/5 opacity-60 hover:opacity-100 hover:border-white/10'
                }`}
                id={`patient-testimonial-card-${testimonial.id}`}
              >
                {/* Quote Icon corner decoration */}
                <span className="absolute top-6 right-6 text-teal-500/[0.04] pointer-events-none">
                  <Quote className="w-20 h-20 rotate-180" />
                </span>

                <div className="flex flex-col gap-4 relative z-10 text-left">
                  {/* Real five star ratings */}
                  <div className="flex gap-1 text-[#D4AF37]" id={`testimonial-ratings-${testimonial.id}`}>
                    {Array.from({ length: testimonial.rating }).map((_, rIdx) => (
                      <Star key={rIdx} className="w-4 h-4 fill-current text-[#D4AF37]" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="font-sans text-xs sm:text-sm text-gray-350 leading-relaxed italic text-balance text-pretty text-gray-300">
                    "{testimonial.text}"
                  </p>
                </div>

                {/* Patient Author Metadata Card */}
                <div className="flex items-center gap-3.5 border-t border-white/5 pt-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-teal-400 p-[1px] flex items-center justify-center font-mono font-black text-xs text-[#0a0f18] shrink-0 uppercase">
                    <div className="w-full h-full bg-[#0d1522] rounded-full flex items-center justify-center text-teal-400">
                      {testimonial.avatarInitials}
                    </div>
                  </div>
                  <div className="flex flex-col text-left">
                    <h4 className="font-serif text-sm font-bold text-white text-balance">{testimonial.name}</h4>
                    <span className="font-sans text-[10px] text-gray-500 leading-normal">{testimonial.location}</span>
                    <span className="font-mono text-[9px] text-[#D4AF37] bg-[#D4AF37]/5 px-2 py-0.5 rounded-full border border-[#D4AF37]/10 w-fit mt-1.5 uppercase font-semibold">
                      {testimonial.treatment}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Grid of Clinical Trust Stats Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-white/[0.01] border border-white/5 rounded-3xl p-6 md:p-8 mt-4">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={idx}
                className="flex flex-col gap-2 items-center text-center p-4 rounded-2xl hover:bg-white/[0.01] transition-all"
                id={`trust-stat-block-${idx}`}
              >
                <span className="p-3 bg-teal-500/10 rounded-xl text-teal-400">
                  <IconComponent className="w-5 h-5 shrink-0" />
                </span>
                <span className="font-serif font-light text-2xl md:text-3xl text-white tracking-tight mt-1">{stat.value}</span>
                <span className="font-sans text-[10px] uppercase text-gray-500 tracking-wider font-semibold">{stat.label}</span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
