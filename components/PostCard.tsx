import React, { useState } from 'react';
import { Post } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { LikeIcon, CommentIcon, ShareIcon, MoreIcon } from './icons/UiIcons';

interface PostCardProps {
  post: Post;
  onUpdatePost: (postId: number, newContent: string) => void;
  currentUserEmail: string;
}

const PostCard: React.FC<PostCardProps> = ({ post, onUpdatePost, currentUserEmail }) => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  const isCurrentUserPost = post.userName === currentUserEmail.split('@')[0];

  const handleSave = () => {
    if (editedContent.trim()) {
      onUpdatePost(post.id, editedContent);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedContent(post.content);
    setIsEditing(false);
  };
  
  const handleEditClick = () => {
    setIsEditing(true);
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
      <div className="flex items-center mb-3">
        <img src={post.userImage} alt={post.userName} className="w-12 h-12 rounded-full border-2 border-red-600" />
        <div className="flex-1 mx-3">
          <p className="font-bold text-white">{post.userName}</p>
          <p className="text-sm text-gray-400">{post.timeAgo}</p>
        </div>
        <div className="relative">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-400 hover:text-white">
            <MoreIcon className="h-6 w-6" />
          </button>
          {isMenuOpen && (
             <div className="absolute end-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10 border border-gray-700">
               {isCurrentUserPost && (
                 <button 
                    onClick={handleEditClick}
                    className="block w-full text-start px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                     {t('editPost')}
                 </button>
               )}
               {/* Future menu items can be added here */}
             </div>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="mb-4">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full h-28 p-3 bg-black border-2 border-red-500 rounded-lg text-white placeholder-gray-500 focus:outline-none"
            autoFocus
          />
          <div className="flex justify-end space-x-2 rtl:space-x-reverse mt-2">
            <button onClick={handleCancel} className="bg-gray-700 text-white px-4 py-1.5 rounded-lg hover:bg-gray-600">{t('cancel')}</button>
            <button onClick={handleSave} className="bg-red-600 text-white font-bold px-4 py-1.5 rounded-lg hover:bg-red-700">{t('save')}</button>
          </div>
        </div>
      ) : (
        <p className="text-white mb-4 p-3 border-2 border-red-600 rounded-lg bg-black min-h-[5rem] whitespace-pre-wrap">{post.content}</p>
      )}

      <div className="flex justify-between items-center text-gray-400 text-sm mb-2">
        <span>{post.likes} {t('likesCount')}</span>
        <span>{post.comments} {t('commentsCount')}</span>
      </div>

      <div className="border-t border-gray-800 pt-2 flex justify-around">
        <button className="flex items-center space-x-2 rtl:space-x-reverse text-gray-300 hover:text-red-500 transition-colors w-full justify-center py-2 rounded-lg hover:bg-gray-800">
          <LikeIcon className="h-5 w-5" /><span>{t('like')}</span>
        </button>
        <button className="flex items-center space-x-2 rtl:space-x-reverse text-gray-300 hover:text-red-500 transition-colors w-full justify-center py-2 rounded-lg hover:bg-gray-800">
          <CommentIcon className="h-5 w-5" /><span>{t('comment')}</span>
        </button>
        <button className="flex items-center space-x-2 rtl:space-x-reverse text-gray-300 hover:text-red-500 transition-colors w-full justify-center py-2 rounded-lg hover:bg-gray-800">
          <ShareIcon className="h-5 w-5" /><span>{t('share')}</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;