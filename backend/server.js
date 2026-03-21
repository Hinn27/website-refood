// ket noi voi mariadb
const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'refoodvn',
    connectionLimit: 5
});

// query su dung pool
async function query(sql, params) {
    let conn;
    try {
        conn = await pool.getConnection();
        const res = await conn.query(sql, params);
        return res;
    } finally {
        if (conn) conn.release();
    }
}

// test ket noi
query('SELECT 1')
    .then(res => {
        console.log('Kết nối MariaDB thành công:', res);
        process.exit(0);
    })
    .catch(err => {
        console.error('Kết nối MariaDB thất bại:', err);
        process.exit(1);
    });

// hien thi mon an
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// API lay danh sach mon + ten danh muc
app.get('/api/products', async (req, res) => {
    try {
        const sql = `
            SELECT p.id, p.name, p.slug, p.desc, p.full_desc, p.price, p.discount_price, p.origin, p.rating, p.review_count,
                   p.image_url, p.is_available, p.created_at, p.updated_at,
                   c.name AS category
            FROM products p
            JOIN categories c ON p.category_id = c.id
            WHERE p.is_available = 1
            ORDER BY p.id ASC
        `;
        const products = await query(sql);
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Backend API server running at http://localhost:${PORT}`);
});

module.exports = { query };