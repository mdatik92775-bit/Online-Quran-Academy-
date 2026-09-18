import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { Clock, UserCheck, Sparkles, ArrowRight, Check, Eye } from 'lucide-react';

export const CoursesPreview: React.FC = () => {
  const { courses, formatPrice, navigateTo, openTrialModal } = useAcademy();
  const [activeTab, setActiveTab] = useState<string>('all');

  const publishedCourses = courses.filter(c => c.isPublished);

  const filteredCourses = activeTab === 'all' 
    ? publishedCourses 
    : publishedCourses.filter(c => {
        if (activeTab === 'qaida') return c.category === 'qaida';
        if (activeTab === 'reading') return c.category === 'reading' || c.category === 'tajweed';
        if (activeTab === 'hifz') return c.category === 'hifz';
        if (activeTab === 'kids') return c.category === 'kids';
        if (activeTab === 'islamic_studies') return c.category === 'islamic_studies' || c.category === 'translation';
        return true;
      });

  return (
    <section className="py-20 bg-[#FAF8F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0D7A4D] bg-[#0D7A4D]/10 px-3.5 py-1.5 rounded-full">
            Our Structured Programs
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#064E3B] tracking-tight">
            Popular Online Quran Courses
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            From absolute beginner Arabic phonetics to complete Mus'haf memorization with certified Ijazah instructors.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: 'all', label: 'All Courses' },
              { id: 'qaida', label: 'Noorani Qaida' },
              { id: 'reading', label: 'Tajweed & Nazra' },
              { id: 'hifz', label: 'Quran Hifz' },
              { id: 'kids', label: 'Kids Classes' },
              { id: 'islamic_studies', label: 'Islamic Studies & Duas' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#064E3B] text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.slice(0, 6).map((course) => (
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

              {/* Body */}
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
                      Duration:
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
                    <span>View Details</span>
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

        {/* View All Courses Link */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigateTo('courses')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#064E3B] hover:bg-[#053d2e] shadow-md transition-all cursor-pointer"
          >
            <span>View All {courses.length} Available Courses</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
