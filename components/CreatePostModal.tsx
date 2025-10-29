
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPost: (content: string) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, onPost }) => {
  const { t } = useLanguage();
  const [content, setContent] = useState('');

  if (!isOpen) return null;

  const handlePost = () => {
    if (content.trim()) {
      onPost(content);
      setContent('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold text-red-600 text-center mb-4">{t('createPostTitle')}</h2>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t('whatsHappening')}
          className="w-full h-32 p-3 bg-black border-2 border-red-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
        ></textarea>
        <div className="flex space-x-4 rtl:space-x-reverse my-4">
          <button className="flex-1 bg-red-600/20 text-red-400 py-2 rounded-lg hover:bg-red-600/40">{t('photo')}</button>
          <button className="flex-1 bg-red-600/20 text-red-400 py-2 rounded-lg hover:bg-red-600/40">{t('video')}</button>
        </div>
        <div className="flex space-x-4 rtl:space-x-reverse">
          <button onClick={onClose} className="flex-1 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600">{t('cancel')}</button>
          <button onClick={handlePost} className="flex-1 bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700">{t('post')}</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
