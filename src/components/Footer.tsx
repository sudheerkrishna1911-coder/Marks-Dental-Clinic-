import React from 'react';
import { Phone, Mail, MapPin, Clock, Stethoscope, Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  openBookingModal: () => void;
}

export default function Footer({ setActiveTab, openBookingModal }: FooterProps) {
  
  const handleNavigation = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#05080c] text-gray-300 pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* About & Branding Column */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavigation('home')}>
            <div className="w-10 h-10 bg-teal-500 rounded flex items-center justify-center font-serif text-2xl font-bold text-[#0a0f18]">
              M
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight uppercase text-white font-sans">MARKS DENTAL</span>
              <span className="text-[8px] tracking-[0.25em] text-teal-400 -mt-1 font-sans font-bold">GUWAHATI • ASSAM</span>
            </div>
          </div>
          <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed">
            Delivering advanced, comfortable dental healthcare using premium technology. We prioritize painless, sterile hygiene protocols for you and your family in Guwahati, Assam.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 bg-white/[0.03] border border-white/5 hover:bg-teal-500 hover:text-[#0a0f18] rounded-sm text-gray-400 transition-all cursor-pointer"
              title="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 bg-white/[0.03] border border-white/5 hover:bg-teal-500 hover:text-[#0a0f18] rounded-sm text-gray-400 transition-all cursor-pointer"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 bg-white/[0.03] border border-white/5 hover:bg-teal-500 hover:text-[#0a0f18] rounded-sm text-gray-400 transition-all cursor-pointer"
              title="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a 
              href="https://wa.me/919937866280" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 bg-white/[0.03] border border-white/5 hover:bg-teal-500 hover:text-[#0a0f18] text-teal-400 hover:text-[#0a0f18] rounded-sm transition-all cursor-pointer"
              title="WhatsApp click-to-chat"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="flex flex-col gap-4">
          <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-[#D4AF37] gold-glow">Quick Links</h3>
          <ul className="flex flex-col gap-2.5 font-sans text-xs sm:text-sm text-gray-400">
            {['Home', 'About Us', 'Services', 'Gallery', 'Blog', 'Contact Us'].map((item) => {
              const id = item.toLowerCase().replace(' ', '');
              const tabId = id === 'aboutus' ? 'about' : id === 'contactus' ? 'contact' : id;
              return (
                <li key={item}>
                  <button 
                    onClick={() => handleNavigation(tabId)}
                    className="hover:text-teal-450 hover:translate-x-1 transition-all cursor-pointer text-left"
                  >
                    &rarr; {item}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Primary Services Column */}
        <div className="flex flex-col gap-4">
          <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-[#D4AF37] gold-glow">Our Services</h3>
          <ul className="flex flex-col gap-2.5 font-sans text-xs text-gray-400">
            <li>
              <button onClick={() => handleNavigation('services')} className="hover:text-teal-400 transition-colors text-left cursor-pointer">
                &bull; Dental Implants
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation('services')} className="hover:text-teal-400 transition-colors text-left cursor-pointer">
                &bull; Root Canal Treatment (RCT)
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation('services')} className="hover:text-teal-400 transition-colors text-left cursor-pointer">
                &bull; Straightening Clear Aligners
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation('services')} className="hover:text-teal-400 transition-colors text-left cursor-pointer">
                &bull; Pediatric & Children’s Dentistry
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation('services')} className="hover:text-teal-400 transition-colors text-left cursor-pointer">
                &bull; Monolithic Porcelain Crowns
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation('services')} className="hover:text-teal-400 transition-colors text-left cursor-pointer">
                &bull; Teeth Laser Whitening
              </button>
            </li>
          </ul>
        </div>

        {/* Clinic Connect Column */}
        <div className="flex flex-col gap-4">
          <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-[#D4AF37] gold-glow">Contact Details</h3>
          <ul className="flex flex-col gap-3.5 font-sans text-xs sm:text-sm text-gray-400">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-5 h-5 text-teal-400 stroke-[1.5] shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-gray-400">
                1st Floor, Royal Square, VIP Road,<br />
                Near Six Mile, Khanapara,<br />
                Guwahati, Assam 781022, India
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-teal-400 shrink-0" />
              <a href="tel:+919937866280" className="hover:text-white transition-colors">+91 9937866280</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-teal-400 shrink-0" />
              <a href="mailto:info@marksdentalclinic.com" className="hover:text-white transition-colors">info@marksdentalclinic.com</a>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <div className="text-[11px]">
                <p className="font-semibold text-gray-300">Mon - Sat: 9:00 AM - 8:00 PM</p>
                <p className="text-teal-400 font-bold tracking-wider mt-0.5 uppercase">Sun: Emergency Calls Only</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-white/5 text-center text-[10px] sm:text-xs text-gray-500 font-sans flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>&copy; {currentYear} Marks Dental Clinic. All Rights Reserved. Guwahati, Assam.</p>
        <div className="flex items-center gap-5">
          <button onClick={() => handleNavigation('about')} className="hover:text-gray-300 cursor-pointer">Privacy Policy</button>
          <span>&middot;</span>
          <button onClick={() => handleNavigation('contact')} className="hover:text-gray-300 cursor-pointer">Terms of Service</button>
          <span>&middot;</span>
          <button onClick={() => handleNavigation('admin-portal')} className="text-teal-400 hover:text-teal-355 font-bold cursor-pointer uppercase tracking-widest">Staff Access</button>
        </div>
      </div>
    </footer>
  );
}
