import React from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { Check, Sparkles, ArrowRight, Coins } from 'lucide-react';

export const PricingPreview: React.FC = () => {
  const { 
    pricingPlans, 
    formatPrice, 
    activeCurrency, 
    setActiveCurrency, 
    settings, 
    openTrialModal,
    navigateTo 
  } = useAcademy();

  const publishedPlans = pricingPlans.filter(p => p.isPublished);

  return (
    <section className="py-20 bg-[#FAF8F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0D7A4D] bg-[#064E3B]/5 px-3.5 py-1.5 rounded-full">
            Transparent Fees
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#064E3B] tracking-tight">
            Affordable Monthly Fee Packages
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            One-to-one personalized learning with certified Quran teachers. No hidden registration fees or long-term contracts.
          </p>

          {/* Currency Switcher Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-4">
            <span className="text-xs font-semibold text-gray-500 mr-1 flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 text-[#064E3B]" />
              Currency:
            </span>
            {settings.supportedCurrencies.map(cur => (
              <button
                key={cur}
                onClick={() => setActiveCurrency(cur)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeCurrency === cur
                    ? 'bg-[#064E3B] text-white shadow-xs'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cur}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {publishedPlans.map((plan) => {
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between ${
                  plan.recommended
                    ? 'bg-white border-2 border-[#0D7A4D] shadow-xl scale-100 md:scale-105 z-10'
                    : 'bg-white border border-gray-200/80 shadow-xs hover:shadow-md'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#064E3B] to-[#0D7A4D] text-white text-[11px] font-extrabold uppercase px-4 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <div className="space-y-1 mb-4">
                    <h3 className="text-xl font-bold font-display text-gray-900">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-emerald-800 font-semibold">
                      {plan.classesPerMonth} Live Classes / Month ({plan.classesPerWeek} classes per week)
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
                    className={`w-full py-3 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer ${
                      plan.recommended
                        ? 'bg-gradient-to-r from-[#064E3B] to-[#0D7A4D] text-white hover:from-[#053d2e] hover:to-[#085233]'
                        : 'bg-gray-100 hover:bg-[#064E3B] text-gray-800 hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Select & Book Free Trial</span>
                  </button>

                  <button
                    onClick={() => navigateTo('registration')}
                    className="w-full text-center text-[11px] font-semibold text-gray-500 hover:text-[#064E3B] transition-colors py-1 cursor-pointer"
                  >
                    Direct Enrollment Form →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Scheduling Guarantee */}
        <div className="mt-12 text-center text-xs text-gray-500">
          <p>Need weekend-only sessions, custom intensive hours, or family bundle discounts? <button onClick={() => navigateTo('contact')} className="text-[#064E3B] font-bold underline cursor-pointer">Contact our admin team</button> or WhatsApp us at <strong>{settings.phone}</strong>.</p>
        </div>
      </div>
    </section>
  );
};
