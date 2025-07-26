import React from 'react';

const SkeletonLoader = ({ type = 'message', count = 3 }) => {
    const renderChatListSkeleton = () => (
        <div className="space-y-0">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="flex items-center p-4 animate-pulse">
                    <div className="h-12 w-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    <div className="flex-1 ml-4">
                        <div className="flex justify-between items-center mb-2">
                            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
                            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                        </div>
                        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderMessageSkeleton = () => (
        <div className="space-y-4 p-4">
            {Array.from({ length: count }).map((_, index) => {
                const isUser = index % 2 === 0;
                return (
                    <div key={index} className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-pulse`}>
                        <div className={`max-w-[70%] ${isUser ? 'ml-12' : 'mr-12'}`}>
                            <div className={`h-12 bg-gray-300 dark:bg-gray-600 rounded-2xl ${
                                isUser ? 'rounded-br-md' : 'rounded-bl-md'
                            }`}></div>
                        </div>
                    </div>
                );
            })}
        </div>
    );

    switch (type) {
        case 'chatList':
            return renderChatListSkeleton();
        case 'message':
            return renderMessageSkeleton();
        default:
            return renderMessageSkeleton();
    }
};

export default SkeletonLoader;
