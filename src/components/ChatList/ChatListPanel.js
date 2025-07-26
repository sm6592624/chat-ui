import React, { useState } from 'react';
import { Search, MessageSquarePlus, Moon, Sun, Settings } from 'lucide-react';
import ChatListItem from './ChatListItem';

const ChatListPanel = ({ chats, onChatSelect, activeChatId, darkMode, onToggleDarkMode }) => {
    const [searchQuery, setSearchQuery] = useState('');
    
    const filteredChats = chats.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-full h-full border-r border-gray-200 dark:border-gray-700 bg-chat-panel dark:bg-chat-panel-dark flex flex-col shadow-panel transition-colors duration-300">
            <header className="bg-gray-50 dark:bg-gray-800 p-4 flex justify-between items-center flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h1>
                <div className="flex items-center space-x-2">
                    <button 
                        onClick={onToggleDarkMode}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {darkMode ? (
                            <Sun className="h-5 w-5 text-yellow-500" />
                        ) : (
                            <Moon className="h-5 w-5 text-gray-600" />
                        )}
                    </button>
                    <button 
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                        aria-label="Settings"
                    >
                        <Settings className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button 
                        className="p-2 rounded-full bg-primary-600 hover:bg-primary-700 text-white transition-colors duration-200"
                        aria-label="Start new chat"
                    >
                        <MessageSquarePlus className="h-5 w-5" />
                    </button>
                </div>
            </header>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search conversations..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    />
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto scrollbar-thin">
                {filteredChats.length > 0 ? (
                    <div className="animate-fade-in">
                        {filteredChats.map(chat => (
                            <ChatListItem 
                                key={chat.id} 
                                chat={chat} 
                                onClick={onChatSelect} 
                                isActive={chat.id === activeChatId} 
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-32 text-gray-500 dark:text-gray-400">
                        <Search className="h-8 w-8 mb-2 opacity-50" />
                        <p className="text-sm">No conversations found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatListPanel;
