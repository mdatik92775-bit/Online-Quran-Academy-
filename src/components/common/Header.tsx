import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { 
  BookOpen, 
  MessageCircle, 
  Menu, 
  X, 
  ChevronDown, 
  User, 
  GraduationCap, 
  ShieldCheck, 
  Sparkles,
  Globe,
  Coins,
  HardDrive
} from 'lucide-react';
import { AnnouncementBar } from './AnnouncementBar';

export const Header: React.FC = () => {
  const { 
    settings, 
    activePage, 
    navigateTo, 
    openTrialModal, 
    openWhatsApp, 
    currentUser, 
    logout,
    activeCurrency,
    setActiveCurrency,
    language,
    setLanguage
  } = useAcademy();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [teachersDropdownOpen, setTeachersDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Home', page: 'home' as const },
    { label: 'About', page: 'about' as const },
    { 
      label: 'Courses', 
      page: 'courses' as const,
      hasDropdown: true 
    },
    { 
      label: 'Teachers', 
      page: 'teachers' as const,
      hasDropdown: true 
    },
    { label: 'Pricing', page: 'pricing' as const },
    { label: 'How It Works', page: 'how-it-works' as const },
    { label: 'Blog', page: 'blog' as const },
    { label: 'FAQ', page: 'faq' as const },
    { label: 'Contact', page: 'contact' as const },
    { label: 'Drive', page: 'google-drive' as const }
  ];

  const courseSubLinks = [
    { label: 'All Courses', page: 'courses' as const },
    { label: 'Noorani Qaida', page: 'noorani-qaida' as const },
    { label: 'Quran Reading (Nazra)', page: 'quran-reading' as const },
    { label: 'Quran with Tajweed', page: 'tajweed' as const },
    { label: 'Quran Memorization (Hifz)', page: 'hifz' as const },
    { label: 'Quran Translation', page: 'translation' as const },
    { label: 'Islamic Studies', page: 'islamic-studies' as const },
    { label: 'Kids Quran Classes', page: 'kids-classes' as const },
    { label: 'Adults Quran Classes', page: 'adults-classes' as const }
  ];

  const teacherSubLinks = [
    { label: 'All Teachers Directory', page: 'teachers' as const },
    { label: 'Male Quran Teachers', page: 'male-teachers' as const },
    { label: 'Female Quran Teachers (Ustadhas)', page: 'female-teachers' as const }
  ];

  const getDashboardTarget = () => {
    if (!currentUser) return 'auth';
    if (currentUser.role === 'super_admin' || currentUser.role === 'admin') return 'admin-dashboard';
    if (currentUser.role === 'teacher') return 'teacher-dashboard';
    return 'student-dashboard';
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-xs border-b border-[#064E3B]/10 transition-all">
      <AnnouncementBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={() => navigateTo('home')} 
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-hidden"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#064E3B] to-[#0D7A4D] flex items-center justify-center text-white shadow-md shadow-[#064E3B]/20 border border-[#D4AF37]/30 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6 text-[#FBF4DD]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold font-display tracking-tight text-[#064E3B] group-hover:text-[#0D7A4D] transition-colors">
                  {settings.brandName}
                </span>
                <span className="hidden xl:inline-block px-1.5 py-0.5 text-[10px] font-bold rounded bg-[#064E3B]/10 text-[#064E3B] border border-[#064E3B]/20">
                  {settings.shortName}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium hidden sm:block">
                {settings.tagline}
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map(link => {
              if (link.page === 'courses') {
                return (
                  <div 
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setCoursesDropdownOpen(true)}
                    onMouseLeave={() => setCoursesDropdownOpen(false)}
                  >
                    <button
                      onClick={() => navigateTo('courses')}
                      className={`px-3 py-2 text-sm font-medium rounded-lg flex items-center gap-1 transition-colors cursor-pointer ${
                        activePage === 'courses' || activePage === 'course-detail' || activePage.includes('qaida') || activePage.includes('tajweed') || activePage.includes('hifz')
                          ? 'text-[#064E3B] bg-[#064E3B]/5 font-semibold'
                          : 'text-gray-700 hover:text-[#064E3B] hover:bg-gray-50'
                      }`}
                    >
                      {link.label}
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>

                    {coursesDropdownOpen && (
                      <div className="absolute left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        {courseSubLinks.map((sub, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              navigateTo(sub.page);
                              setCoursesDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-[#064E3B]/5 hover:text-[#064E3B] transition-colors flex items-center justify-between"
                          >
                            <span>{sub.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              if (link.page === 'teachers') {
                return (
                  <div 
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setTeachersDropdownOpen(true)}
                    onMouseLeave={() => setTeachersDropdownOpen(false)}
                  >
                    <button
                      onClick={() => navigateTo('teachers')}
                      className={`px-3 py-2 text-sm font-medium rounded-lg flex items-center gap-1 transition-colors cursor-pointer ${
                        activePage === 'teachers' || activePage === 'teacher-profile' || activePage.includes('teacher')
                          ? 'text-[#064E3B] bg-[#064E3B]/5 font-semibold'
                          : 'text-gray-700 hover:text-[#064E3B] hover:bg-gray-50'
                      }`}
                    >
                      {link.label}
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>

                    {teachersDropdownOpen && (
                      <div className="absolute left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        {teacherSubLinks.map((sub, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              navigateTo(sub.page);
                              setTeachersDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-[#064E3B]/5 hover:text-[#064E3B] transition-colors flex items-center justify-between"
                          >
                            <span>{sub.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.label}
                  onClick={() => navigateTo(link.page)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    activePage === link.page
                      ? 'text-[#064E3B] bg-[#064E3B]/5 font-semibold'
                      : 'text-gray-700 hover:text-[#064E3B] hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Currency Selector */}
            <div className="relative group">
              <button 
                title="Select Currency"
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Coins className="w-3.5 h-3.5 text-[#064E3B]" />
                <span>{activeCurrency}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>
              <div className="absolute right-0 mt-1 w-24 bg-white rounded-lg shadow-lg border border-gray-100 py-1 hidden group-hover:block z-50">
                {settings.supportedCurrencies.map(c => (
                  <button
                    key={c}
                    onClick={() => setActiveCurrency(c)}
                    className={`w-full text-left px-3 py-1.5 text-xs ${
                      activeCurrency === c ? 'bg-[#064E3B] text-white font-bold' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Switcher */}
            <div className="relative group">
              <button 
                title="Change Language"
                className="flex items-center gap-1 px-2 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-[#064E3B]" />
                <span className="uppercase">{language}</span>
              </button>
              <div className="absolute right-0 mt-1 w-28 bg-white rounded-lg shadow-lg border border-gray-100 py-1 hidden group-hover:block z-50">
                <button
                  onClick={() => setLanguage('en')}
                  className={`w-full text-left px-3 py-1.5 text-xs ${language === 'en' ? 'bg-[#064E3B] text-white font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('bn')}
                  className={`w-full text-left px-3 py-1.5 text-xs ${language === 'bn' ? 'bg-[#064E3B] text-white font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  বাংলা (Bengali)
                </button>
                <button
                  onClick={() => setLanguage('ar')}
                  className={`w-full text-left px-3 py-1.5 text-xs ${language === 'ar' ? 'bg-[#064E3B] text-white font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  العربية (Arabic)
                </button>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <button
              onClick={() => openWhatsApp()}
              className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
              title="Chat on WhatsApp 01746349167"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-100" />
              <span>WhatsApp</span>
            </button>

            {/* Free Trial Button */}
            <button
              onClick={() => openTrialModal()}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg text-white bg-gradient-to-r from-[#064E3B] to-[#0D7A4D] hover:from-[#053d2e] hover:to-[#09603c] shadow-sm shadow-[#064E3B]/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Book Free Trial</span>
            </button>

            {/* Dashboard / User Portal Button */}
            {currentUser ? (
              <div className="relative group">
                <button
                  onClick={() => navigateTo(getDashboardTarget() as any)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg border border-gray-200 hover:border-[#064E3B] transition-colors cursor-pointer bg-white"
                >
                  <div className="w-7 h-7 rounded-full bg-[#064E3B] text-white flex items-center justify-center text-xs font-bold">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-bold text-gray-800 leading-tight truncate max-w-[80px]">
                      {currentUser.name.split(' ')[0]}
                    </p>
                    <p className="text-[9px] text-[#0D7A4D] font-medium capitalize">
                      {currentUser.role.replace('_', ' ')}
                    </p>
                  </div>
                </button>
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1.5 hidden group-hover:block z-50">
                  {(currentUser.role === 'super_admin' || currentUser.role === 'admin') && (
                    <button
                      onClick={() => navigateTo('admin')}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-[#064E3B] bg-emerald-50/50 hover:bg-emerald-50 flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#064E3B]" />
                      <span>এডমিন প্যানেল (Admin CMS)</span>
                    </button>
                  )}
                  <button
                    onClick={() => navigateTo('google-drive')}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-gray-700 hover:bg-[#064E3B]/5 hover:text-[#064E3B] flex items-center gap-2"
                  >
                    <HardDrive className="w-4 h-4 text-[#D4AF37]" />
                    <span>Google Drive Library</span>
                  </button>
                  <button
                    onClick={() => navigateTo(getDashboardTarget() as any)}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-gray-700 hover:bg-[#064E3B]/5 hover:text-[#064E3B] flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#064E3B]" />
                    <span>My Dashboard</span>
                  </button>
                  <button
                    onClick={logout}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => navigateTo('admin')}
                  className="inline-flex items-center gap-1 px-2.5 py-2 text-xs font-bold rounded-lg text-[#064E3B] bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors cursor-pointer"
                  title="এডমিন প্যানেল লগইন (aradmin)"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Admin</span>
                </button>
                <button
                  onClick={() => navigateTo('auth')}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg text-gray-700 hover:text-[#064E3B] hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Portal</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => openTrialModal()}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-lg text-white bg-[#064E3B]"
            >
              <span>Trial</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 focus:outline-hidden"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-auto bg-white border-b border-gray-200 shadow-2xl py-5 px-6 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500">Currency:</span>
              <select
                value={activeCurrency}
                onChange={(e) => setActiveCurrency(e.target.value as any)}
                className="text-xs font-bold bg-gray-100 border-none rounded px-2 py-1 text-gray-800"
              >
                {settings.supportedCurrencies.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 text-xs rounded ${language === 'en' ? 'bg-[#064E3B] text-white' : 'bg-gray-100'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('bn')}
                className={`px-2 py-0.5 text-xs rounded ${language === 'bn' ? 'bg-[#064E3B] text-white' : 'bg-gray-100'}`}
              >
                বাং
              </button>
              <button 
                onClick={() => setLanguage('ar')}
                className={`px-2 py-0.5 text-xs rounded ${language === 'ar' ? 'bg-[#064E3B] text-white' : 'bg-gray-100'}`}
              >
                عرب
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                navigateTo('home');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#064E3B]"
            >
              Home
            </button>
            <button
              onClick={() => {
                navigateTo('about');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#064E3B]"
            >
              About Us
            </button>
            <button
              onClick={() => {
                navigateTo('courses');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#064E3B]"
            >
              All Courses
            </button>
            <button
              onClick={() => {
                navigateTo('teachers');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#064E3B]"
            >
              Teachers
            </button>
            <button
              onClick={() => {
                navigateTo('pricing');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#064E3B]"
            >
              Pricing & Fees
            </button>
            <button
              onClick={() => {
                navigateTo('how-it-works');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#064E3B]"
            >
              How It Works
            </button>
            <button
              onClick={() => {
                navigateTo('blog');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#064E3B]"
            >
              Blog
            </button>
            <button
              onClick={() => {
                navigateTo('faq');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#064E3B]"
            >
              FAQs
            </button>
            <button
              onClick={() => {
                navigateTo('contact');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#064E3B]"
            >
              Contact Us
            </button>
            <button
              onClick={() => {
                navigateTo('registration');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-medium text-emerald-800 font-bold"
            >
              Full Registration
            </button>
          </div>

          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                openTrialModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 text-center rounded-lg font-bold text-white bg-[#064E3B] shadow-sm flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Book 3-Day Free Trial</span>
            </button>

            <button
              onClick={() => {
                openWhatsApp();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center rounded-lg font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp: 01746349167</span>
            </button>

            <button
              onClick={() => {
                navigateTo('google-drive');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center rounded-lg font-bold text-[#064E3B] bg-amber-50 border border-amber-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <HardDrive className="w-4 h-4 text-[#D4AF37]" />
              <span>গুগল ড্রাইভ লাইব্রেরি (Google Drive)</span>
            </button>

            <button
              onClick={() => {
                navigateTo('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center rounded-lg font-bold text-emerald-900 bg-emerald-100 border border-emerald-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>এডমিন প্যানেল (Admin Panel)</span>
            </button>

            <button
              onClick={() => {
                navigateTo(getDashboardTarget() as any);
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center rounded-lg font-semibold text-gray-700 bg-gray-100 flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4 text-gray-600" />
              <span>{currentUser ? `Dashboard (${currentUser.role})` : 'Student / Teacher Portal'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
