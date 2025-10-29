
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { View } from '../types';
import FlagIcon from './icons/FlagIcon';
import { HomeIcon, ProfileIcon, MessageIcon, MarketplaceIcon, VideoCallIcon, SettingsIcon, LogoutIcon, LanguageIcon } from './icons/NavIcons';

interface SideNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  navigate: (view: View) => void;
  onLogout: () => void;
  currentView: View;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isActive: boolean;
}> = ({ icon, label, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 text-lg rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-red-600 text-white'
        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
    }`}
  >
    {icon}
    <span className="mx-4">{label}</span>
  </button>
);

const SideNav: React.FC<SideNavProps> = ({ isOpen, setIsOpen, navigate, onLogout, currentView }) => {
  const { t, language, setLanguage } = useLanguage();

  const handleNavigation = (view: View) => {
    navigate(view);
    setIsOpen(false);
  };
  
  const handleLanguageToggle = () => {
    setLanguage(language === 'ar' ? 'fr' : 'ar');
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-20 md:hidden transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
      <aside
        className={`fixed top-0 bottom-0 z-30 w-72 bg-gray-900 text-white p-4 transition-transform transform ${
          isOpen ? 'translate-x-0 rtl:-translate-x-0' : '-translate-x-full rtl:translate-x-full'
        } md:relative md:translate-x-0 md:rtl:-translate-x-0`}
      >
        <div className="flex flex-col items-center mb-8">
            <FlagIcon className="w-24 h-24 rounded-full object-cover"/>
            <h1 className="text-3xl font-bold text-red-600 mt-2">{t('appName')}</h1>
        </div>
        <nav className="flex flex-col space-y-2">
            <NavItem icon={<HomeIcon />} label={t('home')} onClick={() => handleNavigation('home')} isActive={currentView === 'home'} />
            <NavItem icon={<ProfileIcon />} label={t('profile')} onClick={() => handleNavigation('profile')} isActive={currentView === 'profile'} />
            <NavItem icon={<MessageIcon />} label={t('messages')} onClick={() => handleNavigation('messages')} isActive={currentView === 'messages'} />
            <NavItem icon={<MarketplaceIcon />} label={t('marketplace')} onClick={() => handleNavigation('marketplace')} isActive={currentView === 'marketplace'} />
            <NavItem icon={<VideoCallIcon />} label={t('videoCalls')} onClick={() => handleNavigation('video-calls')} isActive={currentView === 'video-calls'} />
            <hr className="border-gray-700 my-2" />
            <NavItem icon={<SettingsIcon />} label={t('settings')} onClick={() => handleNavigation('settings')} isActive={currentView === 'settings'} />
            <NavItem icon={<LanguageIcon />} label={t('changeLanguage')} onClick={handleLanguageToggle} isActive={false} />
            <hr className="border-gray-700 my-2" />
            <NavItem icon={<LogoutIcon />} label={t('logout')} onClick={onLogout} isActive={false} />
        </nav>
      </aside>
    </>
  );
};

export default SideNav;