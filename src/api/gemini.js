export const getGeminiResponse = async (prompt) => {
    let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
    const payload = { contents: chatHistory };
    const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    
    // Debug logging for environment variables
    console.log("Environment check:", {
        hasApiKey: !!apiKey,
        keyLength: apiKey ? apiKey.length : 0,
        keyPrefix: apiKey ? apiKey.substring(0, 8) + '...' : 'none'
    });
    
    // Check if API key is configured
    if (!apiKey || apiKey === "your_actual_api_key_here" || apiKey === "your_gemini_api_key_here") {
        console.warn("Gemini API key not configured. Using mock response.");
        return "I'm a demo response! Please add your Gemini API key to enable AI-powered conversations. You can get one from https://makersuite.google.com/app/apikey";
    }
    
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        
        const result = await response.json();
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            return result.candidates[0].content.parts[0].text;
        } else {
            console.error('Unexpected response structure:', result);
            return "I'm having trouble understanding. Could you please rephrase?";
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error.message.includes('401')) {
            return "API key is invalid. Please check your Gemini API key configuration.";
        } else if (error.message.includes('403')) {
            return "API quota exceeded or access denied. Please check your Gemini API settings.";
        } else {
            return "I'm sorry, I'm having trouble connecting. Please try again later.";
        }
    }
};
