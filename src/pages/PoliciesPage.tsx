import React from 'react';
import { useAcademy } from '../context/AcademyContext';
import { ActivePage } from '../types';
import { ShieldCheck, FileText, RotateCcw } from 'lucide-react';

interface Props {
  policyType: 'privacy-policy' | 'terms-conditions' | 'refund-policy';
}

export const PoliciesPage: React.FC<Props> = ({ policyType }) => {
  const { settings } = useAcademy();

  if (policyType === 'privacy-policy') {
    return (
      <div className="min-h-screen bg-[#FAF8F2] pb-24">
        <section className="bg-[#064E3B] text-white py-12 text-center">
          <div className="max-w-4xl mx-auto px-4 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Legal & Compliance</span>
            <h1 className="text-3xl font-bold font-display">Privacy Policy</h1>
            <p className="text-xs text-emerald-100">Last updated: January 2026</p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 bg-white rounded-3xl p-8 sm:p-12 shadow-xs border border-gray-200/80 space-y-6 text-sm text-gray-700 leading-relaxed">
          <h2 className="text-xl font-bold font-display text-[#064E3B]">1. Our Commitment to Privacy</h2>
          <p>
            At {settings.brandName}, we prioritize the privacy and security of our students, children, and families. This policy explains how we collect, handle, and safeguard your personal details.
          </p>

          <h2 className="text-xl font-bold font-display text-[#064E3B]">2. Information We Collect</h2>
          <p>
            We only collect information necessary to facilitate one-to-one Quran classes and provide academic progress updates. This includes student names, ages, parent contact details, WhatsApp phone numbers, and email addresses.
          </p>

          <h2 className="text-xl font-bold font-display text-[#064E3B]">3. Class Recording & Child Safety</h2>
          <p>
            Live online classes are conducted in private meeting rooms. We maintain strict supervisory standards. Video attendance for young female students and sisters is conducted exclusively with verified female instructors (Ustadhas) to maintain complete Islamic modesty and privacy.
          </p>

          <h2 className="text-xl font-bold font-display text-[#064E3B]">4. No Third-Party Data Sharing</h2>
          <p>
            We never sell, rent, or trade your personal or contact information with third-party advertising companies. Contact information is strictly used for class coordination via WhatsApp or email.
          </p>
        </div>
      </div>
    );
  }

  if (policyType === 'terms-conditions') {
    return (
      <div className="min-h-screen bg-[#FAF8F2] pb-24">
        <section className="bg-[#064E3B] text-white py-12 text-center">
          <div className="max-w-4xl mx-auto px-4 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Agreement</span>
            <h1 className="text-3xl font-bold font-display">Terms & Conditions</h1>
            <p className="text-xs text-emerald-100">Last updated: January 2026</p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 bg-white rounded-3xl p-8 sm:p-12 shadow-xs border border-gray-200/80 space-y-6 text-sm text-gray-700 leading-relaxed">
          <h2 className="text-xl font-bold font-display text-[#064E3B]">1. Enrollment & Class Attendance</h2>
          <p>
            Students are expected to arrive punctually for their scheduled online classes via the provided Zoom or Google Meet link. In the event of unavoidable emergencies, parents must inform their teacher or coordinator at least 2 hours prior to schedule a makeup class.
          </p>

          <h2 className="text-xl font-bold font-display text-[#064E3B]">2. Free Trial Policy</h2>
          <p>
            Every new student is entitled to a 3-day complimentary trial with no obligation and no credit card required. Formal enrollment takes place only after the trial period is completed and approved by the parent.
          </p>

          <h2 className="text-xl font-bold font-display text-[#064E3B]">3. Code of Conduct & Islamic Adab</h2>
          <p>
            Both students and tutors are expected to treat one another with utmost respect, patience, and adherence to Islamic etiquette during online learning sessions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F2] pb-24">
      <section className="bg-[#064E3B] text-white py-12 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Transparency</span>
          <h1 className="text-3xl font-bold font-display">Refund & Cancellation Policy</h1>
          <p className="text-xs text-emerald-100">Last updated: January 2026</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 bg-white rounded-3xl p-8 sm:p-12 shadow-xs border border-gray-200/80 space-y-6 text-sm text-gray-700 leading-relaxed">
        <h2 className="text-xl font-bold font-display text-[#064E3B]">1. 100% Satisfaction Guarantee</h2>
        <p>
          We want you to be completely satisfied with your child's Quran tutor. If you are not satisfied with your assigned teacher after the first week of paid classes, we will assign a different teacher free of charge or refund the unused portion of your monthly fee upon request.
        </p>

        <h2 className="text-xl font-bold font-display text-[#064E3B]">2. Pausing or Cancelling Tuition</h2>
        <p>
          You may pause or cancel your monthly subscription at any time by giving 7 days notice before your next monthly billing date. No long-term lock-in contracts exist.
        </p>

        <h2 className="text-xl font-bold font-display text-[#064E3B]">3. Missed & Makeup Classes</h2>
        <p>
          Classes missed due to teacher absence or technical issues on our end are always rescheduled or made up. If a student misses a class with prior notice, up to 2 makeup classes per month are provided.
        </p>
      </div>
    </div>
  );
};
