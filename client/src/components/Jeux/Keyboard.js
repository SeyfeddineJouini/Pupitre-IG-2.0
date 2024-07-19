// Keyboard.jsx
import React from 'react';
import styled from 'styled-components';

const KeyboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const KeyRow = styled.div`
  display: flex;
`;

const KeyButton = styled.button`
  width: 30px;
  height: 30px;
  margin: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  background-color: #f0f0f0;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
  }
`;

const Keyboard = ({ onKeyPress }) => {
  const keys = [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    ['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'],
    ['U', 'V', 'W', 'X', 'Y', 'Z','1','2','3']
  ];

  return (
    <KeyboardContainer>
      {keys.map((row, rowIndex) => (
        <KeyRow key={rowIndex}>
          {row.map((key) => (
            <KeyButton key={key} onClick={() => onKeyPress(key)}>
              {key}
            </KeyButton>
          ))}
        </KeyRow>
      ))}
    </KeyboardContainer>
  );
};

export default Keyboard;
