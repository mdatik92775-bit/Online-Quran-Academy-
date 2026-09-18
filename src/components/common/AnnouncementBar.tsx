import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { Sparkles, X, ArrowRight } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { settings, navigateTo, openTrialModal } = useAcademy();
  const [isDismissed, setIsDismissed] = useState(false);

  if (!settings.announcementBar.enabled || isDismissed) return null;

  return (
    <div className="bg-[#064E3B] text-[#FAF8F2] border-b border-[#D4AF37]/30 px-4 py-2 text-xs sm:text-sm font-medium transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex-1 flex items-center justify-center gap-2 text-center">
          <span className="hidden sm:inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <span>{settings.announcementBar.text}</span>
          <button
            onClick={() => {
              if (settings.announcementBar.linkAction === 'free-trial') {
                openTrialModal();
              } else {
                navigateTo('free-trial');
              }
            }}
            className="inline-flex items-center gap-1 font-semibold text-[#D4AF37] hover:text-white underline underline-offset-4 ml-1.5 transition-colors cursor-pointer"
          >
            {settings.announcementBar.linkText || "Book Free Trial"}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <button
          onClick={() => setIsDismissed(true)}
          className="text-white/60 hover:text-white p-1 rounded transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
