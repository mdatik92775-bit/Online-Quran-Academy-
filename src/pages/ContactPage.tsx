import React, { useState } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Copy,
  Check
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings, openWhatsApp, openTrialModal } = useAcademy();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [subject, setSubject] = useState('Course Inquiry');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    setIsSent(true);
  };

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText(settings.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F2] pb-24">
      {/* Banner */}
      <section className="bg-gradient-to-r from-[#064E3B] via-[#053D2E] to-[#064E3B] text-white py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-white/10 px-4 py-1.5 rounded-full inline-block">
            We Are Here to Help
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white">
            Contact Online Quran Academy
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Have questions about course placement, custom schedules, or tuition? Reach out via WhatsApp or submit your inquiry below.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp Priority Card */}
            <div className="bg-gradient-to-br from-[#064E3B] to-[#0D7A4D] rounded-3xl p-8 text-white shadow-xl space-y-4 relative overflow-hidden">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                  <MessageCircle className="w-6 h-6 text-[#25D366] fill-[#25D366]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-display">Instant WhatsApp Support</h3>
                  <p className="text-xs text-emerald-200">Fastest response channel</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                Connect directly with our chief academic coordinator for immediate timetable arrangements, teacher inquiries, and trial booking.
              </p>

              <div className="bg-white/10 rounded-2xl p-4 border border-white/15 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-bold text-[#D4AF37]">Primary Contact</p>
                  <p className="text-lg font-bold text-white tracking-wider">{settings.phone}</p>
                </div>

                <button
                  onClick={copyPhoneNumber}
                  className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Copy number"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>

              <button
                onClick={() => openWhatsApp()}
                className="w-full py-3 rounded-xl font-bold text-xs text-gray-950 bg-[#D4AF37] hover:bg-[#e0be47] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <MessageCircle className="w-4 h-4 text-[#064E3B]" />
                <span>Start WhatsApp Chat Now</span>
              </button>
            </div>

            {/* General Details */}
            <div className="bg-white rounded-3xl p-8 shadow-xs border border-gray-200/80 space-y-4 text-xs sm:text-sm text-gray-700">
              <h4 className="text-base font-bold text-gray-900 font-display">
                Academy Office & Support
              </h4>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#064E3B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-900">Telephone / WhatsApp:</span>
                  <p>{settings.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#064E3B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-900">Email:</span>
                  <p>{settings.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#064E3B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-900">Global Campus:</span>
                  <p>{settings.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#064E3B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-900">Class Hours:</span>
                  <p>24 Hours a Day • 7 Days a Week (All Global Timezones)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-gray-200/80">
              {isSent ? (
                <div className="text-center py-12 space-y-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 font-display">
                    JazakAllah Khair, {name}!
                  </h3>
                  <p className="text-sm text-gray-600 max-w-md mx-auto">
                    Your inquiry has been submitted. An academic coordinator will get back to you via WhatsApp at <strong className="text-emerald-800">{whatsapp || 'your phone'}</strong> or via email.
                  </p>
                  <button
                    onClick={() => setIsSent(false)}
                    className="px-6 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-xs hover:bg-gray-200"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold font-display text-gray-900">
                    Send Us an Inquiry
                  </h3>
                  <p className="text-xs text-gray-500 mb-4">
                    Leave your contact details and our team will get in touch shortly.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tariq Jamil"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+8801746349167 or +44..."
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="youremail@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Inquiry Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20 bg-white"
                    >
                      <option value="Course Inquiry">Course Inquiry & Placement</option>
                      <option value="Free Trial Questions">Free Trial Questions</option>
                      <option value="Timetable / Scheduling">Timetable / Scheduling Options</option>
                      <option value="Teacher Assignment">Request Specific Male / Female Teacher</option>
                      <option value="Fees & Billing">Fees & Payment Assistance</option>
                      <option value="Other">Other Question</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please write your inquiry here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#064E3B] to-[#0D7A4D] hover:from-[#053c2d] hover:to-[#085233] shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
