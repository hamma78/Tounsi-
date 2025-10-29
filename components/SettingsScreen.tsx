import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { SettingsIcon, BellIcon, LockIcon, EyeIcon, ProfileIcon } from './icons/UiIcons';
import { View } from '../types';

interface SettingsScreenProps {
  navigate: (view: View) => void;
}

const SettingsItem: React.FC<{ icon: React.ReactNode, label: string, onClick: () => void }> = ({ icon, label, onClick }) => (
  <button onClick={onClick} className="w-full flex items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-start">
    <div className="text-red-500">{icon}</div>
    <span className="ms-4 text-lg">{label}</span>
  </button>
);

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigate }) => {
  const { t } = useLanguage();

  const settingsOptions = [
    { icon: <ProfileIcon className="h-6 w-6" />, label: t('account'), action: () => {} },
    { icon: <BellIcon className="h-6 w-6" />, label: t('notifications'), action: () => {} },
    { icon: <LockIcon className="h-6 w-6" />, label: t('privacy'), action: () => navigate('privacy-policy') },
    { icon: <EyeIcon className="h-6 w-6" />, label: t('appearance'), action: () => {} },
  ];

  return (
    <div className="max-w-2xl mx-auto text-white p-4 md:p-8">
      <div className="flex items-center gap-4 mb-8">
        <SettingsIcon className="h-8 w-8 text-red-500" />
        <h2 className="text-3xl font-bold">{t('settings')}</h2>
      </div>
      <div className="space-y-4">
        {settingsOptions.map((option, index) => (
          <SettingsItem key={index} icon={option.icon} label={option.label} onClick={option.action} />
        ))}
      </div>
    </div>
  );
};

export default SettingsScreen;