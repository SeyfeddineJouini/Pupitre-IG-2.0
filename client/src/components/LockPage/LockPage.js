// src/components/LockPage/LockPage.jsx
import React from 'react'; 
import myVideo from "../../assets/vid/OneHome.mp4"

const LockPage = () => {
  return (
    <div className="lock-screen">
      <video src={myVideo} autoPlay muted loop></video>
    </div>
  );
};

export default LockPage;
