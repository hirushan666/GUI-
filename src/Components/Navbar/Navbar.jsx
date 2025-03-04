import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/logo.jpg';

export const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="nav-logo">
        <img className="logo-img" src={logo} alt="Logo" />
        <p className="logo-text">CAR DEALS</p>
      </div>
      <ul className="nav-menu">
        <li>
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/cars"
            className={`nav-link ${location.pathname === '/cars' ? 'active' : ''}`}
          >
            Cars
          </Link>
        </li>
        <li>
          <Link
            to="/suvs"
            className={`nav-link ${location.pathname === '/suvs' ? 'active' : ''}`}
          >
            SUVs
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
          >
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
};
