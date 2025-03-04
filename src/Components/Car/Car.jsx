import React from 'react';
import './Car.css';

const Car = ({ car }) => {
    const handleBooking = (carId) => {
        // Add booking logic here
        console.log('Booking car:', carId);
        // You can add API call or navigation to booking form
    };

    const handleTestRide = (carId) => {
        // Add test ride logic here
        console.log('Test ride requested for:', carId);
        // You can add API call or navigation to test ride form
    };

    return (
        <div className="car-card">
            <div className="car-image">
                <img src={car.imageUrl} alt={car.name} />
                <span className={`availability-badge ${car.available ? 'available' : 'unavailable'}`}>
                    {car.available ? 'Available' : 'Unavailable'}
                </span>
            </div>
            <div className="car-details">
                <h3>{car.name}</h3>
                <p className="car-price">₹{car.price.toLocaleString()}</p>
                <div className="car-specs">
                    <span>{car.year}</span>
                    <span>{car.transmission}</span>
                    <span>{car.fuelType}</span>
                </div>
                <div className="car-actions">
                    <button 
                        className={`book-car ${!car.available && 'disabled'}`}
                        onClick={() => handleBooking(car.id)}
                        disabled={!car.available}
                    >
                        Book Now
                    </button>
                    <button 
                        className="test-ride"
                        onClick={() => handleTestRide(car.id)}
                    >
                        Test Ride
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Car; 