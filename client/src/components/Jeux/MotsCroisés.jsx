import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../../themes';
import Navbar from "../Navbar";
import NavbarAdmin from "../NavbarAdmin";
import { useAuth } from "../../context/AuthContext";
import backgroundImage from '../../img/choix3.jpg';
import Cell from './Cell';
import ClueList from './ClueList';

const words = [
  "emission", "carbone", "empreinte", "neutralité", "durabilite",
  "energie", "transition", "climat", "pollution", "CO2",
  "Transport", "Alimentation", "logement", "effetdeserre", "environnement"
];

const definitions = {
  "emission": "Libération de substances (telles que des polluants) dans l'atmosphère",
  "carbone": "Élément formant la base de la vie organique; présent dans le CO2",
  "empreinte": "Marque ou effet laissé par une activité, souvent liée à l'environnement",
  "neutralité": "État de ne soutenir ni n'aider aucun des côtés dans un conflit; émissions nettes nulles",
  "durabilite": "Capacité à être maintenue à un certain taux ou niveau; durabilité",
  "energie": "Puissance dérivée de l'utilisation de ressources physiques ou chimiques",
  "transition": "Processus de passage d'un état ou d'une condition à une autre",
  "climat": "Conditions météorologiques prévalant dans une région sur une longue période",
  "pollution": "Présence ou introduction dans l'environnement d'une substance ayant des effets nocifs",
  "CO2": "Formule chimique du dioxyde de carbone, un gaz à effet de serre",
  "Transport": "Mouvement de personnes ou de biens d'un endroit à un autre",
  "Alimentation": "Processus de fourniture ou d'obtention de la nourriture nécessaire à la santé et à la croissance",
  "logement": "Hébergement; logement",
  "effetdeserre": "Réchauffement de la surface de la Terre dû à la rétention de la chaleur par les gaz à effet de serre",
  "environnement": "Conditions environnantes dans lesquelles une personne, un animal ou une plante vit ou opère"
};

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

const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  overflow: hidden;
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

const CrosswordContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
  margin-top: 20px;
`;

const GridContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(15, 30px);
  grid-template-rows: repeat(15, 30px);
  gap: 1px;
`;

const ClueContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
`;

const Button = styled.button`
  margin-right: 10px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  background-color: ${({ variant }) => (variant === 'primary' ? '#1976d2' : '#f44336')};
  color: white;
  border: none;
  border-radius: 5px;
`;

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(${backgroundImage}) no-repeat center center fixed;
  background-size: cover;
  animation: gradientAnimation 15s ease infinite;

  @keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const WordOutline = styled.div`
  position: absolute;
  border: 2px solid yellow;
  pointer-events: none;
  z-index: 1;
`;

const getLetterIndex = (index) => String.fromCharCode(64 + index); // Convert number to letter

const CrosswordUI = () => {
  const [grid, setGrid] = useState(Array.from({ length: 15 }, () => Array(15).fill(null)));
  const [clues, setClues] = useState([]);
  const [acrossClues, setAcrossClues] = useState([]);
  const [downClues, setDownClues] = useState([]);
  const { isAuthenticated } = useAuth();
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  useEffect(() => {
    generateCrossword();
  }, []);

  const generateCrossword = () => {
    const newGrid = Array.from({ length: 15 }, () => Array(15).fill(false));
    const newClues = [];
    placeWords(newGrid, newClues);
    setGrid(newGrid);
    setClues(newClues);
    generateClues(newClues);
  };

  const placeWords = (newGrid, newClues) => {
    const centerRow = Math.floor(newGrid.length / 2);
    const centerCol = Math.floor(newGrid[0].length / 2);

    // Place the first word in the center horizontally
    const firstWord = words[0];
    for (let i = 0; i < firstWord.length; i++) {
      newGrid[centerRow][centerCol - Math.floor(firstWord.length / 2) + i] = { letter: firstWord[i], number: i === 0 ? 1 : null, direction: 'H' };
    }
    newClues.push({ word: firstWord, row: centerRow, col: centerCol - Math.floor(firstWord.length / 2), direction: 'H', number: 1 });

    // Place the remaining words
    words.slice(1).forEach((word, index) => {
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < 100) {
        const { row, col, direction } = findIntersection(word, newGrid);
        if (row !== -1 && canPlaceWord(word, row, col, direction, newGrid)) {
          placeWordInGrid(word, row, col, direction, index + 2, newGrid);
          newClues.push({ word, row, col, direction, number: index + 2 });
          placed = true;
        }
        attempts++;
      }
    });
  };

  const findIntersection = (word, grid) => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] && grid[i][j].letter) {
          for (let k = 0; k < word.length; k++) {
            if (word[k] === grid[i][j].letter) {
              if (canPlaceWord(word, i - k, j, 'V', grid)) {
                return { row: i - k, col: j, direction: 'V' };
              }
              if (canPlaceWord(word, i, j - k, 'H', grid)) {
                return { row: i, col: j - k, direction: 'H' };
              }
            }
          }
        }
      }
    }
    return { row: Math.floor(Math.random() * 15), col: Math.floor(Math.random() * 15), direction: Math.random() < 0.5 ? 'H' : 'V' };
  };

  const canPlaceWord = (word, row, col, direction, grid) => {
    if (direction === 'H') {
      if (col < 0 || col + word.length > 15) return false;
      for (let i = 0; i < word.length; i++) {
        if (grid[row][col + i] && grid[row][col + i].letter && grid[row][col + i].letter !== word[i]) {
          return false;
        }
      }
    } else {
      if (row < 0 || row + word.length > 15) return false;
      for (let i = 0; i < word.length; i++) {
        if (grid[row + i][col] && grid[row + i][col].letter && grid[row + i][col].letter !== word[i]) {
          return false;
        }
      }
    }
    return true;
  };

  const placeWordInGrid = (word, row, col, direction, number, grid) => {
    if (direction === 'H') {
      for (let i = 0; i < word.length; i++) {
        grid[row][col + i] = { letter: word[i], number: i === 0 ? number : null, direction: 'H' };
      }
    } else {
      for (let i = 0; i < word.length; i++) {
        grid[row + i][col] = { letter: word[i], number: i === 0 ? number : null, direction: 'V' };
      }
    }
  };

  const generateClues = (clues) => {
    const across = [];
    const down = [];

    clues.forEach((clue) => {
      const { word, row, col, direction, number } = clue;
      if (direction === 'H') {
        across.push(`${getLetterIndex(number)}. ${definitions[word]} (${row + 1},${col + 1})`);
      } else {
        down.push(`${number}. ${definitions[word]} (${row + 1},${col + 1})`);
      }
    });

    setAcrossClues(across);
    setDownClues(down);
  };

  const checkWords = () => {
    let correct = true;
    clues.forEach((clue) => {
      if (!checkClue(clue)) {
        correct = false;
        markIncorrect(clue);
      }
    });
    if (correct) {
      alert('Félicitations ! Vous avez trouvé tous les mots !');
    } else {
      alert('Il y a des erreurs. Veuillez vérifier vos réponses.');
    }
  };

  const checkClue = (clue) => {
    const { word, row, col, direction } = clue;
    if (direction === 'H') {
      for (let i = 0; i < word.length; i++) {
        if (grid[row][col + i].letter !== word[i]) {
          return false;
        }
      }
    } else {
      for (let i = 0; i < word.length; i++) {
        if (grid[row + i][col].letter !== word[i]) {
          return false;
        }
      }
    }
    return true;
  };

  const markIncorrect = (clue) => {
    const { row, col, direction } = clue;
    if (direction === 'H') {
      for (let i = 0; i < clue.word.length; i++) {
        grid[row][col + i] = '';
      }
    } else {
      for (let i = 0; i < clue.word.length; i++) {
        grid[row + i][col] = '';
      }
    }
    setGrid([...grid]);
  };

  const handleInputChange = (event, row, col) => {
    const newValue = event.target.value;
    if (typeof newValue !== 'string') return;

    const upperCaseValue = newValue.toUpperCase();
    const newGrid = [...grid];
    newGrid[row][col] = { ...newGrid[row][col], userLetter: upperCaseValue };
    setGrid(newGrid);
  };

  const renderOutlines = () => {
    return clues.map((clue, index) => {
      const { row, col, direction, word } = clue;
      const length = word.length;
      const style = {
        top: `${row * 31}px`,
        left: `${col * 31}px`,
        width: direction === 'H' ? `${length * 31}px` : '31px',
        height: direction === 'V' ? `${length * 31}px` : '31px',
      };
      return <WordOutline key={index} style={style} />;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        {isAuthenticated ? <NavbarAdmin /> : <Navbar toggleTheme={toggleTheme} />}
        <MainContainer>
          <BackgroundContainer />
          <div className="container relative mx-auto">
            <Title>Mots Croisés</Title>
            <CrosswordContainer>
              <GridContainer>
                {renderOutlines()}
                {grid.map((row, rowIndex) => (
                  row.map((cell, colIndex) => (
                    cell && cell.letter ? (
                      <Cell
                        key={`${rowIndex}-${colIndex}`}
                        value={{ ...cell, row: rowIndex, col: colIndex }}
                        onChange={(event) => handleInputChange(event, rowIndex, colIndex)}
                        index={(cell && cell.number) ? cell.number : null}
                        isHorizontal={cell && cell.direction === 'H'}
                      />
                    ) : (
                      <div style={{ width: '30px', height: '30px', backgroundColor: 'black' }} key={`${rowIndex}-${colIndex}`} />
                    )
                  ))
                ))}
              </GridContainer>
              <ClueContainer>
                <ClueList acrossClues={acrossClues} downClues={downClues} />
              </ClueContainer>
            </CrosswordContainer>
            <ButtonContainer>
              <Button variant="primary" onClick={checkWords}>
                Vérifier
              </Button>
              <Button variant="secondary" onClick={generateCrossword}>
                Nouvelle Partie
              </Button>
            </ButtonContainer>
          </div>
        </MainContainer>
      </>
    </ThemeProvider>
  );
};

export default CrosswordUI;
