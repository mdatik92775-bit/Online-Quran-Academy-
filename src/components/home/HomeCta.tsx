import React from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { Sparkles, MessageCircle, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export const HomeCta: React.FC = () => {
  const { openTrialModal, openWhatsApp, settings } = useAcademy();

  return (
    <section className="py-20 bg-gradient-to-r from-[#064E3B] via-[#053D2E] to-[#064E3B] text-white relative overflow-hidden">
      {/* Decorative background Islamic geometry dots */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#D4AF37_1.5px,transparent_1.5px)] [background-size:28px_28px]"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#D4AF37]/30 text-[#FAF8F2] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Surah Al-Muzzammil (73:4)</span>
        </div>

        <div className="space-y-2">
          <p className="font-arabic text-2xl sm:text-3xl text-[#FBF4DD] tracking-wide">
            وَرَتِّلِ ٱلْقُرْءَانَ تَرْتِيلًا
          </p>
          <p className="text-xs sm:text-sm text-emerald-200/80 italic">
            "And recite the Quran with measured recitation."
          </p>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight leading-tight max-w-3xl mx-auto">
          Start Your Family's Quran Learning Journey Today
        </h2>

        <p className="text-sm sm:text-base text-emerald-100/80 max-w-2xl mx-auto leading-relaxed">
          Book your 3-day complimentary trial with certified tutors. Experience personalized one-to-one recitation with zero commitment.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => openTrialModal()}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm sm:text-base text-gray-950 bg-[#D4AF37] hover:bg-[#e0be47] shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#064E3B]" />
            <span>Book Your Free 3-Day Trial</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => openWhatsApp()}
            className="w-full sm:w-auto px-6 py-4 rounded-xl font-bold text-sm sm:text-base text-white bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/60 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
            <span>WhatsApp: {settings.phone}</span>
          </button>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-emerald-200/70">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            100% Free Trial
          </span>
          <span>•</span>
          <span>No Credit Card Needed</span>
          <span>•</span>
          <span>Male & Female Tutors Available</span>
        </div>
      </div>
    </section>
  );
};
