import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

const LogoImage = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: 20px;
`;

export const RequestReset = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  const handleInputFocus = (inputName) => {
    setInputActive(inputName);
    setKeyboardOpen(true);
  };

  const handleInputChange = (newValue) => {
    setMessage("");
    if (inputActive === "email") setEmail(newValue);
  };

  const handleResetPassword = async () => {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setMessage("🚫 Veuillez entrer une adresse e-mail valide.");
      return;
    }

    setIsLoading(true);
    setMessage("");
    try {
      const response = await fetch(`${apiUrl}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      setMessage(
        result.message ||
          "✅ Vérifiez votre boîte de réception pour les instructions de réinitialisation du mot de passe."
      );

      // Set redirect delay to 5 seconds
      setRedirectDelay(5);
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ResetContainer>
      <ResetContent>
        <LogoImage alt="Logo" src={logo} />
        <Title>Réinitialisation du mot de passe</Title>
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
        <Button onClick={handleResetPassword} disabled={isLoading}>
          {isLoading ? "⏳ Envoi en cours..." : "Envoyer les instructions"}
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
