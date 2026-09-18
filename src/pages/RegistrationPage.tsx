import React, { useState } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { Sparkles, CheckCircle2, MessageCircle, Send, ShieldCheck, CreditCard, Coins } from 'lucide-react';
import confetti from 'canvas-confetti';

export const RegistrationPage: React.FC = () => {
  const { 
    courses, 
    pricingPlans, 
    formatPrice, 
    activeCurrency, 
    submitRegistration, 
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
  const [selectedCourseTitle, setSelectedCourseTitle] = useState(courses[0]?.title || 'Noorani Qaida Course');
  const [selectedPlanId, setSelectedPlanId] = useState(pricingPlans[1]?.id || pricingPlans[0]?.id || 'plan-2');
  const [teacherGender, setTeacherGender] = useState<'male' | 'female' | 'any'>('any');
  const [selectedDays, setSelectedDays] = useState<string[]>(['Monday', 'Wednesday', 'Friday']);
  const [preferredTime, setPreferredTime] = useState('Evening (6:00 PM - 9:00 PM)');
  const [paymentMethod, setPaymentMethod] = useState('bKash / Nagad');
  const [notes, setNotes] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState('');

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

  const selectedPlan = pricingPlans.find(p => p.id === selectedPlanId) || pricingPlans[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !whatsapp) return;

    submitRegistration({
      studentName,
      parentName: parentName || 'Self',
      age: age || '10',
      gender,
      country,
      email: email || 'student@example.com',
      whatsapp,
      courseTitle: selectedCourseTitle,
      planName: selectedPlan.name,
      teacherGender,
      daysPerWeek: selectedDays.length,
      preferredDays: selectedDays,
      preferredTime,
      paymentMethod,
      monthlyFeeAmount: formatPrice(selectedPlan.prices),
      notes
    });

    setSubmittedName(studentName);
    setIsSubmitted(true);

    try {
      confetti({ particleCount: 110, spread: 85, origin: { y: 0.6 } });
    } catch (err) {
      // safe fallback
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F2] pb-24">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#064E3B] via-[#053D2E] to-[#064E3B] text-white py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-white/10 px-4 py-1.5 rounded-full inline-block">
            Official Admission Form
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white">
            Enroll in Online Quran Academy
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Complete your registration for structured monthly classes with verified male & female teachers.
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
                  Registration Received, {submittedName}!
                </h3>
                <p className="text-gray-600 text-sm max-w-lg mx-auto">
                  Our academic registrar has received your enrollment for <strong className="text-emerald-900">{selectedCourseTitle}</strong> on the <strong className="text-emerald-900">{selectedPlan.name}</strong>. An admissions officer will contact you via WhatsApp at <strong className="text-emerald-800">{whatsapp}</strong> to finalize your schedule and provide orientation.
                </p>
              </div>

              <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 max-w-md mx-auto text-left space-y-2">
                <p className="font-bold flex items-center gap-1.5 text-sm">
                  <CreditCard className="w-4 h-4 text-[#064E3B]" />
                  Fee & Invoice Information:
                </p>
                <p>
                  Estimated Monthly Fee: <strong className="text-base text-[#064E3B]">{formatPrice(selectedPlan.prices)}</strong> ({selectedPlan.classesPerMonth} classes/month). Payment is only processed after teacher matching!
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => openWhatsApp(`Assalamu Alaikum, I just submitted the official admission form for ${submittedName} in ${selectedCourseTitle} (${selectedPlan.name}). WhatsApp: ${whatsapp}.`)}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-emerald-700 hover:bg-emerald-800 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                  <span>Notify Registrar on WhatsApp: {settings.phone}</span>
                </button>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm text-gray-700 bg-gray-100 hover:bg-gray-200"
                >
                  Register Another Student
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Student info */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#064E3B] border-b border-gray-100 pb-2">
                  1. Student & Contact Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Student Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ibrahim Mansoor"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Parent / Guardian Name (or Self)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mansoor Ahmed"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20"
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
                      placeholder="e.g. 10"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20"
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
                          name="reg-gender"
                          checked={gender === 'male'}
                          onChange={() => setGender('male')}
                          className="accent-[#064E3B]"
                        />
                        <span>Male</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="radio"
                          name="reg-gender"
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
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="family@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Country of Residence *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bangladesh, United Kingdom, USA..."
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20"
                    />
                  </div>
                </div>
              </div>

              {/* Plan & Course selection */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h3 className="text-base font-bold text-[#064E3B] border-b border-gray-100 pb-2">
                  2. Plan & Course Selection
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Select Course *
                    </label>
                    <select
                      value={selectedCourseTitle}
                      onChange={(e) => setSelectedCourseTitle(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20 bg-white"
                    >
                      {courses.map(c => (
                        <option key={c.id} value={c.title}>{c.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Select Monthly Plan *
                    </label>
                    <select
                      value={selectedPlanId}
                      onChange={(e) => setSelectedPlanId(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20 bg-white"
                    >
                      {pricingPlans.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.classesPerMonth} classes/mo) - {formatPrice(p.prices)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Teacher Gender Preference
                    </label>
                    <select
                      value={teacherGender}
                      onChange={(e) => setTeacherGender(e.target.value as any)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20 bg-white"
                    >
                      <option value="any">Any Qualified Teacher</option>
                      <option value="female">Female Teacher (Ustadha)</option>
                      <option value="male">Male Teacher (Qari)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Preferred Payment Method
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20 bg-white"
                    >
                      <option value="bKash / Nagad">bKash / Nagad (Mobile Banking)</option>
                      <option value="Bank Transfer">Direct Bank Transfer</option>
                      <option value="Credit / Debit Card">Credit / Debit Card (Stripe)</option>
                      <option value="PayPal / Wise">PayPal / Wise</option>
                    </select>
                  </div>
                </div>

                {/* Days */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Preferred Class Days:
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

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Special Notes or Goals
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Any specific instructions for the instructor..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full text-sm px-3.5 py-2 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20"
                  />
                </div>
              </div>

              {/* Fee summary card */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-medium">Selected Plan Total</p>
                  <p className="text-lg font-bold text-[#064E3B]">{selectedPlan.name} • {selectedPlan.classesPerMonth} Classes/Mo</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-[#064E3B] font-display">
                    {formatPrice(selectedPlan.prices)}
                  </span>
                  <span className="text-xs text-gray-500"> / month</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <ShieldCheck className="w-4 h-4 text-[#0D7A4D]" />
                  <span>Includes 100% money-back guarantee for initial classes</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#064E3B] to-[#0D7A4D] hover:from-[#053c2d] hover:to-[#085233] shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Full Enrollment</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
