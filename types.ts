export type Language = 'ar' | 'fr';

export type View =
  | 'home'
  | 'profile'
  | 'messages'
  | 'marketplace'
  | 'video-calls'
  | 'settings'
  | 'privacy-policy'
  | 'terms-of-service';

export interface Post {
  id: number;
  userName: string;
  userImage: string;
  timeAgo: string;
  content: string;
  likes: number;
  comments: number;
}

export interface Conversation {
  id: number;
  userName: string;
  userImage: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

export interface Attachment {
    type: 'image' | 'video' | 'file';
    url: string;
    name?: string;
}

export interface Message {
    id: number;
    sender: 'me' | 'other';
    text: string;
    timestamp: string;
    attachment?: Attachment;
    reactions?: { [emoji: string]: string[] };
}

export interface MarketplaceItem {
  id: number;
  name: string;
  price: string;
  image: string;
}
