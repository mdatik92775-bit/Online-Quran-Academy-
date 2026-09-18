import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  AcademySettings, 
  Course, 
  Teacher, 
  PricingPlan, 
  FAQItem, 
  BlogPost, 
  Testimonial, 
  PaymentMethodSetting, 
  TrialRequest, 
  Registration, 
  LiveClass, 
  AttendanceRecord, 
  ContactMessage, 
  NotificationItem, 
  ActivePage,
  UserProfile,
  Role,
  TrialStatus
} from '../types';
import { 
  initialAcademySettings, 
  initialCourses, 
  initialTeachers, 
  initialPricingPlans, 
  initialFaqs, 
  initialTestimonials, 
  initialBlogPosts, 
  initialPaymentMethods,
  initialSampleClasses
} from '../data/initialData';

interface AcademyContextType {
  // Navigation & Page State
  activePage: ActivePage;
  selectedCourseSlug: string | null;
  selectedTeacherId: string | null;
  selectedBlogSlug: string | null;
  navigateTo: (page: ActivePage, param?: string) => void;

  // Language & Direction
  language: 'en' | 'bn' | 'ar';
  direction: 'ltr' | 'rtl';
  setLanguage: (lang: 'en' | 'bn' | 'ar') => void;

  // Currency
  activeCurrency: 'BDT' | 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD' | 'AED';
  setActiveCurrency: (cur: 'BDT' | 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD' | 'AED') => void;
  formatPrice: (prices: { bdt: number; usd: number; gbp: number; eur: number; cad: number; aud: number; aed: number }) => string;

  // Authentication
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;
  quickSwitchRole: (role: Role) => void;
  login: (email: string, role?: Role) => boolean;
  logout: () => void;

  // Data Collections & CRUD
  settings: AcademySettings;
  updateSettings: (newSettings: Partial<AcademySettings>) => void;

  courses: Course[];
  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (id: string, course: Partial<Course>) => void;
  deleteCourse: (id: string) => void;

  teachers: Teacher[];
  addTeacher: (teacher: Omit<Teacher, 'id'>) => void;
  updateTeacher: (id: string, teacher: Partial<Teacher>) => void;
  deleteTeacher: (id: string) => void;

  pricingPlans: PricingPlan[];
  addPricingPlan: (plan: Omit<PricingPlan, 'id'>) => void;
  updatePricingPlan: (id: string, plan: Partial<PricingPlan>) => void;
  deletePricingPlan: (id: string) => void;

  faqs: FAQItem[];
  addFaq: (faq: Omit<FAQItem, 'id'>) => void;
  updateFaq: (id: string, faq: Partial<FAQItem>) => void;
  deleteFaq: (id: string) => void;

  testimonials: Testimonial[];
  addTestimonial: (test: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, test: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;

  blogPosts: BlogPost[];
  addBlogPost: (post: Omit<BlogPost, 'id'>) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;

  paymentMethods: PaymentMethodSetting[];
  updatePaymentMethod: (id: string, method: Partial<PaymentMethodSetting>) => void;

  // Trial Requests
  trialRequests: TrialRequest[];
  submitTrialRequest: (data: Omit<TrialRequest, 'id' | 'createdAt' | 'status'>) => void;
  updateTrialStatus: (id: string, status: TrialStatus, notes?: string) => void;
  deleteTrialRequest: (id: string) => void;

  // Registrations
  registrations: Registration[];
  submitRegistration: (data: Omit<Registration, 'id' | 'createdAt' | 'status'>) => void;
  updateRegistrationStatus: (id: string, status: 'Pending' | 'Active' | 'On Hold' | 'Completed') => void;

  // Classes & Attendance
  classes: LiveClass[];
  addClass: (cls: Omit<LiveClass, 'id'>) => void;
  updateClass: (id: string, cls: Partial<LiveClass>) => void;
  deleteClass: (id: string) => void;
  attendanceRecords: AttendanceRecord[];
  addAttendanceRecord: (record: Omit<AttendanceRecord, 'id'>) => void;

  // Messages & Notifications
  contactMessages: ContactMessage[];
  submitContactMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'isReplied'>) => void;
  markContactReplied: (id: string) => void;
  deleteContactMessage: (id: string) => void;

  notifications: NotificationItem[];
  sendNotification: (notif: Omit<NotificationItem, 'id' | 'date'>) => void;
  markNotificationRead: (id: string) => void;

  // Free Trial Modal Controller
  isTrialModalOpen: boolean;
  openTrialModal: (preferredCourseTitle?: string) => void;
  closeTrialModal: () => void;
  trialModalPreselectedCourse: string | null;

  // Promotional Popup
  isPromoPopupDismissed: boolean;
  dismissPromoPopup: () => void;

  // Utilities
  resetToDemoData: () => void;
  exportToCSV: (type: 'trials' | 'registrations' | 'attendance') => void;
  openWhatsApp: (customMsg?: string) => void;
}

const AcademyContext = createContext<AcademyContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SETTINGS: 'oqa_settings_v1',
  COURSES: 'oqa_courses_v1',
  TEACHERS: 'oqa_teachers_v1',
  PRICING: 'oqa_pricing_v1',
  FAQS: 'oqa_faqs_v1',
  TESTIMONIALS: 'oqa_testimonials_v1',
  BLOG: 'oqa_blog_v1',
  PAYMENTS: 'oqa_payments_v1',
  TRIALS: 'oqa_trials_v1',
  REGISTRATIONS: 'oqa_registrations_v1',
  CLASSES: 'oqa_classes_v1',
  ATTENDANCE: 'oqa_attendance_v1',
  MESSAGES: 'oqa_messages_v1',
  NOTIFICATIONS: 'oqa_notifications_v1',
  AUTH: 'oqa_auth_user_v1'
};

export const AcademyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Routing / View State
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedCourseSlug, setSelectedCourseSlug] = useState<string | null>(null);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null);

  // Language & Direction
  const [language, setLanguageState] = useState<'en' | 'bn' | 'ar'>('en');
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  const setLanguage = (lang: 'en' | 'bn' | 'ar') => {
    setLanguageState(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  // Currency
  const [activeCurrency, setActiveCurrencyState] = useState<'BDT' | 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD' | 'AED'>('BDT');

  const setActiveCurrency = (cur: 'BDT' | 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD' | 'AED') => {
    setActiveCurrencyState(cur);
    setSettings(prev => ({ ...prev, activeCurrency: cur }));
  };

  // Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const isAdminAuthed = localStorage.getItem('oqa_admin_authenticated') === 'true';
    if (isAdminAuthed) {
      return {
        id: 'usr-aradmin',
        name: 'Super Admin (aradmin)',
        email: 'aradmin@onlinequranacademy.org',
        role: 'super_admin',
        phone: '01746349167',
        whatsapp: '01746349167',
        country: 'Bangladesh',
        createdAt: '2026-09-07'
      };
    }
    const saved = localStorage.getItem(STORAGE_KEYS.AUTH);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(currentUser));
      if (currentUser.role === 'super_admin') {
        localStorage.setItem('oqa_admin_authenticated', 'true');
      }
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH);
      localStorage.removeItem('oqa_admin_authenticated');
    }
  }, [currentUser]);

  const quickSwitchRole = (role: Role) => {
    if (role === 'guest') {
      setCurrentUser(null);
      localStorage.removeItem('oqa_admin_authenticated');
      return;
    }
    const demoProfiles: Record<Exclude<Role, 'guest'>, UserProfile> = {
      super_admin: {
        id: 'usr-aradmin',
        name: 'Super Admin (aradmin)',
        email: 'aradmin@onlinequranacademy.org',
        role: 'super_admin',
        phone: '01746349167',
        whatsapp: '01746349167',
        country: 'Bangladesh',
        createdAt: '2026-09-07'
      },
      admin: {
        id: 'usr-admin-2',
        name: 'Academy Manager',
        email: 'manager@onlinequranacademy.org',
        role: 'admin',
        phone: '01746349167',
        whatsapp: '01746349167',
        country: 'Bangladesh',
        createdAt: '2025-02-01'
      },
      teacher: {
        id: 'teacher-1',
        name: 'Shaykh Hafiz Abdullah Al-Mamun',
        email: 'hafiz.mamun@oqa.com',
        role: 'teacher',
        phone: '01746349167',
        whatsapp: '01746349167',
        country: 'Bangladesh',
        createdAt: '2025-03-01'
      },
      student: {
        id: 'student-1',
        name: 'Zayd Al-Mansoor',
        email: 'zayd.student@gmail.com',
        role: 'student',
        phone: '01746349167',
        whatsapp: '01746349167',
        country: 'United Kingdom',
        createdAt: '2026-01-15'
      }
    };
    setCurrentUser(demoProfiles[role]);
    if (role === 'super_admin') {
      localStorage.setItem('oqa_admin_authenticated', 'true');
    }
  };

  const login = (email: string, preferredRole?: Role): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail === 'aradmin' || cleanEmail === 'aradmin@onlinequranacademy.org') {
      localStorage.setItem('oqa_admin_authenticated', 'true');
      setCurrentUser({
        id: 'usr-aradmin',
        name: 'Super Admin (aradmin)',
        email: 'aradmin@onlinequranacademy.org',
        role: 'super_admin',
        phone: '01746349167',
        whatsapp: '01746349167',
        country: 'Bangladesh',
        createdAt: '2026-09-07'
      });
      return true;
    }
    const role: Role = preferredRole || (email.includes('admin') ? 'super_admin' : email.includes('teacher') ? 'teacher' : 'student');
    quickSwitchRole(role);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('oqa_admin_authenticated');
    setCurrentUser(null);
    navigateTo('home');
  };

  // Main Persistent States
  const [settings, setSettings] = useState<AcademySettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : initialAcademySettings;
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COURSES);
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TEACHERS);
    if (!saved) return initialTeachers;
    try {
      const parsed: Teacher[] = JSON.parse(saved);
      const hasAtikur = parsed.some(t => t.id === 'teacher-atikur' || t.name.toLowerCase().includes('atikur rahman'));
      if (!hasAtikur) {
        const atikurTeacher = initialTeachers.find(t => t.id === 'teacher-atikur');
        return atikurTeacher ? [atikurTeacher, ...parsed] : initialTeachers;
      }
      return parsed;
    } catch {
      return initialTeachers;
    }
  });

  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRICING);
    return saved ? JSON.parse(saved) : initialPricingPlans;
  });

  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FAQS);
    return saved ? JSON.parse(saved) : initialFaqs;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
    return saved ? JSON.parse(saved) : initialTestimonials;
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BLOG);
    return saved ? JSON.parse(saved) : initialBlogPosts;
  });

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodSetting[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PAYMENTS);
    return saved ? JSON.parse(saved) : initialPaymentMethods;
  });

  const [trialRequests, setTrialRequests] = useState<TrialRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TRIALS);
    if (saved) return JSON.parse(saved);
    // Initial realistic trial requests
    return [
      {
        id: 'trial-1',
        studentName: 'Yusuf Ahmed',
        parentName: 'Bashir Ahmed',
        age: '8',
        gender: 'male',
        country: 'United States',
        email: 'bashir.ahmed@example.com',
        whatsapp: '+1 415 555 2671',
        currentLevel: 'Absolute Beginner',
        preferredCourseId: 'course-1',
        preferredCourseTitle: 'Noorani Qaida Course',
        preferredTeacherGender: 'male',
        preferredDays: ['Monday', 'Wednesday', 'Friday'],
        preferredTime: 'Evening (6:00 PM EST)',
        timezone: 'America/New_York (EST)',
        message: 'Looking for a patient teacher who speaks clear English.',
        status: 'Trial Scheduled',
        adminNotes: 'Assigned to Shaykh Abdullah for Sept 8th trial at 6 PM EST.',
        createdAt: '2026-09-04T10:15:00Z'
      },
      {
        id: 'trial-2',
        studentName: 'Zainab Hossain',
        parentName: 'Nasrin Akhter',
        age: '6',
        gender: 'female',
        country: 'United Kingdom',
        email: 'nasrin.hossain@example.co.uk',
        whatsapp: '+44 7911 123456',
        currentLevel: 'Can read some Arabic letters',
        preferredCourseId: 'course-10',
        preferredCourseTitle: 'Kids Quran & Character Building Course',
        preferredTeacherGender: 'female',
        preferredDays: ['Tuesday', 'Thursday', 'Saturday'],
        preferredTime: '5:00 PM GMT',
        timezone: 'Europe/London (GMT)',
        message: 'Kindly assign a female teacher who uses visual slides.',
        status: 'New',
        createdAt: '2026-09-06T08:30:00Z'
      }
    ];
  });

  const [registrations, setRegistrations] = useState<Registration[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'reg-1',
        studentName: 'Zayd Al-Mansoor',
        parentName: 'Mansoor Ali',
        dob: '2018-05-14',
        gender: 'male',
        country: 'United Kingdom',
        email: 'mansoor.ali@gmail.com',
        phone: '+44 7700 900077',
        whatsapp: '+44 7700 900077',
        courseId: 'course-1',
        courseTitle: 'Noorani Qaida Course',
        teacherPreference: 'male',
        classDays: ['Monday', 'Wednesday', 'Friday'],
        preferredTime: '18:00',
        timezone: 'Europe/London',
        previousExperience: 'Started Arabic alphabet at home',
        status: 'Active',
        monthlyFee: 35,
        currency: 'USD',
        createdAt: '2026-08-20T14:00:00Z'
      }
    ];
  });

  const [classes, setClasses] = useState<LiveClass[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CLASSES);
    return saved ? JSON.parse(saved) : initialSampleClasses;
  });

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'att-1',
        classId: 'class-1',
        studentName: 'Zayd Al-Mansoor',
        teacherName: 'Shaykh Hafiz Maulana Abdullah Al-Mamun',
        courseTitle: 'Noorani Qaida Course',
        date: '2026-09-04',
        status: 'Present',
        lessonTopicCovered: 'Lesson 3: Harakat Fathah pronunciation drill',
        studentPerformance: 'Good',
        homeworkAssigned: 'Repeat practice sheet page 12 twice before next class',
        teacherRemarks: 'Excellent focus today, very respectful and eager to learn.'
      }
    ];
  });

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'msg-1',
        name: 'Farhan Kabir',
        email: 'farhan.k@outlook.com',
        phone: '01711223344',
        subject: 'Inquiry regarding Weekend Hifz Batch',
        message: 'Assalamu Alaikum, do you offer intensive Hifz classes specifically on Saturdays and Sundays for school going teens?',
        isReplied: true,
        createdAt: '2026-09-05T16:20:00Z'
      }
    ];
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'notif-1',
        targetRole: 'all',
        title: 'Welcome to Online Quran Academy',
        message: 'May Allah bless your Quran learning journey. Check out our newly launched Tajweed guides!',
        type: 'announcement',
        date: '2026-09-01',
        isRead: false
      }
    ];
  });

  // Free Trial Modal State
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [trialModalPreselectedCourse, setTrialModalPreselectedCourse] = useState<string | null>(null);

  const openTrialModal = (preferredCourseTitle?: string) => {
    if (preferredCourseTitle) {
      setTrialModalPreselectedCourse(preferredCourseTitle);
    }
    setIsTrialModalOpen(true);
  };

  const closeTrialModal = () => {
    setIsTrialModalOpen(false);
    setTrialModalPreselectedCourse(null);
  };

  // Promotional Popup State
  const [isPromoPopupDismissed, setIsPromoPopupDismissed] = useState(() => {
    return sessionStorage.getItem('oqa_promo_dismissed') === 'true';
  });

  const dismissPromoPopup = () => {
    setIsPromoPopupDismissed(true);
    sessionStorage.setItem('oqa_promo_dismissed', 'true');
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify(teachers));
  }, [teachers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRICING, JSON.stringify(pricingPlans));
  }, [pricingPlans]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BLOG, JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(paymentMethods));
  }, [paymentMethods]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRIALS, JSON.stringify(trialRequests));
  }, [trialRequests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(contactMessages));
  }, [contactMessages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  // Navigation router
  const navigateTo = (page: ActivePage, param?: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (page === 'course-detail' && param) {
      setSelectedCourseSlug(param);
    } else if (page === 'teacher-profile' && param) {
      setSelectedTeacherId(param);
    } else if (page === 'blog-detail' && param) {
      setSelectedBlogSlug(param);
    }
  };

  // Price Formatter Helper
  const formatPrice = (prices: { bdt: number; usd: number; gbp: number; eur: number; cad: number; aud: number; aed: number }) => {
    const symbolMap: Record<string, string> = {
      BDT: '৳',
      USD: '$',
      GBP: '£',
      EUR: '€',
      CAD: 'CA$',
      AUD: 'AU$',
      AED: 'AED '
    };
    const key = activeCurrency.toLowerCase() as keyof typeof prices;
    const amount = prices[key] || prices.bdt;
    return `${symbolMap[activeCurrency] || ''}${amount.toLocaleString()}`;
  };

  // WhatsApp Helper
  const openWhatsApp = (customMsg?: string) => {
    const num = settings.whatsapp.replace(/[^0-9]/g, '');
    const cleanNum = num.startsWith('88') ? num : (num.startsWith('0') ? `88${num}` : `880${num}`);
    const defaultText = encodeURIComponent(
      customMsg || "Assalamu Alaikum, I would like to know more about Online Quran Academy."
    );
    window.open(`https://wa.me/${cleanNum}?text=${defaultText}`, '_blank');
  };

  // Settings CRUD
  const updateSettings = (newSettings: Partial<AcademySettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Courses CRUD
  const addCourse = (course: Omit<Course, 'id'>) => {
    const newCourse: Course = {
      ...course,
      id: `course-${Date.now()}`
    };
    setCourses(prev => [newCourse, ...prev]);
  };

  const updateCourse = (id: string, updated: Partial<Course>) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c));
  };

  const deleteCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  // Teachers CRUD
  const addTeacher = (teacher: Omit<Teacher, 'id'>) => {
    const newTeacher: Teacher = {
      ...teacher,
      id: `teacher-${Date.now()}`
    };
    setTeachers(prev => [newTeacher, ...prev]);
  };

  const updateTeacher = (id: string, updated: Partial<Teacher>) => {
    setTeachers(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t));
  };

  const deleteTeacher = (id: string) => {
    setTeachers(prev => prev.filter(t => t.id !== id));
  };

  // Pricing Plans CRUD
  const addPricingPlan = (plan: Omit<PricingPlan, 'id'>) => {
    const newPlan: PricingPlan = {
      ...plan,
      id: `plan-${Date.now()}`
    };
    setPricingPlans(prev => [...prev, newPlan]);
  };

  const updatePricingPlan = (id: string, updated: Partial<PricingPlan>) => {
    setPricingPlans(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  };

  const deletePricingPlan = (id: string) => {
    setPricingPlans(prev => prev.filter(p => p.id !== id));
  };

  // FAQs CRUD
  const addFaq = (faq: Omit<FAQItem, 'id'>) => {
    const newFaq: FAQItem = {
      ...faq,
      id: `faq-${Date.now()}`
    };
    setFaqs(prev => [...prev, newFaq]);
  };

  const updateFaq = (id: string, updated: Partial<FAQItem>) => {
    setFaqs(prev => prev.map(f => f.id === id ? { ...f, ...updated } : f));
  };

  const deleteFaq = (id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
  };

  // Testimonials CRUD
  const addTestimonial = (test: Omit<Testimonial, 'id'>) => {
    const newTest: Testimonial = {
      ...test,
      id: `test-${Date.now()}`
    };
    setTestimonials(prev => [newTest, ...prev]);
  };

  const updateTestimonial = (id: string, updated: Partial<Testimonial>) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t));
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  // Blog Posts CRUD
  const addBlogPost = (post: Omit<BlogPost, 'id'>) => {
    const newPost: BlogPost = {
      ...post,
      id: `blog-${Date.now()}`
    };
    setBlogPosts(prev => [newPost, ...prev]);
  };

  const updateBlogPost = (id: string, updated: Partial<BlogPost>) => {
    setBlogPosts(prev => prev.map(b => b.id === id ? { ...b, ...updated } : b));
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(b => b.id !== id));
  };

  // Payment Methods
  const updatePaymentMethod = (id: string, updated: Partial<PaymentMethodSetting>) => {
    setPaymentMethods(prev => prev.map(m => m.id === id ? { ...m, ...updated } : m));
  };

  // Free Trial Submissions
  const submitTrialRequest = (data: Omit<TrialRequest, 'id' | 'createdAt' | 'status'>) => {
    const newReq: TrialRequest = {
      ...data,
      id: `trial-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    setTrialRequests(prev => [newReq, ...prev]);
  };

  const updateTrialStatus = (id: string, status: TrialStatus, notes?: string) => {
    setTrialRequests(prev => prev.map(r => r.id === id ? { 
      ...r, 
      status, 
      adminNotes: notes !== undefined ? notes : r.adminNotes 
    } : r));
  };

  const deleteTrialRequest = (id: string) => {
    setTrialRequests(prev => prev.filter(r => r.id !== id));
  };

  // Registrations
  const submitRegistration = (data: Omit<Registration, 'id' | 'createdAt' | 'status'>) => {
    const newReg: Registration = {
      ...data,
      id: `reg-${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    setRegistrations(prev => [newReg, ...prev]);
  };

  const updateRegistrationStatus = (id: string, status: 'Pending' | 'Active' | 'On Hold' | 'Completed') => {
    setRegistrations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  // Classes & Attendance
  const addClass = (cls: Omit<LiveClass, 'id'>) => {
    const newClass: LiveClass = {
      ...cls,
      id: `class-${Date.now()}`
    };
    setClasses(prev => [newClass, ...prev]);
  };

  const updateClass = (id: string, updated: Partial<LiveClass>) => {
    setClasses(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c));
  };

  const deleteClass = (id: string) => {
    setClasses(prev => prev.filter(c => c.id !== id));
  };

  const addAttendanceRecord = (record: Omit<AttendanceRecord, 'id'>) => {
    const newRecord: AttendanceRecord = {
      ...record,
      id: `att-${Date.now()}`
    };
    setAttendanceRecords(prev => [newRecord, ...prev]);
  };

  // Contact Messages
  const submitContactMessage = (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'isReplied'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      isReplied: false,
      createdAt: new Date().toISOString()
    };
    setContactMessages(prev => [newMsg, ...prev]);
  };

  const markContactReplied = (id: string) => {
    setContactMessages(prev => prev.map(m => m.id === id ? { ...m, isReplied: true } : m));
  };

  const deleteContactMessage = (id: string) => {
    setContactMessages(prev => prev.filter(m => m.id !== id));
  };

  // Notifications
  const sendNotification = (notif: Omit<NotificationItem, 'id' | 'date'>) => {
    const newNotif: NotificationItem = {
      ...notif,
      id: `notif-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      isRead: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  // Reset to initial demo data
  const resetToDemoData = () => {
    localStorage.clear();
    setSettings(initialAcademySettings);
    setCourses(initialCourses);
    setTeachers(initialTeachers);
    setPricingPlans(initialPricingPlans);
    setFaqs(initialFaqs);
    setTestimonials(initialTestimonials);
    setBlogPosts(initialBlogPosts);
    setPaymentMethods(initialPaymentMethods);
    setClasses(initialSampleClasses);
  };

  // CSV Export utility
  const exportToCSV = (type: 'trials' | 'registrations' | 'attendance') => {
    let headers: string[] = [];
    let rows: (string | number)[][] = [];
    let filename = `oqa_${type}_${Date.now()}.csv`;

    if (type === 'trials') {
      headers = ['ID', 'Student Name', 'Parent Name', 'Age', 'Gender', 'Country', 'Email', 'WhatsApp', 'Course', 'Status', 'Date'];
      rows = trialRequests.map(t => [
        t.id,
        t.studentName,
        t.parentName,
        t.age,
        t.gender,
        t.country,
        t.email,
        t.whatsapp,
        t.preferredCourseTitle,
        t.status,
        t.createdAt
      ]);
    } else if (type === 'registrations') {
      headers = ['ID', 'Student Name', 'Parent Name', 'Gender', 'Country', 'Email', 'WhatsApp', 'Course', 'Status', 'Fee', 'Currency', 'Date'];
      rows = registrations.map(r => [
        r.id,
        r.studentName,
        r.parentName,
        r.gender,
        r.country,
        r.email,
        r.whatsapp,
        r.courseTitle,
        r.status,
        r.monthlyFee,
        r.currency,
        r.createdAt
      ]);
    } else if (type === 'attendance') {
      headers = ['ID', 'Date', 'Student Name', 'Teacher Name', 'Course', 'Status', 'Lesson Covered', 'Performance'];
      rows = attendanceRecords.map(a => [
        a.id,
        a.date,
        a.studentName,
        a.teacherName,
        a.courseTitle,
        a.status,
        a.lessonTopicCovered,
        a.studentPerformance
      ]);
    }

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AcademyContext.Provider value={{
      activePage,
      selectedCourseSlug,
      selectedTeacherId,
      selectedBlogSlug,
      navigateTo,
      language,
      direction,
      setLanguage,
      activeCurrency,
      setActiveCurrency,
      formatPrice,
      currentUser,
      setCurrentUser,
      quickSwitchRole,
      login,
      logout,
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
      faqs,
      addFaq,
      updateFaq,
      deleteFaq,
      testimonials,
      addTestimonial,
      updateTestimonial,
      deleteTestimonial,
      blogPosts,
      addBlogPost,
      updateBlogPost,
      deleteBlogPost,
      paymentMethods,
      updatePaymentMethod,
      trialRequests,
      submitTrialRequest,
      updateTrialStatus,
      deleteTrialRequest,
      registrations,
      submitRegistration,
      updateRegistrationStatus,
      classes,
      addClass,
      updateClass,
      deleteClass,
      attendanceRecords,
      addAttendanceRecord,
      contactMessages,
      submitContactMessage,
      markContactReplied,
      deleteContactMessage,
      notifications,
      sendNotification,
      markNotificationRead,
      isTrialModalOpen,
      openTrialModal,
      closeTrialModal,
      trialModalPreselectedCourse,
      isPromoPopupDismissed,
      dismissPromoPopup,
      resetToDemoData,
      exportToCSV,
      openWhatsApp
    }}>
      {children}
    </AcademyContext.Provider>
  );
};

export const useAcademy = () => {
  const context = useContext(AcademyContext);
  if (!context) {
    throw new Error('useAcademy must be used within an AcademyProvider');
  }
  return context;
};
