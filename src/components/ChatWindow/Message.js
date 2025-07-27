import React from 'react';
import { CheckCheck, Check, Clock, AlertCircle } from 'lucide-react';

const Message = ({ message }) => {
    const isUser = message.sender === 'user';
    
    const getStatusIcon = () => {
        if (!isUser) return null;
        
        switch (message.status) {
            case 'sending':
                return <Clock size={14} className="text-gray-400 animate-pulse" />;
            case 'sent':
                return <Check size={14} className="text-gray-400" />;
            case 'delivered':
                return <CheckCheck size={14} className="text-gray-400" />;
            case 'read':
                return <CheckCheck size={14} className="text-primary-600" />;
            case 'error':
                return <AlertCircle size={14} className="text-red-500" />;
            default:
                return <Check size={14} className="text-gray-400" />;
        }
    };

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-slide-up`}>
            <div className={`relative max-w-[85%] sm:max-w-[75%] md:max-w-[70%] ${isUser ? 'ml-12' : 'mr-12'}`}>
                <div className={`px-4 py-3 rounded-2xl shadow-message relative ${
                    isUser 
                        ? 'bg-primary-600 text-white rounded-br-md' 
                        : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-md border border-gray-200 dark:border-gray-600'
                }`}>
                    {message.isVoice ? (
                        <div className="space-y-2">
                            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                                {message.text}
                            </p>
                            {message.audioUrl && (
                                <audio 
                                    controls 
                                    src={message.audioUrl} 
                                    className={`w-full h-8 ${isUser ? 'audio-white' : 'audio-dark'}`}
                                    style={{ maxWidth: '250px' }}
                                />
                            )}
                        </div>
                    ) : (
                        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                            {message.text}
                        </p>
                    )}
                    
                    <div className={`flex items-center justify-end mt-2 space-x-1 ${
                        isUser ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                        <span className="text-xs font-medium">
                            {message.timestamp}
                        </span>
                        {getStatusIcon()}
                    </div>
                </div>
                
                {/* Message tail */}
                <div className={`absolute bottom-0 ${
                    isUser 
                        ? 'right-0 text-primary-600' 
                        : 'left-0 text-white dark:text-gray-700'
                }`}>
                    <svg width="8" height="13" viewBox="0 0 8 13" fill="currentColor">
                        <path d={isUser 
                            ? "M0 0v11.27L8 0H0z" 
                            : "M8 0v11.27L0 0h8z"
                        } />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Message;