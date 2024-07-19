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
import BilanExpressView from "./views/bilanExpressView.jsx"; 
import BilanNormalView from "./views/bilanNormalView.jsx"; 
import BilanLongView from "./views/BilanLongView.jsx";  
import { AdminScreen } from "./views/AdminScreen"; 
import { StatsScreen } from "./views/StatsScreen"; 
import { AvisScreen } from "./views/AvisScreen"; 
import "./App.css"; import { AddAvis } from "./views/AddAvis";
import { InactivityProvider, useInactivity } from './views/InactivityHandler';
import PlanetesEtLimites from './views/PlanetesEtLimites'; // Importer le nouveau composant
import StudentProjects from './components/StudentProjects/StudentProjects'; // Importer le nouveau composant
import ProjectDetails from './components/StudentProjects/ProjectDetails'; // Importer le nouveau composant
import AddProject from './components/StudentProjects/AddProject'; // Importer le nouveau composant
import { ProjectProvider } from "../src/components/StudentProjects/ProjectContext"; // Importer le nouveau composant
import GameSelection from './views/Jeu';
import CrosswordUI from './components/Jeux/MotsCroisés'
import EcoGame from './components/EcoGame'; // Importez le composant EcoGame
import GameGrid from './components/GameGrid'; // Importez le composant GameGrid




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
      <AuthProvider>
      <ProjectProvider>
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
          <Route path="/bilan/long" element={<BilanLongView />} />
          <Route path="/statistiques" element={<Statistiques />} />
          <Route path="/planetes-et-limites" element={<PlanetesEtLimites />} />
          <Route path="/projects" element={<StudentProjects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/add-project" element={<ProtectedRoute><AddProject /></ProtectedRoute>} />
          <Route path="/jeux-ludiques" element={<GameSelection />} />
          <Route path="/jeux-ludiques/mots-croisés" element={<CrosswordUI />} />
          <Route path="/jeux-ludiques/recycling-waste" element={<EcoGame gameUrl="https://www.turtlediary.com/game/recycling-waste.html" />} />
          <Route path="/jeux-ludiques/trivia" element={<EcoGame gameUrl="https://koikiwi.gamescaptain.com/trivia/index.html?show=navigation" />} />
          <Route path="/jeux-ludiques/autres-jeux" element={<GameGrid />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        </InactivityProvider>
        </ProjectProvider>
      </AuthProvider>
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
