import React, { useState, useEffect } from 'react';
import { Phone, Mail, Clock, Calendar, Menu, X, Stethoscope, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openBookingModal: () => void;
}

export default function Header({ activeTab, setActiveTab, openBookingModal }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="w-full relative z-50">
      {/* Top bar (Hidden on compact screens) */}
      <div className="bg-[#05080c] text-white text-xs py-2 px-4 shadow-sm border-b border-white/5 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-sans text-gray-400">
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <a href="tel:+919937866280" className="hover:text-white transition-colors">+91 9937866280</a>
            </span>
            <span className="flex items-center gap-1.5 font-sans text-gray-400">
              <Mail className="w-3.5 h-3.5 text-teal-400" />
              <a href="mailto:info@marksdentalclinic.com" className="hover:text-white transition-colors">info@marksdentalclinic.com</a>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-sans text-gray-400">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              Mon - Sat: 9:00 AM - 8:00 PM | Sun: Emergencies
            </span>
            <button 
              onClick={() => handleNavClick('admin-portal')}
              className={`text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer font-semibold ${activeTab === 'admin-portal' ? 'text-teal-400 font-bold underline underline-offset-4 decoration-teal-400' : ''}`}
            >
              <ShieldCheck className="w-4 h-4 text-teal-400" /> Staff Portal
            </button>
          </div>
        </div>
      </div>

      {/* Main sticky navigation */}
      <nav className={`w-full transition-all duration-300 py-4 px-4 ${
        isScrolled 
          ? 'fixed top-0 left-0 bg-[#0a0f18]/95 backdrop-blur-md shadow-2xl border-b border-white/10' 
          : 'relative bg-[#0a0f18] border-b border-white/5'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo Brand */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="w-10 h-10 bg-teal-500 rounded flex items-center justify-center font-serif text-2xl font-bold text-[#0a0f18] transition-transform hover:scale-105 duration-200">
              M
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight uppercase text-white font-sans">MARKS DENTAL</span>
              <span className="text-[9px] tracking-[0.25em] text-teal-400 -mt-1 font-sans font-bold">GUWAHATI • ASSAM</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-7">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`font-sans font-bold text-xs uppercase tracking-widest transition-colors relative py-1.5 cursor-pointer ${
                    activeTab === item.id 
                      ? 'text-teal-400' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  {activeTab === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-400 rounded-full" />
                  )}
                </button>
              ))}
            </div>
            
            <button
              onClick={openBookingModal}
              className="px-6 py-2.5 bg-teal-500 hover:bg-teal-400 text-[#0a0f18] font-sans font-bold text-xs uppercase tracking-widest rounded-sm transition-all shadow-lg hover:scale-[1.02] shadow-teal-500/20 active:scale-98 cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#0a0f18] stroke-[2.5]" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Quick Controls / Menu Trigger */}
          <div className="flex items-center gap-3 lg:hidden">
            <a 
              href="tel:+919937866280"
              className="p-2 text-teal-400 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors"
              title="Call Clinic"
            >
              <Phone className="w-4 h-4" />
            </a>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white bg-white/5 border border-white/10 rounded-lg focus:outline-none cursor-pointer hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] bg-black/85 backdrop-blur-sm z-40 lg:hidden transition-all duration-300">
          <div className="bg-[#0d1522] px-4 py-6 border-b border-white/10 flex flex-col gap-5 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left font-sans font-bold text-xs uppercase tracking-widest py-2.5 px-3 rounded-lg transition-colors cursor-pointer ${
                    activeTab === item.id 
                      ? 'bg-teal-500/10 text-teal-400 font-semibold border border-teal-500/20' 
                      : 'text-gray-350 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('admin-portal')}
                className={`text-left font-sans font-bold text-xs uppercase tracking-widest py-2.5 px-3 rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
                  activeTab === 'admin-portal' 
                    ? 'bg-teal-500/10 text-teal-400 font-semibold border border-teal-500/20' 
                    : 'text-gray-350 hover:bg-white/5 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-5 h-5 text-teal-400" /> Staff Portal Log
              </button>
            </div>
            
            <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openBookingModal();
                }}
                className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-[#0a0f18] font-sans font-bold text-xs uppercase tracking-widest rounded-sm transition-all shadow-lg text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment Online</span>
              </button>
              
              <div className="flex flex-col items-center gap-1.5 text-xs text-gray-500 text-center mt-2">
                <p className="font-sans">Guwahati, Assam, India</p>
                <p className="font-sans font-medium text-teal-450 tracking-widest">+91 9937866280</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
