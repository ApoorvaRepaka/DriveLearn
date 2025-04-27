'use client';

import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

type Props = {
  setVoiceTranscript: (text: string) => void;
};

export default function VoiceInput({ setVoiceTranscript }: Props) {
  const [isClient, setIsClient] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (listening && transcript.trim()) {
      setVoiceTranscript(transcript);
    }
  }, [transcript, listening, setVoiceTranscript]);

  const handleStart = () => {
    try {
      resetTranscript();
      setVoiceTranscript('');
      SpeechRecognition.startListening({ continuous: true });
    } catch (error) {
      console.error('Error starting listening:', error);
    }
  };

  const handleStop = () => {
    try {
      SpeechRecognition.stopListening();
      setVoiceTranscript(transcript);
    } catch (error) {
      console.error('Error stopping listening:', error);
    }
  };

  if (!isClient) return null;

  if (!browserSupportsSpeechRecognition) {
    console.error('Speech recognition is not supported in this browser.');
    return <p className="text-red-600 text-center font-medium">❌ Your browser doesn’t support speech recognition.</p>;
  }

  return (
    <div className="my-6 mx-auto max-w-lg sm:max-w-xl md:max-w-2xl bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">🎙️ Voice Input</h2>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <button
          onClick={handleStart}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md"
        >
          🎤 Start Voice
        </button>

        <button
          onClick={handleStop}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md"
        >
          🛑 Stop
        </button>
      </div>

      <p className="mt-4 text-center text-gray-600 italic text-sm sm:text-base">
        {listening ? '🎙️ Listening...' : 'Click to speak'}
      </p>

      <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
        <p className="text-gray-700 text-sm sm:text-base whitespace-pre-wrap font-medium">
          {transcript || "No speech detected yet. Try speaking!"}
        </p>
      </div>
    </div>
  );
}