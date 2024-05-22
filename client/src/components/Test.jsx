import React, { useState } from 'react';

const Test = () => {
  const [selectedImage, setSelectedImage] = useState('https://c.animaapp.com/VcwknbTN/img/ellipse-2.svg');

  const handleImageChange = (newImage) => {
    setSelectedImage(newImage);
  };

  return (
    <div className="flex">
      <div className="space-x-4">
        <SmallContainer
          image="https://c.animaapp.com/VcwknbTN/img/ellipse-2.svg"
          onClick={() => handleImageChange('https://c.animaapp.com/VcwknbTN/img/ellipse-2.svg')}
        />
        <SmallContainer
          image="https://c.animaapp.com/VcwknbTN/img/ellipse-4.svg"
          onClick={() => handleImageChange('https://c.animaapp.com/VcwknbTN/img/ellipse-4.svg')}
        />
        <SmallContainer
          image="https://c.animaapp.com/VcwknbTN/img/ellipse-7.svg"
          onClick={() => handleImageChange('https://c.animaapp.com/VcwknbTN/img/ellipse-7.svg')}
        />
      </div>
      <LargeContainer image={selectedImage} />
    </div>
  );
};

const SmallContainer = ({ image, onClick }) => {
    return (
      <div className="w-16 h-16 rounded-full overflow-hidden cursor-pointer" onClick={onClick}>
        <img src={image} alt="Small Container Image" className="w-full h-full object-cover" />
      </div>
    );
  };
  
  const LargeContainer = ({ image }) => {
    return (
      <div className="w-48 h-48 rounded-full overflow-hidden">
        <img src={image} alt="Large Container Image" className="w-full h-full object-cover" />
      </div>
    );
    };

export default Test;
