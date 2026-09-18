import React, { useState } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { Search, Calendar, User, Clock, ArrowRight, Tag } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const { blogPosts, navigateTo } = useAcademy();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const published = blogPosts.filter(p => p.isPublished);

  // Extract unique tags
  const allTags = Array.from(new Set(published.flatMap(p => p.tags)));

  const filtered = published.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedTag === 'all') return true;
    return post.tags.includes(selectedTag);
  });

  return (
    <div className="min-h-screen bg-[#FAF8F2] pb-24">
      {/* Banner */}
      <section className="bg-gradient-to-r from-[#064E3B] via-[#053D2E] to-[#064E3B] text-white py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-white/10 px-4 py-1.5 rounded-full inline-block">
            Academy Journal & Insights
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white">
            Islamic & Quran Learning Articles
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Practical guides on Tajweed rules, parenting advice for kids' Quran education, and proven Hifz memorization strategies.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Search & Tags */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/80 p-5 space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles by keyword, Tajweed rule, or advice..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
            <span className="text-xs font-bold text-gray-500 mr-1 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              Filter by Topic:
            </span>
            <button
              onClick={() => setSelectedTag('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedTag === 'all' ? 'bg-[#064E3B] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Topics
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedTag === tag ? 'bg-[#064E3B] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {filtered.map(post => (
            <article
              key={post.id}
              className="bg-white rounded-3xl border border-gray-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((t, i) => (
                      <span key={i} className="text-[10px] font-bold bg-[#064E3B]/90 text-white px-2.5 py-0.5 rounded-md shadow-xs backdrop-blur-xs">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#0D7A4D]" />
                      {post.publishedAt}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#0D7A4D]" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold font-display text-gray-900 group-hover:text-[#064E3B] transition-colors leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-gray-100 mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                  <User className="w-3.5 h-3.5 text-[#064E3B]" />
                  <span>{post.author}</span>
                </div>

                <button
                  onClick={() => navigateTo('blog-detail', post.slug)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#064E3B] hover:text-[#0D7A4D] transition-colors cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
