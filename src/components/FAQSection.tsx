import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, HelpCircle, FileText, ChevronDown, 
  Sparkles, ShieldCheck, CreditCard, Clock, MessageSquare, Calendar
} from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'clinical' | 'policy';
  question: string;
  answer: string;
  tags: string[];
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'children-cavity',
    category: 'clinical',
    question: 'How can I prevent cavities in young children at home?',
    answer: 'Cavity prevention in young children revolves around three core clinical habits:\n\n1. **Fluoride Protection**: Brush twice daily with an age-appropriate fluoride toothpaste (a tiny smear smaller than a grain of rice under 3 years; a pea-sized amount for ages 3-6).\n2. **Dietary Safeguards**: Limit sticky sweets, processed snack crumbs, fruit juices, and bedtime milk bottles. Refrain from letting your child sleep with milk or juices in their mouth.\n3. **Early Intervention**: Schedule routine dental checkups every 6 months for professional fluoride varnish application or dental sealants that coat the deep molar pits and grooved pathways.',
    tags: ['pediatric', 'cavity', 'prevention', 'kids']
  },
  {
    id: 'teeth-sensitivity',
    category: 'clinical',
    question: 'What should I do if I experience sudden tooth sensitivity to hot or cold?',
    answer: 'Sudden tooth sensitivity is frequently triggered by worn enamel, gum recession (exposing the thin dentin), or unconscious nighttime teeth grinding (bruxism).\n\n* **Immediate Relief**: Switch to a desensitizing toothpaste containing potassium nitrate or arginine, and brush gently with an ultra-soft bristle brush. Avoid acidic foods, citrus fruits, and carbonated beverages.\n* **Clinical Evaluation**: If sensitivity persists for more than a week or turns into a lingering throb, schedule an scan with us. It could indicate a hidden decay, a micro-crack, or a leaking dental restoration.',
    tags: ['sensitivity', 'pain', 'enamel', 'scaling']
  },
  {
    id: 'whitening-safety',
    category: 'clinical',
    question: 'Is professional teeth whitening safe for my natural tooth enamel?',
    answer: 'Yes! Under expert clinical supervision, professional teeth whitening is completely safe.\n\nThe medical-grade whitening gel contains active hydrogen or carbamide molecules that penetrate the microscopic enamel tubules to oxidize trapped pigments without changing or eroding your tooth anatomy. Our clinic custom-fits protective gingival gum barriers to completely shield delicate soft tissues from chemical contact, eliminating burning risks.',
    tags: ['whitening', 'cosmetic', 'bleaching', 'stains']
  },
  {
    id: 'aligner-duration',
    category: 'clinical',
    question: 'How long do clear aligners take to straighten crooked teeth?',
    answer: 'On average, clear orthodontic aligners take between **8 to 18 months** to complete standard dental corrections. \n\nYour actual treatment duration depends on the severity of crowding and your personal compliance. Aligners must be kept in place for **at least 22 hours per day**, removed only when eating, drinking anything other than water, or brushing/flossing. Skipping designated wear times will delay progress.',
    tags: ['orthodontics', 'aligners', 'braces', 'timeline']
  },
  {
    id: 'cancellation-policy',
    category: 'policy',
    question: 'What is Markz Dental Clinic’s appointment cancellation policy?',
    answer: 'To ensure maximum availability of our MDS consultants and state-of-the-art operatory suites, we kindly request a minimum of **24 hours’ notice** for cancellations or rescheduling.\n\nThis window allows our administrative staff to allocate the vacant outpatient slot to waiting list patients or individuals experiencing urgent dental distress. Repeated late-stage cancellations may incur a nominal rescheduling deposit.',
    tags: ['appointments', 'cancellation', 'rescheduling', 'timings']
  },
  {
    id: 'emergency-services',
    category: 'policy',
    question: 'Do you provide immediate emergency dental treatments after hours?',
    answer: 'Absolutely. We have an on-call emergency dental team to manage acute, severe dental trauma and distress.\n\nEmergency situations include:\n\n* Knocked-out (avulsed) permanent tooth (keep the tooth moist in milk or saliva and reach us within 1 hour)\n* Uncontrollable postoperative oral bleeding\n* Severe facial or gum swelling that impairs breathing or swallowing\n* Sudden, agonizing dental pain or jaw dislocation\n\nFor sudden after-hour emergencies, call our clinic hotline **+91 9937866280** immediately.',
    tags: ['emergency', 'trauma', 'pain', 'after-hours']
  },
  {
    id: 'payment-emi',
    category: 'policy',
    question: 'What payment modes do you accept? Do you offer 0% EMI financing?',
    answer: 'We support multiple payment channels to make high-quality dentistry accessible to everyone:\n\n* **Direct Payments**: We accept all major Credit/Debit Cards, UPI portals (GPay, PhonePe, Paytm), net banking, and direct cash.\n* **0% EMI Financing**: For complex dental works, multiple implant placements, orthodontic treatments, or aesthetic smile makeovers, we partner with premium health finance services to offer high-approval, flexible **0-interest EMI options** over 3 to 12 months with minimal paperwork.',
    tags: ['payments', 'insurance', 'emi', 'pricing']
  },
  {
    id: 'sterilization-protocols',
    category: 'policy',
    question: 'How does your clinic ensure strict sterilization and hygiene safeguards?',
    answer: 'We maintain zero compromise when it comes to clinical sanitation. Our clinic strictly adheres to international CDC and OSHA guidelines:\n\n1. **Class-B Autoclaves**: All reusable metal instruments undergo initial ultrasonic cleaning, chemical bathing, and final vacuum sterilization in a state-of-the-art Class-B digital autoclave.\n2. **Surface Sterilization**: All operatory chairs, display monitors, dental handpieces, and overhead lights are thoroughly disinfected using medical-grade virucidal sprays between patients.\n3. **Single-Use Consumables**: Syringes, suction suction pointers, surgical drapes, and consulting arrays are 100% disposable and unsealed right before your eyes.',
    tags: ['sterilization', 'hygiene', 'safety', 'covid']
  }
];

export default function FAQSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'clinical' | 'policy'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesQuestion = item.question.toLowerCase().includes(query);
        const matchesAnswer = item.answer.toLowerCase().includes(query);
        const matchesTags = item.tags.some(tag => tag.toLowerCase().includes(query));
        return matchesQuestion || matchesAnswer || matchesTags;
      }
      return true;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="w-full bg-[#0a0f18] text-white py-12 md:py-20 px-4">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        
        {/* Header Block */}
        <div className="text-center flex flex-col gap-3">
          <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Patient Resource Center</span>
          <h2 className="font-serif font-light text-3xl sm:text-4xl text-white tracking-tight">
            Frequently Asked <span className="text-[#D4AF37]">Questions</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
            Get instant answers to clinical oral care inquiries, treatment timelines, payment options, and clinic hygiene standards.
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-white/5 pb-8">
          
          {/* Category Tabs */}
          <div className="flex bg-white/[0.02] border border-white/5 rounded-xl p-1 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`flex-1 sm:flex-none py-2 px-4 rounded-lg text-xs font-bold font-sans tracking-wide transition-all uppercase cursor-pointer ${
                activeCategory === 'all' 
                  ? 'bg-teal-500 text-[#0a0f18]' 
                  : 'text-gray-450 hover:text-white hover:bg-white/[0.01]'
              }`}
            >
              All Topics
            </button>
            <button
              onClick={() => setActiveCategory('clinical')}
              className={`flex-grow sm:flex-none py-2 px-4 rounded-lg text-xs font-bold font-sans tracking-wide transition-all uppercase flex items-center justify-center gap-1.5 cursor-pointer ${
                activeCategory === 'clinical' 
                  ? 'bg-teal-500 text-[#0a0f18]' 
                  : 'text-gray-450 hover:text-white hover:bg-white/[0.01]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dental Guide</span>
            </button>
            <button
              onClick={() => setActiveCategory('policy')}
              className={`flex-grow sm:flex-none py-2 px-4 rounded-lg text-xs font-bold font-sans tracking-wide transition-all uppercase flex items-center justify-center gap-1.5 cursor-pointer ${
                activeCategory === 'policy' 
                  ? 'bg-teal-500 text-[#0a0f18]' 
                  : 'text-gray-450 hover:text-white hover:bg-white/[0.01]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Clinic Policies</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search health questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-teal-500 hover:border-white/15 transition-all font-sans"
              id="faq-search-input"
            />
          </div>

        </div>

        {/* FAQs Accordion Container */}
        <div className="flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {filteredFAQs.map((faq) => {
              const isOpen = expandedId === faq.id;
              return (
                <motion.div
                  layout
                  key={faq.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-[#0d1522]/30 rounded-2xl border transition-all duration-300 ${
                    isOpen 
                      ? 'border-teal-500/30 bg-[#0d1522]/80' 
                      : 'border-white/5 hover:border-white/10'
                  }`}
                  id={`faq-accordion-item-${faq.id}`}
                >
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className={`p-2 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isOpen ? 'bg-teal-500/15 text-teal-400' : 'bg-white/[0.02] text-gray-500 group-hover:text-teal-400'
                      }`}>
                        {faq.category === 'clinical' ? (
                          <HelpCircle className="w-4 h-4" />
                        ) : (
                          <FileText className="w-4 h-4" />
                        )}
                      </span>
                      <span className={`font-serif text-sm sm:text-base tracking-tight leading-snug transition-colors ${
                        isOpen ? 'text-[#D4AF37]' : 'text-gray-250 group-hover:text-white'
                      }`}>
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown className={`w-4.5 h-4.5 text-gray-500 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-teal-450' : 'group-hover:text-white'
                    }`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 sm:px-6 sm:pb-7 border-t border-white/5 pt-4">
                          <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed whitespace-pre-line text-balance text-pretty">
                            {faq.answer}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {faq.category === 'clinical' ? (
                              <span className="text-[10px] font-sans font-bold uppercase bg-teal-500/5 text-teal-400 border border-teal-500/10 py-1 px-2.5 rounded-full">
                                Dental Guide
                              </span>
                            ) : (
                              <span className="text-[10px] font-sans font-bold uppercase bg-[#D4AF37]/5 text-[#D4AF37] border border-[#D4AF37]/10 py-1 px-2.5 rounded-full">
                                Clinic Policy
                              </span>
                            )}
                            {faq.tags.map(tag => (
                              <span key={tag} className="text-[10px] font-sans text-gray-500 bg-white/[0.02] border border-white/5 py-1 px-2.5 rounded-full">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12 px-4 border border-dashed border-white/5 rounded-2xl flex flex-col gap-3 items-center">
              <Search className="w-8 h-8 text-gray-600 animate-pulse" />
              <p className="font-sans text-xs text-gray-400">No results match your search: "{searchQuery}"</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="text-xs text-teal-400 font-bold hover:underline font-sans mt-1"
              >
                Clear Search & Filters
              </button>
            </div>
          )}
        </div>

        {/* Helpful Resources Callout Box */}
        <div className="bg-[#0b101b] border border-white/5 p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 mt-6">
          <div className="flex gap-4 items-start text-left max-w-lg">
            <span className="p-3 bg-teal-500/10 rounded-xl text-teal-405 text-teal-400 flex items-center justify-center mt-1">
              <MessageSquare className="w-5 h-5" />
            </span>
            <div className="flex flex-col gap-1">
              <h4 className="font-serif text-[#D4AF37] text-base sm:text-lg tracking-tight font-light col-span-full">Have a Custom Dental Inquiry?</h4>
              <p className="font-sans text-xs text-gray-400 leading-relaxed">
                Connect with Aura, our smart virtual dental assistant, or consult directly with our Guwahati prosthodontics and periodontics experts.
              </p>
            </div>
          </div>
          <div className="flex gap-3 shrink-0 w-full md:w-auto">
            {/* CTA action buttons */}
            <button
              onClick={() => {
                const chatbotTrigger = document.getElementById('aura-chatbot-trigger');
                if (chatbotTrigger) {
                  chatbotTrigger.click();
                }
              }}
              className="flex-1 md:flex-none px-4.5 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-bold font-sans hover:border-white/20 border border-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Consult AI Aura</span>
            </button>
            <a
              href="tel:+919937866280"
              className="flex-1 md:flex-none px-4.5 py-2.5 bg-teal-500 hover:bg-teal-400 text-[#0a0f18] rounded-lg text-xs font-bold font-sans transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#0a0f18]" />
              <span>Call Helpline</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
