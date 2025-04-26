import type { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: parseInt(process.env.PG_PORT || '5433'),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token || !question) {
    return res.status(400).json({ error: 'Missing token or question' });
  }

  try {
    // Get user info (with board)
    const userResult = await pool.query('SELECT id, board FROM users WHERE token = $1', [token]);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const user = userResult.rows[0];
    const prompt = `You are a tutor for the ${user.board} board. Answer the following: ${question}`;

    // OpenRouter API call
    const openRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": process.env.SITE_URL || "",
        "X-Title": process.env.SITE_NAME || "",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1-zero:free",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await openRes.json();
    const answer = data.choices?.[0]?.message?.content || 'No answer received.';

    // Save question & answer to history
    await pool.query(
      'INSERT INTO history (user_id, question, answer) VALUES ($1, $2, $3)',
      [user.id, question, answer]
    );

    return res.status(200).json({ answer });
  } catch (err) {
    console.error('Error in /api/ask:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
