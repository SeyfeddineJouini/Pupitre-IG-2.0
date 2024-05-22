import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import { RequestReset } from './components/ResetPassword/RequestReset';
import { PerformReset } from "./components/ResetPassword/PerformReset";
import { Login } from "./components/Login/Login";
import Statistiques from "./components/Statis"; 

import { Accueil4 } from "./views/Accueil4";
import BilanExpressView from "./views/bilanExpressView";
import BilanNormalView from "./views/bilanNormalView";
import { AdminScreen } from "./views/AdminScreen";
import {StatsScreen} from "./views/StatsScreen";
import {AvisScreen} from "./views/AvisScreen";

import "./App.css";
import { AddAvis } from "./views/AddAvis";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Accueil4 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-avis" element={<AddAvis/>}/>
        
        <Route
          path="/dashboard-admin"
          element={
            <ProtectedRoute>
              <AdminScreen />
            </ProtectedRoute>
          }
        />
        
          <Route
          path="/data-stats"
          element={
            <ProtectedRoute>
              <StatsScreen />
            </ProtectedRoute>
          }
        />

          <Route
          path="/data-avis"
          element={
            <ProtectedRoute>
              <AvisScreen />
            </ProtectedRoute>
          }
        />
        <Route path="/resetPassword" element={<RequestReset />} />
        <Route path="/reset-password/:token" element={<PerformReset />} />
        <Route path="/bilan/normal" element={<BilanNormalView />} />
        <Route path="/bilan/express" element={<BilanExpressView />} />
        <Route path="*" element={<Navigate to="/" />} />

        <Route path="/statistiques" element={<Statistiques/>} />
      </Routes>
    </AuthProvider>
    
  );
};

export default App;
