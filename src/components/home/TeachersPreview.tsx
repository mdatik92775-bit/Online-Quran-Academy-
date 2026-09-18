import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { Award, Globe, Star, ArrowRight, UserCheck, Sparkles, BookOpen } from 'lucide-react';

export const TeachersPreview: React.FC = () => {
  const { teachers, navigateTo, openTrialModal } = useAcademy();
  const [filterGender, setFilterGender] = useState<'all' | 'male' | 'female'>('all');

  const publishedTeachers = teachers.filter(t => t.isPublished);
  const filtered = filterGender === 'all' 
    ? publishedTeachers 
    : publishedTeachers.filter(t => t.gender === filterGender);

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0D7A4D] bg-[#064E3B]/5 px-3.5 py-1.5 rounded-full">
              Verified Quran Faculty
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#064E3B] tracking-tight">
              Learn From Qualified Male & Female Tutors
            </h2>
            <p className="text-sm text-gray-600 max-w-xl">
              Our instructors hold authentic Ijazah and Sanad certificates with years of experience teaching children and adult learners.
            </p>
          </div>

          {/* Gender Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => setFilterGender('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterGender === 'all' ? 'bg-white text-[#064E3B] shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Tutors ({publishedTeachers.length})
            </button>
            <button
              onClick={() => setFilterGender('male')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterGender === 'male' ? 'bg-white text-[#064E3B] shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Male Teachers
            </button>
            <button
              onClick={() => setFilterGender('female')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterGender === 'female' ? 'bg-white text-[#064E3B] shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Female Teachers (Ustadhas)
            </button>
          </div>
        </div>

        {/* Teachers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-[#FAF8F2] rounded-2xl border border-gray-200/80 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo & Badge */}
                <div className="relative h-60 w-full overflow-hidden bg-gray-200">
                  <img
                    src={teacher.photo}
                    alt={teacher.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                  <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-md shadow-xs ${
                    teacher.gender === 'female' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {teacher.gender === 'female' ? 'Female Teacher (Ustadha)' : 'Male Teacher (Qari)'}
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-1 text-[#D4AF37] text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                      <span>{teacher.rating}</span>
                      <span className="text-white/70 font-normal">({teacher.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-[#064E3B] transition-colors">
                      {teacher.name}
                    </h3>
                    <p className="text-xs text-[#0D7A4D] font-semibold mt-0.5">
                      {teacher.title}
                    </p>
                  </div>

                  <div className="space-y-1.5 text-xs text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span className="truncate">{teacher.qualification}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-[#0D7A4D] shrink-0" />
                      <span>{teacher.languages.join(', ')}</span>
                    </div>
                  </div>

                  {/* Specializations Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {teacher.specialization.slice(0, 2).map((spec, i) => (
                      <span key={i} className="text-[10px] font-medium bg-white px-2 py-0.5 rounded border border-gray-200 text-gray-700">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => navigateTo('teacher-profile', teacher.id)}
                  className="py-2 px-2 text-center rounded-xl text-xs font-bold text-[#064E3B] bg-white hover:bg-gray-100 border border-gray-200 transition-colors cursor-pointer"
                >
                  View Profile
                </button>
                <button
                  onClick={() => openTrialModal(`Trial with ${teacher.name}`)}
                  className="py-2 px-2 text-center rounded-xl text-xs font-bold text-white bg-[#064E3B] hover:bg-[#053d2e] transition-colors cursor-pointer flex items-center justify-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  <span>Request</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Directory Button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigateTo('teachers')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#064E3B] hover:text-[#0D7A4D] underline underline-offset-4 cursor-pointer"
          >
            <span>Explore Complete Faculty Directory ({teachers.length} Tutors)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
