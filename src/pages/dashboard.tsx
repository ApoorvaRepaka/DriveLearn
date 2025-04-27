'use client';

import { useEffect, useState } from 'react';
import VoiceInput from '@/components/dashb/VoiceInput';
import ResponseDisplay from '@/components/dashb/ResponseDisplay';
import axios from 'axios';
import { useRouter } from 'next/router';
import { PaperAirplaneIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

export default function Home() {
  const [manualQuestion, setManualQuestion] = useState('');
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User not logged in. Redirecting to login page.');
      router.push('/login');
    }
    router.prefetch('/login');
  }, [router]);

  const handleAsk = async () => {
    setError('');
    setIsLoading(true);

    const questionToSend = manualQuestion || voiceTranscript;

    if (!questionToSend.trim()) {
      setError('Please enter a question!');
      setIsLoading(false);
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('User not logged in. Please log in again.');
      router.push('/login');
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post('/api/ask', { question: questionToSend, userId });
      setAnswer(res.data.answer);
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

 const handleLogout = async () => {
  setIsLoggingOut(true);
  try {
    localStorage.removeItem('userId');
    setTimeout(() => {
      router.replace('/');
    }, 500); // Wait for 500ms before redirecting to show the loader
  } catch (err) {
    console.error('Logout error:', err);
    alert('Failed to logout. Try again.');
    setIsLoggingOut(false);
  }
};


  const toggleHistory = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User not logged in.');
      router.push('/login');
      return;
    }

    if (!showHistory) {
      setIsHistoryLoading(true);
      try {
        const res = await axios.post('/api/history', { userId });
        setHistory(res.data.data.history);
      } catch (err) {
        console.error('Error fetching history:', err);
        alert('Failed to load history.');
      } finally {
        setIsHistoryLoading(false);
      }
    }
    setShowHistory((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-8 sm:px-12 md:px-20 lg:px-32 xl:px-40 bg-gradient-to-b from-[#f9f6e7] to-white w-full">
      <main className="relative max-w-5xl w-full bg-white shadow-lg p-8 rounded-lg mt-12 sm:mt-16 space-y-6">
        <div className="absolute top-4 left-0 right-0 flex justify-between px-8 w-full">

          {/* History Button */}
          <button
            onClick={toggleHistory}
            disabled={isHistoryLoading}
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all w-[140px] h-[40px] flex items-center justify-center text-sm sm:text-base"
          >
            {isHistoryLoading ? (
              <ArrowPathIcon className="w-5 h-5 animate-spin text-white" />
            ) : (
              showHistory ? 'Hide History' : 'Show History'
            )}
          </button>

          {/* Logout Button (now Green) */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all w-[140px] h-[40px] flex items-center justify-center text-sm sm:text-base"
          >
            {isLoggingOut ? (
              <ArrowPathIcon className="w-5 h-5 animate-spin text-white" />
            ) : (
              'Logout'
            )}
          </button>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-center">📘 AI Tutor</h1>

        {/* History Panel */}
        {showHistory && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-4">
            <h2 className="text-xl font-semibold mb-2">📜 Previous Questions</h2>
            {history.length > 0 ? (
              <ul className="list-disc list-inside space-y-1">
                {history.map((q, index) => (
                  <li key={index} className="text-gray-700">{q}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No previous questions yet.</p>
            )}
          </div>
        )}

        {/* Input + Send Button */}
        <div className="flex items-center border rounded-md p-3 bg-gray-100">
          <textarea
            placeholder="Ask your question here..."
            value={manualQuestion}
            onChange={(e) => setManualQuestion(e.target.value)}
            className="flex-grow resize-none border-none bg-transparent outline-none focus:ring-0 text-base sm:text-lg h-10"
            rows={1}
          />
          <button onClick={handleAsk} className="bg-blue-600 text-white p-2 rounded-lg shadow-md hover:bg-blue-700 transition-all">
            <PaperAirplaneIcon className="w-6 h-6 text-white" />
          </button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Voice Input */}
        <VoiceInput setVoiceTranscript={setVoiceTranscript} />

        {/* Transcript Display */}
        <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md text-gray-700">
          <p className="text-sm sm:text-base whitespace-pre-wrap font-medium">
            {voiceTranscript || "Your voice input will appear here..."}
          </p>
        </div>

        {/* AI Response Display */}
        <ResponseDisplay answer={answer} isLoading={isLoading} />
      </main>
    </div>
  );
}
