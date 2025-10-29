import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { View } from '../types';
import FlagIcon from './icons/FlagIcon';
import SignUpDialog from './SignUpDialog';

interface LoginScreenProps {
  onLogin: (email: string) => void;
  navigate: (view: View) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, navigate }) => {
  const { t, language, setLanguage } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUpOpen, setSignUpOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email);
    }
  };

  const handleLanguageToggle = () => {
    setLanguage(language === 'ar' ? 'fr' : 'ar');
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-8">
            <FlagIcon className="w-24 h-24" />
            <h1 className="text-3xl font-bold text-red-600 mt-4">{t('loginTitle')}</h1>
            <p className="text-gray-400 mt-2">{t('loginSubtitle')}</p>
          </div>
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-300" htmlFor="email-login">{t('emailLabel')}</label>
                <input
                  id="email-login"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full mt-1 p-3 bg-black border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300" htmlFor="password-login">{t('passwordLabel')}</label>
                <input
                  id="password-login"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="w-full mt-1 p-3 bg-black border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors">
                {t('loginButton')}
              </button>
            </form>
            <p className="text-center text-gray-400 mt-6">
              {t('noAccount')}{' '}
              <button onClick={() => setSignUpOpen(true)} className="font-semibold text-red-500 hover:underline">
                {t('signUp')}
              </button>
            </p>
          </div>
          <div className="text-center mt-6 flex flex-col items-center space-y-2">
              <button onClick={handleLanguageToggle} className="text-gray-400 hover:text-white hover:underline">
                {language === 'ar' ? 'Français' : 'العربية'}
              </button>
              <div className="text-xs text-gray-500 space-x-4 rtl:space-x-reverse">
                <button onClick={() => navigate('terms-of-service')} className="hover:underline">{t('termsOfService')}</button>
                <span>&bull;</span>
                <button onClick={() => navigate('privacy-policy')} className="hover:underline">{t('privacy')}</button>
              </div>
          </div>
        </div>
      </div>
      <SignUpDialog
        isOpen={isSignUpOpen}
        onClose={() => setSignUpOpen(false)}
        onLogin={onLogin}
        onSwitchToLogin={() => setSignUpOpen(false)}
        navigate={navigate}
      />
    </>
  );
};

export default LoginScreen;