import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const CellContainer = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  background-color: ${({ incorrect, correct, isSelected }) => 
    incorrect ? '#ffcccc' : 
    correct ? '#ccffcc' : 
    'white'};
  position: relative;
  &:focus-within {
    outline: 2px solid black;
    background-color: ${({ incorrect, correct, isSelected }) => 
    incorrect ? 'white' : 
    correct ? 'white' : 
    'yellow'};
  }
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  text-align: center;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 1rem;
  text-transform: uppercase;
  padding: 0;
`;

const Index = styled.div`
  position: absolute;
  top: 2px;
  left: 2px;
  font-size: 0.5rem;
  color: #888;
`;

const Cell = ({ value, onClick, index, isHorizontal, incorrect, correct, isSelected }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSelected && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSelected]);

  return (
    <CellContainer
      onClick={onClick}
      incorrect={incorrect}
      correct={correct}
      isSelected={isSelected}
      tabIndex={0}
    >
      <Input
        ref={inputRef}
        id={`cell-${value.row}-${value.col}`}
        value={value.userLetter || ''}
        readOnly
      />
      {index && (
        <>
          {index.H && <Index direction="H" style={{ color:'blue'}}>{index.H}</Index>}
          {index.V && <Index direction="V" style={{ top: '16px' , color:'red'}}>{index.V}</Index>}
        </>
      )}
    </CellContainer>
  );
};

export default Cell;
