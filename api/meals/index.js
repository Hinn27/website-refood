import { pool } from '../config/db.js';
import cors from 'cors';

const corsMiddleware = cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  origin: '*', // Adjust for security in production
});

// Helper for CORS in Vercel
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  try {
    await runMiddleware(req, res, corsMiddleware);

    if (req.method === 'GET') {
      const [rows] = await pool.query('SELECT *, id as _id FROM meals');
      return res.status(200).json(rows);
    }

    if (req.method === 'POST') {
      const { name, price, image, desc, fullDesc, time, tag, rating, reviews, category, origin, calories } = req.body;
      const [result] = await pool.query(
        'INSERT INTO meals (name, price, image, `desc`, fullDesc, time, tag, rating, reviews, category, origin, calories) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [name, price, image, desc, fullDesc, time, tag, rating, reviews, category, origin, calories]
      );
      return res.status(201).json({ id: result.insertId, ...req.body });
    }

    if (req.method === 'PUT') {
      const { id, name, price, image, desc, fullDesc, time, tag, rating, reviews, category, origin, calories } = req.body;
      if (!id) return res.status(400).json({ error: 'Missing meal ID' });

      await pool.query(
        'UPDATE meals SET name=?, price=?, image=?, `desc`=?, fullDesc=?, time=?, tag=?, rating=?, reviews=?, category=?, origin=?, calories=? WHERE id=?',
        [name, price, image, desc, fullDesc, time, tag, rating, reviews, category, origin, calories, id]
      );
      return res.status(200).json({ message: 'Update successful', id });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: 'Missing meal ID' });

      await pool.query('DELETE FROM meals WHERE id=?', [id]);
      return res.status(200).json({ message: 'Delete successful', id });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
