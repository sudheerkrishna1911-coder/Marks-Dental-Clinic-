import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Stethoscope, Facebook, Instagram, Twitter, MessageCircle, Send, Check } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  openBookingModal: () => void;
}

export default function Footer({ setActiveTab, openBookingModal }: FooterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const currentEmails = JSON.parse(localStorage.getItem('newsletter_emails') || '[]');
      if (!currentEmails.includes(email)) {
        currentEmails.push(email);
        localStorage.setItem('newsletter_emails', JSON.stringify(currentEmails));
      }
      setStatus('success');
      setMessage('Thank you for subscribing! Welcome aboard. ✨');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage('Subscription failed. Please try again.');
    }
  };
  
  const handleNavigation = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#05080c] text-gray-300 pt-16 pb-8 border-t border-white/10">
      {/* Newsletter Signup Row */}
      <div className="max-w-7xl mx-auto px-4 pb-12 mb-12 border-b border-white/5 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="max-w-md">
          <h3 className="font-serif text-[#D4AF37] text-lg sm:text-xl tracking-tight font-light col-span-full">Stay Updated on Oral Health</h3>
          <p className="font-sans text-xs text-gray-400 mt-1 leading-relaxed">
            Subscribe to our clinic newsletter for professional dental hygiene tips, exclusive updates, and priority slot announcements directly from our MDS consultants.
          </p>
        </div>
        <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex-1 max-w-md flex flex-col gap-2">
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-gray-500">
              <Mail className="w-4 h-4" />
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              placeholder="Enter your email address"
              className="w-full bg-white/[0.03] border border-white/10 text-white rounded-lg pl-10 pr-28 py-3 text-xs sm:text-sm placeholder-gray-500 focus:outline-none focus:border-teal-500 hover:border-white/20 transition-all font-sans"
              disabled={status === 'loading' || status === 'success'}
              id="newsletter-email-input"
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              id="newsletter-subscribe-button"
              className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-teal-500 hover:bg-teal-400 text-[#0a0f18] text-xs font-bold font-sans rounded-md transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {status === 'loading' ? (
                <span className="w-3.5 h-3.5 border-2 border-[#0a0f18] border-t-transparent rounded-full animate-spin" />
              ) : status === 'success' ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <>
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
          {message && (
            <p className={`font-sans text-xs mt-1 ${status === 'success' ? 'text-teal-400 font-medium' : 'text-rose-400'}`} id="newsletter-status-message">
              {message}
            </p>
          )}
        </form>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* About & Branding Column */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavigation('home')}>
            <div className="w-10 h-10 rounded overflow-hidden flex items-center justify-center border border-white/10 shrink-0 bg-white">
              <img 
                src="/src/assets/images/markz_favicon_v2_1781484369789.jpg" 
                alt="Markz Dental Clinic Logo Icon" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight uppercase text-white font-sans">MARKZ DENTAL</span>
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
            {['Home', 'About Us', 'Services', 'Gallery', 'Blog', 'FAQ', 'Contact Us'].map((item) => {
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
        <p>&copy; {currentYear} Markz Dental Clinic. All Rights Reserved. Guwahati, Assam.</p>
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
