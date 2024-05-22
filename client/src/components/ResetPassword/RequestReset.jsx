import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { KeyboardComponent } from "../KeyboardComponent/KeyboardComponent"; // Importez le composant du clavier
import "./RequestReset.css";

export const RequestReset = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false); // Ajoutez cet état pour gérer le clavier virtuel

  const handleInputChange = (value) => {
    setEmail(value);
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
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="request-reset-container">
      <h1>Réinitialisation du mot de passe</h1>
      <p>
        Veuillez entrer votre adresse e-mail pour recevoir les instructions de
        réinitialisation du mot de passe.
      </p>
      <input
        className="email-input"
        type="email"
        placeholder="Adresse e-mail"
        value={email}
        onFocus={() => {
          setEmail("");
          setKeyboardOpen(true);
        }}
      />
      <button
        className="submit-button"
        onClick={handleResetPassword}
        disabled={isLoading}
      >
        {isLoading ? "⏳ Envoi en cours..." : "Envoyer les instructions"}
      </button>
      <p className="message">{message}</p>
      {message.startsWith("✅") && (
        <button className="go-back-button" onClick={() => navigate("/login")}>
          Retour à la connexion
        </button>

      )}
      {keyboardOpen && (
        <KeyboardComponent
          onInput={handleInputChange}
          onClose={() => setKeyboardOpen(false)}
        />
      )}
    </div>
  );
};