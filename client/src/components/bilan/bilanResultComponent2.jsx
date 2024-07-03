import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import NavbarAdmin from "../NavbarAdmin";
import { useAuth } from "../../context/AuthContext";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Title as ChartTitle,
  Filler,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import ChartDataLabels from "chartjs-plugin-datalabels";
import BilanRessourcesAccordiantComponent from "./bilanRessourcesAccordiantComponent";
import InputComponent from "./inputComponent";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../../themes";
import {
  FaEnvelope,
  FaCheckCircle,
  FaExclamationCircle,
  FaCar,
  FaHome,
  FaUtensils,
  FaBox,
  FaDesktop,
} from "react-icons/fa";

import {
  MainContainer,
  ContentContainer,
  Section,
  Title,
  Subtitle,
  Subtitle1,
  Column,
  SmallColumn,
  IconWrapper,
  EmailContainer,
  ResultContainer,
  LegendItem,
  LegendColor,
  LegendIcon,
  LegendText,
} from "./stylesBilanResult";
import ModalComponent from "./ModalRappelEmailComponent";

ChartJS.register(
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  ChartTitle,
  Filler,
  annotationPlugin,
  ChartDataLabels
);

const data = {
  labels: [
    "Moins de 750 €",
    "De 750 à 999 €",
    "De 1 000 à 1 499 €",
    "De 1 500 à 1 999 €",
    "De 2 000 à 2 999 €",
    "De 3 000 à 3 499 €",
    "De 3 500 à 4 999 €",
    "De 5 000 à 6 499 €",
    "6 500 € ou plus",
  ],
  datasets: [
    {
      label: "Moyenne",
      data: [7.0, 7.4, 7.2, 8.1, 8.0, 8.3, 8.5, 9.6, 11.6],
      borderColor: "rgba(255, 99, 132, 1)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderWidth: 1,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: "rgba(255, 99, 132, 1)",
      fill: true,
      datalabels: {
        align: "end",
        anchor: "end",
        offset: 5, // Move the label 15 pixels above the point
        font: {
          size: 10, // Adjust font size if needed
        },
        color: 'black', // Label color
      },
    },
    {
      label: "Médiane",
      data: [6.3, 6.6, 6.7, 7.1, 7.0, 7.5, 7.7, 8.3, 10.1],
      borderColor: "rgba(255, 159, 64, 1)",
      backgroundColor: "rgba(255, 159, 64, 0.2)",
      borderWidth: 1,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: "rgba(255, 159, 64, 1)",
      fill: true,
      datalabels: {
        align: "start",
        anchor: "start",
        offset: 10, // Move the label 10 pixels below the point
        font: {
          size: 10, // Adjust font size if needed
        },
        color: 'black', // Label color
      },
    },
  ],
};

const BilanResultComponent2 = (props) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const questionResponse = props.questionResponse || {};

  const emailRegex = /\S+@\S+\.\S+/;

  const [reponse, setReponse] = useState(null);
  const [donneesChart, setDonneesChart] = useState(null);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailSentError, setEmailSentError] = useState(false);
  const [emailReset, setEmailReset] = useState(true);
  const [mailIsValid, setMailIsValid] = useState(null);
  const { isAuthenticated } = useAuth();
  const [theme, setTheme] = useState(lightTheme);
  const [showModal, setShowModal] = useState(false);

  const [highlightIndex, setHighlightIndex] = useState(null);
  const budget = questionResponse["budget"];

  useEffect(() => {
    if (budget !== undefined) {
      let index = 0;
      if (budget < 750) index = 0;
      else if (budget < 1000) index = 1;
      else if (budget < 1500) index = 2;
      else if (budget < 2000) index = 3;
      else if (budget < 3000) index = 4;
      else if (budget < 3500) index = 5;
      else if (budget < 5000) index = 6;
      else if (budget < 6500) index = 7;
      else index = 8;

      setHighlightIndex(index);
    }
  }, [budget]);

  const highlightColor = "rgba(255, 255, 0, 0.25)"; // Yellow color to match the highlight

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to use the full height and width of the parent
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "L'empreinte carbone moyenne par revenus",
      },
      annotation: {
        annotations: {
          box1: {
            type: "box",
            xMin: highlightIndex - 0.5,
            xMax: highlightIndex + 0.5,
            yMin: 0,
            yMax: 20, // Adjust the maximum y-value
            backgroundColor: highlightColor,
            borderColor: "rgba(255, 255, 0, 1)",
            borderWidth: 2,
          },
        },
      },
      datalabels: {
        color: "black",
        formatter: (value) => `${value} t`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 20, // Adjust the maximum y-value
        ticks: {
          stepSize: 0.5, // Each step represents 0.5 tonnes, so 2 steps = 1 tonne
        },
        title: {
          display: true,
          text: "Empreinte carbone (en tonnes)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Revenus mensuels nets du foyer",
        },
      },
    },
  };

  const option = {
    plugins: {
      legend: {
        position: "bottom",
        display: true,
        onHover: function (e) {
          e.native.target.style.cursor = "pointer";
        },
        labels: {
          filter: function (legendItem, chartData) {
            // Filter out "Vos émissions" label
            return legendItem.datasetIndex !== 0;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "TCO2e/an",
        },
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 20,
        bottom: 0,
      },
    },
  };

  const addStat = async (
    nom,
    score,
    specialite,
    speMaster,
    speLicence,
    speING,
    transport,
    alimentation,
    logement,
    biens,
    services,
    mode = "Moyen"
  ) => {
    try {
      let subSpecialty = "";
      if (specialite.trim() === "Masters" && speMaster) {
        subSpecialty = speMaster;
      } else if (specialite.trim() === "Licence" && speLicence) {
        subSpecialty = speLicence;
      } else if (specialite.trim() === "ING" && speING) {
        subSpecialty = speING;
      }

      let spe = "";
        if (specialite.trim() === "Autres" || specialite.trim() === "Personnels ou Enseignants") {
            spe = specialite.trim();
        } else {
            spe = `${specialite.trim()} / ${subSpecialty}`.trim();
        }

      const res = await fetch(`${apiUrl}/stats/AddStats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nom || "Anonyme",
          mode: mode,
          spe: spe,
          scoreTotal: score,
          transport: transport,
          alimentation: alimentation,
          logement: logement,
          biens: biens,
          services: services,
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
    const appelerBackend = async () => {
      try {
        console.log("questionResponse:", questionResponse); // Add this line
        const res = await fetch(`${apiUrl}/quiz/calculate2`, {
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

        const moyenneFrancaise = {
          Transport: 2.9,
          Alimentation: 2.0,
          Logement: 2.1,
          Biens: 0.5,
          Services: 1.8,
        };

        const labels = donnees.result?.map((item) => item.label);
        const dataValues = donnees.result?.map((item) => item.value);

        setDonneesChart({
          labels: labels,
          datasets: [
            {
              label: "",
              data: dataValues,
              backgroundColor: donnees.result?.map((item) => item.color),
              hoverOffset: 4,
            },
            {
              label: "Moyenne française",
              data: labels.map((label) => moyenneFrancaise[label] || 0),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });

        const score = donnees?.result
          ?.map((item) => item.value)
          .reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0);

        console.log("Adding stat with:", {
          nom: questionResponse["nom"],
          score,
          specialite: questionResponse["specialite"],
          speMaster: questionResponse["spe_Masters"],
          speLicence: questionResponse["spe_Licence"],
          speING: questionResponse["spe_ING"],
        });

        await addStat(
          questionResponse["nom"],
          score,
          questionResponse["specialite"],
          questionResponse["spe_Masters"] || null,
          questionResponse["spe_Licence"] || null,
          questionResponse["spe_ING"] || null,
          donnees.result.find((item) => item.id === "transport").value.toString(),
          donnees.result.find((item) => item.id === "alimentation").value.toString(),
          donnees.result.find((item) => item.id === "logement").value.toString(),
          donnees.result.find((item) => item.id === "biens").value.toString(),
          donnees.result.find((item) => item.id === "services").value.toString()
        );
      } catch (erreur) {
        console.error("Erreur lors de l’appel au backend:", erreur);
      }
    };

    appelerBackend();

    const timer = setTimeout(() => {
      setShowModal(true);
    }, 10000); // Affiche le modal après 10 secondes

    return () => clearTimeout(timer);
  }, [questionResponse]);

  function handleMailChange(newValue) {
    setEmailSent(false);
    setEmail(newValue.email);
    setMailIsValid(null);
  }

  async function sendEmail(closeModal) {
    setEmailSentError(false);
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
          resultResponse: reponse,
        }),
      });
      if (!res.ok) {
        setEmailSentError(true);
        setEmailReset(true);
        return;
      }
      const resultatEmail = await res.json();
      setEmailSent(resultatEmail.success);
      setEmail("");
      setEmailReset(true);
      setTimeout(() => {
        closeModal();
      }, 2000); // Attend 2 secondes avant de fermer le modal
    } else {
      setMailIsValid(false);
    }
  }

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Transport":
        return <FaCar />;
      case "Logement":
        return <FaHome />;
      case "Alimentation":
        return <FaUtensils />;
      case "Biens":
        return <FaDesktop />;
      case "Services":
        return <FaBox />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        {isAuthenticated ? (
          <NavbarAdmin />
        ) : (
          <Navbar toggleTheme={toggleTheme} />
        )}
        <ContentContainer>
          {reponse === null && <Title>Loading ..... </Title>}
          {reponse && donneesChart && (
            <Section>
              <Column>
                <Title>Bilan carbone</Title>
                <div className="relative">
                  <div className="text-center">
                    <span className="text-6xl font-semibold">
                      {reponse?.result
                        ?.map((item) => item.value)
                        .reduce((accumulator, currentValue) => {
                          return accumulator + currentValue;
                        }, 0)
                        .toFixed(3)}
                    </span>
                    <Subtitle1>TCO2e/an</Subtitle1>
                  </div>
                  <div className="mx-auto mt-3 w-full chart-container">
                    <Bar data={donneesChart} options={option} />
                  </div>
                </div>
                <ResultContainer>
                  {reponse?.result?.map((result, index) => (
                    <LegendItem key={"result-" + index}>
                      <LegendColor style={{ backgroundColor: result.color }}>
                        <LegendIcon>{getCategoryIcon(result.label)}</LegendIcon>
                      </LegendColor>
                      <LegendText>
                        {result.label} - {result.value} TCO2e/an
                      </LegendText>
                    </LegendItem>
                  ))}
                </ResultContainer>
              </Column>

              <Column bg="#f0f0f0">
                <Title>Calcul de l'empreinte carbone par revenus</Title>
                <Subtitle>
                 
                  Le graphique ci-dessous, issu de l'Ademe, montre l'empreinte carbone moyenne par
                  revenus mensuels nets du foyer français. Les données sont basées sur
                  une estimation qui prend en compte divers facteurs tels que
                  le transport, l'alimentation, le logement, les biens et les
                  services. La ligne rouge représente la moyenne des émissions
                  de carbone pour chaque catégorie de revenus, tandis que la
                  ligne orange représente la médiane. Ainsi avec un budget de <b>{questionResponse["budget"]} euros</b>{" "}
                  par an, votre émission est équivalente à
                
                  </Subtitle>
                {highlightIndex !== null && (
                  <div>
                    <p>
                      {" "}
                      {data.datasets[0].data[highlightIndex]} tonnes
                    </p>
                  </div>
                )}
                <div
                  className="mx-auto mt-3 w-full chart-container"
                  style={{ height: "400px" }}
                >
                  <Line
                    data={{
                      ...data,
                      datasets: data.datasets.map((dataset, datasetIndex) => ({
                        ...dataset,
                        backgroundColor: dataset.data.map((value, dataIndex) =>
                          dataIndex === highlightIndex
                            ? "rgba(54, 162, 235, 0.2)"
                            : dataset.backgroundColor
                        ),
                        borderColor: dataset.data.map((value, dataIndex) =>
                          dataIndex === highlightIndex
                            ? "rgba(54, 162, 235, 1)"
                            : dataset.borderColor
                        ),
                      })),
                    }}
                    options={options}
                  />
                </div>
                <div className="legend">
                  <LegendItem>
                    <LegendColor
                      style={{ backgroundColor: highlightColor }}
                    />
                    <LegendText>Vous vous trouvez ici</LegendText>
                  </LegendItem>
                </div>
              </Column>

              <SmallColumn bg="#e0f7fa">
                <EmailContainer>
                  <IconWrapper>
                    <FaEnvelope />
                  </IconWrapper>
                  <Title>
                    Souhaitez-vous recevoir les résultats par courrier
                    électronique?
                  </Title>
                  <Subtitle>
                    Si l'on zoom sur l'empreinte carbone de l'email moyen, voilà
                    ce que cela donne : 0,3 grammes pour un email de spam. 4
                    grammes pour un mail sans pièce jointe. 11 grammes pour un
                    email avec une pièce jointe de 1 MB
                  </Subtitle>
                </EmailContainer>

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
                    onClick={() => sendEmail(closeModal)}
                    className="px-6 py-2 rounded bg-blue-500 text-white font-semibold"
                  >
                    Envoyer résultat par E-mail
                  </button>
                </div>
                {mailIsValid === false && (
                  <div className="my-2 text-center text-red-700">
                    <FaExclamationCircle /> Votre adresse email <b>{email}</b>{" "}
                    est invalide, Merci de verifier votre adresse.
                  </div>
                )}
                {emailSent && (
                  <div className="my-2 text-center text-green-700">
                    <FaCheckCircle /> Les résultats ont été envoyés avec succès
                    à l'adresse e-mail <b>{email}</b>. Veuillez vérifier votre
                    boîte de réception.
                  </div>
                )}
                {emailSentError && (
                  <div className="my-2 text-center text-red-700">
                    <FaExclamationCircle /> Une erreur s'est produite lors de
                    l'envoi d'email. Veuillez contacter un administrateur ou
                    essayer à nouveau.
                  </div>
                )}

                <BilanRessourcesAccordiantComponent />
              </SmallColumn>
            </Section>
          )}
        </ContentContainer>
        {showModal && (
          <ModalComponent
            closeModal={closeModal}
            handleMailChange={handleMailChange}
            sendEmail={sendEmail}
            mailIsValid={mailIsValid}
            emailSent={emailSent}
            emailSentError={emailSentError}
            email={email}
            emailReset={emailReset}
          />
        )}
      </MainContainer>
    </ThemeProvider>
  );
};

export default BilanResultComponent2;
