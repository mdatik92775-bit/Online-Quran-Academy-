import React, { useState, useEffect } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { Course, Teacher, PricingPlan, BlogPost, FAQItem, PaymentMethodSetting, Testimonial } from '../types';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  DollarSign, 
  MessageSquare, 
  FileText, 
  HelpCircle, 
  Settings as SettingsIcon, 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  X, 
  Search, 
  MessageCircle, 
  ExternalLink,
  Save,
  RotateCcw,
  Sparkles,
  TrendingUp,
  AlertCircle,
  LogOut,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Star,
  Globe,
  HardDrive
} from 'lucide-react';

import { AdminLoginGate } from '../components/admin/AdminLoginGate';
import { CourseModal } from '../components/admin/CourseModal';
import { TeacherModal } from '../components/admin/TeacherModal';
import { BlogPostModal } from '../components/admin/BlogPostModal';
import { FaqModal } from '../components/admin/FaqModal';
import { PaymentMethodModal } from '../components/admin/PaymentMethodModal';
import { GoogleDrivePage } from './GoogleDrivePage';

type AdminTab = 
  | 'overview' 
  | 'settings' 
  | 'courses' 
  | 'teachers' 
  | 'pricing' 
  | 'trials' 
  | 'students' 
  | 'payments' 
  | 'blog' 
  | 'faqs' 
  | 'testimonials'
  | 'drive';

export const AdminDashboard: React.FC = () => {
  const { 
    settings, 
    updateSettings, 
    courses, 
    addCourse, 
    updateCourse, 
    deleteCourse,
    teachers, 
    addTeacher, 
    updateTeacher, 
    deleteTeacher,
    pricingPlans, 
    addPricingPlan,
    updatePricingPlan,
    deletePricingPlan,
    trialRequests, 
    updateTrialStatus, 
    deleteTrialRequest,
    registrations, 
    updateRegistrationStatus, 
    paymentMethods,
    updatePaymentMethod,
    blogPosts, 
    addBlogPost, 
    updateBlogPost,
    deleteBlogPost,
    faqs, 
    addFaq, 
    updateFaq,
    deleteFaq,
    testimonials,
    addTestimonial,
    deleteTestimonial,
    resetToDemoData,
    openWhatsApp,
    activeCurrency,
    formatPrice,
    currentUser,
    setCurrentUser,
    logout,
    navigateTo
  } = useAcademy();

  // Admin authentication check
  const [isAuthed, setIsAuthed] = useState<boolean>(() => {
    return (
      currentUser?.role === 'super_admin' || 
      currentUser?.role === 'admin' || 
      localStorage.getItem('oqa_admin_authenticated') === 'true'
    );
  });

  useEffect(() => {
    const hasAdminAccess = (
      currentUser?.role === 'super_admin' || 
      currentUser?.role === 'admin' || 
      localStorage.getItem('oqa_admin_authenticated') === 'true'
    );
    setIsAuthed(hasAdminAccess);
  }, [currentUser]);

  // Tab & Language States
  const [currentTab, setCurrentTab] = useState<AdminTab>('overview');
  const [adminLang, setAdminLang] = useState<'bn' | 'en'>('bn');

  // Search & Filter states
  const [trialFilter, setTrialFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Course Modal State
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Partial<Course> | null>(null);

  // Teacher Modal State
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Partial<Teacher> | null>(null);

  // Blog Modal State
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);

  // FAQ Modal State
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<Partial<FAQItem> | null>(null);

  // Payment Method Modal State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Partial<PaymentMethodSetting> | null>(null);

  // Site Settings Form State
  const [settingsForm, setSettingsForm] = useState(settings);

  useEffect(() => {
    setSettingsForm(settings);
  }, [settings]);

  // Success Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // If unauthenticated, show the custom Admin Login Gate with aradmin/123456789!
  if (!isAuthed) {
    return (
      <AdminLoginGate 
        onSuccess={() => {
          setIsAuthed(true);
          showToast(adminLang === 'bn' ? 'স্বাগতম aradmin! এডমিন প্যানেলে সফলভাবে লগইন হয়েছে।' : 'Welcome aradmin! Successfully logged in.');
        }} 
      />
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('oqa_admin_authenticated');
    logout();
    setIsAuthed(false);
  };

  // -------------------------------------------------------------
  // HANDLERS FOR COURSES
  // -------------------------------------------------------------
  const handleSaveCourse = (courseData: Partial<Course>) => {
    if (courseData.id) {
      updateCourse(courseData.id, courseData);
      showToast(adminLang === 'bn' ? 'কোর্স সফলভাবে আপডেট করা হয়েছে!' : 'Course updated successfully!');
    } else {
      const newCourse: Course = {
        id: `course-${Date.now()}`,
        title: courseData.title || '',
        slug: courseData.slug || (courseData.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        subtitle: courseData.subtitle || courseData.title || '',
        category: courseData.category || 'reading',
        description: courseData.description || '',
        image: courseData.image || 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=800&q=80',
        duration: courseData.duration || '3-6 Months',
        classDuration: courseData.classDuration || '30 Minutes',
        classesPerWeek: courseData.classesPerWeek || 3,
        suitableAge: courseData.suitableAge || 'Kids & Adults',
        teacherType: courseData.teacherType || 'Male & Female Available',
        priceMonthly: courseData.priceMonthly || { bdt: 2500, usd: 35, gbp: 28, eur: 32, cad: 45, aud: 50, aed: 130 },
        objectives: courseData.objectives || ['Fluent reading with correct Tajweed rules'],
        curriculum: courseData.curriculum || [{ level: 'Foundation', lessons: ['Pronunciation rules', 'Makharij mastery'] }],
        whoShouldJoin: courseData.whoShouldJoin || ['Beginner students', 'Children', 'Adult learners'],
        isFeatured: courseData.isFeatured ?? false,
        isPublished: courseData.isPublished ?? true,
        order: courseData.order || courses.length + 1
      };
      addCourse(newCourse);
      showToast(adminLang === 'bn' ? 'নতুন কোর্স সফলভাবে যুক্ত হয়েছে!' : 'New course added successfully!');
    }
    setIsCourseModalOpen(false);
    setEditingCourse(null);
  };

  // -------------------------------------------------------------
  // HANDLERS FOR TEACHERS
  // -------------------------------------------------------------
  const handleSaveTeacher = (teacherData: Partial<Teacher>) => {
    if (teacherData.id) {
      updateTeacher(teacherData.id, teacherData);
      showToast(adminLang === 'bn' ? 'শিক্ষকের প্রোফাইল আপডেট করা হয়েছে!' : 'Teacher profile updated!');
    } else {
      const newTeacher: Teacher = {
        id: `teacher-${Date.now()}`,
        name: teacherData.name || '',
        title: teacherData.title || 'Senior Quran Instructor',
        gender: teacherData.gender || 'male',
        photo: teacherData.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
        qualification: teacherData.qualification || 'Ijazah in Tajweed',
        specialization: teacherData.specialization || ['Tajweed', 'Noorani Qaida'],
        experienceYears: teacherData.experienceYears || 5,
        languages: teacherData.languages || ['English', 'Bangla'],
        bio: teacherData.bio || 'Dedicated Quran instructor committed to patient and clear teaching.',
        teachingStyle: teacherData.teachingStyle || 'Interactive, encouraging, and friendly.',
        availableCourses: teacherData.availableCourses || ['Noorani Qaida Course', 'Quran with Tajweed'],
        rating: teacherData.rating || 5.0,
        reviewCount: teacherData.reviewCount || 10,
        isPublished: teacherData.isPublished ?? true,
        availabilityHours: teacherData.availabilityHours || 'Flexible Morning & Evening shifts'
      };
      addTeacher(newTeacher);
      showToast(adminLang === 'bn' ? 'নতুন শিক্ষক সফলভাবে যুক্ত হয়েছেন!' : 'New teacher profile added!');
    }
    setIsTeacherModalOpen(false);
    setEditingTeacher(null);
  };

  // -------------------------------------------------------------
  // HANDLERS FOR BLOG
  // -------------------------------------------------------------
  const handleSaveBlog = (postData: Partial<BlogPost>) => {
    if (postData.id) {
      updateBlogPost(postData.id, postData);
      showToast(adminLang === 'bn' ? 'আর্টিকেল আপডেট করা হয়েছে!' : 'Article updated!');
    } else {
      const newPost: BlogPost = {
        id: `blog-${Date.now()}`,
        title: postData.title || '',
        slug: (postData.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        author: postData.author || 'Shaykh Abdullah Al-Mamun',
        category: postData.category || 'Tajweed & Recitation',
        excerpt: postData.excerpt || '',
        content: postData.content || '',
        image: postData.image || 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80',
        tags: postData.tags || ['Quran', 'Tajweed'],
        readTime: postData.readTime || '4 min read',
        publishedAt: new Date().toISOString().split('T')[0],
        isPublished: true
      };
      addBlogPost(newPost);
      showToast(adminLang === 'bn' ? 'নতুন আর্টিকেল প্রকাশিত হয়েছে!' : 'New article published!');
    }
    setIsBlogModalOpen(false);
    setEditingPost(null);
  };

  // -------------------------------------------------------------
  // HANDLERS FOR FAQ
  // -------------------------------------------------------------
  const handleSaveFaq = (faqData: Partial<FAQItem>) => {
    if (faqData.id) {
      updateFaq(faqData.id, faqData);
      showToast(adminLang === 'bn' ? 'FAQ প্রশ্নোত্তর আপডেট হয়েছে!' : 'FAQ updated!');
    } else {
      const newFaq: FAQItem = {
        id: `faq-${Date.now()}`,
        question: faqData.question || '',
        answer: faqData.answer || '',
        category: faqData.category || 'General',
        order: faqData.order || faqs.length + 1,
        isPublished: true
      };
      addFaq(newFaq);
      showToast(adminLang === 'bn' ? 'নতুন FAQ প্রশ্নোত্তর যুক্ত হয়েছে!' : 'New FAQ added!');
    }
    setIsFaqModalOpen(false);
    setEditingFaq(null);
  };

  // -------------------------------------------------------------
  // HANDLERS FOR PAYMENT METHODS
  // -------------------------------------------------------------
  const handleSavePaymentMethod = (methodData: Partial<PaymentMethodSetting>) => {
    if (methodData.id) {
      updatePaymentMethod(methodData.id, methodData);
      showToast(adminLang === 'bn' ? 'পেমেন্ট গেটওয়ে তথ্য আপডেট হয়েছে!' : 'Payment method updated!');
    }
    setIsPaymentModalOpen(false);
    setEditingPayment(null);
  };

  // -------------------------------------------------------------
  // HANDLERS FOR SITE SETTINGS
  // -------------------------------------------------------------
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
    showToast(adminLang === 'bn' ? 'সকল ওয়েবসাইট সেটিংস সফলভাবে সংরক্ষিত হয়েছে!' : 'Website settings saved successfully!');
  };

  // Filtered trial requests
  const filteredTrials = trialRequests.filter(req => {
    const matchesFilter = trialFilter === 'all' || req.status === trialFilter;
    const matchesSearch = 
      req.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.whatsapp.includes(searchQuery) ||
      req.preferredCourseTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FDFCF7] pb-24 text-gray-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#064E3B] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-[#D4AF37]/50 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Admin Top Header */}
      <header className="bg-[#052E20] text-white sticky top-0 z-30 shadow-md border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Left: Brand & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0D7A4D] border border-[#D4AF37]/40 text-white flex items-center justify-center font-display font-bold text-lg shadow-md">
              <BookOpen className="w-5 h-5 text-[#FAF8F2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-bold tracking-tight text-white font-display">
                  {settings.brandName} • {adminLang === 'bn' ? 'এডমিন কন্ট্রোল প্যানেল' : 'Admin Control Panel'}
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-800 text-emerald-200 border border-emerald-700">
                  <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
                  <span>aradmin (Super Admin)</span>
                </span>
              </div>
              <p className="text-[11px] text-emerald-200/80 hidden sm:block">
                {adminLang === 'bn' 
                  ? 'সব ধরণের কন্টেন্ট, কোর্স, শিক্ষক, ফি ও সাইট সেটিংস এডিটিং সিস্টেম' 
                  : 'Complete CMS: Courses, Teachers, Pricing, Leads & Site Settings'}
              </p>
            </div>
          </div>

          {/* Right: Language, Live Site & Logout */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-emerald-950/80 p-0.5 rounded-lg border border-emerald-800">
              <button
                onClick={() => setAdminLang('bn')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  adminLang === 'bn' ? 'bg-[#D4AF37] text-gray-950' : 'text-emerald-200 hover:text-white'
                }`}
              >
                বাংলা
              </button>
              <button
                onClick={() => setAdminLang('en')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  adminLang === 'en' ? 'bg-[#D4AF37] text-gray-950' : 'text-emerald-200 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* View Live Website Button */}
            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 border border-emerald-700 transition-colors cursor-pointer"
              title="View Public Website"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden md:inline">{adminLang === 'bn' ? 'ওয়েবসাইট দেখুন' : 'Live Site'}</span>
            </button>

            {/* Sign Out Button */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-rose-600/90 hover:bg-rose-600 text-white transition-colors cursor-pointer"
              title="Sign Out of Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{adminLang === 'bn' ? 'লগআউট' : 'Sign Out'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Navigation Tabs Bar */}
        <div className="bg-white p-2 rounded-2xl border border-gray-200/80 shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setCurrentTab('overview')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'overview'
                ? 'bg-[#064E3B] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>{adminLang === 'bn' ? 'ড্যাশবোর্ড ওভারভিউ' : 'Overview'}</span>
          </button>

          <button
            onClick={() => setCurrentTab('settings')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'settings'
                ? 'bg-[#064E3B] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <SettingsIcon className="w-4 h-4" />
            <span>{adminLang === 'bn' ? 'সাইট ও ব্র্যান্ড সেটিংস' : 'Brand & Site Settings'}</span>
          </button>

          <button
            onClick={() => setCurrentTab('courses')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'courses'
                ? 'bg-[#064E3B] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{adminLang === 'bn' ? `কোর্সসমূহ (${courses.length})` : `Courses (${courses.length})`}</span>
          </button>

          <button
            onClick={() => setCurrentTab('teachers')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'teachers'
                ? 'bg-[#064E3B] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{adminLang === 'bn' ? `শিক্ষকবৃন্দ (${teachers.length})` : `Teachers (${teachers.length})`}</span>
          </button>

          <button
            onClick={() => setCurrentTab('pricing')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'pricing'
                ? 'bg-[#064E3B] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>{adminLang === 'bn' ? 'ফি ও প্যাকেজ' : 'Pricing Plans'}</span>
          </button>

          <button
            onClick={() => setCurrentTab('trials')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'trials'
                ? 'bg-[#064E3B] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>{adminLang === 'bn' ? `ট্রায়াল আবেদন (${trialRequests.length})` : `Trial Leads (${trialRequests.length})`}</span>
            {trialRequests.filter(r => r.status === 'New').length > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            )}
          </button>

          <button
            onClick={() => setCurrentTab('students')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'students'
                ? 'bg-[#064E3B] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{adminLang === 'bn' ? `ভর্তি শিক্ষার্থী (${registrations.length})` : `Students (${registrations.length})`}</span>
          </button>

          <button
            onClick={() => setCurrentTab('payments')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'payments'
                ? 'bg-[#064E3B] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>{adminLang === 'bn' ? 'পেমেন্ট গেটওয়ে' : 'Payment Gateways'}</span>
          </button>

          <button
            onClick={() => setCurrentTab('blog')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'blog'
                ? 'bg-[#064E3B] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{adminLang === 'bn' ? `ব্লগ (${blogPosts.length})` : `Blog (${blogPosts.length})`}</span>
          </button>

          <button
            onClick={() => setCurrentTab('faqs')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'faqs'
                ? 'bg-[#064E3B] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>{adminLang === 'bn' ? `FAQs (${faqs.length})` : `FAQs (${faqs.length})`}</span>
          </button>

          <button
            onClick={() => setCurrentTab('drive')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'drive'
                ? 'bg-[#064E3B] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-emerald-50 text-emerald-800'
            }`}
          >
            <HardDrive className="w-4 h-4 text-[#D4AF37]" />
            <span>{adminLang === 'bn' ? 'গুগল ড্রাইভ লাইব্রেরি' : 'Google Drive Library'}</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 1. OVERVIEW TAB */}
        {/* ========================================================================= */}
        {currentTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Top metric counters */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-gray-200/80 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
                  <span>{adminLang === 'bn' ? 'ফ্রি ট্রায়াল আবেদন' : 'Total Trial Leads'}</span>
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black font-display text-gray-900">
                  {trialRequests.length}
                </div>
                <div className="text-[11px] text-amber-700 font-semibold flex items-center gap-1">
                  <span>{trialRequests.filter(t => t.status === 'New').length} {adminLang === 'bn' ? 'টি নতুন আবেদন' : 'New Inquiries'}</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-gray-200/80 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
                  <span>{adminLang === 'bn' ? 'সক্রিয় কোর্সসমূহ' : 'Active Courses'}</span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black font-display text-gray-900">
                  {courses.length}
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold">
                  {courses.filter(c => c.isPublished).length} {adminLang === 'bn' ? 'টি লাইভ প্রকাশিত' : 'Published on Site'}
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-gray-200/80 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
                  <span>{adminLang === 'bn' ? 'ক্বারী ও উস্তাযাবৃন্দ' : 'Certified Teachers'}</span>
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black font-display text-gray-900">
                  {teachers.length}
                </div>
                <div className="text-[11px] text-blue-700 font-semibold">
                  {teachers.filter(t => t.gender === 'male').length} Male • {teachers.filter(t => t.gender === 'female').length} Female
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-gray-200/80 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
                  <span>{adminLang === 'bn' ? 'ভর্তি শিক্ষার্থী' : 'Enrolled Students'}</span>
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black font-display text-gray-900">
                  {registrations.length}
                </div>
                <div className="text-[11px] text-purple-700 font-semibold">
                  {registrations.filter(r => r.status === 'Active').length} {adminLang === 'bn' ? 'সক্রিয় শিক্ষার্থী' : 'Active Learners'}
                </div>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold font-display text-gray-900">
                    {adminLang === 'bn' ? 'দ্রুত একশন ও এডিটিং শর্টকাট' : 'Quick Editing Shortcuts'}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {adminLang === 'bn' ? 'এক ক্লিকে নতুন কোর্স, শিক্ষক বা তথ্য সম্পাদনা শুরু করুন' : 'Jump directly into editing academy resources'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => {
                    setEditingCourse(null);
                    setIsCourseModalOpen(true);
                  }}
                  className="p-3.5 rounded-2xl bg-[#FAF8F2] hover:bg-[#F4F1EA] border border-gray-200 text-left transition-all flex items-center gap-3 cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#064E3B] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-gray-900">
                      {adminLang === 'bn' ? 'নতুন কোর্স তৈরি' : 'Add Course'}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      {adminLang === 'bn' ? 'কোর্স কন্টেন্ট ও ফি' : 'Content & Fees'}
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setEditingTeacher(null);
                    setIsTeacherModalOpen(true);
                  }}
                  className="p-3.5 rounded-2xl bg-[#FAF8F2] hover:bg-[#F4F1EA] border border-gray-200 text-left transition-all flex items-center gap-3 cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-gray-900">
                      {adminLang === 'bn' ? 'নতুন শিক্ষক যোগ' : 'Add Teacher'}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      {adminLang === 'bn' ? 'যোগ্যতা ও ছবি' : 'Profile & Bio'}
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => setCurrentTab('settings')}
                  className="p-3.5 rounded-2xl bg-[#FAF8F2] hover:bg-[#F4F1EA] border border-gray-200 text-left transition-all flex items-center gap-3 cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <SettingsIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-gray-900">
                      {adminLang === 'bn' ? 'ওয়েবসাইট সেটিংস' : 'Site Settings'}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      {adminLang === 'bn' ? 'হোয়াটসঅ্যাপ ও ফোন' : 'WhatsApp & Info'}
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => setCurrentTab('trials')}
                  className="p-3.5 rounded-2xl bg-[#FAF8F2] hover:bg-[#F4F1EA] border border-gray-200 text-left transition-all flex items-center gap-3 cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-gray-900">
                      {adminLang === 'bn' ? 'হোয়াটসঅ্যাপ চ্যাট' : 'WhatsApp Leads'}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      {adminLang === 'bn' ? 'অভিভাবকদের সাথে যোগাযোগ' : 'Direct Message'}
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Recent Trial Inquiries Preview */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold font-display text-gray-900">
                    {adminLang === 'bn' ? 'সাম্প্রতিক ফ্রি ট্রায়াল আবেদনসমূহ' : 'Recent Trial Inquiries'}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {adminLang === 'bn' ? 'ওয়েবসাইট থেকে আগত শিক্ষার্থীদের আবেদনের তালিকা' : 'Prospective parents who booked free trial classes'}
                  </p>
                </div>
                <button
                  onClick={() => setCurrentTab('trials')}
                  className="text-xs font-bold text-[#064E3B] hover:underline cursor-pointer"
                >
                  {adminLang === 'bn' ? 'সব দেখুন →' : 'View All Leads →'}
                </button>
              </div>

              <div className="divide-y divide-gray-100">
                {trialRequests.slice(0, 5).map(req => (
                  <div key={req.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900">{req.studentName}</span>
                        <span className="text-xs text-gray-500">({req.age} yrs • {req.gender})</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          req.status === 'New' ? 'bg-amber-100 text-amber-800' :
                          req.status === 'Trial Scheduled' ? 'bg-blue-100 text-blue-800' :
                          req.status === 'Enrolled' ? 'bg-emerald-100 text-emerald-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">
                        Course: <strong>{req.preferredCourseTitle}</strong> • Parent: {req.parentName} ({req.country})
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openWhatsApp(`Assalamu Alaikum ${req.parentName}, thank you for contacting Online Quran Academy regarding free trial for ${req.studentName}.`)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#25D366] text-white hover:bg-[#20b859] flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp Chat</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. SITE SETTINGS CMS TAB */}
        {/* ========================================================================= */}
        {currentTab === 'settings' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xs space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-xl font-bold font-display text-gray-900">
                {adminLang === 'bn' ? 'ওয়েবসাইট ও ব্র্যান্ডের সকল তথ্য এডিটিং' : 'Academy Brand & Live Site CMS'}
              </h2>
              <p className="text-xs text-gray-500">
                {adminLang === 'bn' 
                  ? 'একাডেমির নাম, ফোন, হোয়াটসঅ্যাপ নম্বর (01746349167), ব্যানার, নোটিশ বার ইত্যাদি সরাসরি পরিবর্তন করুন।' 
                  : 'Update institution name, contact numbers, notification bars, hero banners, and social channels.'}
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-6 text-xs">
              {/* Brand Information */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#064E3B]">
                  1. {adminLang === 'bn' ? 'ব্র্যান্ডের মৌলিক পরিচয়' : 'Institution Brand Identity'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="block font-bold text-gray-700">Brand Name *</label>
                    <input
                      type="text"
                      required
                      value={settingsForm.brandName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, brandName: e.target.value })}
                      className="w-full p-2.5 text-sm rounded-xl border border-gray-300 font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-bold text-gray-700">Short Name *</label>
                    <input
                      type="text"
                      required
                      value={settingsForm.shortName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, shortName: e.target.value })}
                      className="w-full p-2.5 text-sm rounded-xl border border-gray-300 font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-bold text-gray-700">Tagline *</label>
                    <input
                      type="text"
                      required
                      value={settingsForm.tagline}
                      onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                      className="w-full p-2.5 text-sm rounded-xl border border-gray-300"
                    />
                  </div>
                </div>
              </div>

              {/* Primary Contact Details */}
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#064E3B]">
                  2. {adminLang === 'bn' ? 'অফিসিয়াল যোগাযোগ ও হোয়াটসঅ্যাপ' : 'Official Contact & WhatsApp Details'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <label className="block font-bold text-gray-700">Phone Number *</label>
                    <input
                      type="text"
                      required
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="w-full p-2.5 text-sm rounded-xl border border-gray-300 font-mono font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-bold text-gray-700">Primary WhatsApp *</label>
                    <input
                      type="text"
                      required
                      value={settingsForm.whatsapp}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                      className="w-full p-2.5 text-sm rounded-xl border border-gray-300 font-mono font-bold text-emerald-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-bold text-gray-700">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={settingsForm.email}
                      onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                      className="w-full p-2.5 text-sm rounded-xl border border-gray-300"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-bold text-gray-700">Office Address *</label>
                    <input
                      type="text"
                      required
                      value={settingsForm.address}
                      onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                      className="w-full p-2.5 text-sm rounded-xl border border-gray-300"
                    />
                  </div>
                </div>
              </div>

              {/* Announcement Bar Settings */}
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#064E3B]">
                    3. {adminLang === 'bn' ? 'টপ নোটিশ / এনাউন্সমেন্ট বার' : 'Top Header Announcement Bar'}
                  </h4>
                  <label className="flex items-center gap-2 font-bold text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settingsForm.announcementBar?.enabled ?? true}
                      onChange={(e) => setSettingsForm({
                        ...settingsForm,
                        announcementBar: {
                          ...settingsForm.announcementBar,
                          enabled: e.target.checked
                        }
                      })}
                      className="accent-[#064E3B] w-4 h-4"
                    />
                    <span>{adminLang === 'bn' ? 'বার সক্রিয় রাখুন' : 'Enable Bar'}</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block font-bold text-gray-700">Announcement Text</label>
                    <input
                      type="text"
                      value={settingsForm.announcementBar?.text || ''}
                      onChange={(e) => setSettingsForm({
                        ...settingsForm,
                        announcementBar: {
                          ...settingsForm.announcementBar,
                          text: e.target.value
                        }
                      })}
                      className="w-full p-2.5 rounded-xl border border-gray-300"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-bold text-gray-700">Announcement Link</label>
                    <input
                      type="text"
                      value={settingsForm.announcementBar?.link || ''}
                      onChange={(e) => setSettingsForm({
                        ...settingsForm,
                        announcementBar: {
                          ...settingsForm.announcementBar,
                          link: e.target.value
                        }
                      })}
                      className="w-full p-2.5 rounded-xl border border-gray-300"
                    />
                  </div>
                </div>
              </div>

              {/* Hero Banner CMS */}
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#064E3B]">
                  4. {adminLang === 'bn' ? 'হোমপেজ হিরো সেকশন টেক্সট' : 'Homepage Hero Section CMS'}
                </h4>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="block font-bold text-gray-700">Hero Main Title</label>
                    <input
                      type="text"
                      value={settingsForm.hero?.title || ''}
                      onChange={(e) => setSettingsForm({
                        ...settingsForm,
                        hero: {
                          ...settingsForm.hero,
                          title: e.target.value
                        }
                      })}
                      className="w-full p-2.5 text-sm rounded-xl border border-gray-300 font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-bold text-gray-700">Hero Subtitle</label>
                    <textarea
                      rows={2}
                      value={settingsForm.hero?.subtitle || ''}
                      onChange={(e) => setSettingsForm({
                        ...settingsForm,
                        hero: {
                          ...settingsForm.hero,
                          subtitle: e.target.value
                        }
                      })}
                      className="w-full p-2.5 rounded-xl border border-gray-300"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-bold text-gray-700">Badge Text</label>
                    <input
                      type="text"
                      value={settingsForm.hero?.badge || ''}
                      onChange={(e) => setSettingsForm({
                        ...settingsForm,
                        hero: {
                          ...settingsForm.hero,
                          badge: e.target.value
                        }
                      })}
                      className="w-full p-2.5 rounded-xl border border-gray-300"
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(adminLang === 'bn' ? 'ডেমো ডাটা রিসেট করতে চান?' : 'Reset to default academy demo data?')) {
                      resetToDemoData();
                      showToast(adminLang === 'bn' ? 'সকল তথ্য ডিফল্ট অবস্থায় ফিরে গেছে!' : 'Reset to default demo data.');
                    }
                  }}
                  className="px-4 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 border border-rose-200 font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{adminLang === 'bn' ? 'ডেমো ডাটা রিসেট' : 'Reset Demo Data'}</span>
                </button>

                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl text-white font-bold bg-[#064E3B] hover:bg-[#053d2e] shadow-lg shadow-[#064E3B]/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4 text-[#D4AF37]" />
                  <span>{adminLang === 'bn' ? 'সেটিংস সংরক্ষণ করুন (Save Settings)' : 'Save Settings'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. COURSES CMS TAB */}
        {/* ========================================================================= */}
        {currentTab === 'courses' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold font-display text-gray-900">
                  {adminLang === 'bn' ? 'কোর্স ম্যানেজমেন্ট ও এডিটিং' : 'Courses Management'}
                </h2>
                <p className="text-xs text-gray-500">
                  {adminLang === 'bn' 
                    ? 'সকল কোর্সের তথ্য, সময়সীমা, পাঠ্যক্রম ও মাসিক ফি এডিট করুন।' 
                    : 'Manage course details, pricing in all currencies, duration, and curriculums.'}
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingCourse(null);
                  setIsCourseModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-xl text-white font-bold text-xs bg-[#064E3B] hover:bg-[#053d2e] shadow-md flex items-center gap-2 cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4 text-[#D4AF37]" />
                <span>{adminLang === 'bn' ? 'নতুন কোর্স যোগ করুন' : 'Add New Course'}</span>
              </button>
            </div>

            {/* Courses Grid / Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {courses.map(course => (
                <div 
                  key={course.id}
                  className="bg-white rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="relative h-40 overflow-hidden bg-emerald-950">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white capitalize">
                          {course.category}
                        </span>
                        {course.isPublished ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                            Live
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-600 text-white">
                            Draft
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="space-y-1">
                        <h4 className="text-base font-bold text-gray-900 line-clamp-1">{course.title}</h4>
                        <p className="text-xs text-gray-500 line-clamp-2">{course.description}</p>
                      </div>

                      <div className="pt-2 border-t border-gray-100 grid grid-cols-2 gap-2 text-[11px] text-gray-600">
                        <div>
                          <span className="text-gray-400 block">Duration:</span>
                          <span className="font-semibold">{course.duration}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block">Classes/Week:</span>
                          <span className="font-semibold">{course.classesPerWeek} Classes</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block">Monthly Fee:</span>
                          <span className="font-bold text-[#064E3B]">{formatPrice(course.priceMonthly)}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block">Teacher:</span>
                          <span className="font-semibold truncate block">{course.teacherType}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setEditingCourse(course);
                        setIsCourseModalOpen(true);
                      }}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#064E3B] bg-emerald-50 hover:bg-emerald-100 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>{adminLang === 'bn' ? 'এডিট করুন' : 'Edit Course'}</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(adminLang === 'bn' ? `আপনি কি "${course.title}" কোর্সটি মুছে ফেলতে চান?` : `Delete "${course.title}"?`)) {
                          deleteCourse(course.id);
                          showToast(adminLang === 'bn' ? 'কোর্স মুছে ফেলা হয়েছে!' : 'Course deleted.');
                        }
                      }}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                      title="Delete Course"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. TEACHERS CMS TAB */}
        {/* ========================================================================= */}
        {currentTab === 'teachers' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold font-display text-gray-900">
                  {adminLang === 'bn' ? 'শিক্ষক ও শিক্ষিকাবৃন্দ ম্যানেজমেন্ট' : 'Teachers & Ustadhas Directory'}
                </h2>
                <p className="text-xs text-gray-500">
                  {adminLang === 'bn' 
                    ? 'সকল ক্বারী ও মহিলা শিক্ষিকাদের প্রোফাইল, ইজাজাহ, অভিজ্ঞতা এবং ছবি এডিট করুন।' 
                    : 'Manage male and female teacher profiles, qualifications, and schedules.'}
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingTeacher(null);
                  setIsTeacherModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-xl text-white font-bold text-xs bg-[#064E3B] hover:bg-[#053d2e] shadow-md flex items-center gap-2 cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4 text-[#D4AF37]" />
                <span>{adminLang === 'bn' ? 'নতুন শিক্ষক যোগ করুন' : 'Add New Teacher'}</span>
              </button>
            </div>

            {/* Teacher Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {teachers.map(teacher => (
                <div 
                  key={teacher.id}
                  className="bg-white rounded-3xl border border-gray-200/80 shadow-xs p-6 flex flex-col justify-between hover:shadow-md transition-shadow space-y-4"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={teacher.photo} 
                        alt={teacher.name} 
                        className="w-16 h-16 rounded-2xl object-cover border border-emerald-800/20 shadow-xs"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 leading-tight">{teacher.name}</h4>
                        <p className="text-xs text-[#064E3B] font-semibold">{teacher.title}</p>
                        <span className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          teacher.gender === 'female' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {teacher.gender === 'female' ? 'Female (Ustadha)' : 'Male (Qari)'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-gray-600">
                      <p className="text-[11px] text-gray-700 bg-gray-50 p-2.5 rounded-xl border border-gray-100 font-medium">
                        🎓 {teacher.qualification}
                      </p>
                      <p className="text-[11px] text-gray-500 line-clamp-2">
                        {teacher.bio}
                      </p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {teacher.specialization.slice(0, 3).map((s, i) => (
                          <span key={i} className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md font-semibold">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setEditingTeacher(teacher);
                        setIsTeacherModalOpen(true);
                      }}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#064E3B] bg-emerald-50 hover:bg-emerald-100 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>{adminLang === 'bn' ? 'এডিট করুন' : 'Edit Profile'}</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(adminLang === 'bn' ? `"${teacher.name}" শিক্ষকের প্রোফাইল মুছে ফেলবেন?` : `Delete teacher ${teacher.name}?`)) {
                          deleteTeacher(teacher.id);
                          showToast(adminLang === 'bn' ? 'শিক্ষক প্রোফাইল মুছে ফেলা হয়েছে!' : 'Teacher deleted.');
                        }
                      }}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 5. PRICING PLANS CMS TAB */}
        {/* ========================================================================= */}
        {currentTab === 'pricing' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold font-display text-gray-900">
                  {adminLang === 'bn' ? 'কোর্সের মাসিক ফি ও প্যাকেজ ম্যানেজমেন্ট' : 'Tuition Fee Plans & Pricing CMS'}
                </h2>
                <p className="text-xs text-gray-500">
                  {adminLang === 'bn' 
                    ? 'BDT (৳), USD ($), GBP (£), EUR (€) ইত্যাদি সকল মুদ্রার কোর্স ফি পরিবর্তন করুন।' 
                    : 'Configure monthly fees across global currencies, class frequency, and features.'}
                </p>
              </div>

              <button
                onClick={() => {
                  const newPlan: Omit<PricingPlan, 'id'> = {
                    name: `Custom ${pricingPlans.length + 2} Days Plan`,
                    classesPerWeek: 4,
                    classesPerMonth: 16,
                    classDuration: '30 Minutes',
                    prices: { bdt: 3200, usd: 45, gbp: 36, eur: 40, cad: 58, aud: 65, aed: 165 },
                    features: ['1-on-1 Personalized Classes', 'Flexible Rescheduling', 'Monthly Progress Evaluation'],
                    recommended: false,
                    isPublished: true
                  };
                  addPricingPlan(newPlan);
                  showToast(adminLang === 'bn' ? 'নতুন প্যাকেজ যোগ করা হয়েছে!' : 'New pricing plan added!');
                }}
                className="px-5 py-2.5 rounded-xl text-white font-bold text-xs bg-[#064E3B] hover:bg-[#053d2e] shadow-md flex items-center gap-2 cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4 text-[#D4AF37]" />
                <span>{adminLang === 'bn' ? 'নতুন ফি প্যাকেজ তৈরি' : 'Add Fee Plan'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pricingPlans.map(plan => (
                <div 
                  key={plan.id}
                  className={`bg-white rounded-3xl p-6 border shadow-xs flex flex-col justify-between space-y-4 ${
                    plan.recommended ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/30' : 'border-gray-200/80'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-[#064E3B]">
                        {plan.classesPerWeek} Days / Week
                      </span>
                      {plan.recommended && (
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-gray-950 flex items-center gap-1">
                          <Star className="w-3 h-3 fill-gray-950" />
                          <span>Popular</span>
                        </span>
                      )}
                    </div>

                    <h4 className="text-lg font-bold font-display text-gray-900">{plan.name}</h4>
                    <p className="text-xs text-gray-500">{plan.classesPerMonth} Classes per month • {plan.classDuration}</p>

                    {/* Currency Fee Editors */}
                    <div className="bg-[#FAF8F2] p-3 rounded-2xl border border-gray-200 space-y-2 text-xs">
                      <span className="font-bold text-gray-700 block text-[11px]">Edit Monthly Tuition Fees:</span>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-gray-500">BDT (বাংলাদেশ ৳)</label>
                          <input
                            type="number"
                            value={plan.prices.bdt}
                            onChange={(e) => updatePricingPlan(plan.id, {
                              prices: { ...plan.prices, bdt: Number(e.target.value) }
                            })}
                            className="w-full p-1.5 rounded-lg border border-gray-300 bg-white font-bold"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-gray-500">USD ($ Global)</label>
                          <input
                            type="number"
                            value={plan.prices.usd}
                            onChange={(e) => updatePricingPlan(plan.id, {
                              prices: { ...plan.prices, usd: Number(e.target.value) }
                            })}
                            className="w-full p-1.5 rounded-lg border border-gray-300 bg-white font-bold"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-gray-500">GBP (£ UK)</label>
                          <input
                            type="number"
                            value={plan.prices.gbp}
                            onChange={(e) => updatePricingPlan(plan.id, {
                              prices: { ...plan.prices, gbp: Number(e.target.value) }
                            })}
                            className="w-full p-1.5 rounded-lg border border-gray-300 bg-white"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-gray-500">EUR (€ Europe)</label>
                          <input
                            type="number"
                            value={plan.prices.eur}
                            onChange={(e) => updatePricingPlan(plan.id, {
                              prices: { ...plan.prices, eur: Number(e.target.value) }
                            })}
                            className="w-full p-1.5 rounded-lg border border-gray-300 bg-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Features list */}
                    <ul className="space-y-1 text-xs text-gray-600">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={plan.recommended}
                        onChange={(e) => updatePricingPlan(plan.id, { recommended: e.target.checked })}
                        className="accent-[#064E3B]"
                      />
                      <span>Highlight as Popular</span>
                    </label>

                    <button
                      onClick={() => {
                        if (confirm(adminLang === 'bn' ? 'এই প্যাকেজটি ডিলিট করতে চান?' : 'Delete this pricing plan?')) {
                          deletePricingPlan(plan.id);
                          showToast(adminLang === 'bn' ? 'প্যাকেজ ডিলিট হয়েছে!' : 'Plan deleted.');
                        }
                      }}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 6. FREE TRIAL LEADS TAB */}
        {/* ========================================================================= */}
        {currentTab === 'trials' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xs space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold font-display text-gray-900">
                  {adminLang === 'bn' ? 'ফ্রি ট্রায়াল আবেদন ম্যানেজমেন্ট' : 'Free Trial Booking Leads'}
                </h2>
                <p className="text-xs text-gray-500">
                  {adminLang === 'bn' 
                    ? 'অভিভাবকদের ট্রায়াল বুকিং, স্ট্যাটাস ও এক ক্লিকে হোয়াটসঅ্যাপে যোগাযোগের সুবিধা।' 
                    : 'Manage inbound trial requests, update status, and message parents directly via WhatsApp.'}
                </p>
              </div>

              {/* Status Filters */}
              <div className="flex items-center gap-2">
                <select
                  value={trialFilter}
                  onChange={(e) => setTrialFilter(e.target.value)}
                  className="text-xs font-bold p-2.5 rounded-xl border border-gray-300 bg-white"
                >
                  <option value="all">All Statuses ({trialRequests.length})</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Trial Scheduled">Trial Scheduled</option>
                  <option value="Enrolled">Enrolled</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={adminLang === 'bn' ? 'শিক্ষার্থীর নাম, ফোন বা কোর্স দিয়ে খুঁজুন...' : 'Search leads by student, parent, or phone...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-xs"
              />
            </div>

            {/* Leads Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/70 text-gray-600 font-bold uppercase text-[10px] tracking-wider">
                    <th className="p-3">Student & Parent</th>
                    <th className="p-3">Course & Preference</th>
                    <th className="p-3">WhatsApp / Phone</th>
                    <th className="p-3">Timezone / Slot</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredTrials.map(req => (
                    <tr key={req.id} className="hover:bg-gray-50/50">
                      <td className="p-3">
                        <div className="font-bold text-gray-900">{req.studentName}</div>
                        <div className="text-[11px] text-gray-500">Parent: {req.parentName} ({req.country})</div>
                        <div className="text-[10px] text-gray-400">{req.age} yrs • {req.gender}</div>
                      </td>

                      <td className="p-3">
                        <div className="font-semibold text-emerald-950">{req.preferredCourseTitle}</div>
                        <div className="text-[11px] text-gray-500">Tutor: {req.preferredTeacherGender}</div>
                      </td>

                      <td className="p-3 font-mono">
                        <div className="font-bold text-emerald-800">{req.whatsapp}</div>
                        <div className="text-[10px] text-gray-500">{req.email}</div>
                      </td>

                      <td className="p-3">
                        <div className="text-gray-900 font-medium">{req.preferredTime}</div>
                        <div className="text-[10px] text-gray-500">{req.timezone}</div>
                      </td>

                      <td className="p-3">
                        <select
                          value={req.status}
                          onChange={(e) => {
                            updateTrialStatus(req.id, e.target.value as any);
                            showToast(adminLang === 'bn' ? 'স্ট্যাটাস আপডেট হয়েছে!' : 'Status updated!');
                          }}
                          className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                            req.status === 'New' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                            req.status === 'Contacted' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                            req.status === 'Trial Scheduled' ? 'bg-purple-50 text-purple-800 border-purple-200' :
                            req.status === 'Enrolled' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                            'bg-gray-50 text-gray-800 border-gray-200'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Trial Scheduled">Trial Scheduled</option>
                          <option value="Enrolled">Enrolled</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openWhatsApp(`Assalamu Alaikum ${req.parentName}, this is Online Quran Academy regarding your free trial request for ${req.studentName} for the ${req.preferredCourseTitle}. When is a convenient time for the assessment class?`)}
                            className="p-2 rounded-xl bg-[#25D366] text-white hover:bg-[#20b859] transition-colors cursor-pointer"
                            title="Direct WhatsApp Message"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(adminLang === 'bn' ? 'এই আবেদনটি মুছে ফেলবেন?' : 'Delete this trial request?')) {
                                deleteTrialRequest(req.id);
                                showToast(adminLang === 'bn' ? 'আবেদনটি মুছে ফেলা হয়েছে!' : 'Lead deleted.');
                              }
                            }}
                            className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 7. STUDENT REGISTRATIONS TAB */}
        {/* ========================================================================= */}
        {currentTab === 'students' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xs space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-display text-gray-900">
                  {adminLang === 'bn' ? 'ভর্তি হওয়া শিক্ষার্থী তালিকা' : 'Enrolled Student Registrations'}
                </h2>
                <p className="text-xs text-gray-500">
                  {adminLang === 'bn' 
                    ? 'নিয়মিত ক্লাসে যুক্ত শিক্ষার্থীদের তালিকা, মাসিক ফি ও শিডিউল।' 
                    : 'Active learners enrolled in regular one-to-one Quran classes.'}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/70 text-gray-600 font-bold uppercase text-[10px] tracking-wider">
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Course</th>
                    <th className="p-3">Monthly Tuition</th>
                    <th className="p-3">Days & Schedule</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {registrations.map(reg => (
                    <tr key={reg.id} className="hover:bg-gray-50/50">
                      <td className="p-3">
                        <div className="font-bold text-gray-900">{reg.studentName}</div>
                        <div className="text-[11px] text-gray-500 font-mono">{reg.whatsapp}</div>
                      </td>
                      <td className="p-3 font-semibold text-emerald-950">
                        {reg.courseTitle}
                      </td>
                      <td className="p-3 font-bold text-[#064E3B]">
                        {reg.currency === 'BDT' ? `৳${reg.monthlyFee}` : `$${reg.monthlyFee}`} / Mo
                      </td>
                      <td className="p-3 text-gray-600">
                        <div>{reg.classDays.join(', ')}</div>
                        <div className="text-[10px] text-gray-400">{reg.preferredTime} ({reg.timezone})</div>
                      </td>
                      <td className="p-3">
                        <select
                          value={reg.status}
                          onChange={(e) => {
                            updateRegistrationStatus(reg.id, e.target.value as any);
                            showToast(adminLang === 'bn' ? 'শিক্ষার্থীর স্ট্যাটাস আপডেট হয়েছে!' : 'Status updated!');
                          }}
                          className="text-xs font-bold px-2 py-1 rounded-lg border border-gray-300 bg-white"
                        >
                          <option value="Active">Active</option>
                          <option value="Pending">Pending</option>
                          <option value="On Hold">On Hold</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => openWhatsApp(`Assalamu Alaikum, this is Online Quran Academy reaching out regarding ${reg.studentName}'s Quran classes.`)}
                          className="p-2 rounded-xl bg-[#25D366] text-white hover:bg-[#20b859] transition-colors cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 8. PAYMENT GATEWAYS CMS TAB */}
        {/* ========================================================================= */}
        {currentTab === 'payments' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xs space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl font-bold font-display text-gray-900">
                {adminLang === 'bn' ? 'পেমেন্ট গেটওয়ে ও মোবাইল ব্যাংকিং নম্বর' : 'Payment Gateways & Accounts CMS'}
              </h2>
              <p className="text-xs text-gray-500">
                {adminLang === 'bn' 
                  ? 'বিকাশ, নগদ, রকেট, ব্যাংক ট্রান্সফার ইত্যাদি নম্বর ও পেমেন্ট নির্দেশনাবলী পরিবর্তন করুন।' 
                  : 'Configure bKash, Nagad, bank account numbers and instructions shown to students during checkout.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {paymentMethods.map(method => (
                <div 
                  key={method.id}
                  className="bg-[#FAF8F2] p-5 rounded-3xl border border-gray-200/80 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-[#064E3B]" />
                        <h4 className="font-bold text-gray-900 text-sm">{method.name}</h4>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        method.isEnabled ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {method.isEnabled ? 'Active' : 'Disabled'}
                      </span>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-gray-200 space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Account / Phone:</span>
                        <span className="font-mono font-bold text-gray-900">{method.accountNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Account Type:</span>
                        <span className="font-semibold text-gray-700">{method.accountType}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-gray-600">
                      <strong>Instructions:</strong> {method.instructions}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                    <label className="flex items-center gap-2 font-bold text-xs text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={method.isEnabled}
                        onChange={(e) => {
                          updatePaymentMethod(method.id, { isEnabled: e.target.checked });
                          showToast(adminLang === 'bn' ? 'স্ট্যাটাস পরিবর্তন হয়েছে!' : 'Payment method toggled!');
                        }}
                        className="accent-[#064E3B] w-4 h-4"
                      />
                      <span>Enable</span>
                    </label>

                    <button
                      onClick={() => {
                        setEditingPayment(method);
                        setIsPaymentModalOpen(true);
                      }}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#064E3B] bg-emerald-50 hover:bg-emerald-100 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>{adminLang === 'bn' ? 'নম্বর এডিট করুন' : 'Edit Details'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 9. BLOG CMS TAB */}
        {/* ========================================================================= */}
        {currentTab === 'blog' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold font-display text-gray-900">
                  {adminLang === 'bn' ? 'ইসলামিক ব্লগ ও আর্টিকেলস ম্যানেজমেন্ট' : 'Blog Articles CMS'}
                </h2>
                <p className="text-xs text-gray-500">
                  {adminLang === 'bn' 
                    ? 'তাজবীদ ও কুরআন শিক্ষা বিষয়ক আর্টিকেল লিখুন, সম্পাদনা করুন ও ডিলিট করুন।' 
                    : 'Publish educational Quran and Tajweed articles for parents and learners.'}
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingPost(null);
                  setIsBlogModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-xl text-white font-bold text-xs bg-[#064E3B] hover:bg-[#053d2e] shadow-md flex items-center gap-2 cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4 text-[#D4AF37]" />
                <span>{adminLang === 'bn' ? 'নতুন আর্টিকেল লিখুন' : 'Write New Article'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {blogPosts.map(post => (
                <div 
                  key={post.id}
                  className="bg-white rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-36 object-cover"
                    />
                    <div className="p-5 space-y-2">
                      <span className="text-[10px] font-bold text-[#064E3B] bg-emerald-50 px-2 py-0.5 rounded">
                        {post.category}
                      </span>
                      <h4 className="text-sm font-bold text-gray-900 line-clamp-2">{post.title}</h4>
                      <p className="text-xs text-gray-500 line-clamp-2">{post.excerpt}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setEditingPost(post);
                        setIsBlogModalOpen(true);
                      }}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#064E3B] bg-emerald-50 hover:bg-emerald-100 flex items-center gap-1 cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(adminLang === 'bn' ? 'এই পোস্টটি ডিলিট করতে চান?' : 'Delete this post?')) {
                          deleteBlogPost(post.id);
                          showToast(adminLang === 'bn' ? 'পোস্ট ডিলিট হয়েছে!' : 'Post deleted.');
                        }
                      }}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 10. FAQS CMS TAB */}
        {/* ========================================================================= */}
        {currentTab === 'faqs' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xs space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold font-display text-gray-900">
                  {adminLang === 'bn' ? 'সাধারণ প্রশ্নোত্তর (FAQs) ম্যানেজমেন্ট' : 'FAQs Management'}
                </h2>
                <p className="text-xs text-gray-500">
                  {adminLang === 'bn' 
                    ? 'ওয়েবসাইটের প্রায়শই জিজ্ঞাসিত প্রশ্নোত্তর তৈরি, এডিট ও ডিলিট করুন।' 
                    : 'Manage questions and answers displayed to prospective parents.'}
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingFaq(null);
                  setIsFaqModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-xl text-white font-bold text-xs bg-[#064E3B] hover:bg-[#053d2e] shadow-md flex items-center gap-2 cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4 text-[#D4AF37]" />
                <span>{adminLang === 'bn' ? 'নতুন FAQ যোগ করুন' : 'Add New FAQ'}</span>
              </button>
            </div>

            <div className="divide-y divide-gray-100">
              {faqs.map(faq => (
                <div key={faq.id} className="py-4 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-gray-900">{faq.question}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{faq.answer}</p>
                    <span className="inline-block text-[10px] font-bold text-[#064E3B] bg-emerald-50 px-2 py-0.5 rounded">
                      Category: {faq.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingFaq(faq);
                        setIsFaqModalOpen(true);
                      }}
                      className="p-1.5 text-emerald-700 hover:bg-emerald-50 rounded-lg cursor-pointer"
                      title="Edit FAQ"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(adminLang === 'bn' ? 'এই প্রশ্নোত্তরটি মুছে ফেলবেন?' : 'Delete this FAQ item?')) {
                          deleteFaq(faq.id);
                          showToast(adminLang === 'bn' ? 'FAQ মুছে ফেলা হয়েছে!' : 'FAQ deleted.');
                        }
                      }}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                      title="Delete FAQ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 11. GOOGLE DRIVE LIBRARY TAB */}
        {/* ========================================================================= */}
        {currentTab === 'drive' && (
          <div className="animate-in fade-in duration-200">
            <GoogleDrivePage />
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* ALL MODAL EDITORS */}
      {/* ========================================================================= */}
      <CourseModal
        isOpen={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
        course={editingCourse}
        onSave={handleSaveCourse}
        lang={adminLang}
      />

      <TeacherModal
        isOpen={isTeacherModalOpen}
        onClose={() => setIsTeacherModalOpen(false)}
        teacher={editingTeacher}
        onSave={handleSaveTeacher}
        lang={adminLang}
      />

      <BlogPostModal
        isOpen={isBlogModalOpen}
        onClose={() => setIsBlogModalOpen(false)}
        post={editingPost}
        onSave={handleSaveBlog}
        lang={adminLang}
      />

      <FaqModal
        isOpen={isFaqModalOpen}
        onClose={() => setIsFaqModalOpen(false)}
        faq={editingFaq}
        onSave={handleSaveFaq}
        lang={adminLang}
      />

      <PaymentMethodModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        method={editingPayment}
        onSave={handleSavePaymentMethod}
        lang={adminLang}
      />
    </div>
  );
};
