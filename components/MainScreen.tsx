import React, { useState } from 'react';
import { View } from '../types';
import SideNav from './SideNav';
import HomeFeed from './HomeFeed';
import ProfileScreen from './ProfileScreen';
import ChatScreen from './ChatScreen';
import MarketplaceScreen from './MarketplaceScreen';
import VideoCallScreen from './VideoCallScreen';
import SettingsScreen from './SettingsScreen';
import PrivacyPolicyScreen from './PrivacyPolicyScreen';
import TermsOfServiceScreen from './TermsOfServiceScreen';
import { MenuIcon } from './icons/UiIcons';

interface MainScreenProps {
  currentView: View;
  navigate: (view: View) => void;
  onLogout: () => void;
  currentUserEmail: string;
}

const MainScreen: React.FC<MainScreenProps> = ({ currentView, navigate, onLogout, currentUserEmail }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeFeed currentUserEmail={currentUserEmail} />;
      case 'profile':
        return <ProfileScreen />;
      case 'messages':
        return <ChatScreen />;
      case 'marketplace':
        return <MarketplaceScreen />;
      case 'video-calls':
        return <VideoCallScreen />;
      case 'settings':
        return <SettingsScreen navigate={navigate} />;
      case 'privacy-policy':
        return <PrivacyPolicyScreen navigate={navigate} />;
      case 'terms-of-service':
        return <TermsOfServiceScreen navigate={navigate} />;
      default:
        return <HomeFeed currentUserEmail={currentUserEmail} />;
    }
  };

  return (
    <div className="relative min-h-screen md:flex">
      <SideNav 
        isOpen={isNavOpen} 
        setIsOpen={setIsNavOpen} 
        navigate={navigate} 
        onLogout={onLogout}
        currentView={currentView}
      />
      <main className="flex-1 bg-black">
        <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800 p-4 flex items-center md:hidden">
          <button onClick={() => setIsNavOpen(true)}>
            <MenuIcon className="h-6 w-6 text-white" />
          </button>
          <h1 className="text-xl font-bold text-white mx-auto">TOUNSI تونسي</h1>
        </div>
        <div className="p-2 md:p-6">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default MainScreen;