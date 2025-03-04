const express = require('express');
const cors = require('cors');
const initDatabase = require('./database/init');
const DbService = require('./services/db.service');

const app = express();

app.use(cors());
app.use(express.json());

// Initialize database
initDatabase();

// Routes
app.get('/api/vehicles/:type', async (req, res) => {
    try {
        const vehicles = await DbService.getAllVehicles(req.params.type);
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/news', async (req, res) => {
    try {
        const news = await DbService.getAllNews();
        res.json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/inquiries', async (req, res) => {
    try {
        const result = await DbService.createInquiry(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 