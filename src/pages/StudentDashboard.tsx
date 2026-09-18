import React from 'react';
import { useAcademy } from '../context/AcademyContext';
import { 
  Calendar, 
  Clock, 
  Video, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  MessageCircle, 
  User, 
  Sparkles,
  TrendingUp,
  FileText
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { currentStudent, teachers, openWhatsApp, navigateTo, settings } = useAcademy();

  const assignedTeacher = teachers.find(t => t.name.includes('Farhana') || t.gender === 'female') || teachers[0];

  return (
    <div className="min-h-screen bg-[#FAF8F2] pb-24">
      {/* Top Header */}
      <section className="bg-gradient-to-r from-[#064E3B] to-[#0D7A4D] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] bg-white/10 px-3 py-1 rounded-full">
              Student Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Assalamu Alaikum, {currentStudent.name}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100">
              Enrolled Course: <strong className="text-white">{currentStudent.enrolledCourse}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openWhatsApp(`Assalamu Alaikum, I need assistance with my student account for ${currentStudent.name}.`)}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/20 flex items-center gap-2 cursor-pointer transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Contact Coordinator</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Dashboard Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols): Class Schedule & Progress */}
          <div className="lg:col-span-8 space-y-6">
            {/* Next Live Class Alert Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-[#0D7A4D]/30 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Video className="w-6 h-6 animate-pulse text-[#064E3B]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase text-[#0D7A4D] tracking-wider">
                      Upcoming Live Session
                    </span>
                    <h2 className="text-xl font-bold text-gray-900 font-display">
                      Today's One-to-One Class
                    </h2>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-gray-500 font-medium">Scheduled Time:</span>
                  <p className="text-base font-bold text-[#064E3B]">{currentStudent.nextClass}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-gray-700 space-y-0.5 text-center sm:text-left">
                  <p className="font-bold text-gray-900">Assigned Instructor: {assignedTeacher.name}</p>
                  <p className="text-gray-500">Platform: Zoom Classroom Room #OQA-49167</p>
                </div>

                <a
                  href={currentStudent.zoomLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#064E3B] to-[#0D7A4D] hover:from-[#053c2d] hover:to-[#085233] shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Video className="w-4 h-4 text-[#D4AF37]" />
                  <span>Join Live Classroom</span>
                </a>
              </div>
            </div>

            {/* Academic Progress & Syllabus Tracker */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-200/80 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <TrendingUp className="w-5 h-5 text-[#064E3B]" />
                  <h3 className="text-lg font-bold font-display text-gray-900">
                    Course Syllabus Progress
                  </h3>
                </div>
                <span className="text-xs font-bold text-[#064E3B] bg-emerald-50 px-3 py-1 rounded-full">
                  {currentStudent.progressPercentage}% Completed
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#064E3B] to-[#D4AF37] h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${currentStudent.progressPercentage}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                  <p className="text-gray-500">Current Milestone</p>
                  <p className="font-bold text-gray-900 text-sm">Lesson 14: Sukoon & Jazm</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                  <p className="text-gray-500">Attendance Streak</p>
                  <p className="font-bold text-emerald-800 text-sm">94% (16 of 17 Classes)</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                  <p className="text-gray-500">Latest Teacher Evaluation</p>
                  <p className="font-bold text-[#D4AF37] text-sm">Excellent (Mumtaz)</p>
                </div>
              </div>
            </div>

            {/* Recent Teacher Notes & Feedback */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-200/80 space-y-4">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-[#064E3B]" />
                <h3 className="text-lg font-bold font-display text-gray-900">
                  Recent Lesson Feedback & Homework
                </h3>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#064E3B]">Yesterday's Lesson Review</span>
                    <span className="text-gray-500">By {assignedTeacher.name}</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    "Maryam recited very clearly today. Please revise page 24 at home focusing on the heavy letters: Khaw, Saad, and Daad. Homework: Practice line 3 to 6 twice before next class."
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-800">Previous Lesson Notes</span>
                    <span className="text-gray-500">3 days ago</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    "Great improvement on Harakat (Fatha, Kasra, Dammah). Homework completed accurately with parent."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Teacher Card & Account Details */}
          <div className="lg:col-span-4 space-y-6">
            {/* Teacher Details */}
            <div className="bg-white rounded-3xl p-6 shadow-xs border border-gray-200/80 space-y-4">
              <h3 className="text-base font-bold font-display text-gray-900">
                Your Assigned Tutor
              </h3>

              <div className="flex items-center gap-3">
                <img
                  src={assignedTeacher.photo}
                  alt={assignedTeacher.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-gray-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{assignedTeacher.name}</h4>
                  <p className="text-xs text-[#0D7A4D] font-medium">{assignedTeacher.title}</p>
                  <p className="text-[11px] text-gray-500">{assignedTeacher.qualification}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <button
                  onClick={() => openWhatsApp(`Assalamu Alaikum ${assignedTeacher.name}, this is regarding ${currentStudent.name}'s lesson today.`)}
                  className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-700 hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Message Teacher on WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Tuition & Invoice Status */}
            <div className="bg-white rounded-3xl p-6 shadow-xs border border-gray-200/80 space-y-4">
              <h3 className="text-base font-bold font-display text-gray-900">
                Tuition & Invoice Status
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Plan:</span>
                  <span className="font-bold text-gray-800">Standard (3 Days/Week)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Billing Cycle:</span>
                  <span className="font-bold text-gray-800">Monthly</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Current Status:</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Active & Paid</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Next Due Date:</span>
                  <span className="font-bold text-gray-800">1st of Next Month</span>
                </div>
              </div>

              <button
                onClick={() => openWhatsApp(`Assalamu Alaikum, I would like to request an invoice copy or change my class schedule for ${currentStudent.name}.`)}
                className="w-full py-2.5 rounded-xl font-semibold text-xs text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer text-center block"
              >
                Request Billing / Schedule Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
