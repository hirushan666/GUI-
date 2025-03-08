import React, { useState, useEffect } from 'react';
import './BookingForm.css';

const BookingForm = ({ vehicle, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        vehicleName: vehicle.name
    });

    const [status, setStatus] = useState({
        submitting: false,
        error: null,
        success: false
    });

    // Close modal on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ submitting: true, error: null, success: false });
        
        const apiUrl = 'http://localhost:3001/api/bookings';
        console.log('Form Data being sent:', formData);
        console.log('Attempting to connect to:', apiUrl);

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', [...response.headers.entries()]);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }

            const data = await response.json();
            console.log('Booking response:', data);
            
            if (data.success) {
                setStatus({ submitting: false, error: null, success: true });
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    vehicleName: vehicle.name
                });
                // Close modal after successful submission after 2 seconds
                setTimeout(onClose, 2000);
            } else {
                throw new Error(data.error || 'Booking failed');
            }
        } catch (error) {
            console.error('Detailed booking error:', {
                message: error.message,
                stack: error.stack,
                formData
            });
            setStatus({
                submitting: false,
                error: `Booking failed: ${error.message}`,
                success: false
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Close modal if clicking outside
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <form onSubmit={handleSubmit} className="booking-form" onClick={e => e.stopPropagation()}>
                <h2>Book Your {vehicle.name}</h2>
                
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="vehicleName">Vehicle:</label>
                    <input
                        type="text"
                        id="vehicleName"
                        name="vehicleName"
                        value={formData.vehicleName}
                        readOnly
                    />
                </div>

                <div className="button-group">
                    <button 
                        type="button" 
                        onClick={onClose}
                        className="cancel-button"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        disabled={status.submitting}
                        className="submit-button"
                    >
                        {status.submitting ? 'Processing...' : 'Confirm Booking'}
                    </button>
                </div>

                {status.error && (
                    <div className="error-message">
                        Error: {status.error}
                    </div>
                )}

                {status.success && (
                    <div className="success-message">
                        Your booking has been confirmed! We will contact you shortly.
                    </div>
                )}
            </form>
        </div>
    );
};

export default BookingForm;