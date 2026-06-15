import React from 'react';
import { 
  ArrowRight, Phone, Award, ShieldCheck, HeartHandshake, Zap, 
  Star, ChevronRight, CheckCircle2, MessageSquare, Quote
} from 'lucide-react';
import { CLINIC_SERVICES, PATIENT_TESTIMONIALS } from '../data';

interface HomeSectionProps {
  setActiveTab: (tab: string) => void;
  openBookingModal: () => void;
}

export default function HomeSection({ setActiveTab, openBookingModal }: HomeSectionProps) {
  
  const handleServiceClick = (serviceId: string) => {
    setActiveTab('services');
    setTimeout(() => {
      const element = document.getElementById(serviceId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  // Select top 4 popular preview services
  const previewServices = CLINIC_SERVICES.slice(0, 4);

  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Section */}
      <section className="relative bg-[#0a0f18] text-white pt-10 pb-20 md:py-28 px-4 overflow-hidden border-b border-white/5">
        {/* Subtle geometric design grids background */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-radial-gradient from-teal-500/5 to-transparent rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Hero text */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
            <div className="inline-flex self-center lg:self-start items-center gap-2 px-3 py-1.5 bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-bold tracking-widest uppercase rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
              <span>Assam’s Elite Dental Care Practice</span>
            </div>
            
            <h1 className="font-serif font-light text-4xl sm:text-5xl md:text-7xl text-white tracking-tight leading-[1.05] text-balance">
              Your Smile, <br />
              Our <span className="italic text-[#D4AF37] gold-glow font-serif">Priority</span>.
            </h1>

            <p className="font-sans text-sm sm:text-base text-gray-400 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0 text-pretty">
              Advanced clinical dental care for the whole family in Guwahati. Experience painless microscopic root canals, guided computerized implants, and stunning cosmetic smile makeovers in a sterile, warm environment.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-2">
              <button
                onClick={openBookingModal}
                className="w-full sm:w-auto px-8 py-3.5 bg-teal-500 hover:bg-teal-400 text-[#0a0f18] font-sans font-bold text-xs uppercase tracking-widest rounded-sm transition-all shadow-lg hover:scale-[1.02] shadow-teal-500/20 cursor-pointer text-center"
              >
                Book Appointment
              </button>
              
              <a
                href="tel:+919937866280"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 border border-white/20 hover:bg-white/5 text-white hover:text-teal-400 rounded-sm font-sans font-bold text-xs uppercase tracking-widest transition-all"
              >
                <Phone className="w-4 h-4 text-teal-400" />
                <span>Call Now: +91 993786280</span>
              </a>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8 mt-4 text-center lg:text-left max-w-lg mx-auto lg:mx-0">
              <div>
                <span className="block font-serif font-light text-3xl text-white">15+</span>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1 block">Years Experience</span>
              </div>
              <div className="border-x border-white/10">
                <span className="block font-serif font-light text-3xl text-[#D4AF37]">10,000+</span>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1 block">Happy Smiles</span>
              </div>
              <div>
                <span className="block font-serif font-light text-3xl text-white">4.9/5</span>
                <span className="text-[10px] text-teal-400 font-bold uppercase tracking-widest mt-1 block flex items-center justify-center lg:justify-start gap-1">
                  <Star className="w-3.5 h-3.5 fill-teal-400 text-teal-400 inline" /> Google Score
                </span>
              </div>
            </div>
          </div>

          {/* Hero image canvas */}
          <div className="lg:col-span-5 relative self-center">
            {/* Visual background layers */}
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-[#D4AF37]/10 rounded-2xl transform rotate-3" />
            <div className="absolute inset-0 bg-[#0d1522] border border-white/5 shadow-2xl rounded-2xl transform -rotate-2" />
            
            <div className="relative rounded-2xl overflow-hidden aspect-square sm:aspect-[4/3] lg:aspect-[1/1] shadow-2xl border border-white/10 bg-[#0d1522]">
              <img 
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000" 
                alt="Markz Dental Clinic interior clinic checkup Guwahati" 
                className="w-full h-full object-cover opacity-85 hover:opacity-100 transition-opacity duration-300"
                referrerPolicy="no-referrer"
              />
              
              {/* Doctor float card */}
              <div className="absolute bottom-4 left-4 bg-[#0d1522]/90 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-white/10 max-w-xs hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-[#0a0f18] font-bold font-sans">MD</div>
                <div>
                  <h4 className="font-sans font-bold text-white text-sm leading-tight">Dr. Sudheer Krishna</h4>
                  <p className="font-sans text-xs text-teal-400">Chief Consultant Implantologist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Features / Core Strengths Section */}
      <section className="bg-[#0a0f18] py-20 px-4 border-b border-white/5" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-[10px] uppercase tracking-widest text-teal-400 font-bold">Why Choose Us?</span>
            <h2 className="font-serif font-light text-3xl sm:text-4xl text-white tracking-tight">
              Exceptional Care and Uncompromising Standards
            </h2>
            <div className="h-0.5 w-16 bg-[#D4AF37] mx-auto rounded-full mt-1" />
            <p className="font-sans text-gray-400 text-sm leading-relaxed mt-2 text-pretty">
              At Markz Dental Clinic, we combine medical excellence with a deeply caring attitude, safeguarding your dental hygiene at every treatment stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Award className="w-6 h-6 text-teal-400" />,
                title: 'Experienced Dentists',
                desc: 'Highly qualified specialists (MDS Consultants) managing advanced orthognathics, implants, and periodontology.'
              },
              {
                icon: <Zap className="w-6 h-6 text-teal-400" />,
                title: 'Modern Equipment',
                desc: 'Digital 3D intraoral diagnostics, high-precision CAD/CAM laboratories, and painless computerized rotaries.'
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-teal-400" />,
                title: 'Sterile & Safe Care',
                desc: 'Meticulously strictly maintained multi-tier autoclave disinfection protocols matching rigid international guidelines.'
              },
              {
                icon: <HeartHandshake className="w-6 h-6 text-teal-400" />,
                title: 'Restorative Care',
                desc: 'Honest pricing frameworks, flexible clinical plans, and absolute transparency without hidden billing fees.'
              }
            ].map((feat, index) => (
              <div 
                key={index}
                className="p-8 bg-[#0d1522]/40 rounded-xl hover:bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all duration-300 flex flex-col gap-4 group"
              >
                <div className="w-12 h-12 bg-teal-500/10 text-teal-400 rounded-lg flex items-center justify-center p-2.5 group-hover:bg-teal-500 group-hover:text-[#0a0f18] transition-colors duration-300">
                  {feat.icon}
                </div>
                <h3 className="font-serif text-[#D4AF37] text-lg sm:text-xl transition-colors">
                  {feat.title}
                </h3>
                <p className="font-sans text-gray-400 text-xs sm:text-sm leading-relaxed text-pretty">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Services Preview Section */}
      <section className="bg-[#0d1522]/30 py-20 px-4 border-b border-white/5" id="services-intro">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-14">
            <div className="text-left max-w-2xl flex flex-col gap-3">
              <span className="text-[10px] uppercase tracking-widest text-teal-400 font-bold">Clinical Catalog</span>
              <h2 className="font-serif font-light text-3xl sm:text-4xl text-white tracking-tight">
                Pioneering Dental Care Services
              </h2>
              <p className="font-sans text-gray-400 text-sm max-w-xl text-pretty">
                Explore a selected preview of our specialized restorative and cosmetic dental treatments, engineered for long-term health and absolute comfort.
              </p>
            </div>
            
            <button
              onClick={() => {
                setActiveTab('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group inline-flex items-center gap-2 px-6 py-2.5 border border-white/20 text-white hover:bg-white/5 text-xs font-bold uppercase tracking-widest rounded-sm shadow-sm transition-all cursor-pointer whitespace-nowrap"
            >
              <span>View All 10 Services</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewServices.map((service) => (
              <div 
                key={service.id}
                className="bg-[#0d1522]/60 p-6 rounded-xl border border-white/5 hover:border-white/10 hover:bg-[#0d1522]/90 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="inline-block px-2 py-0.5 bg-teal-500/10 text-teal-400 border border-teal-500/25 rounded text-[10px] font-bold uppercase tracking-wider mb-4 font-sans">
                    {service.category}
                  </div>
                  <h3 className="font-serif text-[#D4AF37] text-lg mb-2 group-hover:text-white transition-colors">{service.name}</h3>
                  <p className="font-sans text-gray-400 text-xs leading-relaxed mb-6 line-clamp-3">
                    {service.shortDescription}
                  </p>
                </div>
                
                <button
                  onClick={() => handleServiceClick(service.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-400 hover:text-white transition-colors uppercase tracking-wider cursor-pointer mt-auto"
                >
                  <span>Explore Service Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Google Reviews and Testimonials Combo */}
      <section className="bg-[#0a0f18] py-20 px-4" id="testimonials">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Google Reviews Trust Widget Panel */}
            <div className="lg:col-span-4 bg-[#0d1522] p-8 border border-white/10 rounded-2xl text-white shadow-2xl flex flex-col gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 blur-3xl rounded-full" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#D4AF37]/5 blur-3xl rounded-full" />

              <div>
                <span className="text-[10px] font-sans font-bold text-teal-400 uppercase tracking-widest block mb-1">Guwahati Clinic Feedback</span>
                <h3 className="font-serif font-light text-2xl tracking-tight text-white">Verified Google Reviews</h3>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-serif font-light text-5xl text-[#D4AF37] gold-glow">4.9</span>
                <span className="text-gray-400 font-sans text-sm">out of 5 stars</span>
              </div>

              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                ))}
              </div>

              <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed">
                Backed by <strong>340+ certified organic reviews</strong> from localized residents across Guwahati, Khanapara, Paltan Bazaar, and general Assam.
              </p>

              <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex items-center gap-3">
                <div className="w-9 h-9 bg-teal-500 rounded flex items-center justify-center font-serif text-lg font-bold text-[#0a0f18] uppercase select-none">
                  G
                </div>
                <div>
                  <p className="font-sans font-bold text-xs text-white">Markz Dental Clinic Guwahati</p>
                  <p className="font-sans text-[10px] text-gray-500">Official Business Listing</p>
                </div>
              </div>
            </div>

            {/* Testimonial slider / list */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              <div className="text-left flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Patient Stories</span>
                <h3 className="font-serif font-light text-2xl sm:text-3xl text-white tracking-tight">Loved by Thousands of Happy Patients</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PATIENT_TESTIMONIALS.map((review) => (
                  <div 
                    key={review.id}
                    className="p-6 bg-[#0d1522]/40 rounded-xl border border-white/5 hover:border-white/10 transition-all duration-300 relative flex flex-col justify-between"
                  >
                    <Quote className="absolute top-4 right-4 w-12 h-12 text-white/5 pointer-events-none" />
                    
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-0.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                        ))}
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed italic text-pretty">
                        "{review.comment}"
                      </p>
                    </div>

                    <div className="border-t border-white/5 pt-4 mt-4 flex items-center justify-between">
                      <div>
                        <h4 className="font-sans font-bold text-white text-xs sm:text-sm">{review.name}</h4>
                        <span className="text-[9px] bg-teal-500/10 text-teal-400 font-sans px-1.5 py-0.5 rounded border border-teal-500/20 font-bold uppercase tracking-wider mt-1.5 inline-block">
                          {review.treatment}
                        </span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] text-teal-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 fill-teal-500/10 text-teal-400" /> Verified
                        </span>
                        <span className="text-[10px] text-gray-500 mt-0.5">{review.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
          
        </div>
      </section>

      {/* 5. Direct Booking Call-To-Action (CTA) panel */}
      <section className="bg-gradient-to-br from-[#0d1522] via-[#0a0f18] to-[#0d1522] border-y border-white/10 py-16 px-4 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-teal-500/[0.02] pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-5">
          <h2 className="font-serif font-light text-3xl sm:text-4xl tracking-tight text-white">
            Ready to Experience World-Class Dentistry?
          </h2>
          <p className="font-sans text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Don’t put off your dental health. Reserve your premium clinical slot online instantly or dial our round-the-clock emergency desk directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-3">
            <button
              onClick={openBookingModal}
              className="w-full sm:w-auto px-8 py-3.5 bg-teal-500 hover:bg-teal-400 text-[#0a0f18] font-sans font-bold text-xs uppercase tracking-widest rounded-sm transition-all"
            >
              Book My Slot Now
            </button>
            <a
              href="mailto:info@marksdentalclinic.com"
              className="w-full sm:w-auto px-8 py-3.5 border border-white/20 hover:bg-white/5 text-white font-sans font-bold text-xs uppercase tracking-widest rounded-sm transition-all"
            >
              Email Us Directly
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
