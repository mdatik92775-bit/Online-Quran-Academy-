import React, { useState } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { Search, ChevronDown, HelpCircle, Sparkles, MessageCircle, Filter } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const { faqs, openTrialModal, openWhatsApp, settings } = useAcademy();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const publishedFaqs = faqs.filter(f => f.isPublished);

  const filteredFaqs = publishedFaqs.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedCategory === 'all') return true;
    return faq.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F2] pb-24">
      {/* Banner */}
      <section className="bg-gradient-to-r from-[#064E3B] via-[#053D2E] to-[#064E3B] text-white py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-white/10 px-4 py-1.5 rounded-full inline-block">
            Support & Knowledgebase
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Find immediate answers regarding our online classes, teacher credentials, scheduling flexibility, and fees.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 space-y-8">
        {/* Search & Categories */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/80 p-5 space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
            <span className="text-xs font-bold text-gray-500 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Category:
            </span>
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'general', label: 'General & Academy' },
              { id: 'classes', label: 'Classes & Zoom' },
              { id: 'teachers', label: 'Teachers & Ijazah' },
              { id: 'fees', label: 'Pricing & Payments' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-[#064E3B] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden transition-all duration-200 shadow-xs"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
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

        {/* Still have questions? */}
        <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-xs text-center space-y-4">
          <h3 className="text-xl font-bold font-display text-gray-900">
            Still Have a Question?
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
            Our student academic coordinator is active on WhatsApp to answer custom queries regarding your child or timezone.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => openWhatsApp("Assalamu Alaikum, I have a question about Online Quran Academy.")}
              className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-emerald-700 hover:bg-emerald-800 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask on WhatsApp: {settings.phone}</span>
            </button>
            <button
              onClick={() => openTrialModal()}
              className="px-6 py-3 rounded-xl font-bold text-xs text-gray-900 bg-[#D4AF37] hover:bg-[#e0be47] transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#064E3B]" />
              <span>Book 3-Day Free Trial</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
