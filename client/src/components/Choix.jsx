import React, { useState } from 'react';

const Choix = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  
  const menuItems = [
    {
      imageUrl: 'https://c.animaapp.com/VcwknbTN/img/ellipse-2.svg',
      smallImageUrl: 'https://c.animaapp.com/VcwknbTN/img/fast-delivery-2@2x.png',
    },
    {
      imageUrl: 'https://c.animaapp.com/VcwknbTN/img/ellipse-3.svg',
      smallImageUrl: 'https://c.animaapp.com/VcwknbTN/img/time-2@2x.png',
    },
    {
      imageUrl: 'https://c.animaapp.com/VcwknbTN/img/ellipse-4.svg',
      smallImageUrl: 'https://c.animaapp.com/VcwknbTN/img/hourglass-2@2x.png',
    },
  ];

  const handleImageChange = (imageUrl) => {
    const index = menuItems.findIndex((item) => item.imageUrl === imageUrl);
    setSelectedImageIndex(index);
  };

  return (
    <div className="relative">
      <div className="absolute top-[1101px] left-[121px]">
      {menuItems.map((index) => (
        <>
        <div
          className="absolute w-[90px] h-[90px] bg-cover cursor-pointer"
          key={index}
          style={{ backgroundImage: `url('https://c.animaapp.com/VcwknbTN/img/ellipse-2.svg')` }}
          onClick={() => handleImageChange(index)}
        >
          <img
            className="w-[58px] h-[52px] top-[19px] left-[16px] absolute"
            alt="Fast delivery"
            src="https://c.animaapp.com/VcwknbTN/img/fast-delivery-2@2x.png"
          />
        </div>
        <div
          key={index}
          className="absolute w-[70px] h-[70px] bg-cover top-[10px] left-[128px] cursor-pointer"
          style={{ backgroundImage: `url('https://c.animaapp.com/VcwknbTN/img/ellipse-3.svg')` }}
          onClick={() => handleImageChange(index)}
        >
          <img
            className="absolute w-[41px] h-[42px] top-[14px] left-[16px] object-cover"
            alt="Time"
            src="https://c.animaapp.com/VcwknbTN/img/time-2@2x.png"
          />
        </div>
        <div
          key={index}
          className="absolute w-[70px] h-[70px] bg-cover top-[10px] left-[236px] cursor-pointer"
          style={{ backgroundImage: `url('https://c.animaapp.com/VcwknbTN/img/ellipse-4.svg')` }}
          onClick={() => handleImageChange(index)}
        >
          <img
            className="absolute w-[45px] h-[45px] top-[13px] left-[12px] object-cover"
            alt="Hourglass"
            src="https://c.animaapp.com/VcwknbTN/img/hourglass-2@2x.png"
          />
        </div>
        </>
      ))}
      </div>

      {selectedImageIndex  && (
        <div className="absolute">
          <img
            className="absolute w-[90px] h-[90px] object-cover"
            alt="Selected Image"
            src={menuItems[selectedImageIndex].imageUrl}
          />
        </div>
      )}
    </div>
  );
};

export default Choix;
