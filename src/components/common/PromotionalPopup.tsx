import React from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { X, Sparkles, ArrowRight } from 'lucide-react';

export const PromotionalPopup: React.FC = () => {
  const { settings, isPromoPopupDismissed, dismissPromoPopup, openTrialModal, navigateTo } = useAcademy();

  if (!settings.promotionalPopup.enabled || isPromoPopupDismissed) return null;

  const handleCta = () => {
    dismissPromoPopup();
    if (settings.promotionalPopup.buttonAction === 'free-trial') {
      openTrialModal();
    } else {
      navigateTo(settings.promotionalPopup.buttonAction as any);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div 
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-emerald-900/10 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={dismissPromoPopup}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-700 flex items-center justify-center shadow-sm transition-colors cursor-pointer"
          aria-label="Close popup"
        >
          <X className="w-4 h-4" />
        </button>

        {settings.promotionalPopup.imageUrl && (
          <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-emerald-950">
            <img 
              src={settings.promotionalPopup.imageUrl} 
              alt={settings.promotionalPopup.title}
              className="w-full h-full object-cover object-center opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#D4AF37] text-gray-900 shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                Limited Time Opportunity
              </span>
            </div>
          </div>
        )}

        <div className="p-6 sm:p-7 space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 font-display leading-snug">
            {settings.promotionalPopup.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {settings.promotionalPopup.description}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleCta}
              className="w-full sm:flex-1 py-3 px-5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#064E3B] to-[#0D7A4D] hover:from-[#053c2d] hover:to-[#0a5e3c] shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <span>{settings.promotionalPopup.buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={dismissPromoPopup}
              className="w-full sm:w-auto py-3 px-4 text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
