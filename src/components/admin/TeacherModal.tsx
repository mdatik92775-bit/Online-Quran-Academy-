import React, { useState, useEffect } from 'react';
import { Teacher } from '../../types';
import { X, Save, Sparkles } from 'lucide-react';

interface TeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: Partial<Teacher> | null;
  onSave: (teacherData: Partial<Teacher>) => void;
  lang?: 'bn' | 'en';
}

export const TeacherModal: React.FC<TeacherModalProps> = ({
  isOpen,
  onClose,
  teacher,
  onSave,
  lang = 'bn'
}) => {
  const [formData, setFormData] = useState<Partial<Teacher>>({
    name: '',
    title: 'Senior Tajweed & Quran Instructor',
    gender: 'male',
    qualification: 'Ijazah in Hafs an Asim, Jamia Graduate',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    specialization: ['Noorani Qaida', 'Tajweed Mastery', 'Kids Classes'],
    experienceYears: 6,
    languages: ['English', 'Bangla', 'Arabic'],
    bio: 'Experienced Quran tutor dedicated to teaching with patience and authentic pronunciation.',
    teachingStyle: 'Supportive, interactive and friendly for kids and adults.',
    availabilityHours: 'Flexible shifts (Morning & Evening slots GMT+6)',
    availableCourses: ['Noorani Qaida Course', 'Quran with Tajweed'],
    rating: 5.0,
    reviewCount: 45,
    isPublished: true
  });

  const [specInput, setSpecInput] = useState('');
  const [langInput, setLangInput] = useState('');

  useEffect(() => {
    if (teacher) {
      setFormData({
        ...teacher,
        specialization: teacher.specialization || ['Noorani Qaida', 'Tajweed'],
        languages: teacher.languages || ['English', 'Bangla']
      });
      setSpecInput((teacher.specialization || []).join(', '));
      setLangInput((teacher.languages || []).join(', '));
    }
  }, [teacher]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const specs = specInput.split(',').map(s => s.trim()).filter(Boolean);
    const langs = langInput.split(',').map(l => l.trim()).filter(Boolean);

    onSave({
      ...formData,
      specialization: specs.length ? specs : ['Tajweed', 'Noorani Qaida'],
      languages: langs.length ? langs : ['English', 'Bangla']
    });
  };

  const presetPhotos = [
    { label: 'Hafiz Atikur Rahman', url: '/images/teachers/hafiz_atikur_rahman.jpg' },
    { label: 'Male Tutor 1', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80' },
    { label: 'Male Tutor 2', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80' },
    { label: 'Female Tutor 1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80' },
    { label: 'Female Tutor 2', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-xl font-bold font-display text-gray-900">
              {formData.id 
                ? (lang === 'bn' ? 'শিক্ষকের প্রোফাইল এডিট করুন' : 'Edit Teacher Profile') 
                : (lang === 'bn' ? 'নতুন শিক্ষক/শিক্ষিকা যোগ করুন' : 'Add New Teacher')}
            </h3>
            <p className="text-xs text-gray-500">
              {lang === 'bn' 
                ? 'শিক্ষকের নাম, শিক্ষাগত যোগ্যতা, ইজাজাহ এবং বায়ো আপডেট করুন।' 
                : 'Configure teacher credentials, qualifications, languages, and bio.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-bold text-gray-700">
                {lang === 'bn' ? 'শিক্ষকের পূর্ণ নাম *' : 'Teacher Full Name *'}
              </label>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Shaykh Hafiz Abdullah"
                className="w-full p-2.5 text-sm rounded-xl border border-gray-300"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-gray-700">
                {lang === 'bn' ? 'পদবী / টাইটেল' : 'Designation / Title'}
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Senior Quran & Tajweed Specialist"
                className="w-full p-2.5 text-sm rounded-xl border border-gray-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="block font-bold text-gray-700">
                {lang === 'bn' ? 'লিঙ্গ (Gender)' : 'Gender'}
              </label>
              <select
                value={formData.gender || 'male'}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                className="w-full p-2.5 rounded-xl border border-gray-300 bg-white text-xs font-semibold"
              >
                <option value="male">Male (পুরুষ শিক্ষক / ক্বারী)</option>
                <option value="female">Female (মহিলা শিক্ষিকা / উস্তাযা)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-gray-700">
                {lang === 'bn' ? 'অভিজ্ঞতা (Years)' : 'Experience (Years)'}
              </label>
              <input
                type="number"
                min={0}
                max={50}
                value={formData.experienceYears || 5}
                onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                className="w-full p-2 rounded-xl border border-gray-300"
              />
            </div>

            <div className="col-span-2 sm:col-span-1 space-y-1">
              <label className="block font-bold text-gray-700">
                {lang === 'bn' ? 'রেটিং (Rating)' : 'Rating'}
              </label>
              <input
                type="number"
                step="0.1"
                min={1}
                max={5}
                value={formData.rating || 5.0}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                className="w-full p-2 rounded-xl border border-gray-300"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-bold text-gray-700">
              {lang === 'bn' ? 'শিক্ষাগত যোগ্যতা ও ইজাজাহ *' : 'Qualification & Ijazah *'}
            </label>
            <input
              type="text"
              required
              value={formData.qualification || ''}
              onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
              placeholder="e.g. Hafiz-ul-Quran, Ijazah in 10 Qira'at, Masters in Islamic Studies"
              className="w-full p-2.5 text-sm rounded-xl border border-gray-300"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block font-bold text-gray-700">
                {lang === 'bn' ? 'বিশেষজ্ঞতা (কমা দিয়ে আলাদা করুন)' : 'Specializations (comma separated)'}
              </label>
              <input
                type="text"
                value={specInput}
                onChange={(e) => setSpecInput(e.target.value)}
                placeholder="Noorani Qaida, Tajweed, Kids Classes"
                className="w-full p-2 rounded-xl border border-gray-300"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-gray-700">
                {lang === 'bn' ? 'ভাষাসমূহ (কমা দিয়ে আলাদা করুন)' : 'Languages (comma separated)'}
              </label>
              <input
                type="text"
                value={langInput}
                onChange={(e) => setLangInput(e.target.value)}
                placeholder="English, Bangla, Arabic"
                className="w-full p-2 rounded-xl border border-gray-300"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-bold text-gray-700">
              {lang === 'bn' ? 'ক্লাসের সময়সূচী / শিফট' : 'Availability / Class Shifts'}
            </label>
            <input
              type="text"
              value={formData.availabilityHours || ''}
              onChange={(e) => setFormData({ ...formData, availabilityHours: e.target.value })}
              placeholder="e.g. Mon-Sat (8:00 AM - 10:00 PM GMT+6)"
              className="w-full p-2 rounded-xl border border-gray-300"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-bold text-gray-700">
              {lang === 'bn' ? 'বায়ো / পরিচয়মূলক তথ্য' : 'Teacher Bio / Intro'}
            </label>
            <textarea
              rows={2}
              value={formData.bio || ''}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-gray-300"
            />
          </div>

          {/* Photo URL */}
          <div className="space-y-1">
            <label className="block font-bold text-gray-700">
              {lang === 'bn' ? 'ছবি লিংক (Profile Photo URL)' : 'Photo URL'}
            </label>
            <input
              type="text"
              value={formData.photo || ''}
              onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
              className="w-full p-2 rounded-xl border border-gray-300"
            />
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[10px] text-gray-400 self-center">Presets:</span>
              {presetPhotos.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setFormData({ ...formData, photo: p.url })}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-gray-100 hover:bg-[#064E3B]/10 hover:text-[#064E3B] font-medium transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
            {formData.photo && (
              <div className="flex items-center gap-3 pt-2">
                <img
                  src={formData.photo}
                  alt="Preview"
                  className="w-14 h-14 rounded-xl object-cover border border-emerald-800/20 shadow-xs"
                  referrerPolicy="no-referrer"
                />
                <span className="text-xs text-gray-500">{lang === 'bn' ? 'ছবির প্রিভিউ' : 'Photo Preview'}</span>
              </div>
            )}
          </div>

          <label className="flex items-center gap-2 font-bold text-gray-700 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={formData.isPublished ?? true}
              onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
              className="accent-[#064E3B] w-4 h-4"
            />
            <span>{lang === 'bn' ? 'ওয়েবসাইটে প্রকাশ করুন (Published)' : 'Publish on Website'}</span>
          </label>

          {/* Actions */}
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
              className="px-7 py-2.5 rounded-xl text-white font-bold bg-[#064E3B] hover:bg-[#053c2d] shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4 text-[#D4AF37]" />
              <span>{lang === 'bn' ? 'প্রোফাইল সংরক্ষণ করুন' : 'Save Teacher Profile'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
