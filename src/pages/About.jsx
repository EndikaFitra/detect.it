import React from 'react';
import Navbar from '../components/Navbar';
import dev1 from '../assets/people_1.jpeg';
import dev2 from '../assets/people_2.jpeg';
import dev3 from '../assets/people_3.jpeg';
import dev4 from '../assets/people_4.jpeg';
import dev5 from '../assets/people_5.jpeg';
import '../styles/about.css';

const About = () => {
  const teamMembers = [
    {
      name: 'Nuril Amada',
      role: 'Frontend Developer',
      image: dev1
    },
    {
      name: 'Aurelia Hapsari Dyah R.',
      role: 'Frontend Developer',
      image: dev2
    },
    {
      name: 'Aulia Nurzahra Anantiyo',
      role: 'UI/UX Designer',
      image: dev3
    },
    {
      name: 'Endika Fitra Ramadani',
      role: 'Backend Developer & Model Trainer',
      image: dev4
    },
    {
      name: 'Elza Hiya Nadhifah',
      role: 'Backend Developer',
      image: dev5
    }
  ];

  return (
    <div className="about-page">
      <Navbar />
      <div className="container about-container">
        <div className="about-content">
          <h1 className="page-title">Tentang DETECT.IT</h1>
          
          <div className="about-description">
            <h2>Apa Itu DETECT.IT?</h2>
            <p>
              DETECT.IT adalah aplikasi berbasis web yang menggunakan teknologi deep learning untuk 
              mendeteksi kualitas buah dan sayuran. Aplikasi ini dirancang untuk membantu pengguna 
              menentukan apakah buah atau sayuran yang mereka miliki masih segar atau sudah tidak layak konsumsi.
            </p>
            
            <h2>Bagaimana Cara Kerjanya?</h2>
            <p>
              DETECT.IT menggunakan model Convolutional Neural Network (CNN) yang telah dilatih dengan ribuan 
              gambar buah dan sayuran dalam berbagai kondisi. Ketika pengguna mengunggah gambar, model kami 
              akan menganalisis gambar tersebut dan memberikan prediksi tentang jenis buah/sayuran serta 
              kondisinya (segar atau busuk) beserta tingkat kepercayaan dari prediksi tersebut.
            </p>
          </div>
          
          <div className="team-section">
            <h2 className="section-title">Tim Pengembang</h2>
            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <div key={index} className="team-card">
                  <div className="member-image-container">
                    <img src={member.image} alt={member.name} className="member-image" />
                  </div>
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;