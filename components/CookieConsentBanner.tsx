import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const CookieConsentBanner: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('tounsi_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleConsent = (consent: 'accepted' | 'declined') => {
    localStorage.setItem('tounsi_cookie_consent', consent);
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 inset-x-0 bg-gray-800 border-t border-gray-700 text-white p-4 z-50">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-center sm:text-start">{t('cookieConsent')}</p>
        <div className="flex-shrink-0 flex gap-3">
          <button
            onClick={() => handleConsent('declined')}
            className="text-sm px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            {t('decline')}
          </button>
          <button
            onClick={() => handleConsent('accepted')}
            className="text-sm px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 font-semibold transition-colors"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;