import React, { useState } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { 
  Clock, 
  UserCheck, 
  Sparkles, 
  ArrowLeft, 
  CheckCircle2, 
  MessageCircle, 
  BookOpen, 
  Award, 
  Video, 
  Calendar,
  Layers,
  ChevronDown
} from 'lucide-react';

export const CourseDetailPage: React.FC = () => {
  const { 
    courses, 
    activeCourseSlug, 
    formatPrice, 
    navigateTo, 
    openTrialModal, 
    openWhatsApp, 
    settings 
  } = useAcademy();

  // Find course by slug or fallback to first
  const course = courses.find(c => c.slug === activeCourseSlug) || courses[0];
  const [expandedModule, setExpandedModule] = useState<number | null>(0);

  if (!course) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold font-display text-gray-800">Course Not Found</h2>
        <button
          onClick={() => navigateTo('courses')}
          className="px-6 py-2.5 rounded-xl bg-[#064E3B] text-white font-semibold text-sm"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F2] pb-24">
      {/* Breadcrumb & Top Bar */}
      <div className="bg-white border-b border-gray-200/80 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-gray-500">
          <button onClick={() => navigateTo('home')} className="hover:text-[#064E3B] transition-colors">
            Home
          </button>
          <span>/</span>
          <button onClick={() => navigateTo('courses')} className="hover:text-[#064E3B] transition-colors">
            Courses
          </button>
          <span>/</span>
          <span className="text-gray-900 font-semibold truncate">{course.title}</span>
        </div>
      </div>

      {/* Course Hero Banner */}
      <section className="bg-gradient-to-r from-[#064E3B] via-[#053D2E] to-[#064E3B] text-white py-12 lg:py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] bg-white/10 px-3 py-1 rounded-md">
                  {course.category.toUpperCase()}
                </span>
                <span className="text-[11px] font-medium text-emerald-200 bg-white/5 px-2.5 py-1 rounded-md">
                  {course.suitableAge}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white leading-tight">
                {course.title}
              </h1>

              <p className="text-sm sm:text-base text-emerald-100 max-w-2xl leading-relaxed">
                {course.description}
              </p>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-emerald-800/80 text-xs">
                <div className="space-y-0.5">
                  <span className="text-emerald-300">Course Duration:</span>
                  <p className="font-bold text-white text-sm">{course.duration}</p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-emerald-300">Class Length:</span>
                  <p className="font-bold text-white text-sm">{course.classDuration}</p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-emerald-300">Instructor:</span>
                  <p className="font-bold text-white text-sm">{course.teacherType}</p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-emerald-300">Monthly Tuition:</span>
                  <p className="font-bold text-[#D4AF37] text-sm">{formatPrice(course.priceMonthly)} / mo</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-3.5">
                <button
                  onClick={() => openTrialModal(course.title)}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-gray-950 bg-[#D4AF37] hover:bg-[#e0be47] shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Sparkles className="w-4 h-4 text-[#064E3B]" />
                  <span>Book 3-Day Free Trial</span>
                </button>

                <button
                  onClick={() => openWhatsApp(`Assalamu Alaikum, I have questions regarding the "${course.title}".`)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/50 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Inquire on WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Right Course Visual Box */}
            <div className="lg:col-span-4">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 aspect-4/3 sm:aspect-5/4 relative group">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-5">
                  <span className="text-xs text-white/90 font-medium flex items-center gap-1.5">
                    <Video className="w-4 h-4 text-[#D4AF37]" />
                    Live 1-on-1 via Zoom / Google Meet
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Syllabus & Learning Outcomes */}
          <div className="lg:col-span-8 space-y-10">
            {/* Learning Outcomes */}
            <div className="bg-white rounded-3xl p-8 shadow-xs border border-gray-200/80 space-y-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#064E3B]/10 text-[#064E3B] flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold font-display text-gray-900">
                  What You Will Learn
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {course.learningOutcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50/80 border border-gray-100">
                    <CheckCircle2 className="w-4 h-4 text-[#0D7A4D] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-gray-700 leading-snug">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Breakdown */}
            <div className="bg-white rounded-3xl p-8 shadow-xs border border-gray-200/80 space-y-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#064E3B]/10 text-[#064E3B] flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-display text-gray-900">
                    Structured Curriculum Modules
                  </h2>
                  <p className="text-xs text-gray-500">Step-by-step progressive lesson pathway</p>
                </div>
              </div>

              <div className="space-y-3">
                {course.curriculum.map((mod, idx) => {
                  const isOpen = expandedModule === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-2xl overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setExpandedModule(isOpen ? null : idx)}
                        className="w-full text-left p-4.5 bg-gray-50/70 hover:bg-gray-100/70 flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-[#064E3B] text-white flex items-center justify-center text-xs font-bold shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-sm font-bold text-gray-900">{mod.title}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180 text-[#064E3B]' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="p-4.5 bg-white border-t border-gray-100 space-y-2 text-xs sm:text-sm text-gray-600 animate-in fade-in duration-150">
                          <p className="text-gray-700 font-medium">{mod.description}</p>
                          <div className="pt-2 flex flex-wrap gap-2">
                            {mod.topics.map((topic, i) => (
                              <span key={i} className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-100">
                                • {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Prerequisites & Target Audience */}
            <div className="bg-white rounded-3xl p-8 shadow-xs border border-gray-200/80 space-y-4">
              <h3 className="text-lg font-bold font-display text-gray-900">
                Prerequisites & Suitability
              </h3>
              <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                <p>
                  <strong>Prerequisites:</strong> {course.prerequisites}
                </p>
                <p>
                  <strong>Target Audience:</strong> Suitable for {course.suitableAge}. Whether preparing a 5-year-old child or an adult beginner seeking gentle, non-judgmental guidance.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Enrollment Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-[#0D7A4D]/30 sticky top-28 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D7A4D] bg-emerald-50 px-2.5 py-1 rounded">
                  One-to-One Tuition
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold font-display text-[#064E3B]">
                    {formatPrice(course.priceMonthly)}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">/ month</span>
                </div>
                <p className="text-xs text-gray-500">
                  Includes 12 live classes, homework grading, and certificate.
                </p>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-gray-100 text-xs text-gray-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0D7A4D]" />
                  <span>3 Free Trial Classes (Zero risk)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0D7A4D]" />
                  <span>Male or Female Teacher of your choice</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0D7A4D]" />
                  <span>Flexible rescheduling policy</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0D7A4D]" />
                  <span>Monthly progress report card</span>
                </div>
              </div>

              <div className="pt-2 space-y-2.5">
                <button
                  onClick={() => openTrialModal(course.title)}
                  className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#064E3B] to-[#0D7A4D] hover:from-[#053c2d] hover:to-[#085233] shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Book Free Trial For This Course</span>
                </button>

                <button
                  onClick={() => openWhatsApp(`Assalamu Alaikum, I would like to enroll in ${course.title}. Please provide schedule options.`)}
                  className="w-full py-3 rounded-xl font-semibold text-xs text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Ask Direct on WhatsApp: {settings.phone}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
