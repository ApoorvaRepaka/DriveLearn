'use client';

import { useEffect, useState } from 'react';
import VoiceInput from '@/components/dashb/VoiceInput';
import ResponseDisplay from '@/components/dashb/ResponseDisplay';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

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

    if (!question.trim()) {
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
      const res = await axios.post('/api/ask', { question, userId });

      setAnswer(res.data.answer);
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    router.replace('/');
  };

  const toggleHistory = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User not logged in.');
      router.push('/login');
      return;
    }

    if (!showHistory) {
      try {
        const res = await axios.post('/api/history', { userId });
        console.log('Full API Response:', res.data); // Debugging log

        if (res.data.success && Array.isArray(res.data.data?.history)) {
          console.log('History:', res.data.data.history);
          setHistory(res.data.data.history);
        } else {
          console.log('No history found.');
          setHistory([]);
        }
      } catch (err) {
        console.error('Error fetching history:', err);
        alert('Failed to load history.');
      }
    }

    setShowHistory((prev) => !prev);
};


  return (
    <div className="min-h-screen flex flex-col items-center px-8 sm:px-12 md:px-20 lg:px-32 xl:px-40 bg-gradient-to-b from-[#f9f6e7] to-white w-full">
      <main className="relative max-w-5xl w-full bg-white shadow-lg p-8 rounded-lg mt-12 sm:mt-16 space-y-6">

        {/* Top Buttons - Logout & History */}
        <div className="flex justify-between">
          <button
            onClick={toggleHistory}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-all shadow-md"
          >
            {showHistory ? 'Hide History' : 'Show History'}
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-all shadow-md"
          >
            Logout
          </button>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-center">📘 AI Tutor</h1>

        {/* History Panel */}
        {showHistory && (
          <div className="bg-gray-100 p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-3">📜 Previous Questions</h2>
            {Array.isArray(history) && history.length > 0 ? (
              <ul className="list-disc list-inside space-y-2">
                {history.map((q, index) => (
                  <li key={index} className="text-gray-700">{q}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No previous questions yet.</p>
            )}
          </div>
        )}

        {/* Input Area */}
        <textarea
          placeholder="Ask your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-4 border rounded-md focus:ring focus:ring-blue-300 text-base sm:text-lg"
          rows={4}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <VoiceInput setQuestion={setQuestion} />

        <div className="flex justify-center">
          <button
            onClick={handleAsk}
            className="w-3/4 bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Ask Question'}
          </button>
        </div>



        <ResponseDisplay answer={answer} isLoading={isLoading} />
      </main>
    </div>
  );
}
