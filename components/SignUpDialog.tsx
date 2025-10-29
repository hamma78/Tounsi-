import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { View } from '../types';
import FlagIcon from './icons/FlagIcon';

interface SignUpDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string) => void;
  onSwitchToLogin: () => void;
  navigate: (view: View) => void;
}

const SignUpDialog: React.FC<SignUpDialogProps> = ({ isOpen, onClose, onLogin, onSwitchToLogin, navigate }) => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  if (!isOpen) return null;

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && password === confirmPassword && agreedToTerms) {
      onLogin(email);
    } else {
      alert("Please agree to the terms and ensure passwords match.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col items-center mb-6">
          <FlagIcon className="w-20 h-20" />
          <h1 className="text-2xl font-bold text-red-600 mt-2">{t('signUpTitle')}</h1>
        </div>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-300" htmlFor="name">{t('nameLabel')}</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 p-3 bg-black border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-300" htmlFor="email-signup">{t('emailLabel')}</label>
            <input
              id="email-signup"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-3 bg-black border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-300" htmlFor="password-signup">{t('passwordLabel')}</label>
            <input
              id="password-signup"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-3 bg-black border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-300" htmlFor="confirm-password">{t('confirmPasswordLabel')}</label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-1 p-3 bg-black border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
              required
            />
          </div>
           <div className="flex items-start">
            <input
              id="terms-agree"
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="h-4 w-4 mt-1 rounded border-gray-600 bg-gray-700 text-red-600 focus:ring-red-500"
            />
            <label htmlFor="terms-agree" className="ms-2 text-sm text-gray-400">
              {t('agreeToTerms')}{' '}
              <button type="button" onClick={() => navigate('terms-of-service')} className="font-semibold text-red-500 hover:underline">{t('termsOfService')}</button>
              {' '}{t('and')}{' '}
              <button type="button" onClick={() => navigate('privacy-policy')} className="font-semibold text-red-500 hover:underline">{t('privacy')}</button>.
            </label>
          </div>
          <button 
            type="submit" 
            className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
            disabled={!agreedToTerms}
          >
            {t('signUp')}
          </button>
        </form>

        <div className="text-center text-gray-400 mt-6 border-t border-gray-700 pt-4">
          <p className="text-sm font-semibold">{t('contactSupport')}</p>
          <div className="text-sm mt-2">
            <p>
              <span>{t('emailContact')}</span>{' '}
              <a href="mailto:bdimed78@gmail.com" className="text-red-500 hover:underline">
                bdimed78@gmail.com
              </a>
            </p>
            <p>
              <span>{t('phoneContact')}</span>{' '}
              <a href="tel:+21696064348" className="text-red-500 hover:underline">
                +21696064348
              </a>
            </p>
          </div>
        </div>
        
        <p className="text-center text-gray-400 mt-4">
          {t('alreadyHaveAccount')}{' '}
          <button onClick={onSwitchToLogin} className="font-semibold text-red-500 hover:underline">
            {t('login')}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpDialog;