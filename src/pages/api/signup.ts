import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

// Load environment variables
dotenv.config();

// Create a PostgreSQL connection pool
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, password, board } = req.body;

    // Validate input fields
    if (!name || !email || !password || !board) {
      console.log('Validation failed: Missing fields');
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      // Check if the user already exists
      console.log('Checking if user exists...');
      const checkUserQuery = 'SELECT * FROM users WHERE email = $1';
      const checkUserResult = await pool.query(checkUserQuery, [email]);
      console.log('User check result:', checkUserResult.rows);

      if (checkUserResult.rows.length > 0) {
        console.log('User already exists');
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password
      console.log('Hashing password...');
      const hashedPassword = await bcrypt.hash(password, 12); // Increased salt rounds for better security

      // Insert the new user into the database
      console.log('Inserting new user...');
      const insertQuery =
        'INSERT INTO users (name, email, password, board) VALUES ($1, $2, $3, $4) RETURNING id, created_at';
      const values = [name, email, hashedPassword, board];
      const insertResult = await pool.query(insertQuery, values);
      console.log('Insert result:', insertResult.rows[0]);

      // Respond with success
      console.log('User registered successfully');
      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: insertResult.rows[0].id,
          name,
          email,
          board,
          created_at: insertResult.rows[0].created_at,
        },
      });
    } catch (error: any) {
      console.error('Error during signup:', error);

      // Handle specific database errors
      if (error.code === '23505') {
        // Unique constraint violation (e.g., duplicate email)
        return res.status(400).json({ message: 'Email already in use' });
      }

      // Log and return a generic error message
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error details:', errorMessage); // Log the error message internally
      res.status(500).json({ message: 'Internal server error', error: errorMessage });
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
