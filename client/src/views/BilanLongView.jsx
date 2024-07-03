// src/views/BilanLongView.js
import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes, ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../themes";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import NavbarAdmin from "../components/NavbarAdmin";
import backgroundImage from "../img/image.png";

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: url(${backgroundImage}) no-repeat center center fixed;
  background-size: 200% 100%;
  animation: gradientAnimation 15s ease infinite;

  @keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const MainContent = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 1s ease-out;
  padding: 20px;
`;

const ContentContainer = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h1`
  font-family: 'Outfit', Helvetica, sans-serif;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
  font-size: 4rem;
  margin-bottom: 20px;
  animation: ${fadeIn} 1s ease-in-out;
`;

const Description = styled.p`
  font-size: 1.2em;
  color: #333;
  margin-bottom: 20px;
`;

const HomeLink = styled(Link)`
  display: inline-block;
  padding: 12px 20px;
  font-size: 1.2em;
  font-weight: bold;
  color: #fff;
  background: #1a2a6c;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
  text-decoration: none;

  &:hover {
    background: #0d185b;
    transform: scale(1.05);
  }
`;

export default function BilanLongView() {
  const { isAuthenticated } = useAuth();
  const [theme, setTheme] = React.useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        {isAuthenticated ? <NavbarAdmin /> : <Navbar toggleTheme={toggleTheme} />}
        <PageContainer>
          <MainContent>
            <ContentContainer>
              <Title>Bilan Long</Title>
              <Description>
                Le bilan long est en cours de développement et sera disponible ulterieurement.
              </Description>
              <HomeLink to="/">Retour à l'accueil</HomeLink>
            </ContentContainer>
          </MainContent>
        </PageContainer>
      </>
    </ThemeProvider>
  );
}
