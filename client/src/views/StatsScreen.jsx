import React, { useState, useEffect  } from "react";
import NavbarAdmin from "../components/NavbarAdmin";
import Footer from "../components/Footer";
import axios from 'axios';
import { Link } from "react-router-dom";


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
    const confirmation = window.confirm(`Voulez-vous vraiment supprimer l'stats suivant ?\n\nNom d'utilisateur: ${statsToDelete.name}\nMode: ${statsToDelete.mode}\nMessage: ${statsToDelete.scoreTotal}\nSpécialité: ${statsToDelete.spe}\nDate: ${statsToDelete.date}`);
    
    if (confirmation) {
      try {
        await axios.delete(`${apiUrl}/stats/DeleteStats/${id}`);
        fetchStats();
      } catch (err) {
        console.error(err);
      }
    }};

  return (
    <>

    <div className="flex flex-col min-h-screen overflow-auto overflow-x-hidden">
      <NavbarAdmin/>
      <main className="flex-grow">
      <div className="flex flex-col md:flex-row">
        <nav className="flex inset-y-0 left-0 bg-gray-100 p-4 w-full md:w-64 flex flex-col">
        <button 
          onClick={handleMenuOpen} 
          className="md:hidden flex flex-col w-8 h-8 justify-around items-center bg-green-700 rounded p-1 cursor-pointer"
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>

          <aside className={`${isMenuOpen ? 'block' : 'hidden'} md:block mt-4 space-y-2 bg-white p-4 rounded shadow-lg overflow-auto`}>
            <ul>
              <li>
              <Link to="/data-avis" className="px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold">Gestion Avis</Link>
              </li>
              <li>
                <Link to="/data-stats" className="px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold">Gestion Stat</Link>
              </li>
              {/* <li>
                <a href="/statistique" className="px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold">Statistique</a>
              </li> */}
              <li>
              <Link to="/dashboard-admin" className="px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold bg-red-500 text-white rounded mt-10">Dashboard Admin</Link>
              </li>
            </ul>
          </aside>
        </nav>

        <main className="flex-grow flex flex-col sm:flex-col ml-auto mt-10">

        {/* ------------tabeau stats-------------------- */}

        <div className="flex items-start w-full ml-5">
          <div className="w-full [font-family:'Outfit',Helvetica] font-bold text-graygray-700 text-2xl tracking-[0] leading-[25.2px] whitespace-nowrap">
            GESTION DES STATISTIQUES
          </div>
        </div>

        {/* ------------------filtrage--------------------- */}
        <div className="mr-10 mb-5">
          <div className="flex justify-end items-center space-x-2">

            {/* // Filtrer par ordre de date */}
            <span className="font-bold">Filtrage :</span>
            <select 
              value={sortOrder} 
              onChange={(e) => setSortOrder(e.target.value)}
              className="border rounded p-2 shadow"
            >
              <option value="desc">Date: Ordre décroissant</option>
              <option value="asc">Date: Ordre croissant</option>
            </select>

            {/* // Filtrer par mode */}
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

            {/* // Filtrer par specialite */}
            <span className="font-bold">Spé :</span>
            <select 
              value={filterSpe} 
              onChange={(e) => setFilterSpe(e.target.value)}
              className="border rounded p-2 shadow"
            >
              <option value="ALL">Tous les Spé</option>
              <option value="ING INFO">ING INFO</option>
              <option value="ING ENER">ING ENER</option>
              <option value="ING MACS">ING MACS</option>
              <option value="ING TELECOM">ING TELECOM</option>
              <option value="ING INSTRU">ING INSTRU</option>
              <option value="Autres">Autres</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center flex-wrap border border-gray-300 shadow-md mb-5">
        
          <div className="flex-grow flex-shrink flex-auto max-w-[300px]">
            <div className="bg-cool-gray050 bg-gray-100 flex items-start p-[16px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative w-fit mt-[-1.00px] font-text-xs-font-semibold font-[number:var(--text-xs-font-semibold-font-weight)] text-cool-gray500 text-[length:var(--text-xs-font-semibold-font-size)] tracking-[var(--text-xs-font-semibold-letter-spacing)] leading-[var(--text-xs-font-semibold-line-height)] whitespace-nowrap [font-style:var(--text-xs-font-semibold-font-style)] border-b-2 border-gray-300">
                NOM DE L’UTITLISATEUR
              </div>
            </div>
            
            <div className="relative self-stretch w-full h-px bg-cool-gray200" />
            {currentStats.map((stats, index) => (
              <div className="flex items-start p-[16px] relative self-stretch w-full flex-[0_0_auto] bg-cool-gray050 rounded-[12px_0px_0px_12px]">
                <div className="relative flex-1 h-[22px] mt-[-1.00px] font-bold font-text-sm-font-semibold font-[number:var(--text-sm-font-semibold-font-weight)] text-cool-gray900 text-[length:var(--text-sm-font-semibold-font-size)] tracking-[var(--text-sm-font-semibold-letter-spacing)] leading-[var(--text-sm-font-semibold-line-height)] whitespace-nowrap [font-style:var(--text-sm-font-semibold-font-style)]">
                  {stats.name}
                </div>
              </div>
            ))}        
          </div>
          

          <div className="flex-grow flex-shrink flex-auto max-w-[300px]">
            <div className="flex items-start p-[16px] bg-gray-100 relative self-stretch w-full flex-[0_0_auto] bg-cool-gray050">
              <div className="relative w-fit mt-[-1.00px] font-text-xs-font-semibold font-[number:var(--text-xs-font-semibold-font-weight)] text-cool-gray500 text-[length:var(--text-xs-font-semibold-font-size)] tracking-[var(--text-xs-font-semibold-letter-spacing)] leading-[var(--text-xs-font-semibold-line-height)] whitespace-nowrap [font-style:var(--text-xs-font-semibold-font-style)] border-b-2 border-gray-300">
              MODE DE CALCULATEUR
              </div>
            </div>
            
            <div className="relative self-stretch w-full h-px bg-cool-gray200" />
            {currentStats.map((stats, index) => (
              <div key={index} className="flex items-start p-[16px] relative self-stretch w-full flex-[0_0_auto] bg-cool-gray050 rounded-[12px_0px_0px_12px]">
              <div className={`relative flex-1 h-[22px] mt-[-1.00px] font-text-sm-font-semibold font-[number:var(--text-sm-font-semibold-font-weight)] text-cool-gray900 text-[length:var(--text-sm-font-semibold-font-size)] tracking-[var(--text-sm-font-semibold-letter-spacing)] leading-[var(--text-sm-font-semibold-line-height)] whitespace-nowrap [font-style:var(--text-sm-font-semibold-font-style)] ${
                stats.mode === 'Express' ? 'text-green-500' :
                stats.mode === 'Normal' ? 'text-red-500' :
                stats.mode === 'Complet' ? 'text-blue-500' :
                'text-black'
              }`}>
                {stats.mode}
              </div>
            </div>
            ))}
            
          </div>
          <div className="flex-grow flex-shrink flex-auto max-w-[300px]">
            <div className="flex items-start p-[16px] bg-gray-100 relative self-stretch w-full flex-[0_0_auto] bg-cool-gray050">
              <div className="relative w-fit mt-[-1.00px] font-text-xs-font-semibold font-[number:var(--text-xs-font-semibold-font-weight)] text-cool-gray500 text-[length:var(--text-xs-font-semibold-font-size)] tracking-[var(--text-xs-font-semibold-letter-spacing)] leading-[var(--text-xs-font-semibold-line-height)] whitespace-nowrap [font-style:var(--text-xs-font-semibold-font-style)] border-b-2 border-gray-300">
                SCORE TOTAL [TONNES]
              </div>
            </div>
            <div className="relative self-stretch w-full h-px bg-cool-gray200" />
              {currentStats.map((stats, index) => (
              <div className="flex items-start p-[16px] relative self-stretch w-full flex-[0_0_auto] bg-cool-gray050 rounded-[12px_0px_0px_12px]">
                <div className="relative flex-1 h-[22px] mt-[-1.00px] font-text-sm-font-semibold font-[number:var(--text-sm-font-semibold-font-weight)] text-cool-gray900 text-[length:var(--text-sm-font-semibold-font-size)] tracking-[var(--text-sm-font-semibold-letter-spacing)] leading-[var(--text-sm-font-semibold-line-height)] whitespace-nowrap [font-style:var(--text-sm-font-semibold-font-style)]">
                  {stats.scoreTotal}
                  </div>
                </div>
              ))}     
          </div>

          <div className="flex-grow flex-shrink flex-auto max-w-[300px]">
            <div className="flex items-start p-[16px] bg-gray-100 relative self-stretch w-full flex-[0_0_auto] bg-cool-gray050">
              <div className="relative w-fit mt-[-1.00px] font-text-xs-font-semibold font-[number:var(--text-xs-font-semibold-font-weight)] text-cool-gray500 text-[length:var(--text-xs-font-semibold-font-size)] tracking-[var(--text-xs-font-semibold-letter-spacing)] leading-[var(--text-xs-font-semibold-line-height)] whitespace-nowrap [font-style:var(--text-xs-font-semibold-font-style)] border-b-2 border-gray-300">
                SPECIALITE
              </div>
            </div>
            <div className="relative self-stretch w-full h-px bg-cool-gray200" />
              {currentStats.map((stats, index) => (
                <div className="flex items-start p-[16px] relative self-stretch w-full flex-[0_0_auto] bg-cool-gray050 rounded-[12px_0px_0px_12px]">
                  <div className="relative flex-1 h-[22px] mt-[-1.00px] font-text-sm-font-semibold font-[number:var(--text-sm-font-semibold-font-weight)] text-cool-gray900 text-[length:var(--text-sm-font-semibold-font-size)] tracking-[var(--text-sm-font-semibold-letter-spacing)] leading-[var(--text-sm-font-semibold-line-height)] whitespace-nowrap [font-style:var(--text-sm-font-semibold-font-style)]">
                    {stats.spe}
                  </div>
                </div>
              ))}
            
          </div>

          <div className="flex-grow flex-shrink flex-auto max-w-[300px]">
            <div className="flex items-start p-[16px] bg-gray-100 relative self-stretch w-full flex-[0_0_auto] bg-cool-gray050">
              <div className="relative w-fit mt-[-1.00px] font-text-xs-font-semibold font-[number:var(--text-xs-font-semibold-font-weight)] text-cool-gray500 text-[length:var(--text-xs-font-semibold-font-size)] tracking-[var(--text-xs-font-semibold-letter-spacing)] leading-[var(--text-xs-font-semibold-line-height)] whitespace-nowrap [font-style:var(--text-xs-font-semibold-font-style)] border-b-2 border-gray-300">
                DATE
              </div>
            </div>
            <div className="relative self-stretch w-full h-px bg-cool-gray200" />
            {currentStats.map((stats, index) => (
              <div className="bg-cool-gray050 flex items-start p-[16px] relative self-stretch w-full flex-[0_0_auto]">
                <div className="relative flex-1 h-[22px] mt-[-1.00px] font-text-sm-font-normal font-[number:var(--text-sm-font-normal-font-weight)] text-cool-gray500 text-[length:var(--text-sm-font-normal-font-size)] tracking-[var(--text-sm-font-normal-letter-spacing)] leading-[var(--text-sm-font-normal-line-height)] whitespace-nowrap [font-style:var(--text-sm-font-normal-font-style)]">
                  {new Date(stats.date).toLocaleDateString()}
                </div>
              </div>
            ))}  
          </div>
          <div className="flex-grow flex-shrink flex-auto max-w-[300px]">
          <div className="flex items-start p-[16px] bg-gray-100 relative self-stretch w-full flex-[0_0_auto] bg-cool-gray050">
            <div className="relative w-fit mt-[-1.00px] font-text-xs-font-semibold font-[number:var(--text-xs-font-semibold-font-weight)] text-cool-gray500 text-[length:var(--text-xs-font-semibold-font-size)] tracking-[var(--text-xs-font-semibold-letter-spacing)] leading-[var(--text-xs-font-semibold-line-height)] whitespace-nowrap [font-style:var(--text-xs-font-semibold-font-style)] border-b-2 border-gray-300">
              ACTION
            </div>
          </div>
            <div className="relative self-stretch w-full h-px bg-cool-gray200" />
              {currentStats.map((stats, index) => (
                <div className="bg-cool-gray050 flex items-start p-[16px] relative self-stretch w-full flex-[0_0_auto]">
                  <a href="#" className="relative flex-1 h-[22px] mt-[-1.00px] font-text-sm-font-normal text-xs uppercase font-bold text-cool-gray500 text-[length:var(--text-sm-font-normal-font-size)] tracking-[var(--text-sm-font-normal-letter-spacing)] leading-[var(--text-sm-font-normal-line-height)] whitespace-nowrap [font-style:var(--text-sm-font-normal-font-style)]"
                    onClick={() => handleDelete(stats._id)}>
                    <span className="bg-red-500 text-white rounded px-2 py-1">Supprimer</span>
                  </a>
                </div>
              ))}  
            </div>
          </div>
      </main>
    </div>

    { /* ------------------pagination---------------------  */}
    <div className="flex justify-center">
      {currentPage !== 1 && stats.length > 0 && (
        <a href="#" onClick={() => paginate(currentPage - 1)} className="mr-2 bg-green-500 rounded px-2 py-1 text-white">
          Précédent
        </a>
      )}
      {pageNumbers.map(number => (
        <a
          key={number}
          href="#"
          onClick={() => paginate(number)}
          className={`mx-2 ${currentPage === number ? 'underline text-black font-bold' : 'text-green-600'}`}
        >
          {number}
        </a>
      ))}
      {currentPage !== totalPages && stats.length > 0 && (
        <a href="#" onClick={() => paginate(currentPage + 1)} className="ml-2 bg-green-500 rounded px-2 py-1 text-white">
          Suivant
        </a>
      )}
    </div>
    </main>       
    </div>
  </>
  );
};
