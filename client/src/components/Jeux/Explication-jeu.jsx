// IntroductionPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useAuth } from "../../context/AuthContext";
import CrosswordUI from './MotsCroisés';
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import NavbarAdmin from "../NavbarAdmin";
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../../themes';
import backgroundImage from '../../img/choix1.jpg';
import stepImage1 from '../../img/steps.png';



const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  text-align: center;
`;
const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
  min-height: 100vh;
  overflow: hidden;
  align-items:center;
`;
const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(${backgroundImage}) no-repeat center center fixed;
  background-size: cover;
  animation: gradientAnimation 15s ease infinite;

  @keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;


const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
`;

const StepImage = styled.img`
  width: 80%;
  max-width: 550px;
  margin-left: 20px;
  align: center;
`;


const IntroductionPage = ({ onStart }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [theme, setTheme] = useState(lightTheme);
    const toggleTheme = () => {
        setTheme(theme === lightTheme ? darkTheme : lightTheme);
      };
    
  const handleClick = async () => {
    navigate('/jeux-ludiques/mots-croises/jeu');
  }
  return (
    <ThemeProvider theme={theme}>
    <>
      {isAuthenticated ? <NavbarAdmin /> : <Navbar toggleTheme={toggleTheme} />}
      <MainContainer>
        <BackgroundContainer />
        <div className="container relative mx-auto">
    <Container>
      <Title>Bienvenue aux Mots Croisés</Title>
        <StepImage src={stepImage1} alt="" />
      <Button onClick={handleClick}>Commencer le jeu !</Button>
    </Container>
    </div>
        </MainContainer>
      </>
    </ThemeProvider>
  );
};

export default IntroductionPage;
