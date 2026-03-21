// backend/server.js hoặc routes/products.js
app.get('/api/products', async (req, res) => {
    try {
        const products = await query('SELECT * FROM products WHERE is_available=1');
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
