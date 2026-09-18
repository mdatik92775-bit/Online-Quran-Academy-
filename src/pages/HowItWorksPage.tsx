import React from 'react';
import { useAcademy } from '../context/AcademyContext';
import { 
  CalendarCheck, 
  UserCheck, 
  Video, 
  Award, 
  Monitor, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  Smartphone,
  Laptop
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { openTrialModal, openWhatsApp, settings } = useAcademy();

  const detailedSteps = [
    {
      num: "01",
      title: "Step 1: Reserve Your 3-Day Free Trial",
      subtitle: "Simple 60-second sign-up with no credit card required",
      desc: "Complete our quick trial request form or send a WhatsApp message to 01746349167. Specify your student's age, current Quran level (from complete beginner to Tajweed revision), and your family's preferred days and time slots in your local timezone.",
      icon: CalendarCheck
    },
    {
      num: "02",
      title: "Step 2: Free Academic Assessment & Teacher Matching",
      subtitle: "Matched according to student personality, language, and gender",
      desc: "Our academic coordinator reviews your details and assigns an experienced male or female Quran tutor. We match young children with gentle, energetic tutors and adult sisters with certified female Ustadhas. You receive your trial schedule and meeting link directly on WhatsApp.",
      icon: UserCheck
    },
    {
      num: "03",
      title: "Step 3: Attend Interactive One-to-One Online Classes",
      subtitle: "HD video and audio using Zoom or Google Meet",
      desc: "Join your private classroom from any computer, tablet, or smartphone. The teacher shares high-resolution digital Quran pages and interactive Noorani Qaida slides, highlighting Arabic letters and demonstrating correct vocal articulation points (Makharij) in real time.",
      icon: Video
    },
    {
      num: "04",
      title: "Step 4: Receive Evaluation & Choose Your Permanent Schedule",
      subtitle: "Continuous tracking and monthly progress report cards",
      desc: "After your 3 complimentary sessions, your teacher provides a personalized evaluation and curriculum roadmap. If you are 100% satisfied, simply choose your monthly plan to begin your permanent Quran learning journey. Otherwise, there is zero obligation.",
      icon: Award
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F2] pb-24">
      {/* Banner */}
      <section className="bg-gradient-to-r from-[#064E3B] via-[#053D2E] to-[#064E3B] text-white py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-white/10 px-4 py-1.5 rounded-full inline-block">
            Seamless Experience
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white">
            How Online Quran Learning Works
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Discover how easy it is to learn the Holy Quran from home with certified tutors and modern digital classroom tools.
          </p>
        </div>
      </section>

      {/* Main Steps */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 space-y-8">
        {detailedSteps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 sm:p-10 shadow-xs border border-gray-200/80 flex flex-col sm:flex-row gap-8 items-start relative group hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#064E3B] to-[#0D7A4D] text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-900/10">
                <Icon className="w-8 h-8 text-[#D4AF37]" />
              </div>

              <div className="space-y-3 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#0D7A4D] tracking-widest uppercase">
                    {s.title}
                  </span>
                  <span className="text-3xl font-black text-gray-200 font-display">
                    {s.num}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-display text-gray-900 leading-snug">
                  {s.subtitle}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          );
        })}

        {/* Technical Requirements Card */}
        <div className="bg-white rounded-3xl p-8 shadow-xs border border-gray-200/80 space-y-6">
          <div className="flex items-center gap-3">
            <Monitor className="w-6 h-6 text-[#064E3B]" />
            <h3 className="text-xl font-bold font-display text-gray-900">
              What Equipment Do You Need to Start?
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-700">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1.5">
              <Laptop className="w-5 h-5 text-[#064E3B]" />
              <p className="font-bold text-gray-900">Any Device</p>
              <p>Laptop, Desktop PC, iPad, Android Tablet, or Smartphone with a stable internet connection.</p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1.5">
              <Video className="w-5 h-5 text-[#064E3B]" />
              <p className="font-bold text-gray-900">Free Video Software</p>
              <p>Zoom or Google Meet (no paid license needed on your end, we provide the room links).</p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1.5">
              <ShieldCheck className="w-5 h-5 text-[#064E3B]" />
              <p className="font-bold text-gray-900">Headset & Microphone</p>
              <p>Standard headphones or earphones with a microphone for crystal-clear audio pronunciation.</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-6">
          <button
            onClick={() => openTrialModal()}
            className="px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#064E3B] to-[#0D7A4D] hover:from-[#053c2d] hover:to-[#085233] shadow-lg inline-flex items-center gap-2 cursor-pointer transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Book Your Free 3-Day Trial Today</span>
          </button>
        </div>
      </div>
    </div>
  );
};
