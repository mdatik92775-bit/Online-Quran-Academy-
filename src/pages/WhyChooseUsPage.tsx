import React from 'react';
import { useAcademy } from '../context/AcademyContext';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { ShieldCheck, Heart, Award, Sparkles, CheckCircle2, MessageCircle } from 'lucide-react';

export const WhyChooseUsPage: React.FC = () => {
  const { openTrialModal, openWhatsApp, settings } = useAcademy();

  return (
    <div className="min-h-screen bg-[#FAF8F2] pb-24">
      {/* Banner */}
      <section className="bg-gradient-to-r from-[#064E3B] via-[#053D2E] to-[#064E3B] text-white py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-white/10 px-4 py-1.5 rounded-full inline-block">
            Our Standards
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white">
            Why Thousands of Families Choose Us
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Discover what sets Online Quran Academy apart: verified Ijazah tutors, patient pedagogy, and flexible scheduling.
          </p>
        </div>
      </section>

      {/* Embedded Feature Set */}
      <div className="-mt-6">
        <WhyChooseUs />
      </div>

      {/* Comparison Table */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 space-y-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-md border border-gray-200/80 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl font-bold font-display text-gray-900">
              Online Quran Academy vs. Traditional Local Alternatives
            </h3>
            <p className="text-xs text-gray-500">
              A transparent comparison of flexibility, safety, and focused attention.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-100">
                  <th className="py-3 px-4 font-bold text-gray-600">Feature</th>
                  <th className="py-3 px-4 font-bold text-[#064E3B] bg-emerald-50/70 rounded-t-xl">
                    Online Quran Academy
                  </th>
                  <th className="py-3 px-4 font-bold text-gray-400">Traditional Mosque / Madrasa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-gray-800">Student-to-Teacher Ratio</td>
                  <td className="py-3.5 px-4 text-[#064E3B] font-bold bg-emerald-50/70">1-on-1 Private Dedicated Attention</td>
                  <td className="py-3.5 px-4 text-gray-500">1 teacher to 20–30 students</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-gray-800">Class Timings</td>
                  <td className="py-3.5 px-4 text-[#064E3B] font-bold bg-emerald-50/70">100% Flexible (Choose any hour 24/7)</td>
                  <td className="py-3.5 px-4 text-gray-500">Fixed rigid times, rush-hour traffic</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-gray-800">Teacher Gender Selection</td>
                  <td className="py-3.5 px-4 text-[#064E3B] font-bold bg-emerald-50/70">Both Male & Female Ustadhas Available</td>
                  <td className="py-3.5 px-4 text-gray-500">Rarely choice of female teachers</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-gray-800">Parent Supervision</td>
                  <td className="py-3.5 px-4 text-[#064E3B] font-bold bg-emerald-50/70">Listen in live from your living room</td>
                  <td className="py-3.5 px-4 text-gray-500">Drop off without visibility</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-gray-800">Rescheduling / Makeup Policy</td>
                  <td className="py-3.5 px-4 text-[#064E3B] font-bold bg-emerald-50/70">Yes, makeup classes provided with notice</td>
                  <td className="py-3.5 px-4 text-gray-500">Missed classes are lost</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-gray-800">Free Trial Period</td>
                  <td className="py-3.5 px-4 text-[#064E3B] font-bold bg-emerald-50/70 rounded-b-xl">3 Full Days Complimentary</td>
                  <td className="py-3.5 px-4 text-gray-500">Immediate upfront term fee</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => openTrialModal()}
            className="px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#064E3B] to-[#0D7A4D] hover:from-[#053c2d] hover:to-[#085233] shadow-md inline-flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Claim Your 3-Day Free Trial</span>
          </button>
        </div>
      </div>
    </div>
  );
};
