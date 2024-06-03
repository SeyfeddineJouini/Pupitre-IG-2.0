import React, { useState } from "react"; import { Routes, Route, Navigate } from "react-router-dom"; 
// import { ThemeProvider } from 'styled-components'; 
import { AuthProvider, useAuth } from "./context/AuthContext"; 
import { lightTheme, darkTheme } from './themes'; 
import { RequestReset } from './components/ResetPassword/RequestReset'; 
import { PerformReset } from "./components/ResetPassword/PerformReset"; 
import { Login } from "./components/Login/Login";  
import Statistiques from "./components/Statis"; 
import LockPage from "./components/LockPage/LockPage"; 
// import Navbar from "./components/Navbar"; 
import {Accueil4} from "./views/Accueil4"; 
import BilanExpressView from "./views/bilanExpressView"; 
import BilanNormalView from "./views/bilanNormalView"; 
import { AdminScreen } from "./views/AdminScreen"; 
import { StatsScreen } from "./views/StatsScreen"; 
import { AvisScreen } from "./views/AvisScreen"; 
import "./App.css"; import { AddAvis } from "./views/AddAvis";
import { InactivityProvider } from './views/InactivityHandler';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/Accueil4" replace />;
};

const App = () => {
  const [theme, setTheme] = useState(lightTheme);

  return (
    <div style={{ background: theme.background, color: theme.color, minHeight: '100vh' }}>
      <AuthProvider>
      <InactivityProvider>
        <LockPage />
        <Routes>
          <Route path="/" element={<Accueil4 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-avis" element={<AddAvis />} />
          <Route path="/dashboard-admin" element={<ProtectedRoute><AdminScreen /></ProtectedRoute>} />
          <Route path="/data-stats" element={<ProtectedRoute><StatsScreen /></ProtectedRoute>} />
          <Route path="/data-avis" element={<ProtectedRoute><AvisScreen /></ProtectedRoute>} />
          <Route path="/resetPassword" element={<RequestReset />} />
          <Route path="/reset-password/:token" element={<PerformReset />} />
          <Route path="/bilan/normal" element={<BilanNormalView />} />
          <Route path="/bilan/express" element={<BilanExpressView />} />
          <Route path="/statistiques" element={<Statistiques />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        </InactivityProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
