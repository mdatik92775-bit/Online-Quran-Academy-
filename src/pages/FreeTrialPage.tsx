import React, { useState } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { Sparkles, CheckCircle2, MessageCircle, Send, ShieldCheck, Clock, Users } from 'lucide-react';
import confetti from 'canvas-confetti';

export const FreeTrialPage: React.FC = () => {
  const { courses, submitTrialRequest, settings, openWhatsApp } = useAcademy();

  const [studentName, setStudentName] = useState('');
  const [parentName, setParentName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [country, setCountry] = useState('Bangladesh');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [currentLevel, setCurrentLevel] = useState('Absolute Beginner (Never read Arabic)');
  const [preferredCourseTitle, setPreferredCourseTitle] = useState(courses[0]?.title || 'Noorani Qaida Course');
  const [preferredTeacherGender, setPreferredTeacherGender] = useState<'male' | 'female' | 'any'>('any');
  const [selectedDays, setSelectedDays] = useState<string[]>(['Monday', 'Wednesday', 'Friday']);
  const [preferredTime, setPreferredTime] = useState('Evening (6:00 PM - 9:00 PM)');
  const [timezone, setTimezone] = useState('Asia/Dhaka (GMT+6)');
  const [message, setMessage] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedStudent, setSubmittedStudent] = useState('');

  const daysOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      if (selectedDays.length > 1) {
        setSelectedDays(selectedDays.filter(d => d !== day));
      }
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !whatsapp) return;

    const matchedCourse = courses.find(c => c.title === preferredCourseTitle);

    submitTrialRequest({
      studentName,
      parentName: parentName || 'Self',
      age: age || '10',
      gender,
      country,
      email: email || 'student@example.com',
      whatsapp,
      currentLevel,
      preferredCourseId: matchedCourse?.id || 'course-1',
      preferredCourseTitle,
      preferredTeacherGender,
      preferredDays: selectedDays,
      preferredTime,
      timezone,
      message
    });

    setSubmittedStudent(studentName);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // safe fallback
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F2] pb-24">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#064E3B] via-[#053D2E] to-[#064E3B] text-white py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-white/10 px-4 py-1.5 rounded-full inline-block">
            Complimentary Evaluation
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white">
            Book Your 3-Day Free Quran Trial
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Experience our interactive one-to-one live class environment before committing. No credit card required.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200/80 p-6 sm:p-10">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 font-display">
                  Alhamdulillah! Free Trial Booked Successfully
                </h3>
                <p className="text-gray-600 text-sm max-w-lg mx-auto">
                  Thank you, <strong className="text-gray-900">{submittedStudent}</strong>. Our academic team has received your registration. We will contact you via WhatsApp at <strong className="text-emerald-800">{whatsapp}</strong> within a few hours to confirm your class schedule and Zoom/Meet link.
                </p>
              </div>

              <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 max-w-md mx-auto text-left space-y-2">
                <p className="font-bold flex items-center gap-1.5 text-sm">
                  <Sparkles className="w-4 h-4 text-[#064E3B]" />
                  Need Faster Scheduling?
                </p>
                <p>
                  Send us a direct message on WhatsApp with your student name to arrange your trial slot immediately.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => openWhatsApp(`Assalamu Alaikum, I just booked a 3-day free trial for ${submittedStudent} in course: ${preferredCourseTitle}. WhatsApp: ${whatsapp}. Please confirm our class timing.`)}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-emerald-700 hover:bg-emerald-800 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                  <span>Confirm on WhatsApp: {settings.phone}</span>
                </button>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm text-gray-700 bg-gray-100 hover:bg-gray-200"
                >
                  Book Another Student
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form Section: Student Details */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#064E3B] border-b border-gray-100 pb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>1. Student & Contact Information</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maryam Farooq"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Parent / Guardian Name (or Self)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Farooq Ahmed"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Student Age *
                    </label>
                    <input
                      type="number"
                      min="4"
                      max="80"
                      required
                      placeholder="e.g. 9"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Student Gender *
                    </label>
                    <div className="flex gap-6 pt-2">
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="radio"
                          name="trial-gender"
                          checked={gender === 'male'}
                          onChange={() => setGender('male')}
                          className="accent-[#064E3B]"
                        />
                        <span>Male Student</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="radio"
                          name="trial-gender"
                          checked={gender === 'female'}
                          onChange={() => setGender('female')}
                          className="accent-[#064E3B]"
                        />
                        <span>Female Student</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      WhatsApp Number (With Country Code) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+8801746349167 or +44..."
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="parent@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Country of Residence *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bangladesh, United Kingdom, United States, Canada..."
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B]"
                    />
                  </div>
                </div>
              </div>

              {/* Form Section: Course & Preferences */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h3 className="text-base font-bold text-[#064E3B] border-b border-gray-100 pb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>2. Course Selection & Preferences</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Preferred Course *
                    </label>
                    <select
                      value={preferredCourseTitle}
                      onChange={(e) => setPreferredCourseTitle(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20 bg-white"
                    >
                      {courses.map(c => (
                        <option key={c.id} value={c.title}>{c.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Teacher Gender Preference
                    </label>
                    <select
                      value={preferredTeacherGender}
                      onChange={(e) => setPreferredTeacherGender(e.target.value as any)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20 bg-white"
                    >
                      <option value="any">Any Qualified Teacher</option>
                      <option value="female">Female Teacher (Ustadha)</option>
                      <option value="male">Male Teacher (Qari)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Current Quran Proficiency Level
                    </label>
                    <select
                      value={currentLevel}
                      onChange={(e) => setCurrentLevel(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20 bg-white"
                    >
                      <option value="Absolute Beginner (Never read Arabic)">Absolute Beginner (Never read Arabic)</option>
                      <option value="Knows some Arabic letters">Knows some Arabic letters</option>
                      <option value="Can read slowly without Tajweed">Can read slowly without Tajweed</option>
                      <option value="Fluent reader seeking Tajweed mastery">Fluent reader seeking Tajweed mastery</option>
                      <option value="Memorized few Juz / Hifz revision">Memorized few Juz / Hifz revision</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Preferred Time Slot
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20 bg-white"
                    >
                      <option value="Morning (7:00 AM - 11:00 AM)">Morning (7:00 AM - 11:00 AM)</option>
                      <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM - 5:00 PM)</option>
                      <option value="Evening (6:00 PM - 9:00 PM)">Evening (6:00 PM - 9:00 PM)</option>
                      <option value="Night (9:00 PM - 12:00 AM)">Night (9:00 PM - 12:00 AM)</option>
                      <option value="Weekend Mornings">Weekend Mornings</option>
                    </select>
                  </div>
                </div>

                {/* Days of week */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Select Preferred Days for Class:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {daysOptions.map(d => (
                      <button
                        type="button"
                        key={d}
                        onClick={() => toggleDay(d)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                          selectedDays.includes(d)
                            ? 'bg-[#064E3B] text-white border-[#064E3B]'
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Special Requests or Learning Needs (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us about the student's learning pace, temperament, or specific goals..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20"
                  />
                </div>
              </div>

              {/* Submit & Guarantees */}
              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <ShieldCheck className="w-4 h-4 text-[#0D7A4D]" />
                  <span>Zero upfront payment • Cancel anytime</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#064E3B] to-[#0D7A4D] hover:from-[#053c2d] hover:to-[#085233] shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Free Trial Request</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
