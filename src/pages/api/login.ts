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
  port: parseInt(process.env.PG_PORT || '5433'), // PostgreSQL port
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Validate input
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      // Fetch the user by email
      const query = 'SELECT * FROM users WHERE email = $1';
      const values = [email];
      const result = await pool.query(query, values);

      if (result.rows.length > 0) {
        const user = result.rows[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
          console.log('Login successful for user:', user.id); // Debugging log
          res.status(200).json({ 
            message: 'Login successful', 
            userId: user.id, 
            email: user.email, 
            name: user.name 
          });
        } else {
          console.warn('Invalid password attempt for email:', email); // Debugging log
          res.status(401).json({ message: 'Invalid email or password' });
        }
      } else {
        console.warn('Invalid email attempt:', email); // Debugging log
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Database error:', error); // Debugging log
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}