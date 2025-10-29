import React, { useState, useEffect, useCallback } from 'react';
import { Language, View } from './types';
import LoginScreen from './components/LoginScreen';
import MainScreen from './components/MainScreen';
import { LanguageProvider } from './contexts/LanguageContext';
import CookieConsentBanner from './components/CookieConsentBanner';
import PrivacyPolicyScreen from './components/PrivacyPolicyScreen';
import TermsOfServiceScreen from './components/TermsOfServiceScreen';

const App: React.FC = () => {
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(() => localStorage.getItem('tounsi_currentUser'));
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!currentUserEmail);
  const [language, setLanguage] = useState<Language>('ar');
  const [currentView, setCurrentView] = useState<View>('home');

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);
  
  const handleLogin = useCallback((email: string) => {
    localStorage.setItem('tounsi_currentUser', email);
    setCurrentUserEmail(email);
    setIsLoggedIn(true);
    setCurrentView('home');
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('tounsi_currentUser');
    setCurrentUserEmail(null);
    setIsLoggedIn(false);
    setCurrentView('home'); // Reset to a default view on logout
  }, []);

  const navigate = useCallback((view: View) => {
    setCurrentView(view);
  }, []);

  const renderContent = () => {
    if (currentView === 'privacy-policy') {
      return <PrivacyPolicyScreen navigate={navigate} />;
    }
    if (currentView === 'terms-of-service') {
      return <TermsOfServiceScreen navigate={navigate} />;
    }
    if (isLoggedIn && currentUserEmail) {
      return <MainScreen currentView={currentView} navigate={navigate} onLogout={handleLogout} currentUserEmail={currentUserEmail} />;
    }
    return <LoginScreen onLogin={handleLogin} navigate={navigate} />;
  };

  return (
    <LanguageProvider language={language} setLanguage={setLanguage}>
      <div className="bg-black min-h-screen text-white">
        {renderContent()}
        <CookieConsentBanner />
      </div>
    </LanguageProvider>
  );
};

export default App;