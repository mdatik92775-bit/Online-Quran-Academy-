import React, { useState, useEffect } from 'react';
import { BlogPost } from '../../types';
import { X, Save } from 'lucide-react';

interface BlogPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Partial<BlogPost> | null;
  onSave: (postData: Partial<BlogPost>) => void;
  lang?: 'bn' | 'en';
}

export const BlogPostModal: React.FC<BlogPostModalProps> = ({
  isOpen,
  onClose,
  post,
  onSave,
  lang = 'bn'
}) => {
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    author: 'Shaykh Abdullah Al-Mamun',
    category: 'Tajweed & Recitation',
    excerpt: '',
    content: '',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80',
    tags: ['Tajweed', 'Quran', 'Tips'],
    readTime: '5 min read',
    publishedAt: new Date().toISOString().split('T')[0],
    isPublished: true
  });

  const [tagsInput, setTagsInput] = useState('');

  useEffect(() => {
    if (post) {
      setFormData(post);
      setTagsInput((post.tags || []).join(', '));
    }
  }, [post]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    onSave({
      ...formData,
      tags: tags.length ? tags : ['Quran', 'Learning']
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 className="text-xl font-bold font-display text-gray-900">
            {formData.id 
              ? (lang === 'bn' ? 'আর্টিকেল এডিট করুন' : 'Edit Article') 
              : (lang === 'bn' ? 'নতুন ইসলামিক আর্টিকেল তৈরি করুন' : 'Write New Article')}
          </h3>
          <button onClick={onClose} className="p-2 rounded-xl text-gray-400 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="block font-bold text-gray-700">
              {lang === 'bn' ? 'আর্টিকেল শিরোনাম (Title) *' : 'Article Title *'}
            </label>
            <input
              type="text"
              required
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2.5 text-sm rounded-xl border border-gray-300"
              placeholder="e.g. 5 Simple Rules for Perfecting Tajweed"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block font-bold text-gray-700">
                {lang === 'bn' ? 'লেখক (Author)' : 'Author'}
              </label>
              <input
                type="text"
                value={formData.author || ''}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full p-2 rounded-xl border border-gray-300"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-bold text-gray-700">
                {lang === 'bn' ? 'ক্যাটাগরি' : 'Category'}
              </label>
              <select
                value={formData.category || 'Tajweed & Recitation'}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2 rounded-xl border border-gray-300 bg-white"
              >
                <option value="Tajweed & Recitation">Tajweed & Recitation</option>
                <option value="Quran Memorization">Quran Memorization</option>
                <option value="Kids Education">Kids Education</option>
                <option value="Islamic Lifestyle">Islamic Lifestyle</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-bold text-gray-700">
              {lang === 'bn' ? 'সংক্ষিপ্ত সারাংশ (Excerpt) *' : 'Excerpt *'}
            </label>
            <textarea
              rows={2}
              required
              value={formData.excerpt || ''}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-gray-300"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-bold text-gray-700">
              {lang === 'bn' ? 'সম্পূর্ণ আর্টিকেল কন্টেন্ট (Full Content) *' : 'Full Content *'}
            </label>
            <textarea
              rows={6}
              required
              value={formData.content || ''}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-gray-300 font-mono text-xs"
              placeholder="Write or paste your article text here..."
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block font-bold text-gray-700">
                {lang === 'bn' ? 'ট্যাগসমূহ (কমা দিয়ে আলাদা করুন)' : 'Tags (comma separated)'}
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Tajweed, Hifz, Kids"
                className="w-full p-2 rounded-xl border border-gray-300"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-bold text-gray-700">
                {lang === 'bn' ? 'কভার ইমেজ URL' : 'Cover Image URL'}
              </label>
              <input
                type="text"
                value={formData.image || ''}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full p-2 rounded-xl border border-gray-300"
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
              <span>{lang === 'bn' ? 'আর্টিকেল প্রকাশ করুন' : 'Save Article'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
