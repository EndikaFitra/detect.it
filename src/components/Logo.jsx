import React from 'react';
import logo from '../assets/logo.png';
import '../styles/navbar.css';

const Logo = () => {
  return (
    <div className="logo-container">
      <img src={logo} alt="DETECT.IT Logo" className="logo" />
    </div>
  );
};

export default Logo;