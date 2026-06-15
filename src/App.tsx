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

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Scroll visibility watch for "Scroll to Top" indicator
  useEffect(() => {
    const handleScroll = () => {
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

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-24 right-6 bg-[#0d1522] hover:bg-[#142033] text-[#D4AF37] p-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105 z-45 hidden md:flex items-center justify-center border border-white/10 cursor-pointer"
          title="Scroll To Top"
          id="desktop-scroll-top"
        >
          <ArrowUp className="w-5 h-5 text-[#D4AF37] stroke-[2]" />
        </button>
      )}

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
