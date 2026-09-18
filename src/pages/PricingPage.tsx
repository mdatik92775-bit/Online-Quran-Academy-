import React from 'react';
import { useAcademy } from '../context/AcademyContext';
import { Check, Sparkles, Coins, ShieldCheck, HelpCircle, ArrowRight, CreditCard, MessageCircle } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { 
    pricingPlans, 
    formatPrice, 
    activeCurrency, 
    setActiveCurrency, 
    settings, 
    openTrialModal, 
    openWhatsApp, 
    navigateTo 
  } = useAcademy();

  const publishedPlans = pricingPlans.filter(p => p.isPublished);

  return (
    <div className="min-h-screen bg-[#FAF8F2] pb-24">
      {/* Banner */}
      <section className="bg-gradient-to-r from-[#064E3B] via-[#053D2E] to-[#064E3B] text-white py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-white/10 px-4 py-1.5 rounded-full inline-block">
            Transparent Tuition
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white">
            Simple, Affordable Monthly Fee Plans
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Transparent pricing with no registration fee and zero hidden charges. Convert instantly to your local currency.
          </p>

          {/* Currency Switcher */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-semibold text-emerald-200 mr-2 flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-[#D4AF37]" />
              Select Currency:
            </span>
            {settings.supportedCurrencies.map(c => (
              <button
                key={c}
                onClick={() => setActiveCurrency(c)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeCurrency === c
                    ? 'bg-[#D4AF37] text-gray-950 shadow-md font-extrabold'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {publishedPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between ${
                plan.recommended
                  ? 'bg-white border-2 border-[#0D7A4D] shadow-2xl scale-100 md:scale-105 z-10'
                  : 'bg-white border border-gray-200/80 shadow-md'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#064E3B] to-[#0D7A4D] text-white text-[11px] font-extrabold uppercase px-4 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Recommended Plan
                </div>
              )}

              <div>
                <div className="space-y-1 mb-4">
                  <h3 className="text-2xl font-bold font-display text-gray-900">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-emerald-800 font-semibold">
                    {plan.classesPerMonth} Classes / Month ({plan.classesPerWeek} days per week)
                  </p>
                </div>

                <div className="flex items-baseline gap-1 my-6">
                  <span className="text-4xl font-extrabold font-display text-[#064E3B]">
                    {formatPrice(plan.prices)}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">/ month</span>
                </div>

                <p className="text-xs text-gray-500 mb-6">
                  Class duration: <strong className="text-gray-800">{plan.classDuration}</strong>
                </p>

                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Included Benefits:
                  </p>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-700">
                      <Check className="w-4 h-4 text-[#0D7A4D] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 space-y-2">
                <button
                  onClick={() => openTrialModal(`Trial for ${plan.name}`)}
                  className={`w-full py-3.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer ${
                    plan.recommended
                      ? 'bg-gradient-to-r from-[#064E3B] to-[#0D7A4D] text-white hover:from-[#053c2d] hover:to-[#085233]'
                      : 'bg-gray-100 hover:bg-[#064E3B] text-gray-800 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Start 3-Day Free Trial</span>
                </button>

                <button
                  onClick={() => navigateTo('registration')}
                  className="w-full text-center text-xs font-semibold text-gray-500 hover:text-[#064E3B] transition-colors py-1 cursor-pointer"
                >
                  Direct Enrollment Registration →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sibling & Family Discounts Info */}
        <div className="mt-14 bg-white rounded-3xl p-8 shadow-xs border border-gray-200/80 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="space-y-2 md:col-span-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0D7A4D] bg-emerald-50 px-3 py-1 rounded-full">
              Family & Sibling Discount
            </span>
            <h3 className="text-xl font-bold font-display text-gray-900">
              Enrolling More Than One Family Member?
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              We offer a 10% discount for the second child and 15% discount for the third child enrolled from the same household. Ask our coordinator on WhatsApp to apply your family voucher.
            </p>
          </div>
          <div className="text-left md:text-right">
            <button
              onClick={() => openWhatsApp("Assalamu Alaikum, I would like to inquire about Family / Sibling discounts for multiple students.")}
              className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-[#064E3B] hover:bg-[#043629] transition-colors flex items-center gap-2 inline-flex cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Ask About Family Discount</span>
            </button>
          </div>
        </div>

        {/* Payment Methods Supported */}
        <div className="mt-10 bg-white rounded-3xl p-8 shadow-xs border border-gray-200/80 space-y-4">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#064E3B]" />
            <h3 className="text-lg font-bold font-display text-gray-900">
              Accepted International & Local Payment Methods
            </h3>
          </div>
          <p className="text-xs text-gray-600">
            Tuition is invoiced monthly after your successful 3-day free trial. We accept:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-semibold text-gray-800">
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500"></span>
              <span>bKash & Nagad (Bangladesh)</span>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>Direct Bank Transfer</span>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              <span>Stripe / Credit / Debit Card</span>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>PayPal & Wise (Global)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
