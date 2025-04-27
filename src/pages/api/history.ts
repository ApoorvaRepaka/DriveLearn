import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Create or reuse a PostgreSQL pool
let pool: Pool;
declare global {
  var pgPool: Pool | undefined;
}

if (!global.pgPool) {
  global.pgPool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: parseInt(process.env.PG_PORT || '5432'),
    ssl: {
      rejectUnauthorized: false, // if needed for production
    },
  });
}
pool = global.pgPool;

// Define a TypeScript interface for the request body
interface HistoryRequestBody {
  userId: string;
}

// Define TypeScript interface for the response
interface HistoryResponse {
  success: boolean;
  data?: {
    history: string[];
  };
  error?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<HistoryResponse>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: `Method ${req.method} Not Allowed` });
  }

  const { userId } = req.body as HistoryRequestBody;
  console.log('Received request body:', req.body); // Debugging log

  if (!userId) {
    return res.status(400).json({ success: false, error: 'User ID is required' });
  }

  try {
    console.log(`Fetching history for userId: ${userId}`); // Debugging log
    const query = 'SELECT question FROM history WHERE user_id = $1 ORDER BY created_at DESC';
    const { rows } = await pool.query(query, [userId]);

    // Check if history is empty
    if (rows.length === 0) {
      console.log('No history found for userId:', userId); // Debugging log
      return res.status(200).json({ success: true, data: { history: [] } });
    }

    const history = rows.map((row) => row.question);

    return res.status(200).json({ success: true, data: { history } });
  } catch (error: any) {
    console.error('Error fetching history:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return res.status(500).json({ success: false, error: errorMessage });
  }
}
