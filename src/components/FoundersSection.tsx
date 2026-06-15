import React from 'react';
import { motion } from 'motion/react';
import { Award, GraduationCap, Heart, Sparkles, Mail, Linkedin, Stethoscope, ShieldCheck } from 'lucide-react';

interface Founder {
  name: string;
  role: string;
  credentials: string;
  specialties: string[];
  bio: string;
  image: string;
  linkedin: string;
  email: string;
  experience: string;
}

const FOUNDERS_DATA: Founder[] = [
  {
    name: 'Dr. Sudheer Krishna',
    role: 'Co-Founder & Chief Implantologist',
    credentials: 'BDS, MDS (Prosthodontics and Crown & Bridge)',
    specialties: ['Digital Smile Design', 'Full-Mouth Dental Implants', 'Oral Prosthetics'],
    bio: 'Dr. Sudheer Krishna is a pioneering prosthodontist recognized for his microscopic precision in restoring complex oral structures. With over a decade of specialty training, he specializes in full-mouth dental implants and seamless aesthetic reconstructions, ensuring each dental work is durable, comforting, and visually perfect.',
    image: '/src/assets/images/dr_sudheer_krishna_1781487897889.jpg',
    linkedin: 'https://linkedin.com/in/dr-sudheer-krishna',
    email: 'sudheer.krishna19.11@gmail.com',
    experience: '12+ Years Experience'
  },
  {
    name: 'Dr. Abhrasweta Baruah',
    role: 'Co-Founder & Chief Endodontist',
    credentials: 'BDS, MDS (Conservative Dentistry & Endodontics)',
    specialties: ['Single-Visit Root Canals', 'Microscopic Endodontics', 'Pediatric Dentistry'],
    bio: 'Dr. Abhrasweta Baruah is highly regarded for her advanced, pain-free approach to protective pulp therapy and micro-endodontics. Her clinical passion is erasing dental-chair fear through state-of-the-art diagnostic scans, empathetic patient care, and zero-anxiety procedures optimized for kids and adults alike.',
    image: '/src/assets/images/dr_abhrasweta_baruah_1781486357034.jpg',
    linkedin: 'https://linkedin.com/in/dr-abhrasweta-baruah',
    email: 'abhrasweta.baruah@marksdental.com',
    experience: '10+ Years Experience'
  }
];

export default function FoundersSection() {
  return (
    <section className="w-full bg-[#0a0f18] py-16 md:py-24 px-4 relative overflow-hidden font-sans border-t border-white/5" id="founders-section">
      {/* Decorative background glow accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 flex flex-col items-center gap-3">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#0d1522] text-[#D4AF37] text-[10px] sm:text-xs font-bold px-4 py-1.5 rounded-full border border-white/5 uppercase tracking-widest mb-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" /> Clinical Directors & Visionaries
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif font-light text-3xl sm:text-4xl md:text-5xl text-white tracking-tight text-center leading-tight"
          >
            Meet Our <span className="text-[#D4AF37]">Founding Doctors</span>
          </motion.h2>
          
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-0.5 w-16 bg-teal-400 rounded-full my-1 origin-center"
          />
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-gray-400 text-sm sm:text-base leading-relaxed text-pretty text-center mt-2 max-w-2xl px-2"
          >
            Driving clinical perfection with certified post-graduate specialty degrees, premium diagnostics, and a shared dedication to pain-free dental healthcare.
          </motion.p>
        </div>

        {/* Founders Cards Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 max-w-6xl mx-auto">
          {FOUNDERS_DATA.map((founder, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2, type: 'spring', damping: 20 }}
              whileHover={{ y: -6 }}
              className="bg-[#0d1522]/60 rounded-3xl border border-white/5 hover:border-teal-500/20 shadow-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 md:gap-8 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Corner decorative stamp overlay */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Left Column: Image with placeholders & Experience Ribbon */}
              <div className="flex flex-col items-center shrink-0">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-[#D4AF37]/50 shadow-xl transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent z-10" />
                  
                  {/* High quality fallback style image with Unsplash placeholder */}
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Certified Dentist Icon Label overlay */}
                  <div className="absolute bottom-2 left-2 z-20 flex items-center gap-1.5 bg-[#0a0f18]/90 py-1 px-2 rounded-lg border border-white/10 shadow">
                    <Stethoscope className="w-3 h-3 text-teal-400" />
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-teal-400">Oral specialist</span>
                  </div>
                </div>

                {/* Experience counter widget */}
                <div className="bg-teal-500/10 text-teal-400 text-[10px] font-bold py-1 px-3.5 rounded-full border border-teal-500/20 uppercase tracking-wider mt-3.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {founder.experience}
                </div>
              </div>

              {/* Right Column: Founder Details, Bio & Credentials */}
              <div className="flex flex-col flex-grow justify-between gap-5 text-center md:text-left">
                <div className="flex flex-col gap-3">
                  {/* Name and Certification */}
                  <div>
                    <h3 className="font-serif text-[#D4AF37] text-2xl group-hover:text-white transition-colors duration-200">
                      {founder.name}
                    </h3>
                    <p className="text-teal-400 text-xs sm:text-sm font-semibold tracking-wide uppercase mt-1">
                      {founder.role}
                    </p>
                  </div>

                  {/* Academic Credentials Box */}
                  <div className="flex items-start gap-2.5 bg-white/[0.01] p-3 rounded-xl border border-white/5 group-hover:bg-white/[0.02] transition-colors">
                    <GraduationCap className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                    <div className="text-left">
                      <span className="block text-[10px] text-gray-500 uppercase tracking-widest font-bold">Qualification</span>
                      <span className="text-xs text-gray-300 font-medium">{founder.credentials}</span>
                    </div>
                  </div>

                  {/* Bio copy */}
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed text-left">
                    {founder.bio}
                  </p>
                </div>

                {/* Specialties Tag Pillbox & Contact Social Links */}
                <div className="flex flex-col gap-4 mt-1">
                  <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
                    {founder.specialties.map((spec, specIdx) => (
                      <span
                        key={specIdx}
                        className="bg-white/5 text-gray-300 hover:text-white text-[10px] px-2.5 py-1 rounded-md border border-white/5 transition-all text-xs font-sans"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Contact shortcuts */}
                  <div className="flex items-center justify-center md:justify-start gap-4 pt-3 border-t border-white/5 mt-1">
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-teal-400 transition-colors flex items-center gap-1.5 text-xs hover:scale-102"
                      title="Connect on LinkedIn"
                    >
                      <Linkedin className="w-4 h-4 stroke-[1.5]" />
                      <span className="text-[10px] font-mono tracking-wider uppercase">LinkedIn</span>
                    </a>
                    <a
                      href={`mailto:${founder.email}`}
                      className="text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 text-xs hover:scale-102"
                      title="Send professional email"
                    >
                      <Mail className="w-4 h-4 stroke-[1.5]" />
                      <span className="text-[10px] font-mono tracking-wider uppercase">Email</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Philosophy Callout Stamp */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 md:mt-20 max-w-4xl mx-auto bg-gradient-to-r from-teal-500/5 to-[#D4AF37]/5 p-6 sm:p-8 rounded-2xl border border-white/5 text-center flex flex-col sm:flex-row items-center gap-6 justify-between"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 bg-teal-400/10 rounded-xl flex items-center justify-center text-teal-400 shrink-0">
              <Award className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <h4 className="font-serif text-[#D4AF37] text-lg">Guaranteed Academic & Specialty Care</h4>
              <p className="font-sans text-xs sm:text-sm text-gray-400 mt-1 leading-relaxed max-w-xl">
                Every doctor at Markz Dental Clinic holds certified Master of Dental Surgery (MDS) credentials in their respective disciplines, ensuring premium diagnostics and hospital-grade precision.
              </p>
            </div>
          </div>
          <a
            href="#booking-section"
            className="bg-[#D4AF37] hover:bg-white text-black font-bold uppercase tracking-wider text-xs py-3 px-6 rounded-xl shadow transition-all duration-200 pointer-events-auto shrink-0 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              const bookingEl = document.getElementById('booking-section');
              if (bookingEl) {
                bookingEl.scrollIntoView({ behavior: 'smooth' });
              } else {
                // If on homepage or elsewhere, seek trigger
                const btn = document.querySelector('[id*="book-button"]');
                if (btn) (btn as HTMLElement).click();
              }
            }}
          >
            Consult with Doctors
          </a>
        </motion.div>

      </div>
    </section>
  );
}
