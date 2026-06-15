import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Smartphone, X, Sparkles, Share2, Plus, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
  prompt(): Promise<void>;
}

export default function InstallPWAPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAlreadyInstalled, setIsAlreadyInstalled] = useState(false);
  const [installStatus, setInstallStatus] = useState<'idle' | 'installing' | 'installed'>('idle');

  useEffect(() => {
    // 1. Detect if already installed (standalone mode)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
      || (window.navigator as any).standalone 
      || document.referrer.includes('android-app://');
    
    if (isStandalone) {
      setIsAlreadyInstalled(true);
      return;
    }

    // 2. LocalStorage guard to prevent bothering users who dismissed the prompt recently
    const dismissedAt = localStorage.getItem('pwa_prompt_dismissed_at');
    const acceptedAt = localStorage.getItem('pwa_prompt_accepted_at');
    
    // If dismissed within the last 7 days or already accepted, don't show automatically
    if (acceptedAt) {
      return;
    }
    
    if (dismissedAt) {
      const timeSinceDismissal = Date.now() - parseInt(dismissedAt, 10);
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      if (timeSinceDismissal < sevenDays) {
        return;
      }
    }

    // 3. Detect iOS to provide specialized instructions
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAppleMobile = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isAppleMobile);

    // 4. Listen to PWA trigger event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      // Store the event so we can trigger it later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 5. Setup the 30-second delay timer before presenting the prompt
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 30000); // 30 seconds

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(timer);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('pwa_prompt_dismissed_at', Date.now().toString());
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      setInstallStatus('installing');
      try {
        await deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the PWA install prompt');
          setInstallStatus('installed');
          localStorage.setItem('pwa_prompt_accepted_at', Date.now().toString());
          setTimeout(() => setIsVisible(false), 3000);
        } else {
          console.log('User dismissed the PWA install prompt');
          setInstallStatus('idle');
        }
      } catch (err) {
        console.error('Error executing PWA installation prompt:', err);
        setInstallStatus('idle');
      }
      setDeferredPrompt(null);
    } else {
      // If no native prompt is found, and not iOS, we can open guidance or alert
      if (!isIOS) {
        alert('To install this applet, click your browser\'s menu icon (three dots) and select "Install Markz Dental Clinic" or "Add to Home screen".');
        setIsVisible(false);
      }
    }
  };

  if (isAlreadyInstalled) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 80, scale: 0.95 }}
          transition={{ type: 'spring', damping: 20, stiffness: 180 }}
          className="fixed bottom-18 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-96 bg-[#0d1522]/95 backdrop-blur-md border border-teal-500/30 rounded-3xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(20,184,166,0.15)] z-45"
          id="pwa-install-banner-prompt"
        >
          {/* Header row */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="p-1 px-2.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-teal-500/10 text-teal-400 border border-teal-500/20">
                PWA Enabled
              </span>
              <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-[#D4AF37]">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Easy Setup
              </span>
            </div>
            
            <button
              onClick={handleDismiss}
              className="p-1.5 hover:bg-white/5 rounded-full transition-colors text-gray-500 hover:text-white cursor-pointer"
              title="Close Prompt"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-teal-400 p-[1px] shrink-0">
              <div className="w-full h-full bg-[#0a0f18] rounded-[15px] flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-[#D4AF37]" />
              </div>
            </div>

            <div className="flex flex-col gap-1 text-left">
              <h4 className="font-serif text-white text-sm sm:text-base tracking-tight font-medium">
                Install <span className="text-[#D4AF37]">Markz Dental</span>
              </h4>
              <p className="font-sans text-[11px] sm:text-xs text-gray-400 leading-relaxed">
                Add our quick clinic portal to your home screen for easy appointment bookings, real-time consultation with Aura, and medical history access.
              </p>
            </div>
          </div>

          <div className="h-px bg-white/5 my-4" />

          {/* Conditional Instructions & Buttons Based on device type */}
          {isIOS ? (
            <div className="flex flex-col gap-3 text-left">
              <div className="bg-white/[0.02] border border-white/5 p-3 rounded-2xl text-[11px] sm:text-xs text-gray-300 flex flex-col gap-2">
                <span className="font-bold text-teal-400 font-sans uppercase tracking-wider text-[9px]">How to install on iOS Safari:</span>
                <div className="flex items-center gap-2 leading-relaxed">
                  <span className="w-5 h-5 bg-teal-500/10 text-teal-300 rounded-full flex items-center justify-center text-[10px] shrink-0 font-bold">1</span>
                  <span>Tap the <strong className="text-white">Share</strong> button in Safari toolbar (<Share2 className="w-3.5 h-3.5 inline text-teal-400" />)</span>
                </div>
                <div className="flex items-center gap-2 leading-relaxed">
                  <span className="w-5 h-5 bg-teal-500/10 text-teal-300 rounded-full flex items-center justify-center text-[10px] shrink-0 font-bold">2</span>
                  <span>Scroll down and select <strong className="text-[#D4AF37]">Add to Home Screen</strong> (<Plus className="w-3.5 h-3.5 inline text-[#D4AF37]" />)</span>
                </div>
              </div>
              
              <button
                onClick={handleDismiss}
                className="w-full bg-[#D4AF37] hover:bg-[#ebd06b] text-black text-xs font-bold font-sans py-2.5 rounded-xl transition-all flex items-center justify-center gap-1"
              >
                <span>Got It!</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleDismiss}
                className="flex-1 bg-white/5 hover:bg-white/10 text-gray-450 hover:text-white px-3 py-2.5 rounded-xl text-xs font-bold font-sans transition-all text-center"
              >
                Maybe Later
              </button>
              
              <button
                onClick={handleInstallClick}
                disabled={installStatus === 'installing'}
                className="flex-1 bg-teal-500 hover:bg-teal-400 text-[#000] px-4 py-2.5 rounded-xl text-xs font-bold font-sans transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-teal-500/10"
              >
                {installStatus === 'installing' ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Installing...</span>
                  </>
                ) : installStatus === 'installed' ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Added!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Install Now</span>
                  </>
                )}
              </button>
            </div>
          )}
          
          <div className="text-center mt-2">
            <span className="text-[9px] font-mono text-gray-500">Takes less than 3 seconds &bull; Runs offline</span>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
