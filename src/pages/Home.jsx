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
  const [openDropdown, setOpenDropdown] = useState({}); // State untuk mengontrol dropdown

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

  // Fungsi untuk toggle dropdown
  const toggleDropdown = (index) => {
    setOpenDropdown(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const recommendations = [
    {
      title: "Pupuk Melalui Kompos Alami",
      description: "Mengubah buah busuk menjadi pupuk organik yang kaya nutrisi untuk tanaman.",
      steps: [
        "Kumpulkan buah busuk dan sisa organik lainnya seperti daun, sayuran, dll.",
        "Potong-potong buah menjadi bagian yang lebih kecil untuk mempercepat proses pengomposan.",
        "Campurkan dengan bahan coklat (kering) seperti daun kering, ranting, atau serbuk gergaji dengan perbandingan 1:2.",
        "Letakkan dalam wadah kompos atau tumpukan di area yang teduh.",
        "Aduka campuran setiap minggu untuk memastikan distribusi udara yang baik.",
        "Tunggu 2-3 bulan hingga kompos matang (berwarna coklat gelap dan beraroma tanah)."
      ]
    },
    {
      title: "Eco-Enzyme",
      description: "Cairan fermentasi dari buah busuk yang dapat digunakan sebagai pupuk cair, pestisida alami, dan pembersih.",
      steps: [
        "Siapkan wadah plastik tertutup rapat.",
        "Campurkan bagian buah busuk (1 bagian), gula merah (1 bagian), dan air (10 bagian).",
        "Masukkan buah busuk yang sudah dipotong-potong ke dalam wadah.",
        "Tambahkan gula merah dan air, aduk hingga gula larut.",
        "Tutup wadah rapat namun jangan terlalu kencang agar gas fermentasi bisa keluar.",
        "Aduk campuran setiap hari selama minggu pertama.",
        "Biarkan selama 3 bulan, saring hasilnya, dan simpan cairan eco-enzyme dalam botol."
      ]
    },
    {
      title: "Pakan Ternak",
      description: "Memanfaatkan buah busuk sebagai pakan tambahan untuk ternak tertentu.",
      steps: [
        "Identifikasi jenis buah yang masih bisa dikonsumsi ternak (hindari buah yang sudah sangat busuk atau berjamur).",
        "Cuci bersih buah untuk menghilangkan kotoran dan pestisida yang mungkin menempel.",
        "Hilangkan bagian yang sangat busuk atau berjamur.",
        "Potong-potong buah menjadi ukuran yang sesuai untuk hewan ternak.",
        "Campur dengan pakan utama sesuai takaran yang disarankan (jangan lebih dari 20% dari total pakan).",
        "Berikan kepada ternak seperti sapi, kambing, atau ayam sebagai suplemen makanan."
      ]
    }
  ];

  return (
    <div className="home-page">
      <Navbar />
      <div className="home-container">
        <h1 className="page-title">Deteksi Kualitas Buah dan Sayurmu Menggunakan <span className='highlight'>DETECT.IT</span></h1>
        
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
            <>
              <DetectionResult 
                label={detectionResult.label}
                condition={detectionResult.condition}
                confidence={detectionResult.confidence}
              />
              
              {detectionResult.condition === 'Busuk' && (
                <div className="recommendations-section fade-in">
                  <h2 className="section-title">Rekomendasi untuk Buah Busuk</h2>
                  <p className="recommendation-intro">
                    Buah yang terdeteksi busuk masih dapat dimanfaatkan kembali. Klik setiap opsi untuk melihat detailnya.
                  </p>
                  
                  <div className="recommendations-container">
                    {recommendations.map((rec, index) => (
                      <div key={index} className="dropdown-item">
                        <div className="dropdown-header" onClick={() => toggleDropdown(index)}>
                          <h3 className="recommendation-title">{rec.title}</h3>
                          <span className={`dropdown-icon ${openDropdown[index] ? 'open' : ''}`}>▼</span>
                        </div>
                        <div className={`dropdown-content ${openDropdown[index] ? 'open' : ''}`}>
                          <p className="recommendation-description">{rec.description}</p>
                          
                          <div className="recommendation-steps">
                            <h4>Cara Melakukan:</h4>
                            <ol>
                              {rec.steps.map((step, stepIndex) => (
                                <li key={stepIndex}>{step}</li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;