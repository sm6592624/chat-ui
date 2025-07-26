
import React from 'react';
import { Bot, User, Users, Briefcase } from 'lucide-react';

export const mockChats = [
    { 
        id: 1, 
        name: 'AI Support Agent', 
        avatar: <Bot className="h-full w-full text-white p-1" />, 
        lastMessage: 'Hello! How can I assist you today?', 
        timestamp: '10:30 AM', 
        unread: 0,
        isOnline: true,
        lastSeen: 'now',
        lastMessageStatus: 'read'
    },
    { 
        id: 2, 
        name: 'John Doe', 
        avatar: <User className="h-full w-full text-white p-1" />, 
        lastMessage: 'Sounds good! Let me know when you\'re ready.', 
        timestamp: '9:45 AM', 
        unread: 2,
        isOnline: true,
        lastSeen: '2 minutes ago',
        lastMessageStatus: 'delivered'
    },
    { 
        id: 3, 
        name: 'Design Team', 
        avatar: <Users className="h-full w-full text-white p-1" />, 
        lastMessage: 'Can you send over the new mockups? We need to review them before the meeting.', 
        timestamp: 'Yesterday', 
        unread: 0,
        isOnline: false,
        lastSeen: 'yesterday',
        lastMessageStatus: 'read'
    },
    { 
        id: 4, 
        name: 'Alice Johnson', 
        avatar: <User className="h-full w-full text-white p-1" />, 
        lastMessage: 'See you tomorrow! Don\'t forget to bring the documents.', 
        timestamp: 'Yesterday', 
        unread: 0,
        isOnline: false,
        lastSeen: '1 hour ago',
        lastMessageStatus: 'read'
    },
    { 
        id: 5, 
        name: 'Project Alpha', 
        avatar: <Briefcase className="h-full w-full text-white p-1" />, 
        lastMessage: 'The client has approved the latest proposal. We can proceed with phase 2.', 
        timestamp: '2 days ago', 
        unread: 0,
        isOnline: false,
        lastSeen: '2 days ago',
        lastMessageStatus: 'read'
    },
];
