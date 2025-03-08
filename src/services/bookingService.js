const dbAsync = require('../config/db.config');

const BookingService = {
    createBooking: async (bookingData) => {
        try {
            console.log('BookingService received data:', bookingData);

            // Validate required fields
            if (!bookingData.name || !bookingData.vehicleName) {
                throw new Error('Missing required fields: name and vehicleName');
            }

            const sql = `
                INSERT INTO bookings (
                    customer_name,
                    email,
                    phone,
                    vehicle_name,
                    booking_date
                ) VALUES (?, ?, ?, ?, datetime('now'))
            `;

            const params = [
                bookingData.name,
                bookingData.email || '',
                bookingData.phone || '',
                bookingData.vehicleName
            ];

            console.log('Executing SQL:', sql);
            console.log('With parameters:', params);

            const result = await dbAsync.run(sql, params);
            console.log('Database insert result:', result);

            return { 
                id: result.id,
                success: true,
                message: 'Booking created successfully'
            };
        } catch (error) {
            console.error('BookingService error:', {
                error: error.message,
                stack: error.stack,
                data: bookingData
            });
            throw new Error(`Booking creation failed: ${error.message}`);
        }
    },

    getAllBookings: async () => {
        try {
            console.log('Fetching all bookings...');
            const rows = await dbAsync.all('SELECT * FROM bookings ORDER BY booking_date DESC');
            console.log('Fetched bookings:', rows);
            return rows;
        } catch (error) {
            console.error('Error in getAllBookings:', error);
            throw new Error('Failed to fetch bookings: ' + error.message);
        }
    }
};

module.exports = BookingService;