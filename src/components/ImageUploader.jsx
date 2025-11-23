import React, { useState, useRef, useEffect } from 'react';
import '../styles/components.css';

const ImageUploader = ({ onImageSelected }) => {
  const [preview, setPreview] = useState(null);
  const [isCameraMode, setIsCameraMode] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onImageSelected(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      // Sekarang videoRef.current sudah pasti ada
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
    } catch (err) {
      console.error("Error accessing camera:", err);
      let errorMessage = "Tidak dapat mengakses kamera. Pastikan Anda telah memberikan izin.";
      if (err.name === 'NotAllowedError') {
        errorMessage = "Izin kamera ditolak. Silakan berikan izin melalui ikon gembok di bilah alamat browser Anda.";
      } else if (err.name === 'NotFoundError') {
        errorMessage = "Tidak ada kamera yang ditemukan pada perangkat ini.";
      } else if (err.name === 'NotReadableError') {
        errorMessage = "Kamera sedang digunakan oleh aplikasi lain. Tutup aplikasi lain dan coba lagi.";
      } else if (err.name === 'SecurityError') {
        errorMessage = "Akses kamera diblokir. Pastikan aplikasi Anda berjalan di HTTPS (https://) atau localhost (http://localhost).";
      }
      alert(errorMessage);
      // Jika gagal, kembalikan ke mode upload
      setIsCameraMode(false); 
    }
  };

  // Fungsi untuk menghentikan kamera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // useEffect untuk mengelola siklus hidup kamera
  useEffect(() => {
    // Jika mode kamera aktif, mulai kamera
    if (isCameraMode) {
      startCamera();
    }

    // Fungsi cleanup: akan dijalankan saat komponen "dibersihkan"
    // (yaitu saat isCameraMode berubah dari true ke false, atau saat komponen di-unmount)
    return () => {
      stopCamera();
    };
  }, [isCameraMode]); // Efek ini hanya berjalan jika isCameraMode berubah

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    canvas.toBlob(blob => {
      const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onImageSelected(file);
        setIsCameraMode(false);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="image-uploader">
      <div className="upload-area">
        {preview ? (
          <div className="preview-container">
            <img src={preview} alt="Preview" className="preview-image" />
            <button 
              className="btn btn-secondary change-image-btn" 
              onClick={() => setPreview(null)}
            >
              Ganti Gambar
            </button>
          </div>
        ) : isCameraMode ? (
          <div className="camera-container">
            <video ref={videoRef} autoPlay className="camera-feed"></video>
            <canvas ref={canvasRef} className="hidden"></canvas>
            <div className="camera-controls">
              <button className="btn btn-capture" onClick={capturePhoto}>
                Ambil Gambar
              </button>
              <button className="btn btn-secondary" onClick={() => setIsCameraMode(false)}>
                Batal
              </button>
            </div>
          </div>
        ) : (
          <div className="upload-options">
            <div className="upload-option">
              <label htmlFor="file-upload" className="upload-label">
                <div className="upload-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </div>
                <span>Galeri atau File</span>
              </label>
              <input 
                id="file-upload" 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="hidden-input"
              />
            </div>
            <div className="upload-option">
              <button className="upload-label" onClick={() => setIsCameraMode(true)}>
                <div className="upload-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                  </svg>
                </div>
                <span>Kamera</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;