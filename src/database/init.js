const db = require('../config/db.config');

const initDatabase = async () => {
    try {
        // Create cars table
        await db.run(`
            CREATE TABLE IF NOT EXISTS cars (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                price INTEGER NOT NULL,
                year INTEGER NOT NULL,
                transmission TEXT NOT NULL,
                fuel_type TEXT NOT NULL,
                available BOOLEAN DEFAULT 1,
                down_payment INTEGER NOT NULL,
                image_url TEXT NOT NULL,
                vehicle_type TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Create car_specs table
        await db.run(`
            CREATE TABLE IF NOT EXISTS car_specs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                car_id INTEGER NOT NULL,
                engine TEXT NOT NULL,
                power TEXT NOT NULL,
                acceleration TEXT NOT NULL,
                FOREIGN KEY (car_id) REFERENCES cars(id)
            )
        `);

        // Create inquiries table
        await db.run(`
            CREATE TABLE IF NOT EXISTS inquiries (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT NOT NULL,
                message TEXT,
                car_id INTEGER,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (car_id) REFERENCES cars(id)
            )
        `);

        // Create news table
        await db.run(`
            CREATE TABLE IF NOT EXISTS news (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                date DATE NOT NULL,
                image TEXT NOT NULL,
                summary TEXT NOT NULL,
                category TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Database initialization error:', error);
    }
};

module.exports = initDatabase; 