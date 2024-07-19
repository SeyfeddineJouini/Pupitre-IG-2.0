import React, { useEffect, useState } from "react";
import axios from 'axios';
import { ThemeProvider } from 'styled-components';
import Navbar from "../components/Navbar";
import NavbarAdmin from "../components/NavbarAdmin";
import CustomBarYearChart from "./Statistique/Annuel";
import CustomChart from "./Statistique/Doughnuts";
import MyFact from "./Statistique/Fact";
import { lightTheme, darkTheme } from '../themes';
import { useAuth } from "../context/AuthContext";
import backgroundImage from "../img/imagestat2.png";
import amp from "../img/amp.png"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCloud, faUser } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);

function StatCard({ title, value, percentage, isNegative, icon, iconColor }) {
  return (
    <div className="flex flex-col grow px-8 pt-6 pb-12 w-full font-medium bg-white rounded-lg shadow-lg max-md:px-5 max-md:mt-8">
      <FontAwesomeIcon
        icon={icon}
        className={`w-8 h-8 ${iconColor}`} 
      />
      <div className="mt-2 text-2xl font-semibold text-gray-900">{value}</div>
      <div className="mt-1 font-semibold text-gray-500 ">{title}</div>
      <div className={`mt-1 text-sm ${isNegative ? "text-red-500" : "text-green-500"}`}>{percentage}</div>
    </div>
  );
}

function AlternateColorText({ text }) {
  const colors = ["text-blue-500", "text-green-500"];
  return (
    <>
      {text.split("").map((char, index) => (
        <span key={index} className={colors[index % colors.length]}>
          {char}
        </span>
      ))}
    </>
  );
}

function FormSelect({ name, options, onChange, placeholder, className }) {
  const handleMouseOut = (e) => e.target.size = 1;
  const handleChange = (e) => {
    onChange(e);
    e.target.size = 1;
  };

  return (
    <div className={`relative inline-block mb-4 ${className}`}>
      <select
        name={name}
        className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-150 cursor-pointer"
        onChange={handleChange}
        onMouseOut={handleMouseOut}
        onClick={handleMouseOut}
        style={{ zIndex: 10 }}
        defaultValue=""
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.name}</option>
        ))}
      </select>
    </div>
  );
}

function StatCardWithBackground({ count }) {
  const titleStyle = {
    fontFamily: "'Outfit', Helvetica, sans-serif",
    fontWeight: 700,
    color: '#ffffff',
    textShadow: '3px 3px 6px rgba(0, 0, 0, 0.7)',
    fontSize: '2rem',
  };
  return (
    <div className="flex gap-6 justify-between px-8 py-6 mt-12 w-full font-semibold max-md:px-4 max-md:mt-8">
      <div className="flex relative z-10 flex-col gap-4 justify-between self-center px-8 py-6 w-full font-semibold text-black bg-white max-md:px-4 max-md:mt-8 opacity-80" style={{ marginTop: '20px' }}>
        <FontAwesomeIcon icon={faUsers} className="absolute inset-0 object-cover w-full h-full opacity-10 text-gray-500" />
        <p className="relative flex-1 text-lg leading-6 text-black">Nombre de participants</p>
        <p className="relative flex-1 my-auto text-3xl text-center">{count}</p>
      </div>
    </div>
  );
}

function Statistiques() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { isAuthenticated } = useAuth();
  const [selectedSpecialty, setSelectedSpecialty] = useState("default");
  const [selectedSubSpecialty, setSelectedSubSpecialty] = useState("default");
  const [totalEmissions, setTotalEmissions] = useState('');
  const [theme, setTheme] = useState(lightTheme);
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get(`${apiUrl}/stats/api/statistiques/totalScore`)
      .then(response => setTotalEmissions(response.data.total))
      .catch(error => console.error("Error loading total emissions data:", error));
  }, [apiUrl]);

  const Title = styled.h1`
    font-family: 'Outfit', Helvetica, sans-serif;
    font-weight: 700;
    color: #ffffff;
    text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);  // Increased shadow for better contrast
    font-size: 4rem;
    margin-bottom: 20px;
  `;

  useEffect(() => {
    axios.get(`${apiUrl}/stats/api/statistiques/count`)
      .then(response => {
        if (response.data && response.data.count) {
          setCount(response.data.count);
        }
      })
      .catch(error => console.error("Erreur lors de la récupération du nombre de statistiques", error));
  }, [apiUrl]);

  const handleSpecialtyChange = (event) => {
    setSelectedSpecialty(event.target.value);
    setSelectedSubSpecialty("default");
  };

  const handleSubSpecialtyChange = (event) => setSelectedSubSpecialty(event.target.value);

  const toggleTheme = () => setTheme(theme === lightTheme ? darkTheme : lightTheme);

  const today = new Date();
  const formattedDate = today.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const specialtyOptions = [
    { value: "default", name: "Tout Statut" },
    { value: "ING", name: "Ingénieurie" },
    { value: "Licence", name: "Licence" },
    { value: "Masters", name: "Masters" },
    { value: "Personnels ou Enseignants", name: "Personnels ou Enseignants" },
    { value: "Autres", name: "Autres" },
  ];

  const subSpecialtyOptions = {
    Licence: [
      { value: "Informatique", name: "Informatique" },
      { value: "Mathématiques", name: "Mathématiques" },
      { value: "Physique Chimie", name: "Physique Chimie" },
      { value: "Science de l'ingénieurie", name: "Science de l'ingénieurie" },
      { value: "Informatique & Mathématiques", name: "Informatique & Mathématiques" },
      { value: "CP2I", name: "CP2I" }
    ],
    ING: [
      { value: "Energétique", name: "Energétique" },
      { value: "Instrumentation", name: "Instrumentation" },
      { value: "MACS", name: "MACS" },
      { value: "Télecommunication & réseaux", name: "Télecommunication & réseaux" },
      { value: "Informatique", name: "Informatique" }
    ],
    Masters: [
      { value: "Informatique", name: "Informatique" },
      { value: "Mathématiques", name: "Mathématiques" },
      { value: "Science et génie des matériaux", name: "Science et génie des matériaux" },
      { value: "Ingénieurie et innovation en images et réseaux", name: "Ingénieurie et innovation en images et réseaux" },
      { value: "Génies des Procédés", name: "Génies des Procédés" }
    ]
  };

  const titleStyle = {
    fontFamily: "'Outfit', Helvetica, sans-serif",
    fontWeight: 700,
    color: '#ffffff',
    textShadow: '3px 3px 6px rgba(0, 0, 0, 0.7)',
    fontSize: '2rem',
    marginBottom: '20px',
  };

  const isSubSpecialtyVisible = selectedSpecialty in subSpecialtyOptions;
  const selectClassName = isSubSpecialtyVisible ? "w-full" : "w-1/2";

  return (
    <ThemeProvider theme={theme}>
      <div 
        className="flex flex-col pt-4 bg-cover bg-center rounded-xl"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {isAuthenticated ? <NavbarAdmin /> : <Navbar toggleTheme={toggleTheme} />}
        <div className="self-center mt-10 mb-6 w-full max-w-6xl max-md:mt-8 max-md:max-w-full">
          <div className="flex flex-col items-center mb-8">
            <Title>Statistique Générale </Title>
            <div className="mt-2 text-1xl font-semibold text-white">{formattedDate}</div>
          </div>
          
          <div className="flex gap-6 max-md:flex-col max-md:gap-4"> 
            <div className="flex flex-col w-2/3 max-md:w-full">
              <div className="flex flex-col max-md:mt-6 max-md:max-w-full">
                <h2 className="mb-2 text-left" style={titleStyle}>Chiffres:</h2>
                <StatCardWithBackground count={count} className="mt-2" style={{ marginBottom: '20px' }} />
                <div className="mt-8 max-md:mt-6 max-md:max-w-full">
                  <div className="flex gap-6 max-md:flex-col max-md:gap-4">
                    <StatCard
                      title="Totale Des Emissions"
                      value={`${totalEmissions} TCO2e/an`}
                      percentage=""
                      isNegative={false}
                      icon={faCloud}
                      iconColor="text-green-500"
                    />
                    <StatCard
                      title="Emissions par personne"
                      value={`${(totalEmissions / count).toFixed(3)} TCO2e/an`}
                      percentage=""
                      isNegative={false}
                      icon={faUser}
                      iconColor="text-blue-500"
                    />
                  </div>
                </div>
                <div className="flex flex-col mt-6">
                  <h2 className="mb-2 text-left" style={titleStyle}>Empreinte Statistique:</h2>
                  <div className={`flex ${isSubSpecialtyVisible ? 'gap-4' : 'justify-center'}`}>
                    <FormSelect
                      name="Spécialités"
                      options={specialtyOptions}
                      onChange={handleSpecialtyChange}
                      placeholder="Statut Académique"
                      className={selectClassName}
                    />
                    {isSubSpecialtyVisible && (
                      <FormSelect
                        name="SubSpecialties"
                        options={subSpecialtyOptions[selectedSpecialty]}
                        onChange={handleSubSpecialtyChange}
                        placeholder="Veuillez préciser votre spécialité"
                        className="w-full"
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end px-12 pb-16 mt-6 w-full text-sm font-semibold text-gray-500 max-md:px-4 max-md:max-w-full">
                  <CustomBarYearChart specialite={selectedSpecialty} subSpecialite={selectedSubSpecialty} key={`${selectedSpecialty}-${selectedSubSpecialty}`} />
                </div>
              </div>
            </div>
            <aside className="flex flex-col w-1/3 ml-6 max-md:w-full">
              <div className="flex flex-col items-center px-7 py-11 mx-auto mt-1.5 w-full whitespace-nowrap bg-white rounded-3xl shadow-sm max-md:px-5 max-md:mt-10">
                <h2 className="self-stretch text-3xl leading-4 text-black">
                  Synthèse
                </h2>
                <hr className="shrink-0 self-stretch mt-5 h-px border border-solid bg-gray-300 border-gray-300" />
                <div className="flex gap-0 mt-12 max-w-full w-[283px] max-md:mt-10">
                  <CustomChart />
                </div>
              </div>
              <div className="flex flex-col items-center px-7 py-11 mx-auto mt-6 w-full bg-white rounded-3xl shadow-sm max-md:px-5 max-md:mt-10">
                <div className="flex justify-between items-center w-full">
                  <img src={amp} alt="amp" className="ml-2 w-12 h-12" />
                  <h2 className="self-stretch text-3xl leading-4 text-black">
                    <AlternateColorText text="Le Saviez-vous ?" />
                  </h2>
                </div>
                <hr className="shrink-0 self-stretch mt-5 h-px border border-solid bg-gray-200 border-gray-200" />
                <div className="flex items-center justify-center w-full max-w-[283px]">
                  <p className="text-justify">
                    <MyFact />
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Statistiques;