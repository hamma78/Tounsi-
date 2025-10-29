import React, { useState } from 'react';
import { Post } from '../types';
import PostCard from './PostCard';
import CreatePostModal from './CreatePostModal';
import { AddIcon } from './icons/UiIcons';

const initialPosts: Post[] = [
  { id: 1, userName: "أحمد التونسي", userImage: "https://picsum.photos/id/1005/200/200", timeAgo: "2h", content: "مرحبا بكم في تونسي! أول تطبيق اجتماعي تونسي", likes: 125, comments: 43 },
  { id: 2, userName: "فاطمة الجميلة", userImage: "https://picsum.photos/id/1011/200/200", timeAgo: "5h", content: "طقس جميل في تونس اليوم 🌞", likes: 89, comments: 12 },
  { id: 3, userName: "محمد العزيز", userImage: "https://picsum.photos/id/1025/200/200", timeAgo: "1d", content: "تطبيق رائع! أحسنت العمل 👏", likes: 234, comments: 67 },
];

interface HomeFeedProps {
    currentUserEmail: string;
}

const HomeFeed: React.FC<HomeFeedProps> = ({ currentUserEmail }) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addPost = (content: string) => {
    const newPost: Post = {
      id: Date.now(),
      userName: currentUserEmail.split('@')[0],
      userImage: 'https://picsum.photos/id/1/200/200',
      timeAgo: 'الآن',
      content,
      likes: 0,
      comments: 0,
    };
    setPosts([newPost, ...posts]);
  };

  const handleUpdatePost = (postId: number, newContent: string) => {
    setPosts(posts.map(p => (p.id === postId ? { ...p, content: newContent } : p)));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onUpdatePost={handleUpdatePost} currentUserEmail={currentUserEmail} />
        ))}
      </div>
      
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 end-6 bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-lg"
      >
        <AddIcon className="h-6 w-6" />
      </button>

      <CreatePostModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onPost={addPost} 
      />
    </div>
  );
};

export default HomeFeed;