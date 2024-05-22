import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import NavbarAdmin from "../NavbarAdmin";
import { useAuth } from "../../context/AuthContext";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import BilanRessourcesAccordiantComponent from "./bilanRessourcesAccordiantComponent";
import InputComponent from "./inputComponent";

ChartJS.register(ArcElement, Tooltip, Legend);


export default function BilanResultComponent(props) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const userName = props.userName || "";
  const questionResponse = props.questionResponse || {};

  const emailRegex = /\S+@\S+\.\S+/;

  const [reponse, setReponse] = useState(null);
  const [donneesChart, setDonneesChart] = useState(null);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailSentError, setEmailSentError] = useState(false);
  const [emailReset, setEmailReset] = useState(true);
  const [mailIsValid, setMailIsValid] = useState(null);
  const { isAuthenticated } = useAuth();

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        display: false,
        // S'assurer que chaque légende est sur sa propre ligne
        onHover: function(e) {
          e.native.target.style.cursor = 'pointer';
        }
      }
    }
  };

  const addStat = async (
    nom,
    score,
    specialite,
    transport,
    alimentation,
    logement,
    divers,
    mode = "Express"
  ) => {
    try {
      const res = await fetch(`${apiUrl}/stats/AddStats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nom || "Anonyme",
          mode: mode,
          spe: specialite,
          scoreTotal: score,
          transport: transport,
          alimentation: alimentation,
          logement: logement,
          divers: divers,
        }),
      });
      if (!res.ok) {
        throw new Error("La requête au backend ajout statistique a échoué");
      }
    } catch (erreur) {
      console.error("Erreur lors de l’appel au backend - stat :", erreur);
    }
  };


  useEffect(() => {
    // Fonction pour effectuer l'appel au backend
    const appelerBackend = async () => {
      try {
        const res = await fetch(`${apiUrl}/quiz/calculate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(questionResponse),
        });
        if (!res.ok) {
          throw new Error("La requête au backend a échoué");
        }
        const donnees = await res.json();
        setReponse(donnees);
        setDonneesChart({
          labels: donnees.result?.map(item => item.label),
          datasets: [
            {
              data: donnees.result?.map(item => item.value),
              backgroundColor: donnees.result?.map(item => item.color),
              hoverOffset: 4,
            },
          ],
        });
        const score= donnees?.result?.map((item) => item.value).reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);

        await addStat(
          questionResponse["nom"],
          score,
          questionResponse["specialite"],
          donnees.result.find((item) => item.id === "transport").value.toString(),
          donnees.result.find((item) => item.id === "alimentation").value.toString(),
          donnees.result.find((item) => item.id === "logement").value.toString(),
          donnees.result.find((item) => item.id === "divers").value.toString()
        );
      } catch (erreur) {
        console.error("Erreur lors de l’appel au backend:", erreur);
      }
    };

    // Appeler la fonction appelerBackend lors du chargement du composant
    appelerBackend();
  }, [questionResponse]); 

  function handleMailChange(newValue) {
    setEmailSent(false);
    setEmail(newValue.email);
    setMailIsValid(null);
  }

  async function sendEmail() {
    setEmailSentError(false);
     // Check if the email matches the regex
     if (emailRegex.test(email)) {
      setMailIsValid(true);
      setEmailReset(false);
      const res = await fetch(`${apiUrl}/quiz/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          resultRequest: questionResponse,
          resultResponse: reponse
        }),
      });
      if (!res.ok) {
        setEmailSentError(true);
        setEmailReset(true);
        return;
        //throw new Error("La requête au backend a échoué (envoie de mail)");
      }
      const resultatEmail = await res.json();
      setEmailSent(resultatEmail.success);
      setEmail('');
      setEmailReset(true);
    } else {
      setMailIsValid(false);
    }
  
  }



  return (
    <div className="flex flex-col bg-slate-100  h-lvh">
      <div className="flex flex-col max-w-full max-md:mb-10">
        {reponse === null && "Loding ....."}
        {isAuthenticated ? <NavbarAdmin /> : <Navbar />}
        {reponse && donneesChart && (
          <div className="min-h-screen flex justify-center items-center">
            <div className="bg-white rounded-2xl shadow-xl flex overflow-hidden max-w mx-6">
              <div className="w-2/4 p-10 space-y-6 text-center">
                <h1 className="text-3xl font-bold text-gray-800">
                  Bilan carbone
                </h1>
                <div className="relative">
                  <div className="text-center">
                    <span className="text-6xl font-semibold">
                      {reponse?.result
                        ?.map((item) => item.value)
                        .reduce((accumulator, currentValue) => {
                          return accumulator + currentValue;
                        }, 0)}
                    </span>
                    <p className="text-gray-500">TCO2e/an</p>
                  </div>
                  <div className="mx-auto mt-3 w-1/2">
                    <Doughnut data={donneesChart} options={options} />
                  </div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                <div className="space-y-2 w-1/2 mx-auto">
                  {reponse?.result?.map((result, index) => {
                    return (
                      <div
                        className="flex items-center"
                        key={"result-" + index}
                      >
                        <span
                          className="block w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: result.color }}
                        ></span>
                        <span className="text-sm text-gray-600">
                          {result.label} - {result.value} TCO2e/an
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="w-1/4 bg-gray-100 p-10 space-y-6 flex justify-between flex-col">
                <h1 className="text-3xl font-bold text-gray-800 text-center">
                  Taux d’émission du salaire
                </h1>

                <div className="text-center">
                  Avec un budget de <b>{questionResponse["budget"]} euros</b>{" "}
                  par an,
                  <br />
                  votre émission est équivalente à
                </div>

                <h2 className="text-3xl font-bold text-gray-700 text-center">
                  {reponse.budget?.toFixed(3).replace(".", ",")} TCO2
                </h2>

                <p className="text-red-300 text-justify">
                  Pour calculer le taux d’émission du salaire, nous avons
                  considéré d’une part, le budget annuel français qui est
                  d’environ 312 000 millions d’euros en 2024 et d’autre part, le
                  taux de CO2 émis par toute la France est de 604 millions de
                  tonne de CO2.
                </p>
              </div>

              <div className="w-1/4 bg-blue-200 p-10 space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow space-y-4">
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Souhaitez-vous recevoir les résultats par courrier
                      électronique?
                    </h2>
                  </div>
                  <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-semibold text-gray-700">
                      Si l'on zoom sur l'empreinte carbone de l'email moyen, voilà ce que cela donne : 0,3 grammes pour un email de spam. 4 grammes pour un mail sans pièce jointe. 11 grammes pour un email avec une pièce jointe de 1 MB
                    </h3>
                  </div>
                </div>

                <div className="space-x-4 justify-center text-center">
                  <div className="my-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {emailReset && (
                      <InputComponent
                        question={{
                          id: "email",
                          type: "email",
                          title: "Votre addresse E-mail",
                        }}
                        inputType="email"
                        value={{ email: email }}
                        onValueChange={handleMailChange}
                      />
                    )}
                  </div>

                  <button
                    onClick={sendEmail}
                    className="px-6 py-2 rounded bg-blue-500 text-white font-semibold"
                  >
                    Envoyer résultat par E-mail
                  </button>
                </div>
                {mailIsValid === false && (
                  <div className="my-2 text-center text-red-700">
                    Votre adresse email <b>{email}</b>.<br /> est invalide,
                    <br />
                    Merci de verifier votre adresse.
                  </div>
                )}
                {emailSent !== false && (
                  <div className="my-2 text-center text-green-700">
                    Le résultat a été transmis par e-mail avec succès sur
                    l'adresse <b>{email}</b>.<br /> Merci de vérifier votre
                    e-mail!
                  </div>
                )}
                {emailSentError !== false && (
                  <div className="my-2 text-center text-red-700">
                    Une erreur s'est produite lors de l'envoi d'email. Veuillez
                    contacter un administrateur ou essayer à nouveau.
                  </div>
                )}

                <BilanRessourcesAccordiantComponent />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}