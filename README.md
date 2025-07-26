# 💬 Modern Chat UI

A beautiful, modern WhatsApp-style chat application built with React and Tailwind CSS, featuring AI-powered conversations through Google's Gemini API.

![Chat App Preview](https://img.shields.io/badge/React-19.1.0-61dafb?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38bdf8?style=for-the-badge&logo=tailwind-css)
![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-Latest-f97316?style=for-the-badge)

## ✨ Features

### 🎨 Modern Design
- **WhatsApp-inspired interface** with smooth animations
- **Dark/Light mode** with system preference detection
- **Responsive design** that works on all devices
- **Custom color palette** with carefully chosen design tokens

### 💬 Chat Features
- **Real-time messaging** with AI responses
- **Message status indicators** (sent, delivered, read)
- **Typing indicators** with smooth animations
- **Search functionality** across all conversations
- **Online status** for contacts
- **Message timestamps** and read receipts

### 🤖 AI Integration
- **Google Gemini API** integration for intelligent responses
- **Conversation summarization** with AI
- **Copy and download** summaries
- **Context-aware** responses based on chat history

### 🚀 User Experience
- **Smooth animations** and micro-interactions
- **Keyboard navigation** support
- **Accessibility features** with ARIA labels
- **Loading states** and skeleton loaders
- **Custom scrollbars** and hover effects
- **Mobile-first** responsive design

## 🛠️ Tech Stack

- **Frontend:** React 19.1.0
- **Styling:** Tailwind CSS 3.4.17
- **Icons:** Lucide React
- **AI:** Google Gemini API
- **Build Tool:** Create React App
- **Package Manager:** npm

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key (optional, for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/chat-ui.git
   cd chat-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   ```bash
   # Create .env file and add your Gemini API key
   echo "REACT_APP_GEMINI_API_KEY=your_api_key_here" > .env
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/
│   ├── ChatList/
│   │   ├── ChatListPanel.js      # Main chat list container
│   │   └── ChatListItem.js       # Individual chat item
│   ├── ChatWindow/
│   │   ├── ChatWindow.js         # Main chat interface
│   │   ├── Header.js             # Chat header with user info
│   │   ├── MessageList.js        # Messages container
│   │   ├── Message.js            # Individual message bubble
│   │   ├── MessageInput.js       # Text input with send button
│   │   └── TypingIndicator.js    # Animated typing indicator
│   └── common/
│       ├── SummaryModal.js       # AI summary modal
│       ├── Notification.js       # Toast notifications
│       └── SkeletonLoader.js     # Loading skeletons
├── api/
│   └── gemini.js                 # Gemini API integration
├── data/
│   └── mockData.js               # Sample chat data
├── App.js                        # Main app component
└── index.css                     # Global styles and Tailwind imports
```

## 🎨 Design System

### Color Palette
- **Primary:** Green-based theme (#22c55e)
- **Chat backgrounds:** Light gray (#f0f2f5) / Dark blue (#0b1426)
- **Messages:** User messages in primary color, AI messages in white/gray
- **Accents:** Contextual colors for status indicators

### Typography
- **Font:** System fonts (-apple-system, BlinkMacSystemFont, Segoe UI)
- **Sizes:** Responsive typography with Tailwind classes
- **Weights:** Regular (400), Medium (500), Semibold (600), Bold (700)

### Animations
- **Fade in:** Smooth content loading
- **Slide up:** Message appearance
- **Pulse dots:** Typing indicators
- **Hover effects:** Interactive elements

## 🌐 API Integration

The app integrates with Google's Gemini API for AI-powered responses:

```javascript
// src/api/gemini.js
export const getGeminiResponse = async (prompt) => {
  // API call implementation
};
```

To use AI features:
1. Get a Gemini API key from Google AI Studio
2. Add it to your environment variables
3. The app will automatically use AI for responses and summaries

## 📱 Responsive Design

The application is built mobile-first and works seamlessly across:
- **Desktop:** Full sidebar and chat interface
- **Tablet:** Collapsible sidebar with smooth transitions
- **Mobile:** Stack navigation with back button

## 🎯 Performance Optimizations

- **Component-based architecture** for reusability
- **Efficient state management** with React hooks
- **Optimized re-renders** with proper dependency arrays
- **Lazy loading** for better initial load times
- **Smooth animations** with CSS transforms

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **WhatsApp** for design inspiration
- **Tailwind CSS** for the amazing utility framework
- **Lucide** for the beautiful icon set
- **Google** for the Gemini AI API
- **React team** for the fantastic framework

## 📞 Contact

If you have any questions or suggestions, feel free to reach out!

---

⭐ **Star this repository** if you found it helpful!
