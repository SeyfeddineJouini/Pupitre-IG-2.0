import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaCheckCircle } from 'react-icons/fa'; // Example icon from react-icons

// Logos
import ademeLogo from '../../img/ademe.jpg';
import impactoLogo from '../../img/ademe.jpg';
import inseeLogo from '../../img/insee.jpg';

// Animations
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

const glow = keyframes`
  0% {
    box-shadow: 0 0 5px #f39c12, 0 0 10px #f39c12, 0 0 20px #f39c12, 0 0 40px #f39c12;
  }
  100% {
    box-shadow: 0 0 20px #e74c3c, 0 0 30px #e74c3c, 0 0 40px #e74c3c, 0 0 50px #e74c3c;
  }
`;

const IntermediatePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  background: ${(props) => props.background || 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)'};
  animation: ${fadeIn} 1s ease-in-out;
`;

const ContentBox = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  width: 100%;
  text-align: center;
  animation: ${slideIn} 1s ease;
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: #333;
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
`;

const Text = styled.p`
  font-size: 1.2em;
  color: #555;
  margin-bottom: 20px;
  font-family: 'Open Sans', sans-serif;
`;

const SourceList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const SourceItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Logo = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  display: inline-block;
  padding: 12px 24px;
  font-size: 1.2em;
  font-weight: bold;
  color: #fff;
  background: #007bff;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
  margin-top: 20px;

  &:hover {
    background: #0056b3;
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
    animation: ${glow} 1s infinite alternate;
  }
`;

const IntermediairePage = ({ onContinue, background }) => {
  return (
    <IntermediatePageContainer background={background}>
      <ContentBox>
        <Title>Sources et Méthodologie</Title>
        <Text>
          Pour assurer une bonne évaluation de votre bilan carbone, nous nous basons sur des sources fiables telles que :
        </Text>
        <SourceList>
          <SourceItem>
            <Logo src={ademeLogo} alt="ADEME" />
            <span>ADEME</span>
          </SourceItem>
          <SourceItem>
            <Logo src={impactoLogo} alt="Impacto" />
            <span>Impacto</span>
          </SourceItem>
          <SourceItem>
            <Logo src={inseeLogo} alt="Insee" />
            <span>Insee</span>
          </SourceItem>
        </SourceList>
        <Text>
          Ces sources nous aident à estimer l'impact carbone de vos activités quotidiennes. Vous pourrez consulter ces sources à la fin du questionnaire.
        </Text>
        <Button onClick={onContinue}>Continuer</Button>
      </ContentBox>
    </IntermediatePageContainer>
  );
};

export default IntermediairePage;
