import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
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

  const screensaverTimerRef = useRef(null);
  const logoutTimerRef = useRef(null);

  const resetTimers = () => {
    clearTimeout(screensaverTimerRef.current);
    clearTimeout(logoutTimerRef.current);

    setIsInactive(false);
    setIsScreensaverActive(false); 
    
    screensaverTimerRef.current = setTimeout(() => {
      setIsScreensaverActive(true);
    }, 2 * 1000);

    logoutTimerRef.current = setTimeout(() => {
    setIsInactive(true);
    logout();             
    navigate('/');      
  }, 5 * 1000);

  };

  useEffect(() => {
    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];

    activityEvents.forEach(event => window.addEventListener(event, resetTimers));

    resetTimers(); // Initialise les timers au montage

    return () => {
      activityEvents.forEach(event => window.removeEventListener(event, resetTimers));
      clearTimeout(screensaverTimerRef.current);
      clearTimeout(logoutTimerRef.current);
    };
  }, [logout, navigate]);

  return (
    <InactivityContext.Provider value={{ isInactive, isScreensaverActive }}>
      {children}
    </InactivityContext.Provider>
  );
};
