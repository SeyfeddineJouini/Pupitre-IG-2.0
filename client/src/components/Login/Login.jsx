import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Email } from "../../components/Email/Email";
import "./Login.css";
import { KeyboardComponent } from "../KeyboardComponent/KeyboardComponent";
import { Footer } from "../Footer/Footer";
import { Link } from 'react-router-dom';

import man from "../../img/man-working.png";
import logo from "../../img/logo.png";
import ellipse from "../../img/ellipse-1.svg";
import message from "../../img/message-1.svg";
import padlock from "../../img/padlock-1.svg";
import homeIcon from "../../img/home-icon.svg";

import { useAuth } from "../../context/AuthContext";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [inputName, setInputName] = useState("");
  const [layoutName, setLayoutName] = useState("default");

  const { login } = useAuth(); // Ajoutez cette ligne

  const handleLoginClick = async (event) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    event.preventDefault();
    /*console.log(
      `Tentative de connexion avec l'email : ${email} et le mot de passe : ${password}`
    );*/
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
      //console.log("Réponse de l'API :", result);
      if (result.success) {
        //console.log("Connexion réussie. Redirection vers le tableau de bord.");
        login(); // Ajoutez cette ligne
        navigate("/dashboard-admin");
      } else {
        //console.log("Échec de la connexion. Identifiants invalides.");
        setErrorMessage("Le mot de passe ou l'e-mail est incorrect");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setErrorMessage(
        "Une erreur est survenue lors de la connexion. Veuillez réessayer."
      );
    }
  };

  const handleForgotPasswordClick = () => {
    navigate("/resetPassword");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const [inputActive, setInputActive] = useState("");

  const handleInputFocus = (inputName) => {
    console.log("Fermeture du clavier existant et réinitialisation des valeurs.");
    setKeyboardOpen(false); // Ferme le clavier précédent
    if (inputName === "email") setEmail(''); // Réinitialise la valeur de l'email si le focus est sur l'email
    else if (inputName === "password") setPassword(''); // Réinitialise la valeur du mot de passe si le focus est sur le mot de passe
    setInputActive(inputName); // Définit le nouveau champ actif
    setTimeout(() => {
        setKeyboardOpen(true); // Ouvre le nouveau clavier après une légère attente
    }, 100); // Retarder légèrement l'ouverture pour assurer la réinitialisation
};


const handleInputChange = (newValue) => {
  setErrorMessage(""); // Réinitialise le message d'erreur
  if (inputActive === "email") setEmail(newValue);
  else if (inputActive === "password") setPassword(newValue);
};

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-content">
          <div className="login-inner-content">
            <div className="login-form-container">
              <div className="login-form">
                <div className="login-form-inner">
                  <button onClick={handleLoginClick} className="login-button">
                    <div className="login-button-inner">
                      <div className="login-button-text">Login</div>
                    </div>
                  </button>
                  <button onClick={handleHomeClick} className="home-button">
                    <img src={homeIcon} alt="Home" /> Retour à l'accueil
                  </button>
                  <div className="error-message">{errorMessage}</div>
                  <div
                    className="forgot-password"
                    onClick={handleForgotPasswordClick}
                  >
                    <div className="forgot-password-text">
                      Mot de passe oublié
                    </div>
                  </div>
                  <div className="password-input-container">
                    <div className="password-input">
                      <div className="password-label">Mot de passe</div>
                      <div className="password-line" />
                      <div className="password-field">
                        <input
                          className="password-placeholder"
                          type="password"
                          placeholder="Entrer votre Mot de passe"
                          value={password}
                          onFocus={() => handleInputFocus("password")}
                        />
                        <img
                          className="password-icon"
                          alt="Padlock"
                          src={padlock}
                        />
                      </div>
                    </div>
                    <div className={`email-container email-input-l`}>
                      <div className="email-label">Email</div>
                      <input
                        className="email-input-l"
                        type="email"
                        placeholder="Entrez votre mail"
                        value={email}
                        onFocus={() => handleInputFocus("email")}
                      />
                      <div className="email-line" />
                      <img className="email-icon" alt="Message" src={message} />
                    </div>
                  </div>
                  {keyboardOpen && (
                    <KeyboardComponent
                    inputActive={inputActive}
                    onInput={handleInputChange}
                    onClose={() => setKeyboardOpen(false)}
                />
                  )}
                </div>
                <div className="admin-login">
                  <div className="admin-login-text">Connexion Admin</div>
                </div>
              </div>
            </div>
            <img className="ellipse-image" alt="Ellipse" src={ellipse} />
            <img className="working-man-image" alt="Man working" src={man} />
          </div>
          <Link to="/">
            <img className="logo-image" alt="Logo" src={logo} />
          </Link>
        </div>
      </div>
    </div>
  );
};