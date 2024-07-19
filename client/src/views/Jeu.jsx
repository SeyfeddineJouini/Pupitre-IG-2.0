// src/views/GameSelection.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../themes';
import backgroundImage from "../img/choix5.jpg";
import Navbar from "../components/Navbar";
import NavbarAdmin from "../components/NavbarAdmin";
import { useAuth } from "../context/AuthContext";
import motsCroisesImage from '../img/motsCroises.png';
import autresJeuxImage from '../img/autresJeux.png';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const AnimatedBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200%;
  background: url(${backgroundImage}) no-repeat center center fixed;
  background-size: 200% 100%;
  animation: gradientAnimation 15s ease infinite;

  @keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const MainContainer = styled.div`
  position: relative;
  min-height: 75vh;
  padding-top: 16px;
  padding-bottom: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Title = styled.h1`
  font-family: 'Outfit', Helvetica, sans-serif;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
  font-size: 4rem;
  margin-bottom: 20px;
  animation: ${fadeIn} 1s ease-in-out;
  text-align: center;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 20px;
`;

const CustomCard = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  width: 300px;
  margin: 20px;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${fadeIn} 2s ease-in-out;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    animation: ${pulse} 0.6s infinite;
  }
`;

const CardIcon = styled.div`
  background-color: ${props => props.bgColor || '#333'};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  img {
    width: 30px;
  }
`;

const CardTitle = styled.h6`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: #777;
`;

const GameSelection = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [theme, setTheme] = useState(lightTheme);
  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <>
      {isAuthenticated ? <NavbarAdmin /> : <Navbar toggleTheme={toggleTheme} />}
        <MainContainer>
          <AnimatedBackground />
          <div className="container relative mx-auto">
            <Title>Choisissez un jeu</Title>
            <CardContainer>
              <CustomCard onClick={() => navigate('/jeux-ludiques/mots-croises/explication')}>
                <CardIcon bgColor="#6f42c1">
                  <img src={motsCroisesImage} alt="Mots-Croisés" />
                </CardIcon>
                <CardTitle>Mots-Croisés</CardTitle>
                <CardDescription>
                  Jouez à des mots-croisés amusants.
                </CardDescription>
              </CustomCard>
              <CustomCard onClick={() => navigate('/jeux-ludiques/autres-jeux')}>
                <CardIcon bgColor="#17a2b8">
                  <img src={autresJeuxImage} alt="Autres jeux" />
                </CardIcon>
                <CardTitle>Autres jeux</CardTitle>
                <CardDescription>
                  Découvrez d'autres jeux passionnants.
                </CardDescription>
              </CustomCard>
            </CardContainer>
          </div>
        </MainContainer>
      </>
    </ThemeProvider>
  );
};

export default GameSelection;
