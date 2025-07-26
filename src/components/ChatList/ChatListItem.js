
import React from 'react';
import { CheckCheck, Check } from 'lucide-react';

const ChatListItem = ({ chat, onClick, isActive }) => (
    <div
        onClick={() => onClick(chat.id)}
        className={`flex items-center p-4 cursor-pointer transition-all duration-200 border-l-4 hover:bg-gray-50 dark:hover:bg-gray-800 ${
            isActive 
                ? 'bg-primary-50 dark:bg-primary-900/20 border-l-primary-500 shadow-sm' 
                : 'border-l-transparent hover:border-l-gray-200 dark:hover:border-l-gray-700'
        }`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick(chat.id);
            }
        }}
        aria-label={`Chat with ${chat.name}`}
    >
        <div className="relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-600 shadow-md">
            <div className="flex items-center justify-center w-full h-full text-white">
                {chat.avatar}
            </div>
            {chat.isOnline && (
                <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-green-500 border-2 border-white dark:border-gray-900"></div>
            )}
        </div>
        
        <div className="flex-1 ml-4 min-w-0">
            <div className="flex justify-between items-start mb-1">
                <h3 className={`text-sm font-semibold truncate ${isActive ? 'text-primary-700 dark:text-primary-300' : 'text-gray-900 dark:text-white'}`}>
                    {chat.name}
                </h3>
                <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                    <span className={`text-xs ${chat.unread > 0 ? 'text-primary-600 dark:text-primary-400 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                        {chat.timestamp}
                    </span>
                    {chat.lastMessageStatus && (
                        <div className="text-primary-600 dark:text-primary-400">
                            {chat.lastMessageStatus === 'read' ? (
                                <CheckCheck size={14} />
                            ) : (
                                <Check size={14} />
                            )}
                        </div>
                    )}
                </div>
            </div>
            
            <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate flex-1 pr-2">
                    {chat.lastMessage}
                </p>
                {chat.unread > 0 && (
                    <span className="bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 animate-pulse">
                        {chat.unread > 99 ? '99+' : chat.unread}
                    </span>
                )}
            </div>
        </div>
    </div>
);

export default ChatListItem;