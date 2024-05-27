import React, { useEffect, useState } from "react";
import axios from 'axios';
import { ThemeProvider } from 'styled-components';
import Navbar from "../components/Navbar";
import NavbarAdmin from "../components/NavbarAdmin";
import CustomLineChart from "./Statistique/Mensuel";
import CustomLineYearChart from "./Statistique/Annuel";
import CustomChart from "./Statistique/Doughnuts";
import StackedBarChart from "./Statistique/Tous";
import MonthlyLineChartByYear  from "./Statistique/Monan";
import { lightTheme, darkTheme } from '../themes';
import { useAuth } from "../context/AuthContext";
import backgroundImage from "../img/imagestat2.png";
import amp from "../img/amp.png"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCloud, faUser } from '@fortawesome/free-solid-svg-icons'; // Import the icons
import styled from 'styled-components';

import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);

function StatCard({ title, value, percentage, isNegative, icon }) {
  return (
    <div className="flex flex-col grow px-8 pt-6 pb-12 w-full font-medium bg-white rounded-lg shadow-lg max-md:px-5 max-md:mt-8 opacity-80">
      <FontAwesomeIcon
        icon={icon}
        className="w-8 h-8 text-gray-500" // Apply color class conditionally
      />
      <div className="mt-2 text-2xl font-semibold text-gray-900">{value}</div>
      <div className="mt-1 text-sm text-gray-500">{title}</div>
      <div className={`mt-1 text-sm ${isNegative ? "text-red-500" : "text-green-500"}`}>{percentage}</div>
    </div>
  );
}


function FormSelect({ name, options, onChange, alignRight }) {
  const handleMouseOver = (e) => e.target.size = options.length;
  const handleMouseOut = (e) => e.target.size = 1;
  const handleChange = (e) => {
    onChange(e);
    e.target.size = 1;
  };

  return (
    <div className={`relative inline-block w-full mb-4 ${alignRight ? 'ml-auto' : 'mr-auto'}`}>
      <select
        name={name}
        className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-150 cursor-pointer"
        onChange={handleChange}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleMouseOut}
        style={{ position: 'absolute', zIndex: 10 }}
      >
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
       <h2 style={titleStyle}>Chiffres:</h2>
      <div className="flex relative z-10 flex-col gap-4 justify-between self-center px-8 py-6 mt-12 w-full font-semibold text-black bg-white max-md:px-4 max-md:mt-8 opacity-80">
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
  const [selectedType, setSelectedType] = useState("default_stat");
  const [totalEmissions, setTotalEmissions] = useState('');
  const [theme, setTheme] = useState(lightTheme);
  const [count, setCount] = useState(0);
  const dailyFacts = [
    "L'écologie est l'étude des interactions entre les organismes et leur environnement.",
    "Les écosystèmes sont des systèmes complexes composés d'organismes vivants et de leur environnement physique.",
    "Les écosystèmes fournissent des services écologiques essentiels tels que la purification de l'eau, la pollinisation des cultures et la régulation du climat.",
"La biodiversité est la variété des formes de vie sur Terre, et elle est essentielle à la stabilité des écosystèmes.",
"Les forêts tropicales abritent plus de la moitié de la biodiversité mondiale, bien qu'elles ne couvrent que 6% de la surface de la Terre.",
"Les océans fournissent plus de la moitié de l'oxygène de la planète et absorbent une grande partie du dioxyde de carbone produit par les activités humaines.",
"La déforestation est l'une des principales causes de perte de biodiversité et de changement climatique.",
"Les espèces exotiques envahissantes peuvent perturber les écosystèmes indigènes et menacer la biodiversité.",
"Les zones humides, comme les marais et les mangroves, jouent un rôle crucial dans la filtration de l'eau et la protection des côtes contre les tempêtes.",
"Les pollinisateurs, tels que les abeilles et les papillons, sont indispensables à la pollinisation des plantes, y compris de nombreuses cultures alimentaires.",
"La surpêche menace la durabilité des stocks de poissons et la santé des écosystèmes marins.",
"Les émissions de gaz à effet de serre, telles que le dioxyde de carbone et le méthane, contribuent au réchauffement climatique et aux changements climatiques.",
"Le changement climatique entraîne des phénomènes météorologiques extrêmes plus fréquents, tels que les tempêtes, les inondations et les sécheresses.",
"La fonte des glaciers et des calottes glaciaires due au réchauffement climatique entraîne une élévation du niveau de la mer, menaçant les régions côtières.",
"L'agriculture intensive peut entraîner la dégradation des sols, la pollution de l'eau et la perte de biodiversité.",
"Les énergies renouvelables, comme l'énergie solaire et éolienne, offrent des alternatives plus durables aux combustibles fossiles.",
"La conservation des zones protégées, telles que les parcs nationaux et les réserves naturelles, est essentielle pour préserver la biodiversité et les écosystèmes.",
"Les pratiques agricoles durables, telles que l'agroécologie et la permaculture, favorisent la santé des sols et la résilience des cultures.",
"La réduction, le réutilisation et le recyclage des déchets sont des moyens efficaces de réduire l'empreinte écologique et de préserver les ressources naturelles.",
"Les villes vertes, avec des espaces verts et des infrastructures durables, favorisent la qualité de vie et la santé des habitants.",
"La connectivité écologique, c'est-à-dire la conservation des corridors biologiques, aide à prévenir l'isolement des populations animales et végétales.",
"La restauration des écosystèmes dégradés, tels que les zones humides et les mangroves, peut contribuer à atténuer les effets du changement climatique.",
"La collaboration internationale est essentielle pour résoudre les problèmes environnementaux mondiaux, tels que la pollution plastique et la perte de biodiversité.",
"Les peuples autochtones jouent souvent un rôle crucial dans la conservation de la biodiversité et la gestion durable des ressources naturelles.",
"La sensibilisation du public et l'éducation environnementale sont essentielles pour susciter un changement positif en matière de conservation.",
"Les écosystèmes côtiers, tels que les récifs coralliens, sont particulièrement vulnérables aux effets du changement climatique et de la pollution.",
"La déforestation contribue à la perte d'habitats pour de nombreuses espèces, ce qui peut entraîner leur extinction.",
"Les zones urbaines peuvent être conçues pour favoriser la biodiversité, par exemple en intégrant des toits verts et des jardins communautaires.",
"La surconsommation des ressources naturelles, associée à une croissance démographique rapide, exerce une pression importante sur les écosystèmes.",
"La transition vers une économie circulaire, dans laquelle les déchets sont réduits au minimum et les ressources sont utilisées de manière plus efficace, est cruciale pour assurer la durabilité à long terme de notre planète.",
  ];
  const randomFact = dailyFacts[new Date().getDate() % dailyFacts.length];
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

  const handleSpecialtyChange = (event) => setSelectedSpecialty(event.target.value);
  const handleTypeChange = (event) => setSelectedType(event.target.value);
  const renderChart = () => {
    switch (selectedSpecialty) {
      case "spe":
        return <StackedBarChart specialite={selectedSpecialty} key={selectedSpecialty} />;
      default:
        return (
          <div className="flex flex-col items-end px-12 pb-16 mt-6 w-full text-sm font-semibold text-gray-500 max-md:px-4 max-md:max-w-full">
            {selectedType === "option 1" ? (
              <CustomLineYearChart specialite={selectedSpecialty} key={selectedSpecialty} />
            ) : (
              selectedType === "option 2" ? (
                <CustomLineChart specialite={selectedSpecialty} key={selectedSpecialty} />
              ) : (
                <MonthlyLineChartByYear specialite={selectedSpecialty} key={selectedSpecialty} />
              )
            )}
          </div>
        );
    }
  };
  

  const toggleTheme = () => setTheme(theme === lightTheme ? darkTheme : lightTheme);

  const today = new Date();
  const formattedDate = today.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <ThemeProvider theme={theme}>
      <div 
        className="flex flex-col pt-4 bg-cover bg-center rounded-xl"
        style={{ backgroundImage: `url(${backgroundImage})` }} // Apply background image
      >
        {isAuthenticated ? <NavbarAdmin /> : <Navbar toggleTheme={toggleTheme} />}
        <div className="self-center mt-10 mb-6 w-full max-w-6xl max-md:mt-8 max-md:max-w-full">
          <div className="flex flex-col items-center mb-8">
            <Title>Statistique Géneral :</Title>
            <div className="mt-2 text-1xl font-semibold text-white">{formattedDate}</div>
          </div>
          <div className="flex gap-6 max-md:flex-col max-md:gap-4">     
            <div className="flex flex-col w-2/3 max-md:w-full">
               <div className="flex flex-col max-md:mt-6 max-md:max-w-full">
                  <StatCardWithBackground count={count} className="mt-2" />
                  <div className="mt-8 max-md:mt-6 max-md:max-w-full">
                    < div className="flex gap-6 max-md:flex-col max-md:gap-4">
                    <StatCard
                      title="Totale Des Emissions"
                      value={`${totalEmissions} tCO2e`}
                      percentage=""
                      isNegative={false}
                      icon={faCloud} // Ajoutez l'icône pour les émissions totales
                    />
                    <StatCard
                      title="Emissions par personne"
                      value={`${(totalEmissions / count).toFixed(2)} tCO2e`}
                      percentage=""
                      isNegative={false}
                      icon={faUser} // Ajoutez l'icône pour les émissions par personne
                    />
                  </div>
                </div>
                <div className="flex flex-col mt-6">
                  <h2 className="mt-3 text-3xl font-semibold text-gray-900">Empreinte Statistique :</h2>
                  <div className="flex gap-4 p-4 rounded-lg border ">
                    <FormSelect
                      name="Spécialités"
                      options={[
                        { value: "spe", name: "Spécialités :" },
                        { value: "default", name: "Tous" },
                        { value: "ING INFO", name: "ING INFO" },
                        { value: "ING ENER", name: "ING ENER" },
                        { value: "ING INSTRU", name: "ING INSTRU" },
                        { value: "ING MACS", name: "ING MACS" },
                        { value: "ING TELECOM", name: "ING TELECOM" },
                        { value: "Autres", name: "Personnels et invités" },
                      ]}
                      onChange={handleSpecialtyChange}
                    />
                    <FormSelect
                      name="Type Data"
                      options={[
                        { value: "default", name: "Période :" },
                        { value: "option 2", name: "Mensuelle" },
                        { value: "option 1", name: "Annuelle" },
                        { value: "comp", name: "Comparaison par année :" },
                      ]}
                      onChange={handleTypeChange}
                      alignRight
                    />
                  </div>
                </div>
                <div className="flex flex-col items-end px-12 pb-16 mt-6 w-full text-sm font-semibold text-gray-500 max-md:px-4 max-md:max-w-full">
                  {renderChart()}
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
                <h2 className="self-stretch text-3xl leading-4 text-black">Le Saviez-vous ?</h2>
                </div>
                <hr className="shrink-0 self-stretch mt-5 h-px border border-solid bg-gray-200 border-gray-200" />
                <div className="flex items-center justify-center w-full max-w-[283px]">
                <p className="text-justify">{randomFact}</p>
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



