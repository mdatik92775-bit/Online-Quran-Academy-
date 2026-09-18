import React, { useEffect } from 'react';
import { AcademyProvider, useAcademy } from './context/AcademyContext';
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { FreeTrialModal } from './components/common/FreeTrialModal';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { PromotionalPopup } from './components/common/PromotionalPopup';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { TeachersPage } from './pages/TeachersPage';
import { TeacherProfilePage } from './pages/TeacherProfilePage';
import { PricingPage } from './pages/PricingPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { WhyChooseUsPage } from './pages/WhyChooseUsPage';
import { SpecializedCoursePage } from './pages/SpecializedCoursePages';
import { FaqPage } from './pages/FaqPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { ContactPage } from './pages/ContactPage';
import { FreeTrialPage } from './pages/FreeTrialPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { PoliciesPage } from './pages/PoliciesPage';
import { GoogleDrivePage } from './pages/GoogleDrivePage';

const AppContent: React.FC = () => {
  const { activePage } = useAcademy();

  // Scroll to top upon page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'courses':
        return <CoursesPage />;
      case 'course-detail':
        return <CourseDetailPage />;
      case 'teachers':
        return <TeachersPage />;
      case 'teacher-profile':
        return <TeacherProfilePage />;
      case 'pricing':
        return <PricingPage />;
      case 'how-it-works':
        return <HowItWorksPage />;
      case 'why-choose-us':
        return <WhyChooseUsPage />;
      case 'noorani-qaida':
      case 'quran-reading':
      case 'tajweed':
      case 'hifz':
      case 'translation':
      case 'islamic-studies':
      case 'kids-classes':
      case 'adults-classes':
      case 'male-teachers':
      case 'female-teachers':
        return <SpecializedCoursePage pageType={activePage} />;
      case 'faq':
        return <FaqPage />;
      case 'blog':
        return <BlogPage />;
      case 'blog-detail':
        return <BlogDetailPage />;
      case 'contact':
        return <ContactPage />;
      case 'free-trial':
        return <FreeTrialPage />;
      case 'registration':
        return <RegistrationPage />;
      case 'student-dashboard':
        return <StudentDashboard />;
      case 'teacher-dashboard':
        return <TeacherDashboard />;
      case 'auth':
      case 'admin':
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'google-drive':
      case 'drive':
        return <GoogleDrivePage onBack={() => window.history.back()} />;
      case 'privacy-policy':
      case 'terms-conditions':
      case 'refund-policy':
        return <PoliciesPage policyType={activePage} />;
      default:
        return <HomePage />;
    }
  };

  const isAdmin = activePage === 'admin-dashboard' || activePage === 'admin';

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9] text-[#132A1E]">
      {!isAdmin && <AnnouncementBar />}
      <Header />

      <main className="flex-1">
        {renderPage()}
      </main>

      {!isAdmin && <Footer />}

      {/* Floating Elements */}
      <FloatingWhatsApp />
      <FreeTrialModal />
      <PromotionalPopup />
    </div>
  );
};

export default function App() {
  return (
    <AcademyProvider>
      <AppContent />
    </AcademyProvider>
  );
}
