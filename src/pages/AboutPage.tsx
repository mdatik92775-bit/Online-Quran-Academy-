import React from 'react';
import { useAcademy } from '../context/AcademyContext';
import { 
  BookOpen, 
  Target, 
  Eye, 
  Heart, 
  ShieldCheck, 
  Award, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  GraduationCap
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { settings, navigateTo, openTrialModal } = useAcademy();

  const coreValues = [
    {
      title: "Sincerity (Ikhlas)",
      arabic: "الإخلاص",
      desc: "Every lesson is rooted in the sincere intention to please Allah SWT and convey His sacred message faithfully."
    },
    {
      title: "Excellence (Ihsan)",
      arabic: "الإحسان",
      desc: "We pursue perfection in pronunciation (Makharij), Tajweed rules, and technological reliability in our classrooms."
    },
    {
      title: "Patience & Compassion",
      arabic: "الصبر والرحمة",
      desc: "Learning the Quran requires steady encouragement. Our teachers are chosen specifically for their gentle, nurturing manner."
    },
    {
      title: "Authenticity & Sanad",
      arabic: "الأصالة والسند",
      desc: "Our teaching methods follow unbroken traditions of Quranic scholarship passed down through generations of Huffaz."
    },
    {
      title: "Universal Accessibility",
      arabic: "التيسير والشمول",
      desc: "Bridging geographical divides so any Muslim soul anywhere on Earth can sit before a qualified Quran tutor."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F2] pb-24">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#064E3B] via-[#053D2E] to-[#064E3B] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-white/10 px-4 py-1.5 rounded-full inline-block">
            About {settings.brandName}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white max-w-3xl mx-auto">
            Dedicated to Authentic, Accessible Quran Education
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Connecting eager learners with certified, compassionate male and female Quran tutors across the globe.
          </p>
        </div>
      </section>

      {/* Main Narrative */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-200/80 space-y-12">
          {/* Story & Genesis */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#064E3B]">
                Our Story & Vision
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                <strong>Online Quran Academy</strong> was established with the core aspiration of bridging the gap between busy Muslim families worldwide and qualified, trustworthy Quran teachers. For many parents residing in the West, diaspora communities, or busy urban centers, finding an authentic Quran instructor with proper Tajweed credentials and patient, child-friendly pedagogy is a significant challenge.
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                By combining modern educational technology — including interactive screen-sharing, digital Mus'haf tools, and high-definition virtual classrooms — with the timeless tradition of personalized one-to-one mentorship, we make consistent daily Quran recitation simple, structured, and enjoyable.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl p-6 bg-[#FAF8F2] border border-[#0D7A4D]/20 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#064E3B] text-white flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-base font-bold text-[#064E3B]">Rigorous Faculty Selection</h3>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Only 1 out of every 10 applicant tutors meets our strict standards: verified Ijazah, fluency in Tajweed, proven background checks, and positive pedagogical training for young learners.
                </p>
                <div className="pt-2 border-t border-gray-200 space-y-2 text-xs font-semibold text-gray-800">
                  <div className="flex items-center gap-2 text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-[#0D7A4D]" />
                    <span>Verified Hafiz-e-Quran</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-[#0D7A4D]" />
                    <span>Male & Female Instructors</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-[#0D7A4D]" />
                    <span>English, Bengali, Urdu & Arabic Speaking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Vision Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#064E3B]/5 to-transparent border border-[#064E3B]/15 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#064E3B] text-white flex items-center justify-center">
                <Target className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-bold font-display text-[#064E3B]">Our Mission</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                To connect students of all ages with qualified, compassionate, and authentic Quran teachers to master Quran reading, Tajweed, Hifz, and Islamic studies from the safety and comfort of home.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#0D7A4D]/5 to-transparent border border-[#0D7A4D]/15 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#0D7A4D] text-white flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold font-display text-[#064E3B]">Our Vision</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                To serve as a premier, trusted global institution for online Islamic education, illuminating millions of hearts with the Light of the Quran and establishing firm foundations for generations to come.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="space-y-6 pt-8 border-t border-gray-100">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0D7A4D]">Guiding Principles</span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#064E3B]">
                Our Core Values
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {coreValues.map((val, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-[#FAF8F2] border border-gray-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-gray-900">{val.title}</h4>
                    <span className="font-arabic text-sm text-[#064E3B] font-bold">{val.arabic}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Row */}
          <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#064E3B] text-white p-8 rounded-2xl">
            <div className="space-y-1">
              <h4 className="text-xl font-bold font-display">Experience Our Teaching Methodology</h4>
              <p className="text-xs text-emerald-100">Meet your instructor and test our virtual classroom with a 3-day free trial.</p>
            </div>
            <button
              onClick={() => openTrialModal()}
              className="px-6 py-3 rounded-xl font-bold text-xs text-gray-950 bg-[#D4AF37] hover:bg-[#e0be47] transition-all shrink-0 cursor-pointer shadow-md"
            >
              Book 3-Day Free Trial
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
