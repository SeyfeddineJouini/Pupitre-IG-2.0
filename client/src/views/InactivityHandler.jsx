import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const InactivityContext = createContext();

export const useInactivity = () => {
  return useContext(InactivityContext);
};

export const InactivityProvider = ({ children }) => {
  const [isInactive, setIsInactive] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    let timer;
    const handleActivity = () => {
      clearTimeout(timer);
      setIsInactive(false);
      timer = setTimeout(() => {
        setIsInactive(true);
        logout();
        navigate('/');
      }, 1200000); // 5 minutes in milliseconds
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);

    timer = setTimeout(() => {
      setIsInactive(true);
      logout();
      navigate('/');
    }, 1200000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
    };
  }, [logout, navigate]);

  return (
    <InactivityContext.Provider value={{ isInactive }}>
      {children}
    </InactivityContext.Provider>
  );
};

