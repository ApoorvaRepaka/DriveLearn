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

      // No need to push to local history. History will refresh from DB
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Axios error:', err.response?.data || err.message);
        setError(err.response?.data?.error || 'An error occurred. Please try again.');
      } else {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred. Please try again.');
      }
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
      // Fetch history only when opening
      try {
        const res = await axios.post('/api/history', { userId });
        setHistory(res.data.history); // assuming backend sends { history: [...] }
      } catch (err) {
        console.error('Error fetching history:', err);
        alert('Failed to load history.');
      }
    }

    setShowHistory((prev) => !prev);
  };

  return (
    <main className="relative max-w-3xl mx-auto p-4 space-y-4">
      {/* History button top-left */}
      <button
        onClick={toggleHistory}
        className="absolute top-4 left-4 bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
      >
        {showHistory ? 'Hide History' : 'Show History'}
      </button>

      {/* Logout button top-right */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
      >
        Logout
      </button>

      <h1 className="text-3xl font-bold text-center">📘 AI Tutor</h1>

      {/* History Panel */}
      {showHistory && (
        <div className="bg-gray-100 p-4 rounded shadow mt-4">
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

      {/* Input Area */}
      <textarea
        placeholder="Ask your question here..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full p-2 border rounded"
        rows={4}
      />
      {error && <p className="text-red-500">{error}</p>}

      <VoiceInput setQuestion={setQuestion} />

      <button
        onClick={handleAsk}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        disabled={isLoading}
      >
        {isLoading ? 'Generating...' : 'Ask Question'}
      </button>

      <ResponseDisplay answer={answer} isLoading={isLoading} />
    </main>
  );
}
