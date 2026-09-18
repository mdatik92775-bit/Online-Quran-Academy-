import React from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { Sparkles, MessageCircle, ArrowRight, ShieldCheck, CheckCircle, HeartHandshake } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { settings, openTrialModal, openWhatsApp, navigateTo } = useAcademy();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F2] via-white to-[#FAF8F2] pt-12 pb-20 lg:pt-16 lg:pb-28">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#064E3B_1px,transparent_1px)] [background-size:28px_28px]"></div>

      {/* Glow decorative blobs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#0D7A4D]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy and CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Islamic Greeting Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#064E3B]/10 border border-[#064E3B]/20 text-[#064E3B] text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-arabic text-sm">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</span>
              <span className="hidden sm:inline">• {settings.hero.badge || "Online Quran Academy"}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-[#064E3B] tracking-tight leading-[1.15]">
              Learn Quran Online From{' '}
              <span className="relative inline-block text-[#0D7A4D]">
                Qualified Teachers
                <svg className="absolute -bottom-2 left-0 w-full h-2.5 text-[#D4AF37]/50" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,15 Q50,0 100,15" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-gray-700 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {settings.hero.subtitle}
            </p>

            {/* CTA Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={() => openTrialModal()}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-[#064E3B] via-[#0D7A4D] to-[#064E3B] hover:from-[#053c2d] hover:to-[#085233] shadow-lg shadow-[#064E3B]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>{settings.hero.primaryCtaText || "Book Free Trial"}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => navigateTo('courses')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-[#064E3B] bg-white hover:bg-gray-50 border border-[#064E3B]/25 shadow-xs transition-colors flex items-center justify-center cursor-pointer"
              >
                {settings.hero.secondaryCtaText || "Explore Courses"}
              </button>

              <button
                onClick={() => openWhatsApp()}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-semibold text-sm text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                title="WhatsApp 01746349167"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                <span>{settings.hero.whatsappCtaText || "Chat on WhatsApp"}</span>
              </button>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-6 border-t border-gray-200/80">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Why Thousands of Families Trust Us:
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2">
                {settings.hero.trustBadges.map((badge, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-800">
                    <CheckCircle className="w-4 h-4 text-[#0D7A4D] shrink-0" />
                    <span>{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Glow & Border Frame */}
              <div className="relative rounded-3xl p-3 bg-gradient-to-br from-[#064E3B] via-[#0D7A4D] to-[#D4AF37]/40 shadow-2xl">
                <div className="relative rounded-2xl overflow-hidden bg-white shadow-inner aspect-4/3 sm:aspect-5/4">
                  <img
                    src={settings.hero.imageUrl}
                    alt="Online Quran Academy - Learn Quran Online"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                  />
                  
                  {/* Subtle Quranic Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent flex flex-col justify-end p-6 text-white">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#064E3B]/90 backdrop-blur-xs text-[#FAF8F2] text-xs font-semibold w-max border border-[#D4AF37]/50 mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Live 1-on-1 Interactive Classes</span>
                    </div>
                    <h3 className="text-lg font-bold font-display">
                      Authentic Tajweed & Hifz From Home
                    </h3>
                    <p className="text-xs text-emerald-100 mt-1">
                      Male & Female Certified Teachers with Ijazah
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Floating Stat Badge 1 */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white rounded-2xl p-3.5 shadow-xl border border-gray-100 flex items-center gap-3 animate-in fade-in slide-in-from-bottom duration-300">
                <div className="w-11 h-11 rounded-xl bg-emerald-100 text-[#064E3B] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-[#064E3B]" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-gray-900">3-Day Free Trial</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">100% Free</span>
                  </div>
                  <p className="text-xs text-gray-500">Zero upfront payment</p>
                </div>
              </div>

              {/* Floating Floating Stat Badge 2 */}
              <div className="hidden sm:flex absolute -top-4 -right-4 bg-white rounded-2xl p-3.5 shadow-xl border border-gray-100 items-center gap-3 animate-in fade-in slide-in-from-top duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#FBF4DD] text-[#D4AF37] flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5 text-[#064E3B]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">1-on-1 Dedicated Tutors</p>
                  <p className="text-[11px] text-gray-500">Tailored to each student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
