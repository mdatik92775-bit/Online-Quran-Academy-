import React, { useState, useEffect } from 'react';
import { FAQItem } from '../../types';
import { X, Save } from 'lucide-react';

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
  faq: Partial<FAQItem> | null;
  onSave: (faqData: Partial<FAQItem>) => void;
  lang?: 'bn' | 'en';
}

export const FaqModal: React.FC<FaqModalProps> = ({
  isOpen,
  onClose,
  faq,
  onSave,
  lang = 'bn'
}) => {
  const [formData, setFormData] = useState<Partial<FAQItem>>({
    question: '',
    answer: '',
    category: 'General',
    order: 1,
    isPublished: true
  });

  useEffect(() => {
    if (faq) {
      setFormData(faq);
    }
  }, [faq]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question || !formData.answer) return;
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 className="text-lg font-bold font-display text-gray-900">
            {formData.id 
              ? (lang === 'bn' ? 'প্রশ্নোত্তর এডিট করুন' : 'Edit FAQ') 
              : (lang === 'bn' ? 'নতুন প্রশ্নোত্তর (FAQ) যোগ করুন' : 'Add New FAQ')}
          </h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="block font-bold text-gray-700">
              {lang === 'bn' ? 'প্রশ্ন (Question) *' : 'Question *'}
            </label>
            <input
              type="text"
              required
              value={formData.question || ''}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              className="w-full p-2.5 text-sm rounded-xl border border-gray-300"
              placeholder="e.g. Can we reschedule a missed class?"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-bold text-gray-700">
              {lang === 'bn' ? 'উত্তর (Answer) *' : 'Answer *'}
            </label>
            <textarea
              rows={4}
              required
              value={formData.answer || ''}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-gray-300 text-xs"
              placeholder="Provide a clear, reassuring answer..."
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block font-bold text-gray-700">
                {lang === 'bn' ? 'ক্যাটাগরি' : 'Category'}
              </label>
              <select
                value={formData.category || 'General'}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full p-2 rounded-xl border border-gray-300 bg-white"
              >
                <option value="General">General</option>
                <option value="Classes">Classes</option>
                <option value="Teachers">Teachers</option>
                <option value="Pricing">Pricing</option>
                <option value="Trial">Trial</option>
                <option value="Technical">Technical</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-gray-700">
                {lang === 'bn' ? 'সিরিয়াল ক্রম (Order)' : 'Display Order'}
              </label>
              <input
                type="number"
                value={formData.order || 1}
                onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                className="w-full p-2 rounded-xl border border-gray-300 bg-white"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-gray-600 bg-gray-100 hover:bg-gray-200 font-bold"
            >
              {lang === 'bn' ? 'বাতিল' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl text-white bg-[#064E3B] hover:bg-[#053c2d] font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4 text-[#D4AF37]" />
              <span>{lang === 'bn' ? 'সংরক্ষণ করুন' : 'Save FAQ'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
