const express = require('express');
const cors = require('cors');
const path = require('path');
const initDatabase = require('./database/init');
const DbService = require('./services/db.service');
const BookingService = require('./services/bookingService');
const sqlite3 = require('sqlite3').verbose();

const app = express();

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
});

// CORS configuration
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST'],
    credentials: true
}));

// Middleware
app.use(express.json());

// Database connection
const db = new sqlite3.Database(path.join(__dirname, 'database/database.sqlite'), (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Basic test route
app.get('/test', (req, res) => {
    res.json({ message: 'Basic test endpoint working!' });
});

// API test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

// Serve images from the Assets folder
app.use('/assets', (req, res, next) => {
    req.url = decodeURIComponent(req.url);
    next();
}, express.static(path.join(__dirname, 'Components/Assets')));

// Initialize database
initDatabase().then(() => {
    console.log('Database initialized successfully');
}).catch(err => {
    console.error('Database initialization failed:', err);
});

// Routes
app.get('/api/vehicles/:type', async (req, res) => {
    try {
        const vehicles = await DbService.getAllVehicles(req.params.type);
        res.json(vehicles);
    } catch (error) {
        console.error('Vehicle fetch error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/bookings', async (req, res) => {
    console.log('Received booking request:', req.body);
    try {
        const result = await BookingService.createBooking(req.body);
        res.json({ 
            success: true, 
            bookingId: result.id,
            message: 'Booking created successfully'
        });
    } catch (error) {
        console.error('Booking error:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

app.get('/api/bookings', async (req, res) => {
    try {
        const bookings = await BookingService.getAllBookings();
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get all cars
app.get('/api/cars', (req, res) => {
    db.all('SELECT * FROM cars', [], (err, rows) => {
        if (err) {
            console.error('Error fetching cars:', err);
            res.status(500).json({ error: 'Error fetching cars' });
            return;
        }
        res.json(rows);
    });
});

// Get all SUVs
app.get('/api/suvs', (req, res) => {
    db.all('SELECT * FROM suvs', [], (err, rows) => {
        if (err) {
            console.error('Error fetching SUVs:', err);
            res.status(500).json({ error: 'Error fetching SUVs' });
            return;
        }
        res.json(rows);
    });
});

// Root path handler
app.get('/', (req, res) => {
    res.send('Car Dealership API is running');
});

const PORT = 3001;

// Start server with error handling
try {
    app.listen(PORT, () => {
        console.log('=================================');
        console.log(`Server running on port ${PORT}`);
        console.log(`Test the API at:`);
        console.log(`  http://localhost:${PORT}/test`);
        console.log(`  http://localhost:${PORT}/api/test`);
        console.log('=================================');
    }).on('error', (err) => {
        console.error('Failed to start server:', err);
        process.exit(1);
    });
} catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
}