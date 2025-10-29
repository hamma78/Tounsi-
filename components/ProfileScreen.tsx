
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { SettingsIcon } from './icons/UiIcons';

const ProfileScreen: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto text-white">
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <div className="flex flex-col sm:flex-row items-center">
          <img
            src="https://picsum.photos/id/1005/200/200"
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-red-600"
          />
          <div className="sm:ms-6 mt-4 sm:mt-0 text-center sm:text-start">
            <h1 className="text-3xl font-bold">أحمد التونسي</h1>
            <p className="text-gray-400 mt-1">مطور تطبيقات من تونس 🇹🇳</p>
            <div className="flex justify-center sm:justify-start space-x-6 rtl:space-x-reverse mt-4">
              <div><span className="font-bold">45</span> <span className="text-gray-400">{t('posts')}</span></div>
              <div><span className="font-bold">1.2K</span> <span className="text-gray-400">{t('followers')}</span></div>
              <div><span className="font-bold">356</span> <span className="text-gray-400">{t('following')}</span></div>
            </div>
            <div className="mt-4 flex space-x-4 rtl:space-x-reverse justify-center sm:justify-start">
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg">{t('editProfile')}</button>
              <button className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg"><SettingsIcon className="h-6 w-6" /></button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="border-b border-gray-700">
          <nav className="-mb-px flex space-x-8 rtl:space-x-reverse" aria-label="Tabs">
            <a href="#" className="border-red-500 text-red-500 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">{t('posts')}</a>
            <a href="#" className="border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">{t('photos')}</a>
            <a href="#" className="border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">{t('videos')}</a>
          </nav>
        </div>
        <div className="mt-4 text-center text-gray-500">
          Content for selected tab goes here.
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
