import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { BackIcon } from './icons/UiIcons';
import { View } from '../types';

interface PrivacyPolicyScreenProps {
  navigate: (view: View) => void;
}

const PrivacyPolicyScreen: React.FC<PrivacyPolicyScreenProps> = ({ navigate }) => {
  const { t, language } = useLanguage();
  const policyPoints = Array.from({ length: 10 }, (_, i) => `privacyPoint${i + 1}`);
  const isLoggedIn = !!localStorage.getItem('tounsi_currentUser');

  return (
    <div className="max-w-4xl mx-auto text-white p-4 md:p-8">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(isLoggedIn ? 'settings' : 'home')} 
          className={`text-red-500 hover:text-red-400 p-2 rounded-full hover:bg-gray-800 ${language === 'fr' ? 'rotate-180' : ''}`}
          aria-label="Back"
        >
          <BackIcon className="h-8 w-8" />
        </button>
        <h2 className="text-3xl font-bold">{t('privacyTitle')}</h2>
      </div>
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 space-y-4">
        <p className="text-gray-300">{t('privacyIntro')}</p>
        <ul className="list-disc list-inside space-y-3 text-gray-400">
          {policyPoints.map(pointKey => (
            <li key={pointKey} className="leading-relaxed">{t(pointKey)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PrivacyPolicyScreen;