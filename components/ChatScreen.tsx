import React, { useState } from 'react';
import { Conversation, Message, Attachment } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { SearchIcon, MoreIcon, SendIcon, AttachmentIcon, CloseIcon, ImageIcon, VideoFileIcon, DocumentIcon, ReactionIcon } from './icons/UiIcons';
import AttachmentModal from './AttachmentModal';
import EmojiReactionPicker from './EmojiReactionPicker';

const initialConversations: Conversation[] = [
  { id: 1, userName: "فاطمة الجميلة", userImage: "https://picsum.photos/id/1011/200/200", lastMessage: "إن شاء الله!", timestamp: "10:45", unreadCount: 2 },
  { id: 2, userName: "محمد العزيز", userImage: "https://picsum.photos/id/1025/200/200", lastMessage: "شكرا جزيلا لك", timestamp: "أمس", unreadCount: 0 },
];

const initialMessages: Message[] = [
    {id: 1, sender: 'other', text: 'السلام عليكم', timestamp: '10:40', reactions: { '👍': ['other'] }},
    {id: 2, sender: 'me', text: 'و عليكم السلام', timestamp: '10:41'},
    {id: 3, sender: 'other', text: 'كيف حالك؟', timestamp: '10:42'},
    {id: 4, sender: 'other', text: 'هل يمكنك مساعدتي؟', timestamp: '10:43', reactions: { '❤️': ['me', 'other'] }},
    {id: 5, sender: 'me', text: 'بخير الحمد لله. بالتأكيد, كيف يمكنني المساعدة؟', timestamp: '10:44', reactions: { '👍': ['me']}},
    {id: 6, sender: 'other', text: 'إن شاء الله!', timestamp: '10:45'},
];

const AttachmentPreview: React.FC<{ attachment: Attachment, onRemove: () => void }> = ({ attachment, onRemove }) => {
    const renderPreviewIcon = () => {
        switch (attachment.type) {
            case 'image':
                return <img src={attachment.url} alt={attachment.name || 'Image preview'} className="w-12 h-12 rounded-md object-cover" />;
            case 'video':
                return <VideoFileIcon className="h-10 w-10 text-red-400" />;
            case 'file':
                return <DocumentIcon className="h-10 w-10 text-red-400" />;
        }
    };
    return (
        <div className="p-2 bg-gray-800 rounded-lg flex items-center gap-3 relative">
            {renderPreviewIcon()}
            <p className="text-white text-sm truncate">{attachment.name}</p>
            <button onClick={onRemove} className="absolute -top-2 -end-2 bg-gray-600 rounded-full p-0.5 hover:bg-gray-500">
                <CloseIcon className="h-4 w-4 text-white" />
            </button>
        </div>
    );
};


const MessageAttachment: React.FC<{ attachment: Attachment }> = ({ attachment }) => {
    switch (attachment.type) {
        case 'image':
            return <img src={attachment.url} alt={attachment.name} className="rounded-lg mt-2 max-w-full h-auto" />;
        case 'video':
            return (
                <div className="mt-2 p-3 bg-gray-600/50 rounded-lg flex items-center gap-3">
                    <VideoFileIcon className="h-8 w-8 text-red-300 flex-shrink-0" />
                    <span className="text-white text-sm truncate">{attachment.name}</span>
                </div>
            );
        case 'file':
            return (
                <div className="mt-2 p-3 bg-gray-600/50 rounded-lg flex items-center gap-3">
                    <DocumentIcon className="h-8 w-8 text-red-300 flex-shrink-0" />
                    <span className="text-white text-sm truncate">{attachment.name}</span>
                </div>
            );
        default:
            return null;
    }
};


const ChatScreen: React.FC = () => {
    const { t } = useLanguage();
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(initialConversations[0]);
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [newMessage, setNewMessage] = useState('');
    const [attachmentPreview, setAttachmentPreview] = useState<Attachment | null>(null);
    const [isAttachmentModalOpen, setAttachmentModalOpen] = useState(false);
    const [reactingToMessageId, setReactingToMessageId] = useState<number | null>(null);
    const currentUserImage = "https://picsum.photos/id/1/200/200";

    const handleSendMessage = () => {
        if (newMessage.trim() === '' && !attachmentPreview) return;

        const message: Message = {
            id: Date.now(),
            sender: 'me',
            text: newMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            attachment: attachmentPreview || undefined,
        };

        setMessages([...messages, message]);
        setNewMessage('');
        setAttachmentPreview(null);
    };

    const handleSelectAttachment = (attachment: Attachment) => {
        setAttachmentPreview(attachment);
        setAttachmentModalOpen(false);
    };

    const handleAddReaction = (messageId: number, emoji: string) => {
        setMessages(messages.map(msg => {
            if (msg.id === messageId) {
                const newReactions = { ...(msg.reactions || {}) };
                const reactedUsers = newReactions[emoji] || [];

                if (reactedUsers.includes('me')) {
                    newReactions[emoji] = reactedUsers.filter(user => user !== 'me');
                    if (newReactions[emoji].length === 0) {
                        delete newReactions[emoji];
                    }
                } else {
                    newReactions[emoji] = [...reactedUsers, 'me'];
                }
                return { ...msg, reactions: newReactions };
            }
            return msg;
        }));
        setReactingToMessageId(null);
    };

    return (
        <div className="flex h-[calc(100vh-100px)] bg-gray-900 rounded-xl border border-gray-800">
            {/* Conversations List */}
            <div className="w-full md:w-1/3 border-e border-gray-800 flex-col hidden md:flex">
                <div className="p-4 border-b border-gray-800">
                    <h2 className="text-xl font-bold text-white">{t('messages')}</h2>
                    <div className="relative mt-2">
                        <input type="text" placeholder={t('search') || 'Search'} className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg py-1.5 ps-10 pe-4 text-white focus:outline-none focus:border-red-500 text-sm"/>
                        <SearchIcon className="absolute top-1/2 -translate-y-1/2 start-3 text-gray-400 h-4 w-4"/>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {initialConversations.map(convo => (
                        <div key={convo.id} className={`flex items-center p-3 cursor-pointer ${selectedConversation?.id === convo.id ? 'bg-gray-800' : 'hover:bg-gray-800/50'}`} onClick={() => setSelectedConversation(convo)}>
                            <img src={convo.userImage} alt={convo.userName} className="w-12 h-12 rounded-full"/>
                            <div className="flex-1 mx-3">
                                <p className="font-semibold text-white">{convo.userName}</p>
                                <p className="text-sm text-gray-400 truncate">{convo.lastMessage}</p>
                            </div>
                            <div className="text-xs text-gray-500 text-center">
                                <p>{convo.timestamp}</p>
                                {convo.unreadCount > 0 && <span className="mt-1 inline-block bg-red-600 text-white rounded-full px-2 py-0.5">{convo.unreadCount}</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Window */}
            <div className="w-full md:w-2/3 flex flex-col">
                {selectedConversation ? (
                    <>
                        <div className="flex items-center p-3 border-b border-gray-800 bg-gray-900">
                            <img src={selectedConversation.userImage} alt={selectedConversation.userName} className="w-10 h-10 rounded-full"/>
                            <p className="font-semibold text-white mx-3">{selectedConversation.userName}</p>
                            <button className="ms-auto text-gray-400 hover:text-white"><MoreIcon className="h-6 w-6" /></button>
                        </div>

                        <div className="flex-1 p-4 overflow-y-auto bg-black">
                            {messages.map(msg => (
                                <div key={msg.id} className="mb-2">
                                    <div className={`flex items-end gap-2 group ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                        {msg.sender === 'other' && <img src={selectedConversation.userImage} alt="User" className="w-8 h-8 rounded-full mb-1"/>}
                                        {msg.sender === 'me' && (
                                            <div className="self-center">
                                                <button onClick={() => setReactingToMessageId(reactingToMessageId === msg.id ? null : msg.id)} className="text-gray-500 hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-gray-700">
                                                    <ReactionIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        )}
                                        <div className="relative">
                                            <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.sender === 'me' ? 'bg-red-600 text-white rounded-br-lg' : 'bg-gray-700 text-white rounded-bl-lg'}`}>
                                                {msg.attachment && <MessageAttachment attachment={msg.attachment} />}
                                                {msg.text && <p>{msg.text}</p>}
                                                <p className={`text-xs mt-1 text-white/70 text-end`}>{msg.timestamp}</p>
                                            </div>
                                            {reactingToMessageId === msg.id && (
                                                <div className="absolute z-10 -top-10 start-1/2 -translate-x-1/2">
                                                    <EmojiReactionPicker onSelect={(emoji) => handleAddReaction(msg.id, emoji)} />
                                                </div>
                                            )}
                                        </div>
                                        {msg.sender === 'other' && (
                                            <div className="self-center">
                                                <button onClick={() => setReactingToMessageId(reactingToMessageId === msg.id ? null : msg.id)} className="text-gray-500 hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-gray-700">
                                                    <ReactionIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        )}
                                        {msg.sender === 'me' && <img src={currentUserImage} alt="You" className="w-8 h-8 rounded-full mb-1"/>}
                                    </div>
                                    {msg.reactions && Object.keys(msg.reactions).length > 0 && (
                                        <div className={`flex gap-1 py-1 ${msg.sender === 'me' ? 'justify-end me-[40px]' : 'justify-start ms-[40px]'}`}>
                                            {Object.entries(msg.reactions).map(([emoji, users]) => {
                                                // FIX: Cast `users` to `string[]` to resolve a TypeScript type inference issue with Object.entries.
                                                const userList = users as string[];
                                                return userList.length > 0 && (
                                                    <button key={emoji} onClick={() => handleAddReaction(msg.id, emoji)} className={`rounded-full px-2 py-0.5 flex items-center text-xs transition-colors ${userList.includes('me') ? 'bg-red-600 border border-red-400' : 'bg-gray-700 hover:bg-gray-600 border border-transparent'}`}>
                                                        <span className="text-sm me-1">{emoji}</span>
                                                        <span className="text-white font-semibold">{userList.length}</span>
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="p-4 bg-gray-900 border-t border-gray-800">
                           {attachmentPreview && (
                                <div className="mb-2">
                                     <AttachmentPreview attachment={attachmentPreview} onRemove={() => setAttachmentPreview(null)} />
                                </div>
                           )}
                            <div className="flex items-center gap-3">
                                <button onClick={() => setAttachmentModalOpen(true)} className="text-gray-400 hover:text-white p-2">
                                    <AttachmentIcon className="w-6 h-6" />
                                </button>
                                <input 
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder={t('typeMessage') || 'Type a message...'} 
                                    className="flex-1 bg-gray-800 border-2 border-gray-700 rounded-full py-2.5 px-4 text-white focus:outline-none focus:border-red-500" 
                                />
                                <button onClick={handleSendMessage} className="bg-red-600 text-white rounded-full p-3 hover:bg-red-700">
                                    <SendIcon className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">{t('selectConversation')}</div>
                )}
            </div>
            <AttachmentModal isOpen={isAttachmentModalOpen} onClose={() => setAttachmentModalOpen(false)} onSelect={handleSelectAttachment}/>
        </div>
    );
};

export default ChatScreen;