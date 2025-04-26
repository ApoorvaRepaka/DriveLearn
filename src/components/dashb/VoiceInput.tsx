'use client';

import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

type Props = {
  setQuestion: (text: string) => void;
};

export default function VoiceInput({ setQuestion }: Props) {
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

  const handleStart = () => {
    try {
      SpeechRecognition.startListening({ continuous: false });
    } catch (error) {
      console.error("Error starting listening:", error);
    }
  };

  const handleStop = () => {
    try {
      SpeechRecognition.stopListening();
      setQuestion(transcript);
    } catch (error) {
      console.error("Error stopping listening:", error);
    }
  };

  if (!isClient) return null;

  if (!browserSupportsSpeechRecognition) {
    return <p className="text-red-600">❌ Your browser doesn’t support speech recognition.</p>;
  }
  

  return (
    <div className="my-4">
      <div className="flex gap-2 items-center">
        <button
          onClick={() => {
            resetTranscript();
            handleStart();
          }}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          🎤 Start Voice
        </button>
        <button
          onClick={handleStop}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          🛑 Stop
        </button>
        <span className="text-sm">{listening ? '🎙️ Listening...' : 'Click to speak'}</span>
      </div>
      <p className="mt-2 text-gray-600 italic">🗣️ {transcript}</p>
    </div>
  );
}
