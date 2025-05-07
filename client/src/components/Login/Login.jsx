import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { KeyboardComponent } from "../KeyboardComponent/KeyboardComponent";
import logo from "../../img/logo.png";
import homeIcon from "../../img/home-icon.svg";
import { useAuth } from "../../context/AuthContext";
import InputComponent from "../bilan/inputComponent";

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Styled Components
const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
  animation: ${fadeIn} 1s ease-out;
  position: relative;
  overflow: hidden;
`;

const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 100%;
  z-index: 2;
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: #1a2a6c;
  animation: ${pulse} 2s infinite;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 1.2em;
  color: #333;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  outline: none;
  transition: border 0.3s;

  &:focus {
    border-color: #1a2a6c;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px 20px;
  font-size: 1.2em;
  font-weight: bold;
  color: #fff;
  background: #1a2a6c;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
  margin-bottom: 10px;

  &:hover {
    background: #0d185b;
    transform: scale(1.05);
  }
`;

const HomeButton = styled(Button)`
  background: #d9534f;

  &:hover {
    background: #c9302c;
  }

  img {
    margin-right: 8px;
  }
`;

const ForgotPassword = styled.div`
  font-size: 0.9em;
  color: #333;
  margin-bottom: 20px;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #1a2a6c;
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 20px;
`;

const Icon = styled.div`
  width: 60px;
  height: 60px;
  background: #1a2a6c;
  color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const LogoImage = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: 20px;
`;

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  // const [inputName, setInputName] = useState("");
  const [inputActive, setInputActive] = useState("");

  const handleLoginClick = async (event) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    event.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("La réponse du réseau n'était pas correcte");
      }

      const result = await response.json();
      if (response.ok && result.success) {
        login();
        navigate("/dashboard-admin");
      } else {
        setErrorMessage("Le mot de passe ou l'e-mail est incorrect");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setErrorMessage("Une erreur est survenue lors de la connexion. Veuillez réessayer.");
    }
  };

  const handleForgotPasswordClick = () => {
    navigate("/resetPassword");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleInputFocus = (inputName) => {
    setInputActive(inputName);
    setKeyboardOpen(true);
  };

  const handleInputChange = (newValue) => {
    setErrorMessage("");
    if (inputActive === "email") setEmail(newValue);
    else if (inputActive === "password") setPassword(newValue);
  };

  return (
      <LoginContainer>
        <LoginContent>
          <LogoImage alt="Logo" src={logo} />
          <Title>Connexion Admin</Title>
          <InputContainer>
            <Label>Email</Label>
            <InputComponent
              question={{
                id: "email",
                type: "email",
                title: "Votre adresse E-mail",
              }}
              inputType="email"
              value={{ email }}
              onFocus={() => handleInputFocus("email")}
              onValueChange={(newValue) => setEmail(newValue.email)}
            />
          </InputContainer>
          <InputContainer>
            <Label>Mot de passe</Label>
            <InputComponent
              question={{
                id: "password",
                type: "password",
                title: "Votre mot de passe",
              }}
              inputType="password"
              value={{ password }}
              onFocus={() => handleInputFocus("password")}
              onValueChange={(newValue) => setPassword(newValue.password)}
            />
          </InputContainer>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <Button onClick={handleLoginClick}>Login</Button>
          <HomeButton onClick={handleHomeClick}>
            <img src={homeIcon} alt="Home" /> Retour à l'accueil
          </HomeButton>
          <ForgotPassword onClick={handleForgotPasswordClick}>Mot de passe oublié</ForgotPassword>
          {keyboardOpen && (
            <KeyboardComponent
              inputActive={inputActive}
              onInput={handleInputChange}
              onClose={() => setKeyboardOpen(false)}
            />
          )}
          <IconContainer>
            <Icon>
              <i className="fas fa-leaf"></i>
            </Icon>
            <Icon>
              <i className="fas fa-wind"></i>
            </Icon>
            <Icon>
              <i className="fas fa-solar-panel"></i>
            </Icon>
          </IconContainer>
        </LoginContent>
      </LoginContainer>
  );
};
