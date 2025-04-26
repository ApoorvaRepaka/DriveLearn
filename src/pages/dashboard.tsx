'use client';

import { useEffect, useState } from 'react';
import VoiceInput from '@/components/dashb/VoiceInput';
import ResponseDisplay from '@/components/dashb/ResponseDisplay';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [board, setBoard] = useState('CBSE');
  const [answer, setAnswer] = useState('');
  const router = useRouter();

  const handleAsk = async () => {
    if (!question.trim()) {
      alert('Please ask a question!');
      return;
    }
  
    const userId = localStorage.getItem('userId'); // ✅ FETCHING userId
  
    if (!userId) {
      alert('User not found. Please login again.');
      router.push('/');
      return;
    }
  
    try {
      const res = await axios.post('/api/ask', {
        question,
        userId,
      });
  
      if (res.status === 200) {
        setAnswer(res.data.answer);
      } else {
        alert('Something went wrong with the AI response!');
      }
    } catch (err) {
      console.error('Error in asking question:', err);
      alert('Error in asking question');
    }
  };
  
  

  const handleLogout = () => {
    // Clear localStorage (or cookies/session depending on your setup)
    localStorage.removeItem('token');
    router.push('/'); // or window.location.href = '/SalonLogin';
  };

  return (
    <main className="relative max-w-3xl mx-auto p-4 space-y-4">
      {/* Logout button at top-right */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
      >
        Logout
      </button>

      <h1 className="text-3xl font-bold text-center">📘 AI Tutor</h1>

      <textarea
        placeholder="Ask your question here..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full p-2 border rounded"
        rows={4}
      />

      <VoiceInput setQuestion={setQuestion} />

      <button
        onClick={handleAsk}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Ask Question
      </button>

      <ResponseDisplay answer={answer} />
    </main>
  );
}
