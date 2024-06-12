import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import NavbarAdmin from '../components/NavbarAdmin';
import { lightTheme, darkTheme } from '../themes';
import { ThemeProvider } from 'styled-components';

const PlanetesEtLimites = () => {
  const { isAuthenticated } = useAuth();
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      {isAuthenticated ? (
        <NavbarAdmin />
      ) : (
        <Navbar toggleTheme={toggleTheme} />
      )}
      <div style={{ padding: '20px' }}>
        <iframe 
          src="https://planetaryboundaries.kcvs.ca/" 
          title="Planetary Boundaries"
          style={{
            width: '100%',
            height: '800px',
            border: 'none'
          }}
        />
      </div>
    </ThemeProvider>
  );
};

export default PlanetesEtLimites;
