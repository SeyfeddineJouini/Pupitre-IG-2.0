import React, { useState, useEffect, useRef } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import Draggable from "react-draggable";
import styled, { keyframes } from "styled-components";

// Animations
const fadeInUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// Styled Components
const KeyboardContainer = styled.div`
  position: fixed;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
  background-color: rgba(255, 255, 255, 0.95);
  border-top: 2px solid #ccc;
  z-index: 1000;
  width: ${(props) => (props.numpadOnly ? '30vw' : '80vw')};
  max-width: ${(props) => (props.numpadOnly ? '400px' : '800px')};
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  animation: ${fadeInUp} 0.5s ease-out;
  padding-top: 60px; /* Add padding to accommodate the close button */
`;

const Handle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  background-color: #1a2a6c;
  color: #fff;
  font-weight: bold;
  cursor: grab;
  border-bottom: 2px solid #d0d0d0;
  font-family: 'Orbitron', sans-serif;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -4px;
  right: 7px;
  padding: 12px 24px;
  background-color: #d9534f;
  color: #fff;
  font-size: 12px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, background-color 0.3s;

  &:hover, &:active {
    transform: scale(1.1);
    background-color: #c9302c;
  }
`;

export const KeyboardComponent = ({ onInput, onClose, numpadOnly, initialValue }) => {
  const [layoutName, setLayoutName] = useState("default");
  const [input, setInput] = useState(initialValue || "");
  const keyboardRef = useRef(null);

  useEffect(() => {
    setInput(initialValue || "");
  }, [initialValue]);

  const handleChange = (input) => {
    setInput(input);
    if (onInput) onInput(input);
  };

  const handleKeyPress = (button) => {
    if (button === "{shift}" || button === "{lock}") {
      handleShiftClick();
    } else if (button === "{bksp}") {
      handleChange(input.slice(0, -1));
    } else if (button === "{enter}") {
      onClose(); 
    }else {
      handleChange(input + button);
    }
  };

  const handleShiftClick = () => {
    setLayoutName((prevLayoutName) =>
      prevLayoutName === "default" ? "shift" : "default"
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (keyboardRef.current && !keyboardRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const frenchLayout = numpadOnly
    ? {
        default: ["1 2 3", "4 5 6", "7 8 9", "{bksp} 0 {enter}"],
        shift: ["1 2 3", "4 5 6", "7 8 9", "{bksp} 0 {enter}"],
      }
    : {
        default: [
          "& é \" ' ( - è _ ç à ) = {bksp}",
          "{tab} a z e r t y u i o p ^ $",
          "{lock} q s d f g h j k l m ù * {lock}",
          "{shift} < w x c v b n , ; : ! {shift}",
          ".com @ {space}",
        ],
        shift: [
          "1 2 3 4 5 6 7 8 9 0 ° + {bksp}",
          "{tab} A Z E R T Y U I O P ¨ £",
          "{lock} Q S D F G H J K L M % µ {lock}",
          "{shift} > W X C V B N ? . / § {shift}",
          ".com @ {space}",
        ],
      };

  const display = {
    "{bksp}": "supprimer",
    "{shift}": "maj",
    "{lock}": "verr maj",
    "{tab}": "tab",
    "{space}": "espace",
    "{enter}": "entrer",
  };

  return (
    <Draggable handle=".handle">
      <KeyboardContainer ref={keyboardRef} numpadOnly={numpadOnly}>
        <Handle className="handle">Déplacer</Handle>
        <Keyboard
          layoutName={layoutName}
          layout={frenchLayout}
          onKeyPress={handleKeyPress}
          display={display}
          input={input}
        />
        <CloseButton onClick={onClose}>Fermer</CloseButton>
      </KeyboardContainer>
    </Draggable>
  );
};

export default KeyboardComponent;
