import React from 'react';
import { Target, Heart, Award, ShieldCheck, CheckCircle2, FlaskConical } from 'lucide-react';
import FoundersSection from './FoundersSection';

export default function AboutSection() {
  return (
    <div className="w-full flex flex-col py-12 md:py-24 px-4 bg-[#0a0f18] text-white">
      {/* Brand Intro & Story */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 animate-fade-in font-sans">
        
        {/* Story Illustration Grid */}
        <div className="lg:col-span-5 relative font-sans">
          <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-[#D4AF37]/10 rounded-2xl transform rotate-2 animate-pulse" />
          <div className="absolute inset-0 bg-[#0d1522] border border-white/5 shadow-2xl rounded-2xl transform -rotate-1 animate-none" />
          
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-square sm:aspect-[4/3] lg:aspect-[1/1] bg-[#0d1522]">
            <img 
              src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800" 
              alt="Markz Dental Clinic Advanced Diagnostic Dental Operatory" 
              className="w-full h-full object-cover opacity-85 hover:opacity-100 transition-opacity duration-300"
              referrerPolicy="no-referrer"
            />
            {/* Absolute badge overlay for our beautiful newly uploaded logo */}
            <div className="absolute bottom-4 right-4 bg-white/95 p-2 sm:p-3 rounded-xl shadow-2xl border border-white/10 max-w-[140px] sm:max-w-[160px] cursor-pointer hover:scale-105 transition-transform duration-300">
              <img 
                src="/src/assets/images/markz_logo_v2_1781484356142.jpg" 
                alt="Markz Dental Clinic Official Brand Logo" 
                className="w-full h-auto object-contain rounded"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Story copy */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <span className="text-[10px] uppercase tracking-widest text-teal-400 font-bold block">Establishing Local Trust Since Day One</span>
          <h2 className="font-serif font-light text-3xl sm:text-4xl text-white tracking-tight">
            Advanced, Comfort-First Dental Practice in Guwahati, Assam
          </h2>
          <div className="h-0.5 w-12 bg-[#D4AF37] rounded-full mt-1" />
          
          <p className="font-sans text-gray-450 text-sm leading-relaxed text-pretty text-gray-450">
            At <strong>Markz Dental Clinic</strong>, we are committed to rewriting the traditional clinical narrative by making dental consults clean, comforting, and pain-free. Nestled in VIP Road, Guwahati, we cater to Assam with a combination of exceptional clinical MDS expertise, state-of-the-art dental equipment, and gentle chairside empathy.
          </p>
          <p className="font-sans text-gray-450 text-sm leading-relaxed text-pretty text-gray-450">
            We follow strict sterilization parameters that meet or exceed rigorous CDC guidelines. From single-visit root canals to guided titanium implant installations, we use premium metal-free composite materials (monolithic E-max and zirconia) to ensure your dental work doesn’t just feel strong, but looks indistinguishable from natural teeth.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            {[
              'Internationally Certified Autoclaves',
              'Advanced 3D Digital Intraoral Scanning',
              'Specialist-Curated Treatment Plans',
              'Zero-Anxiety Pediatric Dental Lounge'
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2.5 font-sans text-gray-300 text-sm">
                <CheckCircle2 className="w-4 h-4 text-teal-400 filter drop-shadow-sm shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Bento Cards */}
      <section className="bg-[#0b101b]/50 py-16 px-6 rounded-3xl max-w-7xl mx-auto w-full mb-20 border border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="bg-white/[0.02] p-8 rounded-2xl border border-white/5 flex flex-col gap-4">
            <div className="w-12 h-12 bg-teal-500/10 text-teal-400 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-[#D4AF37] text-xl">Our Clinical Mission</h3>
            <p className="font-sans text-gray-405 text-sm leading-relaxed text-gray-405">
              To deliver world-class, precise, and completely sterile dental healthcare options to the community of Guwahati and wider Northeast region using advanced rotary mechanisms, gentle patient integration, and structured preventive care.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white/[0.02] p-8 rounded-2xl border border-white/5 flex flex-col gap-4">
            <div className="w-12 h-12 bg-teal-500/10 text-teal-400 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-[#D4AF37] text-xl">Our Clinical Vision</h3>
            <p className="font-sans text-gray-405 text-sm leading-relaxed text-gray-405">
              To be the benchmark of ethical and micro-dentistry across Northeast India, empowering dental patients to enjoy their smiles proudly while eliminating dental dental-chair anxiety through empathetic patient relationship systems.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Founders Showcase */}
      <FoundersSection />

      {/* Facilities, Technology, & Hygiene Standards */}
      <section className="max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-14 flex flex-col gap-3">
          <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-1">Inside Our Clinic</span>
          <h2 className="font-serif font-light text-3xl text-white tracking-tight">Our Modern Facilities & Sterilization Standards</h2>
          <p className="font-sans text-gray-400 text-sm">
            We operate an ultra-hygienic facility engineered to minimize physical contaminants and produce beautiful treatments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Triple-Disinfected Air & Water Filters',
              icon: <ShieldCheck className="w-6 h-6 text-teal-400 animate-none" />,
              description: 'Our operatories feature double microbial air scrubbers and advanced UV water purification layouts, shielding you from cross-infections.'
            },
            {
              title: 'Premium Class-B Autoclaves',
              icon: <FlaskConical className="w-6 h-6 text-teal-400 animate-none" />,
              description: 'We follow absolute hospital-grade sterilization protocols. Non-disposable tools undergo high-temperature, high-vacuum ultrasonic autoclaving.'
            },
            {
              title: 'MDS Diagnostic Panel',
              icon: <Award className="w-6 h-6 text-teal-400 animate-none" />,
              description: 'Consultations are managed by certified Dentoperatory specialists. Dental diagnoses are confirmed using raw digital dental imagery and 3D mockups.'
            }
          ].map((item, index) => (
            <div key={index} className="p-7 bg-[#0d1522]/45 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center mb-5">
                {item.icon}
              </div>
              <h4 className="font-serif text-[#D4AF37] text-lg mb-3">{item.title}</h4>
              <p className="font-sans text-gray-400 text-xs sm:text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
