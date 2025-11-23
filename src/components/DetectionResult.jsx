import React from 'react';
import '../styles/components.css';

const DetectionResult = ({ label, condition, confidence }) => {
  // 1. Bagi nilai dari backend dengan 100 untuk mendapatkan persentase sebenarnya
  // 2. Gunakan Number() untuk memastikan operasi pembagian berhasil
  // 3. Terapkan toFixed(2) untuk memformatnya menjadi dua angka di belakang koma
  const actualConfidence = Number(confidence) / 100;
  const formattedConfidence = actualConfidence.toFixed(2);

  const conditionClass = condition === 'Segar' ? 'fresh' : 'rotten';
  
  return (
    <div className="detection-result fade-in">
      <div className="result-card">
        <h3 className="result-title">Hasil Deteksi</h3>
        <div className="result-content">
          <div className="result-item">
            <span className="result-label">Buah:</span>
            <span className="result-value">{label}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Kondisi:</span>
            <span className={`result-value condition ${conditionClass}`}>{condition}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Tingkat Kepercayaan:</span>
            {/* Tampilkan nilai yang sudah diformat */}
            <span className="result-value">{formattedConfidence}%</span>
          </div>
        </div>
        <div className="confidence-bar">
          <div 
            className="confidence-fill" 
            style={{ 
              // Gunakan nilai asli (yang sudah dibagi 100) untuk lebar progress bar
              width: `${actualConfidence}%` 
            }}
          ></div>
        </div>
        <div className="result-note">
          <p>
            {condition === 'Segar' 
              ? 'Buah ini masih segar dan aman untuk dikonsumsi.' 
              : 'Buah ini tidak lagi segar dan tidak disarankan untuk dikonsumsi.'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DetectionResult;