
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MicIcon, EndCallIcon, SwitchCameraIcon } from './icons/UiIcons';

const VideoCallScreen: React.FC = () => {
  const { t } = useLanguage();
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div className="relative w-full h-[calc(100vh-80px)] bg-dark-red rounded-xl overflow-hidden border border-gray-800">
      <div className="absolute top-4 end-4 w-32 h-40 bg-gray-800 rounded-lg border-2 border-gray-600">
        {/* Local Video View */}
      </div>

      <div className="flex flex-col items-center justify-between h-full p-6">
        <div className="text-center">
          <p className="text-white text-lg font-semibold">{t('activeVideoCall')}</p>
        </div>
        
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <button onClick={() => setIsMuted(!isMuted)} className={`p-4 rounded-full transition-colors ${isMuted ? 'bg-white' : 'bg-red-600'}`}>
            <MicIcon className={`${isMuted ? 'text-black' : 'text-white'} h-8 w-8`} />
          </button>
          <button onClick={() => alert(t('callEnded'))} className="p-5 bg-red-600 rounded-full">
            <EndCallIcon className="text-white h-8 w-8" />
          </button>
          <button className="p-4 bg-red-600 rounded-full">
            <SwitchCameraIcon className="text-white h-8 w-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCallScreen;
