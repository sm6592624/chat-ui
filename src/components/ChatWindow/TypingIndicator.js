import React from 'react';

const TypingIndicator = () => (
    <div className="flex justify-start mb-4 animate-slide-up">
        <div className="mr-12 max-w-[85%] sm:max-w-[75%] md:max-w-[70%]">
            <div className="relative px-4 py-3 rounded-2xl rounded-bl-md bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-message">
                <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                        <span className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse-dot [animation-delay:0ms]"></span>
                        <span className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse-dot [animation-delay:150ms]"></span>
                        <span className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse-dot [animation-delay:300ms]"></span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                        AI is typing
                    </span>
                </div>
                
                {/* Message tail */}
                <div className="absolute bottom-0 left-0 text-white dark:text-gray-700">
                    <svg width="8" height="13" viewBox="0 0 8 13" fill="currentColor">
                        <path d="M8 0v11.27L0 0h8z" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
);

export default TypingIndicator;
