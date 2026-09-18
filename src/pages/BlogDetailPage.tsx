import React from 'react';
import { useAcademy } from '../context/AcademyContext';
import { Calendar, User, Clock, ArrowLeft, Sparkles, MessageCircle, Share2, Tag } from 'lucide-react';

export const BlogDetailPage: React.FC = () => {
  const { blogPosts, activeBlogSlug, navigateTo, openTrialModal, openWhatsApp, settings } = useAcademy();

  const post = blogPosts.find(p => p.slug === activeBlogSlug) || blogPosts[0];

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold font-display text-gray-800">Article Not Found</h2>
        <button
          onClick={() => navigateTo('blog')}
          className="px-6 py-2.5 rounded-xl bg-[#064E3B] text-white font-semibold text-sm"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F2] pb-24">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200/80 py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-gray-500">
          <button onClick={() => navigateTo('home')} className="hover:text-[#064E3B] transition-colors">
            Home
          </button>
          <span>/</span>
          <button onClick={() => navigateTo('blog')} className="hover:text-[#064E3B] transition-colors">
            Blog
          </button>
          <span>/</span>
          <span className="text-gray-900 font-semibold truncate">{post.title}</span>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="space-y-4 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {post.tags.map((tag, idx) => (
              <span key={idx} className="text-[11px] font-bold text-[#064E3B] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-gray-900 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-center gap-4 text-xs text-gray-500 pt-2">
            <span className="flex items-center gap-1.5 font-medium text-gray-800">
              <User className="w-4 h-4 text-[#064E3B]" />
              {post.author}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#0D7A4D]" />
              {post.publishedAt}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#0D7A4D]" />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mt-8 rounded-3xl overflow-hidden shadow-xl border border-gray-200/80 aspect-16/9 bg-gray-100">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body Content */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xs border border-gray-200/80 mt-10 space-y-6 text-gray-800 text-sm sm:text-base leading-relaxed">
          <p className="text-base sm:text-lg font-medium text-[#064E3B] leading-relaxed border-l-4 border-[#D4AF37] pl-4 py-1 italic bg-[#FAF8F2] rounded-r-xl">
            {post.excerpt}
          </p>

          <div className="space-y-4 whitespace-pre-line leading-loose text-gray-700">
            {post.content}
          </div>

          {/* Share & WhatsApp */}
          <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => navigateTo('blog')}
              className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all articles</span>
            </button>

            <button
              onClick={() => openWhatsApp(`Assalamu Alaikum, I just read your article "${post.title}" and would like to ask about related Quran classes.`)}
              className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-700 hover:bg-emerald-800 flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Discuss With Academy Advisor on WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Related Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-[#064E3B] to-[#0D7A4D] text-white p-8 rounded-3xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold font-display">Put Knowledge into Practice</h3>
            <p className="text-xs text-emerald-100">Book your 3-day complimentary one-to-one class with a certified tutor today.</p>
          </div>
          <button
            onClick={() => openTrialModal()}
            className="px-6 py-3 rounded-xl font-bold text-xs text-gray-950 bg-[#D4AF37] hover:bg-[#e0be47] transition-all shrink-0 cursor-pointer shadow-md flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-[#064E3B]" />
            <span>Book 3-Day Free Trial</span>
          </button>
        </div>
      </article>
    </div>
  );
};
