import React from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { Users, GraduationCap, Globe2, BookOpen, Clock, CheckCircle2, Award } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const { settings, navigateTo, openTrialModal } = useAcademy();

  const statsItems = [
    {
      label: "Active Students",
      value: settings.stats.students,
      icon: Users,
      description: "Kids, sisters, and brothers enrolled"
    },
    {
      label: "Qualified Teachers",
      value: settings.stats.teachers,
      icon: GraduationCap,
      description: "Certified Huffaz & Ijazah holders"
    },
    {
      label: "Courses Offered",
      value: settings.stats.courses,
      icon: BookOpen,
      description: "From Qaida to advanced Tajweed"
    },
    {
      label: "Countries Served",
      value: settings.stats.countries,
      icon: Globe2,
      description: "UK, USA, Canada, Australia, BD, etc."
    },
    {
      label: "Years Experience",
      value: settings.stats.yearsExperience,
      icon: Award,
      description: "Proven pedagogical excellence"
    }
  ];

  return (
    <section className="py-16 bg-white border-y border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome & Overview Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-14">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0D7A4D] bg-[#064E3B]/5 px-3 py-1 rounded-full">
              About Our Academy
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#064E3B] tracking-tight">
              Welcome to Online Quran Academy
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              We are an established Islamic learning platform committed to preserving the sacred art of Quran recitation and nurturing spiritual understanding across generations worldwide.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateTo('about')}
                className="text-xs font-bold text-[#064E3B] hover:text-[#0D7A4D] underline underline-offset-4 cursor-pointer"
              >
                Read our full mission and methodology →
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Personalized 1-on-1 classes for kids & adults",
              "Certified male & female tutors with continuous Ijazah",
              "Pure Tajweed focus adhering to classical rules",
              "100% flexible 24/7 schedules matching your timezone",
              "Safe, patient, and family-friendly home learning",
              "Structured curriculum with progress tracking & reports"
            ].map((point, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50/80 border border-gray-100">
                <CheckCircle2 className="w-4 h-4 text-[#0D7A4D] shrink-0 mt-0.5" />
                <span className="text-xs font-medium text-gray-800 leading-snug">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Statistics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 pt-8 border-t border-gray-100">
          {statsItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="p-5 rounded-2xl bg-gradient-to-b from-[#FAF8F2] to-white border border-gray-200/80 text-center hover:shadow-md transition-shadow group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#064E3B]/10 text-[#064E3B] mx-auto flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold font-display text-[#064E3B] tracking-tight">
                  {item.value}
                </div>
                <div className="text-xs font-bold text-gray-800 mt-1">
                  {item.label}
                </div>
                <p className="text-[11px] text-gray-500 mt-1 hidden sm:block">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
