import React, { useEffect, useState } from "react";
import stat1 from "../img/stat_1.svg";
import stat2 from "../img/stat_2.svg";
import CustomLineChart from "./Statistique/Mensuel";
import CustomLineYearChart from "./Statistique/Annuel";
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import CustomChart from "./Statistique/Doughnuts";
import axios from 'axios';
import Navbar from "../components/Navbar";
import NavbarAdmin from "../components/NavbarAdmin";
import { useAuth } from "../context/AuthContext";

Chart.register(ArcElement, Tooltip, Legend);
function StatCard({ title, value, percentage, isNegative }) {
  return (
    <div className="flex flex-col grow px-11 pt-8 pb-16 w-full font-medium bg-white rounded-xl max-md:px-5 max-md:mt-10">
      <img
        loading="lazy"
        src={stat2}
        alt="Stat icon"
        className="aspect-square w-[26px]"
      />
      <div className="mt-3 text-3xl font-semibold text-black">{value}</div>
      <div className="mt-1.5 text-base text-zinc-500">{title}</div>
      <div
        className={`mt-1.5 text-xs ${
          isNegative ? "text-red-400" : "text-green-400"
        }`}
      >
        {percentage}
      </div>
    </div>
  );
}


function FormSelect({ name, options, onChange }) {
  return (
    <select
      name={name}
      className="box-border flex relative flex-col shrink-0 self-start mt-5"
      onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
}

function Statistiques() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const today = new Date();
  const formattedDate = today.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const { isAuthenticated } = useAuth();
  const [selectedSpecialty, setSelectedSpecialty] = useState("default");
  const [selectedType, setSelectedType] = useState("default_stat");
  const [totalEmissions, setTotalEmissions] = useState('');

  useEffect(() => {
    axios.get(`${apiUrl}/stats/api/statistiques/totalScore`)
      .then(response => {
        setTotalEmissions(response.data.total);
      })
      .catch(error => {
        console.error("Error loading total emissions data:", error);
      });
  }, []);
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get(`${apiUrl}/stats/api/statistiques/count`)
      .then(response => {
        if (response.data && response.data.count) {
          setCount(response.data.count);
        }
      })
      .catch(error => {
        console.error("Erreur lors de la récupération du nombre de statistiques", error);
      });
  }, []);

  const handleSpecialtyChange = (event) => {
    setSelectedSpecialty(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const renderChart = () => {
    switch (selectedType) {
      case "option 1":
        return <CustomLineYearChart specialite={selectedSpecialty} key={selectedSpecialty} />;
      case "option 2":
        return <CustomLineChart specialite={selectedSpecialty} key={selectedSpecialty} />;
      default:
        return <CustomLineChart specialite={selectedSpecialty} key={selectedSpecialty} />;
    }
  };
  

  return (
    
    <div className="flex flex-col pt-3 bg-slate-100 rounded-[30px]">
          {isAuthenticated ? <NavbarAdmin /> : <Navbar />}
      <div className="self-center mt-12 mb-3 w-full max-w-[1213px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[65%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col max-md:mt-9 max-md:max-w-full">
              <div className="flex gap-5 justify-between px-px w-full max-md:flex-wrap max-md:max-w-full">
                <div className="flex flex-col flex-1 px-5 my-auto">
                  <h2 className="text-3xl font-medium text-center text-black whitespace-nowrap">
                    Statistique Générale
                  </h2>
                  <div className="mt-3 text-base leading-loose text-zinc-500">
                  {formattedDate}
                  </div>
                </div>
                <div className="flex overflow-hidden relative z-10 flex-col gap-5 justify-between self-center px-10 py-4 mt-16 w-full font-semibold text-white aspect-[4.71] max-md:px-5 max-md:mt-10">
                    <img
                      loading="lazy"
                      src={stat1}
                      alt="Stat1"
                      className="object-cover absolute inset-0 size-full"
                    />
                    <p className="relative flex-1 text-lg leading-6">Nombre de participants</p>
                    <p className="relative flex-1 my-auto text-3xl text-center leading-[20px]">{count}</p>
                  </div>
              </div>
              <div className="mt-11 max-md:mt-10 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  <StatCard
                    title="Totale Des Emissions"
                    value={`${totalEmissions} tCO2e`}
                    imageSrc={stat2}
                  />
                  <StatCard
                    title="Emissions par personne"
                    value={`${(totalEmissions / count).toFixed(2)} tCO2e`}
                    imageSrc={stat2}
                  />
                </div>
              </div>
              <div className="box-border flex relative flex-col shrink-0 mt-5 h-auto">
              <h2 className="mt-3 text-3xl font-semibold text-black"> Empreinte Statistique : </h2>
                <div className="flex gap-1 p-2 rounded-lg border border-solid border-slate-100">
                <FormSelect
                              name="Spécialités"
                              options={[
                                { value: "default", name: "ING" },
                                { value: "ING INFO", name: "ING INFO" },
                                { value: "ING ENER", name: "ING ENER" },
                                { value: "ING INSTRU", name: "ING INSTRU" },
                                { value: "ING MACS", name: "ING MACS" },
                                { value: "ING TELECOM", name: "ING TELECOM" },
                                {value: "Autres", name: "Autres"},
                              ]}
                              onChange={handleSpecialtyChange}
                            />
                              <FormSelect
                                name="Type Data"
                                options={[
                                  { value: "default", name: "Default View" },
                                  { value: "option 2", name: "Mensuelle" },
                                  { value: "option 1", name: "Annuelle" },
                                ]}
                                onChange={handleTypeChange} /> 
                </div>
                <div className="flex gap-1 p-2 mr-0 rounded-lg border border-solid border-slate-100" />
              </div>
              <div className="flex overflow-hidden relative flex-col items-end px-16 pb-20 mt-6 w-full text-xs font-semibold leading-5 whitespace-nowrap max-w-[789px] min-h-[399px] text-slate-500 max-md:px-5 max-md:max-w-full">
              {renderChart()}
                <div className="relative">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                      <div className="flex relative gap-5 justify-between mr-20 mb-48 max-md:mr-2.5 max-md:mb-10">
                        <div className="flex gap-1 p-2 rounded-lg border border-solid border-slate-100" />
                      </div>
                    </div>
                    <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                      <div className="flex gap-1 p-2 -mr-px rounded-lg border border-solid border-slate-100" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <aside className="flex flex-col ml-5 w-[35%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow items-center px-7 py-11 mx-auto mt-1.5 w-full whitespace-nowrap bg-white rounded-3xl shadow-sm max-md:px-5 max-md:mt-10">
              <h2 className="self-stretch text-3xl leading-4 text-black">
                Synthése
              </h2>
              <hr className="shrink-0 self-stretch mt-5 h-px border border-solid bg-slate-200 border-slate-200" />
              <div className="flex gap-0 mt-12 max-w-full w-[283px] max-md:mt-10">
              <CustomChart/>  
                <div className="flex flex-col flex-1 flex-1 text-lg leading-6 text-white">
                   
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                <div className="space-y-2 w-1/2 mx-auto">
              </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
export default Statistiques;
