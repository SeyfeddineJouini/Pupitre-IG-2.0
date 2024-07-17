import React from 'react';
import styled from 'styled-components';

const ClueContainer = styled.div`
  margin-bottom: 20px;
`;

const ClueHeader = styled.h6`
  font-size: 1.2rem;
  font-weight: 600;
`;

const ClueItem = styled.div`
  margin-bottom: 8px;
`;

const ClueList = ({ acrossClues, downClues }) => {
  return (
    <div>
      <ClueContainer>
        <ClueHeader>Indices Horizontaux</ClueHeader>
        {acrossClues.map((clue, index) => (
          <ClueItem key={index}>{clue}</ClueItem>
        ))}
      </ClueContainer>
      <ClueContainer>
        <ClueHeader>Indices Verticaux</ClueHeader>
        {downClues.map((clue, index) => (
          <ClueItem key={index}>{clue}</ClueItem>
        ))}
      </ClueContainer>
    </div>
  );
};

export default ClueList;
