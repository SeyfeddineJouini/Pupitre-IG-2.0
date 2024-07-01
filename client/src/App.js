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
import { InactivityProvider, useInactivity } from './views/InactivityHandler';
import PlanetesEtLimites from './views/PlanetesEtLimites'; // Importer le nouveau composant
import StudentProjects from './components/StudentProjects/StudentProjects'; // Importer le nouveau composant
import ProjectDetails from './components/StudentProjects/ProjectDetails'; // Importer le nouveau composant
import AddProject from './components/StudentProjects/AddProject'; // Importer le nouveau composant
import { ProjectProvider } from "../src/components/StudentProjects/ProjectContext"; // Importer le nouveau composant




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
          <Route path="/statistiques" element={<Statistiques />} />
          <Route path="/planetes-et-limites" element={<PlanetesEtLimites />} />
          <Route path="/projects" element={<StudentProjects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/add-project" element={<ProtectedRoute><AddProject /></ProtectedRoute>} />
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
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
