// src/components/NavbarAdmin.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaChartBar, FaGlobe, FaGamepad, FaComments, FaSignInAlt, FaBars, FaArrowAltCircleDown } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { NavbarContainer, Container, Logo, Icon, NavLinks, NavLink, Button } from './StyledNavbar';

const NavbarAdmin = ({ transparent, toggleTheme }) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleLogout = async () => {
    await fetch(`${apiUrl}/logout`, {
      method: 'GET',
      credentials: 'include',
    });
    logout();
    navigate('/login');
  };

  return (
    <NavbarContainer transparent={transparent}>
      <Container>
        <div className="flex justify-between items-center w-full lg:w-auto">
          <Link to="/">
            <Logo src="https://c.animaapp.com/VcwknbTN/img/logo@2x.png" alt="Logo" />
          </Link>
          <button onClick={() => setNavbarOpen(!navbarOpen)} className="lg:hidden">
            <Icon transparent={transparent}><FaBars /></Icon>
          </button>
        </div>
        <NavLinks open={navbarOpen}>
          <NavLink transparent={transparent}>
            <Link to="/">
              <FaHome /> HOME
            </Link>
          </NavLink>
          <NavLink transparent={transparent}>
            <Link to="/statistiques">
              <FaChartBar /> STATISTIQUES
            </Link>
          </NavLink>
          <NavLink transparent={transparent}>
            <Link to="/jeux">
              <FaGamepad /> JEUX LUDIQUE
            </Link>
          </NavLink>
          <NavLink transparent={transparent}>
            <Link to="/planetes-et-limites">
              <FaGlobe /> PLANÈTES ET LIMITES
            </Link>
          </NavLink>
          <NavLink transparent={transparent}>
            <Link to="/add-avis">
              <FaComments /> AVIS
            </Link>
          </NavLink>
        </NavLinks>
        <div className="flex items-center">
          <Button onClick={() => navigate('/dashboard-admin')} transparent={transparent}>
            <FaArrowAltCircleDown /> Admin Page
          </Button>
          <Button onClick={handleLogout} transparent={transparent} style={{ marginLeft: '10px' }}>
            <FaSignInAlt /> LogOut
          </Button>
        </div>
      </Container>
    </NavbarContainer>
  );
};

export default NavbarAdmin;
