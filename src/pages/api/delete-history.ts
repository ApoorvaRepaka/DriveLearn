import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Ensure we reuse the existing PostgreSQL pool
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
    ssl: { rejectUnauthorized: false },
  });
}
pool = global.pgPool;

// Define request body interface
interface DeleteHistoryRequestBody {
  userId: string;
  items: string[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: `Method ${req.method} Not Allowed` });
  }

  const { userId, items } = req.body as DeleteHistoryRequestBody;
  
  if (!userId || !items || items.length === 0) {
    return res.status(400).json({ success: false, error: 'Invalid request payload' });
  }

  try {
    console.log(`Deleting history items for user: ${userId}`, items);
    const query = `DELETE FROM history WHERE user_id = $1 AND question = ANY($2)`;
    await pool.query(query, [userId, items]);

    return res.status(200).json({ success: true, message: 'Selected history deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting history:', error);
    return res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
  }
}