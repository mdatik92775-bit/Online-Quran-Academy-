import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { settings, openWhatsApp } = useAcademy();
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState("Assalamu Alaikum, I would like to know more about Online Quran Academy.");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsApp(userMsg);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Quick Chat Popup Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-white rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Card Header */}
          <div className="bg-[#064E3B] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center border-2 border-emerald-400">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#064E3B] rounded-full"></span>
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">Online Quran Academy</h4>
                <p className="text-[11px] text-emerald-200">Direct Support • Typically replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white p-1 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Card Body */}
          <div className="p-4 bg-[#F8FAF8] space-y-3">
            <div className="bg-white p-3 rounded-xl rounded-tl-xs shadow-xs border border-gray-100 text-xs text-gray-800 space-y-1">
              <p className="font-semibold text-emerald-900 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                Assalamu Alaikum!
              </p>
              <p className="text-gray-600">
                Welcome to Online Quran Academy. How may we assist your Quran learning journey today?
              </p>
              <p className="text-[10px] text-gray-400 text-right">01746349167</p>
            </div>

            <form onSubmit={handleSend} className="space-y-2">
              <textarea
                value={userMsg}
                onChange={(e) => setUserMsg(e.target.value)}
                rows={3}
                placeholder="Type your message..."
                className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20 bg-white"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-emerald-600 to-[#064E3B] hover:from-emerald-700 hover:to-[#043427] shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Start Chat on WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        aria-label="Chat on WhatsApp"
        title="WhatsApp: 01746349167"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border border-white"></span>
        </span>
        <MessageCircle className="w-7 h-7 fill-white" />
      </button>
    </div>
  );
};
