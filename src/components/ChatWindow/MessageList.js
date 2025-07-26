import React from 'react';
import Message from './Message';
import TypingIndicator from './TypingIndicator';

const MessageList = ({ messages, isTyping, messagesEndRef }) => (
  <main className="flex-1 overflow-y-auto p-4 scrollbar-thin relative">
    {messages.length === 0 ? (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Start the conversation
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs">
          Send a message to begin your chat. Your messages are end-to-end encrypted.
        </p>
      </div>
    ) : (
      <div className="space-y-1">
        {messages.map((message, index) => (
          <Message 
            key={message.id} 
            message={message} 
            isFirstInGroup={index === 0 || messages[index - 1].sender !== message.sender}
            isLastInGroup={index === messages.length - 1 || messages[index + 1].sender !== message.sender}
          />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} className="h-4" />
      </div>
    )}
  </main>
);

export default MessageList;
