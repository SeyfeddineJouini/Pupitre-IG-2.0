import React from 'react';
import styled from 'styled-components';

const ClueContainer = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  width: 700px;
  margin: 20px;
  padding: 20px;
  text-align: justify;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  }
`;

const ClueHeader1 = styled.h6`
  font-size: 1.2rem;
  font-weight: 600;
  color: blue;
  text-align: center;
`;

const ClueHeader2 = styled.h6`
  font-size: 1.2rem;
  font-weight: 600;
  color: red;
  text-align:center;
`;
const ClueItem = styled.div`
  margin-bottom: 8px;
`;

const ClueList = ({ acrossClues, downClues }) => {
  return (
    <div>
      <ClueContainer>
        <ClueHeader1>Indices Horizontaux</ClueHeader1>
        {acrossClues.map((clue, index) => (
          <ClueItem key={index}>{clue}</ClueItem>
        ))}
      </ClueContainer>
      <ClueContainer>
        <ClueHeader2>Indices Verticaux</ClueHeader2>
        {downClues.map((clue, index) => (
          <ClueItem key={index}>{clue}</ClueItem>
        ))}
      </ClueContainer>
    </div>
  );
};

export default ClueList;
