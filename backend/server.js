const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'refoodvn',
    connectionLimit: 5 // Tối ưu số lượng kết nối
});

// Hàm query sử dụng pool
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

// Test kết nối
query('SELECT 1')
    .then(res => {
        console.log('Kết nối MariaDB thành công:', res);
        process.exit(0);
    })
    .catch(err => {
        console.error('Kết nối MariaDB thất bại:', err);
        process.exit(1);
    });

module.exports = { query };