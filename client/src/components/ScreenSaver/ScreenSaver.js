// src/components/Screensaver.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Screensaver = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [date, setDate] = useState('');

  const fetchEpicImage = async () => {
    try {
      const response = await axios.get('https://epic.gsfc.nasa.gov/api/natural');
      const images = response.data;
      if (images.length > 0) {
        const latestImage = images[0];
        const date = latestImage.date.split(' ')[0].replace(/-/g, '/');
        setDate(date);
        const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${date}/png/${latestImage.image}.png`;
        setImageUrl(imageUrl);
      }
    } catch (error) {
      console.error('Error fetching EPIC image:', error);
    }
  };

  useEffect(() => {
    fetchEpicImage();
    const intervalId = setInterval(fetchEpicImage, 3600000); // Update every hour

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1000, backgroundColor: 'black' }}>
      {imageUrl ? (
        <img src={imageUrl} alt="Real-time Earth view" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <div style={{ color: 'white', textAlign: 'center', paddingTop: '20%' }}>Loading...</div>
      )}
    </div>
  );
};

export default Screensaver;
