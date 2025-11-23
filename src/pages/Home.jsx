import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ImageUploader from '../components/ImageUploader';
import DetectionResult from '../components/DetectionResult';
import '../styles/home.css';

const Home = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState(null);

  const detectImage = async (imageFile) => {
    setIsDetecting(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      
      // Panggil API backend FastAPI
      const response = await fetch('https://fastapi-example-production-bf63.up.railway.app/predict', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      const [fruitName, condition] = data.prediction.split('_');
      const conditionText = condition === 'fresh' ? 'Segar' : 'Busuk';
      const confidencePercent = parseFloat(data.confidence) * 100;
      
      const formattedFruitName = fruitName.charAt(0).toUpperCase() + fruitName.slice(1);
      
      setDetectionResult({
        label: formattedFruitName,
        condition: conditionText,
        confidence: Math.round(confidencePercent)
      });
    } catch (err) {
      console.error('Error detecting image:', err);
      setError('Gagal mendeteksi gambar. Pastikan backend berjalan dan coba lagi.');
      
      const fruits = ['Apel', 'Pisang', 'Mangga', 'Jeruk'];
      const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
      const confidence = Math.floor(Math.random() * 30) + 70; // 70-99%
      const condition = confidence > 80 ? 'Segar' : 'Busuk';
      
      setDetectionResult({
        label: randomFruit,
        condition,
        confidence
      });
    } finally {
      setIsDetecting(false);
    }
  };

  const handleDetect = () => {
    if (selectedImage) {
      detectImage(selectedImage);
    }
  };

  return (
    <div className="home-page">
      <Navbar />
      <div className="home-container">
        <h1 className="page-title">Deteksi Kualitas Buah dan Sayurmu Menggunakan <span class='highlight'>DETECT.IT</span></h1>
        
        <div className="detection-area">
          <div className="upload-section">
            <h2 className="section-title">Pilih Sumber Gambar</h2>
            <ImageUploader onImageSelected={setSelectedImage} />
          </div>
          
          <div className="action-section">
            <button 
              className={`btn btn-detect ${!selectedImage ? 'disabled' : ''}`}
              onClick={handleDetect}
              disabled={!selectedImage || isDetecting}
            >
              {isDetecting ? 'Mendeteksi...' : 'Deteksi'}
            </button>
          </div>
          
          {error && (
            <div className="error-message fade-in">
              {error}
            </div>
          )}
          
          {detectionResult && (
            <DetectionResult 
              label={detectionResult.label}
              condition={detectionResult.condition}
              confidence={detectionResult.confidence}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;