import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    return (
        <div className="hero-container">
            <div className="hero-overlay"></div>
            <div className="hero-intro">
                <h1>Welcome to <span className="highlight">CAR DEALS</span></h1>
                <p className="hero-subtitle">Your journey to the perfect ride starts here</p>
                <p className="hero-description">Discover an exclusive collection of premium vehicles tailored to your lifestyle</p>
            </div>

            <div className="hero-options">
                <Link to="/cars" className="option-card">
                    <div className="option-content">
                        <h2>Luxury Cars</h2>
                        <p>Experience elegance in every drive</p>
                        <span className="explore-btn">Explore →</span>
                    </div>
                </Link>
                <Link to="/suvs" className="option-card">
                    <div className="option-content">
                        <h2>Premium SUVs</h2>
                        <p>Conquer every road with confidence</p>
                        <span className="explore-btn">Explore →</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Hero;
