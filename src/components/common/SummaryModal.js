import React, { useEffect } from 'react';
import { X, Book, Copy, Download } from 'lucide-react';

const SummaryModal = ({ isOpen, onClose, summary, isSummarizing }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleCopy = () => {
        if (summary) {
            navigator.clipboard.writeText(summary);
        }
    };

    const handleDownload = () => {
        if (summary) {
            const blob = new Blob([summary], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `conversation-summary-${new Date().toISOString().split('T')[0]}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };

    if (!isOpen) return null;
    
    return (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-gray-200 dark:border-gray-700 animate-slide-up">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                            <Book className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                Conversation Summary
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                AI-generated summary of your conversation
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        aria-label="Close modal"
                    >
                        <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
                
                {/* Content */}
                <div className="flex-1 p-6 overflow-y-auto scrollbar-thin">
                    {isSummarizing ? (
                        <div className="flex flex-col items-center justify-center h-48 space-y-4">
                            <div className="relative">
                                <div className="h-12 w-12 border-4 border-primary-200 dark:border-primary-800 border-t-primary-600 dark:border-t-primary-400 rounded-full animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Book className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    Generating Summary
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Our AI is analyzing your conversation and creating a comprehensive summary...
                                </p>
                            </div>
                        </div>
                    ) : summary ? (
                        <div className="space-y-4">
                            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                                    {summary}
                                </p>
                            </div>
                            
                            {/* Action buttons */}
                            <div className="flex justify-end space-x-3 pt-2">
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
                                >
                                    <Copy className="h-4 w-4" />
                                    <span>Copy</span>
                                </button>
                                <button
                                    onClick={handleDownload}
                                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors duration-200"
                                >
                                    <Download className="h-4 w-4" />
                                    <span>Download</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-48 text-center">
                            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
                                <Book className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                No Summary Available
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                There was an issue generating the summary. Please try again.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SummaryModal;
