import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from 'styled-components';
import { FaHome, FaChartBar, FaGamepad, FaComments, FaSignInAlt, FaBars, FaMoon, FaSun } from 'react-icons/fa';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const NavbarContainer = styled.nav`
  ${(props) => props.transparent ? "top-0 absolute z-50 w-full" : "relative bg-white shadow-lg"}
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-between;
  padding: 2rem;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  transition: all 0.3s ease;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-between;
  align-items: center;
  width: 100%;
`;

const Logo = styled.img`
  height: 40px;
  animation: ${fadeIn} 1s ease-in-out;
`;

const Icon = styled.div`
  font-size: 2rem;
  color: ${props => (props.transparent ? "#fff" : props.theme.color)};
`;

const NavLinks = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin-right: auto;
  animation: ${fadeIn} 1s ease-in-out;
  ${props => props.open && "display: block;"}
  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const NavLink = styled.li`
  margin: 0.5rem 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  animation: ${fadeIn} 1.2s ease-in-out;
  position: relative;
  a {
    color: ${props => (props.transparent ? "#fff" : props.theme.color)};
    text-decoration: none;
    &:hover {
      color: ${props => props.theme.linkColor};
      text-decoration: underline;
      &::after {
        width: 100%;
      }
    }
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -5px;
      width: 0;
      height: 2px;
      background: ${props => props.theme.linkColor};
      transition: width 0.3s ease;
    }
  }
`;


const Button = styled.button`
  background: ${props => (props.transparent ? "white" : "#FF69B4")};
  color: ${props => (props.transparent ? "#333" : "white")};
  font-weight: bold;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: ${props => (props.transparent ? "#e0e0e0" : "#FF1493")};
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }
`;

const Navbar = ({ transparent, toggleTheme }) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async () => {
    navigate('/login');
  }

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
            <Link to="/add-avis">
              <FaComments /> AVIS
            </Link>
          </NavLink>
        </NavLinks>
        <div className="flex items-center">
          <Button onClick={handleLogin} transparent={transparent}>
            <FaSignInAlt /> Login
          </Button>
          <Button onClick={toggleTheme} transparent={transparent} style={{ marginLeft: '10px' }}>
            {transparent ? <FaSun /> : <FaMoon />}
          </Button>
        </div>
      </Container>
    </NavbarContainer>
  );
};

export default Navbar;
