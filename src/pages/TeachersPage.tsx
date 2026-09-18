import React, { useState } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { Search, Award, Globe, Star, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

export const TeachersPage: React.FC = () => {
  const { teachers, navigateTo, openTrialModal } = useAcademy();
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female'>('all');

  const published = teachers.filter(t => t.isPublished);

  const filteredTeachers = published.filter(t => {
    const matchesSearch = 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.qualification.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.specialization.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      t.languages.some(l => l.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;
    if (genderFilter === 'all') return true;
    return t.gender === genderFilter;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F2] pb-24">
      {/* Banner */}
      <section className="bg-gradient-to-r from-[#064E3B] via-[#053D2E] to-[#064E3B] text-white py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-white/10 px-4 py-1.5 rounded-full inline-block">
            Our Certified Instructors
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white">
            Qualified Quran Teachers & Ustadhas
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Every instructor at Online Quran Academy holds verified Ijazah certifications and is trained in patient, engaging one-to-one teaching.
          </p>
        </div>
      </section>

      {/* Main Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Filter bar */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/80 p-5 space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search teacher by name, language, qualification, or specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B]"
              />
            </div>
            <div className="text-xs text-gray-500 font-medium whitespace-nowrap">
              Showing <strong className="text-gray-900">{filteredTeachers.length}</strong> teachers
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
            <span className="text-xs font-bold text-gray-500 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Faculty Filter:
            </span>
            <button
              onClick={() => setGenderFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                genderFilter === 'all' ? 'bg-[#064E3B] text-white shadow-xs' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Tutors ({published.length})
            </button>
            <button
              onClick={() => setGenderFilter('male')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                genderFilter === 'male' ? 'bg-[#064E3B] text-white shadow-xs' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Male Quran Teachers
            </button>
            <button
              onClick={() => setGenderFilter('female')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                genderFilter === 'female' ? 'bg-[#064E3B] text-white shadow-xs' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Female Quran Teachers (Ustadhas)
            </button>
          </div>
        </div>

        {/* Teachers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-3xl border border-gray-200/80 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo & Badge */}
                <div className="relative h-64 w-full overflow-hidden bg-gray-100">
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

                  <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#D4AF37] text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                      <span>{teacher.rating}</span>
                      <span className="text-white/70 font-normal">({teacher.reviewCount} reviews)</span>
                    </div>
                    <span className="text-xs bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded font-medium">
                      {teacher.experience} Exp.
                    </span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#064E3B] transition-colors">
                      {teacher.name}
                    </h3>
                    <p className="text-xs text-[#0D7A4D] font-semibold">
                      {teacher.title}
                    </p>
                  </div>

                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {teacher.bio}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-gray-100 text-xs text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span className="truncate">{teacher.qualification}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-[#0D7A4D] shrink-0" />
                      <span>{teacher.languages.join(', ')}</span>
                    </div>
                  </div>

                  {/* Specializations */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {teacher.specialization.map((spec, i) => (
                      <span key={i} className="text-[10px] font-medium bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => navigateTo('teacher-profile', teacher.id)}
                  className="py-2.5 text-center rounded-xl text-xs font-bold text-[#064E3B] bg-[#064E3B]/10 hover:bg-[#064E3B]/15 transition-colors cursor-pointer"
                >
                  View Profile
                </button>
                <button
                  onClick={() => openTrialModal(`Trial with ${teacher.name}`)}
                  className="py-2.5 text-center rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#064E3B] to-[#0D7A4D] hover:from-[#053c2d] hover:to-[#085233] transition-all cursor-pointer flex items-center justify-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  <span>Request Tutor</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
