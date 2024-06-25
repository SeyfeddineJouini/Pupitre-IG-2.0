import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { lightTheme, darkTheme } from './themes';
import { RequestReset } from './components/ResetPassword/RequestReset';
import { PerformReset } from "./components/ResetPassword/PerformReset";
import { Login } from "./components/Login/Login";
import Statistiques from "./components/Statis";
import LockPage from "./components/LockPage/LockPage";
import { Accueil4 } from "./views/Accueil4";
import BilanExpressView from "./views/bilanExpressView";
import BilanNormalView from "./views/bilanNormalView";
import { AdminScreen } from "./views/AdminScreen";
import { StatsScreen } from "./views/StatsScreen";
import { AvisScreen } from "./views/AvisScreen";
import "./App.css";
import { AddAvis } from "./views/AddAvis";
import { InactivityProvider, useInactivity } from './views/InactivityHandler';
import PlanetesEtLimites from './views/PlanetesEtLimites';
import Screensaver from './components/ScreenSaver/ScreenSaver'; // Import the Screensaver component

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/Accueil4" replace />;
};

const AppContent = () => {
  const { isScreensaverActive } = useInactivity();
  const [theme, setTheme] = useState(lightTheme);

  return (
    <div style={{ background: theme.background, color: theme.color, minHeight: '100vh' }}>
      {isScreensaverActive && <Screensaver />}
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
        <Route path="/planetes-et-limites" element={<PlanetesEtLimites />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <InactivityProvider>
        <AppContent />
      </InactivityProvider>
    </AuthProvider>
  );
};

export default App;
