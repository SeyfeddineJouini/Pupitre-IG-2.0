import React, { useState, useEffect } from "react";
import NavbarAdmin from "../components/NavbarAdmin";
import Footer from "../components/Footer";
import axios from 'axios';
import { Link } from "react-router-dom";
import { FaComments, FaChartBar, FaTachometerAlt } from "react-icons/fa";

export const AvisScreen = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  // pour le menu toggle 
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuOpen(!isMenuOpen);
  };

  // pour recuperer les avis
  const [avis, setAvis] = useState([]);

  // 'asc' pour croissant, 'desc' pour décroissant
  const [sortOrder, setSortOrder] = useState('desc'); 

  // 'all' pour tous les types, 'calculateur' pour seulement les avis de type 'calculateur'
  const [filterType, setFilterType] = useState('all'); 

  const fetchAvis = async () => {
    try {
      const response = await axios.get(`${apiUrl}/avis/GetAvis`);
      let data = response.data;

      if (sortOrder === 'desc') {
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else {
        data.sort((a, b) => new Date(a.date) - new Date(b.date));
      }

      if (filterType === 'Calculateur') {
        data = data.filter(avis => avis.type === 'Calculateur');
      }
      if (filterType === 'Jeu') {
        data = data.filter(avis => avis.type === 'Jeu');
      }
      if (filterType === 'Autres') {
        data = data.filter(avis => avis.type === 'Autres');
      }

      setAvis(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAvis();
  }, [sortOrder, filterType]);

  // ------------------pour la pagination------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [avisPerPage] = useState(10);
  // Calculer le nombre total de pages
  const totalPages = Math.ceil(avis.length / avisPerPage);

  // Créer un tableau pour les numéros de page
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  // Calculer le premier et le dernier avis pour la page actuelle
  const indexOfLastAvis = currentPage * avisPerPage;
  const indexOfFirstAvis = indexOfLastAvis - avisPerPage;
  const currentAvis = avis.slice(indexOfFirstAvis, indexOfLastAvis);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterType]);

  const handleDelete = async (id) => {
    const avisToDelete = avis.find(a => a._id === id);
    const confirmation = window.confirm(`Voulez-vous vraiment supprimer l'avis suivant ?\nNom d'utilisateur: ${avisToDelete.name}\nMode: ${avisToDelete.type}\nMessage: ${avisToDelete.comment}\nDate: ${avisToDelete.date}`);
    
    if (confirmation) {
      try {
        await axios.delete(`${apiUrl}/avis/DeleteAvis/${id}`);
        fetchAvis();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarAdmin className="navbar" />
      <div className="flex flex-grow">
        <aside className={`sidebar ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
          <button 
            onClick={handleMenuOpen} 
            className="md:hidden flex flex-col w-8 h-8 justify-around items-center bg-green-700 rounded p-1 cursor-pointer"
          >
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
          </button>
          <ul>
            <li>
              <Link to="/data-avis" className="flex items-center px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-800">
                <FaComments className="mr-2" /> Gestion Avis
              </Link>
            </li>
            <li>
              <Link to="/data-stats" className="flex items-center px-3 py-2 bg-green-600 text-white rounded hover:bg-green-800">
                <FaChartBar className="mr-2" /> Gestion Stats
              </Link>
            </li>
            <li>
              <Link to="/dashboard-admin" className="flex items-center px-3 py-2 bg-red-600 text-white rounded hover:bg-red-800">
                <FaTachometerAlt className="mr-2" /> Dashboard Admin
              </Link>
            </li>
          </ul>
        </aside>
        <main className="main-content">
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">GESTION DES AVIS</h2>
            <div className="flex justify-end items-center mb-4 space-x-2">
              <span className="font-bold">Filtrage :</span>
              <select 
                value={sortOrder} 
                onChange={(e) => setSortOrder(e.target.value)}
                className="border rounded p-2 shadow"
              >
                <option value="desc">Date: Ordre décroissant</option>
                <option value="asc">Date: Ordre croissant</option>
              </select>

              <span className="font-bold">Type :</span>
              <select 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value)}
                className="border rounded p-2 shadow"
              >
                <option value="all">Tous les types</option>
                <option value="Calculateur" className="text-yellow-500">Calculateur</option>
                <option value="Jeu" className="text-green-500">Jeu</option>
                <option value="Autres" className="text-blue-500">Autres</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {currentAvis.map((avis, index) => (
                <div key={index} className="card">
                  <div className="card-title">{avis.name}</div>
                  <div className={`badge ${avis.type === 'Jeu' ? 'green-badge' : avis.type === 'Calculateur' ? 'yellow-badge' : 'blue-badge'}`}>
                    {avis.type}
                  </div>
                  <div className="mt-4">
                    <details className="group">
                      <summary className="cursor-pointer text-blue-500 hover:underline">
                        {avis.comment.substring(0, 35)}{avis.comment.length > 35 && '...'}
                      </summary>
                      <p className="mt-2 text-gray-700 group-open:block">
                        {avis.comment}
                      </p>
                    </details>
                  </div>
                  <div className="mt-2">Date: {new Date(avis.date).toLocaleDateString()}</div>
                  <button
                    onClick={() => handleDelete(avis._id)}
                    className="mt-4 bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition duration-200"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          </section>
          <section className="flex justify-center mb-10">
            {currentPage !== 1 && avis.length > 0 && (
              <button onClick={() => paginate(currentPage - 1)} className="bg-green-500 text-white rounded px-4 py-2 mx-2 hover:bg-green-600 transition duration-200">
                Précédent
              </button>
            )}
            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`mx-2 ${currentPage === number ? 'underline text-black font-bold' : 'text-green-600'} hover:text-green-800`}
              >
                {number}
              </button>
            ))}
            {currentPage !== totalPages && avis.length > 0 && (
              <button onClick={() => paginate(currentPage + 1)} className="bg-green-500 text-white rounded px-4 py-2 mx-2 hover:bg-green-600 transition duration-200">
                Suivant
              </button>
            )}
          </section>
        </main>
      </div>
      {/* <Footer className="footer" /> */}
    </div>
  );
};
