import React from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { CalendarCheck, UserCheck, Video, Award, ArrowRight, Sparkles } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const { openTrialModal, navigateTo } = useAcademy();

  const steps = [
    {
      step: "01",
      title: "Book Free Trial",
      desc: "Fill in our quick form or message us directly on WhatsApp. No credit card or upfront fee required.",
      icon: CalendarCheck
    },
    {
      step: "02",
      title: "Choose Course & Teacher",
      desc: "Get paired with a certified male or female instructor tailored to your age, language, and preferred time slot.",
      icon: UserCheck
    },
    {
      step: "03",
      title: "Attend Online Classes",
      desc: "Join high-definition 1-on-1 sessions via Zoom or Google Meet with screen sharing and digital Qaida / Mus'haf.",
      icon: Video
    },
    {
      step: "04",
      title: "Track Your Progress",
      desc: "Access session remarks, homework worksheets, attendance records, and earn verified academy certificates.",
      icon: Award
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#FAF8F2] via-white to-[#FAF8F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0D7A4D] bg-[#064E3B]/5 px-3.5 py-1.5 rounded-full">
            Simple 4-Step Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#064E3B] tracking-tight">
            How Online Quran Learning Works
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Getting started is effortless. You can begin your first live session within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative bg-white rounded-2xl p-6 shadow-xs hover:shadow-xl transition-all duration-300 border border-gray-200/80 flex flex-col justify-between group"
              >
                {/* Step Marker Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#064E3B] to-[#0D7A4D] text-white flex items-center justify-center shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <span className="text-2xl font-black font-display text-gray-300 group-hover:text-[#0D7A4D] transition-colors">
                    {item.step}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-[#064E3B] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center text-xs font-bold text-[#0D7A4D]">
                  <span>Step {idx + 1} of 4</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => openTrialModal()}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#064E3B] to-[#0D7A4D] hover:from-[#053d2e] hover:to-[#085233] shadow-md transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Book Your Free Trial Today</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
