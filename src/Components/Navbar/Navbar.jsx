import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/logo.jpg';

export const Navbar = ({ setMenu, menu }) => {
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img className="logo-img" src={logo} alt="Logo" />
        <p>CAR DEAL</p>
      </div>
      <ul className="nav-menu">
        <li onClick={() => setMenu('home')}>
          <Link to="/">Home</Link>
          {menu === 'home' ? <hr /> : null}
        </li>
        <li onClick={() => setMenu('cars')}>
          <Link to="/cars">Cars</Link>
          {menu === 'cars' ? <hr /> : null}
        </li>
        <li onClick={() => setMenu('suvs')}>
          <Link to="/suvs">SUVs</Link>
          {menu === 'suvs' ? <hr /> : null}
        </li>
        <li onClick={() => setMenu('contact')}>
          <Link to="/contact">Contact</Link>
          {menu === 'contact' ? <hr /> : null}
        </li>
      </ul>
    </div>
  );
};
