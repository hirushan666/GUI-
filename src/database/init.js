const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'database.sqlite');

function initDatabase() {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('Error connecting to database:', err);
                reject(err);
                return;
            }
            console.log('Connected to SQLite database at:', dbPath);
        });

        // Create bookings table if it doesn't exist
        const createBookingsTable = `
            CREATE TABLE IF NOT EXISTS bookings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                customer_name TEXT NOT NULL,
                email TEXT,
                phone TEXT,
                vehicle_name TEXT NOT NULL,
                booking_date DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `;

        db.run(createBookingsTable, (err) => {
            if (err) {
                console.error('Error creating bookings table:', err);
                reject(err);
                return;
            }
            console.log('Bookings table initialized successfully');
            resolve();
        });
    });
}

module.exports = initDatabase; 