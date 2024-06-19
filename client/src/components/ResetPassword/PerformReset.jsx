import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { KeyboardComponent } from "../KeyboardComponent/KeyboardComponent";
import logo from "../../img/logo.png";
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
const ResetContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
  animation: ${fadeIn} 1s ease-out;
  position: relative;
  overflow: hidden;
`;

const ResetContent = styled.div`
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

const Message = styled.p`
  font-size: 1em;
  color: ${(props) => (props.error ? "red" : "green")};
  text-align: center;
  margin-bottom: 20px;
`;

const CriteriaList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
`;

const CriteriaItem = styled.li`
  font-size: 1em;
  color: ${(props) => (props.valid ? "green" : "red")};
`;

const LogoImage = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: 20px;
`;

export const PerformReset = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [inputActive, setInputActive] = useState("");
  const [redirectDelay, setRedirectDelay] = useState(null);

  useEffect(() => {
    if (redirectDelay !== null) {
      const timer = setInterval(() => {
        setRedirectDelay((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            navigate("/login");
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [redirectDelay, navigate]);

  // Validations
  const isValidLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[@$!%*?&]/.test(password);

  const validatePassword = () => {
    if (
      !isValidLength ||
      !hasUpperCase ||
      !hasLowerCase ||
      !hasNumber ||
      !hasSpecialChar
    ) {
      setMessage("Le mot de passe ne respecte pas tous les critères requis.");
      return false;
    }

    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return false;
    }

    return true;
  };

  const handleResetPassword = async () => {
    if (!validatePassword()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiUrl}/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();
      setMessage(result.message);

      if (result.success) {
        setRedirectDelay(5);
      }
    } catch (error) {
      setMessage("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputFocus = (inputName) => {
    setInputActive(inputName);
    setKeyboardOpen(true);
  };

  const handleInputChange = (newValue) => {
    if (inputActive === "password") setPassword(newValue);
    else if (inputActive === "confirmPassword") setConfirmPassword(newValue);
  };

  return (
    <ResetContainer>
      <ResetContent>
        <LogoImage alt="Logo" src={logo} />
        <Title>Réinitialiser le mot de passe</Title>
        <InputContainer>
          <Label>Nouveau mot de passe</Label>
          <InputComponent
            question={{
              id: "password",
              type: "password",
              title: "Entrez votre nouveau mot de passe",
            }}
            inputType="password"
            value={{ password }}
            onFocus={() => handleInputFocus("password")}
            onValueChange={(newValue) => setPassword(newValue.password)}
          />
        </InputContainer>
        <CriteriaList>
          {[
            { test: isValidLength, text: "Au moins 8 caractères" },
            { test: hasUpperCase, text: "Une lettre majuscule" },
            { test: hasLowerCase, text: "Une lettre minuscule" },
            { test: hasNumber, text: "Un chiffre" },
            { test: hasSpecialChar, text: "Un caractère spécial (@$!%*?&)" },
          ].map(({ test, text }, index) => (
            <CriteriaItem key={index} valid={test}>
              {test ? "✅" : "❌"} {text}
            </CriteriaItem>
          ))}
        </CriteriaList>
        <InputContainer>
          <Label>Confirmez le mot de passe</Label>
          <InputComponent
            question={{
              id: "confirmPassword",
              type: "password",
              title: "Confirmez votre nouveau mot de passe",
            }}
            inputType="password"
            value={{ confirmPassword }}
            onFocus={() => handleInputFocus("confirmPassword")}
            onValueChange={(newValue) => setConfirmPassword(newValue.confirmPassword)}
          />
        </InputContainer>
        <Button onClick={handleResetPassword} disabled={isSubmitting}>
          {isSubmitting ? "⏳Réinitialisation..." : "Réinitialiser le mot de passe"}
        </Button>
        <Message error={message.startsWith("❌")}>
          {message}
          {redirectDelay !== null && !message.startsWith("❌") && (
            <span>
              {" "}
              Vous serez redirigé vers la page de connexion dans {redirectDelay}{" "}
              secondes.
            </span>
          )}
        </Message>
        <Button onClick={() => navigate("/login")}>Annuler</Button>
        {keyboardOpen && (
          <KeyboardComponent
            inputActive={inputActive}
            onInput={handleInputChange}
            onClose={() => setKeyboardOpen(false)}
          />
        )}
      </ResetContent>
    </ResetContainer>
  );
};
