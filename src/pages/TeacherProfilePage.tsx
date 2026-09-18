import React from 'react';
import { useAcademy } from '../context/AcademyContext';
import { 
  Award, 
  Globe, 
  Star, 
  Sparkles, 
  CheckCircle2, 
  MessageCircle, 
  Clock, 
  Calendar,
  BookOpen,
  ArrowLeft
} from 'lucide-react';

export const TeacherProfilePage: React.FC = () => {
  const { 
    teachers, 
    activeTeacherId, 
    navigateTo, 
    openTrialModal, 
    openWhatsApp, 
    settings 
  } = useAcademy();

  const teacher = teachers.find(t => t.id === activeTeacherId) || teachers[0];

  if (!teacher) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold font-display text-gray-800">Teacher Profile Not Found</h2>
        <button
          onClick={() => navigateTo('teachers')}
          className="px-6 py-2.5 rounded-xl bg-[#064E3B] text-white font-semibold text-sm"
        >
          Back to Faculty Directory
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F2] pb-24">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200/80 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-gray-500">
          <button onClick={() => navigateTo('home')} className="hover:text-[#064E3B] transition-colors">
            Home
          </button>
          <span>/</span>
          <button onClick={() => navigateTo('teachers')} className="hover:text-[#064E3B] transition-colors">
            Teachers
          </button>
          <span>/</span>
          <span className="text-gray-900 font-semibold truncate">{teacher.name}</span>
        </div>
      </div>

      {/* Profile Header */}
      <section className="bg-gradient-to-r from-[#064E3B] via-[#053D2E] to-[#064E3B] text-white py-12 lg:py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Photo */}
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl shrink-0 bg-gray-100">
              <img
                src={teacher.photo}
                alt={teacher.name}
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
              <span className={`absolute bottom-2 left-2 text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow-xs ${
                teacher.gender === 'female' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {teacher.gender === 'female' ? 'Female Teacher (Ustadha)' : 'Male Teacher (Qari)'}
              </span>
            </div>

            {/* Header Details */}
            <div className="space-y-4 text-center md:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] bg-white/10 px-3 py-1 rounded-md">
                  Verified Ijazah Holder
                </span>
                <span className="text-xs font-medium text-emerald-200 bg-white/5 px-3 py-1 rounded-md">
                  {teacher.experience} Teaching Experience
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold font-display text-white">
                {teacher.name}
              </h1>

              <p className="text-sm text-emerald-100 font-medium">
                {teacher.title} • {teacher.qualification}
              </p>

              <div className="flex items-center justify-center md:justify-start gap-1 text-[#D4AF37] text-sm font-bold">
                <Star className="w-4 h-4 fill-[#D4AF37]" />
                <span>{teacher.rating} / 5.0</span>
                <span className="text-white/70 font-normal">({teacher.reviewCount} verified parent & student ratings)</span>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3">
                <button
                  onClick={() => openTrialModal(`Trial with ${teacher.name}`)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-gray-950 bg-[#D4AF37] hover:bg-[#e0be47] shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Sparkles className="w-4 h-4 text-[#064E3B]" />
                  <span>Book Free Trial with {teacher.name.split(' ')[0]}</span>
                </button>

                <button
                  onClick={() => openWhatsApp(`Assalamu Alaikum, I would like to know if ${teacher.name} is available for classes.`)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl font-semibold text-xs text-white bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/50 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Inquire Availability</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Profile Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            {/* Bio Section */}
            <div className="bg-white rounded-3xl p-8 shadow-xs border border-gray-200/80 space-y-4">
              <h2 className="text-2xl font-bold font-display text-gray-900">
                Biography & Teaching Philosophy
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {teacher.bio}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {teacher.gender === 'female' ? 'Ustadha' : 'Shaykh'} {teacher.name} emphasizes correct phonetics, gentle repetitive pacing for young students, and helping children form a loving connection with the Holy Quran.
              </p>
            </div>

            {/* Specialization & Courses Instructed */}
            <div className="bg-white rounded-3xl p-8 shadow-xs border border-gray-200/80 space-y-6">
              <h3 className="text-xl font-bold font-display text-gray-900">
                Areas of Expertise & Courses
              </h3>
              <div className="flex flex-wrap gap-2">
                {teacher.specialization.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                  Courses Taught by this Instructor:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {teacher.availableCourses.map((cName, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 border border-gray-200/70 text-xs font-medium text-gray-800">
                      <BookOpen className="w-4 h-4 text-[#064E3B]" />
                      <span>{cName}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Weekly Availability */}
            <div className="bg-white rounded-3xl p-8 shadow-xs border border-gray-200/80 space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#064E3B]" />
                <h3 className="text-xl font-bold font-display text-gray-900">
                  Weekly Class Slots Availability
                </h3>
              </div>
              <p className="text-xs text-gray-600">
                This teacher is currently taking new one-to-one students for the following days:
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {teacher.availableDays.map((day, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-lg bg-[#064E3B]/10 text-[#064E3B] font-semibold text-xs">
                    ✓ {day}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Quick Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-xs border border-gray-200/80 space-y-5">
              <h3 className="text-lg font-bold font-display text-gray-900">
                Instructor Credentials
              </h3>

              <div className="space-y-3 text-xs text-gray-700">
                <div className="flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-900">Education:</span>
                    <p>{teacher.qualification}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Globe className="w-4 h-4 text-[#0D7A4D] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-900">Languages:</span>
                    <p>{teacher.languages.join(', ')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#064E3B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-900">Teaching Experience:</span>
                    <p>{teacher.experience}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button
                  onClick={() => openTrialModal(`Trial with ${teacher.name}`)}
                  className="w-full py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#064E3B] to-[#0D7A4D] hover:from-[#053c2d] hover:to-[#085233] shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Request Class with this Teacher</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
