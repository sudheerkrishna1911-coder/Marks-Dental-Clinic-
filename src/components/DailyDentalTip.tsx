import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, ArrowRight, RotateCcw, AlertTriangle, Lightbulb, Heart, Shuffle } from 'lucide-react';

interface DentalTip {
  id: number;
  title: string;
  category: string;
  fact: string;
  clinicalAction: string;
}

const DENTAL_TIPS: DentalTip[] = [
  {
    id: 1,
    title: "The 30-Minute Acid Buffer",
    category: "Enamel Protection",
    fact: "Acidic foods and drinks (like citrus fruits, soft drinks, or black coffee) temporarily soften your tooth enamel.",
    clinicalAction: "Wait at least 30 minutes before brushing after acidic meals. Rinse with plain water first to restore natural pH."
  },
  {
    id: 2,
    title: "The 40% Flossing Equation",
    category: "Interdental Care",
    fact: "Brushing only cleans about 60% of your tooth surfaces. The remaining 40% lies of tight spaces untouched by bristles.",
    clinicalAction: "Floss at least once daily. It is the only physical way to clear active bacterial biofilm from between contacts."
  },
  {
    id: 3,
    title: "Don't Rinse the Therapy",
    category: "Toothpaste Maximization",
    fact: "Spitting toothpaste but immediately rinsing your mouth with tap water washes away the active therapeutic fluoride film.",
    clinicalAction: "Spit out excess foam after brushing, but do not rinse with water. Let the residue remineralize your enamel."
  },
  {
    id: 4,
    title: "De-shun Your Tongue",
    category: "Fresh Breath",
    fact: "Over 85% of bad breath (halitosis) triggers hide within the back third of the tongue's microscopic papillae.",
    clinicalAction: "Use a plastic or copper tongue scraper daily. Gentle scraping is more effective than brushing with bristles."
  },
  {
    id: 5,
    title: "The 3-Month Bristle Warning",
    category: "Maintenance",
    fact: "Frayed or flared bristles lose their structural integrity and reduce plaque-removal efficiency by over 50%.",
    clinicalAction: "Replace your toothbrush or electric head every 10-12 weeks, or sooner if you recover from a throat infection."
  },
  {
    id: 6,
    title: "Active Gingival Alarm",
    category: "Gum Health",
    fact: "Bleeding gums during normal brushing are a direct warning sign of microvascular inflammation (gingivitis), not simple friction.",
    clinicalAction: "Do not stop brushing/flossing the area. Gentle persistent cleaning and professional scaling will reverse gingivitis."
  },
  {
    id: 7,
    title: "The Salivary Calcium Buffer",
    category: "Natural Defense",
    fact: "Saliva is rich in natural calcium and phosphate minerals which wash away food debris and neutralize active acids.",
    clinicalAction: "Chew sugar-free gum containing 100% xylitol for 10 minutes post-snack to boost protective salivary gland flow."
  },
  {
    id: 8,
    title: "Hard Bristle Erosion",
    category: "Prevention",
    fact: "Medium or hard toothbrushes act like abrasive sandpaper, permanently rubbing away protective enamel and causing gum recession.",
    clinicalAction: "Always select 'Soft' or 'Ultra-Soft' rounded nylon bristles. Apply light pressure—let the modern bristle architecture do the work."
  },
  {
    id: 9,
    title: "Pre-brush Flossing Rule",
    category: "Optimal Routine",
    fact: "Flossing before brushing clears the tight interdental channels, enabling fluoridated toothpaste to coat and protect more surfaces.",
    clinicalAction: "Revamp your sequence: Floss first to clear debris, then brush with standard fluoridated toothpaste to protect."
  },
  {
    id: 10,
    title: "Avoid Carbonate Erosion",
    category: "Acid Damage",
    fact: "Even sugar-free flavored sparkling water is carbonated, meaning it contains carbonic acid which can slowly leach calcium.",
    clinicalAction: "Enjoy fizzy waters with meals to leverage chew-stimulated saliva buffering, or drink them using a reusable straw."
  },
  {
    id: 11,
    title: "Bruxism and Micro-Fractures",
    category: "Neuromuscular",
    fact: "Nocturnal teeth grinding or clenching (bruxism) exerts up to 250 lbs of pressure, leading to micro-cracks and chronic jaw pain.",
    clinicalAction: "Ask Dr. Sudheer Krishna about custom-engineered nightguards to dissipate stress and cushion precious enamel."
  },
  {
    id: 12,
    title: "The Hydration Guard",
    category: "Saliva Flow",
    fact: "Dehydration slows down salivary flow, reducing natural antibacterial protection and increasing the risk of tooth decay.",
    clinicalAction: "Ensure you drink at least 8-10 glasses of water. Keep your oral cavity moist to actively repel overnight plaques."
  }
];

export default function DailyDentalTip() {
  const [tipIndex, setTipIndex] = useState(0);
  const [isManual, setIsManual] = useState(false);
  const [revealMode, setRevealMode] = useState(false);

  useEffect(() => {
    // Determine daily index based on current date
    const today = new Date();
    // Use year + month + date to create a stable day counter
    const idSeed = today.getFullYear() * 365 + (today.getMonth() + 1) * 31 + today.getDate();
    const index = idSeed % DENTAL_TIPS.length;
    setTipIndex(index);
  }, []);

  const handleNextTip = () => {
    setIsManual(true);
    setTipIndex((prev) => (prev + 1) % DENTAL_TIPS.length);
  };

  const currentTip = DENTAL_TIPS[tipIndex];

  return (
    <div 
      className="w-full bg-[#0d1522]/40 backdrop-blur-sm border-y border-white/5 py-4 px-4 overflow-hidden"
      id="daily-dental-tip-ticker"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left side Tag */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
            <Sparkles className="w-4 h-4 animate-pulse text-[#D4AF37]" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#D4AF37]" /> Daily Clinic Tip
            </span>
            <span className="font-serif text-xs font-semibold text-white tracking-tight">
              Oral Health Insights
            </span>
          </div>
        </div>

        {/* Middle Content Ticker Area */}
        <div className="flex-1 min-w-0 max-w-3xl text-left md:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTip.id}
              initial={{ opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -7 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="flex flex-col gap-1.5"
            >
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-teal-500/10 text-teal-300 border border-teal-500/20">
                  {currentTip.category}
                </span>
                <h4 className="font-sans text-xs font-bold text-white tracking-wide truncate">
                  {currentTip.title}
                </h4>
              </div>
              <p className="font-sans text-[11px] sm:text-xs text-gray-350 leading-relaxed text-gray-350">
                <strong className="text-gray-200">Fact:</strong> {currentTip.fact} <br />
                <span className="text-teal-400 font-medium">✨ Dr. Sudheer’s Advice:</span> {currentTip.clinicalAction}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right side Action Buttons */}
        <div className="flex items-center justify-end gap-3 shrink-0 self-end md:self-auto">
          <button
            onClick={handleNextTip}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 transition-all text-[11px] text-gray-400 hover:text-[#D4AF37] cursor-pointer"
            id="btn-rotate-dental-tip"
            title="Browse other clinic health tips"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span className="font-sans font-bold uppercase tracking-wider text-[9px]">
              {isManual ? "Next Insight" : "Explore Tips"}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}
