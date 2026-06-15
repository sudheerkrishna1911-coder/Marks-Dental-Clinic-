import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, X, Calendar, ArrowUp } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import GallerySection from './components/GallerySection';
import BlogSection from './components/BlogSection';
import BookingSection from './components/BookingSection';
import ContactSection from './components/ContactSection';
import StaffDashboard from './components/StaffDashboard';
import Chatbot from './components/Chatbot';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Scroll visibility watch & progress tracking for "Scroll to Top" indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress((window.scrollY / scrollHeight) * 100);
      } else {
        setScrollProgress(0);
      }

      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeSection 
            setActiveTab={setActiveTab} 
            openBookingModal={() => setIsBookingModalOpen(true)} 
          />
        );
      case 'about':
        return <AboutSection />;
      case 'services':
        return <ServicesSection />;
      case 'gallery':
        return <GallerySection />;
      case 'blog':
        return <BlogSection />;
      case 'contact':
        return <ContactSection />;
      case 'admin-portal':
        return <StaffDashboard />;
      default:
        return (
          <HomeSection 
            setActiveTab={setActiveTab} 
            openBookingModal={() => setIsBookingModalOpen(true)} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0f18] relative font-sans antialiased select-none text-white">
      
      {/* 1. Sticky Navigation Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        openBookingModal={() => setIsBookingModalOpen(true)} 
      />

      {/* 2. Main Content View Area */}
      <main className="flex-grow animate-fade-in">
        {renderActiveView()}
      </main>

      {/* 3. Global Footer */}
      <Footer 
        setActiveTab={setActiveTab} 
        openBookingModal={() => setIsBookingModalOpen(true)} 
      />

      {/* 4. Desktop-Only Floating Widgets */}
      {/* WhatsApp chat shortcut */}
      <a
        href="https://wa.me/919937866280"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-45 hidden md:flex items-center justify-center border border-emerald-500/25 group cursor-pointer"
        title="Chat on WhatsApp"
        id="desktop-whatsapp-float"
      >
        <MessageCircle className="w-6 h-6 fill-current text-white" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 group-hover:ml-2 font-sans font-bold text-xs uppercase tracking-wide whitespace-nowrap">
          Quick Help
        </span>
      </a>

      {/* Scroll to Top with Dynamic Progress Ring and Motion Transitions */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ type: "spring", damping: 15, stiffness: 220 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleScrollToTop}
            className="fixed bottom-20 right-6 md:bottom-24 md:right-6 bg-[#0c1320]/95 backdrop-blur-sm text-[#D4AF37] w-12 h-12 rounded-full shadow-2xl hover:shadow-[#D4AF37]/20 transition-all z-45 flex items-center justify-center border border-white/10 cursor-pointer group"
            title="Scroll to Top"
            id="global-scroll-top-button"
          >
            {/* SVG Circular Progress Track */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                className="stroke-white/5"
                strokeWidth="2.5"
              />
              <motion.circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                className="stroke-teal-400"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="94.25"
                animate={{ strokeDashoffset: 94.25 - (scrollProgress / 100) * 94.25 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
              />
            </svg>

            {/* Glowing inner core */}
            <div className="absolute inset-1 bg-white/[0.02] rounded-full group-hover:bg-teal-400/5 transition-colors duration-300" />

            <ArrowUp className="w-4.5 h-4.5 text-[#D4AF37] group-hover:text-teal-400 stroke-[2.5] relative z-10 group-hover:-translate-y-0.5 transition-all duration-300" />
            
            {/* Tiny ambient tooltip ring for cursor feedback */}
            <span className="absolute -top-7 scale-0 group-hover:scale-100 bg-[#0a0f18] text-white text-[9px] uppercase tracking-wider font-bold py-1 px-2.5 rounded-md border border-white/10 transition-all duration-200 pointer-events-none shadow-xl">
              Up
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* 5. Mobile Sticky Bottom Action Call Ticker (Responsive support) */}
      <div className="fixed bottom-0 left-0 w-full bg-[#0d1522] border-t border-white/5 shadow-2xl grid grid-cols-3 z-45 md:hidden h-14">
        <a
          href="tel:+919937866280"
          className="flex flex-col items-center justify-center gap-1 font-sans text-[10px] font-bold text-gray-300 hover:bg-[#0a0f18] border-r border-white/5"
          id="mobile-sticky-phone"
        >
          <Phone className="w-4.5 h-4.5 text-teal-400" />
          <span>Call Now</span>
        </a>
        <a
          href="https://wa.me/919937866280"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 font-sans text-[10px] font-bold text-gray-300 hover:bg-[#0a0f18] border-r border-white/5"
          id="mobile-sticky-whatsapp"
        >
          <MessageCircle className="w-4.5 h-4.5 text-emerald-400 fill-emerald-500/10" />
          <span>WhatsApp</span>
        </a>
        <button
          onClick={() => setIsBookingModalOpen(true)}
          className="flex flex-col items-center justify-center gap-1 font-sans text-[10px] font-extrabold text-black bg-[#D4AF37] hover:bg-[#F3E5AB] cursor-pointer transition-colors uppercase tracking-wider"
          id="mobile-sticky-book"
        >
          <Calendar className="w-4.5 h-4.5" />
          <span>Book Free</span>
        </button>
      </div>

      {/* Padding space at mobile bottoms to prevent footer overlapping with sticky bar */}
      <div className="h-14 md:hidden block bg-[#05080c]" />

      {/* 6. Main Overlay Interactive Scheduler Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-[#05080c]/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Scroll wrapper */}
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative border border-white/10">
            
            {/* Modal absolute close icon button */}
            <button
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute top-5 right-5 z-20 p-2 text-[#D4AF37] hover:text-white bg-black/40 rounded-full hover:bg-black/60 transition-colors cursor-pointer"
              title="Close Booking Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Inner Modular Booking Form */}
            <BookingSection onSuccessClose={() => setIsBookingModalOpen(false)} />

          </div>
        </div>
      )}

      {/* Global Interactive chatbot component */}
      <Chatbot />

    </div>
  );
}
