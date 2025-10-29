
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Attachment } from '../types';
import { ImageIcon, VideoFileIcon, DocumentIcon } from './icons/UiIcons';

interface AttachmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (attachment: Attachment) => void;
}

const AttachmentModal: React.FC<AttachmentModalProps> = ({ isOpen, onClose, onSelect }) => {
    const { t } = useLanguage();

    if (!isOpen) return null;

    const handleSelect = (type: 'image' | 'video' | 'file') => {
        // This is a simulation. In a real app, this would open a file picker.
        switch (type) {
            case 'image':
                onSelect({ type: 'image', url: `https://picsum.photos/seed/${Date.now()}/400/300`, name: 'new_image.jpg' });
                break;
            case 'video':
                onSelect({ type: 'video', url: '#', name: 'new_video.mp4' });
                break;
            case 'file':
                onSelect({ type: 'file', url: '#', name: 'document.pdf' });
                break;
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-bold text-red-600 text-center mb-6">{t('sendAttachment')}</h2>
                <div className="grid grid-cols-3 gap-4 text-center">
                    <button onClick={() => handleSelect('image')} className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 flex flex-col items-center justify-center space-y-2">
                        <ImageIcon className="h-8 w-8 text-red-400"/>
                        <p className="text-white text-sm">{t('image')}</p>
                    </button>
                    <button onClick={() => handleSelect('video')} className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 flex flex-col items-center justify-center space-y-2">
                        <VideoFileIcon className="h-8 w-8 text-red-400"/>
                        <p className="text-white text-sm">{t('video')}</p>
                    </button>
                     <button onClick={() => handleSelect('file')} className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 flex flex-col items-center justify-center space-y-2">
                        <DocumentIcon className="h-8 w-8 text-red-400"/>
                        <p className="text-white text-sm">{t('file')}</p>
                    </button>
                </div>
                <button onClick={onClose} className="w-full mt-6 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600">{t('cancel')}</button>
            </div>
        </div>
    );
};

export default AttachmentModal;