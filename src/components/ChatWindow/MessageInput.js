import React, { useRef, useEffect, useState } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
import EmojiPicker from '../common/EmojiPicker';
import VoiceRecorder from '../common/VoiceRecorder';

const MessageInput = ({ value, onChange, onKeyDown, onSend, onSendVoice, isTyping }) => {
    const textareaRef = useRef(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            const newHeight = Math.min(textareaRef.current.scrollHeight, 120);
            textareaRef.current.style.height = `${newHeight}px`;
        }
    }, [value]);

    // Close emoji picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showEmojiPicker && !event.target.closest('.emoji-picker-container')) {
                setShowEmojiPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showEmojiPicker]);

    const handleSend = () => {
        if (value.trim() && !isTyping) {
            onSend();
        }
    };

    const handleEmojiSelect = (emoji) => {
        const textarea = textareaRef.current;
        if (textarea) {
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const newValue = value.slice(0, start) + emoji + value.slice(end);
            
            // Create a synthetic event to maintain consistency
            const event = {
                target: {
                    value: newValue
                }
            };
            
            onChange(event);
            
            // Set cursor position after emoji
            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
                textarea.focus();
            }, 0);
        }
        setShowEmojiPicker(false);
    };

    const toggleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    // Voice recording handlers
    const handleStartRecording = () => {
        setIsRecording(true);
        setShowEmojiPicker(false); // Close emoji picker when starting recording
    };

    const handleStopRecording = () => {
        setIsRecording(false);
    };

    const handleSendVoice = (audioBlob, duration) => {
        if (onSendVoice && audioBlob) {
            onSendVoice(audioBlob, duration);
        }
        setIsRecording(false);
    };

    const handleCancelRecording = () => {
        setIsRecording(false);
    };

    return (
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 flex-shrink-0 transition-colors duration-300">
            <div className="flex items-end space-x-3">
                <button
                    className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-600 dark:text-gray-400"
                    aria-label="Attach file"
                >
                    <Paperclip className="h-5 w-5" />
                </button>
                
                <div className="flex-1 relative emoji-picker-container">
                    <textarea
                        ref={textareaRef}
                        className="w-full rounded-3xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 pr-12 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 resize-none overflow-y-auto transition-all duration-200"
                        placeholder="Type a message..."
                        value={value}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        disabled={isTyping}
                        rows={1}
                        style={{ minHeight: '48px', maxHeight: '120px' }}
                    />
                    
                    <button
                        onClick={toggleEmojiPicker}
                        className="absolute right-3 bottom-3 p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 text-gray-600 dark:text-gray-400"
                        aria-label="Add emoji"
                    >
                        <Smile className="h-4 w-4" />
                    </button>
                    
                    {/* Emoji Picker */}
                    <EmojiPicker
                        isOpen={showEmojiPicker}
                        onEmojiSelect={handleEmojiSelect}
                        onClose={() => setShowEmojiPicker(false)}
                    />
                </div>
                
                {value.trim() ? (
                    <button
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                        onClick={handleSend}
                        disabled={isTyping || value.trim() === ''}
                        aria-label="Send message"
                    >
                        <Send className="h-5 w-5" />
                    </button>
                ) : (
                    <VoiceRecorder
                        isRecording={isRecording}
                        onStartRecording={handleStartRecording}
                        onStopRecording={handleStopRecording}
                        onSendVoice={handleSendVoice}
                        onCancelRecording={handleCancelRecording}
                    />
                )}
            </div>
            
            {isTyping && (
                <div className="mt-3 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse-dot [animation-delay:0ms]"></div>
                        <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse-dot [animation-delay:150ms]"></div>
                        <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse-dot [animation-delay:300ms]"></div>
                    </div>
                    <span>AI is thinking...</span>
                </div>
            )}
        </footer>
    );
};

export default MessageInput;