// ModalComponent.js
import React from "react";
import {
  ModalOverlay,
  ModalContent,
  CloseButton,
  Title,
  Subtitle,
} from "./stylesBilanResult";
import InputComponent from "./inputComponent";
import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";

const ModalComponent = ({
  closeModal,
  handleMailChange,
  sendEmail,
  mailIsValid,
  emailSent,
  emailSentError,
  email,
  emailReset,
}) => (
  <ModalOverlay>
    <ModalContent>
      <CloseButton onClick={closeModal}>&times;</CloseButton>
      <Title>Envoyez vos résultats par email</Title>
      <Subtitle>
        N'oubliez pas d'envoyer vos résultats par email pour les conserver!
      </Subtitle>
      <InputComponent
        question={{
          id: "email",
          type: "email",
          title: "Votre adresse E-mail",
        }}
        inputType="email"
        value={{ email: email }}
        onValueChange={handleMailChange}
      />
      <button
        onClick={() => sendEmail(closeModal)}
        className="px-6 py-2 rounded bg-blue-500 text-white font-semibold mt-4"
      >
        Recevoir les résultats par email
      </button>
      {mailIsValid === false && (
        <div className="my-2 text-center text-red-700">
          <FaExclamationCircle /> Votre adresse email <b>{email}</b> est
          invalide, Merci de verifier votre adresse.
        </div>
      )}
      {emailSent && (
        <div className="my-2 text-center text-green-700">
          <FaCheckCircle /> Les résultats ont été envoyés avec succès à
          l'adresse e-mail <b>{email}</b>. Veuillez vérifier votre boîte de
          réception.
        </div>
      )}
      {emailSentError && (
        <div className="my-2 text-center text-red-700">
          <FaExclamationCircle /> Une erreur s'est produite lors de l'envoi
          d'email. Veuillez contacter un administrateur ou essayer à nouveau.
        </div>
      )}
    </ModalContent>
  </ModalOverlay>
);

export default ModalComponent;
