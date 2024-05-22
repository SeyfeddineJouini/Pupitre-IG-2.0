import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

export const Profile = () => {
   const { admin: currentAdmin } = useSelector((state) => state.auth);

  if (!currentAdmin) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentAdmin.nom}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentAdmin.accessToken.substring(0, 20)} ...{" "}
        {currentAdmin.accessToken.substr(currentAdmin.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentAdmin.id}
      </p>
      <p>
        <strong>Email:</strong> {currentAdmin.email}
      </p>
    </div>
  );
};
