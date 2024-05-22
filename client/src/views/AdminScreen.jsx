import React, { useState, useEffect  } from "react";
import { Badge } from "../components/Badge";
import NavbarAdmin from "../components/NavbarAdmin";
import Footer from "../components/Footer";
import axios from 'axios';
import { Link } from "react-router-dom";


export const AdminScreen = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  // pour le menu toggle 
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuOpen(!isMenuOpen);
  };


   // pour recuperer les 3 stats recents
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



  // pour recuperer les 3 avis recents
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

  // Afficher le message complet de l'avis
  const handleDisplayFullComment = (id) => {
    const avisToDisplay = avis.find(a => a._id === id);
    alert(`${avisToDisplay.comment}`);
  };



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
                <Link to="/data-stats" className="px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold">Gestion Stats</Link>
              </li>
              {/* <li>
                <a href="/statistique" className="px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold">Statistique</a>
              </li> */}
            </ul>
          </aside>
        </nav>

        <main className="flex-grow flex flex-col sm:flex-col ml-auto mt-10">
          <div className="flex items-start w-full ml-10 mb-10 border-b-2 border-gray-300">
            <div className="flex flex-col items-start">
              <div className="w-[71px] h-[64px] ml-5">
                <img className="flex" alt="Image" src="https://c.animaapp.com/VcwknbTN/img/logo@2x.png" />
              </div>
              <div className="font-bold text-graygray-700 text-[18px] tracking-[0] leading-[25.2px] whitespace-nowrap ml-7">
                Admin
              </div>
              <div className="[font-family:'Outfit',Helvetica] font-normal text-graygray-500 text-[14px] tracking-[0] leading-[19.6px] whitespace-nowrap">
                GaliCarbo@gmail.com
              </div>             
            </div>   
          </div>

        
        {/* ------------tabeau test-------------------- */}
        <div className="flex items-start w-full ml-5">
          <div className="w-full [font-family:'Outfit',Helvetica] font-bold text-graygray-700 text-2xl tracking-[0] leading-[25.2px] whitespace-nowrap">
            GESTION DES DONNÉES
          </div>
        </div>
        <div className="flex justify-center flex-wrap border border-gray-300 shadow-md mb-5">
          <div className="flex-grow flex-shrink flex-auto max-w-[300px]">
            <div className="bg-cool-gray050 bg-gray-100  flex items-start p-[16px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative w-fit mt-[-1.00px] font-text-xs-font-semibold font-[number:var(--text-xs-font-semibold-font-weight)] text-cool-gray500 text-[length:var(--text-xs-font-semibold-font-size)] tracking-[var(--text-xs-font-semibold-letter-spacing)] leading-[var(--text-xs-font-semibold-line-height)] whitespace-nowrap [font-style:var(--text-xs-font-semibold-font-style)] border-b-2 border-gray-300">
                NOM DE L’UTITLISATEUR
              </div>
            </div>
            <div className="relative self-stretch w-full h-px bg-cool-gray200" />
            <div className="flex items-center p-[16px] relative self-stretch w-full flex-[0_0_auto] bg-cool-gray050 rounded-[12px_0px_0px_12px]">
              <div className="relative flex-1 h-[22px] mt-[-1.00px] font-bold font-text-sm-font-semibold font-[number:var(--text-sm-font-semibold-font-weight)] text-cool-gray900 text-[length:var(--text-sm-font-semibold-font-size)] tracking-[var(--text-sm-font-semibold-letter-spacing)] leading-[var(--text-sm-font-semibold-line-height)] whitespace-nowrap [font-style:var(--text-sm-font-semibold-font-style)]">
                {stats.length > 0 && stats[0] && <p>{stats[0].name}</p>}
              </div>
            </div>
            <div className="flex items-center p-[16px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative flex-1 h-[22px] mt-[-1.00px] font-bold font-text-sm-font-semibold font-[number:var(--text-sm-font-semibold-font-weight)] text-cool-gray900 text-[length:var(--text-sm-font-semibold-font-size)] tracking-[var(--text-sm-font-semibold-letter-spacing)] leading-[var(--text-sm-font-semibold-line-height)] whitespace-nowrap [font-style:var(--text-sm-font-semibold-font-style)]">
                {stats.length > 1 && stats[1] && <p>{stats[1].name}</p>}
              </div>
            </div>
            <div className="flex items-center p-[16px] relative self-stretch w-full flex-[0_0_auto] bg-cool-gray050 rounded-[12px_0px_0px_12px]">
              <div className="relative flex-1 h-[22px] mt-[-1.00px] font-bold font-text-sm-font-semibold font-[number:var(--text-sm-font-semibold-font-weight)] text-cool-gray900 text-[length:var(--text-sm-font-semibold-font-size)] tracking-[var(--text-sm-font-semibold-letter-spacing)] leading-[var(--text-sm-font-semibold-line-height)] whitespace-nowrap [font-style:var(--text-sm-font-semibold-font-style)]">
                {stats.length > 2 && stats[2] && <p>{stats[2].name}</p>}
              </div>
            </div>
          </div>
          <div className="flex-grow flex-shrink flex-auto max-w-[300px]">
            <div className="flex items-start p-[16px] bg-gray-100 relative self-stretch w-full flex-[0_0_auto] bg-cool-gray050">
              <div className="relative w-fit mt-[-1.00px] font-text-xs-font-semibold font-[number:var(--text-xs-font-semibold-font-weight)] text-cool-gray500 text-[length:var(--text-xs-font-semibold-font-size)] tracking-[var(--text-xs-font-semibold-letter-spacing)] leading-[var(--text-xs-font-semibold-line-height)] whitespace-nowrap [font-style:var(--text-xs-font-semibold-font-style)] border-b-2 border-gray-300">
                MODE DE CALCULATEUR
              </div>
            </div>
            <div className="relative self-stretch w-full h-px bg-cool-gray200" />
            {stats.length > 0 && stats[0] && 
              <div className="bg-cool-gray050 flex items-center p-[13px] relative self-stretch w-full flex-[0_0_auto]">
                {stats[0].mode === "Express" && <Badge className="!flex-[0_0_auto]" color="green-badge" text={stats[0].mode} />}
                {stats[0].mode === "Normal" && <Badge className="!flex-[0_0_auto]" color="red-badge" text={stats[0].mode} />}
                {stats[0].mode === "Complet" && <Badge className="!flex-[0_0_auto]" color="blue-badge" text={stats[0].mode} />}
              </div>
            }


            {stats.length > 1 && stats[1] &&
              <div className="bg-cool-gray050 flex items-center p-[13px] relative self-stretch w-full flex-[0_0_auto]">
                {stats[1].mode === "Express" && <Badge className="!flex-[0_0_auto]" color="green-badge" text={stats[1].mode} />}
                {stats[1].mode === "Normal" && <Badge className="!flex-[0_0_auto]" color="red-badge" text={stats[1].mode} />}
                {stats[1].mode === "Complet" && <Badge className="!flex-[0_0_auto]" color="blue-badge" text={stats[1].mode} />}
              </div>
            }

            {stats.length > 2 && stats[2] &&
              <div className="bg-cool-gray050 flex items-center p-[13px] relative self-stretch w-full flex-[0_0_auto]">
                {stats[2].mode === "Express" && <Badge className="!flex-[0_0_auto]" color="green-badge" text={stats[2].mode} />}
                {stats[2].mode === "Normal" && <Badge className="!flex-[0_0_auto]" color="red-badge" text={stats[2].mode} />}
                {stats[2].mode === "Complet" && <Badge className="!flex-[0_0_auto]" color="blue-badge" text={stats[2].mode} />}
              </div>
            }
      

          </div>
          <div className="flex-grow flex-shrink flex-auto max-w-[300px]">
            <div className="flex items-start p-[16px] bg-gray-100 relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative w-fit mt-[-1.00px] font-text-xs-font-semibold font-[number:var(--text-xs-font-semibold-font-weight)] text-cool-gray500 text-[length:var(--text-xs-font-semibold-font-size)] tracking-[var(--text-xs-font-semibold-letter-spacing)] leading-[var(--text-xs-font-semibold-line-height)] whitespace-nowrap [font-style:var(--text-xs-font-semibold-font-style)] border-b-2 border-gray-300">
                SCORE [TONNE]
              </div>
            </div>
            <div className="relative self-stretch w-full h-px bg-cool-gray200" />
            <div className="bg-cool-gray050 flex items-center p-[16px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative w-[370px] h-[22px] mt-[-1.00px] mr-[-29.00px] [font-family:'Inter',Helvetica] font-light text-cool-gray900 text-[14px] tracking-[0] leading-[21px] whitespace-nowrap">
                {stats.length > 0 && stats[0] && <p>{stats[0].scoreTotal}</p>}
              </div>
            </div>
            <div className="bg-cool-gray050 flex items-center p-[16px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative w-[370px] h-[22px] mt-[-1.00px] mr-[-29.00px] [font-family:'Inter',Helvetica] font-light text-cool-gray900 text-[14px] tracking-[0] leading-[21px] whitespace-nowrap">
                {stats.length > 1 && stats[1] && <p>{stats[1].scoreTotal}</p>}
              </div>
            </div>
            <div className="bg-cool-gray050 flex items-center p-[16px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative w-[370px] h-[22px] mt-[-1.00px] mr-[-29.00px] [font-family:'Inter',Helvetica] font-light text-cool-gray900 text-[14px] tracking-[0] leading-[21px] whitespace-nowrap">
                {stats.length > 2 && stats[2] && <p>{stats[2].scoreTotal}</p>}
              </div>
            </div>
          </div>

          <div className="flex-grow flex-shrink flex-auto max-w-[300px]">
            <div className="flex items-start p-[16px] bg-gray-100 relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative w-fit mt-[-1.00px] font-text-xs-font-semibold font-[number:var(--text-xs-font-semibold-font-weight)] text-cool-gray500 text-[length:var(--text-xs-font-semibold-font-size)] tracking-[var(--text-xs-font-semibold-letter-spacing)] leading-[var(--text-xs-font-semibold-line-height)] whitespace-nowrap [font-style:var(--text-xs-font-semibold-font-style)] border-b-2 border-gray-300">
                SPECIALITE
              </div>
            </div>
            <div className="relative self-stretch w-full h-px bg-cool-gray200" />
            <div className="bg-cool-gray050 flex items-center p-[16px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative w-[370px] h-[22px] mt-[-1.00px] mr-[-29.00px] [font-family:'Inter',Helvetica] font-light text-cool-gray900 text-[14px] tracking-[0] leading-[21px] whitespace-nowrap">
                {stats.length > 0 && stats[0] && <p>{stats[0].spe}</p>}
              </div>
            </div>
            <div className="bg-cool-gray050 flex items-center p-[16px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative w-[370px] h-[22px] mt-[-1.00px] mr-[-29.00px] [font-family:'Inter',Helvetica] font-light text-cool-gray900 text-[14px] tracking-[0] leading-[21px] whitespace-nowrap">
                {stats.length > 1 && stats[1] && <p>{stats[1].spe}</p>}
              </div>
            </div>
            <div className="bg-cool-gray050 flex items-center p-[16px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative w-[370px] h-[22px] mt-[-1.00px] mr-[-29.00px] [font-family:'Inter',Helvetica] font-light text-cool-gray900 text-[14px] tracking-[0] leading-[21px] whitespace-nowrap">
                {stats.length > 2 && stats[2] && <p>{stats[2].spe}</p>}
              </div>
            </div>
          </div>

          <div className="flex-grow flex-shrink flex-auto max-w-[300px]">
            <div className="flex items-start p-[16px] bg-gray-100 relative self-stretch w-full flex-[0_0_auto] bg-cool-gray050">
              <div className="relative w-fit mt-[-1.00px] font-text-xs-font-semibold font-[number:var(--text-xs-font-semibold-font-weight)] text-cool-gray500 text-[length:var(--text-xs-font-semibold-font-size)] tracking-[var(--text-xs-font-semibold-letter-spacing)] leading-[var(--text-xs-font-semibold-line-height)] whitespace-nowrap [font-style:var(--text-xs-font-semibold-font-style)] border-b-2 border-gray-300">
                DATE
              </div>
            </div>
            <div className="relative self-stretch w-full h-px bg-cool-gray200" />
            <div className="bg-cool-gray050 flex items-center p-[16px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative flex-1 h-[22px] mt-[-1.00px] font-text-sm-font-normal font-[number:var(--text-sm-font-normal-font-weight)] text-cool-gray500 text-[length:var(--text-sm-font-normal-font-size)] tracking-[var(--text-sm-font-normal-letter-spacing)] leading-[var(--text-sm-font-normal-line-height)] whitespace-nowrap [font-style:var(--text-sm-font-normal-font-style)]">
                {stats.length > 0 && stats[0] && <p>{new Date(stats[0].date).toLocaleDateString()}</p>}
              </div>
            </div>
            <div className="bg-cool-gray050 flex items-center p-[16px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative flex-1 h-[22px] mt-[-1.00px] font-text-sm-font-normal font-[number:var(--text-sm-font-normal-font-weight)] text-cool-gray500 text-[length:var(--text-sm-font-normal-font-size)] tracking-[var(--text-sm-font-normal-letter-spacing)] leading-[var(--text-sm-font-normal-line-height)] whitespace-nowrap [font-style:var(--text-sm-font-normal-font-style)]">
                {stats.length > 1 && stats[1] && <p>{new Date(stats[1].date).toLocaleDateString()}</p>}
              </div>
            </div>
            <div className="bg-cool-gray050 flex items-center p-[16px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative flex-1 h-[22px] mt-[-1.00px] font-text-sm-font-normal font-[number:var(--text-sm-font-normal-font-weight)] text-cool-gray500 text-[length:var(--text-sm-font-normal-font-size)] tracking-[var(--text-sm-font-normal-letter-spacing)] leading-[var(--text-sm-font-normal-line-height)] whitespace-nowrap [font-style:var(--text-sm-font-normal-font-style)]">
                {stats.length > 2 && stats[2] && <p>{new Date(stats[2].date).toLocaleDateString()}</p>}
              </div>
            </div>
          </div>
        </div>
        
        {/* ------------tabeau avis-------------------- */}

        <div className="flex items-start w-full ml-5">
          <div className="w-full [font-family:'Outfit',Helvetica] font-bold text-graygray-700 text-2xl tracking-[0] leading-[25.2px] whitespace-nowrap">
            GESTION DES AVIS
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
            <div className="flex items-center p-[16px] relative self-stretch w-full flex-[0_0_auto] bg-cool-gray050 rounded-[12px_0px_0px_12px]">
              <div className="relative flex-1 h-[22px] mt-[-1.00px] font-bold font-text-sm-font-semibold font-[number:var(--text-sm-font-semibold-font-weight)] text-cool-gray900 text-[length:var(--text-sm-font-semibold-font-size)] tracking-[var(--text-sm-font-semibold-letter-spacing)] leading-[var(--text-sm-font-semibold-line-height)] whitespace-nowrap [font-style:var(--text-sm-font-semibold-font-style)]">
              {avis.length > 0 && avis[0] && <p>{avis[0].name}</p>}
              </div>
            </div>
            <div className="flex items-center p-[16px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative flex-1 h-[22px] mt-[-1.00px] font-bold font-text-sm-font-semibold font-[number:var(--text-sm-font-semibold-font-weight)] text-cool-gray900 text-[length:var(--text-sm-font-semibold-font-size)] tracking-[var(--text-sm-font-semibold-letter-spacing)] leading-[var(--text-sm-font-semibold-line-height)] whitespace-nowrap [font-style:var(--text-sm-font-semibold-font-style)]">
              {avis.length > 1 && avis[1] && <p>{avis[1].name}</p>}
              </div>
            </div>
            <div className="flex items-center p-[16px] relative self-stretch w-full flex-[0_0_auto] bg-cool-gray050 rounded-[12px_0px_0px_12px]">
              <div className="relative flex-1 h-[22px] mt-[-1.00px] font-bold font-text-sm-font-semibold font-[number:var(--text-sm-font-semibold-font-weight)] text-cool-gray900 text-[length:var(--text-sm-font-semibold-font-size)] tracking-[var(--text-sm-font-semibold-letter-spacing)] leading-[var(--text-sm-font-semibold-line-height)] whitespace-nowrap [font-style:var(--text-sm-font-semibold-font-style)]">
              {avis.length > 2 && avis[2] && <p>{avis[2].name}</p>} 
              </div>
            </div>
          </div>
          <div className="flex-grow flex-shrink flex-auto max-w-[300px]">
            <div className="flex items-start p-[16px] bg-gray-100 relative self-stretch w-full flex-[0_0_auto] bg-cool-gray050">
              <div className="relative w-fit mt-[-1.00px] font-text-xs-font-semibold font-[number:var(--text-xs-font-semibold-font-weight)] text-cool-gray500 text-[length:var(--text-xs-font-semibold-font-size)] tracking-[var(--text-xs-font-semibold-letter-spacing)] leading-[var(--text-xs-font-semibold-line-height)] whitespace-nowrap [font-style:var(--text-xs-font-semibold-font-style)] border-b-2 border-gray-300">
              TYPE
              </div>
            </div>
            <div className="relative self-stretch w-full h-px bg-cool-gray200" />

            {avis.length > 0 && avis[0] && 
              <div className="bg-cool-gray050 flex items-center p-[13px] relative self-stretch w-full flex-[0_0_auto]">
                {avis[0].type === "Jeu" && <Badge className="!flex-[0_0_auto]" color="green-badge" text={avis[0].type} />}
                {avis[0].type === "Calculateur" && <Badge className="!flex-[0_0_auto]" color="red-badge" text={avis[0].type} />}
                {avis[0].type === "Autres" && <Badge className="!flex-[0_0_auto]" color="blue-badge" text={avis[0].type} />}
              </div>
            }

            
            {avis.length > 1 && avis[1] && 
              <div className="bg-cool-gray050  flex items-center p-[13px] relative self-stretch w-full flex-[0_0_auto]">
                {avis[1].type === "Jeu" && <Badge className="!flex-[0_0_auto]" color="green-badge" text={avis[1].type} />}
                {avis[1].type === "Calculateur" && <Badge className="!flex-[0_0_auto]" color="red-badge" text={avis[1].type} />}
                {avis[1].type === "Autres" && <Badge className="!flex-[0_0_auto]" color="blue-badge" text={avis[1].type} />}
              </div>
            }
            {avis.length > 2 && avis[2] && 
              <div className="bg-cool-gray050 flex items-center p-[13px] relative self-stretch w-full flex-[0_0_auto]">
                {avis[2].type === "Jeu" && <Badge className="!flex-[0_0_auto]" color="green-badge" text={avis[2].type} />}
                {avis[2].type === "Calculateur" && <Badge className="!flex-[0_0_auto]" color="red-badge" text={avis[2].type} />}
                {avis[2].type === "Autres" && <Badge className="!flex-[0_0_auto]" color="blue-badge" text={avis[2].type} />}
              </div>
            }
            
          </div>
          <div className="flex-grow flex-shrink flex-auto max-w-[300px]">
            <div className="flex items-start p-[16px] bg-gray-100 relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative w-fit mt-[-1.00px] font-text-xs-font-semibold font-[number:var(--text-xs-font-semibold-font-weight)] text-cool-gray500 text-[length:var(--text-xs-font-semibold-font-size)] tracking-[var(--text-xs-font-semibold-letter-spacing)] leading-[var(--text-xs-font-semibold-line-height)] whitespace-nowrap [font-style:var(--text-xs-font-semibold-font-style)] border-b-2 border-gray-300">
                MESSAGE
              </div>
            </div>
            <div className="relative self-stretch w-full h-px bg-cool-gray200" />
            <div className="bg-cool-gray050 flex items-center p-[16px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative w-[370px] h-[22px] mt-[-1.00px] mr-[-29.00px] [font-family:'Inter',Helvetica] font-light text-cool-gray900 text-[14px] tracking-[0] leading-[21px] whitespace-nowrap">
              {avis.length > 0 && avis[0] && <p>{avis[0].comment.substring(0, 30)}</p>}
              {avis.length > 0 && avis[0] && avis[0].comment.length > 30 && (
                      <a href="#" className="relative flex-1 h-[22px] mt-[-1.00px] font-text-sm-font-normal text-xs uppercase font-bold text-cool-gray500 text-[length:var(--text-sm-font-normal-font-size)] tracking-[var(--text-sm-font-normal-letter-spacing)] leading-[var(--text-sm-font-normal-line-height)] whitespace-nowrap [font-style:var(--text-sm-font-normal-font-style)]"
                        onClick={() => handleDisplayFullComment(avis[0]._id)}>
                        <span className="bg-green-500 text-white rounded px-2 py-1">...</span>
                      </a>
                    )}
              </div>
            </div>
            <div className="bg-cool-gray050 flex items-center p-[16px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative w-[370px] h-[22px] mt-[-1.00px] mr-[-29.00px] [font-family:'Inter',Helvetica] font-light text-cool-gray900 text-[14px] tracking-[0] leading-[21px] whitespace-nowrap">
              {avis.length > 1 && avis[1] && <p>{avis[1].comment.substring(0, 30)}</p>}
              {avis.length > 1 && avis[1] && avis[1].comment.length > 30 && (
                      <a href="#" className="relative flex-1 h-[22px] mt-[-1.00px] font-text-sm-font-normal text-xs uppercase font-bold text-cool-gray500 text-[length:var(--text-sm-font-normal-font-size)] tracking-[var(--text-sm-font-normal-letter-spacing)] leading-[var(--text-sm-font-normal-line-height)] whitespace-nowrap [font-style:var(--text-sm-font-normal-font-style)]"
                        onClick={() => handleDisplayFullComment(avis[1]._id)}>
                        <span className="bg-green-500 text-white rounded px-2 py-1">...</span>
                      </a>
                    )}
              </div>
            </div>
            <div className="bg-cool-gray050 flex items-center p-[16px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative w-[370px] h-[22px] mt-[-1.00px] mr-[-29.00px] [font-family:'Inter',Helvetica] font-light text-cool-gray900 text-[14px] tracking-[0] leading-[21px] whitespace-nowrap">
              {avis.length > 2 && avis[2] && <p>{avis[2].comment.substring(0, 30)}</p>}
              {avis.length > 2 && avis[2] &&  avis[2].comment.length > 30 && (
                      <a href="#" className="relative flex-1 h-[22px] mt-[-1.00px] font-text-sm-font-normal text-xs uppercase font-bold text-cool-gray500 text-[length:var(--text-sm-font-normal-font-size)] tracking-[var(--text-sm-font-normal-letter-spacing)] leading-[var(--text-sm-font-normal-line-height)] whitespace-nowrap [font-style:var(--text-sm-font-normal-font-style)]"
                        onClick={() => handleDisplayFullComment(avis[2]._id)}>
                        <span className="bg-green-500 text-white rounded px-2 py-1">...</span>
                      </a>
                    )}
              </div>
            </div>
          </div>
          <div className="flex-grow flex-shrink flex-auto max-w-[300px]">
            <div className="flex items-start p-[16px] bg-gray-100 relative self-stretch w-full flex-[0_0_auto] bg-cool-gray050">
              <div className="relative w-fit mt-[-1.00px] font-text-xs-font-semibold font-[number:var(--text-xs-font-semibold-font-weight)] text-cool-gray500 text-[length:var(--text-xs-font-semibold-font-size)] tracking-[var(--text-xs-font-semibold-letter-spacing)] leading-[var(--text-xs-font-semibold-line-height)] whitespace-nowrap [font-style:var(--text-xs-font-semibold-font-style)] border-b-2 border-gray-300">
                DATE
              </div>
            </div>
            <div className="relative self-stretch w-full h-px bg-cool-gray200" />
            <div className="bg-cool-gray050 flex items-center p-[16px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative flex-1 h-[22px] mt-[-1.00px] font-text-sm-font-normal font-[number:var(--text-sm-font-normal-font-weight)] text-cool-gray500 text-[length:var(--text-sm-font-normal-font-size)] tracking-[var(--text-sm-font-normal-letter-spacing)] leading-[var(--text-sm-font-normal-line-height)] whitespace-nowrap [font-style:var(--text-sm-font-normal-font-style)]">
                {avis.length > 0 && avis[0] && <p>{new Date(avis[0].date).toLocaleDateString()}</p>}
              </div>
            </div>
            <div className="bg-cool-gray050 flex items-center p-[16px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative flex-1 h-[22px] mt-[-1.00px] font-text-sm-font-normal font-[number:var(--text-sm-font-normal-font-weight)] text-cool-gray500 text-[length:var(--text-sm-font-normal-font-size)] tracking-[var(--text-sm-font-normal-letter-spacing)] leading-[var(--text-sm-font-normal-line-height)] whitespace-nowrap [font-style:var(--text-sm-font-normal-font-style)]">
                {avis.length > 1 && avis[1] && <p>{new Date(avis[1].date).toLocaleDateString()}</p>}
              </div>
            </div>
            <div className="bg-cool-gray050 flex items-center p-[16px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative flex-1 h-[22px] mt-[-1.00px] font-text-sm-font-normal font-[number:var(--text-sm-font-normal-font-weight)] text-cool-gray500 text-[length:var(--text-sm-font-normal-font-size)] tracking-[var(--text-sm-font-normal-letter-spacing)] leading-[var(--text-sm-font-normal-line-height)] whitespace-nowrap [font-style:var(--text-sm-font-normal-font-style)]">
                {avis.length > 2 && avis[2] && <p>{new Date(avis[2].date).toLocaleDateString()}</p>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    </main>       
    </div>
  </>
  );
};
