import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';

export const FaqPreview: React.FC = () => {
  const { faqs, navigateTo } = useAcademy();
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const publishedFaqs = faqs.filter(f => f.isPublished).slice(0, 6);

  const toggleFaq = (id: string) => {
    setOpenId(prev => prev === id ? null : id);
  };

  return (
    <section className="py-20 bg-[#FAF8F2] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0D7A4D] bg-[#064E3B]/5 px-3.5 py-1.5 rounded-full">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#064E3B] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-gray-600">
            Everything you need to know about our online Quran classes, scheduling, and teacher assignments.
          </p>
        </div>

        <div className="space-y-3">
          {publishedFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden transition-all duration-200 shadow-xs"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                >
                  <span className="text-sm sm:text-base font-bold text-gray-900 flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#0D7A4D] shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#064E3B]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-50 animate-in fade-in duration-150">
                    <p className="mt-2.5">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => navigateTo('faq')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#064E3B] hover:text-[#0D7A4D] underline underline-offset-4 cursor-pointer"
          >
            <span>View All Academy FAQs ({faqs.length} Questions Answered)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
