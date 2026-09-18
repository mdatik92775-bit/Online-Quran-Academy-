export type Role = 'super_admin' | 'admin' | 'teacher' | 'student' | 'guest';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  phone?: string;
  whatsapp?: string;
  country?: string;
  timezone?: string;
  createdAt: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'qaida' | 'reading' | 'tajweed' | 'hifz' | 'translation' | 'islamic_studies' | 'kids' | 'adults';
  description: string;
  image: string;
  duration: string; // e.g., "3-6 Months"
  classDuration: string; // e.g., "30 Minutes"
  classesPerWeek: number; // e.g., 3
  suitableAge: string; // e.g., "Kids (4-12) & Adults"
  teacherType: 'Male & Female Available' | 'Male Only' | 'Female Only';
  priceMonthly: {
    bdt: number;
    usd: number;
    gbp: number;
    eur: number;
    cad: number;
    aud: number;
    aed: number;
  };
  objectives: string[];
  curriculum: {
    level: string;
    lessons: string[];
  }[];
  whoShouldJoin: string[];
  isFeatured: boolean;
  isPublished: boolean;
  order: number;
}

export interface Teacher {
  id: string;
  name: string;
  title: string; // e.g., "Hafiz & Qari", "Alim & Tajweed Expert"
  gender: 'male' | 'female';
  photo: string;
  qualification: string;
  specialization: string[];
  experienceYears: number;
  experience?: string;
  languages: string[];
  bio: string;
  teachingStyle: string;
  availableCourses: string[];
  rating: number;
  reviewCount: number;
  isPublished: boolean;
  availabilityHours: string;
}

export type TrialStatus = 
  | 'New' 
  | 'Pending' 
  | 'Contacted' 
  | 'Trial Scheduled' 
  | 'Trial Completed' 
  | 'Converted' 
  | 'Cancelled';

export interface TrialRequest {
  id: string;
  studentName: string;
  parentName: string;
  age: string;
  gender: 'male' | 'female';
  country: string;
  email: string;
  whatsapp: string;
  currentLevel: string;
  preferredCourseId: string;
  preferredCourseTitle: string;
  preferredTeacherGender: 'male' | 'female' | 'any';
  preferredDays: string[];
  preferredTime: string;
  timezone: string;
  message?: string;
  status: TrialStatus;
  adminNotes?: string;
  createdAt: string;
}

export interface Registration {
  id: string;
  studentName: string;
  parentName: string;
  dob: string;
  gender: 'male' | 'female';
  country: string;
  email: string;
  phone: string;
  whatsapp: string;
  address?: string;
  courseId: string;
  courseTitle: string;
  teacherPreference: 'male' | 'female' | 'any';
  classDays: string[];
  preferredTime: string;
  timezone: string;
  previousExperience: string;
  notes?: string;
  status: 'Pending' | 'Active' | 'On Hold' | 'Completed';
  monthlyFee: number;
  currency: string;
  createdAt: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  classesPerMonth: number;
  classesPerWeek: number;
  classDuration: string;
  recommended: boolean;
  features: string[];
  prices: {
    bdt: number;
    usd: number;
    gbp: number;
    eur: number;
    cad: number;
    aud: number;
    aed: number;
  };
  isPublished: boolean;
}

export interface LiveClass {
  id: string;
  title: string;
  courseId: string;
  courseTitle: string;
  studentId: string;
  studentName: string;
  teacherId: string;
  teacherName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  timezone: string;
  durationMinutes: number;
  platform: 'Zoom' | 'Google Meet' | 'Microsoft Teams' | 'Custom';
  meetingUrl: string;
  meetingPassword?: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled' | 'Missed';
  notes?: string;
}

export interface AttendanceRecord {
  id: string;
  classId: string;
  studentName: string;
  teacherName: string;
  courseTitle: string;
  date: string;
  status: 'Present' | 'Absent' | 'Excused' | 'Late';
  lessonTopicCovered: string;
  studentPerformance: 'Excellent' | 'Good' | 'Needs Practice' | 'Struggling';
  homeworkAssigned?: string;
  teacherRemarks?: string;
}

export interface Testimonial {
  id: string;
  studentOrParentName: string;
  roleDescription: string; // e.g., "Parent of 8-year-old Zayd", "Adult Learner"
  country: string;
  countryFlag?: string;
  photo?: string;
  courseTitle: string;
  rating: number;
  review: string;
  isPublished: boolean;
  isDemo?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Classes' | 'Teachers' | 'Pricing' | 'Trial' | 'Technical';
  order: number;
  isPublished: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  tags: string[];
  readTime: string;
  publishedAt: string;
  isPublished: boolean;
  seoTitle?: string;
  metaDescription?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  isReplied: boolean;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  targetRole: 'all' | 'students' | 'teachers' | 'admins';
  title: string;
  message: string;
  type: 'info' | 'class' | 'payment' | 'announcement';
  date: string;
  isRead?: boolean;
}

export interface PaymentMethodSetting {
  id: string;
  name: string; // "bKash", "Nagad", "Bank Transfer", "Stripe", "PayPal"
  isEnabled: boolean;
  instructions: string;
  accountNumber?: string;
  accountType?: string; // "Merchant", "Personal"
}

export interface AcademySettings {
  brandName: string;
  shortName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  announcementBar: {
    enabled: boolean;
    text: string;
    linkText?: string;
    linkAction?: string;
  };
  hero: {
    badge: string;
    title: string;
    highlightWord: string;
    subtitle: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    whatsappCtaText: string;
    imageUrl: string;
    trustBadges: string[];
  };
  stats: {
    students: string;
    teachers: string;
    countries: string;
    courses: string;
    yearsExperience: string;
  };
  socialLinks: {
    facebook: string;
    instagram: string;
    youtube: string;
    tiktok: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    ogImage: string;
  };
  promotionalPopup: {
    enabled: boolean;
    title: string;
    description: string;
    buttonText: string;
    buttonAction: string;
    imageUrl?: string;
  };
  supportedCurrencies: ('BDT' | 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD' | 'AED')[];
  activeCurrency: 'BDT' | 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD' | 'AED';
}

export type ActivePage = 
  | 'home'
  | 'about'
  | 'courses'
  | 'course-detail'
  | 'teachers'
  | 'teacher-profile'
  | 'pricing'
  | 'free-trial'
  | 'registration'
  | 'how-it-works'
  | 'why-choose-us'
  | 'noorani-qaida'
  | 'quran-reading'
  | 'tajweed'
  | 'hifz'
  | 'translation'
  | 'islamic-studies'
  | 'kids-classes'
  | 'adults-classes'
  | 'male-teachers'
  | 'female-teachers'
  | 'faq'
  | 'blog'
  | 'blog-detail'
  | 'contact'
  | 'privacy-policy'
  | 'terms-conditions'
  | 'refund-policy'
  | 'auth'
  | 'student-dashboard'
  | 'teacher-dashboard'
  | 'admin'
  | 'admin-dashboard'
  | 'google-drive'
  | 'drive';
