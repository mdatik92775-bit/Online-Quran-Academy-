import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { X, Sparkles, CheckCircle2, MessageCircle, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export const FreeTrialModal: React.FC = () => {
  const { 
    isTrialModalOpen, 
    closeTrialModal, 
    trialModalPreselectedCourse, 
    courses, 
    submitTrialRequest, 
    settings,
    openWhatsApp 
  } = useAcademy();

  const [studentName, setStudentName] = useState('');
  const [parentName, setParentName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [country, setCountry] = useState('Bangladesh');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [currentLevel, setCurrentLevel] = useState('Absolute Beginner (Never read Arabic)');
  const [preferredCourseTitle, setPreferredCourseTitle] = useState(trialModalPreselectedCourse || courses[0]?.title || 'Noorani Qaida Course');
  const [preferredTeacherGender, setPreferredTeacherGender] = useState<'male' | 'female' | 'any'>('any');
  const [selectedDays, setSelectedDays] = useState<string[]>(['Monday', 'Wednesday', 'Friday']);
  const [preferredTime, setPreferredTime] = useState('Evening (6:00 PM - 9:00 PM)');
  const [timezone, setTimezone] = useState('Asia/Dhaka (GMT+6)');
  const [message, setMessage] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedStudent, setSubmittedStudent] = useState('');

  if (!isTrialModalOpen) return null;

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
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // safe fallback
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setStudentName('');
    setParentName('');
    setWhatsapp('');
    setEmail('');
    closeTrialModal();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-emerald-900/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#064E3B] via-[#0D7A4D] to-[#064E3B] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display tracking-tight text-[#FAF8F2]">
                Book Your 3-Day Free Trial
              </h3>
              <p className="text-xs text-white/80">
                100% Free • No Credit Card Required • Male & Female Tutors
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h4 className="text-2xl font-bold text-gray-900 font-display">
                Thank you, {submittedStudent}!
              </h4>
              <p className="text-gray-600 text-sm max-w-md mx-auto">
                Our academic coordinator has received your trial registration and will contact you via WhatsApp at <strong className="text-emerald-800">{whatsapp}</strong> within a few hours to confirm your trial class timing.
              </p>
            </div>

            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 text-left max-w-md mx-auto space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#064E3B]" />
                Next Step:
              </p>
              <p>
                To expedite scheduling, you may also message our chief coordinator directly on WhatsApp:
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  openWhatsApp(`Assalamu Alaikum, I just booked a free trial class for student: ${submittedStudent} in course: ${preferredCourseTitle}. My WhatsApp is: ${whatsapp}.`);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant Confirmation on WhatsApp</span>
              </button>
              <button
                onClick={handleResetAndClose}
                className="w-full sm:w-auto px-5 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Student Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zayd Al-Mansoor"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Parent / Guardian Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mansoor Ali (or Self for adults)"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B]"
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
                  placeholder="e.g. 8"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Gender *
                </label>
                <div className="flex gap-4 pt-1">
                  <label className="flex items-center gap-1.5 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      checked={gender === 'male'}
                      onChange={() => setGender('male')}
                      className="accent-[#064E3B]"
                    />
                    <span>Male</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      checked={gender === 'female'}
                      onChange={() => setGender('female')}
                      className="accent-[#064E3B]"
                    />
                    <span>Female</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  WhatsApp Number (with country code) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+8801746349167 or +1..."
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B]"
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
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Country of Residence *
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B] bg-white"
                >
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Germany">Germany</option>
                  <option value="Other">Other Country</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Preferred Course *
                </label>
                <select
                  value={preferredCourseTitle}
                  onChange={(e) => setPreferredCourseTitle(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B] bg-white"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.title}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Current Quran Level
                </label>
                <select
                  value={currentLevel}
                  onChange={(e) => setCurrentLevel(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B] bg-white"
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
                  Teacher Gender Preference
                </label>
                <select
                  value={preferredTeacherGender}
                  onChange={(e) => setPreferredTeacherGender(e.target.value as any)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B] bg-white"
                >
                  <option value="any">Any Qualified Teacher</option>
                  <option value="female">Female Teacher (Ustadha)</option>
                  <option value="male">Male Teacher (Shaykh / Qari)</option>
                </select>
              </div>
            </div>

            {/* Preferred Days */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Preferred Days for Classes (Select 2 or more):
              </label>
              <div className="flex flex-wrap gap-2">
                {daysOptions.map(day => {
                  const isSelected = selectedDays.includes(day);
                  return (
                    <button
                      type="button"
                      key={day}
                      onClick={() => toggleDay(day)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                        isSelected 
                          ? 'bg-[#064E3B] text-white border-[#064E3B]' 
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Preferred Time & Timezone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Preferred Time Slot
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B] bg-white"
                >
                  <option value="Morning (7:00 AM - 11:00 AM)">Morning (7:00 AM - 11:00 AM)</option>
                  <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM - 5:00 PM)</option>
                  <option value="Evening (6:00 PM - 9:00 PM)">Evening (6:00 PM - 9:00 PM)</option>
                  <option value="Night (9:00 PM - 12:00 AM)">Night (9:00 PM - 12:00 AM)</option>
                  <option value="Weekend Mornings">Weekend Mornings</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Your Timezone
                </label>
                <input
                  type="text"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  placeholder="e.g. GMT+6 / EST / GMT"
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Special Requests or Notes (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Tell us about student goals, learning pace, or preferred teaching style..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full text-sm px-3.5 py-2 rounded-lg border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B]"
              />
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-gray-100">
              <p className="text-[11px] text-gray-500">
                Primary Contact / WhatsApp: <strong className="text-gray-800">{settings.phone}</strong>
              </p>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#064E3B] to-[#0D7A4D] hover:from-[#053d2e] hover:to-[#09603c] shadow-md shadow-[#064E3B]/20 flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Book My Free Trial</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
