import React, { useState, useEffect } from 'react';
import { Calendar, User, Phone, Mail, FileText, Clock, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { CLINIC_SERVICES } from '../data';
import { Appointment } from '../types';

interface BookingSectionProps {
  onSuccessClose?: () => void;
}

export default function BookingSection({ onSuccessClose }: BookingSectionProps) {
  // Form State
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [treatmentRequired, setTreatmentRequired] = useState('');
  const [message, setMessage] = useState('');

  // UI Error/Success Feedback
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [newlyCreatedAppointment, setNewlyCreatedAppointment] = useState<Appointment | null>(null);

  // Set default minimum date to today so patients don't book past dates
  const [minDateString, setMinDateString] = useState('');

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setMinDateString(`${yyyy}-${mm}-${dd}`);
  }, []);

  const validateForm = () => {
    const tempErrors: { [key: string]: string } = {};
    
    if (!fullName.trim()) {
      tempErrors.fullName = 'Full Name is required';
    } else if (fullName.trim().length < 3) {
      tempErrors.fullName = 'Name must be at least 3 characters long';
    }

    if (!phoneNumber.trim()) {
      tempErrors.phoneNumber = 'Phone number is required';
    } else {
      const phoneClean = phoneNumber.replace(/[^0-9]/g, '');
      if (phoneClean.length < 10) {
        tempErrors.phoneNumber = 'Please enter a valid 10-digit Indian phone number';
      }
    }

    if (!email.trim()) {
      tempErrors.email = 'Email address is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        tempErrors.email = 'Please enter a valid email address';
      }
    }

    if (!preferredDate) {
      tempErrors.preferredDate = 'Please select your preferred date';
    } else {
      const selected = new Date(preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        tempErrors.preferredDate = 'Preferred date cannot be in the past';
      }
    }

    if (!preferredTime) {
      tempErrors.preferredTime = 'Please select your preferred arrival time slot';
    }

    if (!treatmentRequired) {
      tempErrors.treatmentRequired = 'Please select desired dental treatment';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Build the structural appointment body
    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      email: email.trim().toLowerCase(),
      preferredDate,
      preferredTime,
      treatmentRequired,
      message: message.trim(),
      status: 'Pending',
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    };

    // Storing offline onto Client-side localStorage for sync logic
    const existingAptsRaw = localStorage.getItem('mark_clinic_appointments');
    const existingApts: Appointment[] = existingAptsRaw ? JSON.parse(existingAptsRaw) : [];
    existingApts.unshift(newAppointment);
    localStorage.setItem('mark_clinic_appointments', JSON.stringify(existingApts));

    // Save newly created state for success visualization
    setNewlyCreatedAppointment(newAppointment);
    setIsSuccess(true);
  };

  const resetFormState = () => {
    setFullName('');
    setPhoneNumber('');
    setEmail('');
    setPreferredDate('');
    setPreferredTime('');
    setTreatmentRequired('');
    setMessage('');
    setErrors({});
    setIsSuccess(false);
    setNewlyCreatedAppointment(null);
    if (onSuccessClose) {
      onSuccessClose();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#0d1522] rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-in fade-in duration-200 text-white font-sans">
      
      {/* Visual top banner */}
      <div className="bg-gradient-to-r from-teal-500/10 to-[#D4AF37]/10 p-6 md:p-8 text-white text-center relative border-b border-white/5">
        <div className="absolute top-0 right-0 w-32 h-full bg-white/[0.01] skew-x-12 transform pointer-events-none" />
        <h3 className="font-serif font-light text-2xl md:text-3xl text-white tracking-tight">Schedule Your Visit</h3>
        <p className="font-sans text-gray-400 text-xs md:text-sm mt-1 max-w-md mx-auto leading-relaxed">
          Fill out this secure booking form. Our coordinator will contact you via Phone call within 30 minutes to confirm your slot.
        </p>
      </div>

      <div className="p-6 md:p-8 bg-[#0d1522]">
        
        {!isSuccess ? (
          <form onSubmit={handleBookingSubmit} className="flex flex-col gap-5">
            
            {/* Form Fields: Grid row for Name & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="font-sans font-bold text-teal-400 text-[10px] uppercase tracking-widest flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-teal-400" /> Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className={`w-full font-sans text-sm py-2.5 px-3.5 bg-white/[0.02] border rounded-xl outline-none text-white focus:bg-[#0a0f18] focus:ring-1 transition-all ${
                      errors.fullName 
                        ? 'border-rose-500/60 focus:ring-rose-500/20 focus:border-rose-500' 
                        : 'border-white/10 focus:ring-teal-500 focus:border-teal-500'
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <span className="font-sans text-[10px] sm:text-xs text-rose-300 flex items-center gap-1.5 mt-0.5">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
                  </span>
                )}
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-1.5">
                <label className="font-sans font-bold text-teal-400 text-[10px] uppercase tracking-widest flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-teal-400" /> Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="e.g. +91 9937866280"
                  className={`w-full font-sans text-sm py-2.5 px-3.5 bg-white/[0.02] border rounded-xl outline-none text-white focus:bg-[#0a0f18] focus:ring-1 transition-all ${
                    errors.phoneNumber 
                      ? 'border-rose-500/60 focus:ring-rose-500/20 focus:border-rose-500' 
                      : 'border-white/10 focus:ring-teal-500 focus:border-teal-500'
                  }`}
                />
                {errors.phoneNumber && (
                  <span className="font-sans text-[10px] sm:text-xs text-rose-300 flex items-center gap-1.5 mt-0.5">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.phoneNumber}
                  </span>
                )}
              </div>
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-1.5">
              <label className="font-sans font-bold text-teal-400 text-[10px] uppercase tracking-widest flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-teal-400" /> Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. patientsmile@gmail.com"
                className={`w-full font-sans text-sm py-2.5 px-3.5 bg-white/[0.02] border rounded-xl outline-none text-white focus:bg-[#0a0f18] focus:ring-1 transition-all ${
                  errors.email 
                    ? 'border-rose-500/60 focus:ring-rose-500/20 focus:border-rose-500' 
                    : 'border-white/10 focus:ring-teal-500 focus:border-teal-500'
                }`}
              />
              {errors.email && (
                <span className="font-sans text-[10px] sm:text-xs text-rose-300 flex items-center gap-1.5 mt-0.5">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                </span>
              )}
            </div>

            {/* Form Fields: Grid row for Treatment & Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Treatment Required */}
              <div className="flex flex-col gap-1.5">
                <label className="font-sans font-bold text-teal-400 text-[10px] uppercase tracking-widest flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-teal-400" /> Treatment Required <span className="text-rose-500">*</span>
                </label>
                <select
                  value={treatmentRequired}
                  onChange={(e) => setTreatmentRequired(e.target.value)}
                  className={`w-full font-sans text-sm py-2.5 px-3 bg-white/[0.02] border rounded-xl outline-none text-white focus:bg-[#0a0f18] focus:ring-1 transition-all cursor-pointer ${
                    errors.treatmentRequired 
                      ? 'border-rose-500/60 focus:ring-teal-500' 
                      : 'border-white/10 focus:ring-teal-500'
                  }`}
                >
                  <option value="" disabled className="bg-[#0a0f18] text-white">-- Choose Service --</option>
                  {CLINIC_SERVICES.map((serv) => (
                    <option key={serv.id} value={serv.name} className="bg-[#0a0f18] text-white">{serv.name}</option>
                  ))}
                  <option value="General Checkup" className="bg-[#0a0f18] text-white">Routine checkup & consult</option>
                  <option value="Emergency Relief" className="bg-[#0a0f18] text-white">Emergency Pain Relief</option>
                </select>
                {errors.treatmentRequired && (
                  <span className="font-sans text-[10px] sm:text-xs text-rose-300 flex items-center gap-1.5 mt-0.5">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.treatmentRequired}
                  </span>
                )}
              </div>

              {/* Prep Date Selection */}
              <div className="flex flex-col gap-1.5">
                <label className="font-sans font-bold text-teal-400 text-[10px] uppercase tracking-widest flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-teal-400" /> Preferred Date <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  min={minDateString}
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className={`w-full font-sans text-sm py-2.5 px-3 bg-white/[0.02] border rounded-xl outline-none text-white focus:bg-[#0a0f18] focus:ring-1 transition-all cursor-pointer ${
                    errors.preferredDate 
                      ? 'border-rose-500/60 focus:ring-teal-500' 
                      : 'border-white/10 focus:ring-teal-500'
                  }`}
                />
                {errors.preferredDate && (
                  <span className="font-sans text-[10px] sm:text-xs text-rose-300 flex items-center gap-1.5 mt-0.5">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.preferredDate}
                  </span>
                )}
              </div>
            </div>

            {/* Timings Selector Hour */}
            <div className="flex flex-col gap-1.5">
              <label className="font-sans font-bold text-teal-400 text-[10px] uppercase tracking-widest flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-teal-400" /> Preferred Timing Slot <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  'Morning (9 AM - 12 PM)',
                  'Midday (12 PM - 3 PM)',
                  'Evening (3 PM - 6 PM)',
                  'Late Evening (6 PM - 8 PM)',
                ].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => {
                      setPreferredTime(slot);
                    }}
                    className={`font-sans py-2 px-3 border rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      preferredTime === slot 
                        ? 'bg-teal-500 text-black border-transparent shadow-lg shadow-teal-500/10' 
                        : 'bg-[#0a0f18] text-gray-400 border-white/5 hover:border-white/10 hover:text-white'
                    }`}
                  >
                    {slot.split(' ')[0]}
                    <span className="block text-[10px] font-normal opacity-80 mt-0.5">
                      {slot.substring(slot.indexOf('('))}
                    </span>
                  </button>
                ))}
              </div>
              {errors.preferredTime && (
                <span className="font-sans text-[10px] sm:text-xs text-rose-300 flex items-center gap-1.5 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.preferredTime}
                </span>
              )}
            </div>

            {/* Optional Doctor message */}
            <div className="flex flex-col gap-1.5">
              <label className="font-sans font-bold text-teal-400 text-[10px] uppercase tracking-widest flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-teal-400" /> Medical Notes / Message <span className="text-gray-500 font-normal select-none">(Optional)</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="Mention any dental concerns, history, or request parameters..."
                className="w-full font-sans text-sm py-2.5 px-3.5 bg-white/[0.02] border border-white/10 rounded-xl outline-none text-white focus:bg-[#0a0f18] focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all resize-none"
              />
            </div>

            {/* Form submit button */}
            <button
              type="submit"
              className="mt-2 w-full bg-teal-500 hover:bg-teal-400 text-[#000] font-sans text-center font-bold py-3.5 px-4 outline-none rounded-xl shadow-lg shadow-teal-500/10 cursor-pointer transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest"
            >
              <Calendar className="w-4 h-4" />
              <span>Request Appointment Slot</span>
            </button>

          </form>
        ) : (
          /* Animated success overlay notification */
          <div className="p-4 py-8 text-center flex flex-col items-center gap-5 animate-in zoom-in-95 duration-150">
            <div className="w-16 h-16 bg-teal-500/10 text-teal-400 rounded-full flex items-center justify-center border-4 border-teal-500/25">
              <CheckCircle2 className="w-10 h-10 fill-none text-teal-400" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1 bg-[#0a0f18] text-teal-400 text-[10px] font-bold px-2 py-0.5 rounded border border-teal-400/20 uppercase tracking-widest mb-2">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Booking Recorded
              </div>
              
              <h4 className="font-serif text-[#D4AF37] text-2xl tracking-tight leading-snug font-light">Appointment Request Received!</h4>
              
              <p className="font-sans text-gray-400 text-sm leading-relaxed max-w-md mx-auto mt-2 text-pretty">
                Thank you, <strong>{newlyCreatedAppointment?.fullName}</strong>. We have temporarily registered your slot for <strong>{newlyCreatedAppointment?.preferredDate}</strong> during the <strong>{newlyCreatedAppointment?.preferredTime}</strong> window.
              </p>
            </div>

            <div className="bg-[#0a0f18]/80 p-4 rounded-2xl border border-white/5 w-full text-left font-sans text-xs flex flex-col gap-2 shadow-2xl">
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-gray-500">Record ID:</span>
                <span className="font-mono text-white font-bold">{newlyCreatedAppointment?.id}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-gray-500">Treatment Requested:</span>
                <span className="text-[#D4AF37] font-semibold">{newlyCreatedAppointment?.treatmentRequired}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Coordination Contact:</span>
                <span className="text-white font-semibold">{newlyCreatedAppointment?.phoneNumber}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 w-full mt-2">
              <button
                onClick={resetFormState}
                className="w-full bg-[#0a0f18] hover:bg-white/5 border border-white/10 text-white font-sans text-xs font-bold py-3 px-4 rounded-xl shadow transition-colors cursor-pointer uppercase tracking-widest"
              >
                Close Notification
              </button>
              
              <p className="text-[10px] text-gray-500 font-sans">
                You can review or cancel your saved submissions anytime inside the <strong>Staff Portal Dashboard</strong> log.
              </p>
            </div>
          </div>
        )}

      </div>
      
    </div>
  );
}
