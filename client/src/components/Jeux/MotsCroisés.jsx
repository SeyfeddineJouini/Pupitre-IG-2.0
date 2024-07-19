import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../../themes';
import Navbar from "../Navbar";
import NavbarAdmin from "../NavbarAdmin";
import { useAuth } from "../../context/AuthContext";
import backgroundImage from '../../img/choix1.jpg';
import Cell from './Cell';
import ClueList from './ClueList';
import Keyboard from './Keyboard';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCheckCircle } from 'react-icons/fa';
import Confetti from 'react-confetti';




const words = [
  "BIODIVERSITE", "RECYCLAGE", "ENERGIE", "CARBONE", "DURABLE",
  "POLLUTION", "DEFORESTATION", "ECOLOGIE", "CLIMAT", "RENOUVELABLE",
  "TRANSITION", "RECHAUFFEMENT", "AGRICULTURE", "COMPOSTAGE", "ECORESPONSABLE",
  "CYCLISME", "DECHET", "EMISSION", "EFFETDESERRE", "BIODEGRADABLE",
  "EOLIENNE", "REUTILISATION", "ISOLATION", "CONSERVATION", "HABITAT","ECOSYSTEME", "BIOSPHERE", "NATURE", "PLANTE", "CO2","REDUCTION","TRI","RESSOURCE","EAU"
];


const definitions = {
 "BIODIVERSITE":"La variété des formes de vie sur Terre.", 
 "RECYCLAGE":"Processus de transformation des déchets en nouveaux produits.", 
 "ENERGIE":"Capacité à effectuer un travail ou à produire de la chaleur.", 
 "CARBONE":"Élément chimique de base des composés organiques.", 
 "DURABLE":"Capable de durer sans nuire à l'environnement.",
"POLLUTION":"Introduction de contaminants dans l'environnement.", 
"DEFORESTATION":"Destruction des forêts par l'homme", 
"ECOLOGIE":"Science qui étudie les interactions des êtres vivants avec leur environnement.", 
"CLIMAT":"Conditions météorologiques moyennes sur une longue période.", 
"RENOUVELABLE":" Source d'énergie qui se régénère naturellement.",
"TRANSITION":"Passage à des systèmes énergétiques durables.", 
"RECHAUFFEMENT":"Augmentation de la température moyenne globale.", 
"AGRICULTURE":"Pratique de cultiver la terre et d'élever des animaux.", 
"COMPOSTAGE":"Décomposition des déchets organiques pour produire du compost.", 
"ECORESPONSABLE":"Qui prend en compte les impacts environnementaux.",
"CYCLISME":"Utilisation du vélo comme moyen de transport écologique.", 
"DECHET":"Résidu inutilisable provenant des activités humaines.", 
"EMISSION":"Libération de substances dans l'atmosphère.", 
"EFFETDESERRE":"Phénomène de rétention de la chaleur dans l'atmosphère.", 
"BIODEGRADABLE":"Qui peut être décomposé par des organismes vivants.",
"EOLIENNE":" Appareil qui convertit l'énergie du vent en électricité.", 
"REUTILISATION":"Action de réutiliser des objets ou matériaux.", 
"ISOLATION":"Technique visant à réduire les pertes de chaleur.", 
"CONSERVATION":"Protection et gestion des ressources naturelles.", 
"HABITAT":" Environnement où vivent des organismes spécifiques.",
"ECOSYSTEME":"Ensemble formé par une communauté d'êtres vivants et son environnement.", 
"BIOSPHERE":"Partie de la Terre où la vie existe.", 
"NATURE":"Ensemble des éléments de l'univers non modifiés par l'homme.", 
"PLANTE":"Organisme vivant végétal capable de photosynthèse.", 
"CO2":"Symbole chimique du dioxyde de carbone, gaz à effet de serre",
"REDUCTION":"Action de diminuer la quantité de quelque chose.",
"TRI":"Séparation des déchets en différentes catégories pour faciliter leur recyclage.",
"RESSOURCE":"Matières premières disponibles dans l'environnement.",
"EAU":"Liquide, indispensable à la vie.",
"RECUPERATION": "Action de recueillir des matériaux pour les réutiliser."
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
  min-height: 83vh;
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


const CrosswordUI = () => {
  const [grid, setGrid] = useState(Array.from({ length: 15 }, () => Array(15).fill({})));
  const [clues, setClues] = useState([]);
  const [acrossClues, setAcrossClues] = useState([]);
  const [downClues, setDownClues] = useState([]);
  const { isAuthenticated } = useAuth();
  const [theme, setTheme] = useState(lightTheme);
  const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiRef = useRef(null);


  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };


  useEffect(() => {
    generateCrossword();
  }, []);


  const getRandomWords = (wordList, count) => {
    const shuffled = [...wordList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };


  const generateCrossword = () => {
    const newGrid = Array.from({ length: 15 }, () => Array(15).fill({}));
    const newClues = [];
    const selectedWords = getRandomWords(words, 10);
    placeWords(newGrid, newClues, selectedWords);
    assignMissingIndices(newGrid, newClues);
    setGrid(newGrid);
    setClues(newClues);
    generateClues(newClues);
  };


  const assignMissingIndices = (newGrid, newClues) => {
    let currentNumber = 1;
    const assignedNumbers = new Set();


    newClues.forEach((clue, index) => {
      if (!clue.number || assignedNumbers.has(clue.number)) {
        while (assignedNumbers.has(currentNumber)) {
          currentNumber++;
        }
        clue.number = currentNumber;
        assignedNumbers.add(clue.number);
      } else {
        assignedNumbers.add(clue.number);
      }


      if (!newGrid[clue.row][clue.col]) {
        newGrid[clue.row][clue.col] = { letter: clue.word[0], numbers: {}, direction: clue.direction };
      }
      newGrid[clue.row][clue.col].numbers[clue.direction] = clue.number;
    });
  };


  const placeWords = (newGrid, newClues, selectedWords) => {
    const centerRow = Math.floor(newGrid.length / 2);
    const centerCol = Math.floor(newGrid[0].length / 2);


    // Place the first word in the center horizontally
    const firstWord = selectedWords[0];
    for (let i = 0; i < firstWord.length; i++) {
      newGrid[centerRow][centerCol - Math.floor(firstWord.length / 2) + i] = { letter: firstWord[i], numbers: { 'H': i === 0 ? 1 : null }, direction: 'H' };
    }
    newClues.push({ word: firstWord, row: centerRow, col: centerCol - Math.floor(firstWord.length / 2), direction: 'H', number: 1 });


    // Place the remaining words
    selectedWords.slice(1).forEach((word, index) => {
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < 100) {
        const { row, col, direction } = findIntersection(word, newGrid);
        if (row !== -1 && canPlaceWord(word, row, col, direction, newGrid)) {
          placeWordInGrid(word, row, col, direction, index + 2, newGrid);
          newClues.push({ word, row, col, direction, number: null });
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
        grid[row][col + i] = { letter: word[i], numbers: { 'H': i === 0 ? number : null }, direction: 'H' };
      }
    } else {
      for (let i = 0; i < word.length; i++) {
        grid[row + i][col] = { letter: word[i], numbers: { 'V': i === 0 ? number : null }, direction: 'V' };
      }
    }
  };


  const generateClues = (clues) => {
    const across = [];
    const down = [];


    clues.forEach((clue) => {
      const { word, row, col, direction, number } = clue;
      if (direction === 'H') {
        across.push(`${number}. ${definitions[word]} (${row + 1},${col + 1})`);
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
      } else {
        markCorrect(clue);
      }
    });
    setGrid([...grid]);
    if (correct) {
      setShowConfetti(true);
      toast.success(
        <div>


          Félicitations ! Vous avez trouvé tous les mots !
        </div>,
        {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: true,
          closeButton: false,
          className: 'toast-success',
          bodyClassName: 'toast-success-body',
          progressClassName: 'toast-success-progress'
        }
      );
      setTimeout(() => setShowConfetti(false), 7000);
    } else {
      toast.error('Il y a des erreurs. Veuillez vérifier vos réponses.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeButton: false,
        className: 'toast-error',
        bodyClassName: 'toast-error-body',
        progressClassName: 'toast-error-progress'
      });
    }
    setSelectedCell(selectedCell); // Ensure selected cell is retained
  };


  const checkClue = (clue) => {
    const { word, row, col, direction } = clue;
    if (direction === 'H') {
      for (let i = 0; i < word.length; i++) {
        if (!grid[row][col + i] || grid[row][col + i].userLetter !== word[i]) {
          return false;
        }
      }
    } else {
      for (let i = 0; i < word.length; i++) {
        if (!grid[row + i][col] || grid[row + i][col].userLetter !== word[i]) {
          return false;
        }
      }
    }
    return true;
  };


  const markIncorrect = (clue) => {
    const { word, row, col, direction } = clue;
    if (direction === 'H') {
      for (let i = 0; i < word.length; i++) {
        if (grid[row][col + i]) {
          grid[row][col + i].incorrect = grid[row][col + i].userLetter !== word[i];
          grid[row][col + i].correct = false;
        }
      }
    } else {
      for (let i = 0; i < word.length; i++) {
        if (grid[row + i][col]) {
          grid[row + i][col].incorrect = grid[row + i][col].userLetter !== word[i];
          grid[row + i][col].correct = false;
        }
      }
    }
  };


  const markCorrect = (clue) => {
    const { word, row, col, direction } = clue;
    if (direction === 'H') {
      for (let i = 0; i < word.length; i++) {
        if (grid[row][col + i]) {
          grid[row][col + i].correct = grid[row][col + i].userLetter === word[i];
          grid[row][col + i].incorrect = false;
        }
      }
    } else {
      for (let i = 0; i < word.length; i++) {
        if (grid[row + i][col]) {
          grid[row + i][col].correct = grid[row + i][col].userLetter === word[i];
          grid[row + i][col].incorrect = false;
        }
      }
    }
  };


  const handleInputChange = (letter) => {
    const { row, col } = selectedCell;
    const newGrid = [...grid];
    if (typeof letter === 'string' && letter.length === 1) {
      newGrid[row][col] = { ...newGrid[row][col], userLetter: letter.toUpperCase(), incorrect: false, correct: false };
      setGrid(newGrid);


      // Move to the next cell
      const nextCell = getNextCell(row, col, newGrid[row][col].direction);
      if (nextCell) {
        setSelectedCell(nextCell);
      }
    }
  };


  const handleCellClick = (row, col) => {
    setSelectedCell({ row, col });
  };


  const getNextCell = (row, col, direction) => {
    if (direction === 'H') {
      if (col < 14 && grid[row][col + 1] && grid[row][col + 1].letter) {
        return { row, col: col + 1 };
      }
    } else if (direction === 'V') {
      if (row < 14 && grid[row + 1][col] && grid[row + 1][col].letter) {
        return { row: row + 1, col };
      }
    }
    return null;
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
        border: direction === 'H' ? '2px solid blue' : '2px solid red'
      };
      return <WordOutline key={index} style={style} />;
    });
  };


  return (
    <ThemeProvider theme={theme}>
      <>
        {showConfetti && <Confetti ref={confettiRef} />}
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
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                        index={cell.numbers}
                        isHorizontal={cell.direction === 'H'}
                        incorrect={cell.incorrect}
                        correct={cell.correct}
                        isSelected={selectedCell.row === rowIndex && selectedCell.col === colIndex}
                      />
                    ) : (
                      <div style={{ width: '30px', height: '30px' }} key={`${rowIndex}-${colIndex}`} />
                    )
                  ))
                ))}
              </GridContainer>
              <ClueContainer>
                <ClueList acrossClues={acrossClues} downClues={downClues} />
              </ClueContainer>
            </CrosswordContainer>
            <Keyboard onKeyPress={handleInputChange} />
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
        <ToastContainer transition={Slide} />
      </>
    </ThemeProvider>
  );
};


export default CrosswordUI;


