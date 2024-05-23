// src/components/StyledNavbar.js
import styled, { keyframes } from 'styled-components';

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

export const NavbarContainer = styled.nav`
  ${(props) => props.transparent ? "top-0 absolute z-50 w-full" : "relative bg-white shadow-lg"}
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  transition: all 0.3s ease;
`;

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Logo = styled.img`
  height: 40px;
  animation: ${fadeIn} 1s ease-in-out;
`;

export const Icon = styled.div`
  font-size: 2rem;
  color: ${props => (props.transparent ? "#fff" : props.theme.color)};
`;

export const NavLinks = styled.ul`
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

export const NavLink = styled.li`
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

export const Button = styled.button`
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
