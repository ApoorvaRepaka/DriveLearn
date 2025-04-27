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
});

if (!process.env.DEEPSEEK_API_KEY) {
  throw new Error('DEEPSEEK_API_KEY is not defined in the environment variables');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question, userId } = req.body;

  if (!question || !question.trim()) {
    console.error('Invalid question input'); // Debugging log
    return res.status(400).json({ error: 'Question cannot be empty' });
  }

  if (!userId) {
    console.error('Missing userId'); // Debugging log
    return res.status(400).json({ error: 'User ID is required' });
  }

  console.log('Fetching user info for userId:', userId); // Debugging log

  try {
    const userResult = await pool.query('SELECT id, board FROM users WHERE id = $1', [userId]);
    console.log('Database query result:', userResult.rows); // Debugging log

    if (userResult.rows.length === 0) {
      console.error('No user found for userId:', userId); // Debugging log
      return res.status(404).json({ error: 'User not found' });
    }

    const user = userResult.rows[0];
    const prompt = `You are a tutor for the ${user.board} board. Provide a simple and clear explanation for the following question without using extra formatting like bold (**), hashtags (#), or special characters: ${question}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

    try {
      const openRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          "HTTP-Referer": "http://localhost:3000", // Replace with your site URL
          "X-Title": "DriveLearn", // Replace with your site title
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat-v3-0324", // Updated model
          messages: [{ role: "user", content: prompt }],
        }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!openRes.ok) {
        const errorText = await openRes.text();
        console.error('OpenRouter API error:', errorText); // Debugging log
        return res.status(openRes.status).json({ error: `OpenRouter API error: ${errorText}` });
      }

      const data = await openRes.json();
      console.log('OpenRouter API response:', data); // Debugging log
      const answer = data.choices?.[0]?.message?.content || 'No answer received.';

      await pool.query(
        'INSERT INTO history (user_id, question, answer) VALUES ($1, $2, $3)',
        [userId, question, answer]
      );
      console.log('Question and answer saved to history:', { userId, question, answer }); // Debugging log

      return res.status(200).json({ answer });
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        console.error('OpenRouter API request timed out'); // Debugging log
        return res.status(504).json({ error: 'OpenRouter API request timed out' });
      }

      console.error('Error calling OpenRouter API:', err); // Debugging log
      return res.status(500).json({ error: 'Internal server error', details: err instanceof Error ? err.message : err });
    }
  } catch (err) {
    console.error('Error in /api/ask:', err); // Debugging log
    return res.status(500).json({ error: 'Internal server error', details: err instanceof Error ? err.message : err });
  }
}
