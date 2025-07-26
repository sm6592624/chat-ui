import React, { useState, useEffect } from 'react';
import ChatListPanel from './components/ChatList/ChatListPanel';
import ChatWindow from './components/ChatWindow/ChatWindow';
import SummaryModal from './components/common/SummaryModal';
import { mockChats } from './data/mockData';
import { getGeminiResponse } from './api/gemini';

export default function App() {
  const [activeChatId, setActiveChatId] = useState(1);
  const [messages, setMessages] = useState({
      1: [
        { id: 1, sender: 'ai', text: 'Hello! How can I assist you today?', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), status: 'read' },
      ],
      2: [],
      3: [],
      4: [],
  });
  const [isTyping, setIsTyping] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true' || 
             (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const handleSendMessage = async (text) => {
    const trimmedInput = text.trim();
    if (trimmedInput === '') return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: trimmedInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };
    
    setMessages(prev => ({ ...prev, [activeChatId]: [...(prev[activeChatId] || []), userMessage] }));
    setIsTyping(true);

    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [activeChatId]: prev[activeChatId].map(msg => 
          msg.id === userMessage.id ? { ...msg, status: 'delivered' } : msg
        )
      }));
    }, 500);

    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [activeChatId]: prev[activeChatId].map(msg => 
          msg.id === userMessage.id ? { ...msg, status: 'read' } : msg
        )
      }));
    }, 1000);

    const conversationHistory = [...(messages[activeChatId] || []), userMessage].map(msg => `${msg.sender}: ${msg.text}`).join('\n');
    const prompt = `You are a helpful AI support agent. Continue the conversation based on the history.\n\n${conversationHistory}\nai:`;
    
    const aiText = await getGeminiResponse(prompt);

    const aiResponse = {
      id: Date.now() + 1,
      sender: 'ai',
      text: aiText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'read'
    };

    setMessages(prev => ({ ...prev, [activeChatId]: [...prev[activeChatId], aiResponse] }));
    setIsTyping(false);
  };

  const handleSummarize = async () => {
    if (!messages[activeChatId] || messages[activeChatId].length === 0) return;
    setIsSummarizing(true);
    setIsSummaryModalOpen(true);
    const conversationText = (messages[activeChatId] || []).map(msg => `${msg.sender}: ${msg.text}`).join('\n');
    const prompt = `Please provide a concise summary of the following conversation:\n\n${conversationText}`;
    
    const summaryText = await getGeminiResponse(prompt);
    setSummary(summaryText);
    setIsSummarizing(false);
  };

  const activeChat = mockChats.find(c => c.id === activeChatId);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="h-screen w-screen bg-chat-bg dark:bg-chat-bg-dark flex items-center justify-center transition-colors duration-300">
        <div className="flex h-full w-full max-w-7xl shadow-chat sm:h-[95vh] sm:rounded-xl overflow-hidden backdrop-blur-sm">
            {/* Left Panel: Chat List */}
            <div className={`w-full md:w-1/3 lg:w-2/5 ${activeChatId && 'hidden md:flex'} flex-col`}>
                 <ChatListPanel 
                   chats={mockChats} 
                   onChatSelect={setActiveChatId} 
                   activeChatId={activeChatId}
                   darkMode={darkMode}
                   onToggleDarkMode={toggleDarkMode}
                 />
            </div>

            {/* Right Panel: Chat Window */}
            <div className={`w-full md:w-2/3 lg:w-3/5 ${!activeChatId && 'hidden md:flex'} flex-col`}>
                <ChatWindow 
                    activeChat={activeChat}
                    messages={messages[activeChatId] || []}
                    isTyping={isTyping}
                    onSendMessage={handleSendMessage}
                    onSummarize={handleSummarize}
                    isSummarizing={isSummarizing}
                    onBack={() => setActiveChatId(null)}
                />
            </div>
        </div>
        <SummaryModal
            isOpen={isSummaryModalOpen}
            onClose={() => setIsSummaryModalOpen(false)}
            summary={summary}
            isSummarizing={isSummarizing}
        />
    </div>
  );
}
