import React from 'react';
import '../styles/components.css';

const DetectionResult = ({ label, condition, confidence }) => {
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
            <span className="result-value">{formattedConfidence}%</span>
          </div>
        </div>
        <div className="confidence-bar">
          <div 
            className="confidence-fill" 
            style={{ 
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