# 🔑 Gemini API Setup Guide

## Quick Setup Instructions

### 1. Get Your API Key
1. **Visit**: [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Sign in** with your Google account
3. **Click "Create API Key"**
4. **Select or create a project**
5. **Copy the generated API key** 📋

### 2. Add API Key to Your Project
1. **Open** the `.env` file in your project root
2. **Replace** `your_actual_api_key_here` with your actual API key:
   ```
   REACT_APP_GEMINI_API_KEY=your_copied_api_key_here
   ```
3. **Save** the file

### 3. Restart Your Development Server
```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm start
```

## 🔒 Security Notes

- ✅ Your `.env` file is already in `.gitignore` - it won't be committed to Git
- ✅ Never share your API key publicly
- ✅ For production deployment on Vercel, add the API key as an environment variable in your Vercel dashboard

## 🚀 For Vercel Deployment

When deploying to Vercel:
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add:
   - **Name**: `REACT_APP_GEMINI_API_KEY`
   - **Value**: Your API key
4. **Redeploy** your application

## 🧪 Testing

After adding your API key:
1. Start a chat with the AI Support Agent
2. Send a message
3. You should receive AI-powered responses from Gemini!

## 📚 API Documentation

- [Gemini API Documentation](https://ai.google.dev/docs)
- [Getting Started Guide](https://ai.google.dev/tutorials/get_started_web)

## 🆘 Troubleshooting

- **"API key not configured"** → Check your `.env` file
- **"API key is invalid"** → Verify your API key is correct
- **"API quota exceeded"** → Check your Google Cloud billing/quotas

Happy coding! 🎉
