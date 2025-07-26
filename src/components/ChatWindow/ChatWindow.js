import React, { useState, useRef, useEffect } from 'react';
import Header from './Header';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatWindow = ({ activeChat, messages, isTyping, onSendMessage, onSummarize, isSummarizing, onBack }) => {
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSend = () => {
        if (inputValue.trim()) {
            onSendMessage(inputValue);
            setInputValue('');
        }
    };
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    };

    if (!activeChat) {
        return (
            <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-center relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 opacity-5 dark:opacity-10">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-400 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
                </div>
                
                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-12 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 max-w-md mx-4">
                    <div className="mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                        Welcome to Your Inbox
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        Select a conversation from the sidebar to start chatting, or create a new conversation to get started.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button className="btn-primary flex items-center justify-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span>New Chat</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 h-full relative">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="chat-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                            <circle cx="30" cy="30" r="1.5" fill="currentColor"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#chat-pattern)"/>
                </svg>
            </div>
            
            <Header 
                chat={activeChat}
                onSummarize={onSummarize} 
                isSummarizing={isSummarizing} 
                messageCount={messages.length}
                onBack={onBack}
            />
            <MessageList messages={messages} isTyping={isTyping} messagesEndRef={messagesEndRef} />
            <MessageInput 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
                onKeyDown={handleKeyDown} 
                onSend={handleSend} 
                isTyping={isTyping} 
            />
        </div>
    );
};

export default ChatWindow;