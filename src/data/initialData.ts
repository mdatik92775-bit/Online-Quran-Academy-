import { AcademySettings, Course, Teacher, PricingPlan, FAQItem, BlogPost, Testimonial, PaymentMethodSetting, LiveClass } from '../types';

export const initialAcademySettings: AcademySettings = {
  brandName: "Online Quran Academy",
  shortName: "OQA",
  tagline: "Learn Quran Online with Qualified Teachers",
  phone: "01746349167",
  whatsapp: "01746349167",
  email: "info@onlinequranacademy.org",
  address: "House 42, Road 11, Dhanmondi, Dhaka, Bangladesh (Global Online Service)",
  announcementBar: {
    enabled: true,
    text: "Start Your Quran Learning Journey Today — Book Your Free 3-Day Trial!",
    linkText: "Book Free Trial",
    linkAction: "free-trial"
  },
  hero: {
    badge: "Bismillah Ar-Rahman Ar-Rahim",
    title: "Learn Quran Online From Qualified Teachers",
    highlightWord: "Qualified Teachers",
    subtitle: "Personalized one-to-one Quran classes for kids, adults and families — learn with authentic Tajweed from the comfort of your home.",
    primaryCtaText: "Book Free Trial",
    secondaryCtaText: "Explore Courses",
    whatsappCtaText: "Chat on WhatsApp",
    imageUrl: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1200&q=80",
    trustBadges: [
      "Certified & Ijazah Teachers",
      "One-to-One Focused Classes",
      "Flexible 24/7 Timings",
      "3-Day Free Trial",
      "Male & Female Instructors"
    ]
  },
  stats: {
    students: "100+",
    teachers: "10+",
    countries: "15+",
    courses: "10+",
    yearsExperience: "5+"
  },
  socialLinks: {
    facebook: "https://facebook.com/onlinequranacademy",
    instagram: "https://instagram.com/onlinequranacademy",
    youtube: "https://youtube.com/@onlinequranacademy",
    tiktok: "https://tiktok.com/@onlinequranacademy"
  },
  seo: {
    metaTitle: "Online Quran Academy | Learn Quran Online with Qualified Teachers",
    metaDescription: "One-to-one online Quran classes for kids, sisters, and brothers worldwide. Noorani Qaida, Tajweed, Quran Reading, and Hifz with certified tutors.",
    keywords: "Online Quran Academy, Learn Quran Online, Online Quran Classes, Quran Classes for Kids, Quran with Tajweed, Online Quran Teacher, Quran Hifz Online, Islamic Studies Online",
    ogImage: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1200&q=80"
  },
  promotionalPopup: {
    enabled: true,
    title: "Book Your FREE Quran Trial Class Today!",
    description: "Experience 3 days of one-to-one personalized learning with certified male or female teachers with zero commitment.",
    buttonText: "Claim Free Trial",
    buttonAction: "free-trial",
    imageUrl: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=600&q=80"
  },
  supportedCurrencies: ['BDT', 'USD', 'GBP', 'EUR', 'CAD', 'AUD', 'AED'],
  activeCurrency: 'BDT'
};

export const initialCourses: Course[] = [
  {
    id: "course-1",
    slug: "noorani-qaida-course",
    title: "Noorani Qaida Course",
    subtitle: "The ultimate foundational course for Arabic letters, pronunciation, and beginner reading.",
    category: "qaida",
    description: "Designed specifically for absolute beginners and children. Students master the Arabic alphabet, letter joints, vowel signs (Harakat), Tanween, Sukoon, and basic Tajweed rules with precision.",
    image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80",
    duration: "2 - 4 Months",
    classDuration: "30 Minutes",
    classesPerWeek: 3,
    suitableAge: "Kids (4+) & Adults",
    teacherType: "Male & Female Available",
    priceMonthly: {
      bdt: 2500,
      usd: 35,
      gbp: 28,
      eur: 32,
      cad: 45,
      aud: 50,
      aed: 130
    },
    objectives: [
      "Recognize Arabic letters in isolated and joined forms",
      "Correct pronunciation from their specific vocal points (Makharij)",
      "Read short and long vowels (Harakat & Madd letters)",
      "Smooth transition into fluent Quranic reading"
    ],
    curriculum: [
      { level: "Lesson 1-5", lessons: ["Single letters & proper Makharij", "Compound joined letters", "Muqatta'at letters", "Harakat (Fathah, Kasrah, Dammah)"] },
      { level: "Lesson 6-10", lessons: ["Tanween & Double vowels", "Letters of Madd (Prolongation)", "Leen letters", "Sukoon (Jazm) and Qalqalah"] },
      { level: "Lesson 11-16", lessons: ["Tashdeed (Shaddah)", "Noon Sakinah and Tanween rules", "Meem Sakinah rules", "Word and short ayah reading practice"] }
    ],
    whoShouldJoin: [
      "Kids starting their first Quranic learning step",
      "Adults who want to learn Arabic script from the basics",
      "Anyone struggling with correct letter pronunciation"
    ],
    isFeatured: true,
    isPublished: true,
    order: 1
  },
  {
    id: "course-2",
    slug: "quran-reading-course",
    title: "Quran Reading Course (Nazra)",
    subtitle: "Fluent and melodious recitation of the Holy Quran directly from the Mus'haf.",
    category: "reading",
    description: "For students who have finished Qaida and want to read the Holy Quran with speed, confidence, and adherence to proper recitation etiquette.",
    image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=800&q=80",
    duration: "4 - 8 Months",
    classDuration: "30 Minutes",
    classesPerWeek: 3,
    suitableAge: "All Ages (5+)",
    teacherType: "Male & Female Available",
    priceMonthly: {
      bdt: 2800,
      usd: 40,
      gbp: 32,
      eur: 38,
      cad: 52,
      aud: 60,
      aed: 150
    },
    objectives: [
      "Fluently recite the Quran from Juz 1 to Juz 30",
      "Overcome hesitation and stuttering in reading",
      "Apply stop signs (Waqf) correctly",
      "Build a daily habit of beautiful Quran recitation"
    ],
    curriculum: [
      { level: "Phase 1: Juz 30 (Amma)", lessons: ["Reading short Surahs with rhythm", "Observing basic stop signs", "Confidence building"] },
      { level: "Phase 2: Juz 1 to 10", lessons: ["Longer passages", "Connecting verses seamlessly", "Daily practice monitoring"] },
      { level: "Phase 3: Juz 11 to 30", lessons: ["Complete recitation of the Mus'haf", "Final Khatm review and du'a"] }
    ],
    whoShouldJoin: [
      "Graduates of Noorani Qaida",
      "Kids and adults needing reading fluency improvement",
      "Students preparing for advanced Tajweed or Hifz"
    ],
    isFeatured: true,
    isPublished: true,
    order: 2
  },
  {
    id: "course-3",
    slug: "quran-with-tajweed",
    title: "Quran with Tajweed",
    subtitle: "Master the rules of Tajweed and recite the Quran exactly as revealed to Prophet Muhammad (ﷺ).",
    category: "tajweed",
    description: "An in-depth study of the science of Tajweed. Master the Makharij (points of articulation), Sifaat (characteristics of letters), Ghunnah, Idgham, Ikhfa, and Madd rules with practical drill sessions.",
    image: "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=800&q=80",
    duration: "6 - 12 Months",
    classDuration: "35 Minutes",
    classesPerWeek: 3,
    suitableAge: "Kids & Adults (7+)",
    teacherType: "Male & Female Available",
    priceMonthly: {
      bdt: 3200,
      usd: 45,
      gbp: 36,
      eur: 42,
      cad: 60,
      aud: 68,
      aed: 170
    },
    objectives: [
      "Flawless articulation of all 29 Arabic consonants",
      "Master rules of Noon Sakinah, Meem Sakinah, and Madd",
      "Understanding thick and light letters (Tafkheem & Tarqeeq)",
      "Recite with authentic rhythmic cadence and humility"
    ],
    curriculum: [
      { level: "Foundations", lessons: ["Makharij Al-Huroof (Vocal tracts)", "Sifaat Lazimah & Aaridah", "Hamzatul Wasl & Qat'"] },
      { level: "Intermediate Rules", lessons: ["Noon Sakinah: Izhar, Idgham, Iqlab, Ikhfa", "Meem Sakinah & Ra rules", "Rules of the word 'Allah'"] },
      { level: "Advanced Application", lessons: ["All types of Madd (Original & Secondary)", "Signs of Waqf, Ibtida, and Saktah", "Tarteel certification practice"] }
    ],
    whoShouldJoin: [
      "Those who can read Quran but want to correct their Tajweed errors",
      "Parents who want their children to recite with classical beauty",
      "Imams and community members preparing for public recitation"
    ],
    isFeatured: true,
    isPublished: true,
    order: 3
  },
  {
    id: "course-4",
    slug: "quran-memorization-hifz",
    title: "Quran Memorization / Hifz",
    subtitle: "Structured, supervised memorization program with systematic daily revision (Sabaq, Sabqi, Manzil).",
    category: "hifz",
    description: "A tailored Hifz program for full Quran memorization or selected chapters (e.g., Surah Al-Baqarah, Yaseen, Al-Mulk, Juz Amma). Instructed by certified Huffaz with tested pedagogical revision techniques.",
    image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80",
    duration: "1 - 3 Years (Flexible)",
    classDuration: "45 Minutes",
    classesPerWeek: 4,
    suitableAge: "Kids (6+) & Dedicated Adults",
    teacherType: "Male & Female Available",
    priceMonthly: {
      bdt: 4500,
      usd: 65,
      gbp: 52,
      eur: 60,
      cad: 85,
      aud: 95,
      aed: 240
    },
    objectives: [
      "Memorize the Quran with pristine retention",
      "Systematic 3-step daily routine: Sabaq (New), Sabqi (Recent), Manzil (Old)",
      "Strong discipline and spiritual bonding with Allah's words",
      "Certification upon complete or partial Hifz completion"
    ],
    curriculum: [
      { level: "Step 1: Short Surahs & Juz 30", lessons: ["Juz Amma memorization", "Daily revision checks", "Accurate Tajweed preservation"] },
      { level: "Step 2: Selected Surahs", lessons: ["Surah Yaseen, Al-Kahf, Al-Mulk, Ar-Rahman, As-Sajdah"] },
      { level: "Step 3: Full Mus'haf Hifz", lessons: ["Juz 1 to 29 sequential memorization with quarterly exams and Ijazah preparation"] }
    ],
    whoShouldJoin: [
      "Children aiming to become Hafiz-ul-Quran",
      "Working adults wishing to memorize specific Surahs or Juz",
      "Former Huffaz looking to revise and solidify their memorization"
    ],
    isFeatured: true,
    isPublished: true,
    order: 4
  },
  {
    id: "course-5",
    slug: "quran-translation-tafseer",
    title: "Quran Translation & Understanding",
    subtitle: "Understand the divine message of the Quran word-by-word with context and life lessons.",
    category: "translation",
    description: "Learn word-by-word vocabulary and grammar breakdown alongside authentic Tafseer (exegesis). Connect deeply with the Quran's wisdom, historical context, and practical application in daily Muslim life.",
    image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80",
    duration: "6 - 12 Months",
    classDuration: "40 Minutes",
    classesPerWeek: 3,
    suitableAge: "Teens & Adults (12+)",
    teacherType: "Male & Female Available",
    priceMonthly: {
      bdt: 3000,
      usd: 45,
      gbp: 35,
      eur: 40,
      cad: 58,
      aud: 65,
      aed: 165
    },
    objectives: [
      "Understand 80% of common Quranic vocabulary",
      "Gain clarity on the background of revelation (Asbab al-Nuzul)",
      "Reflect upon core Islamic theology, ethics, and jurisprudence",
      "Live and implement Quranic guidance in family and career"
    ],
    curriculum: [
      { level: "Term 1: Essential Surahs", lessons: ["Al-Fatiha in-depth reflection", "Juz 30 translation & word analysis", "Common Quranic root words"] },
      { level: "Term 2: Parables & Stories", lessons: ["Stories of the Prophets in the Quran", "Morals, warnings, and glad tidings"] },
      { level: "Term 3: Major Chapters", lessons: ["Surah Al-Baqarah highlights", "Surah Yusuf & Maryam deep study", "Applying verses today"] }
    ],
    whoShouldJoin: [
      "Non-Arabic speakers who want to understand Quran as they recite",
      "High school & university students seeking authentic Islamic foundation",
      "Parents wanting to explain Quran to their children"
    ],
    isFeatured: false,
    isPublished: true,
    order: 5
  },
  {
    id: "course-6",
    slug: "islamic-studies-course",
    title: "Islamic Studies for Youth & Adults",
    subtitle: "Comprehensive curriculum covering Aqeedah, Fiqh, Seerah, Hadith, and Islamic Akhlaq.",
    category: "islamic_studies",
    description: "Equip yourself and your children with essential Islamic knowledge. Covers the 6 pillars of Iman, 5 pillars of Islam, life of the Prophet (ﷺ), stories of the Sahabah, halal & haram, and modern ethical challenges.",
    image: "https://images.unsplash.com/photo-1574246604907-db69e30ddb97?auto=format&fit=crop&w=800&q=80",
    duration: "6 Months",
    classDuration: "35 Minutes",
    classesPerWeek: 2,
    suitableAge: "Kids (6+) & Adults",
    teacherType: "Male & Female Available",
    priceMonthly: {
      bdt: 2500,
      usd: 35,
      gbp: 28,
      eur: 32,
      cad: 45,
      aud: 50,
      aed: 130
    },
    objectives: [
      "Solidify sound Islamic belief (Tawheed & Aqeedah)",
      "Know practical rules for Taharah, Salah, Sawm, and Zakah",
      "Inspirational lessons from the life of the Prophet Muhammad (ﷺ)",
      "Cultivate noble manners (Akhlaq & Adab) in society"
    ],
    curriculum: [
      { level: "Unit 1: Aqeedah & Pillars", lessons: ["Pillars of Faith & Islam", "Names & Attributes of Allah", "Belief in Angels, Books & Day of Judgment"] },
      { level: "Unit 2: Seerah & History", lessons: ["Makkan period struggles", "Madinan community building", "Lives of the 4 Rightly Guided Caliphs"] },
      { level: "Unit 3: Akhlaq & Adab", lessons: ["Respecting parents & elders", "Truthfulness and integrity", "Guarding the tongue & digital manners"] }
    ],
    whoShouldJoin: [
      "Muslim kids growing up in diverse international environments",
      "New Muslims seeking structured foundational learning",
      "Anyone wanting a holistic refresher on their Deen"
    ],
    isFeatured: false,
    isPublished: true,
    order: 6
  },
  {
    id: "course-7",
    slug: "salah-and-wudu-training",
    title: "Salah & Wudu Practical Training",
    subtitle: "Step-by-step masterclass on purifying oneself and performing the 5 daily prayers perfectly.",
    category: "islamic_studies",
    description: "A practical, visually guided course teaching the complete Sunnah method of Wudu, Ghusl, Tayammum, Adhan, and Salah for brothers and sisters. Includes memorization of all Salah supplications with meaning.",
    image: "https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=800&q=80",
    duration: "1 - 2 Months",
    classDuration: "30 Minutes",
    classesPerWeek: 2,
    suitableAge: "Kids (5+) & Beginners",
    teacherType: "Male & Female Available",
    priceMonthly: {
      bdt: 2000,
      usd: 30,
      gbp: 24,
      eur: 28,
      cad: 38,
      aud: 42,
      aed: 110
    },
    objectives: [
      "Perform Wudu correctly without leaving any sunnah",
      "Master the physical postures and timings of Salah",
      "Memorize Tashahhud, Durood Ibrahim, and Du'a Qunoot",
      "Understand conditions, pillars, and invalidators of prayer"
    ],
    curriculum: [
      { level: "Purification", lessons: ["Importance of Taharah", "Step-by-step Sunnah Wudu", "Things that break Wudu"] },
      { level: "Salah Foundations", lessons: ["Adhan and Iqamah", "Number of Rak'ahs in 5 daily prayers", "Standing, Ruku, Sujood, and Jalsah"] },
      { level: "Recitations & Duas", lessons: ["Sana, Tashahhud, Durood Ibrahim, Du'a e Masoora", "Common mistakes in Salah and correction"] }
    ],
    whoShouldJoin: [
      "Young children reaching the age of prayer (7-10)",
      "Reverts wanting to establish Salah with confidence",
      "Anyone wanting to refine their daily prayer according to the Sunnah"
    ],
    isFeatured: false,
    isPublished: true,
    order: 7
  },
  {
    id: "course-8",
    slug: "daily-duas-masnoon-duas",
    title: "Daily Duas & Masnoon Supplications",
    subtitle: "Fortify your day with authentic prophetic supplications from dawn to dusk.",
    category: "islamic_studies",
    description: "Learn, memorize, and understand the prophetic supplications for daily routines: waking up, eating, leaving the house, entering the masjid, traveling, morning & evening Adhkar (Hisn-ul-Muslim).",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    duration: "2 Months",
    classDuration: "30 Minutes",
    classesPerWeek: 2,
    suitableAge: "All Ages",
    teacherType: "Male & Female Available",
    priceMonthly: {
      bdt: 2000,
      usd: 30,
      gbp: 24,
      eur: 28,
      cad: 38,
      aud: 42,
      aed: 110
    },
    objectives: [
      "Memorize essential daily prophetic supplications",
      "Learn morning and evening protective Adhkar",
      "Understand the meaning and spiritual impact of each Du'a",
      "Instill the remembrance of Allah (Dhikr) throughout daily life"
    ],
    curriculum: [
      { level: "Routine Duas", lessons: ["Waking up, sleeping, entering restroom", "Eating, drinking, wearing clothes", "Leaving and entering house"] },
      { level: "Protection Adhkar", lessons: ["Morning & evening authentic Adhkar", "Duas against evil eye, fear, and grief", "Duas for parents and loved ones"] }
    ],
    whoShouldJoin: [
      "Kids looking to build wholesome Islamic habits",
      "Families wishing to practice Sunnah supplications together"
    ],
    isFeatured: false,
    isPublished: true,
    order: 8
  },
  {
    id: "course-9",
    slug: "arabic-basics-language",
    title: "Arabic Language Basics",
    subtitle: "Conversational and foundational classical Quranic Arabic grammar.",
    category: "reading",
    description: "Learn foundational Quranic Arabic grammar (Nahw and Sarf basics) along with everyday conversational Arabic vocabulary. Gain the ability to understand Quranic phrases and simple Arabic discourse.",
    image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80",
    duration: "4 - 6 Months",
    classDuration: "35 Minutes",
    classesPerWeek: 3,
    suitableAge: "Teens & Adults (10+)",
    teacherType: "Male & Female Available",
    priceMonthly: {
      bdt: 3000,
      usd: 45,
      gbp: 35,
      eur: 40,
      cad: 58,
      aud: 65,
      aed: 165
    },
    objectives: [
      "Basic understanding of Arabic sentence structure (Nominal & Verbal)",
      "Nouns, pronouns, verbs, and common prepositions",
      "Essential vocabulary for daily communication and Quran reading",
      "Form short sentences and express oneself in simple Arabic"
    ],
    curriculum: [
      { level: "Basics", lessons: ["Arabic pronouns & demonstrative nouns", "Question words and greetings", "Family and classroom vocabulary"] },
      { level: "Grammar Core", lessons: ["Singular, Dual, Plural nouns", "Past, Present, and Imperative verb patterns", "Simple dialogue practice"] }
    ],
    whoShouldJoin: [
      "Students eager to connect with Arabic as the language of the Quran",
      "Those planning visits to Makkah & Madinah for Umrah or Hajj"
    ],
    isFeatured: false,
    isPublished: true,
    order: 9
  },
  {
    id: "course-10",
    slug: "kids-quran-course",
    title: "Kids Quran & Character Building Course",
    subtitle: "Engaging, interactive, and child-friendly Quran learning with patience, games, and positive reinforcement.",
    category: "kids",
    description: "A joyful learning environment tailored for young minds (ages 4 to 12). Our trained child-friendly teachers use screen sharing, colorful digital boards, reward badges, and short engaging exercises so children love learning the Quran.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    duration: "Continuous",
    classDuration: "30 Minutes",
    classesPerWeek: 3,
    suitableAge: "Kids (Ages 4 - 12)",
    teacherType: "Male & Female Available",
    priceMonthly: {
      bdt: 2800,
      usd: 40,
      gbp: 32,
      eur: 38,
      cad: 52,
      aud: 60,
      aed: 150
    },
    objectives: [
      "Foster a lifelong love for the Quran in young hearts",
      "Learn Qaida and short Surahs with joyful encouragement",
      "Teach manners (Adab), respecting parents, and kindness",
      "Zero intimidation — 100% gentle and patient guidance"
    ],
    curriculum: [
      { level: "Little Stars (Ages 4-7)", lessons: ["Fun Arabic alphabet song & tracing", "Pronunciation with visual flashcards", "Short Surahs from An-Nas to Al-Fil"] },
      { level: "Junior Reciters (Ages 8-12)", lessons: ["Reading from Mus'haf with gentle Tajweed", "Inspiring stories of the Prophets", "Weekly character-building badge"] }
    ],
    whoShouldJoin: [
      "Young children starting their Quran journey",
      "Parents desiring gentle, child-loving qualified Quran tutors"
    ],
    isFeatured: true,
    isPublished: true,
    order: 10
  }
];

export const initialTeachers: Teacher[] = [
  {
    id: "teacher-atikur",
    name: "Hafiz Mawlana Atikur Rahman",
    title: "Senior Tajweed & Quran Instructor",
    gender: "male",
    photo: "/images/teachers/hafiz_atikur_rahman.jpg",
    qualification: "Hafiz & Kamil (masters)",
    specialization: ["Advanced Tajweed & Makharij", "Quran Recitation & Nazra", "Quran Memorization (Hifz)", "Noorani Qaida"],
    experienceYears: 10,
    experience: "10+ Years",
    languages: ["Bangla", "English", "Arabic"],
    bio: "Hafiz Mawlana Atikur Rahman is an experienced Quran and Tajweed scholar who holds Kamil (Masters) with high academic distinction. With a decade of dedicated instructional excellence, he has mentored hundreds of students of all ages across Bangladesh and globally, specializing in proper Arabic letter articulation, melodic recitation, and structured Quranic retention.",
    teachingStyle: "Methodical, patient, engaging, with personalized vocal corrections and encouraging student feedback.",
    availableCourses: ["Noorani Qaida Course", "Quran Reading Course (Nazra)", "Quran with Tajweed", "Quran Memorization / Hifz"],
    rating: 5.0,
    reviewCount: 96,
    isPublished: true,
    availabilityHours: "Mon-Sat (Flexible Morning & Evening Shifts, GMT+6)"
  },
  {
    id: "teacher-1",
    name: "Shaykh Hafiz Maulana Abdullah Al-Mamun",
    title: "Chief Tajweed Instructor & Hafiz-ul-Quran",
    gender: "male",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    qualification: "Sanad / Ijazah in Hafs 'an 'Asim, Dawrah-e-Hadith graduate",
    specialization: ["Quran Memorization (Hifz)", "Advanced Tajweed", "Tarteel"],
    experienceYears: 9,
    languages: ["English", "Bangla", "Arabic", "Urdu"],
    bio: "Hafiz Abdullah completed his Quran memorization at age 12 and holds formal Ijazah with continuous chain (Sanad) reaching the Prophet (ﷺ). He has taught over 250 international students across USA, UK, Canada, and Australia with high student satisfaction.",
    teachingStyle: "Extremely patient, methodical, with continuous vocal correction and encouraging feedback.",
    availableCourses: ["Noorani Qaida Course", "Quran Reading Course", "Quran with Tajweed", "Quran Memorization / Hifz"],
    rating: 4.9,
    reviewCount: 78,
    isPublished: true,
    availabilityHours: "Mon-Sat (6:00 AM - 11:00 PM GMT+6)"
  },
  {
    id: "teacher-2",
    name: "Ustadha Fatima Begum",
    title: "Senior Female Quran & Tajweed Specialist",
    gender: "female",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    qualification: "Ijazah in Tajweed & Qira'ah, Alimiyyah Degree",
    specialization: ["Kids Quran Classes", "Noorani Qaida", "Sisters Tajweed Classes"],
    experienceYears: 7,
    languages: ["English", "Bangla", "Arabic"],
    bio: "Ustadha Fatima specializes in teaching sisters and young children. She is renowned for her warm demeanor, engaging interactive techniques, and ability to keep children excited about their Quran lessons.",
    teachingStyle: "Gentle, interactive, uses digital reward points and visual aids.",
    availableCourses: ["Noorani Qaida Course", "Kids Quran & Character Building Course", "Quran with Tajweed", "Salah & Wudu Practical Training"],
    rating: 5.0,
    reviewCount: 92,
    isPublished: true,
    availabilityHours: "Mon-Sat (8:00 AM - 10:00 PM GMT+6)"
  },
  {
    id: "teacher-3",
    name: "Qari Muhammad Imran",
    title: "International Qira'at Specialist",
    gender: "male",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    qualification: "Graduate of Qira'at from Jamia Millia, certified Qari",
    specialization: ["Qira'at & Maqamat", "Fluent Reading (Nazra)", "Adult Beginners"],
    experienceYears: 8,
    languages: ["English", "Bangla", "Arabic"],
    bio: "Qari Imran has won multiple Quran recitation competitions and specializes in voice modulation, correct Makharij, and eliminating vocal hesitation for adults and youth.",
    teachingStyle: "Structured, systematic pronunciation drills with clear homework guidelines.",
    availableCourses: ["Quran Reading Course (Nazra)", "Quran with Tajweed", "Arabic Language Basics"],
    rating: 4.9,
    reviewCount: 64,
    isPublished: true,
    availabilityHours: "Flexible (Morning & Evening slots)"
  },
  {
    id: "teacher-4",
    name: "Ustadha Ayesha Siddiqua",
    title: "Hafiza & Child Pedagogy Specialist",
    gender: "female",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    qualification: "Hafiza-ul-Quran, Masters in Islamic Studies",
    specialization: ["Hifz for Sisters & Kids", "Islamic Studies", "Daily Duas"],
    experienceYears: 6,
    languages: ["English", "Bangla", "Urdu"],
    bio: "Dedicated teacher with a passion for cultivating true love for Islam in the hearts of youth. Has helped dozens of students memorize Juz Amma and established systematic daily revision routines.",
    teachingStyle: "Supportive, encouraging, focused on retention and emotional connection with the Quran.",
    availableCourses: ["Kids Quran & Character Building Course", "Quran Memorization / Hifz", "Islamic Studies for Youth & Adults", "Daily Duas & Masnoon Supplications"],
    rating: 4.95,
    reviewCount: 81,
    isPublished: true,
    availabilityHours: "Mon-Fri (7:00 AM - 9:00 PM GMT+6)"
  }
];

export const initialPricingPlans: PricingPlan[] = [
  {
    id: "plan-basic",
    name: "Basic Plan",
    classesPerMonth: 8,
    classesPerWeek: 2,
    classDuration: "30 Minutes",
    recommended: false,
    features: [
      "8 One-to-One live classes per month",
      "2 Classes every week (Flexible days)",
      "Choice of Male or Female certified teacher",
      "Complete learning materials provided",
      "Monthly student progress report",
      "Parent-teacher review session",
      "Class rescheduling support"
    ],
    prices: {
      bdt: 2000,
      usd: 30,
      gbp: 24,
      eur: 28,
      cad: 40,
      aud: 45,
      aed: 110
    },
    isPublished: true
  },
  {
    id: "plan-standard",
    name: "Standard Plan",
    classesPerMonth: 12,
    classesPerWeek: 3,
    classDuration: "30 Minutes",
    recommended: true,
    features: [
      "12 One-to-One live classes per month",
      "3 Classes every week (Recommended pace)",
      "Choice of Male or Female certified teacher",
      "All digital books & worksheets included",
      "Bi-weekly Tajweed & reading assessment",
      "Salah, Du'a & Islamic manners training",
      "Priority customer & rescheduling support",
      "Official certificate upon course completion"
    ],
    prices: {
      bdt: 2800,
      usd: 40,
      gbp: 32,
      eur: 38,
      cad: 52,
      aud: 60,
      aed: 150
    },
    isPublished: true
  },
  {
    id: "plan-premium",
    name: "Premium Plan (Intensive)",
    classesPerMonth: 20,
    classesPerWeek: 5,
    classDuration: "35 Minutes",
    recommended: false,
    features: [
      "20 One-to-One live classes per month",
      "5 Classes every week (Monday - Friday)",
      "Ideal for rapid Qaida or serious Hifz goals",
      "Choice of Senior Ijazah-certified tutor",
      "Weekly detailed written performance analysis",
      "Direct WhatsApp contact with teacher",
      "Flexible makeup class guarantee",
      "Full digital library & Islamic studies modules"
    ],
    prices: {
      bdt: 4200,
      usd: 60,
      gbp: 48,
      eur: 55,
      cad: 80,
      aud: 90,
      aed: 220
    },
    isPublished: true
  }
];

export const initialFaqs: FAQItem[] = [
  {
    id: "faq-1",
    question: "How do the online Quran classes work?",
    answer: "Classes are conducted 1-on-1 through Zoom or Google Meet with interactive screen-sharing. Your teacher shares the digital Quran or Qaida lesson on screen, listens to the student recite, and provides immediate vocal correction and Tajweed pointers in real-time.",
    category: "General",
    order: 1,
    isPublished: true
  },
  {
    id: "faq-2",
    question: "Is the 3-day trial class really 100% free?",
    answer: "Yes! The 3-day trial is completely free with zero financial obligation. No credit card is required. You get to experience our teaching quality, meet your assigned teacher, and see if our methodology fits your schedule before paying anything.",
    category: "Trial",
    order: 2,
    isPublished: true
  },
  {
    id: "faq-3",
    question: "Can I choose between a male or female teacher?",
    answer: "Yes, absolutely. We have both qualified male and female teachers. Female students and young children can be paired with dedicated female Quran teachers (Ustadhas) upon request.",
    category: "Teachers",
    order: 3,
    isPublished: true
  },
  {
    id: "faq-4",
    question: "What if I miss a scheduled class due to an emergency?",
    answer: "We understand unexpected situations arise. As long as you inform us at least 4 hours in advance via WhatsApp or your student dashboard, your class can be rescheduled at a mutually convenient makeup time without extra charge.",
    category: "Classes",
    order: 4,
    isPublished: true
  },
  {
    id: "faq-5",
    question: "What payment methods are supported?",
    answer: "For students in Bangladesh, we accept bKash, Nagad, and direct Bank Transfer. For our international students in the USA, UK, Canada, Australia, and Middle East, we support secure online card payments (Visa, MasterCard via Stripe/PayPal) and direct Wise/Bank transfers.",
    category: "Pricing",
    order: 5,
    isPublished: true
  },
  {
    id: "faq-6",
    question: "What technology or devices do I need to attend classes?",
    answer: "Any device with an internet connection will work: a laptop, desktop computer, iPad/tablet, or even a smartphone. A working microphone and headphones are recommended for clear audio.",
    category: "Technical",
    order: 6,
    isPublished: true
  },
  {
    id: "faq-7",
    question: "Can adults with zero Arabic background enroll?",
    answer: "Yes! Many of our students are adults starting from zero. Our teachers specialize in adult education with respectful, supportive, and private sessions designed to build confidence step-by-step.",
    category: "General",
    order: 7,
    isPublished: true
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "test-1",
    studentOrParentName: "Brother Tariqul Islam",
    roleDescription: "Father of Rayan (8) & Zoya (6)",
    country: "London, United Kingdom",
    countryFlag: "🇬🇧",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    courseTitle: "Kids Quran & Character Building Course",
    rating: 5,
    review: "Living in the UK, finding an authentic yet child-friendly Quran teacher was challenging. Online Quran Academy paired us with Ustadha Fatima. Both my kids eagerly wait for their class every evening! Within 4 months they completed Noorani Qaida and recite with proper Tajweed.",
    isPublished: true,
    isDemo: true
  },
  {
    id: "test-2",
    studentOrParentName: "Sister Samira Rahman",
    roleDescription: "Mother of Hamza (11)",
    country: "Toronto, Canada",
    countryFlag: "🇨🇦",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    courseTitle: "Quran Memorization / Hifz",
    rating: 5,
    review: "The 1-on-1 attention is unmatched. My son was struggling to maintain consistency in our local madrasah. Hafiz Abdullah's daily revision framework made all the difference. Hamza has now memorized 5 Juz with strong retention, Alhamdulillah!",
    isPublished: true,
    isDemo: true
  },
  {
    id: "test-3",
    studentOrParentName: "Dr. Mahmudur Rahman",
    roleDescription: "Adult Learner (Age 42)",
    country: "Dhaka, Bangladesh",
    countryFlag: "🇧🇩",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    courseTitle: "Quran with Tajweed",
    rating: 5,
    review: "I had learned reading Quran in childhood without proper Tajweed. As an adult, I was hesitant to restart. The teacher was extremely polite, respectful of my schedule, and helped correct my Makharij errors without any embarrassment. Highly recommended!",
    isPublished: true,
    isDemo: true
  }
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: "blog-1",
    slug: "benefits-of-learning-quran-at-young-age",
    title: "10 Profound Spiritual & Cognitive Benefits of Teaching Quran to Children Early",
    excerpt: "Discover why early childhood is the golden age for Quran memorization and how it sharpens memory, linguistic eloquence, and moral character.",
    content: `The Prophet Muhammad (ﷺ) said: "The best among you are those who learn the Quran and teach it." (Sahih Bukhari).

Teaching your children the Quran at an early age leaves an indelible mark on their character, intellect, and spiritual foundation.

### 1. Superior Memory and Cognitive Agility
Children's brains are exceptionally receptive to auditory patterns and rhythmic phrasing. Memorizing the sacred text expands working memory, enhances spatial reasoning, and improves school performance across languages and mathematics.

### 2. Impeccable Arabic Makharij (Pronunciation)
The Arabic language possesses unique throat and palate sounds (such as 'Ayn, Haa, Qaf) that are effortless to master in childhood, but significantly harder to acquire later in life.

### 3. Spiritual Shield in a Digital Era
Surrounding our children with Allah's words instills intrinsic moral compass and modesty that protects them from peer pressure and unwholesome digital influences.

At Online Quran Academy, our child-centric curriculum combines fun with reverence to ensure your child associates Quran learning with joy.`,
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    author: "Shaykh Abdullah Al-Mamun",
    category: "Parenting & Education",
    tags: ["Children", "Quran Learning", "Tajweed", "Parenting"],
    readTime: "5 min read",
    publishedAt: "2026-03-01",
    isPublished: true,
    seoTitle: "10 Benefits of Teaching Quran to Children at an Early Age",
    metaDescription: "Learn how early Quran education transforms your child's memory, linguistic ability, and moral uprightness."
  },
  {
    id: "blog-2",
    slug: "mastering-essential-tajweed-rules-for-beginners",
    title: "Beginner's Comprehensive Guide to the 4 Primary Rules of Noon Sakinah & Tanween",
    excerpt: "A crystal-clear breakdown of Izhar, Idgham, Iqlab, and Ikhfa with authentic Quranic examples and easy audio memory tricks.",
    content: `Tajweed is not merely an optional ornament; it is reciting the Holy Quran precisely as it was revealed to the Messenger of Allah (ﷺ).

Among the most frequent rules you will encounter on every single page of the Mus'haf are the rules of **Noon Sakinah (نْ)** and **Tanween (ً  ٍ  ٌ)**.

### 1. Izhar (Clear Pronunciation)
Izhar means to pronounce the 'N' sound clearly without elongation or nasalization.
It applies whenever Noon Sakinah is followed by one of the 6 throat letters:
- ء (Hamzah), هـ (Haa), ع ('Ayn), ح (Haa), غ (Ghayn), خ (Khaa).
*Example:* مَنْ آمَنَ (Man Aamana).

### 2. Idgham (Merging)
Idgham means to assimilate the Noon into the next letter. It occurs before the 6 letters collected in the word **يرملون** (Yarmaloon):
- With Ghunnah (nasal hum): ي, ن, م, و
- Without Ghunnah: ل, ر

### 3. Iqlab (Conversion)
When Noon Sakinah meets the letter ب (Baa), the 'N' converts smoothly into a hidden Meem with nasal hum.
*Example:* مِنْ بَعْدِ (Mim-ba'di).

### 4. Ikhfa (Concealment)
For the remaining 15 letters, the Noon is concealed with a light 2-count nasal resonance.

Practice these rules daily with an Ijazah certified tutor at Online Quran Academy to perfect your recitation!`,
    image: "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=800&q=80",
    author: "Qari Muhammad Imran",
    category: "Tajweed & Recitation",
    tags: ["Tajweed Rules", "Noon Sakinah", "Pronunciation", "Recitation"],
    readTime: "6 min read",
    publishedAt: "2026-02-18",
    isPublished: true,
    seoTitle: "Rules of Noon Sakinah and Tanween: Complete Beginner Guide",
    metaDescription: "Master Izhar, Idgham, Iqlab, and Ikhfa rules with clear examples from the Holy Quran."
  },
  {
    id: "blog-3",
    slug: "effective-tips-for-revising-hifz-at-home",
    title: "How to Build an Unshakeable Quran Memorization: The 3-Tier Daily Routine",
    excerpt: "The proven classical methodology of Sabaq, Sabqi, and Manzil to ensure you never forget what you memorize.",
    content: `Many students struggle not with the initial memorization of new verses, but with retaining what was memorized weeks or months ago.

The secret utilized by ancient and contemporary Quranic academies is the **3-Tier System**:

1. **Sabaq (The New Lesson)**:
Memorize your daily quota (usually 1 page or half a page) after Fajr prayer when the mind is clearest. Recite it at least 20 times looking into the Mus'haf before testing memory.

2. **Sabqi (The Recent Lesson)**:
This comprises the last 5 to 10 pages memorized before today. You must recite this every single day to your teacher without mistakes.

3. **Manzil (The Old Revisions)**:
Dedicate a fixed time every afternoon or evening to recite 1 to 2 Juz of older memorized portions on a continuous cyclic rotation.

With the guidance of our dedicated Huffaz at Online Quran Academy, students maintain an organized digital logbook to track their retention effortlessly.`,
    image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80",
    author: "Shaykh Abdullah Al-Mamun",
    category: "Quran Memorization",
    tags: ["Hifz Tips", "Memorization", "Revision", "Huffaz"],
    readTime: "4 min read",
    publishedAt: "2026-01-25",
    isPublished: true,
    seoTitle: "Effective Tips for Hifz Revision and Quran Retention",
    metaDescription: "Master the 3-tier revision method to solidify your Quran memorization forever."
  }
];

export const initialPaymentMethods: PaymentMethodSetting[] = [
  {
    id: "bkash",
    name: "bKash (Personal / Merchant)",
    isEnabled: true,
    accountNumber: "01746349167",
    accountType: "Personal (Send Money / Cash In)",
    instructions: "Go to your bKash App > Send Money to 01746349167. Use your Student Name or WhatsApp number as reference. Once sent, notify our WhatsApp or enter the Transaction ID."
  },
  {
    id: "nagad",
    name: "Nagad",
    isEnabled: true,
    accountNumber: "01746349167",
    accountType: "Personal",
    instructions: "Dial *167# or use Nagad App > Send Money to 01746349167. Please save the Transaction ID."
  },
  {
    id: "bank-transfer",
    name: "Bank Transfer (Bangladesh & International)",
    isEnabled: true,
    accountNumber: "Online Quran Academy Bank Account",
    accountType: "Islami Bank Bangladesh Ltd / Standard Chartered",
    instructions: "Bank: Islami Bank Bangladesh Ltd | Branch: Dhanmondi | Account Name: Online Quran Academy | A/C No: 2050123456789 | Routing: 125261234"
  },
  {
    id: "stripe",
    name: "Credit / Debit Card (Stripe / International)",
    isEnabled: true,
    instructions: "Secure international payment via Visa, MasterCard, American Express. Processed via encrypted SSL gateway."
  },
  {
    id: "paypal",
    name: "PayPal / Wise",
    isEnabled: true,
    instructions: "For international students in USA, UK, Canada, Europe, and Australia. Please contact our WhatsApp at 01746349167 for direct Wise or PayPal invoice."
  }
];

export const initialSampleClasses: LiveClass[] = [
  {
    id: "class-1",
    title: "Noorani Qaida - Lesson 4 Harakat Practice",
    courseId: "course-1",
    courseTitle: "Noorani Qaida Course",
    studentId: "student-1",
    studentName: "Zayd Al-Mansoor",
    teacherId: "teacher-1",
    teacherName: "Shaykh Hafiz Maulana Abdullah Al-Mamun",
    date: "2026-09-06",
    time: "18:00",
    timezone: "Asia/Dhaka (GMT+6)",
    durationMinutes: 30,
    platform: "Zoom",
    meetingUrl: "https://zoom.us/j/901132569135?pwd=OQA_SECURE_CLASS",
    meetingPassword: "OQA2026",
    status: "Scheduled",
    notes: "Review lesson 3 homework first, then practice Fathah and Kasrah on letters Baa, Taa, Thaa."
  },
  {
    id: "class-2",
    title: "Quran with Tajweed - Juz 30 Surah Al-Fajr Recitation",
    courseId: "course-3",
    courseTitle: "Quran with Tajweed",
    studentId: "student-2",
    studentName: "Amina Tariq",
    teacherId: "teacher-2",
    teacherName: "Ustadha Fatima Begum",
    date: "2026-09-06",
    time: "19:30",
    timezone: "Asia/Dhaka (GMT+6)",
    durationMinutes: 30,
    platform: "Google Meet",
    meetingUrl: "https://meet.google.com/oqa-tajweed-room",
    status: "Scheduled",
    notes: "Focus on Madd Munfasil and Qalqalah letters in verses 1-14."
  }
];
