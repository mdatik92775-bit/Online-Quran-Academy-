import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { 
  BookOpen, 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Send, 
  ShieldCheck, 
  CheckCircle2,
  Heart
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, navigateTo, openWhatsApp } = useAcademy();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#052E20] text-gray-300 border-t border-[#D4AF37]/20 relative overflow-hidden">
      {/* Subtle background motif */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-emerald-800/60">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0D7A4D] text-white flex items-center justify-center shadow-md border border-[#D4AF37]/40">
                <BookOpen className="w-5 h-5 text-[#FAF8F2]" />
              </div>
              <span className="text-xl font-bold font-display text-white tracking-tight">
                {settings.brandName}
              </span>
            </div>

            <p className="text-sm text-emerald-100/70 leading-relaxed max-w-sm">
              An international online Quran learning institute dedicated to delivering authentic, Tajweed-certified one-to-one Quran education for children, sisters, and brothers from the comfort of home.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2.5 text-emerald-200">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>Primary Contact: <strong>{settings.phone}</strong></span>
              </div>
              <div className="flex items-center gap-2.5 text-emerald-200">
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp: <strong>{settings.whatsapp}</strong></span>
              </div>
              <div className="flex items-center gap-2.5 text-emerald-200">
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                <span>{settings.email}</span>
              </div>
              <div className="flex items-start gap-2.5 text-emerald-200">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-900/60 hover:bg-[#0D7A4D] flex items-center justify-center text-white transition-colors text-xs font-bold"
                aria-label="Facebook"
              >
                Fb
              </a>
              <a
                href={settings.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-900/60 hover:bg-[#0D7A4D] flex items-center justify-center text-white transition-colors text-xs font-bold"
                aria-label="Instagram"
              >
                Ig
              </a>
              <a
                href={settings.socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-900/60 hover:bg-[#0D7A4D] flex items-center justify-center text-white transition-colors text-xs font-bold"
                aria-label="YouTube"
              >
                Yt
              </a>
              <a
                href={settings.socialLinks.tiktok}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-900/60 hover:bg-[#0D7A4D] flex items-center justify-center text-white transition-colors text-xs font-bold"
                aria-label="TikTok"
              >
                Tk
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('how-it-works')} className="hover:text-white transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('why-choose-us')} className="hover:text-white transition-colors">
                  Why Choose Us
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('teachers')} className="hover:text-white transition-colors">
                  Our Teachers
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('pricing')} className="hover:text-white transition-colors">
                  Pricing & Plans
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('free-trial')} className="hover:text-white transition-colors text-[#D4AF37] font-semibold">
                  Book Free Trial
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('registration')} className="hover:text-white transition-colors">
                  Full Registration
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="hover:text-[#D4AF37] transition-colors flex items-center gap-1 font-semibold text-emerald-300">
                  <span>এডমিন প্যানেল (Admin Panel)</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('google-drive')} className="hover:text-[#D4AF37] transition-colors flex items-center gap-1 font-semibold text-amber-300">
                  <span>গুগল ড্রাইভ লাইব্রেরি (Google Drive)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Courses Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Featured Courses
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navigateTo('noorani-qaida')} className="hover:text-white transition-colors">
                  Noorani Qaida Course
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('quran-reading')} className="hover:text-white transition-colors">
                  Quran Reading (Nazra)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('tajweed')} className="hover:text-white transition-colors">
                  Quran with Tajweed
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('hifz')} className="hover:text-white transition-colors">
                  Hifz Memorization
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('translation')} className="hover:text-white transition-colors">
                  Quran Translation
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('kids-classes')} className="hover:text-white transition-colors">
                  Kids Quran Classes
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('islamic-studies')} className="hover:text-white transition-colors">
                  Islamic Studies
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter & WhatsApp CTA */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Weekly Quran Insights
            </h4>
            <p className="text-xs text-emerald-100/70">
              Subscribe for inspiring tajweed tips, daily du'a breakdowns, and academy announcements.
            </p>

            {isSubscribed ? (
              <div className="p-3 bg-emerald-900/50 rounded-xl border border-emerald-600 text-xs text-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>JazakAllah Khair! You are now subscribed.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-lg bg-emerald-950/80 border border-emerald-800 text-white placeholder-emerald-400/50 focus:outline-hidden focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 px-3 rounded-lg text-xs font-bold text-gray-950 bg-[#D4AF37] hover:bg-[#e0be47] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe Newsletter</span>
                </button>
              </form>
            )}

            <button
              onClick={() => openWhatsApp()}
              className="w-full py-2.5 px-3 rounded-lg text-xs font-bold text-white bg-[#0D7A4D] hover:bg-[#0b6640] border border-emerald-600 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp: 01746349167</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/60">
          <p>© {currentYear} {settings.brandName}. All Rights Reserved.</p>

          <div className="flex flex-wrap items-center gap-4">
            <button onClick={() => navigateTo('privacy-policy')} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => navigateTo('terms-conditions')} className="hover:text-white transition-colors">
              Terms & Conditions
            </button>
            <span>•</span>
            <button onClick={() => navigateTo('refund-policy')} className="hover:text-white transition-colors">
              Refund Policy
            </button>
            <span>•</span>
            <button onClick={() => navigateTo('admin')} className="hover:text-white transition-colors font-bold text-[#D4AF37]">
              এডমিন লগইন (aradmin)
            </button>
            <span>•</span>
            <button onClick={() => navigateTo('auth')} className="hover:text-white transition-colors font-medium text-emerald-300">
              Staff & Student Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
