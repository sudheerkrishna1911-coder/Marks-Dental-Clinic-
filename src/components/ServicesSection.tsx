import React, { useState } from 'react';
import { 
  ShieldCheck, Sparkles, Smile, Layers, Activity, 
  HeartHandshake, Sun, Crown, HeartPulse, ChevronDown, 
  ChevronUp, CheckCircle, Flame, Plus, Minus
} from 'lucide-react';
import { CLINIC_SERVICES } from '../data';
import { ServiceItem } from '../types';

export default function ServicesSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState<{ [key: string]: number }>({});

  const toggleFaq = (serviceId: string, index: number) => {
    setOpenFaqIndex((prev) => {
      const current = prev[serviceId];
      return {
        ...prev,
        [serviceId]: current === index ? -1 : index,
      };
    });
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield':
        return <ShieldCheck className="w-6 h-6 text-teal-400" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-teal-400" />;
      case 'Smile':
        return <Smile className="w-6 h-6 text-teal-400" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-teal-400" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-teal-400" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-teal-400" />;
      case 'Sun':
        return <Sun className="w-6 h-6 text-teal-400" />;
      case 'Crown':
        return <Crown className="w-6 h-6 text-teal-400" />;
      default:
        return <HeartPulse className="w-6 h-6 text-teal-400" />;
    }
  };

  const handleSidebarClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-[#0a0f18] text-white py-12 md:py-24 px-4 font-sans">
      
      {/* Intro Heading Section */}
      <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
        <span className="text-[10px] uppercase tracking-widest text-teal-400 font-bold">Dental Healthcare Catalog</span>
        <h2 className="font-serif font-light text-3xl sm:text-4xl text-white tracking-tight">Our Professional Services & Treatments</h2>
        <div className="h-0.5 w-16 bg-[#D4AF37] mx-auto rounded-full mt-1" />
        <p className="font-sans text-gray-400 text-sm leading-relaxed mt-2 text-pretty">
          Every procedure at Marks Dental Clinic is delivered by highly experienced dental MDS consultants using modern sterilizing hygiene standards, high-magnification diagnostics, and sterile techniques.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative">
        
        {/* Sticky Service Shortcut Sidebar Widget */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24 bg-[#0d1522] p-6 rounded-2xl border border-white/10 shadow-2xl hidden lg:flex flex-col gap-3">
          <h3 className="font-serif text-[#D4AF37] text-base border-b border-white/5 pb-3 block uppercase tracking-wider">Quick Navigation</h3>
          <nav className="flex flex-col gap-1.5 animate-fade-in text-[11px] font-bold uppercase tracking-wider">
            {CLINIC_SERVICES.map((serv) => (
              <button
                key={`side-${serv.id}`}
                onClick={() => handleSidebarClick(serv.id)}
                className="text-left font-sans text-gray-450 hover:text-teal-400 py-2 px-3 hover:bg-white/[0.03] rounded-lg transition-all flex items-center gap-2 cursor-pointer group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-teal-500 shrink-0 transition-colors" />
                <span className="truncate">{serv.name}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Detailed Services Content Columns */}
        <main className="lg:col-span-8 flex flex-col gap-14">
          {CLINIC_SERVICES.map((service, sIndex) => (
            <section 
              key={service.id} 
              id={service.id}
              className="bg-[#0d1522]/40 rounded-2xl border border-white/5 shadow-2xl p-6 sm:p-8 flex flex-col gap-6 scroll-mt-24 relative hover:border-white/10 hover:bg-[#0d1522]/80 transition-all duration-300"
            >
              {/* Service header banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-teal-500/10 rounded-xl flex items-center justify-center">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <div>
                    <h3 className="font-serif text-[#D4AF37] text-xl sm:text-2xl tracking-tight leading-tight font-light">{service.name}</h3>
                    <span className="text-[10px] bg-teal-500/10 text-teal-400 font-sans tracking-widest font-semibold px-2 py-0.5 rounded border border-teal-500/20 uppercase inline-block mt-1">
                      {service.category} Category Code
                    </span>
                  </div>
                </div>
                
                <span className="text-xs sm:text-sm font-semibold text-gray-600 font-mono self-start sm:self-center">
                  DIAGNOSTIC-C0{sIndex + 1}
                </span>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <h4 className="font-sans font-bold text-teal-400 text-xs uppercase tracking-wider">About the Treatment</h4>
                <p className="font-sans text-gray-400 text-sm leading-relaxed text-pretty">
                  {service.fullDescription}
                </p>
              </div>

              {/* Benefits */}
              <div className="flex flex-col gap-3">
                <h4 className="font-sans font-bold text-teal-400 text-xs uppercase tracking-wider">Clinical Key Benefits</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-1">
                  {service.benefits.map((benefit, bIndex) => (
                    <div key={bIndex} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-teal-400 fill-teal-500/10 shrink-0 mt-0.5" />
                      <span className="font-sans text-gray-300 text-xs sm:text-sm leading-tight text-pretty">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Treatment process timeline */}
              <div className="flex flex-col gap-4 bg-white/[0.02] p-5 rounded-xl border border-white/5">
                <h4 className="font-sans font-bold text-teal-400 text-xs uppercase tracking-wider">Treatment Steps & Strategy</h4>
                <div className="relative pl-6 border-l border-dashed border-teal-500/20 flex flex-col gap-5 mt-2 ml-1.5">
                  {service.treatmentProcess.map((step, pIndex) => (
                    <div key={pIndex} className="relative">
                      {/* Timeline dot marker */}
                      <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-[#0a0f18] border-2 border-teal-500 flex items-center justify-center text-[9px] font-bold text-teal-400 select-none">
                        {pIndex + 1}
                      </span>
                      <p className="font-sans text-gray-305 text-xs sm:text-sm leading-relaxed text-gray-305">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Accordion container */}
              <div className="flex flex-col gap-3">
                <h4 className="font-sans font-bold text-teal-400 text-xs uppercase tracking-wider">Patient FAQs</h4>
                <div className="flex flex-col gap-2 mt-1 font-sans">
                  {service.faqs.map((faq, fIndex) => {
                    const isFaqOpen = openFaqIndex[service.id] === fIndex;
                    return (
                      <div 
                        key={fIndex}
                        className="bg-white/[0.02] rounded-lg border border-white/5 overflow-hidden transition-all"
                      >
                        <button
                          onClick={() => toggleFaq(service.id, fIndex)}
                          className="w-full text-left py-3 px-4 flex justify-between items-center gap-3 hover:bg-white/[0.04] cursor-pointer"
                        >
                          <span className="font-sans text-white font-semibold text-xs sm:text-sm leading-tight">{faq.question}</span>
                          {isFaqOpen ? (
                            <Minus className="w-4 h-4 text-[#D4AF37] shrink-0" />
                          ) : (
                            <Plus className="w-4 h-4 text-[#D4AF37] shrink-0" />
                          )}
                        </button>
                        
                        {isFaqOpen && (
                          <div className="px-4 pb-4 pt-1 border-t border-white/5 bg-white/[0.01]">
                            <p className="font-sans text-gray-450 text-xs sm:text-sm leading-relaxed text-pretty text-gray-400">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </section>
          ))}
        </main>
        
      </div>
      
    </div>
  );
}
