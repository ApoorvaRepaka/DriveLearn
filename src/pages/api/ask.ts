import type { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: parseInt(process.env.PG_PORT || '5432'),
  ssl: {
    rejectUnauthorized: false, // Allows self-signed certificates
  },
});

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const referer = process.env.REFERER_URL || 'http://localhost:3000';

// Function to fetch AI response using only Gemini API
async function fetchAIResponse(prompt: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    return 'Error: Gemini API key is missing.';
  }

  try {
    console.log(`Trying Gemini API key...`);
    const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      }),
    });

    if (geminiRes.ok) {
      const data = await geminiRes.json();
      console.log('Gemini API response:', data);
      return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No answer received from Gemini.';
    } else {
      console.warn(`Gemini API failed:`, await geminiRes.text());
    }
  } catch (err) {
    console.error('Error using Gemini API:', err);
  }

  return 'Error: Gemini API failed.';
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question, userId } = req.body;
  if (!question || !question.trim()) return res.status(400).json({ error: 'Question cannot be empty' });
  if (!userId) return res.status(400).json({ error: 'User ID is required' });

  console.log('Fetching user info for userId:', userId);
  try {
    const userResult = await pool.query('SELECT id, board FROM users WHERE id = $1', [userId]);
    if (userResult.rows.length === 0) return res.status(404).json({ error: 'User not found' });

    const user = userResult.rows[0];
    const prompt = `You are a tutor for the ${user.board} board. Provide a simple and clear explanation for the following question without using extra formatting like bold (**), hashtags (#), or special characters: ${question}`;

    const answer = await fetchAIResponse(prompt);

    await pool.query(
      'INSERT INTO history (user_id, question, answer) VALUES ($1, $2, $3)',
      [userId, question, answer]
    );

    return res.status(200).json({ answer });

  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ error: 'Internal server error', details: err instanceof Error ? err.message : err });
  }
}
