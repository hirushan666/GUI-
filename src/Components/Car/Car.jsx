import React, { useState } from 'react';
import styled from 'styled-components';
import './Car.css';
import BookingForm from '../BookingForm/BookingForm';

const CarCard = styled.div`
    background-color: #1a1a1a;
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    max-width: 300px;
    margin: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const CarImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
`;

const CarInfo = styled.div`
    padding: 1.5rem;
`;

const CarName = styled.h3`
    color: #ffffff;
    margin-bottom: 1rem;
    font-size: 1.3rem;
`;

const CarPrice = styled.p`
    color: #4CAF50;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    font-weight: bold;
`;

const CarSpecs = styled.div`
    margin-bottom: 1rem;
    color: #e0e0e0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const CarSpecsDetailed = styled.div`
    margin-bottom: 1rem;
    color: #e0e0e0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Spec = styled.span`
    margin-right: 0.5rem;
    color: #e0e0e0;
    display: block;
    
    strong {
        color: #ffffff;
        margin-right: 0.5rem;
    }
`;

const BookButton = styled.button`
    background-color: ${props => props.disabled ? '#333' : '#4CAF50'};
    color: ${props => props.disabled ? '#666' : 'white'};
    border: none;
    border-radius: 5px;
    padding: 0.8rem 1.5rem;
    cursor: pointer;
    width: 100%;
    margin-top: 1rem;
    font-weight: bold;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${props => props.disabled ? '#333' : '#45a049'};
        transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'};
    }
`;

const Car = ({ car }) => {
    const [showBookingForm, setShowBookingForm] = useState(false);

    const handleBooking = (formData) => {
        console.log('Booking submitted:', formData);
        alert('Booking submitted successfully!');
        setShowBookingForm(false);
    };

    return (
        <>
            <CarCard>
                <CarImage src={car.imageUrl} alt={car.name} />
                <CarInfo>
                    <CarName>{car.name}</CarName>
                    <CarPrice>${car.price.toLocaleString()}</CarPrice>
                    <CarSpecs>
                        <Spec><strong>Year:</strong> {car.year}</Spec>
                        <Spec><strong>Transmission:</strong> {car.transmission}</Spec>
                        <Spec><strong>Fuel:</strong> {car.fuelType}</Spec>
                    </CarSpecs>
                    <CarSpecsDetailed>
                        <Spec><strong>Engine:</strong> {car.engine}</Spec>
                        <Spec><strong>Power:</strong> {car.power}</Spec>
                        <Spec><strong>Acceleration:</strong> {car.acceleration}</Spec>
                    </CarSpecsDetailed>
                    <BookButton 
                        onClick={() => setShowBookingForm(true)}
                        disabled={!car.available}
                    >
                        {car.available ? 'Book Now' : 'Sold Out'}
                    </BookButton>
                </CarInfo>
            </CarCard>

            {showBookingForm && (
                <BookingForm
                    vehicle={car}
                    onClose={() => setShowBookingForm(false)}
                    onSubmit={handleBooking}
                />
            )}
        </>
    );
};

export default Car; 