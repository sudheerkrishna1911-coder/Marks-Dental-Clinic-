import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, Clock, MessageSquare, 
  Send, CheckCircle2, AlertCircle, MessageSquareText, ShieldAlert
} from 'lucide-react';
import { ContactMessage } from '../types';

export default function ContactSection() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const [formError, setFormError] = useState<string | null>(null);
  const [isSent, setIsSent] = useState(false);

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName.trim() || !email.trim() || !phoneNumber.trim() || !message.trim()) {
      setFormError('Please fill out all required fields marked with an asterisk (*).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    // Build contact message object
    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phoneNumber: phoneNumber.trim(),
      message: message.trim(),
      status: 'Unread',
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    };

    // Storing in local state / localStorage so staff dashboard can capture it
    const existingMessagesRaw = localStorage.getItem('mark_clinic_messages');
    const existingMessages: ContactMessage[] = existingMessagesRaw ? JSON.parse(existingMessagesRaw) : [];
    existingMessages.unshift(newMessage);
    localStorage.setItem('mark_clinic_messages', JSON.stringify(existingMessages));

    setFormError(null);
    setIsSent(true);
    
    // Reset Form Fields
    setFullName('');
    setEmail('');
    setPhoneNumber('');
    setMessage('');
  };

  return (
    <div className="w-full bg-[#0a0f18] text-white py-12 md:py-24 px-4 flex flex-col gap-12 font-sans">
      
      {/* Intro Header */}
      <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
        <span className="text-[10px] uppercase tracking-widest text-teal-400 font-bold block font-sans animate-fade-in">Connect With Us</span>
        <h2 className="font-serif font-light text-3xl sm:text-4xl text-white tracking-tight">We’d Love to Hear From You</h2>
        <div className="h-0.5 w-12 bg-[#D4AF37] mx-auto rounded-full mt-1" />
        <p className="font-sans text-gray-400 text-sm leading-relaxed mt-2">
          Reach out if you have emergency trauma queries, general booking doubts, or feedback about your clinical treatments.
        </p>
      </div>

      {/* Primary Grid Layout */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Contact Info & Timings Columns (LHS 5 Columns) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Quick Contact metrics */}
          <div className="bg-[#0d1522] p-7 rounded-2xl border border-white/10 shadow-2xl flex flex-col gap-6">
            <h3 className="font-serif text-[#D4AF37] text-lg border-b border-white/5 pb-3 block">Clinic Contacts</h3>
            
            <div className="flex flex-col gap-5">
              {/* Address */}
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-teal-500/10 text-teal-400 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-white text-sm">Our Location</h4>
                  <p className="font-sans text-gray-400 text-xs sm:text-sm mt-1 leading-relaxed">
                    1st Floor, Royal Square, VIP Road,<br />
                    Near Six Mile, Khanapara,<br />
                    Guwahati, Assam 781022, India
                  </p>
                </div>
              </div>

              {/* Phone emergency desk */}
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-teal-500/10 text-teal-400 rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-white text-sm">Emergency Hotlines</h4>
                  <p className="font-sans text-gray-400 text-xs sm:text-sm mt-1">
                    <a href="tel:+919937866280" className="text-teal-400 font-semibold hover:text-white transition-colors">+91 9937866280</a>
                  </p>
                  <p className="font-sans text-[10px] text-gray-500 mt-0.5">Dial anytime for trauma or extreme lockjaw cases.</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-teal-500/10 text-teal-400 rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-white text-sm">Official Mailbox</h4>
                  <p className="font-sans text-gray-400 text-xs sm:text-sm mt-1">
                    <a href="mailto:info@marksdentalclinic.com" className="text-teal-400 font-semibold hover:text-white transition-colors">info@marksdentalclinic.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Working Timings schedule card */}
          <div className="bg-[#0d1522]/50 text-white p-7 rounded-2xl border border-white/5 shadow-2xl flex flex-col gap-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-full bg-white/[0.01] skew-x-6 shrink-0 pointer-events-none" />
            
            <h3 className="font-serif text-[#D4AF37] text-lg">Clinic Working Hours</h3>
            
            <div className="flex flex-col gap-3 font-sans text-sm">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">Monday - Saturday:</span>
                <span className="font-semibold text-white">9:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-gray-400">Sunday:</span>
                <span className="font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 inline" /> Emergency Calls Only
                </span>
              </div>
            </div>

            {/* Direct WhatsApp chat shortcut */}
            <a 
              href="https://wa.me/919937866280" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-sans font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow shadow-emerald-700/20"
            >
              <MessageSquareText className="w-4.5 h-4.5 shrink-0" />
              <span>Connect on WhatsApp Chat</span>
            </a>
          </div>

        </div>

        {/* Contact Form Submissions (RHS 7 Columns) */}
        <div className="lg:col-span-7 bg-[#0d1522] p-7 md:p-8 rounded-2xl border border-white/10 shadow-2xl">
          <h3 className="font-serif font-light text-white text-lg sm:text-xl border-b border-white/5 pb-4 block mb-6">
            Send a Digital message
          </h3>

          {isSent ? (
            <div className="p-4 py-8 text-center flex flex-col items-center gap-4 animate-in zoom-in-95 duration-155">
              <div className="w-12 h-12 bg-teal-500/10 text-teal-400 rounded-full flex items-center justify-center border border-teal-500/25">
                <CheckCircle2 className="w-8 h-8 text-teal-450 fill-none" />
              </div>
              <div>
                <h4 className="font-serif font-light text-xl text-white">Message Sent Successfully!</h4>
                <p className="font-sans text-gray-450 text-xs sm:text-sm mt-1 max-w-sm mx-auto leading-relaxed">
                  Thank you for connecting. Our clinic secretary has registered your query and will follow up shortly.
                </p>
              </div>
              <button
                onClick={() => setIsSent(false)}
                className="mt-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-sans text-xs font-bold py-2.5 px-6 rounded-lg transition-colors cursor-pointer uppercase tracking-wider"
              >
                Send Another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitMessage} className="flex flex-col gap-4">
              {formError && (
                <div className="p-3 bg-rose-500/10 text-rose-300 border-l-4 border-rose-500 text-xs sm:text-sm font-sans rounded-r-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Grid Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans font-bold text-teal-400 text-[10px] uppercase tracking-widest">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your name"
                    className="w-full font-sans text-sm py-2.5 px-3.5 bg-white/[0.02] border border-white/10 rounded-xl outline-none focus:bg-[#0a0f18] focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-white transition-all"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-sans font-bold text-teal-400 text-[10px] uppercase tracking-widest">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g. +91 9937866280"
                    className="w-full font-sans text-sm py-2.5 px-3.5 bg-white/[0.02] border border-white/10 rounded-xl outline-none focus:bg-[#0a0f18] focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-white transition-all"
                    required
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="flex flex-col gap-1.5">
                <label className="font-sans font-bold text-teal-400 text-[10px] uppercase tracking-widest">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. email@domain.com"
                  className="w-full font-sans text-sm py-2.5 px-3.5 bg-white/[0.02] border border-white/10 rounded-xl outline-none focus:bg-[#0a0f18] focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-white transition-all"
                  required
                />
              </div>

              {/* Your Message */}
              <div className="flex flex-col gap-1.5">
                <label className="font-sans font-bold text-teal-400 text-[10px] uppercase tracking-widest">
                  Your Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="How can we help? Enter details of your dental concern..."
                  className="w-full font-sans text-sm py-2.5 px-3.5 bg-white/[0.02] border border-white/10 rounded-xl outline-none focus:bg-[#0a0f18] focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-white transition-all resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="mt-1 w-full bg-teal-500 hover:bg-teal-400 text-[#000] font-sans text-center font-bold py-3.5 px-4 outline-none rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-teal-500/10 text-xs uppercase tracking-widest"
              >
                <Send className="w-4 h-4" />
                <span>Submit message Inquiry</span>
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Modern simulated Google Maps vector widget (For SEO and visual perfection) */}
      <section className="max-w-7xl mx-auto w-full bg-[#0d1522] p-6 rounded-2xl border border-white/5 shadow-2xl flex flex-col gap-4 mt-8">
        <div>
          <h3 className="font-serif font-light text-white text-lg flex items-center gap-1.5 google-label-color">
            <MapPin className="w-5 h-5 text-teal-400" /> Clinic Location Map
          </h3>
          <p className="font-sans text-[10px] sm:text-xs text-gray-405 mt-0.5 text-gray-400">Explore our geographic layout relative to Six Mile, Khanapara, and VIP Road in Guwahati.</p>
        </div>

        {/* CSS Vector Map Canvas */}
        <div className="w-full h-80 rounded-xl bg-[#0a0f18] border border-white/5 relative overflow-hidden flex items-center justify-center leading-none">
          {/* Aesthetic map lines backgrounds */}
          <div className="absolute inset-x-0 top-1/4 h-2 bg-white/[0.02] transform -rotate-3" />
          <div className="absolute inset-x-0 top-2/3 h-3 bg-white/[0.02] transform rotate-1" />
          <div className="absolute inset-y-0 left-1/3 w-2.5 bg-white/[0.02] transform rotate-12" />
          <div className="absolute inset-y-0 left-2/3 w-1 bg-white/[0.02] transform -rotate-6" />

          {/* Brahmaputra river indicator label for geographical context in Guwahati */}
          <div className="absolute top-4 left-4 bg-teal-500/10 text-[9px] text-[#D4AF37] font-mono font-black py-1 px-3.5 uppercase tracking-widest rounded-full border border-teal-500/20">
            &bull;&bull; Brahmaputra River (Northward Flow)
          </div>

          {/* Six Mile Highway intersection visual block */}
          <div className="absolute top-1/3 left-1/2 w-48 h-10 bg-[#0d1522]/90 border border-white/5 flex items-center justify-center text-[10px] text-gray-500 font-sans tracking-wide rounded -translate-x-1/2 -rotate-15">
            VIP Road Complex
          </div>

          {/* Actual locator custom pin marker component */}
          <div className="relative z-10 flex flex-col items-center animate-bounce duration-1000">
            {/* Visual radar wave effect */}
            <div className="absolute w-8 h-8 bg-teal-500/20 rounded-full scale-150 animate-ping" />
            <div className="w-10 h-10 bg-gradient-to-tr from-[#D4AF37] to-teal-500 rounded-full text-[#0a0f18] shadow-2xl flex items-center justify-center ring-4 ring-[#0d1522]">
              <MapPin className="w-5 h-5" />
            </div>
            
            {/* Pop-up bubble */}
            <div className="mt-2.5 bg-[#05080c] border border-white/10 text-white p-3 rounded-lg shadow-2xl flex flex-col items-center gap-1.5 whitespace-nowrap">
              <p className="font-sans font-bold text-xs text-[#D4AF37]">Marks Dental Clinic</p>
              <p className="font-mono text-[9px] text-gray-500">1st Floor, Royal Square, VIP Road</p>
            </div>
          </div>

          {/* Compass layout widget */}
          <div className="absolute bottom-4 right-4 bg-[#0d1522] backdrop-blur-md px-2 py-1 rounded shadow-sm text-[9px] text-gray-500 font-sans border border-white/5">
            GPS Coordinates: 26.1264&deg; N, 91.8021&deg; E
          </div>

          {/* External map click directions shortcut */}
          <a
            href="https://maps.google.com/?q=Marks+Dental+Clinic+VIP+Road+Guwahati"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 left-4 bg-[#0a0f18] hover:bg-white/5 text-teal-400 text-[10px] font-sans font-bold py-1.5 px-3.5 rounded-lg border border-white/10 transition-colors shadow-sm flex items-center gap-1 cursor-pointer"
          >
            <span>Open Google Maps Directions</span>
          </a>
        </div>
      </section>

    </div>
  );
}
