import React from 'react';
import styled from 'styled-components';

const CellContainer = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  font-size: 1.2rem;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  color: black;
`;

const IndexLabel = styled.span`
  position: absolute;
  top: 2px;
  left: 2px;
  font-size: 0.6rem;
  color: black;
  background: white;
  border-radius: 3px;
  padding: 0 2px;
`;

const getLetterIndex = (index) => String.fromCharCode(64 + index); // Convert number to letter

const Cell = ({ value, onChange, index, isHorizontal }) => {
  const isBlack = value === null || (typeof value === 'string' && value.trim() === '');

  const handleInputChange = (newValue) => {
    onChange({ target: { value: newValue } });
  };

  return (
    <CellContainer>
      {index && <IndexLabel>{isHorizontal ? getLetterIndex(index) : index}</IndexLabel>}
      <StyledInput
        isBlack={isBlack}
        value={isBlack ? '' : value.userLetter || ''}
        onChange={(e) => handleInputChange(e.target.value)}
        readOnly={isBlack}
      />
    </CellContainer>
  );
};

export default Cell;
