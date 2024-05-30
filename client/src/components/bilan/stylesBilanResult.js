// styles.js
import styled, { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const MainContainer = styled.div`
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  color: #0B3D91;
  display: flex;
  flex-direction: column;
`;

export const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const Section = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  padding: 20px;
  margin-top: 20px;
  max-width: 1200px;
  width: 100%;
  animation: ${fadeIn} 2s ease-in-out;
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export const Title = styled.h1`
  font-family: 'Outfit', Helvetica, sans-serif;
  font-weight: 700;
  color: #333;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.1);
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
`;

export const Subtitle = styled.p`
  font-family: 'Open Sans', Helvetica, sans-serif;
  font-size: 1rem;
  color: #555;
  margin-bottom: 20px;
  text-align: center;
`;

export const Column = styled.div`
  flex: 1;
  background: ${props => props.bg || '#f0f0f0'};
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

export const IconWrapper = styled.div`
  font-size: 1.5rem;
  color: #ff6f61;
  margin-bottom: 10px;
`;

export const EmailContainer = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  padding: 20px;
  margin-top: 20px;
  text-align: center;
`;

export const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export const LegendColor = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 8px;
`;

export const LegendIcon = styled.div`
  display: block;
  font-size: 16px;
  margin: 4px;
`;

export const LegendText = styled.div`
  font-size: 1rem;
  text-align: justify;
  margin-right: 8px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative; /* Ensure position relative for close button */
`;

export const CloseButton = styled.button`
  right: 50%;
  color: red;
  background: none;
  font-size: 2rem;
  cursor: pointer;
`;
