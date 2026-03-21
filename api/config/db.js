import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = process.env.DATABASE_URL
    ? process.env.DATABASE_URL
    : {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT || '3306'),
        ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: true } : undefined,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    };

if (!process.env.DATABASE_URL && (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME)) {
    console.warn('Database environment variables (or DATABASE_URL) are missing. Please check your .env file or Vercel settings.');
}

export const pool = mysql.createPool(dbConfig);
