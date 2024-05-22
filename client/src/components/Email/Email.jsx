import React from "react";
import './Email.css';
import message from "../../img/message-1.svg";

export const Email = ({ classN }) => {
  return (
    <div className={`email-container ${classN}`}>
      <div className="email-label">
        Email
      </div>
      <input 
        className="email-input"
        type="email" 
        placeholder="Entrez votre mail" 
      />
      <div className="email-line" />
      <img className="email-icon" alt="Message" src={message} />
    </div>
  );
};