import React, { useState } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { Search, Clock, UserCheck, Sparkles, ArrowRight, Eye, Filter } from 'lucide-react';

export const CoursesPage: React.FC = () => {
  const { courses, formatPrice, navigateTo, openTrialModal } = useAcademy();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const publishedCourses = courses.filter(c => c.isPublished);

  const filteredCourses = publishedCourses.filter(course => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedCategory === 'all') return true;
    return course.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F2] pb-24">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#064E3B] via-[#053D2E] to-[#064E3B] text-white py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-white/10 px-4 py-1.5 rounded-full inline-block">
            Online Quran Programs
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white">
            Explore All Quran & Islamic Courses
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            From learning your very first Arabic letter in Noorani Qaida to achieving certified Quran Hifz with complete Tajweed.
          </p>
        </div>
      </section>

      {/* Main Content & Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Search & Category Filter Toolbar */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/80 p-5 space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses (e.g. Tajweed, Qaida, Hifz, Kids, Arabic)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B]"
              />
            </div>

            {/* Quick Stats */}
            <div className="text-xs text-gray-500 font-medium whitespace-nowrap">
              Showing <strong className="text-gray-900">{filteredCourses.length}</strong> of {publishedCourses.length} courses
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
            <span className="text-xs font-bold text-gray-500 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Category:
            </span>
            {[
              { id: 'all', label: 'All Courses' },
              { id: 'qaida', label: 'Noorani Qaida' },
              { id: 'reading', label: 'Quran Reading (Nazra)' },
              { id: 'tajweed', label: 'Tajweed Rules' },
              { id: 'hifz', label: 'Hifz Memorization' },
              { id: 'translation', label: 'Translation & Tafseer' },
              { id: 'islamic_studies', label: 'Islamic Studies & Duas' },
              { id: 'kids', label: 'Kids Classes' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-[#064E3B] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-xs hover:shadow-xl transition-all duration-300 border border-gray-200/80 overflow-hidden flex flex-col group"
            >
              {/* Image & Badges */}
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {course.isFeatured && (
                  <span className="absolute top-3 left-3 bg-[#D4AF37] text-gray-950 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Featured
                  </span>
                )}

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="font-semibold bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded">
                    {course.suitableAge}
                  </span>
                  <span className="font-bold text-[#D4AF37] bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded">
                    {formatPrice(course.priceMonthly)} / month
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold font-display text-gray-900 group-hover:text-[#064E3B] transition-colors leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Meta details list */}
                <div className="space-y-1.5 pt-2 border-t border-gray-100 text-xs text-gray-500">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#0D7A4D]" />
                      Estimated Duration:
                    </span>
                    <span className="font-semibold text-gray-800">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#0D7A4D]" />
                      Session Length:
                    </span>
                    <span className="font-semibold text-gray-800">{course.classDuration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-[#0D7A4D]" />
                      Teacher:
                    </span>
                    <span className="font-semibold text-emerald-800">{course.teacherType}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => navigateTo('course-detail', course.slug)}
                    className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-[#064E3B] bg-[#064E3B]/10 hover:bg-[#064E3B]/15 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Curriculum</span>
                  </button>

                  <button
                    onClick={() => openTrialModal(course.title)}
                    className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#064E3B] to-[#0D7A4D] hover:from-[#053c2d] hover:to-[#085233] shadow-xs flex items-center justify-center gap-1 cursor-pointer transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Book Trial</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
