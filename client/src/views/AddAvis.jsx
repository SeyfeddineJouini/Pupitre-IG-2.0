import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import NavbarAdmin from "../components/NavbarAdmin";
import Footer from '../components/Footer';
import { useAuth } from "../context/AuthContext";
import { KeyboardComponent } from "../components/KeyboardComponent/KeyboardComponent";

export const AddAvis = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [comment, setComment] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Récupérer le numéro de nom de localStorage, ou utiliser 1 par défaut
  const [nameNumber, setNameNumber] = useState(() => Number(localStorage.getItem('nameNumber')) || 1);

  const [keyboardOpen, setKeyboardOpen] = useState(false); // Add this state
  const [inputName, setInputName] = useState(""); // Add this state

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Si le nom est vide, utiliser le numéro de nom
    if (name === '') {
      setName(`# ${nameNumber}`);
    }

    try {
      const response = await axios.post(`${apiUrl}/avis/AddAvis`, { name, type, comment });
      //console.log(response.data); // Le nouvel avis retourné par l'API
      setNameNumber(nameNumber + 1); // Incrémenter le numéro de nom
      localStorage.setItem('nameNumber', nameNumber + 1); // Stocker le numéro de nom dans localStorage
      setFormSubmitted(true); // Mettre à jour l'état pour afficher un message de confirmation
    } catch (error) {
      console.error(error);
    }
  };

  const handleNameClick = () => {
    if (name === `# ${nameNumber}`) {
      setName('');
    }
  };

  const handleInputChange = (value) => { // Add this function
    if (inputName === "name") setName(value);
    else if (inputName === "comment") setComment(value);
  };

  // Rediriger l'utilisateur vers la page d'accueil après 1 secondes
  useEffect(() => {
    if (formSubmitted) {
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  }, [formSubmitted]);

  return (
    <>
    <div className="flex flex-col min-h-screen">
    {isAuthenticated ? <NavbarAdmin /> : <Navbar />}
      <main className="flex-grow">
      {formSubmitted ? (
        <div className="flex flex-col items-center justify-center mt-20 mb-20">
          <h1 className="text-4xl font-bold text-center">Votre avis a bien été enregistré</h1>
        </div>
      ) : (
      <><h1 className="text-center text-3xl font-semibold mt-10">Add Avis</h1><form onSubmit={handleSubmit} className="w-full max-w-xs mx-auto space-y-3">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                Type:
              </label>
              <select className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="type" value={type} onChange={(e) => setType(e.target.value)} required>
                <option value="">Select...</option>
                <option value="Jeu">Jeu</option>
                <option value="Calculateur">Calculateur</option>
                <option value="Autres">Autres</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M10 12l-6-6h12l-6 6z" />
                </svg>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">
                Comment:
              </label>
              <textarea className="shadow appearance-none border rounded w-full h-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="comment" 
              value={comment} 
              onChange={(e) => setComment(e.target.value)} required 
              onFocus={() => {
                setInputName("comment");
                setKeyboardOpen(true);
              }}
              />
            </div>
            <div>
              <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Add Avis
              </button>
            </div>
          </form></>
        )}
        </main>
      </div>
      {keyboardOpen && (
        <KeyboardComponent
          inputActive={inputName}
          onInput={handleInputChange}
          onClose={() => setKeyboardOpen(false)}
        />
      )}
    </>
    
  );
};
