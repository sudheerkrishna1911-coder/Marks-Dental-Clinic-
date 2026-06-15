import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, Clock, MessageSquare, 
  Send, CheckCircle2, AlertCircle, MessageSquareText,
  Compass, Navigation, Car, Train, Map, ArrowUpRight
} from 'lucide-react';
import { ContactMessage } from '../types';

export default function ContactSection() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const [formError, setFormError] = useState<string | null>(null);
  const [isSent, setIsSent] = useState(false);
  const [selectedHub, setSelectedHub] = useState<'station' | 'airport' | 'khanapara'>('station');
  const [startPointInput, setStartPointInput] = useState('');

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
      <section className="max-w-7xl mx-auto w-full bg-[#0d1522] p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl flex flex-col gap-6 mt-8" id="clinic-location-map-section">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
          <div>
            <h3 className="font-serif font-light text-white text-xl sm:text-2xl flex items-center gap-2">
              <Map className="w-5 h-5 text-teal-400" /> Interactive Clinic Finder
            </h3>
            <p className="font-sans text-xs text-gray-400 mt-1">
              Interactive geographic planner and route guides to VIP Road, Guwahati.
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="flex items-center gap-4 text-xs font-sans text-gray-400">
            <div className="bg-white/[0.02] border border-white/5 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span>Easy Parking Available</span>
            </div>
            <div className="bg-white/[0.02] border border-white/5 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>Elevator Access</span>
            </div>
          </div>
        </div>

        {/* 2-Column Bento Grid Layout for Map and Route Planner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Directions Form & Hub Guidance (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-5 justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                <Navigation className="w-4 h-4" />
                <span>Get Customized Directions</span>
              </div>
              
              {/* Manual input form */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter starting location (e.g. Beltola, Zoo Road)..."
                  value={startPointInput}
                  onChange={(e) => setStartPointInput(e.target.value)}
                  className="flex-1 bg-white/[0.02] border border-white/10 text-white placeholder-gray-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-teal-500 hover:border-white/15 transition-all font-sans"
                  id="start-location-directions-input"
                />
                <button
                  onClick={() => {
                    const origin = startPointInput.trim() || 'Guwahati';
                    window.open(`https://www.google.com/maps/dir/?api=1&destination=Marks+Dental+Clinic+VIP+Road+Guwahati&origin=${encodeURIComponent(origin)}`, '_blank');
                  }}
                  className="bg-teal-500 hover:bg-teal-400 text-black py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold font-sans transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <span>Go</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="h-px bg-white/5 my-1" />
              
              {/* Hub Selection Buttons */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Directions From Major Hubs:</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setSelectedHub('station')}
                    className={`py-2 px-2.5 rounded-xl text-[10px] sm:text-xs font-bold font-sans flex flex-col items-center justify-center gap-1 transition-all border cursor-pointer ${
                      selectedHub === 'station'
                        ? 'bg-teal-500/10 border-teal-500 text-teal-400'
                        : 'bg-white/[0.01] border-white/5 text-gray-400 hover:border-white/10 hover:text-white'
                    }`}
                  >
                    <Train className="w-3.5 h-3.5" />
                    <span>Railway Stn</span>
                  </button>
                  <button
                    onClick={() => setSelectedHub('airport')}
                    className={`py-2 px-2.5 rounded-xl text-[10px] sm:text-xs font-bold font-sans flex flex-col items-center justify-center gap-1 transition-all border cursor-pointer ${
                      selectedHub === 'airport'
                        ? 'bg-teal-500/10 border-teal-500 text-teal-400'
                        : 'bg-white/[0.01] border-white/5 text-gray-400 hover:border-white/10 hover:text-white'
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>LGBI Airport</span>
                  </button>
                  <button
                    onClick={() => setSelectedHub('khanapara')}
                    className={`py-2 px-2.5 rounded-xl text-[10px] sm:text-xs font-bold font-sans flex flex-col items-center justify-center gap-1 transition-all border cursor-pointer ${
                      selectedHub === 'khanapara'
                        ? 'bg-teal-500/10 border-teal-500 text-teal-400'
                        : 'bg-white/[0.01] border-white/5 text-gray-400 hover:border-white/10 hover:text-white'
                    }`}
                  >
                    <Car className="w-3.5 h-3.5" />
                    <span>Khanapara</span>
                  </button>
                </div>
              </div>

              {/* Step-by-step route directions depending on selected hub */}
              <div className="bg-white/[0.01] border border-white/5 p-4 rounded-xl flex flex-col gap-3 text-xs leading-relaxed">
                {selectedHub === 'station' && (
                  <>
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="font-bold text-[#D4AF37] font-sans">Route via G.S. Road & Six Mile</span>
                      <span className="text-gray-400 font-mono text-[10px]">~8.5 km | ~20 mins</span>
                    </div>
                    <ul className="flex flex-col gap-2 text-gray-300 font-sans">
                      <li className="flex gap-2 items-start">
                        <span className="w-4 h-4 bg-teal-500/20 text-teal-400 rounded-full flex items-center justify-center text-[9px] shrink-0 font-bold mt-0.5">1</span>
                        <span>Head south from Guwahati Railway Station towards **Paltan Bazaar**.</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="w-4 h-4 bg-teal-500/20 text-teal-400 rounded-full flex items-center justify-center text-[9px] shrink-0 font-bold mt-0.5">2</span>
                        <span>Drive down **G.S. Road** past Christian Basti to the **Six Mile Flyover** (7.2 km).</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="w-4 h-4 bg-teal-500/20 text-teal-400 rounded-full flex items-center justify-center text-[9px] shrink-0 font-bold mt-0.5">3</span>
                        <span>Turn left at the Six Mile intersection onto **VIP Road**.</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="w-4 h-4 bg-teal-500/20 text-teal-400 rounded-full flex items-center justify-center text-[9px] shrink-0 font-bold mt-0.5">4</span>
                        <span>Pass Zoo Road junction path; find **Royal Square Complex** on your right. The clinic is on the **1st floor**.</span>
                      </li>
                    </ul>
                  </>
                )}

                {selectedHub === 'airport' && (
                  <>
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="font-bold text-[#D4AF37] font-sans">Route via NH 27 & bypass</span>
                      <span className="text-gray-400 font-mono text-[10px]">~31 km | ~55 mins</span>
                    </div>
                    <ul className="flex flex-col gap-2 text-gray-300 font-sans">
                      <li className="flex gap-2 items-start">
                        <span className="w-4 h-4 bg-teal-500/20 text-teal-400 rounded-full flex items-center justify-center text-[9px] shrink-0 font-bold mt-0.5">1</span>
                        <span>Exit LGBI Airport and join **NH 27 (Guwahati Bypass)** heading east.</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="w-4 h-4 bg-teal-500/20 text-teal-400 rounded-full flex items-center justify-center text-[9px] shrink-0 font-bold mt-0.5">2</span>
                        <span>Continue straight past Jalukbari, Garchuk, and Lokhra.</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="w-4 h-4 bg-teal-500/20 text-teal-400 rounded-full flex items-center justify-center text-[9px] shrink-0 font-bold mt-0.5">3</span>
                        <span>Take the left exit near **Khanapara** onto VIP Road.</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="w-4 h-4 bg-teal-500/20 text-teal-400 rounded-full flex items-center justify-center text-[9px] shrink-0 font-bold mt-0.5">4</span>
                        <span>Drive 2.5 km down VIP Road; look for **Royal Square** building on your left.</span>
                      </li>
                    </ul>
                  </>
                )}

                {selectedHub === 'khanapara' && (
                  <>
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="font-bold text-[#D4AF37] font-sans">Direct path via VIP Road</span>
                      <span className="text-gray-400 font-mono text-[10px]">~3 km | ~8 mins</span>
                    </div>
                    <ul className="flex flex-col gap-2 text-gray-300 font-sans">
                      <li className="flex gap-2 items-start">
                        <span className="w-4 h-4 bg-teal-500/20 text-teal-400 rounded-full flex items-center justify-center text-[9px] shrink-0 font-bold mt-0.5">1</span>
                        <span>From **Khanapara Bus Terminus**, head northwest onto VIP Road.</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="w-4 h-4 bg-teal-500/20 text-teal-400 rounded-full flex items-center justify-center text-[9px] shrink-0 font-bold mt-0.5">2</span>
                        <span>Drive past description boards and Rahman Hospital.</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="w-4 h-4 bg-teal-500/20 text-teal-400 rounded-full flex items-center justify-center text-[9px] shrink-0 font-bold mt-0.5">3</span>
                        <span>You will reach the **Royal Square Complex** on your left. Parking is situated at ground level.</span>
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </div>

            {/* Google Maps Real Direct Action Button */}
            <a
              href="https://maps.google.com/?q=Marks+Dental+Clinic+VIP+Road+Guwahati"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-[#D4AF37] text-xs font-sans font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-teal-400" />
              <span>Launch Live Google Maps Navigation</span>
            </a>
          </div>

          {/* Right Column: Visual CSS Vector Map Canvas (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <div className="w-full h-[360px] rounded-xl bg-[#0a0f18] border border-white/5 relative overflow-hidden flex items-center justify-center">
              
              {/* Map grid lines for realistic cartography vibe */}
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1.5px)] [background-size:24px_24px] opacity-20" />
              
              {/* Brahmaputra river indicator block */}
              <div className="absolute top-4 left-4 bg-teal-950/40 backdrop-blur-md text-[9px] text-teal-300 font-mono font-bold py-1 px-3 rounded-full border border-teal-500/20 z-10">
                &bull; Brahmaputra River (Northward Base)
              </div>

              {/* Geographic road network (styled as golden/blue paths) */}
              <div className="absolute inset-x-0 top-[22%] h-4 bg-white/[0.02] -rotate-3 border-y border-white/[0.04]" />
              <div className="absolute inset-x-0 top-[68%] h-6 bg-white/[0.02] rotate-2 border-y border-white/[0.04]" />
              <div className="absolute inset-y-0 left-[26%] w-5 bg-white/[0.02] rotate-12 border-x border-white/[0.04]" />
              <div className="absolute inset-y-0 left-[72%] w-4 bg-white/[0.02] -rotate-6 border-x border-white/[0.04]" />

              {/* Highlight helper paths depending on route */}
              {selectedHub === 'station' && (
                <div className="absolute inset-0 pointer-events-none">
                  {/* Glowing station track highlights */}
                  <svg className="w-full h-full absolute inset-0 text-teal-500/20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 50 150 L 150 160 L 250 190 L 320 200 L 400 240 L 413 220" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="animate-pulse" />
                    <path d="M 50 150 L 150 160 L 250 190 L 320 200 L 400 240 L 413 220" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <div className="absolute top-[148px] left-[45px] w-2.5 h-2.5 bg-teal-400 rounded-full outline outline-4 outline-teal-500/30" />
                  <div className="absolute top-[130px] left-[20px] bg-slate-950/90 text-[8px] font-mono text-gray-400 border border-white/5 p-1 rounded">Guwahati Station Start</div>
                </div>
              )}

              {selectedHub === 'airport' && (
                <div className="absolute inset-0 pointer-events-none">
                  {/* Glowing Airport Bypass NH 27 highlight path */}
                  <svg className="w-full h-full absolute inset-0 text-[#D4AF37]/20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 500 50 L 480 120 L 460 180 L 413 220" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="animate-pulse" />
                    <path d="M 500 50 L 480 120 L 460 180 L 413 220" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <div className="absolute top-[45px] left-[495px] w-2.5 h-2.5 bg-[#D4AF37] rounded-full outline outline-4 outline-[#D4AF37]/30" />
                  <div className="absolute top-[28px] left-[420px] bg-slate-950/90 text-[8px] font-mono text-gray-400 border border-white/5 p-1 rounded">NH 27 Bypass Start</div>
                </div>
              )}

              {selectedHub === 'khanapara' && (
                <div className="absolute inset-0 pointer-events-none">
                  {/* Glowing short path from Khanapara */}
                  <svg className="w-full h-full absolute inset-0 text-emerald-500/20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 280 320 L 320 280 L 370 250 L 413 220" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="animate-pulse" />
                    <path d="M 280 320 L 320 280 L 370 250 L 413 220" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <div className="absolute top-[315px] left-[275px] w-2.5 h-2.5 bg-emerald-400 rounded-full outline outline-4 outline-emerald-500/30" />
                  <div className="absolute top-[320px] left-[180px] bg-slate-950/90 text-[8px] font-mono text-gray-400 border border-white/5 p-1 rounded">Khanapara Stop Start</div>
                </div>
              )}

              {/* Key Landmark Nodes */}
              <div className="absolute top-[22%] left-[18%] flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-gray-500 hover:bg-white transition-colors cursor-help peer" />
                <div className="absolute top-3 bg-slate-950/95 border border-white/10 p-1.5 rounded text-[8px] text-gray-400 whitespace-nowrap shadow-xl pointer-events-none opacity-0 peer-hover:opacity-100 transition-opacity z-20">
                  Six Mile Flyover Crossing
                </div>
              </div>

              <div className="absolute top-[65%] left-[82%] flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-gray-500 hover:bg-white transition-colors cursor-help peer" />
                <div className="absolute top-3 bg-slate-950/95 border border-white/10 p-1.5 rounded text-[8px] text-gray-400 whitespace-nowrap shadow-xl pointer-events-none opacity-0 peer-hover:opacity-100 transition-opacity z-20">
                  GS Road Commercial Hub
                </div>
              </div>

              <div className="absolute top-[45%] left-[55%] flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-gray-500 hover:bg-white transition-colors cursor-help peer" />
                <div className="absolute top-3 bg-slate-950/95 border border-white/10 p-1.5 rounded text-[8px] text-gray-400 whitespace-nowrap shadow-xl pointer-events-none opacity-0 peer-hover:opacity-100 transition-opacity z-20">
                  VIP Road Commercial Strip
                </div>
              </div>

              {/* The Clinic Destination pin with beautiful animations */}
              <div className="absolute top-[52%] left-[64%] transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                <div className="absolute -top-12 z-20 bg-[#0a0f18] border border-teal-500/40 text-white p-2 rounded-lg shadow-2xl flex flex-col items-center gap-0.5 whitespace-nowrap pointer-events-auto">
                  <span className="font-serif font-bold text-[10px] text-[#D4AF37]">Markz Dental Clinic</span>
                  <span className="font-mono text-[8px] text-teal-400">Royal Square, 1st Floor</span>
                </div>
                
                {/* Visual Radar Waves */}
                <div className="absolute w-12 h-12 bg-teal-500/25 rounded-full scale-150 animate-ping pointer-events-none" />
                <div className="absolute w-6 h-6 bg-[#D4AF37]/25 rounded-full scale-100 animate-pulse pointer-events-none" />
                
                {/* Glowing Core Pin marker */}
                <div className="w-9 h-9 bg-gradient-to-tr from-[#D4AF37] to-teal-400 rounded-full text-[#0a0f18] shadow-2xl flex items-center justify-center ring-4 ring-[#0d1522] cursor-pointer hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
              </div>

              {/* GPS coordinates & compass */}
              <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1.5 rounded-lg text-[9px] text-gray-400 font-mono border border-white/5 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>26.1264&deg; N, 91.8021&deg; E</span>
              </div>

              {/* Map visual style key corner */}
              <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1.5 rounded-lg text-gray-400 font-sans border border-white/5 flex flex-col gap-0.5 text-[8px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span>Interactive Pathway</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                  <span>Key Guwahati Landmark</span>
                </div>
              </div>

            </div>
            
            {/* Quick Helper address details */}
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5 text-xs text-gray-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-sans">
              <span className="italic leading-snug">
                **Landmark hint**: Located above the prime retail plaza of Royal Square, easily visible from VIP Road main thoroughfare context.
              </span>
              <a
                href="https://maps.google.com/?q=Marks+Dental+Clinic+VIP+Road+Guwahati"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 font-bold hover:underline shrink-0 flex items-center gap-1"
              >
                <span>View Street View</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
