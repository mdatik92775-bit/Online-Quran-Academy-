import React from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { 
  Award, 
  Users, 
  Clock, 
  Smile, 
  HeartHandshake, 
  Home, 
  Target, 
  BadgePercent, 
  TrendingUp, 
  ShieldCheck,
  CheckCircle
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const { navigateTo, openTrialModal } = useAcademy();

  const features = [
    {
      title: "Qualified Quran Teachers",
      desc: "Huffaz & Qaris with verified Ijazah and pedagogical training from renowned Islamic institutions.",
      icon: Award
    },
    {
      title: "One-to-One Private Classes",
      desc: "100% focused attention dedicated solely to your child's recitation speed and vocal correction.",
      icon: Users
    },
    {
      title: "Flexible 24/7 Timings",
      desc: "Learn according to your timezone and family schedule with hassle-free makeup session policies.",
      icon: Clock
    },
    {
      title: "Kids Friendly Teaching",
      desc: "Patient, gentle instructors using visual whiteboard slides, badges, and positive encouragement.",
      icon: Smile
    },
    {
      title: "Male & Female Instructors",
      desc: "Choice of qualified female teachers (Ustadhas) for sisters and children, and male teachers.",
      icon: HeartHandshake
    },
    {
      title: "Learn From Home Comfort",
      desc: "Save commute time and ensure safety by attending live classes directly from your living room.",
      icon: Home
    },
    {
      title: "Personalized Learning Pace",
      desc: "Custom syllabus tailored to each student's baseline, whether learning slow or fast-tracking Hifz.",
      icon: Target
    },
    {
      title: "Affordable & Fair Fees",
      desc: "Transparent multi-currency pricing plans with family discounts and no hidden enrollment charges.",
      icon: BadgePercent
    },
    {
      title: "Real-time Progress Monitoring",
      desc: "Regular monthly report cards, attendance records, and parent-teacher consultations.",
      icon: TrendingUp
    },
    {
      title: "Safe Learning Environment",
      desc: "Strict adherence to Islamic adab, supervisor-monitored rooms, and respectful conduct.",
      icon: ShieldCheck
    }
  ];

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0D7A4D] bg-[#064E3B]/5 px-3.5 py-1.5 rounded-full">
            Our Distinction
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#064E3B] tracking-tight">
            Why Choose Online Quran Academy?
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Engineered from the ground up to provide world-class Islamic education with modern pedagogical tools.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-gray-50/70 border border-gray-200/70 hover:bg-white hover:border-[#0D7A4D]/30 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#064E3B]/10 text-[#064E3B] group-hover:bg-[#064E3B] group-hover:text-white flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#064E3B] transition-colors leading-snug">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#064E3B] to-[#0D7A4D] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold font-display">Experience The Difference Firsthand</h4>
            <p className="text-xs text-emerald-100">Claim your 3-day full access free trial with zero financial commitment.</p>
          </div>
          <button
            onClick={() => openTrialModal()}
            className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-gray-950 bg-[#D4AF37] hover:bg-[#e6c148] transition-colors shadow-md shrink-0 cursor-pointer"
          >
            Start 3-Day Free Trial
          </button>
        </div>
      </div>
    </section>
  );
};
