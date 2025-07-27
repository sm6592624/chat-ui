import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Send, Trash2 } from 'lucide-react';

const VoiceRecorder = ({ isRecording, onStartRecording, onStopRecording, onSendVoice, onCancelRecording }) => {
    const [recordingTime, setRecordingTime] = useState(0);
    const [audioBlob, setAudioBlob] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const timerRef = useRef(null);

    // Initialize media recorder
    const initializeRecorder = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                const url = URL.createObjectURL(blob);
                
                setAudioBlob(blob);
                setAudioUrl(url);
                setShowPreview(true);
                audioChunksRef.current = [];
                
                // Stop all tracks to free up microphone
                stream.getTracks().forEach(track => track.stop());
                
                // Notify parent that recording stopped
                onStopRecording();
            };

            return true;
        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('Could not access microphone. Please check your permissions.');
            return false;
        }
    };

    // Start recording
    const handleStartRecording = async () => {
        const initialized = await initializeRecorder();
        if (initialized && mediaRecorderRef.current) {
            setRecordingTime(0);
            setAudioBlob(null);
            setAudioUrl(null);
            
            mediaRecorderRef.current.start();
            onStartRecording();
            
            // Start timer
            timerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
        }
    };

    // Stop recording
    const handleStopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
        
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    // Cancel recording/message
    const handleCancelMessage = () => {
        // If still recording, stop it first
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
        
        // Clear timer
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        
        // Clean up audio data
        audioChunksRef.current = [];
        
        // Revoke URL if exists
        if (audioUrl) {
            URL.revokeObjectURL(audioUrl);
        }
        
        // Reset all state
        setRecordingTime(0);
        setAudioBlob(null);
        setAudioUrl(null);
        setShowPreview(false);
        
        // Notify parent component
        if (onCancelRecording) {
            onCancelRecording();
        }
    };

    // Send voice message
    const handleSendVoice = () => {
        if (!audioBlob || !onSendVoice) {
            return;
        }
        
        try {
            onSendVoice(audioBlob, recordingTime);
            
            // Clean up after sending
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }
            setAudioBlob(null);
            setAudioUrl(null);
            setRecordingTime(0);
            setShowPreview(false);
        } catch (error) {
            console.error('Error sending voice message:', error);
        }
    };

    // Format time as MM:SS
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }
        };
    }, [audioUrl]);

    // Recording state - show recording interface
    if (isRecording && !showPreview) {
        return (
            <div className="flex items-center space-x-3 bg-red-50 dark:bg-red-900/20 p-3 rounded-2xl border border-red-200 dark:border-red-800 animate-pulse">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-700 dark:text-red-400 font-medium text-sm">
                        Recording {formatTime(recordingTime)}
                    </span>
                </div>
                
                <div className="flex space-x-2">
                    <button
                        onClick={handleStopRecording}
                        className="p-2 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors duration-200"
                        aria-label="Stop recording"
                    >
                        <Square className="h-4 w-4" />
                    </button>
                    
                    <button
                        onClick={handleCancelMessage}
                        className="p-2 rounded-full bg-gray-600 hover:bg-gray-700 text-white transition-colors duration-200"
                        aria-label="Cancel recording"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>
        );
    }

    // Audio ready state - show preview and send/cancel options
    if (showPreview && audioBlob && audioUrl) {
        return (
            <div className="flex items-center space-x-3 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-2xl border border-blue-200 dark:border-blue-800">
                <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                        <Mic className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-blue-700 dark:text-blue-400 font-medium text-sm">
                            Voice message ({formatTime(recordingTime)})
                        </span>
                    </div>
                    
                    <audio 
                        controls 
                        src={audioUrl} 
                        className="w-full h-8"
                        style={{ maxWidth: '200px' }}
                    />
                </div>
                
                <div className="flex space-x-2" style={{ position: 'relative', zIndex: 1000 }}>
                    <button
                        onClick={handleSendVoice}
                        className="p-2 rounded-full bg-green-600 hover:bg-green-700 text-white transition-colors duration-200 shadow-lg"
                        aria-label="Send voice message"
                        type="button"
                        style={{ 
                            pointerEvents: 'auto',
                            position: 'relative',
                            zIndex: 1001
                        }}
                    >
                        <Send className="h-4 w-4" style={{ pointerEvents: 'none' }} />
                    </button>
                    
                    <button
                        onClick={handleCancelMessage}
                        className="p-2 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors duration-200 shadow-lg"
                        aria-label="Cancel voice message"
                        type="button"
                        style={{ 
                            pointerEvents: 'auto',
                            position: 'relative',
                            zIndex: 1001
                        }}
                    >
                        <Trash2 className="h-4 w-4" style={{ pointerEvents: 'none' }} />
                    </button>
                </div>
            </div>
        );
    }

    // Default state - show microphone button
    return (
        <button
            onClick={handleStartRecording}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-600 hover:bg-primary-700 text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            aria-label="Record voice message"
            type="button"
        >
            <Mic className="h-5 w-5" />
        </button>
    );
};

export default VoiceRecorder;
