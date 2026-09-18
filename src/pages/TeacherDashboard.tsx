import React, { useState } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { 
  Users, 
  Calendar, 
  Clock, 
  Video, 
  Award, 
  CheckCircle2, 
  MessageCircle, 
  Star,
  Check,
  Edit3
} from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const { teachers, openWhatsApp } = useAcademy();
  const currentTeacher = teachers[0]; // Active instructor view

  const [studentNotes, setStudentNotes] = useState<{ [id: string]: string }>({
    's-1': 'Completed lesson 14. Reviewed Sukoon rules and practice lines 1-4.',
    's-2': 'Recited Surah Al-Fajr lines 1-14 with proper Ikhfa.',
    's-3': 'Excellent progress on Tajweed rules of Meem Sakinah.'
  });

  const [savedStatus, setSavedStatus] = useState<string | null>(null);

  const todayClasses = [
    {
      id: 's-1',
      studentName: 'Maryam Farooq',
      course: 'Noorani Qaida Course',
      time: '6:30 PM - 7:00 PM',
      age: 9,
      country: 'Bangladesh',
      status: 'Upcoming'
    },
    {
      id: 's-2',
      studentName: 'Zayd Al-Hassan',
      course: 'Quran with Tajweed',
      time: '7:15 PM - 7:45 PM',
      age: 12,
      country: 'United Kingdom',
      status: 'Upcoming'
    },
    {
      id: 's-3',
      studentName: 'Amina Begum',
      course: 'Quran Reading (Nazra)',
      time: '8:00 PM - 8:30 PM',
      age: 15,
      country: 'United States',
      status: 'Upcoming'
    }
  ];

  const handleSaveNotes = (id: string) => {
    setSavedStatus(id);
    setTimeout(() => setSavedStatus(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F2] pb-24">
      {/* Top Banner */}
      <section className="bg-gradient-to-r from-[#064E3B] to-[#0D7A4D] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] bg-white/10 px-3 py-1 rounded-full">
              Faculty Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Ustadha / Teacher Portal: {currentTeacher.name}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100">
              Department: <strong className="text-white">{currentTeacher.title}</strong>
            </p>
          </div>

          {/* Quick stats badge */}
          <div className="flex items-center gap-4 bg-white/10 px-5 py-2.5 rounded-2xl border border-white/15">
            <div className="text-center">
              <p className="text-xs text-emerald-200">Rating</p>
              <p className="text-base font-bold text-[#D4AF37] flex items-center justify-center gap-1">
                <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                {currentTeacher.rating}
              </p>
            </div>
            <div className="h-8 w-px bg-white/20"></div>
            <div className="text-center">
              <p className="text-xs text-emerald-200">Experience</p>
              <p className="text-base font-bold text-white">{currentTeacher.experience}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 space-y-8">
        {/* Today's Teaching Schedule */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-200/80 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-5 h-5 text-[#064E3B]" />
              <h2 className="text-xl font-bold font-display text-gray-900">
                Today's Live Classes (One-to-One)
              </h2>
            </div>
            <span className="text-xs font-bold text-[#064E3B] bg-emerald-50 px-3 py-1 rounded-full">
              {todayClasses.length} Sessions Scheduled
            </span>
          </div>

          <div className="space-y-4">
            {todayClasses.map((cls) => (
              <div
                key={cls.id}
                className="p-5 rounded-2xl bg-[#FAF8F2] border border-gray-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-gray-900">{cls.studentName}</span>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                      Age {cls.age} • {cls.country}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Course: <strong className="text-gray-800">{cls.course}</strong>
                  </p>
                  <p className="text-xs text-[#064E3B] font-semibold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Slot: {cls.time}</span>
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                  <button
                    onClick={() => openWhatsApp(`Assalamu Alaikum, this is ${currentTeacher.name} preparing for ${cls.studentName}'s Quran lesson at ${cls.time}.`)}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Notify Parent</span>
                  </button>

                  <a
                    href="https://zoom.us"
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#064E3B] to-[#0D7A4D] hover:from-[#053c2d] hover:to-[#085233] flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Video className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Launch Zoom Room</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lesson Progress & Attendance Logging */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-200/80 space-y-6">
          <div className="flex items-center gap-2.5">
            <Edit3 className="w-5 h-5 text-[#064E3B]" />
            <h2 className="text-xl font-bold font-display text-gray-900">
              Student Progress & Homework Logger
            </h2>
          </div>

          <p className="text-xs text-gray-500">
            Log today's Sabaq (lesson), Sabqi (recent revision), and homework notes for parents to view in their portal.
          </p>

          <div className="space-y-6">
            {todayClasses.map((cls) => (
              <div key={cls.id} className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-gray-900">
                    {cls.studentName} — {cls.course}
                  </h4>
                  <div className="flex items-center gap-2 text-xs">
                    <label className="flex items-center gap-1 text-emerald-800 font-semibold cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-[#064E3B]" />
                      <span>Present Today</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Lesson Record & Homework Guidance:
                  </label>
                  <textarea
                    rows={2}
                    value={studentNotes[cls.id] || ''}
                    onChange={(e) => setStudentNotes({ ...studentNotes, [cls.id]: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#064E3B]/20 focus:outline-hidden"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => handleSaveNotes(cls.id)}
                    className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-[#064E3B] hover:bg-[#053c2d] flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    {savedStatus === cls.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-300" />
                        <span>Saved to Student Portal!</span>
                      </>
                    ) : (
                      <span>Save Lesson Record</span>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
