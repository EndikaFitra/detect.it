import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import '../styles/landing.css';

const Landing = () => {
  const [phase2, setPhase2] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase2(true); 
    }, 3300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`landing-page ${phase2 ? "phase2" : ""}`}>
      <div className={`circle circle-top-right-1 ${phase2 ? "circle-merge" : ""}`}></div>
      <div className={`circle circle-top-right-2 ${phase2 ? "circle-merge" : ""}`}></div>
      <div className={`circle-bottom-left ${phase2 ? "circle-bottom-left-move" : ""}`}></div>
      <div className="container">
        <div className={`landing-left ${phase2 ? "left-final" : "left-center"}`}>
          <div className="logo-container">
            <Logo />
          </div>
          <h1 className="landing-title">DETECT.IT</h1>
          <h2 className="landing-subtitle">
            Smart Detection for Fruits and Vegetables
          </h2>
        </div>
        <div className={`landing-right ${phase2 ? "right-in" : ""}`}>
          <div className="landing-description">
            <p>
              DETECT.IT adalah aplikasi berbasis web yang menggunakan teknologi deep learning 
              untuk mendeteksi kualitas buah dan sayuran Anda. Dengan model Convolutional Neural Network (CNN), 
              aplikasi kami dapat menganalisis kesegaran buah dan sayur.
            </p>
            <p>
              Cukup unggah foto atau ambil gambar langsung, dan hasil muncul dalam hitungan detik.
            </p>
          </div>
          <Link to="/home" className="btn-primary landing-btn">
            Mulai
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Landing;