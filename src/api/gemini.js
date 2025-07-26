export const getGeminiResponse = async (prompt) => {
    let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
    const payload = { contents: chatHistory };
    const apiKey = ""; // IMPORTANT: Use environment variables for API keys in a real project
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
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
        return "I'm sorry, I'm having trouble connecting. Please try again later.";
    }
};
