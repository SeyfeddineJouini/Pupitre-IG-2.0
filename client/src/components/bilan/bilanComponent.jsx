import React, { useState, useRef, useEffect } from "react";
import StepperComponent from "./stepperComponent";
import QuestionComponent from "./questionComponent";
import WelcomeBilanComponent from "./welcomeBilanComponent";
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

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

const BilanContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
  height: 100vh;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const BilanBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background: #fff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  padding: 40px;
  max-width: 1218px;
  width: 100%;
  max-height: 90vh;
  overflow: auto;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Title = styled.span`
  font-size: 2em;
  color: #555;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
`;

const Button = styled.button`
  display: inline-block;
  padding: 12px 24px;
  font-size: 1.2em;
  font-weight: bold;
  color: #fff;
  background: ${(props) => props.bgColor || '#007bff'};
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
  margin: 10px;

  &:hover {
    background: ${(props) => props.hoverColor || '#0056b3'};
    transform: scale(1.05);
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  img {
    border-radius: 30px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    max-width: 100%;
    max-height: 400px;
    object-fit: cover;
  }
`;

const ContentContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  overflow: auto;
  max-height: 80vh;
`;

const AlertDiv = styled.div`
  color: red;
  text-align: center;
  margin-top: 20px; /* Adjust the margin as needed */
`;

const BilanComponent = (props) => {
  const userName = props.userName || "";
  const welcomePageContent = props.welcomeContent || {
    title: "",
    description: "",
    image: ""
  };
  const questionsList = props.questionsList || [];
  const onResponseChange = props.onResponseChange;
  const onTerminateClicked = props.onTerminateClicked;

  const [currentQuestionIsValid, setCurrentQuestionIsValid] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [response, setResponse] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState(''); // New state for alert message
  const navigate = useNavigate();
  const questionRef = useRef(null);

  useEffect(() => {
    if (questionRef.current) {
      questionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentQuestionIndex]);

  function start() {
    setCurrentQuestionIndex(0);
  }

  function quit() {
    navigate('/'); // Chemin vers la page d'accueil
  }

  function showalert(message) {
    const avionKm = response.grand_deplacement_avion_km;
    const trainKm = response.grand_deplacement_train_km;
    const voitureKm = response.voiture_grand_deplacement_km;
    if ((avionKm !== undefined && avionKm < 100) || (trainKm !== undefined && trainKm < 50) || (voitureKm !== undefined && voitureKm < 100)){
      setAlertMessage(message);
    } else {
      setAlertMessage('');
    }
  }
  
  function nextQuestion() {
    const currentQuestion = questionsList[currentQuestionIndex];

    if (currentQuestion.id === "grand_deplacement_avion" && response.grand_deplacement_avion === "oui") {
      const avionKm = response.grand_deplacement_avion_km;
      if (avionKm !== undefined && avionKm < 100) {
        showalert("La distance parcourue en avion doit être supérieure à 100 km.");
        return;
      }
    }

    if (currentQuestion.id === "grand_deplacement_train" && response.grand_deplacement_train === "oui") {
      const trainKm = response.grand_deplacement_train_km;
      if (trainKm !== undefined && trainKm < 50) {
        showalert("La distance parcourue en TGV doit être supérieure à 50 km.");
        return;
      }
    }

    if (currentQuestion.id === "grand_deplacement_voiture" && response.grand_deplacement_voiture === "oui") {
      const voitureKm = response.voiture_grand_deplacement_km;
      if (voitureKm !== undefined && voitureKm < 100) {
        showalert("La distance parcourue en voiture doit être supérieure à 100 km.");
        return;
      }
    }

    setErrorMessage('');
    setAlertMessage('');

    if (currentQuestionIsValid) {
      if (currentQuestionIndex + 1 < questionsList.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        if (onTerminateClicked) {
          onTerminateClicked(response);
        }
      }
    }
  }

  function previousQuestion() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }

  function handleCurrentQuestionValidity(valid) {
    setCurrentQuestionIsValid(valid);
  }

  function handleOnResponseChange(value) {
    setResponse({ ...response, ...value });
    if (onResponseChange) {
      onResponseChange(value);
    }

    // If the response changes from "oui" to "non", handle validation
    const currentQuestion = questionsList[currentQuestionIndex];
    if (currentQuestion && currentQuestion.type === "radio" && value[currentQuestion.id] === "non") {
      showalert("Vous devez répondre à toutes les questions obligatoires.");
    }
  }

  return (
    <BilanContainer>
      <BilanBox>
        <ContentContainer>
          {currentQuestionIndex != null && (
            <StepperComponent
              key="questionStepper"
              nbEtat={questionsList.length}
              currentQuestion={currentQuestionIndex + 1}
            />
          )}

          {currentQuestionIndex == null ? (
            <div>
              <WelcomeBilanComponent welcomeContent={welcomePageContent} />
              <Button onClick={start} bgColor="#28a745" hoverColor="#218838">Commencer</Button>
            </div>
          ) : (
            <div ref={questionRef}>
              {questionsList[currentQuestionIndex].id && (
                <QuestionComponent
                  key={questionsList[currentQuestionIndex].id}
                  isValid={handleCurrentQuestionValidity}
                  onResponseChange={handleOnResponseChange}
                  questionResponse={response}
                  question={questionsList[currentQuestionIndex]}
                  errorMessage={errorMessage}
                />
              )}

              {questionsList[currentQuestionIndex].list && questionsList[currentQuestionIndex].list.map((question) => (
                <QuestionComponent
                  key={question.id}
                  isValid={handleCurrentQuestionValidity}
                  onResponseChange={handleOnResponseChange}
                  questionResponse={response}
                  question={question}
                  errorMessage={errorMessage}
                />
              ))}

              {alertMessage && <AlertDiv>{alertMessage}</AlertDiv>} 
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                {currentQuestionIndex > 0 && (
                  <Button onClick={previousQuestion} bgColor="#17a2b8" hoverColor="#138496">Précédent</Button>
                )}
                <Button onClick={quit} bgColor="#dc3545" hoverColor="#c82333">Quitter</Button>
                <Button onClick={nextQuestion} bgColor="#28a745" hoverColor="#218838">
                  {currentQuestionIndex + 1 === questionsList.length ? "Terminer" : "Suivant"}
                </Button>
              </div>
            </div>
          )}
        </ContentContainer>

        <ImageContainer>
          <img
            src={currentQuestionIndex !== null ? questionsList[currentQuestionIndex].image : welcomePageContent.image}
            alt="Illustration"
          />
        </ImageContainer>
      </BilanBox>
    </BilanContainer>
  );
};

export default BilanComponent;

