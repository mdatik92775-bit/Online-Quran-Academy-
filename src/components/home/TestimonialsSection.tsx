import React from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { Star, Quote, ShieldCheck, MapPin } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useAcademy();

  const published = testimonials.filter(t => t.isPublished);

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0D7A4D] bg-[#064E3B]/5 px-3.5 py-1.5 rounded-full">
            Parent & Student Voices
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#064E3B] tracking-tight">
            Trusted by Muslim Families Worldwide
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Real experiences from students and parents across the UK, USA, Canada, Bangladesh, and beyond.
          </p>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
            <span>ℹ️ Note: These are representative feedback samples during development.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {published.map((item) => (
            <div
              key={item.id}
              className="bg-[#FAF8F2] rounded-3xl p-7 border border-gray-200/80 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between relative group"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-[#0D7A4D]/15 group-hover:text-[#0D7A4D]/30 transition-colors" />

              <div className="space-y-4">
                {/* Stars */}
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                  "{item.review}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 mt-6 border-t border-gray-200/60 flex items-center gap-3">
                {item.photo ? (
                  <img
                    src={item.photo}
                    alt={item.studentOrParentName}
                    className="w-11 h-11 rounded-full object-cover border-2 border-emerald-700/30"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-[#064E3B] text-white flex items-center justify-center font-bold text-sm">
                    {item.studentOrParentName.charAt(0)}
                  </div>
                )}
                <div className="overflow-hidden">
                  <h4 className="text-sm font-bold text-gray-900 leading-snug truncate">
                    {item.studentOrParentName}
                  </h4>
                  <p className="text-[11px] text-gray-500 truncate">
                    {item.roleDescription}
                  </p>
                  <p className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    <span>{item.country}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
