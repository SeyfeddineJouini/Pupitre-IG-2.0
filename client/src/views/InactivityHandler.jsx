// src/views/InactivityHandler.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const InactivityContext = createContext();

export const useInactivity = () => {
  return useContext(InactivityContext);
};

export const InactivityProvider = ({ children }) => {
  const [isInactive, setIsInactive] = useState(false);
  const [isScreensaverActive, setIsScreensaverActive] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    let activityTimer;
    let screensaverTimer;

    const handleActivity = () => {
      clearTimeout(activityTimer);
      clearTimeout(screensaverTimer);
      setIsInactive(false);
      setIsScreensaverActive(false);

      screensaverTimer = setTimeout(() => {
        setIsScreensaverActive(true);
      }, 600000); // 10 minutes in milliseconds

      activityTimer = setTimeout(() => {
        setIsInactive(true);
        logout();
        navigate('/');
      }, 300000); // 15 minutes in milliseconds
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);

    screensaverTimer = setTimeout(() => {
      setIsScreensaverActive(true);
    }, 600000);

    activityTimer = setTimeout(() => {
      setIsInactive(true);
      logout();
      navigate('/');
    }, 300000);

    return () => {
      clearTimeout(activityTimer);
      clearTimeout(screensaverTimer);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
    };
  }, [logout, navigate]);

  return (
    <InactivityContext.Provider value={{ isInactive, isScreensaverActive }}>
      {children}
    </InactivityContext.Provider>
  );
};
