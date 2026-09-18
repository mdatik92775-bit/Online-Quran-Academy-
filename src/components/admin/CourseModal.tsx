import React, { useState, useEffect } from 'react';
import { Course } from '../../types';
import { X, Save, Image as ImageIcon, Sparkles } from 'lucide-react';

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Partial<Course> | null;
  onSave: (courseData: Partial<Course>) => void;
  lang?: 'bn' | 'en';
}

export const CourseModal: React.FC<CourseModalProps> = ({
  isOpen,
  onClose,
  course,
  onSave,
  lang = 'bn'
}) => {
  const [formData, setFormData] = useState<Partial<Course>>({
    title: '',
    subtitle: '',
    category: 'qaida',
    description: '',
    duration: '3 Months',
    classDuration: '30 Minutes',
    classesPerWeek: 3,
    suitableAge: 'Kids (4+) & Adults',
    teacherType: 'Male & Female Available',
    image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=800&q=80',
    priceMonthly: {
      bdt: 2500,
      usd: 35,
      gbp: 28,
      eur: 32,
      cad: 45,
      aud: 50,
      aed: 130
    },
    isFeatured: false,
    isPublished: true,
    objectives: ['Recite Quran fluently with Tajweed'],
    whoShouldJoin: ['Kids and beginners']
  });

  useEffect(() => {
    if (course) {
      setFormData({
        ...course,
        priceMonthly: course.priceMonthly || {
          bdt: 2500,
          usd: 35,
          gbp: 28,
          eur: 32,
          cad: 45,
          aud: 50,
          aed: 130
        }
      });
    }
  }, [course]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;
    onSave(formData);
  };

  const presetImages = [
    { label: 'Quran & Rehal', url: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=800&q=80' },
    { label: 'Mosque Arch', url: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80' },
    { label: 'Kids Learning', url: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80' },
    { label: 'Tajweed Study', url: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=800&q=80' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-xl font-bold font-display text-gray-900">
              {formData.id 
                ? (lang === 'bn' ? 'কোর্স এডিট করুন' : 'Edit Course') 
                : (lang === 'bn' ? 'নতুন কোর্স যোগ করুন' : 'Add New Course')}
            </h3>
            <p className="text-xs text-gray-500">
              {lang === 'bn' 
                ? 'কোর্সের বিস্তারিত বিবরণ, মাসিক ফি এবং ক্লাস সময়সূচী নির্ধারণ করুন।' 
                : 'Configure course details, curriculum, duration and monthly fees.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1">
              <label className="block font-bold text-gray-700">
                {lang === 'bn' ? 'কোর্সের শিরোনাম (Title) *' : 'Course Title *'}
              </label>
              <input
                type="text"
                required
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder={lang === 'bn' ? 'যেমন: নূরানী কায়েদা কোর্স' : 'e.g. Noorani Qaida Course'}
                className="w-full p-2.5 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#064E3B]/20"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-gray-700">
                {lang === 'bn' ? 'ক্যাটাগরি (Category)' : 'Category'}
              </label>
              <select
                value={formData.category || 'qaida'}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full p-2.5 text-sm rounded-xl border border-gray-300 bg-white"
              >
                <option value="qaida">Noorani Qaida</option>
                <option value="reading">Quran Reading (Nazra)</option>
                <option value="tajweed">Tajweed Rules</option>
                <option value="hifz">Quran Memorization (Hifz)</option>
                <option value="translation">Translation & Tafseer</option>
                <option value="islamic_studies">Islamic Studies</option>
                <option value="kids">Kids Quran Classes</option>
                <option value="adults">Adults Classes</option>
              </select>
            </div>
          </div>

          {/* Subtitle */}
          <div className="space-y-1">
            <label className="block font-bold text-gray-700">
              {lang === 'bn' ? 'সংক্ষিপ্ত সারসংক্ষেপ (Subtitle / Tagline)' : 'Short Subtitle'}
            </label>
            <input
              type="text"
              value={formData.subtitle || ''}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              placeholder="The essential foundation for beginner learners to recite Quran with correct pronunciation."
              className="w-full p-2.5 text-sm rounded-xl border border-gray-300"
            />
          </div>

          {/* Full Description */}
          <div className="space-y-1">
            <label className="block font-bold text-gray-700">
              {lang === 'bn' ? 'বিস্তারিত বর্ণনা (Detailed Description) *' : 'Detailed Description *'}
            </label>
            <textarea
              rows={3}
              required
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2.5 text-sm rounded-xl border border-gray-300"
            />
          </div>

          {/* Age, Duration, Classes per week, Teacher Type */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FAF8F2] p-4 rounded-2xl border border-gray-200">
            <div className="space-y-1">
              <label className="block font-bold text-gray-700">
                {lang === 'bn' ? 'বয়সসীমা (Age Group)' : 'Suitable Age'}
              </label>
              <input
                type="text"
                value={formData.suitableAge || 'Kids & Adults'}
                onChange={(e) => setFormData({ ...formData, suitableAge: e.target.value })}
                className="w-full p-2 rounded-lg border border-gray-300 bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-gray-700">
                {lang === 'bn' ? 'কোর্সের মেয়াদ (Duration)' : 'Duration'}
              </label>
              <input
                type="text"
                value={formData.duration || '3 Months'}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full p-2 rounded-lg border border-gray-300 bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-gray-700">
                {lang === 'bn' ? 'ক্লাস সময় (Class Duration)' : 'Class Duration'}
              </label>
              <input
                type="text"
                value={formData.classDuration || '30 Minutes'}
                onChange={(e) => setFormData({ ...formData, classDuration: e.target.value })}
                className="w-full p-2 rounded-lg border border-gray-300 bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-gray-700">
                {lang === 'bn' ? 'সাপ্তাহিক ক্লাস' : 'Classes / Week'}
              </label>
              <input
                type="number"
                min={1}
                max={7}
                value={formData.classesPerWeek || 3}
                onChange={(e) => setFormData({ ...formData, classesPerWeek: Number(e.target.value) })}
                className="w-full p-2 rounded-lg border border-gray-300 bg-white"
              />
            </div>
          </div>

          {/* Teacher type */}
          <div className="space-y-1">
            <label className="block font-bold text-gray-700">
              {lang === 'bn' ? 'শিক্ষক প্রকার (Teacher Availability)' : 'Teacher Preference'}
            </label>
            <select
              value={formData.teacherType || 'Male & Female Available'}
              onChange={(e) => setFormData({ ...formData, teacherType: e.target.value as any })}
              className="w-full p-2 rounded-xl border border-gray-300 bg-white"
            >
              <option value="Male & Female Available">Male & Female Available (উভয় শিক্ষক উপলব্ধ)</option>
              <option value="Male Only">Male Only (শুধু পুরুষ শিক্ষক)</option>
              <option value="Female Only">Female Only (শুধু মহিলা শিক্ষিকা - উস্তাযা)</option>
            </select>
          </div>

          {/* Multi-Currency Monthly Prices */}
          <div className="space-y-2 bg-[#F4F1EA]/60 p-4 rounded-2xl border border-gray-200">
            <div className="flex items-center justify-between">
              <label className="font-bold text-gray-900 text-xs">
                {lang === 'bn' ? 'মাসিক ফি নির্ধারণ (Monthly Tuition Fee in All Currencies)' : 'Monthly Fees Across Currencies'}
              </label>
              <span className="text-[10px] text-[#064E3B] font-semibold">Live Conversion Values</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div>
                <label className="block font-semibold text-gray-600 text-[11px]">BDT (বাংলাদেশ ৳)</label>
                <input
                  type="number"
                  value={formData.priceMonthly?.bdt || 2500}
                  onChange={(e) => setFormData({
                    ...formData,
                    priceMonthly: { ...formData.priceMonthly!, bdt: Number(e.target.value) }
                  })}
                  className="w-full p-2 rounded-lg border border-gray-300 bg-white font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-600 text-[11px]">USD ($ USA)</label>
                <input
                  type="number"
                  value={formData.priceMonthly?.usd || 35}
                  onChange={(e) => setFormData({
                    ...formData,
                    priceMonthly: { ...formData.priceMonthly!, usd: Number(e.target.value) }
                  })}
                  className="w-full p-2 rounded-lg border border-gray-300 bg-white font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-600 text-[11px]">GBP (£ UK)</label>
                <input
                  type="number"
                  value={formData.priceMonthly?.gbp || 28}
                  onChange={(e) => setFormData({
                    ...formData,
                    priceMonthly: { ...formData.priceMonthly!, gbp: Number(e.target.value) }
                  })}
                  className="w-full p-2 rounded-lg border border-gray-300 bg-white font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-600 text-[11px]">EUR (€ Europe)</label>
                <input
                  type="number"
                  value={formData.priceMonthly?.eur || 32}
                  onChange={(e) => setFormData({
                    ...formData,
                    priceMonthly: { ...formData.priceMonthly!, eur: Number(e.target.value) }
                  })}
                  className="w-full p-2 rounded-lg border border-gray-300 bg-white font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-600 text-[11px]">CAD (Canada $)</label>
                <input
                  type="number"
                  value={formData.priceMonthly?.cad || 45}
                  onChange={(e) => setFormData({
                    ...formData,
                    priceMonthly: { ...formData.priceMonthly!, cad: Number(e.target.value) }
                  })}
                  className="w-full p-2 rounded-lg border border-gray-300 bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-600 text-[11px]">AUD (Australia $)</label>
                <input
                  type="number"
                  value={formData.priceMonthly?.aud || 50}
                  onChange={(e) => setFormData({
                    ...formData,
                    priceMonthly: { ...formData.priceMonthly!, aud: Number(e.target.value) }
                  })}
                  className="w-full p-2 rounded-lg border border-gray-300 bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-600 text-[11px]">AED (UAE Dirham)</label>
                <input
                  type="number"
                  value={formData.priceMonthly?.aed || 130}
                  onChange={(e) => setFormData({
                    ...formData,
                    priceMonthly: { ...formData.priceMonthly!, aed: Number(e.target.value) }
                  })}
                  className="w-full p-2 rounded-lg border border-gray-300 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="space-y-1.5">
            <label className="block font-bold text-gray-700">
              {lang === 'bn' ? 'কভার ছবি (Image URL)' : 'Cover Image URL'}
            </label>
            <input
              type="text"
              value={formData.image || ''}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-gray-300"
            />
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[10px] text-gray-400 self-center">Presets:</span>
              {presetImages.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setFormData({ ...formData, image: p.url })}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-gray-100 hover:bg-[#064E3B]/10 hover:text-[#064E3B] font-medium transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Published and Featured Toggles */}
          <div className="flex flex-wrap gap-6 pt-2">
            <label className="flex items-center gap-2 font-bold text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPublished ?? true}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                className="accent-[#064E3B] w-4 h-4"
              />
              <span>{lang === 'bn' ? 'ওয়েবসাইটে প্রকাশ করুন (Published)' : 'Publish on Website'}</span>
            </label>

            <label className="flex items-center gap-2 font-bold text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured ?? false}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="accent-[#064E3B] w-4 h-4"
              />
              <span>{lang === 'bn' ? 'ফিচার্ড কোর্স (Featured)' : 'Featured Course'}</span>
            </label>
          </div>

          {/* Footer Action Buttons */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-gray-600 bg-gray-100 hover:bg-gray-200 font-bold transition-colors cursor-pointer"
            >
              {lang === 'bn' ? 'বাতিল' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-7 py-2.5 rounded-xl text-white font-bold bg-[#064E3B] hover:bg-[#053d2e] shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4 text-[#D4AF37]" />
              <span>{lang === 'bn' ? 'কোর্স সংরক্ষণ করুন' : 'Save Course'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
