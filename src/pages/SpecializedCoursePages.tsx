import React from 'react';
import { useAcademy } from '../context/AcademyContext';
import { ActivePage } from '../types';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Award, 
  UserCheck, 
  MessageCircle, 
  ArrowRight,
  ShieldCheck,
  Star
} from 'lucide-react';

interface Props {
  pageType: ActivePage;
}

export const SpecializedCoursePage: React.FC<Props> = ({ pageType }) => {
  const { openTrialModal, openWhatsApp, formatPrice, courses, teachers, navigateTo, settings } = useAcademy();

  const getPageData = () => {
    switch (pageType) {
      case 'noorani-qaida':
        return {
          title: "Online Noorani Qaida Course",
          subtitle: "Master Arabic letter shapes, correct phonetics, and joining letters for beginners & kids.",
          badge: "Beginner Foundation",
          matchedCourseSlug: "noorani-qaida-course",
          targetAudience: "Children aged 4+ and adult absolute beginners who cannot yet read Arabic letters.",
          highlights: [
            "Learn accurate Makharij (points of vocal articulation)",
            "Step-by-step letter recognition, compound letters, and vowels (Harakat)",
            "Maddah rules, Tanween, Sukoon, Shaddah, and silent letters",
            "Smooth transition to reading small Surahs from the Holy Quran"
          ],
          idealDuration: "2 to 4 Months",
          faq: [
            { q: "Can a 4-year-old child learn Noorani Qaida online?", a: "Yes! Our specialized teachers use visual slides, interactive letter coloring, and gentle repetition designed specifically for young attention spans." },
            { q: "How long does it take to finish the Qaida?", a: "Most children complete the Noorani Qaida in 3 to 4 months with 3 to 4 classes per week." }
          ]
        };

      case 'quran-reading':
        return {
          title: "Quran Reading (Nazra) Course",
          subtitle: "Develop smooth, confident, and fluent reading of the Holy Quran with basic Tajweed rules.",
          badge: "Fluency & Reading",
          matchedCourseSlug: "quran-reading-nazra",
          targetAudience: "Students who completed Qaida and wish to read directly from the Mus'haf fluently.",
          highlights: [
            "Practice reading complete Juz with rhythmic ease and proper breath control",
            "Eliminate hesitation, stuttering, and phonetic stumbling",
            "Understand Waqf (stopping signs) and basic Sajdah rules",
            "Read Juz Amma (30th Para) with beautiful melodic tone"
          ],
          idealDuration: "6 to 12 Months",
          faq: [
            { q: "What if my child reads very slowly?", a: "Our one-to-one format ensures the tutor listens patiently to every single word, correcting errors gently without creating anxiety." }
          ]
        };

      case 'tajweed':
        return {
          title: "Quran with Tajweed Course",
          subtitle: "Learn the scientific and melodic rules of Tajweed as taught by the Prophet Muhammad (PBUH).",
          badge: "Classical Tajweed",
          matchedCourseSlug: "quran-with-tajweed",
          targetAudience: "Anyone wishing to eliminate hidden recitation errors (Lahn Khafi) and recite beautifully.",
          highlights: [
            "Noon Sakinah and Tanween (Izhar, Idgham, Iqlab, Ikhfa)",
            "Meem Sakinah rules and Qalqalah variations",
            "Rules of heavy and light letters (Tafkheem and Tarqeeq)",
            "Rules of Madd (prolongation) from 2 to 6 Harakat"
          ],
          idealDuration: "6 Months",
          faq: [
            { q: "Is this course practical or just theoretical?", a: "It is 80% practical recitation drill with 20% theory, ensuring you recite accurately while understanding the classical rule names." }
          ]
        };

      case 'hifz':
        return {
          title: "Quran Memorization (Hifz) Course",
          subtitle: "Fulfill the sacred dream of memorizing the Holy Quran with daily Sabaq, Sabqi, and Manzil.",
          badge: "Sacred Memorization",
          matchedCourseSlug: "quran-memorization-hifz",
          targetAudience: "Dedicated students and adults aiming to memorize selected Surahs or the entire 30 Juz.",
          highlights: [
            "Proven 3-tier memorization cycle: New Lesson (Sabaq), Recent Revision (Sabqi), Old Revision (Manzil)",
            "Daily recitation drill to prevent forgetting previously memorized Surahs",
            "Supervised by Hafiz-e-Quran scholars with continuous Sanad",
            "Flexible pace: memorize 1 Juz per year or fast-track"
          ],
          idealDuration: "1 to 3 Years",
          faq: [
            { q: "Can adults memorize the Quran online?", a: "SubhanAllah, yes! Many working adults memorize Surah Al-Baqarah, Surah Al-Kahf, and the 30th Juz through 30-minute daily morning or evening classes." }
          ]
        };

      case 'translation':
        return {
          title: "Quran Translation & Understanding Course",
          subtitle: "Discover the profound meaning, context, and spiritual guidance of Allah's revelation.",
          badge: "Quranic Meaning",
          matchedCourseSlug: "quran-translation-course",
          targetAudience: "Sisters, brothers, and teens who wish to understand what they recite in daily Salah.",
          highlights: [
            "Word-by-word Arabic vocabulary breakdown",
            "Asbab al-Nuzul (contexts of revelation)",
            "Practical moral and spiritual lessons for daily contemporary life",
            "Grammar patterns that unlock 80% of Quranic vocabulary"
          ],
          idealDuration: "6 to 12 Months",
          faq: [
            { q: "Do I need to know classical Arabic beforehand?", a: "No prior Arabic grammar knowledge is required; we start with accessible vocabulary." }
          ]
        };

      case 'islamic-studies':
        return {
          title: "Islamic Studies & Daily Duas Course",
          subtitle: "Essential knowledge for every Muslim: Salah, Wudu, Pillars of Faith, Seerah, and daily Du'as.",
          badge: "Holistic Islamic Education",
          matchedCourseSlug: "islamic-studies-for-kids",
          targetAudience: "Children and new Muslims wanting comprehensive Islamic moral foundation.",
          highlights: [
            "Practical step-by-step Salah and Wudu correction",
            "Memorization of daily Masnoon Du'as with meanings",
            "Stories of the 25 Prophets and companions (Sahaba)",
            "Islamic manners (Adab), honesty, cleanliness, and respect for parents"
          ],
          idealDuration: "Ongoing Modular",
          faq: [
            { q: "Is this combined with Quran recitation?", a: "Yes, many parents combine 20 minutes of Quran reading with 10 minutes of Islamic Studies in each session." }
          ]
        };

      case 'kids-classes':
        return {
          title: "Online Quran Classes for Kids",
          subtitle: "Interactive, patient, and joyful Quran learning designed specifically for children aged 4 to 15.",
          badge: "Child-Friendly Pedagogy",
          matchedCourseSlug: "kids-quran-reading-islamic-values",
          targetAudience: "Boys and girls from early childhood through teens.",
          highlights: [
            "Specialized kid-friendly teachers who praise, motivate, and nurture",
            "Interactive digital whiteboards, letter animations, and badges",
            "Monthly progress report cards shared with parents",
            "Flexible scheduling around school hours and weekends"
          ],
          idealDuration: "Continuous",
          faq: [
            { q: "How do teachers keep my child focused?", a: "Classes are kept concise (30 minutes) and highly interactive, using dynamic screen-sharing and reward milestones." }
          ]
        };

      case 'adults-classes':
        return {
          title: "Online Quran Classes for Adults",
          subtitle: "Confidential, respectful, and flexible one-to-one Quran tutoring for busy adult men and women.",
          badge: "Adult Learning Program",
          matchedCourseSlug: "quran-with-tajweed",
          targetAudience: "Adults of all ages, from beginners who never learned Arabic to fluent readers refining Tajweed.",
          highlights: [
            "Zero judgment — teachers are deeply respectful and supportive",
            "Complete confidentiality and private 1-on-1 sessions",
            "Schedule around work, family, and night shifts",
            "Male teachers for brothers, female Ustadhas for sisters"
          ],
          idealDuration: "Tailored",
          faq: [
            { q: "Is it too late to learn to recite the Quran at age 40 or 60?", a: "Never! The Prophet (PBUH) said: 'The one who recites the Quran and falters in it, finding it difficult, will have a double reward.' Many of our most successful students began in their 50s." }
          ]
        };

      case 'male-teachers':
        return {
          title: "Male Quran Teachers Directory",
          subtitle: "Learn with certified male scholars, Huffaz, and Qaris holding authentic Sanad in Qira'at.",
          badge: "Verified Male Faculty",
          matchedCourseSlug: "quran-reading-nazra",
          targetAudience: "Brothers, young boys, and families seeking male instructors.",
          highlights: [
            "Graduates from Islamic universities and accredited Madrasas",
            "Expertise in Tajweed, Hifz, and Arabic grammar",
            "Punctual, disciplined, and gentle mentorship",
            "Available 24 hours a day across all international timezones"
          ],
          idealDuration: "All Programs",
          faq: [
            { q: "Can I choose my specific male tutor?", a: "Yes, you can browse our teacher profiles and request your preferred teacher for your 3-day free trial." }
          ]
        };

      case 'female-teachers':
      default:
        return {
          title: "Female Quran Teachers (Ustadhas)",
          subtitle: "100% private, comfortable one-to-one Quran classes with qualified female teachers for sisters and kids.",
          badge: "Certified Ustadhas",
          matchedCourseSlug: "noorani-qaida-course",
          targetAudience: "Muslim sisters of all ages, daughters, and young boys.",
          highlights: [
            "Hafiza & Aalima certified female teachers with verified credentials",
            "Comfortable, modest, and secure home learning environment",
            "Patient, motherly care for young children starting Arabic phonetics",
            "Specialized Tajweed and Hifz guidance for adult sisters"
          ],
          idealDuration: "All Programs",
          faq: [
            { q: "Are classes with female teachers strictly private?", a: "Yes, every class is a dedicated one-on-one session between the student and the female teacher." }
          ]
        };
    }
  };

  const data = getPageData();
  const matchedCourse = courses.find(c => c.slug === data.matchedCourseSlug) || courses[0];

  return (
    <div className="min-h-screen bg-[#FAF8F2] pb-24">
      {/* Banner */}
      <section className="bg-gradient-to-r from-[#064E3B] via-[#053D2E] to-[#064E3B] text-white py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-white/10 px-4 py-1.5 rounded-full inline-block">
            {data.badge}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white max-w-3xl mx-auto">
            {data.title}
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            {data.subtitle}
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => openTrialModal(data.title)}
              className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-gray-950 bg-[#D4AF37] hover:bg-[#e0be47] shadow-lg flex items-center gap-2 cursor-pointer transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#064E3B]" />
              <span>Book 3-Day Free Trial</span>
            </button>
            <button
              onClick={() => openWhatsApp(`Assalamu Alaikum, I would like more information on the ${data.title}.`)}
              className="px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm text-white bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/50 flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Us: {settings.phone}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 space-y-10">
        {/* Key Highlights Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xs border border-gray-200/80 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#064E3B]/10 text-[#064E3B] flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-display text-gray-900">
                Program Key Highlights & Syllabus Focus
              </h2>
              <p className="text-xs text-gray-500">Targeted for: {data.targetAudience}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.highlights.map((h, i) => (
              <div key={i} className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#0D7A4D] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">{h}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-500">
            <div>
              Recommended Duration: <strong className="text-gray-900">{data.idealDuration}</strong>
            </div>
            <div>
              Class Structure: <strong className="text-[#064E3B]">1-on-1 Dedicated Teacher</strong>
            </div>
            <div>
              Starting from: <strong className="text-[#064E3B]">{formatPrice(matchedCourse.priceMonthly)} / month</strong>
            </div>
          </div>
        </div>

        {/* FAQs for this special program */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xs border border-gray-200/80 space-y-4">
          <h3 className="text-xl font-bold font-display text-gray-900">
            Frequently Asked Questions for this Program
          </h3>

          <div className="space-y-3 pt-2">
            {data.faq.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1.5">
                <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#064E3B] text-white flex items-center justify-center text-[10px] font-bold">Q</span>
                  {item.q}
                </h4>
                <p className="text-xs text-gray-600 pl-7">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Booking Prompt */}
        <div className="bg-gradient-to-r from-[#064E3B] to-[#0D7A4D] text-white p-8 sm:p-10 rounded-3xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-2xl font-bold font-display">Ready to Begin?</h4>
            <p className="text-xs text-emerald-100">Take your 3-day complimentary trial with a certified instructor today.</p>
          </div>
          <button
            onClick={() => openTrialModal(data.title)}
            className="px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-gray-950 bg-[#D4AF37] hover:bg-[#e0be47] transition-all shrink-0 cursor-pointer shadow-md"
          >
            Start 3-Day Free Trial
          </button>
        </div>
      </div>
    </div>
  );
};
