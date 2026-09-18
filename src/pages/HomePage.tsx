import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { StatsSection } from '../components/home/StatsSection';
import { CoursesPreview } from '../components/home/CoursesPreview';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { HowItWorks } from '../components/home/HowItWorks';
import { TeachersPreview } from '../components/home/TeachersPreview';
import { PricingPreview } from '../components/home/PricingPreview';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { FaqPreview } from '../components/home/FaqPreview';
import { HomeCta } from '../components/home/HomeCta';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <CoursesPreview />
      <WhyChooseUs />
      <HowItWorks />
      <TeachersPreview />
      <PricingPreview />
      <TestimonialsSection />
      <FaqPreview />
      <HomeCta />
    </div>
  );
};
