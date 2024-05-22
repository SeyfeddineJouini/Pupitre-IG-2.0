import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NavbarAdmin from "../components/NavbarAdmin";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import NewsFeed from "../components/NewsFeed/NewsFeed";
import styled, { keyframes } from 'styled-components';

import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../themes';

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


// Define AnimatedBackground component
const AnimatedBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #e0f7fa, #80deea);
  background-size: 200% 200%;
  animation: gradientAnimation 15s ease infinite;

  @keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

// Define MainContainer component
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
  font-weight: 600;
  color: #333;
  font-size: 4rem;
  margin-bottom: 20px;
  animation: ${fadeIn} 1s ease-in-out;
`;

const Subtitle = styled.p`
  font-family: 'Open Sans', Helvetica, sans-serif;
  font-size: 1.5rem;
  color: #555;
  margin-bottom: 40px;
  animation: ${fadeIn} 1.5s ease-in-out;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 20px;
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  width: 250px;
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

const NewsSection = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  padding: 20px;
  margin-top: 20px;
  animation: ${fadeIn} 2.5s ease-in-out;
`;

export const Accueil4 = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(lightTheme);
  const { isAuthenticated } = useAuth();

  const handleBilanNormal = async () => {
    navigate('/bilan/normal');
  };

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
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <Title>Bilan Carbone</Title>
              <Subtitle>
                Découvrez notre interface web révolutionnaire pour calculer votre Bilan Carbone, fruit d'un travail collectif et d'une synergie entre notre équipe et des étudiants en énergétique.
              </Subtitle>
              <CardContainer>
                <Card onClick={() => navigate('/bilan/express')}>
                  <CardIcon bgColor="#ff6f61">
                    <img src="https://c.animaapp.com/VcwknbTN/img/fast-delivery-2@2x.png" alt="Fast delivery" />
                  </CardIcon>
                  <CardTitle>Express</CardTitle>
                  <CardDescription>
                    Un bilan rapide pour obtenir des résultats en un temps record.
                  </CardDescription>
                </Card>
                <Card onClick={handleBilanNormal}>
                  <CardIcon bgColor="#42a5f5">
                    <img src="https://c.animaapp.com/VcwknbTN/img/time-2@2x.png" alt="Time" />
                  </CardIcon>
                  <CardTitle>Normal</CardTitle>
                  <CardDescription>
                    Un bilan complet pour des résultats détaillés et précis.
                  </CardDescription>
                </Card>
                <Card onClick={() => navigate('/bilan/long')}>
                  <CardIcon bgColor="#66bb6a">
                    <img src="https://c.animaapp.com/VcwknbTN/img/hourglass-2@2x.png" alt="Hourglass" />
                  </CardIcon>
                  <CardTitle>Long</CardTitle>
                  <CardDescription>
                    Un bilan approfondi pour une analyse exhaustive.
                  </CardDescription>
                </Card>
              </CardContainer>
            </div>
            <div className="w-full lg:w-5/12 mr-auto ml-auto">
              <NewsSection>
                <NewsFeed />  {/* Ajoutez le composant NewsFeed ici */}
                <blockquote className="relative p-6 mb-2">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="absolute left-0 w-full block"
                    style={{
                      height: "95px",
                      top: "-94px"
                    }}
                  >
                    <polygon
                      points="-30,95 583,95 583,65"
                      className="text-pink-600 fill-current"
                    ></polygon>
                  </svg>
                  <h4 className="text-xl font-bold text-black">
                    Actualités
                  </h4>
                </blockquote>
              </NewsSection>
            </div>
          </div>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
          style={{ height: "70px" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-gray-300 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </MainContainer>
    </>
    </ThemeProvider>
  );
};
