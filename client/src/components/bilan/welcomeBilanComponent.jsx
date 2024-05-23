import React from "react";
import styled, { keyframes } from "styled-components";

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

const pulse = keyframes`
  0% {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
  50% {
    text-shadow: 0 0 20px rgba(255, 255, 255, 1);
  }
  100% {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

// Styled Components
const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  animation: ${fadeIn} 1s ease-out;
  padding: 40px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 25px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  margin: 20px;
`;

const Title = styled.h1`
  font-size: 3em;
  color: #1a2a6c;
  animation: ${pulse} 2s infinite;
  margin-bottom: 30px;
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Description = styled.p`
  font-size: 1.5em;
  color: #333;
  margin-bottom: 30px;
  animation: ${slideIn} 1s ease-out;
  font-family: 'Roboto', sans-serif;
`;

export default function WelcomeBilanComponent(props) {
  const welcomeContent = props.welcomeContent;

  return (
    <WelcomeContainer>
      <Title>{welcomeContent.title}</Title>
      <Description>{welcomeContent.description}</Description>
    </WelcomeContainer>
  );
}
