import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import { ThemeProvider } from 'styled-components';
import { AuthProvider, useAuth } from "./context/AuthContext";
import { lightTheme, darkTheme } from './themes';
import { RequestReset } from './components/ResetPassword/RequestReset';
import { PerformReset } from "./components/ResetPassword/PerformReset";
import { Login } from "./components/Login/Login";
import Statistiques from "./components/Statis"; 
import LockPage from "./components/LockPage/LockPage";
// import Navbar from "./components/Navbar"; // Import Navbar

import { Accueil4 } from "./views/Accueil4";
import BilanExpressView from "./views/bilanExpressView";
import BilanNormalView from "./views/bilanNormalView";
import { AdminScreen } from "./views/AdminScreen";
import { StatsScreen } from "./views/StatsScreen";
import { AvisScreen } from "./views/AvisScreen";

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
  const [theme, setTheme] = useState(lightTheme);

/*   const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  }; */

  return (
    // <ThemeProvider theme={theme}>
      <div style={{ background: theme.background, color: theme.color, minHeight: '100vh' }}>
        <AuthProvider>
          <LockPage />
          {/* <Navbar toggleTheme={toggleTheme} />  */}
          <Routes>
            <Route path="/" element={<Accueil4 />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-avis" element={<AddAvis/>}/>
            <Route path="/dashboard-admin" element={<ProtectedRoute><AdminScreen /></ProtectedRoute>} />
            <Route path="/data-stats" element={<ProtectedRoute><StatsScreen /></ProtectedRoute>} />
            <Route path="/data-avis" element={<ProtectedRoute><AvisScreen /></ProtectedRoute>} />
            <Route path="/resetPassword" element={<RequestReset />} />
            <Route path="/reset-password/:token" element={<PerformReset />} />
            <Route path="/bilan/normal" element={<BilanNormalView />} />
            <Route path="/bilan/express" element={<BilanExpressView />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/statistiques" element={<Statistiques/>} />
          </Routes>
        </AuthProvider>
      </div>
    // </ThemeProvider>
  );
};

export default App;
