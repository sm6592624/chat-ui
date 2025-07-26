import React from 'react';
import { Book, ArrowLeft, MoreVertical, Phone, Video } from 'lucide-react';

const Header = ({ chat, onSummarize, isSummarizing, messageCount, onBack }) => (
  <header className="bg-white dark:bg-chat-header-dark border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between shadow-sm flex-shrink-0 transition-colors duration-300">
    <div className="flex items-center space-x-4">
      <button 
        onClick={onBack} 
        className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        aria-label="Go back to chat list"
      >
        <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
      </button>
      
      <div className="relative">
        <div className="flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-600 shadow-md">
          <div className="flex items-center justify-center w-full h-full text-white">
            {chat.avatar}
          </div>
        </div>
        {chat.isOnline && (
          <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></div>
        )}
      </div>
      
      <div className="min-w-0 flex-1">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{chat.name}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {chat.isOnline ? 'Online' : `Last seen ${chat.lastSeen || 'recently'}`}
        </p>
      </div>
    </div>
    
    <div className="flex items-center space-x-2">
      <button
        className="hidden sm:flex p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        aria-label="Voice call"
      >
        <Phone size={18} className="text-gray-600 dark:text-gray-400" />
      </button>
      
      <button
        className="hidden sm:flex p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        aria-label="Video call"
      >
        <Video size={18} className="text-gray-600 dark:text-gray-400" />
      </button>
      
      <button
        onClick={onSummarize}
        className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-3 rounded-lg transition-colors duration-200 shadow-sm"
        disabled={messageCount === 0 || isSummarizing}
        aria-label="Summarize conversation"
      >
        <Book className="h-4 w-4" />
        <span className="hidden lg:inline">
          {isSummarizing ? 'Summarizing...' : 'Summarize'}
        </span>
      </button>
      
      <button
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        aria-label="More options"
      >
        <MoreVertical size={18} className="text-gray-600 dark:text-gray-400" />
      </button>
    </div>
  </header>
);

export default Header;