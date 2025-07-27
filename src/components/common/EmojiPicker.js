import React from 'react';

const EmojiPicker = ({ isOpen, onEmojiSelect, onClose }) => {
    // Common emojis organized by category
    const emojiCategories = {
        'Smileys': [
            '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
            '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
            '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩',
            '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
            '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬'
        ],
        'Gestures': [
            '👍', '👎', '👌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈',
            '👉', '👆', '🖕', '👇', '☝️', '👋', '🤚', '🖐️', '✋', '🖖',
            '👏', '🙌', '🤲', '🤝', '🙏', '💪', '🦾', '🦿', '🦵', '🦶'
        ],
        'Hearts': [
            '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔',
            '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥️'
        ],
        'Objects': [
            '💬', '💭', '💯', '💫', '💥', '💢', '💦', '💨', '🕳️', '💣',
            '💤', '👁️', '🗨️', '🗯️', '💭', '🔥', '⭐', '🌟', '✨', '⚡'
        ]
    };

    const handleEmojiClick = (emoji) => {
        onEmojiSelect(emoji);
    };

    const handleOutsideClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop for mobile */}
            <div 
                className="fixed inset-0 z-40 md:hidden" 
                onClick={handleOutsideClick}
            />
            
            {/* Emoji picker container */}
            <div className="absolute bottom-full right-0 mb-2 z-50 w-80 max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-600 overflow-hidden animate-slide-up">
                {/* Header */}
                <div className="p-3 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                            Choose an emoji
                        </h3>
                        <button
                            onClick={onClose}
                            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                            aria-label="Close emoji picker"
                        >
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Emoji grid */}
                <div className="max-h-64 overflow-y-auto scrollbar-thin p-3">
                    {Object.entries(emojiCategories).map(([category, emojis]) => (
                        <div key={category} className="mb-4 last:mb-0">
                            <h4 className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
                                {category}
                            </h4>
                            <div className="grid grid-cols-8 gap-1">
                                {emojis.map((emoji, index) => (
                                    <button
                                        key={`${category}-${index}`}
                                        onClick={() => handleEmojiClick(emoji)}
                                        className="w-8 h-8 flex items-center justify-center text-lg rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
                                        title={emoji}
                                    >
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick access row */}
                <div className="p-3 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                    <div className="flex items-center justify-center space-x-2">
                        {['😀', '❤️', '👍', '😂', '😊', '🔥', '💯', '✨'].map((emoji, index) => (
                            <button
                                key={`quick-${index}`}
                                onClick={() => handleEmojiClick(emoji)}
                                className="w-8 h-8 flex items-center justify-center text-lg rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
                                title={emoji}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmojiPicker;
