import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import '../styles/navbar.css';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="branding">
          <Logo className="logo-navbar"/>
          <div className="brand-text">
            <h1 className="brand-title">DETECT.IT</h1>
            <p className="brand-subtitle">Smart Detection for Fruits and Vegetables</p>
          </div>
        </div>
        
        <div className="nav-links">
          <Link to="/home" className={`nav-link ${location.pathname === '/home' ? 'active' : ''}`}>
            Beranda
          </Link>
          <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
            Tentang
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;