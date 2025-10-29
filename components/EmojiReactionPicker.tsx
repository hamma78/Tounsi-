import React from 'react';

const EMOJIS = ['👍', '❤️', '😂', '😯', '😢', '🙏'];

interface EmojiReactionPickerProps {
  onSelect: (emoji: string) => void;
}

const EmojiReactionPicker: React.FC<EmojiReactionPickerProps> = ({ onSelect }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-full p-1 flex items-center space-x-1 shadow-lg">
      {EMOJIS.map(emoji => (
        <button
          key={emoji}
          onClick={() => onSelect(emoji)}
          className="text-2xl p-1 rounded-full hover:bg-gray-700 transition-transform transform hover:scale-125"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

export default EmojiReactionPicker;