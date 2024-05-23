import React from 'react';
import styled, { keyframes } from 'styled-components';

const stepperFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StepperContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap; /* Allow wrapping */
  margin: 20px 0;
  padding: 0 10px; /* Add padding to prevent overflow */
  animation: ${stepperFadeIn} 0.6s ease-out;
`;

const Step = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: ${(props) => (props.active ? '#4caf50' : '#e0e0e0')};
  color: ${(props) => (props.active ? '#fff' : '#000')};
  border-radius: 50%;
  margin: 5px; /* Adjust margin to prevent overflow */
  font-weight: bold;
  transition: background-color 0.3s, transform 0.3s;
  cursor: default;

  &:hover {
    transform: scale(1.1);
    background-color: ${(props) => (props.active ? '#388e3c' : '#bdbdbd')};
  }

  i {
    position: absolute;
    font-size: 1.2em;
  }
`;

const StepConnector = styled.div`
  width: 30px; /* Adjust width to prevent overflow */
  height: 4px;
  background-color: ${(props) => (props.active ? '#4caf50' : '#e0e0e0')};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.active ? '#388e3c' : '#bdbdbd')};
  }
`;

const StepperComponent = ({ nbEtat, currentQuestion }) => {
  return (
    <StepperContainer>
      {[...Array(nbEtat)].map((_, index) => (
        <React.Fragment key={index}>
          <Step active={index < currentQuestion}>
            {index + 1 < currentQuestion ? (
              <i className="icon-ok"></i>
            ) : (
              index + 1
            )}
          </Step>
          {index < nbEtat - 1 && (
            <StepConnector active={index < currentQuestion - 1} />
          )}
        </React.Fragment>
      ))}
    </StepperContainer>
  );
};

export default StepperComponent;
