import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const pool = new Pool({
  user: process.env.PG_USER, // PostgreSQL username
  host: process.env.PG_HOST, // Database host
  database: process.env.PG_DATABASE, // Database name
  password: process.env.PG_PASSWORD, // PostgreSQL password
  port: parseInt(process.env.PG_PORT || '5432'),
  ssl: {
    rejectUnauthorized: false, // Allows self-signed certificates
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      // Fetch the user by email
      const query = 'SELECT * FROM users WHERE email = $1';
      const values = [email];
      const result = await pool.query(query, values);

      if (result.rows.length > 0) {
        const user = result.rows[0];

        // Check password validity
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
          console.log('Login successful for user:', user.id); // Debugging log
          return res.status(200).json({ 
            message: 'Login successful', 
            userId: user.id, 
            email: user.email, 
            name: user.name 
          });
        } else {
          console.warn('Invalid password attempt for email:', email); // Debugging log
          return res.status(401).json({ message: 'Invalid email or password' });
        }
      } else {
        console.warn('Invalid email attempt:', email); // Debugging log
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error: any) {
      console.error('Error during login:', error);

      // Sanitize error message to prevent information leakage
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      // Return a generic error message without exposing details
      return res.status(500).json({ message: 'Internal server error', error: errorMessage });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
