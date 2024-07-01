import React, { useState, useEffect } from "react";
import { Badge } from "../components/Badge";
import NavbarAdmin from "../components/NavbarAdmin";
import Footer from "../components/Footer";
import axios from 'axios';
import { Link } from "react-router-dom";
import { FaComments, FaChartBar } from "react-icons/fa";
import './AdminScreen.css';

export const AdminScreen = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuOpen(!isMenuOpen);
  };

  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${apiUrl}/stats/Get3Stats`);
        setStats(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  const [avis, setAvis] = useState([]);

  useEffect(() => {
    const fetchAvis = async () => {
      try {
        const response = await axios.get(`${apiUrl}/avis/Get3Avis`);
        setAvis(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAvis();
  }, []);

  const handleDisplayFullComment = (id) => {
    const avisToDisplay = avis.find(a => a._id === id);
    alert(`${avisToDisplay.comment}`);
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
              <Link to="/data-avis" className="flex items-center px-4 py-3 bg-gradient-to-r from-purple-400 to-purple-600 text-white font-bold rounded-full shadow-lg hover:bg-purple-700 transform hover:scale-105 transition duration-300 ease-in-out">
                <FaComments className="mr-2" /> Gestion Avis
              </Link>
            </li>
            <li>
              <Link to="/data-stats" className="flex items-center px-4 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transform hover:scale-105 transition duration-300 ease-in-out">
                <FaChartBar className="mr-2" /> Gestion Stats
              </Link>
            </li>
          </ul>
        </aside>
        <main className="main-content">
          <div className="flex items-start mb-10 border-b-2 pb-4">
            <img src="https://c.animaapp.com/VcwknbTN/img/logo@2x.png" alt="Logo" className="w-16 h-16 mr-4" />
            <div>
              <div className="font-bold text-lg text-gray-700">Admin</div>
              <div className="font-bold text-lg bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Dutier@univ-paris13.fr</div>
            </div>
          </div>
          <section>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">GESTION DES DONNÉES</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="card">
                  <div className="card-title">{stat.name}</div>
                  <div className="badge-container">
                    <Badge color={stat.mode === 'Express' ? 'green-badge' : stat.mode === 'Normal' ? 'red-badge' : 'blue-badge'} text={stat.mode} />
                  </div>
                  <div className="mt-4">Score: {parseFloat(stat.scoreTotal).toFixed(3)}</div>
                  <div className="mt-2">Spécialité: {stat.spe}</div>
                  <div className="mt-2">Date: {new Date(stat.date).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          </section>
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">GESTION DES AVIS</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {avis.map((avi, index) => (
                <div key={index} className="card">
                  <div className="card-title">{avi.name}</div>
                  <div className="badge-container">
                    <Badge color={avi.type === 'Jeu' ? 'green-badge' : avi.type === 'Calculateur' ? 'yellow-badge' : 'blue-badge'} text={avi.type} />
                  </div>
                  <div className="mt-4">{avi.comment.substring(0, 38)}{avi.comment.length > 38 && (
                    <a href="#" onClick={() => handleDisplayFullComment(avi._id)} className="text-blue-500 hover:underline">...</a>
                  )}</div>
                  <div className="mt-2">Date: {new Date(avi.date).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
      {/* <Footer className="footer" /> */}
    </div>
  );
};
