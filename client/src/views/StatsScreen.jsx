import React, { useState, useEffect } from "react";
import NavbarAdmin from "../components/NavbarAdmin";
import Footer from "../components/Footer";
import axios from 'axios';
import { Link } from "react-router-dom";
import { FaComments, FaChartBar, FaTachometerAlt } from "react-icons/fa";

export const StatsScreen = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  // pour le menu toggle 
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuOpen(!isMenuOpen);
  };

  // pour recuperer les statistiques
  const [stats, setStats] = useState([]);

  // 'asc' pour croissant, 'desc' pour décroissant
  const [sortOrder, setSortOrder] = useState('desc'); 

  // 'all' pour tous les modes
  const [filterMode, setFilterMode] = useState('all'); 

  // 'all' pour tous les specialites
  const [filterSpe, setFilterSpe] = useState('all'); 

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${apiUrl}/stats/GetStats`);
      let data = response.data;

      if (sortOrder === 'desc') {
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else {
        data.sort((a, b) => new Date(a.date) - new Date(b.date));
      }

      // Filtrer les statistiques par mode
      if (filterMode === 'Express') {
        data = data.filter(stats => stats.mode === 'Express');
      }
      if (filterMode === 'Normal') {
        data = data.filter(stats => stats.mode === 'Normal');
      }
      if (filterMode === 'Complet') {
        data = data.filter(stats => stats.mode === 'Complet');
      }

      // Filtrer les statistiques par specialite
      if (filterSpe === 'ING INFO') {
        data = data.filter(stats => stats.spe === 'ING INFO');
      }
      if (filterSpe === 'ING ENER') {
        data = data.filter(stats => stats.spe === 'ING ENER');
      }
      if (filterSpe === 'ING MACS') {
        data = data.filter(stats => stats.spe === 'ING MACS');
      }
      if (filterSpe === 'ING TELECOM') {
        data = data.filter(stats => stats.spe === 'ING TELECOM');
      }
      if (filterSpe === 'ING INSTRU') {
        data = data.filter(stats => stats.spe === 'ING INSTRU');
      }
      if (filterSpe === 'Autres') {
        data = data.filter(stats => stats.spe === 'Autres');
      }

      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [sortOrder, filterMode, filterSpe]);

  // ------------------pour la pagination------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [statsPerPage] = useState(10);
  // Calculer le nombre total de pages
  const totalPages = Math.ceil(stats.length / statsPerPage);

  // Créer un tableau pour les numéros de page
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  // Calculer le premier et le dernier avis pour la page actuelle
  const indexOfLastStats = currentPage * statsPerPage;
  const indexOfFirstStats = indexOfLastStats - statsPerPage;
  const currentStats = stats.slice(indexOfFirstStats, indexOfLastStats);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterMode, filterSpe]);

  const handleDelete = async (id) => {
    const statsToDelete = stats.find(a => a._id === id);
    const confirmation = window.confirm(`Voulez-vous vraiment supprimer les statistiques suivantes ?\n\nNom d'utilisateur: ${statsToDelete.name}\nMode: ${statsToDelete.mode}\nMessage: ${statsToDelete.scoreTotal}\nSpécialité: ${statsToDelete.spe}\nDate: ${statsToDelete.date}`);
    
    if (confirmation) {
      try {
        await axios.delete(`${apiUrl}/stats/DeleteStats/${id}`);
        fetchStats();
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
            <h2 className="text-2xl font-bold text-gray-700 mb-4">GESTION DES STATISTIQUES</h2>
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

              <span className="font-bold">Mode :</span>
              <select 
                value={filterMode} 
                onChange={(e) => setFilterMode(e.target.value)}
                className="border rounded p-2 shadow"
              >
                <option value="all">Tous les Modes</option>
                <option value="Express" className="text-green-500">Express</option>
                <option value="Normal" className="text-red-500">Normal</option>
                <option value="Complet" className="text-blue-500">Complet</option>
              </select>

              <span className="font-bold">Spé :</span>
              <select 
                value={filterSpe} 
                onChange={(e) => setFilterSpe(e.target.value)}
                className="border rounded p-2 shadow"
              >
                <option value="all">Toutes les Spé...</option>
                <option value="ING INFO">ING INFO</option>
                <option value="ING ENER">ING ENER</option>
                <option value="ING MACS">ING MACS</option>
                <option value="ING TELECOM">ING TELECOM</option>
                <option value="ING INSTRU">ING INSTRU</option>
                <option value="Autres">Autres</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {currentStats.map((stats, index) => (
                <div key={index} className="card">
                  <div className="card-title">{stats.name}</div>
                  <div className={`badge ${stats.mode === 'Express' ? 'green-badge' : stats.mode === 'Normal' ? 'red-badge' : 'blue-badge'}`}>
                    {stats.mode}
                  </div>
                  <div className="mt-4">Score Total: {parseFloat(stats.scoreTotal).toFixed(3)} tonnes</div>
                  <div className="mt-2">Spécialité: {stats.spe.length > 35 ? stats.spe.substring(0, 35) + '...' : stats.spe}</div>
                  <div className="mt-2">Date: {new Date(stats.date).toLocaleDateString()}</div>
                  <button
                    onClick={() => handleDelete(stats._id)}
                    className="mt-4 bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition duration-200"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          </section>
          <section className="flex justify-center mb-10">
            {currentPage !== 1 && stats.length > 0 && (
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
            {currentPage !== totalPages && stats.length > 0 && (
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
