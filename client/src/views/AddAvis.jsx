import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import NavbarAdmin from "../components/NavbarAdmin";
import Footer from '../components/Footer';
import { useAuth } from "../context/AuthContext";
import { KeyboardComponent } from "../components/KeyboardComponent/KeyboardComponent";
import styled, { keyframes, ThemeProvider } from "styled-components";
import backgroundImage from "../img/image.png"; // Ajoutez une image de fond en rapport avec l'écologie
import { lightTheme, darkTheme } from '../themes';

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: url(${backgroundImage}) no-repeat center center fixed;
  background-size: 200% 100%;
  animation: gradientAnimation 15s ease infinite;

  @keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const MainContent = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 1s ease-out;
  padding: 20px;
`;

const FormContainer = styled.form`
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h1`
  font-family: 'Outfit', Helvetica, sans-serif;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);  // Increased shadow for better contrast
  font-size: 4rem;
  margin-bottom: 20px;
  animation: ${fadeIn} 1s ease-in-out;
`;

const Label = styled.label`
  display: block;
  font-size: 1.2em;
  color: #333;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  outline: none;
  transition: border 0.3s;

  &:focus {
    border-color: #1a2a6c;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  outline: none;
  transition: border 0.3s;

  &:focus {
    border-color: #1a2a6c;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  outline: none;
  transition: border 0.3s;
  height: 150px;

  &:focus {
    border-color: #1a2a6c;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px 20px;
  font-size: 1.2em;
  font-weight: bold;
  color: #fff;
  background: #1a2a6c;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
  margin-top: 10px;

  &:hover {
    background: #0d185b;
    transform: scale(1.05);
  }
`;

export const AddAvis = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [comment, setComment] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(lightTheme);

  // Récupérer le numéro de nom de localStorage, ou utiliser 1 par défaut
  const [nameNumber, setNameNumber] = useState(() => Number(localStorage.getItem('nameNumber')) || 1);

  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [inputName, setInputName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name === '') {
      setName(`# ${nameNumber}`);
    }

    try {
      const response = await axios.post(`${apiUrl}/avis/AddAvis`, { name, type, comment });
      setNameNumber(nameNumber + 1);
      localStorage.setItem('nameNumber', nameNumber + 1);
      setFormSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNameClick = () => {
    if (name === `# ${nameNumber}`) {
      setName('');
    }
  };

  const handleInputChange = (value) => {
    if (inputName === "name") setName(value);
    else if (inputName === "comment") setComment(value);
  };

  useEffect(() => {
    if (formSubmitted) {
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  }, [formSubmitted]);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        {isAuthenticated ? <NavbarAdmin /> : <Navbar toggleTheme={toggleTheme} />}
        <PageContainer>
          <MainContent>
            {formSubmitted ? (
              <div className="flex flex-col items-center justify-center mt-20 mb-20">
                <Title>Votre avis a bien été enregistré</Title>
              </div>
            ) : (
              <>
                <Title>Ajouter un Avis</Title>
                <FormContainer onSubmit={handleSubmit}>
                  <div>
                    <Label htmlFor="name">Nom:</Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      placeholder={name === '' ? `# ${nameNumber}` : ''}
                      onClick={handleNameClick}
                      onChange={e => setName(e.target.value)}
                      onFocus={() => {
                        setInputName("name");
                        setKeyboardOpen(true);
                      }}
                    />
                  </div>
                  <div className="relative">
                    <Label htmlFor="type">Type:</Label>
                    <Select id="type" value={type} onChange={(e) => setType(e.target.value)} required>
                      <option value="">Select...</option>
                      <option value="Jeu">Jeu</option>
                      <option value="Calculateur">Calculateur</option>
                      <option value="Autres">Autres</option>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="comment">Commentaire:</Label>
                    <Textarea
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                      onFocus={() => {
                        setInputName("comment");
                        setKeyboardOpen(true);
                      }}
                    />
                  </div>
                  <SubmitButton type="submit">Ajouter Avis</SubmitButton>
                </FormContainer>
              </>
            )}
          </MainContent>
          {keyboardOpen && (
            <KeyboardComponent
              inputActive={inputName}
              onInput={handleInputChange}
              onClose={() => setKeyboardOpen(false)}
            />
          )}
          {/* <Footer /> */}
        </PageContainer>
      </>
    </ThemeProvider>
  );
};
