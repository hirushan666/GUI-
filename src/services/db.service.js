const db = require('../config/db.config');

class DbService {
    // Cars
    static async getAllVehicles(type) {
        try {
            const vehicles = await db.all(
                `SELECT c.*, cs.engine, cs.power, cs.acceleration 
                 FROM cars c 
                 LEFT JOIN car_specs cs ON c.id = cs.car_id 
                 WHERE c.vehicle_type = ?`,
                [type]
            );
            return vehicles;
        } catch (error) {
            throw new Error(`Error fetching vehicles: ${error.message}`);
        }
    }

    static async getVehicleById(id) {
        try {
            const vehicle = await db.get(
                `SELECT c.*, cs.engine, cs.power, cs.acceleration 
                 FROM cars c 
                 LEFT JOIN car_specs cs ON c.id = cs.car_id 
                 WHERE c.id = ?`,
                [id]
            );
            return vehicle;
        } catch (error) {
            throw new Error(`Error fetching vehicle: ${error.message}`);
        }
    }

    // News
    static async getAllNews() {
        try {
            const news = await db.all(
                'SELECT * FROM news ORDER BY date DESC LIMIT 10'
            );
            return news;
        } catch (error) {
            throw new Error(`Error fetching news: ${error.message}`);
        }
    }

    // Inquiries
    static async createInquiry(inquiry) {
        try {
            const result = await db.run(
                `INSERT INTO inquiries (name, email, phone, message, car_id) 
                 VALUES (?, ?, ?, ?, ?)`,
                [inquiry.name, inquiry.email, inquiry.phone, inquiry.message, inquiry.carId]
            );
            return result;
        } catch (error) {
            throw new Error(`Error creating inquiry: ${error.message}`);
        }
    }
}

module.exports = DbService; 